import assert from "node:assert/strict";
import { robotsAllows } from "./robots-rules.mjs";

const decode = (text) =>
  text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#(?:x([\da-f]+)|(\d+));/gi, (_, hex, decimal) =>
      String.fromCodePoint(parseInt(hex ?? decimal, hex ? 16 : 10))
    );
function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map(
      ([, name, double, single]) => [
        name.toLowerCase(),
        decode(double ?? single),
      ]
    )
  );
}
function parse(html) {
  const document = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  const tags = (name) =>
    [...document.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map(([tag]) =>
      attributes(tag)
    );
  const links = tags("link");
  const meta = tags("meta");
  return {
    title: decode(document.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? ""),
    titleCount: [...document.matchAll(/<title\b/gi)].length,
    descriptionCount: meta.filter((tag) => tag.name === "description").length,
    h1Text: decode(
      document
        .match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]
        ?.replace(/<[^>]*>/g, "") ?? ""
    ),
    h1: [...document.matchAll(/<h1\b/g)].length,
    lang: tags("html")[0]?.lang,
    description: meta.find((tag) => tag.name === "description")?.content,
    canonical: links
      .filter((tag) => tag.rel === "canonical")
      .map((tag) => tag.href),
    alternates: Object.fromEntries(
      links.filter((tag) => tag.hreflang).map((tag) => [tag.hreflang, tag.href])
    ),
    robots: meta
      .filter((tag) => ["robots", "googlebot"].includes(tag.name))
      .map((tag) => tag.content),
    image: meta.find((tag) => tag.property === "og:image")?.content,
    ogUrl: meta.find((tag) => tag.property === "og:url")?.content,
    mainText: decode(
      document
        .match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1]
        ?.replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim() ?? ""
    ),
    anchors: tags("a"),
    idCount: [...document.matchAll(/\bid="([^"]+)"/g)].length,
    ids: new Set([...document.matchAll(/\bid="([^"]+)"/g)].map(([, id]) => id)),
    jsonLd: [
      ...html.matchAll(
        /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi
      ),
    ].map(([, json]) => JSON.parse(json)),
    document,
  };
}

export async function crawlSeo({ base, sitemap, seoRedirects, locales }) {
  const robotsResponse = await fetch(new URL("/robots.txt", base));
  assert.equal(robotsResponse.status, 200, "robots.txt status");
  const robotsText = await robotsResponse.text();
  const publicOrigin = new URL(sitemap[0].url).origin;
  assert(
    robotsText.includes(`Sitemap: ${publicOrigin}/sitemap.xml`),
    "Incorrect robots sitemap URL"
  );
  const fetchPage = async (path) => {
    const response = await fetch(new URL(path, base), {
      redirect: "manual",
      signal: AbortSignal.timeout(30_000),
    });
    return { response, page: parse(await response.text()) };
  };
  const pages = new Map();
  // Keep the crawler gentle on both local development and a public preview.
  for (let i = 0; i < sitemap.length; i += 4) {
    await Promise.all(
      sitemap.slice(i, i + 4).map(async (route) => {
        const path = new URL(route.url).pathname;
        const { response, page } = await fetchPage(path);
        assert.equal(response.status, 200, path);
        assert(
          response.headers.get("content-type")?.includes("text/html"),
          `Not HTML: ${path}`
        );
        for (const agent of ["Googlebot", "Googlebot-Image", "OtherBot"]) {
          assert(
            robotsAllows(robotsText, route.url, agent),
            `robots.txt blocks ${agent}: ${path}`
          );
        }
        assert(
          !/\b(noindex|none)\b/i.test(
            response.headers.get("x-robots-tag") ?? ""
          ),
          `Blocking X-Robots-Tag: ${path}`
        );
        assert(page.title && page.description, `Missing metadata: ${path}`);
        assert.equal(page.titleCount, 1, `Title count: ${path}`);
        assert.equal(page.descriptionCount, 1, `Description count: ${path}`);
        assert(
          page.mainText.length >= 250,
          `Missing SSR main content: ${path}`
        );
        assert.equal(page.h1, 1, `H1 count: ${path}`);
        assert.equal(
          page.ids.size,
          page.idCount,
          `Duplicate HTML IDs: ${path}`
        );
        assert.deepEqual(page.canonical, [route.url], `Canonical: ${path}`);
        assert.equal(
          page.ogUrl,
          route.url,
          `OpenGraph URL differs from canonical: ${path}`
        );
        assert.deepEqual(
          page.alternates,
          route.alternates.languages,
          `Hreflang: ${path}`
        );
        assert(
          !page.robots.some((rule) =>
            /\b(noindex|nofollow|none)\b/i.test(rule)
          ),
          `Noindex: ${path}`
        );
        assert(page.image, `Missing share image: ${path}`);
        const language = path.split("/")[1];
        assert.equal(
          page.lang.split("-")[0],
          language,
          `HTML language: ${path}`
        );
        assert(
          page.jsonLd.some((schema) => schema["@type"] === "WebSite"),
          `WebSite schema: ${path}`
        );
        if (
          path.endsWith("/prices") ||
          path.endsWith("/renovation-estimate-yerevan")
        ) {
          assert(
            page.jsonLd.some((schema) => schema["@type"] === "WebPage"),
            `Planning page schema: ${path}`
          );
          assert(
            !page.jsonLd.some((schema) => schema["@type"] === "Service"),
            `Planning page labelled as a service: ${path}`
          );
        }
        if (path.endsWith("/prices")) {
          assert(
            page.ids.has("request-estimate"),
            `Missing contact section: ${path}`
          );
          assert(
            !page.ids.has("calculator-field-area"),
            `Renovation calculator remains on prices: ${path}`
          );
        }
        for (const locale of locales) {
          assert(
            page.anchors.some(
              (anchor) =>
                anchor.hreflang === locale &&
                anchor.href === `/${locale}${path.slice(language.length + 1)}`
            ),
            `Missing crawlable language link: ${path}/${locale}`
          );
        }
        pages.set(path, {
          ...page,
          status: response.status,
          headers: Object.fromEntries(
            ["content-type", "cache-control", "location", "x-robots-tag"].map(
              (name) => [name, response.headers.get(name)]
            )
          ),
        });
      })
    );
  }
  for (const field of ["title", "description"]) {
    assert.equal(
      new Set([...pages.values()].map((page) => page[field])).size,
      pages.size,
      `Duplicate ${field}`
    );
  }
  const organizationDefinitions = new Set();
  for (const [path, page] of pages) {
    const schemasOfType = (type) =>
      page.jsonLd.filter((schema) => [schema["@type"]].flat().includes(type));
    const organizations = schemasOfType("Organization");
    assert.equal(organizations.length, 1, `Organization count: ${path}`);
    assert.equal(schemasOfType("WebSite").length, 1, `WebSite count: ${path}`);
    assert(
      schemasOfType("BreadcrumbList").length <= 1,
      `Duplicate breadcrumbs: ${path}`
    );
    organizationDefinitions.add(JSON.stringify(organizations[0]));
    for (const service of schemasOfType("Service"))
      assert.equal(
        service.url,
        `${publicOrigin}${path}`,
        `Service schema URL: ${path}`
      );
    const ids = page.jsonLd.map((schema) => schema["@id"]).filter(Boolean);
    assert.equal(
      new Set(ids).size,
      ids.length,
      `Duplicate schema IDs: ${path}`
    );
  }
  assert.equal(
    organizationDefinitions.size,
    1,
    "Conflicting organization definitions across locales"
  );
  const incoming = new Map([...pages.keys()].map((path) => [path, new Set()]));
  for (const [path, page] of pages) {
    for (const { href, hreflang } of page.anchors) {
      if (!href || /^(mailto:|tel:)/.test(href)) continue;
      const destination = new URL(href, new URL(path, base));
      assert(
        !/^(javascript|data):$/.test(destination.protocol),
        `Non-crawlable href: ${path} → ${href}`
      );
      if (![base.origin, publicOrigin].includes(destination.origin)) {
        assert(
          !/localhost|127\.0\.0\.1|\.vercel\.app$|\.ngrok\./i.test(
            destination.hostname
          ),
          `Staging link: ${path} → ${href}`
        );
        assert(
          !["shinex.am", "www.shinex.am"].includes(destination.hostname),
          `Non-canonical domain link: ${path} → ${href}`
        );
        continue;
      }
      assert(
        pages.has(destination.pathname),
        `Broken or retired internal link: ${path} → ${href}`
      );
      const destinationLocale = destination.pathname.split("/")[1];
      const sourceLocale = path.split("/")[1];
      assert(
        destinationLocale === sourceLocale || hreflang === destinationLocale,
        `Unexpected language switch: ${path} → ${href}`
      );
      if (destination.pathname !== path && destinationLocale === sourceLocale)
        incoming.get(destination.pathname).add(path);
      if (destination.hash)
        assert(
          pages
            .get(destination.pathname)
            .ids.has(decodeURIComponent(destination.hash.slice(1))),
          `Broken anchor: ${path} → ${href}`
        );
    }
  }
  for (const [path, sources] of incoming)
    assert(sources.size, `Orphan page: ${path}`);
  for (const path of ["/hy", "/ru/prices", "/en/services/house-construction"]) {
    const { response, page } = await fetchPage(
      `${path}?utm_source=seo-check&gclid=test&fbclid=test`
    );
    assert.equal(response.status, 200, `Attribution URL: ${path}`);
    assert.deepEqual(
      page.canonical,
      [`${publicOrigin}${path}`],
      `Query canonical: ${path}`
    );
    assert.equal(
      page.title,
      pages.get(path).title,
      `Query changed metadata: ${path}`
    );
  }
  for (const resource of [
    "/_next/static/example.js",
    "/_next/image?url=x",
    "/brand/shinex-logo.png",
  ]) {
    assert(
      robotsAllows(robotsText, `${publicOrigin}${resource}`),
      `robots blocks rendering resource: ${resource}`
    );
  }
  for (const locale of locales) {
    for (const { source, destination } of seoRedirects) {
      for (const suffix of ["", "/"]) {
        const response = await fetch(
          new URL(`/${locale}/${source}${suffix}?utm_source=seo-check`, base),
          { redirect: "manual" }
        );
        assert.equal(response.status, 308, `Redirect status: ${source}`);
        const target = new URL(response.headers.get("location"), base);
        assert.equal(target.pathname, `/${locale}/${destination}`);
        assert.equal(target.searchParams.get("utm_source"), "seo-check");
      }
    }
    const trailing = await fetch(new URL(`/${locale}/?ref=seo-check`, base), {
      redirect: "manual",
    });
    assert.equal(trailing.status, 308, "Locale trailing slash status");
    const normalized = new URL(trailing.headers.get("location"), base);
    assert.equal(normalized.pathname, `/${locale}`);
    assert.equal(normalized.searchParams.get("ref"), "seo-check");
    for (const path of [
      "projects",
      "projects/example",
      "seo-check-missing-page",
    ]) {
      const { response, page } = await fetchPage(`/${locale}/${path}`);
      assert.equal(response.status, 404, `Expected 404: ${locale}/${path}`);
      assert(
        page.robots.some((rule) => /\bnoindex\b/.test(rule)),
        "Missing 404 noindex"
      );
      assert(
        !page.robots.some((rule) => /(?:^|[\s,])index(?:$|[\s,])/.test(rule)),
        "Conflicting 404 index directive"
      );
    }
  }
  const image = await fetch(new URL("/share-image", base));
  assert.equal(image.status, 200, "Share image status");
  assert(
    image.headers.get("content-type")?.includes("image/png"),
    "Share image type"
  );
  const png = Buffer.from(await image.arrayBuffer());
  assert.equal(png.readUInt32BE(16), 1200, "Share image width");
  assert.equal(png.readUInt32BE(20), 630, "Share image height");
  const xml = await fetch(new URL("/sitemap.xml", base));
  assert.equal(xml.status, 200);
  const xmlText = await xml.text();
  const locations = [...xmlText.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, url]) =>
    decode(url)
  );
  assert.deepEqual(
    new Set(locations),
    new Set(sitemap.map(({ url }) => url)),
    "Rendered sitemap differs from data"
  );
  assert.equal(
    locations.length,
    sitemap.length,
    "Duplicate URLs in rendered sitemap"
  );
  for (const [, block] of xmlText.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const url = decode(block.match(/<loc>(.*?)<\/loc>/)?.[1] ?? "");
    const alternates = Object.fromEntries(
      [...block.matchAll(/<xhtml:link\b[^>]*>/g)].map(([tag]) => {
        const link = attributes(tag);
        return [link.hreflang, link.href];
      })
    );
    assert.deepEqual(
      alternates,
      sitemap.find((entry) => entry.url === url)?.alternates.languages,
      `Rendered sitemap hreflang: ${url}`
    );
  }
  console.log(
    `SEO HTTP crawl passed: ${pages.size} pages, ${seoRedirects.length * locales.length * 2} retired-URL variants + 3 slash redirects, ${locales.length * 3} true 404s, internal links, hreflang, schema and share image.`
  );
  return [...pages].map(([path, page]) => ({
    url: `${publicOrigin}${path}`,
    status: page.status,
    headers: page.headers,
    title: page.title,
    description: page.description,
    h1: page.h1Text,
    canonical: page.canonical[0],
    locale: page.lang,
    hreflang: page.alternates,
    robots: page.robots,
    mainTextLength: page.mainText.length,
    incomingPages: incoming.get(path).size,
  }));
}
