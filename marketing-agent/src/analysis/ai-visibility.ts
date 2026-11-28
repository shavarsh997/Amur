/** AI-recommendation visibility: answer parsing and aggregation (pure functions, no network, no fs). */

/** Engines queried through an API by `ai-visibility run`. */
export const AI_API_ENGINES = ["openai", "perplexity", "gemini"] as const;
export type AiApiEngine = (typeof AI_API_ENGINES)[number];
/** Engines checked by hand in a browser and entered with `ai-visibility record`. */
export const AI_MANUAL_ENGINES = ["chatgpt", "copilot", "ai-mode"] as const;
export const AI_ENGINES = [...AI_API_ENGINES, ...AI_MANUAL_ENGINES] as const;
export type AiEngine = (typeof AI_ENGINES)[number];

export type AiCitation = { url: string; title?: string };

export type AiAnswerAnalysis = {
  /**
   * SHINEX named in the answer (Latin, Cyrillic or Armenian spelling, or shinex.am) in a list item / paragraph
   * with shinex.am or construction/renovation words, and without cleaning words or other Shinex domains.
   */
  mentioned: boolean;
  /** 1-based position of SHINEX among the companies named, in order of appearance; null when not mentioned. */
  rank: number | null;
  /** shinex.am among the sources/links of the answer. */
  cited: boolean;
  /** All companies in order of appearance (SHINEX included). */
  companies: string[];
  /** Companies other than SHINEX. */
  competitors: string[];
  /** Domains of cited sources except shinex.am. */
  citedDomains: string[];
};

/** One stored check (`ai-visibility/results.jsonl` in the data directory). */
export type AiVisibilityRecord = {
  date: string;
  ts: string;
  engine: string;
  promptId: string;
  lang: string;
  service: string;
  source: "api" | "manual";
  mentioned: boolean;
  rank: number | null;
  /** null: unknown (manual entry without --cited). */
  cited: boolean | null;
  competitors: string[];
  citedDomains?: string[];
  model?: string;
  answer?: string;
  citations?: AiCitation[];
};

// ---------- SHINEX detection ----------

const L = "\\p{L}\\p{N}";
const NAME_SRC = `(?<![${L}])(?:shine[xх]|шайн[еэ]кс|шин[еэ]кс|շայնեքս|շայնէքս|շայնեկս|շինեքս)(?![${L}])`;
/**
 * The name SHINEX in Latin (also with Cyrillic «Х», as once happened in GBP), Cyrillic transliterations and Armenian.
 * Does not match the unrelated "ShinX". Other companies are called Shinex too — see isOurShinexContext.
 */
const SHINEX_RE = new RegExp(NAME_SRC, "iu");
const SHINEX_RE_G = new RegExp(NAME_SRC, "giu");
const SHINEX_DOMAIN_RE = /(?<![\p{L}\p{N}-])(?:www\.)?shinex\.am(?![\p{L}\p{N}-])/iu;
const SHINEX_DOMAIN_RE_G = new RegExp(SHINEX_DOMAIN_RE.source, "giu");
/** Our business: construction / renovation. */
const OUR_CONTEXT_RE = /строительн|ремонт|construction|renovation|շինարար|վերանորոգ/iu;
/** Another Shinex: cleaning business or a non-.am Shinex domain (shinex.io, shinex.co, ...). */
const FOREIGN_RE = /clean|клининг|մաքրում|(?<![\p{L}\p{N}-])shinex\.(?!am(?![\p{L}\p{N}-]))[a-z]{2,}(?![\p{L}\p{N}-])/iu;

/** The name or domain is present (no context check). */
export function isShinex(text: string): boolean {
  return SHINEX_RE.test(text) || SHINEX_DOMAIN_RE.test(text);
}

/**
 * A list item / paragraph that names Shinex is about SHINEX only when it carries shinex.am or construction/renovation
 * words, and has no cleaning words or foreign Shinex domains.
 */
export function isOurShinexContext(segment: string): boolean {
  if (FOREIGN_RE.test(segment)) return false;
  return SHINEX_DOMAIN_RE.test(segment) || OUR_CONTEXT_RE.test(segment);
}

type Segment = { start: number; end: number };

/**
 * Splits an answer into units: each top-level list item or heading (with its indented sub-lines and, for a heading,
 * the paragraph right after it) and each plain paragraph.
 */
export function segmentsOf(text: string): Segment[] {
  const out: Segment[] = [];
  let cur: (Segment & { headingOnly: boolean }) | null = null;
  let off = 0;
  for (const line of text.split("\n")) {
    const start = off;
    const end = off + line.length;
    off = end + 1;
    if (line.trim() === "") {
      if (cur && !cur.headingOnly) {
        out.push(cur);
        cur = null;
      }
      continue;
    }
    const heading = HEADING_RE.exec(line);
    const item = LIST_RE.exec(line) ?? heading;
    const indent = item ? item[1]!.replace(/\t/g, "  ").length : 0;
    if (item && indent < 2) {
      if (cur) out.push(cur);
      cur = { start, end, headingOnly: heading !== null };
    } else if (cur) {
      cur.end = end;
      cur.headingOnly = false;
    } else {
      cur = { start, end, headingOnly: false };
    }
  }
  if (cur) out.push(cur);
  return out;
}

type ShinexHits = { ours: number[]; foreign: number[] };

function shinexHits(text: string): ShinexHits {
  const segs = segmentsOf(text);
  const hits: ShinexHits = { ours: [], foreign: [] };
  const offsets = [...text.matchAll(SHINEX_RE_G), ...text.matchAll(SHINEX_DOMAIN_RE_G)].map((m) => m.index ?? 0);
  for (const at of [...new Set(offsets)].sort((a, b) => a - b)) {
    (isOurShinexContext(unitOf(text, segs, at)) ? hits.ours : hits.foreign).push(at);
  }
  return hits;
}

/** Text of the unit (list item / paragraph) containing offset `at`. */
function unitOf(text: string, segs: Segment[], at: number): string {
  const seg = segs.find((s) => at >= s.start && at <= s.end);
  return seg ? text.slice(seg.start, seg.end) : text;
}

// ---------- company extraction (heuristic) ----------

/** Labels that look like list items but are not companies. Compared lower-cased. */
const LABELS = new Set(
  [
    // en
    "price", "prices", "pricing", "cost", "costs", "pros", "cons", "website", "site", "phone", "contact", "contacts", "address",
    "services", "experience", "guarantee", "warranty", "rating", "reviews", "note", "notes", "tip", "tips", "summary",
    "conclusion", "recommendation", "recommendations", "why", "location", "specialization", "features", "best for",
    "how to choose", "what to check", "sources", "key factors", "timeline", "budget", "portfolio", "licensing", "important",
    // ru
    "цена", "цены", "стоимость", "плюсы", "минусы", "сайт", "телефон", "контакты", "адрес", "услуги", "опыт", "гарантия",
    "рейтинг", "отзывы", "примечание", "совет", "советы", "итог", "итоги", "вывод", "выводы", "рекомендация",
    "рекомендации", "почему", "особенности", "преимущества", "недостатки", "специализация", "важно", "источники",
    "сроки", "бюджет", "портфолио", "как выбрать", "что проверить", "на что обратить внимание",
    // hy
    "գին", "գինը", "գներ", "արժեք", "կայք", "հեռախոս", "հասցե", "կոնտակտներ", "ծառայություններ", "փորձ", "երաշխիք",
    "վարկանիշ", "կարծիքներ", "խորհուրդ", "խորհուրդներ", "եզրակացություն", "առավելություններ", "թերություններ",
    "մասնագիտացում", "կարևոր", "աղբյուրներ", "ժամկետներ", "բյուջե",
  ].map((s) => s.toLowerCase()),
);

const PREFIX_RE = /^(?:компания|фирма|студия|строительная компания|company|studio|ընկերություն)\s+/iu;
const LEGAL_RE = /(?:^|\s)(?:ооо|оао|зао|llc|ltd|inc|սպը|փբը)\.?(?=\s|$)/giu;
const LIST_RE = /^(\s*)(?:#{1,6}\s*)?(?:\d{1,2}[.)]|[-*•–])\s+(.*)$/u;
const HEADING_RE = /^(\s*)#{1,6}\s+(.*)$/u;
const BOLD_RE = /\*\*([^*\n]{1,80})\*\*|__([^_\n]{1,80})__/gu;
const LINK_START_RE = /^\[([^\]\n]{1,80})\]\([^)\n]*\)/u;
const QUOTED_RE = /«([^»\n]{1,60})»/gu;
const LINK_RE = /\[([^\]\n]{1,80})\]\((https?:[^)\s]*)\)/gu;

/** Normalized key for de-duplication: lower-case, no legal form, no punctuation. */
export function companyKey(name: string): string {
  return name
    .toLowerCase()
    .replace(LEGAL_RE, " ")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function cleanName(raw: string): string | null {
  let s = raw
    .replace(/\[([^\]]*)\]\([^)]*\)/gu, "$1")
    .replace(/[*_`]/gu, "")
    .replace(/^[\s"'“”«»„]+|[\s"'“”«»„.,;!]+$/gu, "")
    .replace(/\s+/gu, " ")
    .trim();
  const quoted = /^[^«"“]*[«"“]([^»"”]+)[»"”]/u.exec(raw.replace(/[*_]/gu, ""));
  if (quoted && PREFIX_RE.test(s)) s = quoted[1]!.trim();
  s = s.replace(PREFIX_RE, "").trim();
  if (s.endsWith(":") || s.endsWith("?")) return null;
  if (s.length < 2 || s.length > 60) return null;
  const words = s.split(" ");
  if (words.length > 5) return null;
  if (!/^[\p{Lu}\p{N}]/u.test(s) && !isShinex(s)) return null;
  if (LABELS.has(s.toLowerCase())) return null;
  if (!companyKey(s)) return null;
  return s;
}

/** Leading part of a list item / heading: the company name before a dash, colon, bracket or comma. */
function leadingName(content: string): string | null {
  const bold = /^\s*(?:\*\*([^*\n]+)\*\*|__([^_\n]+)__)/u.exec(content);
  if (bold) {
    const inner = (bold[1] ?? bold[2] ?? "").trim();
    if (inner.endsWith(":")) return null;
    return cleanName(inner.split(/\s+[—–-]\s+|:\s|\s\(/u)[0] ?? "");
  }
  const link = LINK_START_RE.exec(content.trim());
  if (link) return cleanName(link[1]!);
  const head = content.split(/\s+[—–-]\s+|:(?:\s|$)|\s\(|,\s|\.\s/u)[0] ?? "";
  return cleanName(head);
}

type Found = { name: string; offset: number };

/**
 * Companies named in an answer, in order of first appearance.
 * Heuristic: top-level list items and headings (name before a dash/colon/bracket), bold spans, markdown links, «quotes».
 * Plain names inside running text are not detected; SHINEX itself is always found by spelling.
 * A Shinex in a unit without construction/renovation context (or with cleaning / a non-.am domain) is another company.
 */
export function extractCompanies(text: string): string[] {
  const found: Found[] = [];
  let offset = 0;
  for (const line of text.split("\n")) {
    const list = LIST_RE.exec(line) ?? HEADING_RE.exec(line);
    const indent = list ? list[1]!.replace(/\t/g, "  ").length : 0;
    if (list && indent < 2) {
      const name = leadingName(list[2]!);
      if (name) found.push({ name, offset: offset + line.indexOf(list[2]!) });
    }
    const isSubItem = list !== null && indent >= 2;
    if (!isSubItem) {
      for (const m of line.matchAll(BOLD_RE)) {
        const inner = (m[1] ?? m[2] ?? "").trim();
        if (inner.endsWith(":")) continue;
        const name = cleanName(inner);
        if (name) found.push({ name, offset: offset + (m.index ?? 0) });
      }
      for (const m of line.matchAll(LINK_RE)) {
        // Link text that is itself a URL/domain is a source, not a company name.
        if (DOMAIN_RE.test(m[1]!.trim()) || /^https?:/u.test(m[1]!)) continue;
        const name = cleanName(m[1]!);
        if (name && name.split(" ").length <= 4) found.push({ name, offset: offset + (m.index ?? 0) });
      }
      for (const m of line.matchAll(QUOTED_RE)) {
        const name = cleanName(m[1]!);
        if (name && name.split(" ").length <= 4) found.push({ name, offset: offset + (m.index ?? 0) });
      }
    }
    offset += line.length + 1;
  }
  found.sort((a, b) => a.offset - b.offset);
  const segs = segmentsOf(text);
  const seen = new Set<string>();
  const out: string[] = [];
  let shinexSeen = false;
  for (const f of found) {
    let name = f.name;
    if (isShinex(name)) {
      if (isOurShinexContext(unitOf(text, segs, f.offset))) {
        if (!shinexSeen) out.push("SHINEX");
        shinexSeen = true;
        continue;
      }
      name = `${name} (не SHINEX)`;
    }
    const key = companyKey(name);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(name);
  }
  return out;
}

function hostOf(url: string): string | null {
  try {
    return new URL(url).host.toLowerCase().replace(/^www\./, "");
  } catch {
    return null;
  }
}

const DOMAIN_RE = /^(?:www\.)?([a-z0-9-]+(?:\.[a-z0-9-]+)+)$/i;

/** Cited domain; Gemini grounding URLs are redirects, so the title (a domain) is used for them. */
export function citationDomain(c: AiCitation): string | null {
  const host = hostOf(c.url);
  const title = c.title?.trim() ?? "";
  if ((!host || host.endsWith("vertexaisearch.cloud.google.com")) && DOMAIN_RE.test(title)) {
    return title.toLowerCase().replace(/^www\./, "");
  }
  return host;
}

const URL_IN_TEXT_RE = /https?:\/\/[^\s)\]>"'«»]+/giu;

export function analyzeAnswer(text: string, citations: readonly AiCitation[] = []): AiAnswerAnalysis {
  const companies = extractCompanies(text);
  const hits = shinexHits(text);
  const shinexAt = hits.ours[0] ?? -1;
  const mentioned = shinexAt >= 0;
  let ordered = companies;
  if (mentioned && !companies.includes("SHINEX")) {
    // Mentioned in running text only: place it by its first position among the extracted names.
    const positions = companies.map((name) => ({ name, at: text.indexOf(name) }));
    const before = positions.filter((p) => p.at >= 0 && p.at < shinexAt).length;
    ordered = [...companies.slice(0, before), "SHINEX", ...companies.slice(before)];
  }
  const rank = mentioned ? ordered.indexOf("SHINEX") + 1 : null;

  const domains = new Set<string>();
  for (const c of citations) {
    const d = citationDomain(c);
    if (d) domains.add(d);
  }
  for (const m of text.matchAll(URL_IN_TEXT_RE)) {
    const d = hostOf(m[0]);
    if (d) domains.add(d);
  }
  const isShinexDomain = (d: string): boolean => d === "shinex.am" || d.endsWith(".shinex.am");
  const cited = [...domains].some(isShinexDomain) || citations.some((c) => SHINEX_DOMAIN_RE.test(c.title ?? ""));

  return {
    mentioned,
    rank,
    cited,
    companies: ordered,
    competitors: ordered.filter((c) => c !== "SHINEX"),
    citedDomains: [...domains].filter((d) => !isShinexDomain(d)).sort(),
  };
}

// ---------- aggregation ----------

export type AiShare = {
  checks: number;
  mentioned: number;
  top3: number;
  /** Checks where citation is known (API checks and manual entries with --cited). */
  citedKnown: number;
  cited: number;
};

export type AiVisibilitySummary = {
  window: { from: string; to: string };
  total: AiShare;
  byEngine: Record<string, AiShare>;
  byLang: Record<string, AiShare>;
  competitors: Array<{ name: string; count: number }>;
  /** Weekly mention share (week = Monday date), latest check per engine × prompt within each week. */
  dynamics: Array<{ week: string; total: AiShare; byEngine: Record<string, AiShare> }>;
};

const DAY = 86_400_000;
const addDays = (d: string, n: number): string => new Date(Date.parse(`${d}T00:00:00Z`) + n * DAY).toISOString().slice(0, 10);

export function weekOf(date: string): string {
  const dow = (new Date(`${date}T00:00:00Z`).getUTCDay() + 6) % 7; // Monday = 0
  return addDays(date, -dow);
}

const emptyShare = (): AiShare => ({ checks: 0, mentioned: 0, top3: 0, citedKnown: 0, cited: 0 });

function addTo(s: AiShare, r: AiVisibilityRecord): void {
  s.checks++;
  if (r.mentioned) s.mentioned++;
  if (r.mentioned && r.rank !== null && r.rank <= 3) s.top3++;
  if (r.cited !== null && r.cited !== undefined) {
    s.citedKnown++;
    if (r.cited) s.cited++;
  }
}

/** Latest record per engine × prompt (by date, then timestamp). */
export function latestPerCheck(records: readonly AiVisibilityRecord[]): AiVisibilityRecord[] {
  const best = new Map<string, AiVisibilityRecord>();
  for (const r of records) {
    const key = `${r.engine}\u0000${r.promptId}`;
    const cur = best.get(key);
    if (!cur || r.date > cur.date || (r.date === cur.date && r.ts >= cur.ts)) best.set(key, r);
  }
  return [...best.values()];
}

function shares(records: readonly AiVisibilityRecord[], by: (r: AiVisibilityRecord) => string): Record<string, AiShare> {
  const out: Record<string, AiShare> = {};
  for (const r of records) addTo((out[by(r)] ??= emptyShare()), r);
  return out;
}

/** Current state = latest check per engine × prompt within `windowDays` up to `asOf`; dynamics over the last `weeks` weeks. */
export function summarizeAiVisibility(
  records: readonly AiVisibilityRecord[],
  opts: { asOf: string; windowDays?: number; weeks?: number },
): AiVisibilitySummary {
  const from = addDays(opts.asOf, -((opts.windowDays ?? 28) - 1));
  const upTo = records.filter((r) => r.date <= opts.asOf);
  const current = latestPerCheck(upTo.filter((r) => r.date >= from));
  const total = emptyShare();
  for (const r of current) addTo(total, r);

  const counts = new Map<string, { name: string; count: number }>();
  for (const r of current) {
    for (const c of new Set(r.competitors.map(companyKey))) {
      const name = r.competitors.find((x) => companyKey(x) === c) ?? c;
      const e = counts.get(c) ?? { name, count: 0 };
      e.count++;
      counts.set(c, e);
    }
  }
  const competitors = [...counts.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name)).slice(0, 10);

  const byWeek = new Map<string, AiVisibilityRecord[]>();
  for (const r of upTo) {
    const w = weekOf(r.date);
    byWeek.set(w, [...(byWeek.get(w) ?? []), r]);
  }
  const dynamics = [...byWeek.keys()]
    .sort()
    .slice(-(opts.weeks ?? 8))
    .map((week) => {
      const latest = latestPerCheck(byWeek.get(week)!);
      const t = emptyShare();
      for (const r of latest) addTo(t, r);
      return { week, total: t, byEngine: shares(latest, (r) => r.engine) };
    });

  return {
    window: { from, to: opts.asOf },
    total,
    byEngine: shares(current, (r) => r.engine),
    byLang: shares(current, (r) => r.lang),
    competitors,
    dynamics,
  };
}
