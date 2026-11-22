import { keychainSecret } from "../core/auth.ts";
import { CONFIG_DEFAULTS, loadConfig, type AgentConfig } from "../core/config.ts";
import { checkDate, googleJson, type ConnectorDeps } from "./http.ts";

/** Read-only Google Ads connector (REST searchStream). Never mutates anything. */
export const ADS_SCOPE = "https://www.googleapis.com/auth/adwords";
export const ADS_BASE = "https://googleads.googleapis.com";
export const DEVELOPER_TOKEN_KEY = "google-ads-developer-token";

export type AdsDeps = ConnectorDeps & {
  /** Overrides the Keychain lookup; null means "no developer token". */
  developerToken?: string | null;
  /** Overrides loadConfig() (adsApiVersion, adsLoginCustomerId). */
  config?: AgentConfig;
};

export type AdsRow = Record<string, unknown>;

/** "123-456-7890" → "1234567890". */
export function normalizeCustomerId(id: string): string {
  const digits = id.replace(/-/g, "").trim();
  if (!/^\d{10}$/.test(digits)) throw new Error(`invalid Google Ads customer id: ${id}`);
  return digits;
}

/** GAQL must be a SELECT query (searchStream is read-only anyway; this is a second guard). */
export function assertReadOnlyGaql(gaql: string): string {
  const q = gaql.trim();
  if (!/^select\s/i.test(q)) throw new Error("only SELECT GAQL queries are allowed");
  return q;
}

export function searchStreamUrl(customerId: string, version: string): string {
  if (!/^v\d+$/.test(version)) throw new Error(`invalid Google Ads API version: ${version}`);
  return `${ADS_BASE}/${version}/customers/${normalizeCustomerId(customerId)}/googleAds:searchStream`;
}

/** Runs a GAQL SELECT via searchStream and returns all result rows flattened across stream chunks. */
export async function searchStream(customerId: string, gaql: string, deps: AdsDeps = {}): Promise<AdsRow[]> {
  const query = assertReadOnlyGaql(gaql);
  const config = deps.config ?? (await loadConfig());
  const version = config.adsApiVersion ?? CONFIG_DEFAULTS.adsApiVersion;
  const devToken = deps.developerToken !== undefined ? deps.developerToken : await keychainSecret(DEVELOPER_TOKEN_KEY);
  const headers: Record<string, string> = {};
  if (devToken) headers["developer-token"] = devToken;
  if (config.adsLoginCustomerId) headers["login-customer-id"] = normalizeCustomerId(config.adsLoginCustomerId);
  const res = await googleJson<Array<{ results?: AdsRow[] }> | { results?: AdsRow[] } | null>(
    searchStreamUrl(customerId, version),
    { method: "POST", body: { query }, headers },
    deps,
  );
  const chunks = Array.isArray(res) ? res : res ? [res] : [];
  return chunks.flatMap((c) => c.results ?? []);
}

export type DateRange = { startDate: string; endDate: string };

const during = (r: DateRange): string =>
  `segments.date BETWEEN '${checkDate(r.startDate, "startDate")}' AND '${checkDate(r.endDate, "endDate")}'`;

const METRICS = "metrics.cost_micros, metrics.clicks, metrics.impressions, metrics.conversions, metrics.conversions_value";

/** Ready-made read-only GAQL queries. */
export const GAQL = {
  campaigns: (r: DateRange): string =>
    `SELECT campaign.id, campaign.name, campaign.status, campaign.advertising_channel_type, ` +
    `campaign_budget.amount_micros, ${METRICS} FROM campaign WHERE ${during(r)}`,
  searchTerms: (r: DateRange, limit = 1000): string =>
    `SELECT search_term_view.search_term, search_term_view.status, campaign.name, ad_group.name, ` +
    `${METRICS} FROM search_term_view WHERE ${during(r)} ORDER BY metrics.cost_micros DESC LIMIT ${Math.trunc(limit)}`,
  keywords: (r: DateRange): string =>
    `SELECT ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type, ad_group_criterion.status, ` +
    `ad_group_criterion.quality_info.quality_score, campaign.name, ad_group.name, ${METRICS} ` +
    `FROM keyword_view WHERE ${during(r)}`,
  geo: (r: DateRange): string =>
    `SELECT geographic_view.country_criterion_id, geographic_view.location_type, campaign.name, ` +
    `${METRICS} FROM geographic_view WHERE ${during(r)}`,
} as const;

export type GaqlReport = keyof typeof GAQL;

/** Runs one of the ready-made reports. */
export async function adsReport(report: GaqlReport, customerId: string, range: DateRange, deps: AdsDeps = {}): Promise<AdsRow[]> {
  return searchStream(customerId, GAQL[report](range), deps);
}

/** cost_micros (string or number) → currency units. */
export function micros(value: unknown): number {
  const n = Number(value ?? 0);
  return Number.isFinite(n) ? n / 1_000_000 : 0;
}
