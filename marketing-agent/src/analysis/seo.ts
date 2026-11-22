import type { GscRow, Intent } from "./types.ts";

/** Lowercases, drops Armenian emphasis/question marks inside words, splits on non-letters/digits. */
export function tokenize(text: string): string[] {
  return text
    .toLocaleLowerCase()
    .replace(/[՛՜՞՟]/g, "")
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean);
}

/**
 * Matches a term against tokens. A single word is a stem (token starts with it);
 * a multi-word term must appear as consecutive stem matches.
 */
export function hasTerm(tokens: string[], term: string): boolean {
  const parts = tokenize(term);
  if (parts.length === 0) return false;
  for (let i = 0; i + parts.length <= tokens.length; i++) {
    if (parts.every((p, j) => tokens[i + j].startsWith(p))) return true;
  }
  return false;
}

const hasAny = (tokens: string[], terms: readonly string[]): boolean => terms.some((t) => hasTerm(tokens, t));

/** Brand names → navigational. */
const BRAND = ["shinex", "шинекс", "шайнекс", "շինեքս", "շայնեքս"] as const;

/** Price / buying signals: transactional even inside a question ("сколько стоит ремонт"). */
const PRICE = [
  // hy: գին/գներ (price), արժե/արժեք (cost), նախահաշիվ (estimate), պատվիրել (order)
  "գին", "գներ", "արժե", "արժեք", "նախահաշիվ", "պատվիր",
  // ru
  "цен", "стоим", "сколько стоит", "смет", "заказ", "купить", "прайс", "расценк", "недорог", "дешев",
  // en
  "price", "pricing", "cost", "quote", "estimate", "hire", "near me", "cheap", "affordable",
] as const;

/** Question / research signals → informational (checked after PRICE). */
const INFO = [
  // hy: ինչպես (how), ինչ է (what is), ինչու (why), խորհուրդ (advice), գաղափար (idea), ձեռքով (by hand)
  "ինչպես", "ինչ է", "ինչու", "խորհուրդ", "գաղափար", "ինքնուրույն",
  // ru
  "как", "что такое", "почему", "зачем", "своими руками", "идеи", "советы", "инструкция", "фото", "видео", "отзыв",
  // en
  "how", "what is", "why", "diy", "ideas", "guide", "tutorial", "tips",
] as const;

/** Service words: a bare service query is a buying query. */
const SERVICE = [
  // hy: վերանորոգում (renovation), շինարարական ընկերություն, դիզայն, ձեղնահարկ...
  "վերանորոգ", "շինարար", "դիզայն", "կապալառու", "մոնոլիտ", "հարդարում",
  // ru
  "ремонт", "отделк", "строительн", "строительство", "под ключ", "дизайн интерьер", "подрядчик", "бригад",
  // en
  "renovation", "remodel", "repair", "contractor", "construction", "interior design", "fit out", "turnkey",
] as const;

/** Classifies a search query (hy/ru/en). Order: brand → price → question → service → informational. */
export function classifyIntent(query: string): Intent {
  const tokens = tokenize(query);
  if (hasAny(tokens, BRAND)) return "navigational";
  if (hasAny(tokens, PRICE)) return "transactional";
  if (hasAny(tokens, INFO)) return "informational";
  if (hasAny(tokens, SERVICE)) return "transactional";
  return "informational";
}

/** Typical organic CTR by rounded position (1..10); below 10 a small floor. */
const CTR_CURVE = [0.28, 0.15, 0.1, 0.07, 0.05, 0.04, 0.03, 0.025, 0.02, 0.018] as const;

export function expectedCtr(position: number): number {
  const p = Math.max(1, Math.round(position));
  return p <= CTR_CURVE.length ? CTR_CURVE[p - 1] : 0.01;
}

const query = (r: GscRow): string => r.keys[0] ?? "";
const page = (r: GscRow): string | undefined => r.keys[1];

export type LowCtrItem = {
  query: string;
  page?: string;
  impressions: number;
  clicks: number;
  ctr: number;
  position: number;
  expectedCtr: number;
  /** Clicks missed versus the expected CTR for this position. */
  missedClicks: number;
};

/** Top-10 rows with enough impressions whose CTR is below `ratio` × expected CTR. Sorted by missed clicks. */
export function lowCtrOpportunities(
  rows: GscRow[],
  opts: { minImpressions?: number; maxPosition?: number; ratio?: number } = {},
): LowCtrItem[] {
  const { minImpressions = 100, maxPosition = 10, ratio = 0.5 } = opts;
  const out: LowCtrItem[] = [];
  for (const r of rows) {
    if (r.impressions < minImpressions || r.position > maxPosition) continue;
    const exp = expectedCtr(r.position);
    if (r.ctr >= exp * ratio) continue;
    out.push({
      query: query(r),
      page: page(r),
      impressions: r.impressions,
      clicks: r.clicks,
      ctr: r.ctr,
      position: r.position,
      expectedCtr: exp,
      missedClicks: Math.round(r.impressions * (exp - r.ctr)),
    });
  }
  return out.sort((a, b) => b.missedClicks - a.missedClicks);
}

export type StrikingItem = {
  query: string;
  page?: string;
  impressions: number;
  clicks: number;
  position: number;
  /** Extra clicks if the row reached position 3. */
  potentialClicks: number;
};

/** Transactional queries at positions 4–20 with at least `minImpressions`. Sorted by potential clicks. */
export function strikingDistance(rows: GscRow[], opts: { minImpressions?: number } = {}): StrikingItem[] {
  const { minImpressions = 20 } = opts;
  const target = expectedCtr(3);
  const out: StrikingItem[] = [];
  for (const r of rows) {
    if (r.position < 4 || r.position > 20 || r.impressions < minImpressions) continue;
    if (classifyIntent(query(r)) !== "transactional") continue;
    out.push({
      query: query(r),
      page: page(r),
      impressions: r.impressions,
      clicks: r.clicks,
      position: r.position,
      potentialClicks: Math.max(0, Math.round(r.impressions * target - r.clicks)),
    });
  }
  return out.sort((a, b) => b.potentialClicks - a.potentialClicks);
}

export type CannibalItem = {
  query: string;
  totalImpressions: number;
  pages: Array<{ page: string; impressions: number; clicks: number; position: number }>;
};

/**
 * Rows with keys [query, page]: a query is cannibalized when ≥2 pages each have
 * ≥ minImpressions and ≥ minShare of the query's impressions.
 */
export function cannibalization(
  rows: GscRow[],
  opts: { minImpressions?: number; minShare?: number } = {},
): CannibalItem[] {
  const { minImpressions = 10, minShare = 0.1 } = opts;
  const byQuery = new Map<string, GscRow[]>();
  for (const r of rows) {
    const q = query(r);
    if (!q || page(r) === undefined) continue;
    const list = byQuery.get(q) ?? [];
    list.push(r);
    byQuery.set(q, list);
  }
  const out: CannibalItem[] = [];
  for (const [q, list] of byQuery) {
    const total = list.reduce((s, r) => s + r.impressions, 0);
    if (total === 0) continue;
    const pages = list
      .filter((r) => r.impressions >= minImpressions && r.impressions / total >= minShare)
      .map((r) => ({ page: page(r) as string, impressions: r.impressions, clicks: r.clicks, position: r.position }))
      .sort((a, b) => b.impressions - a.impressions);
    if (pages.length >= 2) out.push({ query: q, totalImpressions: total, pages });
  }
  return out.sort((a, b) => b.totalImpressions - a.totalImpressions);
}
