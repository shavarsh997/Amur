import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { createTypeScriptLoader } from "./lib/load-typescript.mjs";
import { parseSeoHtml } from "./lib/crawl-seo.mjs";

// Build-artifact diagnostics, not a browser benchmark or a ranking score.
const load = createTypeScriptLoader(process.cwd());
const sitemap = load("app/sitemap").default();
const paths = new Set(sitemap.map(({ url }) => new URL(url).pathname));
const strip = (html) =>
  html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
const pages = sitemap.map(({ url }) => {
  const path = new URL(url).pathname;
  const html = readFileSync(`.next/server/app${path}.html`, "utf8");
  const parsed = parseSeoHtml(html);
  const main =
    parsed.document.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? "";
  const mainParsed = parseSeoHtml(main);
  const targets = (anchors) =>
    [
      ...new Set(
        anchors.flatMap(({ href }) => {
          if (!href) return [];
          const target = new URL(href, url);
          return target.origin === new URL(url).origin &&
            paths.has(target.pathname) &&
            target.pathname !== path
            ? [target.pathname]
            : [];
        })
      ),
    ].sort();
  const headings = [
    ...main.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi),
  ].map(([, level, text]) => ({ level: Number(level), text: strip(text) }));
  const scripts = [...html.matchAll(/<script\b[^>]*src="([^"]+)"/gi)]
    .map(([, src]) => src)
    .filter((src) => src.startsWith("/_next/static/"));
  const scriptFiles = [...new Set(scripts)].map((src) =>
    readFileSync(`.next${decodeURIComponent(src.slice("/_next".length))}`)
  );
  return {
    url,
    path,
    title: parsed.title,
    description: parsed.description,
    titleCharacters: parsed.title.length,
    descriptionCharacters: parsed.description?.length,
    mainTextCharacters: parsed.mainText.length,
    headings,
    headingLevelSkips: headings.filter(
      (h, i) => i && h.level > headings[i - 1].level + 1
    ),
    mainLinks: targets(mainParsed.anchors),
    allLinks: targets(parsed.anchors),
    htmlBytes: Buffer.byteLength(html),
    htmlGzipBytes: gzipSync(html).length,
    initialScriptBytes: scriptFiles.reduce((sum, file) => sum + file.length, 0),
    initialScriptGzipBytes: scriptFiles.reduce(
      (sum, file) => sum + gzipSync(file).length,
      0
    ),
    structuredTypes: parsed.jsonLd
      .flatMap((entity) => entity["@graph"] ?? [entity])
      .flatMap((entity) => entity["@type"] ?? []),
  };
});
for (const locale of load("lib/i18n").locales) {
  const depths = new Map([[`/${locale}`, 0]]);
  const queue = [`/${locale}`];
  for (let i = 0; i < queue.length; i++) {
    for (const target of pages.find((page) => page.path === queue[i])
      .allLinks) {
      if (!target.startsWith(`/${locale}/`) || depths.has(target)) continue;
      depths.set(target, depths.get(queue[i]) + 1);
      queue.push(target);
    }
  }
  for (const page of pages.filter((p) => p.path.split("/")[1] === locale)) {
    page.clickDepth = depths.get(page.path) ?? null;
    page.contextualIncoming = pages
      .filter(
        (p) =>
          p.path.split("/")[1] === locale && p.mainLinks.includes(page.path)
      )
      .map((p) => p.path);
    assert.notEqual(page.clickDepth, null, `Unreachable page: ${page.path}`);
  }
}
const report = {
  checkedAt: new Date().toISOString(),
  source:
    "Local production build artifacts; gzip sizes are reproducible estimates, not measured network transfer or Core Web Vitals.",
  pages,
};
const destination = process.argv[2];
assert(destination, "Provide an output JSON path");
writeFileSync(destination, JSON.stringify(report, null, 2) + "\n");
console.log(
  JSON.stringify(
    {
      pages: pages.length,
      maximumClickDepth: Math.max(...pages.map((p) => p.clickDepth)),
      headingLevelSkips: pages.reduce(
        (sum, p) => sum + p.headingLevelSkips.length,
        0
      ),
      withoutContextualIncoming: pages
        .filter((p) => !p.contextualIncoming.length)
        .map((p) => p.path),
      report: destination,
    },
    null,
    2
  )
);
