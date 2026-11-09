import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { parseSeoHtml } from "./lib/crawl-seo.mjs";
import { createTypeScriptLoader } from "./lib/load-typescript.mjs";

// Read production prerenders: captures the actual indexable HTML without JS.
// Usage: node scripts/redesign-seo-snapshot.mjs before|after
const phase = process.argv[2];
assert(["before", "after"].includes(phase));
const directory = process.argv[3] ?? "docs/redesign";
const load = createTypeScriptLoader(process.cwd());
const sitemap = load("app/sitemap").default();
const digest = (value) => createHash("sha256").update(value).digest("hex");
const normalize = (value) => value.replace(/\s+/g, " ").trim();
const walk = (root) =>
  readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const path = join(root, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
const protectedFiles = [
  ...walk("messages"),
  ...walk("config").filter((path) =>
    /seo|services.config|navigation|home-content/.test(path)
  ),
  "app/sitemap.ts",
  "app/robots.ts",
  "proxy.ts",
  "lib/metadata.ts",
  "lib/json-ld.ts",
  "lib/i18n.ts",
  "lib/seo-environment.ts",
];
const pages = sitemap.map(({ url }) => {
  const path = new URL(url).pathname;
  const html = readFileSync(`.next/server/app${path}.html`, "utf8");
  const page = parseSeoHtml(html);
  const main =
    page.document.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? "";
  const textBlocks = [
    ...main.matchAll(/<(p|h2|h3|summary)\b[^>]*>([\s\S]*?)<\/\1>/gi),
  ]
    .map(([, , text]) =>
      normalize(parseSeoHtml(`<main>${text}</main>`).mainText)
    )
    .filter(Boolean);
  return {
    path,
    title: page.title,
    description: page.description,
    h1: page.h1Text,
    h1Count: page.h1,
    canonical: page.canonical,
    hreflang: page.alternates,
    robots: page.robots,
    lang: page.lang,
    jsonLd: page.jsonLd,
    internalLinks: [
      ...new Set(
        page.anchors
          .filter(
            ({ href }) =>
              href &&
              (href.startsWith("/") ||
                href.startsWith("#") ||
                href.startsWith("https://www.shinex.am"))
          )
          .map(({ href }) => href)
      ),
    ].sort(),
    textBlocks: [...new Set(textBlocks)],
    htmlBytes: Buffer.byteLength(html),
    mainTextLength: page.mainText.length,
  };
});
const result = {
  capturedAt: new Date().toISOString(),
  method: "Next.js production prerendered HTML",
  sitemap,
  protectedFiles: Object.fromEntries(
    protectedFiles.map((path) => [path, digest(readFileSync(path))])
  ),
  routes: walk("app")
    .filter((path) => /\/(page|route)\.tsx?$/.test(path))
    .sort(),
  pages,
};
const target = `${directory}/seo-${phase}.json`;
mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, JSON.stringify(result, null, 2) + "\n");
console.log(`Captured ${pages.length} routes: ${target}`);
if (phase === "after") {
  const before = JSON.parse(
    readFileSync(`${directory}/seo-before.json`, "utf8")
  );
  const issues = [];
  const compare = (a, b, label) => {
    try {
      assert.deepEqual(a, b);
    } catch {
      issues.push(label);
    }
  };
  compare(result.routes, before.routes, "Route files changed");
  compare(result.sitemap, before.sitemap, "Sitemap changed");
  compare(
    result.protectedFiles,
    before.protectedFiles,
    "Protected SEO/content source changed"
  );
  compare(
    pages.map((p) => p.path),
    before.pages.map((p) => p.path),
    "URL set changed"
  );
  for (const old of before.pages) {
    const current = pages.find((p) => p.path === old.path);
    if (!current) continue;
    for (const field of [
      "title",
      "description",
      "h1",
      "h1Count",
      "canonical",
      "hreflang",
      "robots",
      "lang",
      "jsonLd",
    ])
      compare(current[field], old[field], `${old.path}: ${field} changed`);
    for (const href of old.internalLinks)
      if (!current.internalLinks.includes(href))
        issues.push(`${old.path}: lost link ${href}`);
    for (const block of old.textBlocks)
      if (!current.textBlocks.includes(block))
        issues.push(`${old.path}: lost text block ${block}`);
  }
  const comparison = {
    pages: pages.length,
    issues,
    passed: issues.length === 0,
  };
  writeFileSync(
    `${directory}/seo-comparison.json`,
    JSON.stringify(comparison, null, 2) + "\n"
  );
  console.log(JSON.stringify(comparison, null, 2));
  process.exitCode = issues.length ? 1 : 0;
}
