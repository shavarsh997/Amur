import { googleJson, type ConnectorDeps } from "./http.ts";

/** Read-only GA4 connector: Admin API v1beta + Data API v1beta. */
export const GA4_SCOPE = "https://www.googleapis.com/auth/analytics.readonly";
export const GA4_ADMIN_BASE = "https://analyticsadmin.googleapis.com/v1beta";
export const GA4_DATA_BASE = "https://analyticsdata.googleapis.com/v1beta";

export type PropertySummary = { property: string; displayName?: string; propertyType?: string; parent?: string };
export type AccountSummary = {
  name: string;
  account: string;
  displayName?: string;
  propertySummaries?: PropertySummary[];
};

export type KeyEvent = {
  name: string;
  eventName: string;
  createTime?: string;
  deletable?: boolean;
  custom?: boolean;
  countingMethod?: string;
};

export type RunReportResponse = {
  dimensionHeaders?: Array<{ name: string }>;
  metricHeaders?: Array<{ name: string; type?: string }>;
  rows?: Array<{ dimensionValues?: Array<{ value?: string }>; metricValues?: Array<{ value?: string }> }>;
  totals?: unknown[];
  rowCount?: number;
  metadata?: unknown;
  [key: string]: unknown;
};

/** "123", "properties/123" → "properties/123". */
export function propertyName(propertyId: string): string {
  const id = propertyId.trim().replace(/^properties\//, "");
  if (!/^\d+$/.test(id)) throw new Error(`invalid GA4 property id: ${propertyId}`);
  return `properties/${id}`;
}

async function paged<T>(baseUrl: string, field: string, deps: ConnectorDeps): Promise<T[]> {
  const out: T[] = [];
  let pageToken: string | undefined;
  for (let page = 0; page < 50; page++) {
    const url = new URL(baseUrl);
    url.searchParams.set("pageSize", "200");
    if (pageToken) url.searchParams.set("pageToken", pageToken);
    const res = await googleJson<Record<string, unknown> | null>(url.toString(), {}, deps);
    out.push(...(((res?.[field] as T[] | undefined) ?? [])));
    pageToken = typeof res?.nextPageToken === "string" && res.nextPageToken !== "" ? res.nextPageToken : undefined;
    if (!pageToken) break;
  }
  return out;
}

export async function accountSummaries(deps: ConnectorDeps = {}): Promise<AccountSummary[]> {
  return paged<AccountSummary>(`${GA4_ADMIN_BASE}/accountSummaries`, "accountSummaries", deps);
}

/** Flattens account summaries to { propertyId, displayName, account }. */
export function listProperties(
  summaries: AccountSummary[],
): Array<{ propertyId: string; displayName?: string; account: string; accountName?: string }> {
  return summaries.flatMap((a) =>
    (a.propertySummaries ?? []).map((p) => ({
      propertyId: p.property.replace(/^properties\//, ""),
      displayName: p.displayName,
      account: a.account,
      accountName: a.displayName,
    })),
  );
}

/**
 * Adds a hostName inListFilter to a runReport body (the GA4 property is shared by several sites).
 * An existing dimensionFilter is combined with it via andGroup. Empty list → body unchanged.
 */
export function withHostFilter(body: Record<string, unknown>, hostNames: readonly string[] | undefined): Record<string, unknown> {
  if (!hostNames || hostNames.length === 0) return body;
  const hostFilter = { filter: { fieldName: "hostName", inListFilter: { values: [...hostNames] } } };
  const existing = body.dimensionFilter;
  return { ...body, dimensionFilter: existing ? { andGroup: { expressions: [existing, hostFilter] } } : hostFilter };
}

export async function runReport(
  propertyId: string,
  body: Record<string, unknown>,
  deps: ConnectorDeps = {},
): Promise<RunReportResponse> {
  const res = await googleJson<RunReportResponse | null>(
    `${GA4_DATA_BASE}/${propertyName(propertyId)}:runReport`,
    { method: "POST", body },
    deps,
  );
  return res ?? {};
}

/** Converts a runReport response to records: dimensions as strings, metrics as numbers. */
export function reportRows(res: RunReportResponse): Array<Record<string, string | number>> {
  const dims = (res.dimensionHeaders ?? []).map((h) => h.name);
  const mets = (res.metricHeaders ?? []).map((h) => h.name);
  return (res.rows ?? []).map((r) => {
    const rec: Record<string, string | number> = {};
    dims.forEach((d, i) => (rec[d] = r.dimensionValues?.[i]?.value ?? ""));
    mets.forEach((m, i) => {
      const n = Number(r.metricValues?.[i]?.value ?? 0);
      rec[m] = Number.isFinite(n) ? n : 0;
    });
    return rec;
  });
}

export async function keyEvents(propertyId: string, deps: ConnectorDeps = {}): Promise<KeyEvent[]> {
  return paged<KeyEvent>(`${GA4_ADMIN_BASE}/${propertyName(propertyId)}/keyEvents`, "keyEvents", deps);
}
