import type { Metadata } from "next";

import { locales } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";
import type { Locale } from "@/types";

const localeOg: Record<Locale, "hy_AM" | "ru_RU" | "en_US"> = {
  hy: "hy_AM",
  ru: "ru_RU",
  en: "en_US",
};

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
    locales.map((language) => [language, `/${language}${normalizedPath}`]),
  );

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        ...languages,
        "x-default": `/hy${normalizedPath}`,
      },
    },
    openGraph: {
      type: "website",
      locale: localeOg[locale],
      alternateLocale: locales
        .filter((language) => language !== locale)
        .map((language) => localeOg[language]),
      url: canonical,
      siteName: siteConfig.brand,
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
