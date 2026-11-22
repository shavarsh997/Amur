/** Input and output types shared by the pure analysis functions. No runtime code here. */

/** Search Console searchAnalytics row. keys follow the requested dimensions, e.g. [query] or [query, page]. */
export type GscRow = {
  keys: string[];
  clicks: number;
  impressions: number;
  /** 0..1 */
  ctr: number;
  position: number;
};

/** Google Ads search term row; cost in account currency (not micros). */
export type AdsSearchTerm = {
  term: string;
  cost: number;
  clicks: number;
  conversions: number;
};

export type HreflangLink = { lang: string; href: string };

/** One crawled page as returned by connectors/site.ts crawlSite. */
export type CrawlPage = {
  url: string;
  status: number;
  finalUrl: string;
  title: string | null;
  description: string | null;
  h1Count: number;
  canonical: string | null;
  hreflang: HreflangLink[];
  /** meta robots content, e.g. "noindex, follow"; null when absent. */
  robots: string | null;
  /** All JSON-LD blocks parse (true when there are none). */
  jsonLdOk: boolean;
};

export type Intent = "transactional" | "informational" | "navigational";

export type MetricValues = Record<string, number>;

export type MetricDelta = {
  metric: string;
  current: number;
  previous: number | null;
  change: number | null;
  /** Percent, e.g. 25 for +25 %; null when previous is missing or 0. */
  changePct: number | null;
};

export type FindingArea = "seo" | "ads" | "site" | "funnel" | "analytics";

export type Finding = {
  id: string;
  area: FindingArea;
  title: string;
  detail: string;
  /** Expected commercial effect, 1..10. */
  impact: number;
  /** 0..1 */
  confidence: number;
  /** Relative effort, 1..10 (higher = more work). */
  effort: number;
};

export type RankedFinding = Finding & { score: number };

export type IntegrationState = "WORKING" | "AUTH REQUIRED" | "BLOCKED" | "FAILED" | "NOT CONFIGURED";

export type IntegrationStatus = {
  name: string;
  status: IntegrationState;
  detail?: string;
};

/** A change the agent suggests; never applied without human approval. */
export type ProposedChange = {
  area: FindingArea;
  change: string;
  rationale: string;
};

export type FunnelStage = "visit" | "lead" | "qualified" | "inspection" | "contract";

/** Funnel record without personal data. */
export type FunnelRecord = {
  date: string;
  stage: FunnelStage;
  channel: string;
  landing?: string;
  service?: string;
  region?: string;
  reason?: string;
};
