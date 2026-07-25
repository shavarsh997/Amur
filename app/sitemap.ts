import type { MetadataRoute } from "next";

import { projectCatalog } from "@/data/projects";
import { serviceCatalog } from "@/data/services";
import { locales } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

const staticPaths = ["", "services", "projects", "about", "contacts", "privacy"];
const servicePaths = serviceCatalog.map(({ slug }) => `services/${slug}`);
const projectPaths = projectCatalog.map(({ slug }) => `projects/${slug}`);

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...staticPaths, ...servicePaths, ...projectPaths];
  const lastModified = new Date();

  return paths.flatMap((path) => {
    const suffix = path ? `/${path}` : "";
    const languages = Object.fromEntries([
      ...locales.map((locale) => [
        locale,
        `${siteConfig.siteUrl}/${locale}${suffix}`,
      ]),
      ["x-default", `${siteConfig.siteUrl}/hy${suffix}`],
    ]);

    return locales.map((locale) => ({
      url: `${siteConfig.siteUrl}/${locale}${suffix}`,
      lastModified,
      changeFrequency: path ? ("monthly" as const) : ("weekly" as const),
      priority: path === "" ? 1 : path.includes("/") ? 0.7 : 0.8,
      alternates: { languages },
    }));
  });
}
