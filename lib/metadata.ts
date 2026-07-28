import type { Metadata } from "next";

import { seoConfig } from "@/config/seo.config";
import { siteConfig } from "@/config/site.config";
import { locales } from "@/lib/i18n";
import type { Locale } from "@/types";

export function buildMetadata({
  locale,
  path = "",
  title,
  description,
  image,
}: {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  const normalizedPath = path ? `/${path.replace(/^\/|\/$/g, "")}` : "";
  const canonical = `/${locale}${normalizedPath}`;
  const languages = Object.fromEntries(
    locales.map((language) => [language, `/${language}${normalizedPath}`])
  );

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        ...languages,
        "x-default": `/${siteConfig.defaultLocale}${normalizedPath}`,
      },
    },
    openGraph: {
      type: "website",
      locale: seoConfig.openGraphLocale[locale],
      alternateLocale: locales
        .filter((language) => language !== locale)
        .map((language) => seoConfig.openGraphLocale[language]),
      url: canonical,
      siteName: siteConfig.companyName,
      title,
      description,
      images: image ? [{ url: image, alt: title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}
