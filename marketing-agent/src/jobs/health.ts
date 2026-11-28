import { quotaProject } from "../core/auth.ts";
import { CONFIG_DEFAULTS, loadConfig, type AgentConfig } from "../core/config.ts";
import { googleJson } from "../connectors/http.ts";
import { accountSummaries, listProperties, runReport, reportRows, withHostFilter } from "../connectors/ga4.ts";
import { listSites, searchAnalytics, type GscSite } from "../connectors/gsc.ts";
import { ADS_BASE, DEVELOPER_TOKEN_KEY, normalizeCustomerId, searchStream } from "../connectors/ads.ts";
import { pageSpeed, PSI_KEY_NAME } from "../connectors/psi.ts";
import { crawlSite } from "../connectors/site.ts";
import { AI_KEY_NAMES, isRejectedKey, probeEngine } from "../connectors/ai-engines.ts";
import type { AiApiEngine } from "../analysis/ai-visibility.ts";
import type { IntegrationState, IntegrationStatus } from "../analysis/types.ts";
import { addDays, connectorDeps, secret, statusOf, tokenOnce, type JobDeps } from "./context.ts";
import { today } from "../core/paths.ts";

export const HEALTH_SOURCES = ["gcp-auth", "ga4", "gsc", "google-ads", "pagespeed", "site", "ai-openai", "ai-perplexity", "ai-gemini"] as const;

type Probe = { state?: IntegrationState; detail: string };

async function probe(name: string, fn: () => Promise<Probe>): Promise<IntegrationStatus> {
  try {
    const r = await fn();
    return { name, status: r.state ?? "WORKING", detail: r.detail };
  } catch (err) {
    return statusOf(name, err);
  }
}

/** Read-only: lists Google Ads customers accessible to the authorized user. */
export async function listAccessibleCustomers(
  cfg: AgentConfig,
  deps: JobDeps,
  token: string,
  developerToken: string | null,
): Promise<string[]> {
  const version = cfg.adsApiVersion ?? CONFIG_DEFAULTS.adsApiVersion;
  if (!/^v\d+$/.test(version)) throw new Error(`invalid Google Ads API version: ${version}`);
  const headers: Record<string, string> = {};
  if (developerToken) headers["developer-token"] = developerToken;
  if (cfg.adsLoginCustomerId) headers["login-customer-id"] = normalizeCustomerId(cfg.adsLoginCustomerId);
  const res = await googleJson<{ resourceNames?: string[] } | null>(
    `${ADS_BASE}/${version}/customers:listAccessibleCustomers`,
    { method: "GET", headers },
    connectorDeps(deps, token),
  );
  return (res?.resourceNames ?? []).map((r) => r.replace(/^customers\//, ""));
}

/** GSC properties that belong to the configured site host (domain property or URL-prefix). */
export function matchingSites(sites: GscSite[], siteUrl: string): GscSite[] {
  const host = new URL(siteUrl).host.replace(/^www\./, "");
  return sites.filter((s) => {
    if (s.permissionLevel === "siteUnverifiedUser") return false;
    if (s.siteUrl.startsWith("sc-domain:")) return s.siteUrl.slice(10) === host;
    try {
      return new URL(s.siteUrl).host.replace(/^www\./, "") === host;
    } catch {
      return false;
    }
  });
}

/** Real read-only request per source. Never throws: every failure is a status. */
export async function runHealth(deps: JobDeps = {}): Promise<IntegrationStatus[]> {
  const cfg = await loadConfig();
  const token = tokenOnce(deps);
  const siteUrl = cfg.siteUrl ?? CONFIG_DEFAULTS.siteUrl;

  const probes: Record<(typeof HEALTH_SOURCES)[number], () => Promise<Probe>> = {
    "gcp-auth": async () => {
      await token();
      const qp = await quotaProject();
      return { detail: `access token получен; quota project: ${qp ?? "не задан"}` };
    },
    ga4: async () => {
      const cd = connectorDeps(deps, await token());
      if (cfg.ga4PropertyId) {
        const hosts = cfg.ga4HostNames ?? CONFIG_DEFAULTS.ga4HostNames;
        const body = { dateRanges: [{ startDate: "7daysAgo", endDate: "yesterday" }], metrics: [{ name: "sessions" }] };
        const res = await runReport(cfg.ga4PropertyId, withHostFilter(body, hosts), cd);
        const sessions = reportRows(res)[0]?.sessions ?? 0;
        const note = hosts.length ? " (hostName-фильтр)" : "";
        return { detail: `property ${cfg.ga4PropertyId}: ${sessions} сессий за 7 дней${note}` };
      }
      const props = listProperties(await accountSummaries(cd));
      return { state: "NOT CONFIGURED", detail: `ga4PropertyId не задан; доступно свойств: ${props.length} (запустите discover)` };
    },
    gsc: async () => {
      const cd = connectorDeps(deps, await token());
      const sites = await listSites(cd);
      if (!cfg.gscSiteUrl) {
        return { state: "NOT CONFIGURED", detail: `gscSiteUrl не задан; доступно ресурсов: ${sites.length}, подходящих: ${matchingSites(sites, siteUrl).length} (запустите discover)` };
      }
      const entry = sites.find((s) => s.siteUrl === cfg.gscSiteUrl);
      if (!entry || entry.permissionLevel === "siteUnverifiedUser") {
        return { state: "BLOCKED", detail: `нет доступа к ${cfg.gscSiteUrl} у этого аккаунта` };
      }
      const end = addDays(today(), -3);
      const rows = await searchAnalytics(cfg.gscSiteUrl, { startDate: addDays(end, -6), endDate: end, dimensions: [], rowLimit: 1 }, cd);
      return { detail: `${cfg.gscSiteUrl} (${entry.permissionLevel}): ${rows[0]?.clicks ?? 0} кликов за 7 дней` };
    },
    "google-ads": async () => {
      const tok = await token();
      // Developer token is optional: without it the call goes through the GCP project's Explorer access.
      const developerToken = await secret(deps, DEVELOPER_TOKEN_KEY);
      const customerProbe = (id: string) =>
        searchStream(id, "SELECT customer.id, customer.descriptive_name, customer.currency_code FROM customer LIMIT 1", {
          ...connectorDeps(deps, tok),
          developerToken,
          config: cfg,
        });
      if (cfg.adsCustomerId) {
        const rows = await customerProbe(cfg.adsCustomerId);
        const c = (rows[0]?.customer ?? {}) as { descriptiveName?: string; currencyCode?: string };
        return { detail: `customer ${cfg.adsCustomerId}: ${c.descriptiveName ?? "?"} (${c.currencyCode ?? "?"})` };
      }
      const ids = await listAccessibleCustomers(cfg, deps, tok, developerToken);
      // listAccessibleCustomers works without access to data; probe one customer so a real blocker shows up before discover.
      if (ids[0]) await customerProbe(ids[0]);
      return { state: "NOT CONFIGURED", detail: `adsCustomerId не задан; доступно аккаунтов: ${ids.length} (запустите discover)` };
    },
    pagespeed: async () => {
      const apiKey = await secret(deps, PSI_KEY_NAME);
      const r = await pageSpeed(siteUrl, "mobile", { fetch: deps.fetch, retry: deps.retry, apiKey });
      return { detail: `${siteUrl}: mobile score ${r.lab.performanceScore ?? "—"}${apiKey ? "" : " (без API key)"}` };
    },
    site: async () => {
      const crawl = await crawlSite(siteUrl, { limit: 1 }, { fetch: deps.fetch, retry: deps.retry });
      const home = crawl.pages[0];
      const status = home?.finalStatus ?? 0;
      const detail = `${siteUrl} → HTTP ${status}${home?.error ? ` (${home.error})` : ""}; robots ${crawl.robots.status}; sitemap ${crawl.sitemapUrls.length} URL`;
      return { state: status === 200 ? "WORKING" : "FAILED", detail };
    },
    "ai-openai": () => aiProbe("openai"),
    "ai-perplexity": () => aiProbe("perplexity"),
    "ai-gemini": () => aiProbe("gemini"),
  };

  /** AI answer engines for `ai-visibility run`: no Keychain key → NOT CONFIGURED, no request. */
  async function aiProbe(engine: AiApiEngine): Promise<Probe> {
    const keyName = AI_KEY_NAMES[engine];
    const apiKey = await secret(deps, keyName);
    if (!apiKey) return { state: "NOT CONFIGURED", detail: `нет ключа в Keychain (сервис shinex-marketing, имя ${keyName})` };
    try {
      return { detail: await probeEngine(engine, { apiKey, model: cfg.aiModels?.[engine], fetch: deps.fetch, retry: deps.retry }) };
    } catch (err) {
      if (isRejectedKey(err)) return { state: "AUTH REQUIRED", detail: `ключ ${keyName} отклонён — обновите в Keychain` };
      throw err;
    }
  }

  return Promise.all(HEALTH_SOURCES.map((name) => probe(name, probes[name])));
}

export function formatHealthTable(rows: IntegrationStatus[]): string {
  const w1 = Math.max(6, ...rows.map((r) => r.name.length));
  const w2 = Math.max(6, ...rows.map((r) => r.status.length));
  const line = (a: string, b: string, c: string): string => `${a.padEnd(w1)}  ${b.padEnd(w2)}  ${c}`;
  return [line("SOURCE", "STATUS", "DETAIL"), line("-".repeat(w1), "-".repeat(w2), "------"), ...rows.map((r) => line(r.name, r.status, r.detail ?? ""))].join("\n");
}
