import type { MetadataRoute } from "next";

import { staticRouteConfig } from "@/config/navigation.config";
import { getActiveServices } from "@/config/services.config";
import {
  getSeoLandingPath,
  seoLandingPages,
} from "@/config/seo-landing-pages.config";
import { getPublishedArticles } from "@/data/blog";
import { companyConfig } from "@/config/company.config";
import { getAbsoluteUrl } from "@/lib/company";
import { defaultLocale, locales } from "@/lib/i18n";

const servicePaths = getActiveServices(defaultLocale).map(
  ({ slug }) => `services/${slug}`
);

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...staticRouteConfig,
    ...servicePaths,
    ...seoLandingPages.map(getSeoLandingPath),
    ...(getPublishedArticles().length ? ["blog"] : []),
    ...getPublishedArticles().map(({ slug }) => `blog/${slug}`),
  ];

  return paths.flatMap((path) => {
    const suffix = path ? `/${path}` : "";
    const languages = Object.fromEntries([
      ...locales.map((locale) => [
        locale === "hy" ? "hy-AM" : locale === "ru" ? "ru-AM" : "en",
        getAbsoluteUrl(`/${locale}${suffix}`),
      ]),
      [
        "x-default",
        getAbsoluteUrl(`/${companyConfig.website.defaultLocale}${suffix}`),
      ],
    ]);

    return locales.map((locale) => ({
      url: getAbsoluteUrl(`/${locale}${suffix}`),
      changeFrequency: path ? ("monthly" as const) : ("weekly" as const),
      priority:
        path === ""
          ? 1
          : seoLandingPages.some((page) => getSeoLandingPath(page) === path)
            ? 0.9
            : path.includes("/")
              ? 0.7
              : 0.8,
      alternates: { languages },
    }));
  });
}
