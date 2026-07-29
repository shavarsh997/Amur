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
  imageAlt,
  noIndex = false,
}: {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
}): Metadata {
  const normalizedPath = path ? `/${path.replace(/^\/|\/$/g, "")}` : "";
  const canonical = `/${locale}${normalizedPath}`;
  const languages = Object.fromEntries(
    locales.map((language) => [language, `/${language}${normalizedPath}`])
  );
  const titleSuffix = `${seoConfig.titleSeparator}${siteConfig.companyName}`;
  const pageTitle = title.endsWith(titleSuffix)
    ? title.slice(0, -titleSuffix.length)
    : title;
  const brandedTitle = `${pageTitle}${titleSuffix}`;

  return {
    // This ignores templates declared in either a parent or the current
    // locale segment, so every route receives exactly one brand suffix.
    title: { absolute: brandedTitle },
    description,
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
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
      title: brandedTitle,
      description,
      images: image ? [{ url: image, alt: imageAlt ?? pageTitle }] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: brandedTitle,
      description,
      images: image ? [{ url: image, alt: imageAlt ?? pageTitle }] : undefined,
    },
  };
}
