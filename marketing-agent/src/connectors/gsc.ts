import { checkDate, googleJson, type ConnectorDeps } from "./http.ts";

/** Read-only Search Console connector. */
export const GSC_SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";
export const GSC_BASE = "https://searchconsole.googleapis.com/webmasters/v3";
export const GSC_INSPECT_URL = "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect";

export type GscSite = { siteUrl: string; permissionLevel: string };

export type GscDimension = "query" | "page" | "country" | "device" | "date" | "searchAppearance";

export type SearchAnalyticsOptions = {
  startDate: string;
  endDate: string;
  dimensions?: GscDimension[];
  rowLimit?: number;
  startRow?: number;
  type?: "web" | "image" | "video" | "news" | "discover" | "googleNews";
  dataState?: "final" | "all";
};

export type GscRow = {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
} & Partial<Record<GscDimension, string>>;

export type GscSitemap = {
  path: string;
  lastSubmitted?: string;
  lastDownloaded?: string;
  isPending?: boolean;
  isSitemapsIndex?: boolean;
  type?: string;
  warnings?: string;
  errors?: string;
  contents?: Array<{ type: string; submitted?: string; indexed?: string }>;
};

const siteSegment = (siteUrl: string): string => `${GSC_BASE}/sites/${encodeURIComponent(siteUrl)}`;

export async function listSites(deps: ConnectorDeps = {}): Promise<GscSite[]> {
  const res = await googleJson<{ siteEntry?: GscSite[] } | null>(`${GSC_BASE}/sites`, {}, deps);
  return res?.siteEntry ?? [];
}

export async function searchAnalytics(
  siteUrl: string,
  opts: SearchAnalyticsOptions,
  deps: ConnectorDeps = {},
): Promise<GscRow[]> {
  const dimensions = opts.dimensions ?? ["query"];
  const body: Record<string, unknown> = {
    startDate: checkDate(opts.startDate, "startDate"),
    endDate: checkDate(opts.endDate, "endDate"),
    dimensions,
    rowLimit: Math.min(Math.max(Math.trunc(opts.rowLimit ?? 1000), 1), 25000),
  };
  if (opts.startRow) body.startRow = opts.startRow;
  if (opts.type) body.type = opts.type;
  if (opts.dataState) body.dataState = opts.dataState;
  const res = await googleJson<{ rows?: Array<Omit<GscRow, GscDimension>> } | null>(
    `${siteSegment(siteUrl)}/searchAnalytics/query`,
    { method: "POST", body },
    deps,
  );
  return (res?.rows ?? []).map((r) => {
    const row: GscRow = {
      keys: r.keys ?? [],
      clicks: r.clicks ?? 0,
      impressions: r.impressions ?? 0,
      ctr: r.ctr ?? 0,
      position: r.position ?? 0,
    };
    dimensions.forEach((d, i) => {
      const v = row.keys[i];
      if (v !== undefined) row[d] = v;
    });
    return row;
  });
}

export type UrlInspectionResult = {
  inspectionResultLink?: string;
  indexStatusResult?: {
    verdict?: string;
    coverageState?: string;
    robotsTxtState?: string;
    indexingState?: string;
    lastCrawlTime?: string;
    pageFetchState?: string;
    googleCanonical?: string;
    userCanonical?: string;
    sitemap?: string[];
    referringUrls?: string[];
    crawledAs?: string;
  };
  mobileUsabilityResult?: unknown;
  richResultsResult?: unknown;
  [key: string]: unknown;
};

export async function inspectUrl(siteUrl: string, url: string, deps: ConnectorDeps = {}): Promise<UrlInspectionResult> {
  const res = await googleJson<{ inspectionResult?: UrlInspectionResult } | null>(
    GSC_INSPECT_URL,
    { method: "POST", body: { inspectionUrl: url, siteUrl } },
    deps,
  );
  return res?.inspectionResult ?? {};
}

export async function listSitemaps(siteUrl: string, deps: ConnectorDeps = {}): Promise<GscSitemap[]> {
  const res = await googleJson<{ sitemap?: GscSitemap[] } | null>(`${siteSegment(siteUrl)}/sitemaps`, {}, deps);
  return res?.sitemap ?? [];
}
