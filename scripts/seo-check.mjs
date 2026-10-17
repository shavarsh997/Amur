import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFileSync, statSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";
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
const { getDictionary, localeLanguageTags, locales } = load("lib/i18n");
const { seoLandingPages, getSeoLandingPath } = load(
  "config/seo-landing-pages.config"
);
const { getActiveServices } = load("config/services.config");
const { getServiceNavigation } = load("config/navigation.config");
const { servicePageTranslations } = load("messages/service-pages");
const { servicePlanningTranslations, getServicePlanning } = load(
  "messages/service-planning"
);
const { serviceMedia, getServiceMedia } = load("config/service-media.config");
const { serviceSectionRoles } = load("config/service-presentation.config");
const { blogArticles } = load("data/blog");
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
  getWebsiteJsonLd,
} = load("lib/json-ld");
const sitemap = load("app/sitemap").default();
const urls = new Set(sitemap.map(({ url }) => url));
const paths = new Set(
  sitemap.map(({ url }) => new URL(url).pathname.split("/").slice(2).join("/"))
);
const serviceSlugs = new Set(getActiveServices("hy").map(({ slug }) => slug));
const landingSlugs = new Set(seoLandingPages.map(({ slug }) => slug));
const pageExpectations = {};
function expectPage(locale, path, title, description, h1, textFragments = []) {
  const metadata = createPageMetadata({ locale, path, title, description });
  const planning = path.startsWith("services/")
    ? getServicePlanning(path.slice("services/".length), locale)
    : undefined;
  pageExpectations[`/${locale}/${path}`] = {
    title: metadata.title.absolute,
    description,
    h1,
    serviceMedia: path.startsWith("services/")
      ? getServiceMedia(path.slice("services/".length), locale)
      : undefined,
    textFragments: [
      ...textFragments,
      ...(planning
        ? [planning.title, planning.description, ...planning.items]
        : []),
    ].filter(Boolean),
  };
}

// The presentation layer must cover every published service without reusing
// photos in a different slot, even when an image URL has different crop options.
const publishedServiceSlugs = [
  ...serviceSlugs,
  ...seoLandingPages
    .filter((page) => page.kind === "service")
    .map(({ slug }) => slug),
];
assert.deepEqual(
  Object.keys(serviceMedia).sort(),
  publishedServiceSlugs.sort()
);
const imageIdentities = new Set();
const localImageHashes = new Set();
for (const slug of publishedServiceSlugs) {
  for (const slot of ["hero", "details"]) {
    const asset = serviceMedia[slug][slot];
    const identity = new URL(asset.src, "https://www.shinex.am").pathname;
    assert(
      !imageIdentities.has(identity),
      `Repeated service photo: ${slug}/${slot}`
    );
    imageIdentities.add(identity);
    if (asset.src.startsWith("/")) {
      const file = join(process.cwd(), "public", asset.src);
      const bytes = readFileSync(file);
      assert.equal(
        bytes.toString("ascii", 0, 4),
        "RIFF",
        `Invalid WebP: ${file}`
      );
      assert.equal(
        bytes.toString("ascii", 8, 12),
        "WEBP",
        `Invalid WebP: ${file}`
      );
      assert(
        statSync(file).size <= 400_000,
        `Oversized service image: ${file}`
      );
      const hash = createHash("sha256").update(bytes).digest("hex");
      assert(!localImageHashes.has(hash), `Duplicate photo file: ${file}`);
      localImageHashes.add(hash);
    }
    for (const locale of locales) {
      const image = getServiceMedia(slug, locale)[slot];
      assert(image.alt.trim(), `Missing image alt: ${slug}/${slot}/${locale}`);
      assert(
        image.caption.trim(),
        `Missing caption: ${slug}/${slot}/${locale}`
      );
      if (asset.generated) {
        assert(
          asset.alt[locale]?.trim(),
          `Untranslated image: ${slug}/${slot}/${locale}`
        );
        assert.notEqual(
          image.caption,
          image.alt,
          `Missing illustration disclosure: ${slug}/${slot}/${locale}`
        );
      }
    }
  }
}

// Test the public copy against the actual calculation engine, not just route names.
const { initialValues } = load("components/calculator/constants");
const { calculateConstructionEstimate } = load(
  "lib/calculator/calculate-construction-estimate"
);
const russian = await getDictionary("ru");
for (const calculationType of ["construction", "design"]) {
  const estimate = calculateConstructionEstimate(
    { ...initialValues, calculationType, area: "60" },
    russian.constructionCalculator
  );
  assert(estimate.total > 0 && Number.isFinite(estimate.total));
}
assert.throws(
  () =>
    calculateConstructionEstimate(
      { ...initialValues, calculationType: "renovation", area: "60" },
      russian.constructionCalculator
    ),
  /Renovation estimates require contacting SHINEX/
);
for (const field of ["title", "description", "intro", "faqTitle"]) {
  assert.match(
    russian.calculatorPage[field],
    /строительств/iu,
    `Calculator ${field}: missing construction`
  );
  assert.match(
    russian.calculatorPage[field],
    /дизайн/iu,
    `Calculator ${field}: missing design`
  );
}
assert.doesNotMatch(
  russian.calculatorPage.title,
  /ремонт/iu,
  "Calculator title promises unsupported renovation calculation"
);
for (const field of ["description", "intro"]) {
  assert.match(
    russian.calculatorPage[field],
    /ремонт[\s\S]*автоматическ[\s\S]*недоступен/iu,
    `Calculator ${field}: missing renovation limitation`
  );
}

// Public calculator copy describes the contact request flow, not an instant quote.
assert.match(russian.constructionCalculator.result.calculate, /запросить/iu);
assert.match(
  russian.constructionCalculator.result.calculateDescription,
  /контакт/iu
);
assert.match(russian.calculatorPage.intro, /свяжется с вами/iu);
assert.doesNotMatch(
  russian.calculatorPage.description,
  /калькулятор покажет|сразу.*стоимость/iu
);
const calculatorComponent = readFileSync(
  join(process.cwd(), "components/calculator/cost-calculator.tsx"),
  "utf8"
);
assert(calculatorComponent.includes("contactMessageEvent"));
assert(
  !calculatorComponent.includes("ConstructionEstimateDialog"),
  "Calculator bypasses contact capture with an automatic estimate"
);

// Publication fixtures are isolated in memory and never written to site content.
function checkBlogSitemap(entries, articles) {
  const published = articles.filter(({ isPublished }) => isPublished);
  const expectedPaths = published.length
    ? ["blog", ...published.map(({ slug }) => `blog/${slug}`)]
    : [];
  const actual = entries.filter(({ url }) =>
    /^\/[^/]+\/blog(?:\/|$)/.test(new URL(url).pathname)
  );
  const expectedUrls = expectedPaths.flatMap((path) =>
    locales.map((locale) => `https://www.shinex.am/${locale}/${path}`)
  );
  assert.deepEqual(
    actual.map(({ url }) => url).sort(),
    expectedUrls.sort(),
    "Sitemap must include exactly the published articles and their blog index in every locale"
  );
  for (const entry of actual) {
    const path = new URL(entry.url).pathname.split("/").slice(2).join("/");
    const metadata = createPageMetadata({
      locale: "hy",
      path,
      title: "Test",
      description: "Test",
    });
    assert.deepEqual(
      entry.alternates.languages,
      metadata.alternates.languages,
      `Blog hreflang: ${entry.url}`
    );
  }
}
checkBlogSitemap(sitemap, blogArticles);
const fixtureLoad = createTypeScriptLoader(process.cwd());
const fixtureBlog = fixtureLoad("data/blog");
const fixtureSitemap = fixtureLoad("app/sitemap").default;
fixtureBlog.blogArticles.splice(0);
checkBlogSitemap(fixtureSitemap(), []);
const draft = { slug: "seo-test-draft", isPublished: false };
fixtureBlog.blogArticles.push(draft);
checkBlogSitemap(fixtureSitemap(), [draft]);
const published = { slug: "seo-test-published", isPublished: true };
fixtureBlog.blogArticles.push(published);
checkBlogSitemap(fixtureSitemap(), [draft, published]);
assert.equal(
  fixtureBlog.getPublishedArticle(draft.slug),
  undefined,
  "Draft article is publicly accessible"
);
assert.equal(fixtureBlog.getPublishedArticle(published.slug), published);
published.isPublished = false;
checkBlogSitemap(fixtureSitemap(), [draft, published]);
assert.equal(
  fixtureBlog.getPublishedArticle(published.slug),
  undefined,
  "Unpublished article remains accessible"
);

// New dictionaries must preserve form fields, list entries and interpolation tokens.
function checkTranslation(reference, translated, path) {
  assert.equal(
    typeof translated,
    typeof reference,
    `Translation type: ${path}`
  );
  if (typeof reference === "string") {
    assert(
      translated.trim() || !reference.trim(),
      `Empty translation: ${path}`
    );
    const placeholders = (text) =>
      [...text.matchAll(/\{\w+\}/g)].map(([token]) => token).sort();
    assert.deepEqual(
      placeholders(translated),
      placeholders(reference),
      `Translation placeholders: ${path}`
    );
  } else if (reference && typeof reference === "object") {
    assert(translated, `Missing translation: ${path}`);
    assert.equal(
      Array.isArray(translated),
      Array.isArray(reference),
      `Translation list: ${path}`
    );
    assert.deepEqual(
      Object.keys(translated).sort(),
      Object.keys(reference).sort(),
      `Translation keys: ${path}`
    );
    for (const key of Object.keys(reference))
      checkTranslation(reference[key], translated[key], `${path}.${key}`);
  } else {
    assert.equal(translated, reference, `Non-text value changed: ${path}`);
  }
}
const englishDictionary = await getDictionary("en");
// The apartment page already has detailed planning sections. Every other
// published service needs its own guidance in every supported language.
const planningSlugs = [
  ...serviceSlugs,
  ...seoLandingPages
    .filter(
      (page) =>
        page.kind === "service" && page.slug !== "apartment-renovation-yerevan"
    )
    .map(({ slug }) => slug),
];
assert.deepEqual(
  Object.keys(servicePlanningTranslations).sort(),
  [...planningSlugs].sort(),
  "Planning guidance must cover exactly the other published services"
);
for (const locale of locales) {
  const planningTitles = new Set();
  for (const slug of planningSlugs) {
    const content = getServicePlanning(slug, locale);
    checkTranslation(
      servicePlanningTranslations[slug].en,
      content,
      `service-planning.${slug}.${locale}`
    );
    assert(content.items.length, `Empty planning guidance: ${slug}/${locale}`);
    assert(
      !planningTitles.has(content.title),
      `Generic repeated planning title: ${slug}/${locale}`
    );
    planningTitles.add(content.title);
  }
}
for (const locale of ["de", "fr"]) {
  assert(locales.includes(locale), `Missing locale: ${locale}`);
  checkTranslation(englishDictionary, await getDictionary(locale), locale);
}
for (const locale of locales) {
  const dictionary = await getDictionary(locale);
  checkTranslation(
    servicePageTranslations.en,
    servicePageTranslations[locale],
    `service-pages.${locale}`
  );
  expectPage(
    locale,
    "calculator",
    dictionary.calculatorPage.title,
    dictionary.calculatorPage.description,
    dictionary.calculatorPage.title
  );
  expectPage(
    locale,
    "about",
    dictionary.about.title,
    dictionary.about.intro,
    dictionary.about.title
  );
  for (const { slug, content } of getActiveServices(locale)) {
    expectPage(
      locale,
      `services/${slug}`,
      content.seoTitle,
      content.seoDescription,
      content.heroTitle ?? content.title,
      [
        content.heroDescription,
        content.fullDescription,
        ...content.includedWorks,
        ...content.suitableFor,
        ...(content.customerTypes ?? []),
        ...(content.workTypes ?? []),
        ...content.workflow.flatMap((step) => [step.title, step.description]),
        ...content.priceFactors,
        ...(content.estimateRequirements ?? []),
        ...content.faq.flatMap((item) => [item.question, item.answer]),
        dictionary.cta.title,
        dictionary.cta.description,
      ]
    );
  }
  const serviceNavigation = getServiceNavigation(locale);
  assert.equal(
    serviceNavigation[0].path,
    seoIntentMap["apartment-renovation"].paths[locale],
    `Apartment renovation must lead service navigation: ${locale}`
  );
  assert(
    serviceNavigation.some(
      ({ path }) => path === seoIntentMap["house-renovation"].paths[locale]
    ),
    `House renovation navigation missing: ${locale}`
  );
  assert.equal(
    new Set(serviceNavigation.map(({ path }) => path)).size,
    serviceNavigation.length,
    `Duplicate service navigation: ${locale}`
  );
  const house = getActiveServices(locale).find(
    ({ slug }) => slug === "renovation"
  ).content;
  const houseTerms = {
    hy: /առանձնատ/iu,
    ru: /частн[а-яё]* дом/iu,
    en: /private house/iu,
    de: /privathäuser/iu,
    fr: /maisons individuelles/iu,
  };
  for (const field of ["title", "seoTitle"]) {
    assert.match(
      house[field],
      houseTerms[locale],
      `House page lost its distinct intent: ${locale}/${field}`
    );
    assert.doesNotMatch(
      house[field],
      /բնակարան|квартир|apartment|wohnung|appartement/iu,
      `House page competes for apartment intent: ${locale}/${field}`
    );
  }
  for (const { path, label } of serviceNavigation) {
    assert(
      paths.has(path) && label.trim(),
      `Invalid service navigation: ${locale}/${path}`
    );
  }
  const metadata = createPageMetadata({
    locale,
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
  });
  assert.deepEqual(
    Object.keys(metadata.alternates.languages).sort(),
    [...Object.values(localeLanguageTags), "x-default"].sort()
  );
  assert.equal(
    metadata.alternates.languages[localeLanguageTags[locale]],
    `https://www.shinex.am/${locale}`
  );
  assert.equal(getWebsiteJsonLd(locale).inLanguage, localeLanguageTags[locale]);
}

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
    !/\/projects(\/|$)/.test(url.pathname),
    "Unpublished projects in sitemap"
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
    expectPage(
      locale,
      getSeoLandingPath(page),
      content.seoTitle,
      content.seoDescription,
      content.title,
      [
        content.description,
        ...content.introduction,
        ...content.sections.flatMap((section) => [
          section.title,
          ...section.paragraphs,
          ...(section.items ?? []),
        ]),
        ...content.faqs.flatMap((item) => [item.question, item.answer]),
      ]
    );
    const roles = serviceSectionRoles[page.slug];
    if (roles) {
      const indexes = Object.values(roles);
      assert.equal(
        new Set(indexes).size,
        indexes.length,
        `Repeated service section: ${page.slug}`
      );
      for (const index of indexes)
        assert(
          content.sections[index],
          `Missing service section: ${page.slug}/${locale}/${index}`
        );
      if (roles.process !== undefined)
        assert(
          content.sections[roles.process].items?.length,
          `Process has no verified steps: ${page.slug}/${locale}`
        );
    }
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
      "http://localhost:3000/es/services/house-construction-yerevan"
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
  const pages = await crawlSeo({
    base,
    sitemap,
    seoRedirects,
    locales,
    organizationsByLocale: Object.fromEntries(
      locales.map((locale) => [
        locale,
        JSON.parse(serializeJsonLd(getOrganizationJsonLd(locale))),
      ])
    ),
    pageExpectations,
  });
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
