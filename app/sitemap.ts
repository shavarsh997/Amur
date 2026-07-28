import type { MetadataRoute } from "next";

import { staticRouteConfig } from "@/config/navigation.config";
import { getActiveServices } from "@/config/services.config";
import { siteConfig } from "@/config/site.config";
import { defaultLocale, locales } from "@/lib/i18n";

const servicePaths = getActiveServices(defaultLocale).map(
  ({ slug }) => `services/${slug}`
);

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...staticRouteConfig, ...servicePaths];
  const lastModified = new Date();

  return paths.flatMap((path) => {
    const suffix = path ? `/${path}` : "";
    const languages = Object.fromEntries([
      ...locales.map((locale) => [
        locale,
        `${siteConfig.domain}/${locale}${suffix}`,
      ]),
      [
        "x-default",
        `${siteConfig.domain}/${siteConfig.defaultLocale}${suffix}`,
      ],
    ]);

    return locales.map((locale) => ({
      url: `${siteConfig.domain}/${locale}${suffix}`,
      lastModified,
      changeFrequency: path ? ("monthly" as const) : ("weekly" as const),
      priority: path === "" ? 1 : path.includes("/") ? 0.7 : 0.8,
      alternates: { languages },
    }));
  });
}
