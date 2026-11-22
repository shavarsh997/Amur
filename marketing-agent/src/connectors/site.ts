import { HttpError, withRetry, type RetryOptions } from "../core/retry.ts";
import { USER_AGENT, type FetchFn } from "./http.ts";

/** Read-only crawler for the public site: robots.txt, sitemap.xml and per-page SEO tags. No dependencies. */

export type CrawlOptions = {
  /** Max pages to fetch (default 50). */
  limit?: number;
  concurrency?: number;
  timeoutMs?: number;
};

export type SiteDeps = { fetch?: FetchFn; retry?: RetryOptions };

export type Hreflang = { lang: string; href: string };

export type JsonLdInfo = { blocks: number; valid: number; types: string[]; errors: string[] };

export type PageInfo = {
  url: string;
  /** Status of the first response (3xx if redirected). 0 = network error. */
  status: number;
  finalUrl: string;
  finalStatus: number;
  redirects: Array<{ url: string; status: number }>;
  inSitemap: boolean;
  contentType: string | null;
  title: string | null;
  description: string | null;
  h1Count: number;
  canonical: string | null;
  hreflang: Hreflang[];
  metaRobots: string | null;
  xRobotsTag: string | null;
  jsonLd: JsonLdInfo;
  error?: string;
};

export type RobotsInfo = {
  url: string;
  status: number;
  sitemaps: string[];
  disallow: string[];
  allow: string[];
};

export type SitemapInfo = { url: string; status: number; isIndex: boolean; urlCount: number; error?: string };

export type CrawlResult = {
  siteUrl: string;
  startedAt: string;
  finishedAt: string;
  robots: RobotsInfo;
  sitemaps: SitemapInfo[];
  sitemapUrls: string[];
  pages: PageInfo[];
  skippedByRobots: string[];
  truncated: boolean;
};

const MAX_REDIRECTS = 5;
const MAX_CHILD_SITEMAPS = 20;
const NON_HTML_EXT = /\.(?:jpe?g|png|gif|webp|avif|svg|ico|pdf|zip|rar|docx?|xlsx?|pptx?|mp4|webm|mp3|css|js|mjs|json|xml|txt|woff2?|ttf|eot)$/i;

// ---------- small HTML helpers ----------

export function decodeEntities(s: string): string {
  return s.replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos|nbsp|#39);/gi, (m, e: string) => {
    const k = e.toLowerCase();
    if (k.startsWith("#x")) return safeCodePoint(parseInt(k.slice(2), 16), m);
    if (k.startsWith("#")) return safeCodePoint(parseInt(k.slice(1), 10), m);
    return ({ amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " } as Record<string, string>)[k] ?? m;
  });
}

function safeCodePoint(n: number, fallback: string): string {
  try {
    return String.fromCodePoint(n);
  } catch {
    return fallback;
  }
}

const clean = (s: string): string => decodeEntities(s).replace(/\s+/g, " ").trim();

/** Parses attributes of a single start tag, lowercasing names. */
export function parseAttrs(tag: string): Record<string, string> {
  const out: Record<string, string> = {};
  const inner = tag.replace(/^<\s*[a-z0-9:-]+/i, "").replace(/\/?>$/, "");
  const re = /([^\s=/>"']+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  for (const m of inner.matchAll(re)) {
    const name = m[1]?.toLowerCase();
    if (!name || name in out) continue;
    out[name] = decodeEntities(m[2] ?? m[3] ?? m[4] ?? "");
  }
  return out;
}

const tags = (html: string, name: string): Array<Record<string, string>> =>
  [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map((m) => parseAttrs(m[0]));

function collectTypes(node: unknown, out: Set<string>): void {
  if (Array.isArray(node)) {
    for (const n of node) collectTypes(n, out);
    return;
  }
  if (!node || typeof node !== "object") return;
  const obj = node as Record<string, unknown>;
  const t = obj["@type"];
  if (typeof t === "string") out.add(t);
  else if (Array.isArray(t)) t.forEach((x) => typeof x === "string" && out.add(x));
  if (obj["@graph"]) collectTypes(obj["@graph"], out);
}

export type ParsedHtml = Pick<
  PageInfo,
  "title" | "description" | "h1Count" | "canonical" | "hreflang" | "metaRobots" | "jsonLd"
> & { links: string[] };

/** Extracts SEO fields and raw link hrefs from an HTML document. */
export function parseHtml(html: string, baseUrl: string): ParsedHtml {
  // JSON-LD first, then drop scripts/styles/comments so their contents can't fake tags.
  const jsonLd: JsonLdInfo = { blocks: 0, valid: 0, types: [], errors: [] };
  const types = new Set<string>();
  for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)) {
    const attrs = parseAttrs(`<script ${m[1] ?? ""}>`);
    if ((attrs.type ?? "").trim().toLowerCase() !== "application/ld+json") continue;
    jsonLd.blocks++;
    try {
      collectTypes(JSON.parse((m[2] ?? "").trim()), types);
      jsonLd.valid++;
    } catch (err) {
      jsonLd.errors.push((err as Error).message.slice(0, 200));
    }
  }
  jsonLd.types = [...types].sort();

  const stripped = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<script\b[\s\S]*?<\/script\s*>/gi, "")
    .replace(/<style\b[\s\S]*?<\/style\s*>/gi, "")
    .replace(/<noscript\b[\s\S]*?<\/noscript\s*>/gi, "");
  const headEnd = stripped.search(/<\/head\s*>/i);
  const head = headEnd >= 0 ? stripped.slice(0, headEnd) : stripped;

  const titleMatch = head.match(/<title\b[^>]*>([\s\S]*?)<\/title\s*>/i) ?? stripped.match(/<title\b[^>]*>([\s\S]*?)<\/title\s*>/i);
  const metas = tags(head, "meta");
  const metaByName = (n: string): string | null => {
    const found = metas.find((a) => (a.name ?? "").toLowerCase() === n);
    return found?.content !== undefined ? clean(found.content) : null;
  };
  const links = tags(head, "link");
  const relHas = (a: Record<string, string>, rel: string): boolean =>
    (a.rel ?? "").toLowerCase().split(/\s+/).includes(rel);
  const abs = (href: string): string => {
    try {
      return new URL(href, baseUrl).toString();
    } catch {
      return href;
    }
  };
  const canonicalTag = links.find((a) => relHas(a, "canonical") && a.href);
  const hreflang = links
    .filter((a) => relHas(a, "alternate") && a.hreflang && a.href)
    .map((a) => ({ lang: a.hreflang!.trim(), href: abs(a.href!.trim()) }));

  return {
    title: titleMatch ? clean(titleMatch[1] ?? "") : null,
    description: metaByName("description"),
    h1Count: (stripped.match(/<h1\b/gi) ?? []).length,
    canonical: canonicalTag ? abs(canonicalTag.href!.trim()) : null,
    hreflang,
    metaRobots: metaByName("robots"),
    jsonLd,
    links: tags(stripped, "a")
      .map((a) => a.href)
      .filter((h): h is string => typeof h === "string" && h.trim() !== ""),
  };
}

// ---------- robots.txt ----------

type RobotsRules = { allow: string[]; disallow: string[]; sitemaps: string[] };

/** Rules for User-agent: * (or our own agent token, which wins if present). */
export function parseRobots(text: string): RobotsRules {
  const groups: Array<{ agents: string[]; allow: string[]; disallow: string[] }> = [];
  const sitemaps: string[] = [];
  let current: { agents: string[]; allow: string[]; disallow: string[] } | null = null;
  let lastWasAgent = false;
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.replace(/#.*$/, "").trim();
    const idx = line.indexOf(":");
    if (idx < 0) continue;
    const key = line.slice(0, idx).trim().toLowerCase();
    const value = line.slice(idx + 1).trim();
    if (key === "sitemap") {
      if (value) sitemaps.push(value);
      continue;
    }
    if (key === "user-agent") {
      if (!current || !lastWasAgent) {
        current = { agents: [], allow: [], disallow: [] };
        groups.push(current);
      }
      current.agents.push(value.toLowerCase());
      lastWasAgent = true;
      continue;
    }
    lastWasAgent = false;
    if (!current) continue;
    if (key === "allow" && value) current.allow.push(value);
    if (key === "disallow" && value) current.disallow.push(value);
  }
  const own = groups.filter((g) => g.agents.some((a) => a !== "*" && a !== "" && "shinex-marketing-agent".startsWith(a)));
  const chosen = own.length ? own : groups.filter((g) => g.agents.includes("*"));
  return {
    allow: chosen.flatMap((g) => g.allow),
    disallow: chosen.flatMap((g) => g.disallow),
    sitemaps,
  };
}

function ruleMatch(rule: string, path: string): number {
  const anchored = rule.endsWith("$");
  const body = anchored ? rule.slice(0, -1) : rule;
  const re = new RegExp("^" + body.split("*").map((p) => p.replace(/[.+?^${}()|[\]\\]/g, "\\$&")).join(".*") + (anchored ? "$" : ""));
  return re.test(path) ? body.length : -1;
}

/** Longest-match robots evaluation; Allow wins ties. */
export function isAllowed(rules: Pick<RobotsRules, "allow" | "disallow">, url: string): boolean {
  const u = new URL(url);
  const path = u.pathname + u.search;
  const best = (list: string[]): number => Math.max(-1, ...list.map((r) => ruleMatch(r, path)));
  const d = best(rules.disallow);
  return d < 0 || best(rules.allow) >= d;
}

// ---------- sitemap ----------

export function parseSitemap(xml: string): { isIndex: boolean; locs: string[] } {
  const locs = [...xml.matchAll(/<loc\b[^>]*>([\s\S]*?)<\/loc\s*>/gi)].map((m) =>
    decodeEntities((m[1] ?? "").replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").trim()),
  );
  return { isIndex: /<sitemapindex\b/i.test(xml), locs: locs.filter(Boolean) };
}

// ---------- fetching ----------

type RawResponse = { status: number; headers: Headers; text: string; url: string };

function normalize(url: string): string {
  const u = new URL(url);
  u.hash = "";
  return u.toString();
}

export async function crawlSite(siteUrl: string, opts: CrawlOptions = {}, deps: SiteDeps = {}): Promise<CrawlResult> {
  const startedAt = new Date().toISOString();
  const f: FetchFn = deps.fetch ?? ((input, init) => fetch(input, init));
  const limit = Math.max(1, Math.trunc(opts.limit ?? 50));
  const concurrency = Math.max(1, Math.trunc(opts.concurrency ?? 4));
  const timeoutMs = opts.timeoutMs ?? 20_000;
  const root = new URL(siteUrl);
  const host = root.host;
  const retry = deps.retry ?? { retries: 2, baseMs: 500 };

  /** One GET without following redirects; 429/5xx/network are retried, final HTTP status is returned as data. */
  async function getOnce(url: string, accept: string): Promise<RawResponse> {
    try {
      return await withRetry(async () => {
        const res = await f(url, {
          method: "GET",
          redirect: "manual",
          headers: { "user-agent": USER_AGENT, accept },
          signal: AbortSignal.timeout(timeoutMs),
        });
        const text = await res.text();
        if (res.status === 429 || res.status >= 500) throw new HttpError(res.status, text);
        return { status: res.status, headers: res.headers, text, url };
      }, retry);
    } catch (err) {
      if (err instanceof HttpError) return { status: err.status, headers: new Headers(), text: err.body, url };
      throw err;
    }
  }

  /** Follows up to MAX_REDIRECTS redirects manually so the chain is visible. */
  async function get(url: string, accept: string): Promise<{ first: RawResponse; last: RawResponse; chain: Array<{ url: string; status: number }> }> {
    const chain: Array<{ url: string; status: number }> = [];
    let current = url;
    let first: RawResponse | null = null;
    for (let hop = 0; ; hop++) {
      const res = await getOnce(current, accept);
      first ??= res;
      const location = res.headers.get("location");
      if (res.status >= 300 && res.status < 400 && location && hop < MAX_REDIRECTS) {
        chain.push({ url: current, status: res.status });
        current = new URL(location, current).toString();
        continue;
      }
      return { first, last: res, chain };
    }
  }

  // robots.txt
  const robotsUrl = new URL("/robots.txt", root).toString();
  const robots: RobotsInfo = { url: robotsUrl, status: 0, sitemaps: [], disallow: [], allow: [] };
  try {
    const r = await get(robotsUrl, "text/plain,*/*");
    robots.status = r.last.status;
    if (r.last.status === 200) Object.assign(robots, parseRobots(r.last.text));
  } catch {
    robots.status = 0;
  }

  // sitemaps (robots-declared, else /sitemap.xml), one level of sitemap index
  const sitemaps: SitemapInfo[] = [];
  const sitemapSet = new Set<string>();
  const queue: string[] = robots.sitemaps.length ? [...robots.sitemaps] : [new URL("/sitemap.xml", root).toString()];
  const seenSitemaps = new Set<string>();
  while (queue.length && seenSitemaps.size < MAX_CHILD_SITEMAPS + 1) {
    const smUrl = queue.shift()!;
    if (seenSitemaps.has(smUrl)) continue;
    seenSitemaps.add(smUrl);
    const info: SitemapInfo = { url: smUrl, status: 0, isIndex: false, urlCount: 0 };
    try {
      const r = await get(smUrl, "application/xml,text/xml,*/*");
      info.status = r.last.status;
      if (r.last.status === 200) {
        const parsed = parseSitemap(r.last.text);
        info.isIndex = parsed.isIndex;
        info.urlCount = parsed.locs.length;
        if (parsed.isIndex) queue.push(...parsed.locs);
        else
          for (const loc of parsed.locs) {
            try {
              sitemapSet.add(normalize(loc));
            } catch {
              /* ignore malformed loc */
            }
          }
      }
    } catch (err) {
      info.error = (err as Error).message;
    }
    sitemaps.push(info);
  }

  // pages: home first, then sitemap URLs, then discovered internal links
  const rules = { allow: robots.allow, disallow: robots.disallow };
  const seen = new Set<string>();
  const pending: string[] = [];
  const skippedByRobots: string[] = [];
  const enqueue = (url: string): void => {
    let n: string;
    try {
      n = normalize(url);
    } catch {
      return;
    }
    const u = new URL(n);
    if (u.host !== host || !/^https?:$/.test(u.protocol) || NON_HTML_EXT.test(u.pathname) || seen.has(n)) return;
    seen.add(n);
    if (!isAllowed(rules, n)) {
      skippedByRobots.push(n);
      return;
    }
    pending.push(n);
  };
  enqueue(root.toString());
  for (const u of sitemapSet) enqueue(u);

  const pages: PageInfo[] = [];
  let started = 0;
  async function crawlOne(url: string): Promise<PageInfo> {
    const page: PageInfo = {
      url,
      status: 0,
      finalUrl: url,
      finalStatus: 0,
      redirects: [],
      inSitemap: sitemapSet.has(url),
      contentType: null,
      title: null,
      description: null,
      h1Count: 0,
      canonical: null,
      hreflang: [],
      metaRobots: null,
      xRobotsTag: null,
      jsonLd: { blocks: 0, valid: 0, types: [], errors: [] },
    };
    try {
      const r = await get(url, "text/html,application/xhtml+xml");
      page.status = r.first.status;
      page.finalUrl = r.last.url;
      page.finalStatus = r.last.status;
      page.redirects = r.chain;
      page.contentType = r.last.headers.get("content-type");
      page.xRobotsTag = r.last.headers.get("x-robots-tag");
      if (!page.contentType || /html/i.test(page.contentType)) {
        const parsed = parseHtml(r.last.text, page.finalUrl);
        const { links, ...fields } = parsed;
        Object.assign(page, fields);
        if (r.last.status === 200) for (const href of links) {
          if (/^(?:mailto|tel|javascript|data):/i.test(href.trim())) continue;
          try {
            enqueue(new URL(href.trim(), page.finalUrl).toString());
          } catch {
            /* ignore bad href */
          }
        }
      }
      if (new URL(page.finalUrl).host === host) seen.add(normalize(page.finalUrl));
    } catch (err) {
      page.error = (err as Error).message;
    }
    return page;
  }

  let active = 0;
  await new Promise<void>((resolve) => {
    const pump = (): void => {
      while (active < concurrency && started < limit && pending.length) {
        const url = pending.shift()!;
        started++;
        active++;
        crawlOne(url)
          .then((p) => pages.push(p))
          .finally(() => {
            active--;
            pump();
          });
      }
      if (active === 0) resolve();
    };
    pump();
  });

  const order = new Map<string, number>();
  [root.toString(), ...sitemapSet].forEach((u, i) => order.has(u) || order.set(u, i));
  pages.sort((a, b) => (order.get(a.url) ?? Infinity) - (order.get(b.url) ?? Infinity) || a.url.localeCompare(b.url));

  return {
    siteUrl: root.toString(),
    startedAt,
    finishedAt: new Date().toISOString(),
    robots,
    sitemaps,
    sitemapUrls: [...sitemapSet],
    pages,
    skippedByRobots,
    truncated: pending.length > 0,
  };
}
