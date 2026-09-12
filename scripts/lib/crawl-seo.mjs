import assert from "node:assert/strict";

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
        assert(page.title && page.description, `Missing metadata: ${path}`);
        assert.equal(page.h1, 1, `H1 count: ${path}`);
        assert.equal(
          page.ids.size,
          page.idCount,
          `Duplicate HTML IDs: ${path}`
        );
        assert.deepEqual(page.canonical, [route.url], `Canonical: ${path}`);
        assert.deepEqual(
          page.alternates,
          route.alternates.languages,
          `Hreflang: ${path}`
        );
        assert(
          !page.robots.some((rule) => /\bnoindex\b/.test(rule)),
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
        if (path.endsWith("/prices"))
          assert(page.ids.has("calculator"), `No embedded calculator: ${path}`);
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
        pages.set(path, page);
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
  for (const [path, page] of pages) {
    for (const { href } of page.anchors) {
      if (!href || /^(mailto:|tel:|https?:\/\/|\/\/)/.test(href)) continue;
      const destination = new URL(href, new URL(path, base));
      assert(
        pages.has(destination.pathname),
        `Broken or retired internal link: ${path} → ${href}`
      );
      if (destination.hash)
        assert(
          pages
            .get(destination.pathname)
            .ids.has(decodeURIComponent(destination.hash.slice(1))),
          `Broken anchor: ${path} → ${href}`
        );
    }
  }
  for (const locale of locales) {
    for (const { source, destination } of seoRedirects) {
      const response = await fetch(
        new URL(`/${locale}/${source}?utm_source=seo-check`, base),
        { redirect: "manual" }
      );
      assert.equal(response.status, 308, `Redirect status: ${source}`);
      const target = new URL(response.headers.get("location"), base);
      assert.equal(target.pathname, `/${locale}/${destination}`);
      assert.equal(target.searchParams.get("utm_source"), "seo-check");
    }
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
  const robots = await fetch(new URL("/robots.txt", base));
  assert.equal(robots.status, 200);
  assert((await robots.text()).includes("Sitemap:"), "Missing robots sitemap");
  const xml = await fetch(new URL("/sitemap.xml", base));
  assert.equal(xml.status, 200);
  const locations = [...(await xml.text()).matchAll(/<loc>(.*?)<\/loc>/g)].map(
    ([, url]) => decode(url)
  );
  assert.deepEqual(
    new Set(locations),
    new Set(sitemap.map(({ url }) => url)),
    "Rendered sitemap differs from data"
  );
  console.log(
    `SEO HTTP crawl passed: ${pages.size} pages, ${seoRedirects.length * locales.length} redirects, 9 true 404s, internal links, hreflang, schema and share image.`
  );
}
