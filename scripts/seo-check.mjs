import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { createTypeScriptLoader } from "./lib/load-typescript.mjs";

const load = createTypeScriptLoader(process.cwd());
const require = createRequire(import.meta.url);
const { NextRequest } = require("next/server");
const { proxy } = load("proxy");
const { locales } = load("lib/i18n");
const { seoLandingPages, getSeoLandingPath } = load(
  "config/seo-landing-pages.config"
);
const { getActiveServices } = load("config/services.config");
const { serviceGuideGroups } = load("config/service-guides.config");
const { seoIntentMap } = load("config/seo-intents.config");
const { seoRedirects } = load("config/seo-redirects.config");
const { createPageMetadata } = load("lib/metadata");
const {
  serializeJsonLd,
  getOrganizationJsonLd,
  getServiceJsonLd,
  getWebPageJsonLd,
} = load("lib/json-ld");
const sitemap = load("app/sitemap").default();
const urls = new Set(sitemap.map(({ url }) => url));
const paths = new Set(
  sitemap.map(({ url }) => new URL(url).pathname.split("/").slice(2).join("/"))
);
const serviceSlugs = new Set(getActiveServices("hy").map(({ slug }) => slug));
const landingSlugs = new Set(seoLandingPages.map(({ slug }) => slug));

assert.equal(urls.size, sitemap.length, "Duplicate sitemap URLs");
assert.equal(
  landingSlugs.size,
  seoLandingPages.length,
  "Duplicate landing slugs"
);
for (const route of sitemap) {
  assert(
    !/\/(projects|blog)(\/|$)/.test(new URL(route.url).pathname),
    "Unpublished content in sitemap"
  );
  const alternatives = Object.values(route.alternates.languages);
  assert(
    alternatives.includes(route.url),
    `Missing self hreflang: ${route.url}`
  );
  for (const alternate of alternatives)
    assert(urls.has(alternate), `Missing alternate ${alternate}`);
  for (const alternate of alternatives) {
    assert.deepEqual(
      sitemap.find(({ url }) => url === alternate).alternates,
      route.alternates,
      "Non-reciprocal hreflang"
    );
  }
}
for (const page of seoLandingPages) {
  for (const slug of page.relatedServiceSlugs)
    assert(serviceSlugs.has(slug), `Unknown related service ${slug}`);
  for (const slug of page.relatedLandingSlugs)
    assert(landingSlugs.has(slug), `Unknown related landing ${slug}`);
  for (const locale of locales) {
    const content = page.translations[locale];
    for (const key of ["title", "description", "seoTitle", "seoDescription"])
      assert(content[key]?.trim(), `${page.slug}/${locale}: missing ${key}`);
    assert(content.sections.length, `No content for ${page.slug}/${locale}`);
    assert.equal(
      new Set(content.faqs.map(({ question }) => question)).size,
      content.faqs.length,
      `Duplicate FAQ ${page.slug}/${locale}`
    );
    const metadata = createPageMetadata({
      locale,
      pathname: getSeoLandingPath(page),
      title: content.seoTitle,
      description: content.seoDescription,
    });
    assert(
      urls.has(metadata.alternates.canonical),
      `Canonical outside sitemap: ${page.slug}`
    );
    assert.equal(
      metadata.title.absolute.match(/SHINEX/g)?.length,
      1,
      `Repeated brand: ${page.slug}`
    );
    assert(
      metadata.openGraph.images[0].url.endsWith("/share-image"),
      "Missing brand fallback image"
    );
  }
}
for (const group of serviceGuideGroups)
  for (const link of group.links)
    assert(paths.has(link.path), `Guide points to missing route: ${link.path}`);
for (const intent of Object.values(seoIntentMap))
  for (const path of Object.values(intent.paths))
    assert(paths.has(path), `Intent points to retired route: ${path}`);
for (const { source, destination } of seoRedirects) {
  assert(!paths.has(source), `Retired URL remains in sitemap: ${source}`);
  assert(
    paths.has(destination),
    `Redirect destination is missing: ${destination}`
  );
  assert(
    !seoRedirects.some((route) => route.source === destination),
    "Redirect chain"
  );
  for (const locale of locales) {
    for (const origin of [
      "http://localhost:3000",
      "http://shinex.am",
      "https://www.shinex.am",
    ]) {
      const request = new NextRequest(
        `${origin}/${locale}/${source}?utm_source=check`,
        { headers: { host: new URL(origin).host } }
      );
      const response = proxy(request);
      assert.equal(response.status, 308);
      const target = new URL(response.headers.get("location"));
      assert.equal(target.pathname, `/${locale}/${destination}`);
      assert.equal(target.searchParams.get("utm_source"), "check");
      assert.equal(
        target.origin,
        origin.includes("localhost") ? origin : "https://www.shinex.am"
      );
    }
  }
}
assert.equal(
  proxy(
    new NextRequest("http://localhost:3000/", {
      headers: { host: "localhost:3000" },
    })
  ).headers.get("location"),
  "http://localhost:3000/hy"
);
assert(
  !proxy(
    new NextRequest(
      "http://localhost:3000/fr/services/house-construction-yerevan"
    )
  ).headers.has("location"),
  "Unsupported locale was redirected"
);
assert(
  !serializeJsonLd({ value: "</script><script>alert(1)</script>" }).includes(
    "<"
  ),
  "Unsafe JSON-LD"
);
const organization = getOrganizationJsonLd();
assert(!organization.aggregateRating, "Unverified rating");
const schemaProps = {
  locale: "hy",
  name: "Test",
  description: "Test description",
  pathname: "prices",
};
assert.equal(getWebPageJsonLd(schemaProps)["@type"], "WebPage");
assert.equal(getServiceJsonLd(schemaProps)["@type"], "Service");
console.log(
  `SEO data checks passed: ${sitemap.length} URLs, ${seoRedirects.length * locales.length} redirects, metadata and route references.`
);

const baseIndex = process.argv.indexOf("--base-url");
if (baseIndex !== -1) {
  assert(process.argv[baseIndex + 1], "Provide a base URL after --base-url");
  const base = new URL(process.argv[baseIndex + 1]);
  const { crawlSeo } = await import("./lib/crawl-seo.mjs");
  await crawlSeo({ base, sitemap, seoRedirects, locales });
}
