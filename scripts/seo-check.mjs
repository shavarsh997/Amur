import { existsSync, readFileSync } from "node:fs";

const read = (file) => readFileSync(file, "utf8");
const checks = [
  [
    "canonical company origin",
    read("config/company.config.ts").includes(
      'origin: "https://www.shinex.am"'
    ),
  ],
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
];

const failed = checks.filter(([, passed]) => !passed).map(([name]) => name);
if (failed.length) {
  console.error(`SEO checks failed: ${failed.join(", ")}`);
  process.exit(1);
}
console.log(`SEO checks passed (${checks.length}).`);
