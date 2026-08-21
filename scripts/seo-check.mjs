import { existsSync, readFileSync } from "node:fs";

const read = (file) => readFileSync(file, "utf8");
const checks = [
  [
    "canonical company origin",
    read("lib/site-url.ts").includes(
      'process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.shinex.am"'
    ) && read("config/company.config.ts").includes("origin: SITE_URL"),
  ],
  ["web manifest", existsSync("app/manifest.ts")],
  ["metadata helper", read("lib/metadata.ts").includes("createPageMetadata")],
  ["robots sitemap", read("app/robots.ts").includes('"/sitemap.xml"')],
  [
    "sitemap excludes unpublished projects",
    !read("app/sitemap.ts").includes('"projects"'),
  ],
  [
    "host/root redirect proxy",
    existsSync("proxy.ts") && read("proxy.ts").includes("canonicalHost"),
  ],
  [
    "safe JSON-LD serializer",
    read("lib/json-ld.ts").includes("serializeJsonLd"),
  ],
  [
    "contacts use company config",
    read("app/[locale]/contacts/page.tsx").includes("companyConfig"),
  ],
  [
    "portfolio stays unpublished",
    read("app/[locale]/projects/page.tsx").includes("notFound()"),
  ],
  [
    "tier-one landing pages are data-driven and mapped in the sitemap",
    read("config/seo-landing-pages.config.ts").includes(
      'slug: "apartment-renovation-yerevan"'
    ) &&
      read("config/seo-landing-pages.config.ts").includes(
        'slug: "new-build-renovation"'
      ) &&
      read("app/sitemap.ts").includes("seoLandingPages"),
  ],
  [
    "calculator has server-rendered SEO content",
    read("app/[locale]/calculator/page.tsx").includes("calculatorSeo") &&
      existsSync("config/calculator-seo.config.ts"),
  ],
  [
    "blog sitemap only uses reviewed content",
    read("data/blog.ts").includes("getPublishedArticles") &&
      read("app/sitemap.ts").includes("getPublishedArticles"),
  ],
];

const failed = checks.filter(([, passed]) => !passed).map(([name]) => name);
if (failed.length) {
  console.error(`SEO checks failed: ${failed.join(", ")}`);
  process.exit(1);
}
console.log(`SEO checks passed (${checks.length}).`);
