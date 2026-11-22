import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { CONFIG_DEFAULTS, loadConfig, type AgentConfig } from "../core/config.ts";
import { record, runOnce } from "../core/ledger.ts";
import { log } from "../core/log.ts";
import { dataDir, ensureDir } from "../core/paths.ts";
import { saveSnapshot } from "../core/store.ts";
import { rankOpportunities } from "../analysis/opportunities.ts";
import type { ProposedChange } from "../analysis/types.ts";
import { renderReport } from "../reports/render.ts";
import { collectAds, collectGa4, collectGa4Funnel, collectGsc, collectPsi, collectSite, pickPages, type SourceResult } from "./collect.ts";
import { addDays, fmtRange, previousMonths, print, tokenOnce, type JobDeps, type Range } from "./context.ts";
import { experimentsMarkdown, funnelMarkdown, listExperiments } from "./journal.ts";

export type JobName = "daily" | "weekly" | "monthly";

export type JobOptions = { date: string; force?: boolean };

export type JobOutcome = { reportPath: string; summary: string; reused: boolean; key: string };

type Built = { title: string; period: string; results: SourceResult[]; extraSections?: string[]; extraProposals?: ProposedChange[] };

const AREA_RU: Record<string, string> = { seo: "SEO", ads: "Google Ads", site: "Сайт", funnel: "Воронка", analytics: "Аналитика" };

function compose(job: JobName, date: string, b: Built): { markdown: string; summary: string } {
  const integrations = b.results.map((r) => r.status);
  const metrics = b.results.flatMap((r) => r.metrics);
  const findings = b.results.flatMap((r) => r.findings);
  const proposedChanges = [...b.results.flatMap((r) => r.proposals), ...(b.extraProposals ?? [])];
  const top = rankOpportunities(findings, 5);
  const sections = [...b.results.flatMap((r) => r.sections), ...(b.extraSections ?? [])];
  let markdown = renderReport({ title: b.title, date, period: b.period, integrations, metrics, findings, opportunities: top, proposedChanges });
  if (sections.length) markdown += `\n## Детализация\n\n${sections.join("\n\n")}\n`;

  const working = integrations.filter((i) => i.status === "WORKING").length;
  const blocked = integrations.filter((i) => i.status !== "WORKING");
  const lines = [
    `${job} ${date} · период ${b.period}`,
    `Источники: ${working}/${integrations.length} WORKING — ${integrations.map((i) => `${i.name}=${i.status}`).join(", ")}`,
  ];
  const changed = metrics.filter((m) => m.changePct !== null).slice(0, 4);
  if (changed.length) lines.push(`Метрики: ${changed.map((m) => `${m.metric} ${m.current} (${m.changePct! > 0 ? "+" : ""}${m.changePct}%)`).join("; ")}`);
  lines.push(`Находок: ${findings.length}; предложений: ${proposedChanges.length}`);
  if (top[0]) lines.push(`Главное: [${AREA_RU[top[0].area] ?? top[0].area}] ${top[0].title}`);
  if (blocked.length) lines.push(`Без доступа: ${blocked.map((i) => i.name).join(", ")} — см. раздел «Интеграции»; после исправления: --force`);
  return { markdown, summary: lines.join("\n") };
}

async function runJob(job: JobName, key: string, opts: JobOptions, deps: JobDeps, build: (cfg: AgentConfig) => Promise<Built>): Promise<JobOutcome> {
  let reused = true;
  const work = async (): Promise<{ reportPath: string; summary: string }> => {
    reused = false;
    await log("info", "job.start", { job, key, date: opts.date, force: Boolean(opts.force) });
    const cfg = await loadConfig();
    const built = await build(cfg);
    for (const r of built.results) {
      if (r.snapshot) await saveSnapshot(r.snapshot.source, r.snapshot.date, r.snapshot.data);
    }
    const { markdown, summary } = compose(job, opts.date, built);
    const dir = await ensureDir(join(dataDir(), "reports"));
    const reportPath = join(dir, `${job}-${opts.date}.md`);
    await writeFile(reportPath, markdown, "utf8");
    await log("info", "job.done", { job, key, reportPath, statuses: built.results.map((r) => `${r.status.name}=${r.status.status}`) });
    return { reportPath, summary };
  };
  // --force bypasses the ledger check but overwrites the main key, so the next plain run shows the latest result.
  let result: { reportPath: string; summary: string };
  if (opts.force) {
    result = await work();
    await record(key, result);
  } else {
    result = await runOnce(key, work);
  }
  return { ...result, reused, key };
}

/** GA4 + Ads: last 7 complete days vs the 7 before; site crawl of 30 pages. */
export function runDaily(opts: JobOptions, deps: JobDeps = {}): Promise<JobOutcome> {
  const d = opts.date;
  const cur: Range = { startDate: addDays(d, -7), endDate: addDays(d, -1) };
  const prev: Range = { startDate: addDays(d, -14), endDate: addDays(d, -8) };
  return runJob("daily", `daily:${d}`, opts, deps, async (cfg) => {
    const token = tokenOnce(deps);
    const results = await Promise.all([
      collectGa4(cfg, deps, token, cur, prev, { snapshotSource: "ga4", snapshotDate: d }),
      collectAds(cfg, deps, token, cur, prev, { snapshotSource: "ads", snapshotDate: d }),
      collectSite(cfg, deps, 30, { snapshotSource: "site", snapshotDate: d }),
    ]);
    return { title: `Ежедневный отчёт SHINEX — ${d}`, period: `${fmtRange(cur)} vs ${fmtRange(prev)}`, results };
  });
}

async function seoAndSite(cfg: AgentConfig, deps: JobDeps, token: () => Promise<string>, cur: Range, prev: Range, snap: { gsc: string; date: string }): Promise<SourceResult[]> {
  const [gsc, site] = await Promise.all([
    collectGsc(cfg, deps, token, cur, prev, { snapshotSource: snap.gsc, snapshotDate: snap.date }),
    collectSite(cfg, deps, 150, { snapshotSource: "site-full", snapshotDate: snap.date }),
  ]);
  const pages = pickPages(
    cfg.siteUrl ?? CONFIG_DEFAULTS.siteUrl,
    (gsc.extra?.topPages as string[] | undefined) ?? [],
    (site.extra?.pages as string[] | undefined) ?? [],
    3,
  );
  const psi = await collectPsi(deps, pages, { snapshotSource: "psi", snapshotDate: snap.date });
  return [gsc, site, psi];
}

/** GSC 28 days (query+page) vs previous 28, opportunities, crawl of 150 pages, PSI for 3 main pages, GA4 lead funnel (same range). */
export function runWeekly(opts: JobOptions, deps: JobDeps = {}): Promise<JobOutcome> {
  const d = opts.date;
  // Search Console data lags ~2-3 days.
  const end = addDays(d, -3);
  const cur: Range = { startDate: addDays(end, -27), endDate: end };
  const prev: Range = { startDate: addDays(end, -55), endDate: addDays(end, -28) };
  return runJob("weekly", `weekly:${d}`, opts, deps, async (cfg) => {
    const token = tokenOnce(deps);
    const [seo, funnel] = await Promise.all([
      seoAndSite(cfg, deps, token, cur, prev, { gsc: "gsc", date: d }),
      collectGa4Funnel(cfg, deps, token, cur, prev, { snapshotSource: "ga4-funnel", snapshotDate: d }),
    ]);
    const results = [...seo, funnel];
    return { title: `Еженедельный SEO-отчёт SHINEX — ${d}`, period: `${fmtRange(cur)} vs ${fmtRange(prev)}`, results };
  });
}

/** Previous calendar month vs the month before: GA4, Ads, GSC, site, PSI, funnel and a plan. */
export function runMonthly(opts: JobOptions, deps: JobDeps = {}): Promise<JobOutcome> {
  const d = opts.date;
  const { month, current: cur, previous: prev } = previousMonths(d);
  return runJob("monthly", `monthly:${month}`, opts, deps, async (cfg) => {
    const token = tokenOnce(deps);
    const snap = { snapshotDate: cur.startDate };
    const [ga4, ads, seo] = await Promise.all([
      collectGa4(cfg, deps, token, cur, prev, { snapshotSource: "ga4-month", ...snap }),
      collectAds(cfg, deps, token, cur, prev, { snapshotSource: "ads-month", ...snap }),
      seoAndSite(cfg, deps, token, cur, prev, { gsc: "gsc-month", date: d }),
    ]);
    const results = [ga4, ads, ...seo];
    const findings = results.flatMap((r) => r.findings);
    const plan = rankOpportunities(findings, 10);
    const active = await listExperiments();
    const open = active.filter((e) => e.status === "approved" || e.status === "applied");
    const planLines = plan.length
      ? plan.map((o, i) => `${i + 1}. [ ] [${AREA_RU[o.area] ?? o.area}] ${o.title} — ${o.detail} (score ${o.score})`).join("\n")
      : "Нет данных для плана: подключите источники (см. «Интеграции»).";
    const extraSections = [
      `### Воронка (${fmtRange(cur)})\n\n${await funnelMarkdown({ from: cur.startDate, to: cur.endDate })}`,
      `### План на следующий месяц\n\nПриоритеты по score = влияние × уверенность / усилие. Выполняются только после подтверждения.\n\n${planLines}`,
      `### Эксперименты к оценке (approved/applied)\n\n${experimentsMarkdown(open)}`,
    ];
    return { title: `Ежемесячный отчёт SHINEX — ${month}`, period: `${fmtRange(cur)} vs ${fmtRange(prev)}`, results, extraSections };
  });
}

export function printOutcome(deps: JobDeps, o: JobOutcome): void {
  if (o.reused) print(deps, `Уже выполнено (ledger: ${o.key}); повторить: --force`);
  print(deps, `Отчёт: ${o.reportPath}`);
  print(deps, o.summary);
}
