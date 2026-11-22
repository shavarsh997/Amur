import type { CrawlPage } from "./types.ts";

export type SiteIssueType =
  | "non-200"
  | "missing-canonical"
  | "canonical-mismatch"
  | "missing-title"
  | "duplicate-title"
  | "missing-description"
  | "h1-count"
  | "hreflang-not-reciprocal"
  | "noindex-in-sitemap"
  | "jsonld-invalid";

export type SiteIssue = { type: SiteIssueType; url: string; detail: string };

/** Comparable URL: no hash, lowercase host, no trailing slash except root. Invalid URLs returned trimmed. */
export function normalizeUrl(u: string, base?: string): string {
  try {
    const url = new URL(u, base);
    url.hash = "";
    let s = url.toString();
    if (url.pathname !== "/" && s.endsWith("/") && !url.search) s = s.slice(0, -1);
    return s;
  } catch {
    return u.trim();
  }
}

const isNoindex = (robots: string | null): boolean => robots !== null && /\bnoindex\b|\bnone\b/i.test(robots);

/** Normalized URL with the query string removed; null when the URL has no query or is invalid. */
function withoutQuery(u: string): string | null {
  try {
    const url = new URL(u);
    if (!url.search) return null;
    url.search = "";
    return normalizeUrl(url.toString());
  } catch {
    return null;
  }
}

/**
 * Parametric variant: a URL with a query string whose canonical points to the same path without the query
 * (e.g. /de/calculator?scenario=x → /de/calculator). Correct by design, so title/hreflang/canonical checks
 * skip it, and description/h1/JSON-LD defects are left to the base page — unless the URL itself is listed
 * in the sitemap.
 */
function isParametricVariant(p: CrawlPage, self: string, sitemap: Set<string>): boolean {
  if (!p.canonical || sitemap.has(self)) return false;
  const bare = withoutQuery(self);
  return bare !== null && normalizeUrl(p.canonical, self) === bare;
}

/** Crawl problems; content checks apply only to 200 pages. */
export function siteIssues(pages: CrawlPage[], opts: { sitemapUrls?: string[] } = {}): SiteIssue[] {
  const issues: SiteIssue[] = [];
  const sitemap = new Set((opts.sitemapUrls ?? []).map((u) => normalizeUrl(u)));
  const ok = pages.filter((p) => p.status === 200);

  for (const p of pages) {
    // A redirect is only a problem for URLs listed in the sitemap (they must answer 200 directly).
    if (p.status !== 200 && !(p.status >= 300 && p.status < 400 && !sitemap.has(normalizeUrl(p.url)))) {
      const redirect = normalizeUrl(p.finalUrl) !== normalizeUrl(p.url) ? ` → ${p.finalUrl}` : "";
      issues.push({ type: "non-200", url: p.url, detail: `HTTP ${p.status}${redirect}` });
    }
  }

  const titles = new Map<string, string[]>();
  const byUrl = new Map<string, CrawlPage>();
  for (const p of ok) {
    byUrl.set(normalizeUrl(p.finalUrl || p.url), p);
    byUrl.set(normalizeUrl(p.url), p);
  }

  for (const p of ok) {
    const self = normalizeUrl(p.finalUrl || p.url);
    const variant = isParametricVariant(p, self, sitemap);
    if (!p.canonical) {
      issues.push({ type: "missing-canonical", url: p.url, detail: "no rel=canonical" });
    } else if (!variant && normalizeUrl(p.canonical, self) !== self && !isNoindex(p.robots)) {
      issues.push({ type: "canonical-mismatch", url: p.url, detail: `canonical ${p.canonical} ≠ ${self}` });
    }
    const title = p.title?.trim();
    if (!title) issues.push({ type: "missing-title", url: p.url, detail: "empty <title>" });
    else if (!variant) titles.set(title, [...(titles.get(title) ?? []), p.url]);
    // Variants share the base page's template: description/h1/JSON-LD are reported once, for the base page.
    if (!variant && !p.description?.trim()) {
      issues.push({ type: "missing-description", url: p.url, detail: "empty meta description" });
    }
    if (!variant && p.h1Count !== 1) issues.push({ type: "h1-count", url: p.url, detail: `${p.h1Count} <h1>` });
    if (!variant && !p.jsonLdOk) issues.push({ type: "jsonld-invalid", url: p.url, detail: "JSON-LD does not parse" });
    if (sitemap.has(self) && isNoindex(p.robots)) {
      issues.push({ type: "noindex-in-sitemap", url: p.url, detail: `robots "${p.robots}" but listed in sitemap` });
    }
    for (const link of variant ? [] : p.hreflang) {
      const target = normalizeUrl(link.href, self);
      if (target === self) continue;
      const other = byUrl.get(target);
      if (!other) continue; // not crawled: cannot verify
      const back = other.hreflang.some((l) => normalizeUrl(l.href, target) === self);
      if (!back) {
        issues.push({ type: "hreflang-not-reciprocal", url: p.url, detail: `${link.lang} → ${link.href} has no return link` });
      }
    }
  }

  for (const [title, urls] of titles) {
    if (urls.length < 2) continue;
    for (const url of urls) issues.push({ type: "duplicate-title", url, detail: `"${title}" shared by ${urls.length} pages` });
  }
  return issues;
}
