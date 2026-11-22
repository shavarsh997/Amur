import { classifyIntent, hasTerm, tokenize } from "./seo.ts";
import type { AdsSearchTerm } from "./types.ts";

/** Terms that never lead to a renovation contract (jobs, free, DIY, materials-only, other cities). */
export const IRRELEVANT_MARKERS = [
  // hy: աշխատանք (job), անվճար (free), դասընթաց (course)
  "աշխատանք", "անվճար", "դասընթաց", "ինքնուրույն",
  // ru
  "вакансия", "вакансии", "работа", "резюме", "бесплатно", "своими руками", "курсы", "обучение", "скачать",
  // en
  "job", "jobs", "vacancy", "salary", "free", "diy", "course", "download",
] as const;

export function irrelevantMarker(term: string): string | null {
  const tokens = tokenize(term);
  return IRRELEVANT_MARKERS.find((m) => hasTerm(tokens, m)) ?? null;
}

export type WastedReason = "no-conversions" | "irrelevant" | "informational";

export type WastedItem = AdsSearchTerm & { reasons: WastedReason[] };

/** Spend without conversions (cost > minCost), tagged irrelevant/informational where applicable. Sorted by cost. */
export function wastedSpend(
  terms: AdsSearchTerm[],
  opts: { minCost?: number } = {},
): { total: number; items: WastedItem[] } {
  const { minCost = 0 } = opts;
  const items: WastedItem[] = [];
  for (const t of terms) {
    if (t.conversions > 0 || t.cost <= minCost) continue;
    const reasons: WastedReason[] = ["no-conversions"];
    if (irrelevantMarker(t.term)) reasons.push("irrelevant");
    if (classifyIntent(t.term) === "informational") reasons.push("informational");
    items.push({ ...t, reasons });
  }
  items.sort((a, b) => b.cost - a.cost);
  const total = Math.round(items.reduce((s, i) => s + i.cost, 0) * 100) / 100;
  return { total, items };
}

export type NegativeCandidate = {
  /** Keyword to add as negative. */
  keyword: string;
  matchType: "phrase" | "exact";
  reason: string;
  cost: number;
  sourceTerm: string;
};

/**
 * Negative keyword proposals (never applied automatically):
 * irrelevant marker → phrase negative on the marker; informational term without conversions → exact;
 * other non-converting terms with ≥ minClicks clicks → exact.
 */
export function negativeCandidates(terms: AdsSearchTerm[], opts: { minClicks?: number } = {}): NegativeCandidate[] {
  const { minClicks = 5 } = opts;
  const byKey = new Map<string, NegativeCandidate>();
  const add = (c: NegativeCandidate): void => {
    const key = `${c.matchType}:${c.keyword}`;
    const prev = byKey.get(key);
    if (prev) prev.cost = Math.round((prev.cost + c.cost) * 100) / 100;
    else byKey.set(key, c);
  };
  for (const t of terms) {
    if (t.conversions > 0) continue;
    const marker = irrelevantMarker(t.term);
    if (marker) {
      add({ keyword: marker, matchType: "phrase", reason: "irrelevant", cost: t.cost, sourceTerm: t.term });
    } else if (classifyIntent(t.term) === "informational") {
      add({ keyword: t.term, matchType: "exact", reason: "informational", cost: t.cost, sourceTerm: t.term });
    } else if (t.clicks >= minClicks) {
      add({ keyword: t.term, matchType: "exact", reason: `no conversions after ${t.clicks} clicks`, cost: t.cost, sourceTerm: t.term });
    }
  }
  return [...byKey.values()].sort((a, b) => b.cost - a.cost);
}

/** Cost per acquisition over all rows; null without conversions. */
export function cpa(rows: Array<{ cost: number; conversions: number }>): number | null {
  const cost = rows.reduce((s, r) => s + r.cost, 0);
  const conv = rows.reduce((s, r) => s + r.conversions, 0);
  return conv > 0 ? Math.round((cost / conv) * 100) / 100 : null;
}
