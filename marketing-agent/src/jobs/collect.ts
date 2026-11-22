import { CONFIG_DEFAULTS, type AgentConfig } from "../core/config.ts";
import { latestBefore } from "../core/store.ts";
import { keyEvents, reportRows, runReport, withHostFilter } from "../connectors/ga4.ts";
import { DEVELOPER_TOKEN_KEY, adsReport, micros, type AdsRow } from "../connectors/ads.ts";
import { searchAnalytics, type GscRow } from "../connectors/gsc.ts";
import { pageSpeed, PSI_KEY_NAME, type PageSpeedResult } from "../connectors/psi.ts";
import { crawlSite, type CrawlResult } from "../connectors/site.ts";
import { deltas } from "../analysis/compare.ts";
import { cpa, negativeCandidates, wastedSpend } from "../analysis/ads.ts";
import { cannibalization, lowCtrOpportunities, strikingDistance } from "../analysis/seo.ts";
import { siteIssues } from "../analysis/site.ts";
import { AI_LEADS_METRIC, AI_SESSIONS_METRIC, FUNNEL_RATE_METRIC, LEAD_EVENTS, aiSources, aiTrafficFilter, leadFunnelValues } from "../analysis/leads.ts";
import {
  findingsFromCannibalization,
  findingsFromLowCtr,
  findingsFromSiteIssues,
  findingsFromStrikingDistance,
  findingsFromWastedSpend,
  impactFromVolume,
} from "../analysis/opportunities.ts";
import type {
  AdsSearchTerm,
  CrawlPage,
  Finding,
  IntegrationState,
  IntegrationStatus,
  MetricDelta,
  ProposedChange,
} from "../analysis/types.ts";
import {
  NotConfiguredError,
  connectorDeps,
  fmtRange,
  mdTable,
  pct,
  round,
  secret,
  shortUrl,
  statusOf,
  type JobDeps,
  type Range,
} from "./context.ts";

/** Uniform output of one data source inside a report job. */
export type SourceResult = {
  status: IntegrationStatus;
  metrics: MetricDelta[];
  findings: Finding[];
  proposals: ProposedChange[];
  /** Markdown blocks for the "Детализация" part of the report. */
  sections: string[];
  /** Snapshot to persist (source name + data); omitted when the source failed. */
  snapshot?: { source: string; date: string; data: unknown };
  /** Data other steps may use (e.g. top pages for PSI). */
  extra?: Record<string, unknown>;
};

type Body = Omit<SourceResult, "status"> & { detail: string; state?: IntegrationState };

const empty = (): Omit<Body, "detail"> => ({ metrics: [], findings: [], proposals: [], sections: [] });

/** Runs a collector; any error becomes the source's integration status instead of failing the job. */
async function guarded(name: string, fn: () => Promise<Body>): Promise<SourceResult> {
  try {
    const { detail, state, ...rest } = await fn();
    return { status: { name, status: state ?? "WORKING", detail }, ...rest };
  } catch (err) {
    return { status: statusOf(name, err), ...empty() };
  }
}

const num = (v: unknown): number => {
  const n = Number(v ?? 0);
  return Number.isFinite(n) ? n : 0;
};

const pick = (row: unknown, path: string): unknown =>
  path.split(".").reduce<unknown>((o, k) => (o && typeof o === "object" ? (o as Record<string, unknown>)[k] : undefined), row);

// ---------- GA4 ----------

type Ga4Row = Record<string, string | number>;

export type Ga4Options = { snapshotSource: string; snapshotDate: string };

type ReportFn = (body: Record<string, unknown>) => ReturnType<typeof runReport>;
type DateRanges = Array<Range & { name: string }>;
type LeadFunnelRows = { events: Ga4Row[]; ai: Ga4Row[] };

/** Lead funnel events (by session source/medium) and AI-assistant sessions; hostName filter is added by `report`. */
async function fetchLeadFunnel(report: ReportFn, dateRanges: DateRanges): Promise<LeadFunnelRows> {
  const [events, ai] = await Promise.all([
    report({
      dateRanges,
      dimensions: [{ name: "eventName" }, { name: "sessionSource" }, { name: "sessionMedium" }],
      metrics: [{ name: "eventCount" }],
      dimensionFilter: { filter: { fieldName: "eventName", inListFilter: { values: [...LEAD_EVENTS] } } },
      limit: 10000,
    }),
    report({
      dateRanges,
      dimensions: [{ name: "sessionSource" }, { name: "sessionMedium" }],
      metrics: [{ name: "sessions" }],
      dimensionFilter: aiTrafficFilter(),
      limit: 1000,
    }),
  ]);
  return { events: reportRows(events), ai: reportRows(ai) };
}

const FUNNEL_ROWS: Array<[string, string]> = [
  ...LEAD_EVENTS.map((e): [string, string] => [e, `GA4 ${e}`]),
  ["доля form_start→generate_lead, %", FUNNEL_RATE_METRIC],
  ["AI-ассистенты: сессии", AI_SESSIONS_METRIC],
  ["AI-ассистенты: generate_lead", AI_LEADS_METRIC],
];

function leadFunnelSection(rows: LeadFunnelRows, curV: Record<string, number>, prevV: Record<string, number>, cur: Range, prev: Range): string {
  const ai = aiSources(rows.events, rows.ai);
  return (
    `### GA4: воронка обращений (${fmtRange(cur)} vs ${fmtRange(prev)})\n\n` +
    "Заявка = generate_lead; whatsapp_click/phone_click — микроконверсии. AI-ассистенты: sessionSource содержит " +
    "chatgpt/perplexity/gemini/copilot/claude или sessionMedium = ai/ai-assistant.\n\n" +
    mdTable(
      ["Шаг", "Сейчас", "Было", "Δ"],
      FUNNEL_ROWS.map(([label, key]) => [label, curV[key] ?? 0, prevV[key] ?? 0, pct(curV[key] ?? 0, prevV[key] ?? 0)]),
    ) +
    (ai.length
      ? "\n\n" + mdTable(["AI-источник", "Medium", "Сессии", "Было", "generate_lead", "Было"], ai.slice(0, 10).map((a) => [a.source, a.medium, a.sessions, a.prevSessions, a.leads, a.prevLeads]))
      : "\n\nСессий из AI-ассистентов нет.")
  );
}

/** Lead funnel only (weekly report): same GA4 property and hostName filter as collectGa4. */
export async function collectGa4Funnel(
  cfg: AgentConfig,
  deps: JobDeps,
  token: () => Promise<string>,
  cur: Range,
  prev: Range,
  opts: Ga4Options,
): Promise<SourceResult> {
  return guarded("ga4", async () => {
    const tok = await token();
    const pid = cfg.ga4PropertyId;
    if (!pid) throw new NotConfiguredError("ga4PropertyId не задан в config.json (запустите discover)");
    const cd = connectorDeps(deps, tok);
    const hosts = cfg.ga4HostNames ?? CONFIG_DEFAULTS.ga4HostNames;
    const report: ReportFn = (body) => runReport(pid, withHostFilter(body, hosts), cd);
    const rows = await fetchLeadFunnel(report, [
      { ...cur, name: "current" },
      { ...prev, name: "previous" },
    ]);
    const curV = leadFunnelValues(rows.events, rows.ai, "current");
    const prevV = leadFunnelValues(rows.events, rows.ai, "previous");
    return {
      detail: `property ${pid}: воронка обращений — ${curV["GA4 form_start"]} form_start, ${curV["GA4 generate_lead"]} generate_lead, AI-сессий ${curV[AI_SESSIONS_METRIC]} за ${fmtRange(cur)}`,
      metrics: deltas(curV, prevV),
      findings: [],
      proposals: [],
      sections: [leadFunnelSection(rows, curV, prevV, cur, prev)],
      snapshot: {
        source: opts.snapshotSource,
        date: opts.snapshotDate,
        data: { current: cur, previous: prev, values: { current: curV, previous: prevV }, aiSources: aiSources(rows.events, rows.ai) },
      },
    };
  });
}

export async function collectGa4(
  cfg: AgentConfig,
  deps: JobDeps,
  token: () => Promise<string>,
  cur: Range,
  prev: Range,
  opts: Ga4Options,
): Promise<SourceResult> {
  return guarded("ga4", async () => {
    const tok = await token();
    const pid = cfg.ga4PropertyId;
    if (!pid) throw new NotConfiguredError("ga4PropertyId не задан в config.json (запустите discover)");
    const cd = connectorDeps(deps, tok);
    const dateRanges = [
      { ...cur, name: "current" },
      { ...prev, name: "previous" },
    ];
    const metricsOf = (names: string[]): Array<{ name: string }> => names.map((name) => ({ name }));
    // The GA4 property is shared by several sites: every report is limited to this site's hostnames.
    const hosts = cfg.ga4HostNames ?? CONFIG_DEFAULTS.ga4HostNames;
    const report = (body: Record<string, unknown>) => runReport(pid, withHostFilter(body, hosts), cd);
    const [totals, funnel, channels, landings, kev] = await Promise.all([
      report({ dateRanges, metrics: metricsOf(["sessions", "totalUsers", "engagedSessions", "keyEvents"]) }),
      fetchLeadFunnel(report, dateRanges),
      report({ dateRanges, dimensions: [{ name: "sessionDefaultChannelGroup" }], metrics: metricsOf(["sessions", "keyEvents"]), limit: 100 }),
      report({
        dateRanges,
        dimensions: [{ name: "landingPage" }],
        metrics: metricsOf(["sessions", "keyEvents"]),
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        limit: 300,
      }),
      keyEvents(pid, cd).catch(() => null),
    ]);
    const t = reportRows(totals);
    const byRange = (rows: Ga4Row[], range: string, metric: string): number =>
      rows.filter((r) => (r.dateRange ?? "current") === range).reduce((s, r) => s + num(r[metric]), 0);
    const values = (range: string): Record<string, number> => {
      const sessions = byRange(t, range, "sessions");
      const f = leadFunnelValues(funnel.events, funnel.ai, range);
      const lead = f["GA4 generate_lead"] ?? 0;
      return {
        "GA4 sessions": sessions,
        "GA4 users": byRange(t, range, "totalUsers"),
        "GA4 engaged sessions": byRange(t, range, "engagedSessions"),
        "GA4 key events": byRange(t, range, "keyEvents"),
        "GA4 generate_lead": lead,
        "GA4 lead rate %": sessions > 0 ? round((lead / sessions) * 100) : 0,
        ...f,
      };
    };
    const curV = values("current");
    const prevV = values("previous");
    const metrics = deltas(curV, prevV);

    const pivot = (rows: Ga4Row[], dim: string): Array<{ key: string; s: number; ps: number; k: number; pk: number }> => {
      const map = new Map<string, { key: string; s: number; ps: number; k: number; pk: number }>();
      for (const r of rows) {
        const key = String(r[dim] ?? "(not set)");
        const e = map.get(key) ?? { key, s: 0, ps: 0, k: 0, pk: 0 };
        if ((r.dateRange ?? "current") === "previous") {
          e.ps += num(r.sessions);
          e.pk += num(r.keyEvents);
        } else {
          e.s += num(r.sessions);
          e.k += num(r.keyEvents);
        }
        map.set(key, e);
      }
      return [...map.values()].sort((a, b) => b.s - a.s);
    };
    const ch = pivot(reportRows(channels), "sessionDefaultChannelGroup");
    const lp = pivot(reportRows(landings), "landingPage");

    const findings: Finding[] = [];
    const sessions = curV["GA4 sessions"] ?? 0;
    const prevSessions = prevV["GA4 sessions"] ?? 0;
    if (prevSessions >= 50 && sessions < prevSessions * 0.8) {
      findings.push({
        id: "analytics:sessions-drop",
        area: "analytics",
        title: "Падение трафика",
        detail: `Сессии ${sessions} против ${prevSessions} (${pct(sessions, prevSessions)}) за ${fmtRange(cur)}.`,
        impact: 6,
        confidence: 0.7,
        effort: 3,
      });
    }
    if (sessions >= 100 && (curV["GA4 generate_lead"] ?? 0) === 0) {
      findings.push({
        id: "analytics:no-generate-lead",
        area: "analytics",
        title: "Нет событий generate_lead",
        detail: `${sessions} сессий и 0 generate_lead — проверьте отправку события формами/звонками.`,
        impact: 8,
        confidence: 0.6,
        effort: 2,
      });
    }
    if (kev && !kev.some((e) => e.eventName === "generate_lead")) {
      findings.push({
        id: "analytics:generate-lead-not-key",
        area: "analytics",
        title: "generate_lead не отмечен как key event",
        detail: `Key events: ${kev.map((e) => e.eventName).join(", ") || "нет"}. Без этого Ads/GA4 не считают заявки конверсиями.`,
        impact: 7,
        confidence: 0.8,
        effort: 1,
      });
    }
    for (const c of ch) {
      if (c.ps >= 30 && c.s < c.ps * 0.7) {
        findings.push({
          id: `analytics:channel-drop:${c.key}`,
          area: "analytics",
          title: `Канал «${c.key}» просел`,
          detail: `Сессии ${c.s} против ${c.ps} (${pct(c.s, c.ps)}).`,
          impact: impactFromVolume(c.ps - c.s),
          confidence: 0.6,
          effort: 3,
        });
      }
    }
    for (const p of lp.filter((x) => x.s >= 30 && x.k === 0).slice(0, 5)) {
      findings.push({
        id: `analytics:landing-no-key-events:${p.key}`,
        area: "analytics",
        title: `Лендинг без конверсий: ${p.key}`,
        detail: `${p.s} сессий и 0 key events за ${fmtRange(cur)}.`,
        impact: impactFromVolume(p.s / 3),
        confidence: 0.5,
        effort: 3,
      });
    }

    const sections = [
      leadFunnelSection(funnel, curV, prevV, cur, prev),
      `### GA4: каналы (${fmtRange(cur)} vs ${fmtRange(prev)})\n\n` +
        (ch.length
          ? mdTable(["Канал", "Сессии", "Было", "Δ", "Key events", "Было"], ch.slice(0, 12).map((c) => [c.key, c.s, c.ps, pct(c.s, c.ps), c.k, c.pk]))
          : "Нет данных."),
      `### GA4: лендинги (топ-15 по сессиям)\n\n` +
        (lp.length
          ? mdTable(["Лендинг", "Сессии", "Было", "Δ", "Key events", "Было"], lp.slice(0, 15).map((c) => [c.key, c.s, c.ps, pct(c.s, c.ps), c.k, c.pk]))
          : "Нет данных."),
    ];

    return {
      detail: `property ${pid}: ${sessions} сессий, ${curV["GA4 generate_lead"]} generate_lead за ${fmtRange(cur)}`,
      metrics,
      findings,
      proposals: [],
      sections,
      snapshot: {
        source: opts.snapshotSource,
        date: opts.snapshotDate,
        data: {
          current: cur,
          previous: prev,
          values: { current: curV, previous: prevV },
          channels: ch,
          landings: lp,
          aiSources: aiSources(funnel.events, funnel.ai),
          keyEvents: kev,
        },
      },
    };
  });
}

// ---------- Google Ads ----------

type Campaign = { id: string; name: string; status: string; budget: number; cost: number; clicks: number; impressions: number; conversions: number };

function parseCampaigns(rows: AdsRow[]): Campaign[] {
  const map = new Map<string, Campaign>();
  for (const r of rows) {
    const id = String(pick(r, "campaign.id") ?? pick(r, "campaign.name") ?? "?");
    const c = map.get(id) ?? {
      id,
      name: String(pick(r, "campaign.name") ?? id),
      status: String(pick(r, "campaign.status") ?? ""),
      budget: micros(pick(r, "campaignBudget.amountMicros")),
      cost: 0,
      clicks: 0,
      impressions: 0,
      conversions: 0,
    };
    c.cost += micros(pick(r, "metrics.costMicros"));
    c.clicks += num(pick(r, "metrics.clicks"));
    c.impressions += num(pick(r, "metrics.impressions"));
    c.conversions += num(pick(r, "metrics.conversions"));
    map.set(id, c);
  }
  return [...map.values()].map((c) => ({ ...c, cost: round(c.cost) })).sort((a, b) => b.cost - a.cost);
}

function parseSearchTerms(rows: AdsRow[]): AdsSearchTerm[] {
  const map = new Map<string, AdsSearchTerm>();
  for (const r of rows) {
    const term = String(pick(r, "searchTermView.searchTerm") ?? "").trim();
    if (!term) continue;
    const t = map.get(term) ?? { term, cost: 0, clicks: 0, conversions: 0 };
    t.cost = round(t.cost + micros(pick(r, "metrics.costMicros")));
    t.clicks += num(pick(r, "metrics.clicks"));
    t.conversions += num(pick(r, "metrics.conversions"));
    map.set(term, t);
  }
  return [...map.values()];
}

export async function collectAds(
  cfg: AgentConfig,
  deps: JobDeps,
  token: () => Promise<string>,
  cur: Range,
  prev: Range,
  opts: { snapshotSource: string; snapshotDate: string },
): Promise<SourceResult> {
  return guarded("google-ads", async () => {
    const tok = await token();
    const customer = cfg.adsCustomerId;
    if (!customer) throw new NotConfiguredError("adsCustomerId не задан в config.json (запустите discover)");
    // Developer token is optional (GCP project Explorer access); null → header is not sent.
    const developerToken = await secret(deps, DEVELOPER_TOKEN_KEY);
    const ad = { ...connectorDeps(deps, tok), developerToken, config: cfg };
    const [curRows, prevRows, termRows] = await Promise.all([
      adsReport("campaigns", customer, cur, ad),
      adsReport("campaigns", customer, prev, ad),
      adsReport("searchTerms", customer, cur, ad),
    ]);
    const campaigns = parseCampaigns(curRows);
    const prevCampaigns = parseCampaigns(prevRows);
    const terms = parseSearchTerms(termRows);
    const totals = (cs: Campaign[]): Record<string, number> => {
      const v: Record<string, number> = {
        "Ads cost": round(cs.reduce((s, c) => s + c.cost, 0)),
        "Ads clicks": cs.reduce((s, c) => s + c.clicks, 0),
        "Ads impressions": cs.reduce((s, c) => s + c.impressions, 0),
        "Ads conversions": round(cs.reduce((s, c) => s + c.conversions, 0)),
      };
      const c = cpa(cs);
      if (c !== null) v["Ads CPA"] = c;
      return v;
    };
    const curT = totals(campaigns);
    const metrics = deltas(curT, totals(prevCampaigns));
    const wasted = wastedSpend(terms, { minCost: 0 });
    const negatives = negativeCandidates(terms);
    const findings: Finding[] = findingsFromWastedSpend(wasted.items.slice(0, 10));
    for (const c of campaigns.filter((x) => x.cost > 0 && x.conversions === 0)) {
      findings.push({
        id: `ads:campaign-no-conv:${c.id}`,
        area: "ads",
        title: `Кампания без конверсий: ${c.name}`,
        detail: `Расход ${c.cost}, ${c.clicks} кликов, 0 конверсий за ${fmtRange(cur)}.`,
        impact: impactFromVolume(c.cost / 100),
        confidence: 0.6,
        effort: 3,
      });
    }
    const proposals: ProposedChange[] = negatives.slice(0, 10).map((n) => ({
      area: "ads",
      change: `Добавить минус-слово «${n.keyword}» (${n.matchType})`,
      rationale: `${n.reason}; расход ${n.cost} по запросу «${n.sourceTerm}»`,
    }));
    const sections = [
      `### Google Ads: кампании (${fmtRange(cur)})\n\n` +
        (campaigns.length
          ? mdTable(
              ["Кампания", "Статус", "Бюджет/день", "Расход", "Клики", "Конверсии", "CPA"],
              campaigns.map((c) => [c.name, c.status, c.budget, c.cost, c.clicks, round(c.conversions), c.conversions > 0 ? round(c.cost / c.conversions) : "—"]),
            )
          : "Нет данных по кампаниям."),
      `### Google Ads: расход без конверсий (всего ${wasted.total})\n\n` +
        (wasted.items.length
          ? mdTable(["Запрос", "Расход", "Клики", "Причины"], wasted.items.slice(0, 15).map((w) => [w.term, w.cost, w.clicks, w.reasons.join(", ")]))
          : "Нет запросов с расходом без конверсий."),
    ];
    return {
      detail: `customer ${customer}: ${campaigns.length} кампаний, ${terms.length} поисковых запросов, расход ${curT["Ads cost"]}`,
      metrics,
      findings,
      proposals,
      sections,
      snapshot: { source: opts.snapshotSource, date: opts.snapshotDate, data: { current: cur, previous: prev, campaigns, prevCampaigns, searchTerms: terms, wasted } },
    };
  });
}

// ---------- Search Console ----------

export async function collectGsc(
  cfg: AgentConfig,
  deps: JobDeps,
  token: () => Promise<string>,
  cur: Range,
  prev: Range,
  opts: { snapshotSource: string; snapshotDate: string },
): Promise<SourceResult> {
  return guarded("gsc", async () => {
    const tok = await token();
    const site = cfg.gscSiteUrl;
    if (!site) throw new NotConfiguredError("gscSiteUrl не задан в config.json (запустите discover)");
    const cd = connectorDeps(deps, tok);
    const [curTot, prevTot, queryPage, queries, pages] = await Promise.all([
      searchAnalytics(site, { ...cur, dimensions: [], rowLimit: 1 }, cd),
      searchAnalytics(site, { ...prev, dimensions: [], rowLimit: 1 }, cd),
      searchAnalytics(site, { ...cur, dimensions: ["query", "page"], rowLimit: 5000 }, cd),
      searchAnalytics(site, { ...cur, dimensions: ["query"], rowLimit: 1000 }, cd),
      searchAnalytics(site, { ...cur, dimensions: ["page"], rowLimit: 500 }, cd),
    ]);
    const vals = (rows: GscRow[]): Record<string, number> => {
      const r = rows[0];
      return {
        "GSC clicks": r?.clicks ?? 0,
        "GSC impressions": r?.impressions ?? 0,
        "GSC CTR %": round((r?.ctr ?? 0) * 100),
        "GSC avg position": round(r?.position ?? 0, 1),
      };
    };
    const curV = vals(curTot);
    const metrics = deltas(curV, prevTot.length ? vals(prevTot) : null);
    const low = lowCtrOpportunities(queryPage);
    const striking = strikingDistance(queryPage);
    const cannibal = cannibalization(queryPage);
    const findings = [
      ...findingsFromLowCtr(low.slice(0, 10)),
      ...findingsFromStrikingDistance(striking.slice(0, 10)),
      ...findingsFromCannibalization(cannibal.slice(0, 10)),
    ];
    const proposals: ProposedChange[] = [
      ...low.slice(0, 3).map((i) => ({
        area: "seo" as const,
        change: `Переписать title/description${i.page ? ` на ${shortUrl(i.page)}` : ""} под запрос «${i.query}»`,
        rationale: `CTR ${round(i.ctr * 100, 1)}% при позиции ${round(i.position, 1)}; недобор ~${i.missedClicks} кликов`,
      })),
      ...striking.slice(0, 3).map((i) => ({
        area: "seo" as const,
        change: `Усилить${i.page ? ` ${shortUrl(i.page)}` : " страницу"} под «${i.query}» (контент, внутренние ссылки)`,
        rationale: `позиция ${round(i.position, 1)}, ${i.impressions} показов; потенциал ~+${i.potentialClicks} кликов`,
      })),
      ...cannibal.slice(0, 2).map((i) => ({
        area: "seo" as const,
        change: `Развести страницы по запросу «${i.query}»: ${i.pages.map((p) => shortUrl(p.page)).join(", ")}`,
        rationale: `${i.pages.length} страниц делят ${i.totalImpressions} показов`,
      })),
    ];
    const topPages = [...pages].sort((a, b) => b.clicks - a.clicks).map((p) => p.keys[0] ?? "").filter(Boolean);
    const sections = [
      `### Search Console: запросы (топ-15, ${fmtRange(cur)})\n\n` +
        (queries.length
          ? mdTable(
              ["Запрос", "Клики", "Показы", "CTR %", "Позиция"],
              [...queries].sort((a, b) => b.clicks - a.clicks).slice(0, 15).map((q) => [q.keys[0], q.clicks, q.impressions, round(q.ctr * 100, 1), round(q.position, 1)]),
            )
          : "Нет данных."),
      `### Search Console: страницы (топ-10)\n\n` +
        (pages.length
          ? mdTable(
              ["Страница", "Клики", "Показы", "CTR %", "Позиция"],
              [...pages].sort((a, b) => b.clicks - a.clicks).slice(0, 10).map((p) => [shortUrl(p.keys[0] ?? ""), p.clicks, p.impressions, round(p.ctr * 100, 1), round(p.position, 1)]),
            )
          : "Нет данных."),
    ];
    return {
      detail: `${site}: ${curV["GSC clicks"]} кликов, ${curV["GSC impressions"]} показов за ${fmtRange(cur)}`,
      metrics,
      findings,
      proposals,
      sections,
      snapshot: { source: opts.snapshotSource, date: opts.snapshotDate, data: { current: cur, previous: prev, totals: { current: curTot, previous: prevTot }, queryPage, queries, pages } },
      extra: { topPages },
    };
  });
}

// ---------- site crawl ----------

const toCrawlPage = (p: CrawlResult["pages"][number]): CrawlPage => ({
  url: p.url,
  status: p.status,
  finalUrl: p.finalUrl,
  title: p.title,
  description: p.description,
  h1Count: p.h1Count,
  canonical: p.canonical,
  hreflang: p.hreflang,
  robots: p.metaRobots ?? p.xRobotsTag,
  jsonLdOk: p.jsonLd.valid === p.jsonLd.blocks,
});

/** Site issues → findings; issue types with many pages collapse into one finding with examples. */
function siteFindings(issues: ReturnType<typeof siteIssues>): Finding[] {
  const byType = new Map<string, typeof issues>();
  for (const i of issues) byType.set(i.type, [...(byType.get(i.type) ?? []), i]);
  const out: Finding[] = [];
  for (const [type, list] of byType) {
    if (list.length <= 3) {
      out.push(...findingsFromSiteIssues(list));
      continue;
    }
    const base = findingsFromSiteIssues([list[0]!])[0]!;
    out.push({
      ...base,
      id: `site:${type}:*`,
      title: `${type}: ${list.length} стр.`,
      detail: `Например: ${list.slice(0, 5).map((i) => `${shortUrl(i.url)} (${i.detail})`).join("; ")}.`,
      impact: Math.min(10, base.impact + 1),
    });
  }
  return out;
}

export async function collectSite(
  cfg: AgentConfig,
  deps: JobDeps,
  limit: number,
  opts: { snapshotSource: string; snapshotDate: string },
): Promise<SourceResult> {
  return guarded("site", async () => {
    const siteUrl = cfg.siteUrl;
    if (!siteUrl) throw new NotConfiguredError("siteUrl не задан");
    const crawl = await crawlSite(siteUrl, { limit }, { fetch: deps.fetch, retry: deps.retry });
    const home = crawl.pages[0];
    if (!home || (home.finalStatus === 0 && crawl.robots.status === 0)) {
      throw new Error(`сайт недоступен: ${home?.error ?? "нет ответа"}`);
    }
    const issues = siteIssues(crawl.pages.map(toCrawlPage), { sitemapUrls: crawl.sitemapUrls });
    const values = {
      "Сайт: страниц обойдено": crawl.pages.length,
      "Сайт: не-200": crawl.pages.filter((p) => p.status !== 200).length,
      "Сайт: проблем": issues.length,
      "Сайт: URL в sitemap": crawl.sitemapUrls.length,
    };
    const before = await latestBefore<{ values?: Record<string, number> }>(opts.snapshotSource, opts.snapshotDate);
    const counts = new Map<string, number>();
    for (const i of issues) counts.set(i.type, (counts.get(i.type) ?? 0) + 1);
    const sections = [
      `### Сайт: обход ${crawl.pages.length} стр. (robots ${crawl.robots.status}, sitemap ${crawl.sitemapUrls.length} URL${crawl.truncated ? ", обход ограничен лимитом" : ""})\n\n` +
        (counts.size ? mdTable(["Проблема", "Страниц"], [...counts].sort((a, b) => b[1] - a[1])) : "Проблем не найдено."),
    ];
    const ok = home.finalStatus === 200;
    return {
      state: ok ? "WORKING" : "FAILED",
      detail: `${shortUrl(home.url)} → HTTP ${home.finalStatus}; обойдено ${crawl.pages.length} стр., проблем ${issues.length}`,
      metrics: deltas(values, before?.data.values ?? null),
      findings: siteFindings(issues),
      proposals: [],
      sections,
      snapshot: { source: opts.snapshotSource, date: opts.snapshotDate, data: { values, issues, crawl } },
      extra: { pages: crawl.pages.filter((p) => p.finalStatus === 200).map((p) => p.finalUrl) },
    };
  });
}

// ---------- PageSpeed ----------

export async function collectPsi(deps: JobDeps, urls: string[], opts: { snapshotSource: string; snapshotDate: string }): Promise<SourceResult> {
  return guarded("pagespeed", async () => {
    if (urls.length === 0) throw new NotConfiguredError("нет страниц для проверки");
    const apiKey = await secret(deps, PSI_KEY_NAME);
    const results: PageSpeedResult[] = [];
    const errors: unknown[] = [];
    for (const url of urls) {
      try {
        results.push(await pageSpeed(url, "mobile", { fetch: deps.fetch, retry: deps.retry, apiKey }));
      } catch (err) {
        errors.push(err);
      }
    }
    if (results.length === 0) throw errors[0];
    const label = (u: string): string => `PSI mobile score ${shortUrl(u)}`;
    const values: Record<string, number> = {};
    for (const r of results) if (r.lab.performanceScore !== null) values[label(r.url)] = r.lab.performanceScore;
    const before = await latestBefore<{ values?: Record<string, number> }>(opts.snapshotSource, opts.snapshotDate);
    const findings: Finding[] = [];
    for (const r of results) {
      const score = r.lab.performanceScore;
      const lcp = r.field?.lcpMs?.percentile ?? r.lab.lcpMs;
      if ((score !== null && score < 50) || (lcp !== null && lcp > 4000)) {
        findings.push({
          id: `site:psi:${r.url}`,
          area: "site",
          title: `Медленная страница (mobile): ${shortUrl(r.url)}`,
          detail: `Performance ${score ?? "—"}, LCP ${lcp !== null ? Math.round(lcp) + " мс" : "—"}${r.field ? ` (CrUX ${r.field.scope}: ${r.field.overallCategory ?? "—"})` : ""}.`,
          impact: 5,
          confidence: 0.7,
          effort: 5,
        });
      }
    }
    const ms = (v: number | null | undefined): string => (v === null || v === undefined ? "—" : String(Math.round(v)));
    const sections = [
      `### PageSpeed Insights (mobile)\n\n` +
        mdTable(
          ["Страница", "Score", "LCP мс", "CLS", "TBT мс", "CrUX"],
          results.map((r) => [shortUrl(r.url), r.lab.performanceScore ?? "—", ms(r.lab.lcpMs), r.lab.cls === null ? "—" : round(r.lab.cls, 3), ms(r.lab.tbtMs), r.field ? `${r.field.scope}: ${r.field.overallCategory ?? "—"}` : "нет"]),
        ),
    ];
    return {
      detail: `${results.length}/${urls.length} стр. проверено${apiKey ? "" : " (без API key)"}${errors.length ? `; ошибка: ${statusOf("pagespeed", errors[0]).detail}` : ""}`,
      metrics: deltas(values, before?.data.values ?? null),
      findings,
      proposals: [],
      sections,
      snapshot: { source: opts.snapshotSource, date: opts.snapshotDate, data: { values, results } },
    };
  });
}

/** Up to n distinct same-site URLs: home first, then preferred pages, then fallback pages. */
export function pickPages(siteUrl: string, preferred: string[], fallback: string[], n = 3): string[] {
  const home = new URL("/", siteUrl).toString();
  const out: string[] = [home];
  const host = new URL(siteUrl).host;
  for (const u of [...preferred, ...fallback]) {
    if (out.length >= n) break;
    try {
      const url = new URL(u);
      if (url.host !== host) continue;
      url.hash = "";
      const s = url.toString();
      if (!out.includes(s)) out.push(s);
    } catch {
      /* skip */
    }
  }
  return out.slice(0, n);
}
