import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
import { createTypeScriptLoader } from "./lib/load-typescript.mjs";
import { robotsAllows } from "./lib/robots-rules.mjs";

const load = createTypeScriptLoader(process.cwd());
const sampleRobots =
  "User-agent: *\nDisallow: /\nUser-agent: Googlebot\nDisallow: /private/\nAllow: /private/public/\nDisallow: /*?draft=$";
assert(!robotsAllows(sampleRobots, "https://www.shinex.am/hy", "OtherBot"));
assert(robotsAllows(sampleRobots, "https://www.shinex.am/hy"));
assert(!robotsAllows(sampleRobots, "https://www.shinex.am/private/draft"));
assert(robotsAllows(sampleRobots, "https://www.shinex.am/private/public/page"));
assert(!robotsAllows(sampleRobots, "https://www.shinex.am/hy?draft="));
assert(robotsAllows(sampleRobots, "https://www.shinex.am/hy?draft=published"));
assert(
  robotsAllows(
    "User-agent: *\nDisallow:\nUser-agent: Googlebot\nDisallow: /",
    "https://www.shinex.am/hy",
    "OtherBot"
  )
);
assert(
  robotsAllows(
    "User-agent: *\nDisallow: /hy\nAllow: /hy",
    "https://www.shinex.am/hy"
  )
);
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
const { createPageMetadata, getRobotsMetadata } = load("lib/metadata");
const { shouldPreventIndexing } = load("lib/seo-environment");
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
  const url = new URL(route.url);
  assert.equal(
    url.origin,
    "https://www.shinex.am",
    "Non-canonical sitemap origin"
  );
  assert(
    locales.includes(url.pathname.split("/")[1]),
    "Missing sitemap locale"
  );
  assert(
    !url.search && !url.hash && !url.pathname.endsWith("/"),
    "Non-canonical sitemap URL"
  );
  assert(
    !/\/(admin|api|auth|preview)(\/|$)/.test(url.pathname),
    "Technical URL in sitemap"
  );
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
      for (const suffix of ["", "/"]) {
        const request = new NextRequest(
          `${origin}/${locale}/${source}${suffix}?utm_source=check`,
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
        assert(
          !proxy(
            new NextRequest(target, {
              headers: { host: target.host },
            })
          ).headers.has("location"),
          "Redirect destination redirects again"
        );
      }
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
for (const path of ["/hy", "/ru/prices", "/en/services", "/robots.txt"]) {
  const response = proxy(
    new NextRequest(`https://www.shinex.am${path}/?ref=check`, {
      headers: { host: "www.shinex.am" },
    })
  );
  assert.equal(response.status, 308);
  assert.equal(
    response.headers.get("location"),
    `https://www.shinex.am${path}?ref=check`
  );
}

const environmentKeys = ["SITE_NOINDEX", "VERCEL_ENV", "NODE_ENV"];
const originalEnvironment = Object.fromEntries(
  environmentKeys.map((key) => [key, process.env[key]])
);
try {
  for (const settings of [
    { NODE_ENV: "production" },
    { NODE_ENV: "production", VERCEL_ENV: "production", SITE_NOINDEX: "false" },
    { NODE_ENV: "production", VERCEL_ENV: "preview" },
    { NODE_ENV: "production", VERCEL_ENV: "development" },
    { NODE_ENV: "development" },
    { NODE_ENV: "production", SITE_NOINDEX: "true" },
  ]) {
    for (const key of environmentKeys) {
      if (settings[key] === undefined) delete process.env[key];
      else process.env[key] = settings[key];
    }
    const blocked =
      settings.NODE_ENV === "development" ||
      ["preview", "development"].includes(settings.VERCEL_ENV) ||
      settings.SITE_NOINDEX === "true";
    assert.equal(shouldPreventIndexing(), blocked, JSON.stringify(settings));
    for (const noIndex of [false, true]) {
      const robots = getRobotsMetadata(noIndex);
      assert.equal(robots.index === false, blocked || noIndex);
      assert.equal(robots.googleBot.index === false, blocked || noIndex);
      assert.notEqual(robots.follow, false);
      assert.notEqual(robots.googleBot.follow, false);
    }
    for (const path of [
      "/",
      "/hy/prices",
      "/robots.txt",
      "/_next/static/example.js",
    ]) {
      const response = proxy(
        new NextRequest(`https://www.shinex.am${path}`, {
          headers: { host: "www.shinex.am" },
        })
      );
      assert.equal(
        response.headers.get("x-robots-tag"),
        blocked ? "noindex, follow" : null
      );
    }
    const page = createPageMetadata({
      locale: "hy",
      pathname: "prices",
      title: "Prices",
      description: "Prices",
    });
    assert.equal(page.robots.index === false, blocked);
    assert.equal(page.alternates.canonical, "https://www.shinex.am/hy/prices");
  }
} finally {
  for (const key of environmentKeys) {
    if (originalEnvironment[key] === undefined) delete process.env[key];
    else process.env[key] = originalEnvironment[key];
  }
}
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
  `SEO data checks passed: ${sitemap.length} URLs, ${seoRedirects.length * locales.length} redirects with slash/host variants, production/preview indexing, metadata and route references.`
);

const baseIndex = process.argv.indexOf("--base-url");
if (baseIndex !== -1) {
  assert(process.argv[baseIndex + 1], "Provide a base URL after --base-url");
  const base = new URL(process.argv[baseIndex + 1]);
  const { crawlSeo } = await import("./lib/crawl-seo.mjs");
  const pages = await crawlSeo({ base, sitemap, seoRedirects, locales });
  const reportIndex = process.argv.indexOf("--report");
  if (reportIndex !== -1) {
    assert(process.argv[reportIndex + 1], "Provide a JSON path after --report");
    writeFileSync(
      process.argv[reportIndex + 1],
      JSON.stringify(
        {
          checkedAt: new Date().toISOString(),
          checkedBase: base.origin,
          pages,
        },
        null,
        2
      ) + "\n"
    );
    console.log(`SEO page inventory saved: ${process.argv[reportIndex + 1]}`);
  }
}
