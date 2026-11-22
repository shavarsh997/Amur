import { keychainSecret } from "../core/auth.ts";
import { googleJson, type ConnectorDeps } from "./http.ts";

/** PageSpeed Insights v5. Uses the Keychain API key `psi-api-key` if present, otherwise anonymous quota. */
export const PSI_URL = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
export const PSI_KEY_NAME = "psi-api-key";

export type Strategy = "mobile" | "desktop";

export type PsiDeps = ConnectorDeps & {
  /** Overrides the Keychain lookup; null means "no key". */
  apiKey?: string | null;
};

export type FieldMetric = { percentile: number; category?: string };

export type FieldData = {
  scope: "url" | "origin";
  overallCategory?: string;
  lcpMs?: FieldMetric;
  inpMs?: FieldMetric;
  cls?: FieldMetric;
  fcpMs?: FieldMetric;
  ttfbMs?: FieldMetric;
};

export type PageSpeedResult = {
  url: string;
  strategy: Strategy;
  finalUrl?: string;
  fetchTime?: string;
  lab: {
    performanceScore: number | null;
    lcpMs: number | null;
    fcpMs: number | null;
    cls: number | null;
    tbtMs: number | null;
    speedIndexMs: number | null;
    ttiMs: number | null;
  };
  /** CrUX field data for the URL, or origin-level fallback, or null. */
  field: FieldData | null;
};

type RawExperience = {
  id?: string;
  overall_category?: string;
  origin_fallback?: boolean;
  metrics?: Record<string, { percentile?: number; category?: string }>;
};

type RawPsi = {
  id?: string;
  loadingExperience?: RawExperience;
  originLoadingExperience?: RawExperience;
  lighthouseResult?: {
    finalUrl?: string;
    finalDisplayedUrl?: string;
    fetchTime?: string;
    categories?: { performance?: { score?: number | null } };
    audits?: Record<string, { numericValue?: number }>;
  };
};

export function psiUrl(url: string, strategy: Strategy, apiKey?: string | null): string {
  const u = new URL(PSI_URL);
  u.searchParams.set("url", url);
  u.searchParams.set("strategy", strategy);
  u.searchParams.set("category", "performance");
  if (apiKey) u.searchParams.set("key", apiKey);
  return u.toString();
}

function fieldFrom(exp: RawExperience | undefined, scope: "url" | "origin"): FieldData | null {
  const m = exp?.metrics;
  if (!m || Object.keys(m).length === 0) return null;
  const pick = (key: string, divide = 1): FieldMetric | undefined => {
    const v = m[key];
    if (!v || typeof v.percentile !== "number") return undefined;
    return { percentile: v.percentile / divide, category: v.category };
  };
  return {
    scope,
    overallCategory: exp?.overall_category,
    lcpMs: pick("LARGEST_CONTENTFUL_PAINT_MS"),
    inpMs: pick("INTERACTION_TO_NEXT_PAINT"),
    cls: pick("CUMULATIVE_LAYOUT_SHIFT_SCORE", 100),
    fcpMs: pick("FIRST_CONTENTFUL_PAINT_MS"),
    ttfbMs: pick("EXPERIMENTAL_TIME_TO_FIRST_BYTE"),
  };
}

export function parsePsi(raw: RawPsi, url: string, strategy: Strategy): PageSpeedResult {
  const lh = raw.lighthouseResult;
  const audit = (id: string): number | null => {
    const v = lh?.audits?.[id]?.numericValue;
    return typeof v === "number" ? v : null;
  };
  const score = lh?.categories?.performance?.score;
  const urlLevel = raw.loadingExperience && !raw.loadingExperience.origin_fallback ? raw.loadingExperience : undefined;
  return {
    url,
    strategy,
    finalUrl: lh?.finalDisplayedUrl ?? lh?.finalUrl,
    fetchTime: lh?.fetchTime,
    lab: {
      performanceScore: typeof score === "number" ? Math.round(score * 100) : null,
      lcpMs: audit("largest-contentful-paint"),
      fcpMs: audit("first-contentful-paint"),
      cls: audit("cumulative-layout-shift"),
      tbtMs: audit("total-blocking-time"),
      speedIndexMs: audit("speed-index"),
      ttiMs: audit("interactive"),
    },
    field: fieldFrom(urlLevel, "url") ?? fieldFrom(raw.originLoadingExperience, "origin"),
  };
}

export async function pageSpeed(url: string, strategy: Strategy = "mobile", deps: PsiDeps = {}): Promise<PageSpeedResult> {
  const apiKey = deps.apiKey !== undefined ? deps.apiKey : await keychainSecret(PSI_KEY_NAME);
  const raw = await googleJson<RawPsi | null>(psiUrl(url, strategy, apiKey), { anonymous: true, timeoutMs: 120_000 }, deps);
  return parsePsi(raw ?? {}, url, strategy);
}
