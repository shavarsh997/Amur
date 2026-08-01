import type { Metadata } from "next";

import { companyConfig } from "@/config/company.config";
import { seoConfig } from "@/config/seo.config";
import { getAbsoluteUrl, getSiteOrigin } from "@/lib/company";
import { locales } from "@/lib/i18n";
import type { Locale } from "@/types";

export function createPageMetadata({
  locale,
  pathname,
  path,
  title,
  description,
  image,
  imageAlt,
  noIndex = false,
}: {
  locale: Locale;
  pathname?: string;
  /** @deprecated Use pathname. */
  path?: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
}): Metadata {
  const requestedPath = pathname ?? path ?? "";
  const normalizedPath = requestedPath
    ? `/${requestedPath.replace(/^\/|\/$/g, "")}`
    : "";
  const canonicalPath = `/${locale}${normalizedPath}`;
  const canonical = getAbsoluteUrl(canonicalPath);
  const languages = Object.fromEntries(
    locales.map((language) => [
      language === "hy" ? "hy-AM" : language === "ru" ? "ru-AM" : "en",
      getAbsoluteUrl(`/${language}${normalizedPath}`),
    ])
  );
  const unbrandedTitle = title.replace(
    new RegExp(`\\s*(?:[|—-]\\s*)?${companyConfig.brand.name}$`, "i"),
    ""
  );
  const brandedTitle = `${unbrandedTitle} | ${companyConfig.brand.name}`;
  const absoluteImage = image
    ? image.startsWith("http")
      ? image
      : getAbsoluteUrl(image)
    : undefined;

  return {
    metadataBase: new URL(getSiteOrigin()),
    title: { absolute: brandedTitle },
    description,
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
    alternates: {
      canonical,
      languages: {
        ...languages,
        "x-default": getAbsoluteUrl(`/hy${normalizedPath}`),
      },
    },
    openGraph: {
      type: "website",
      locale: seoConfig.openGraphLocale[locale],
      alternateLocale: locales
        .filter((language) => language !== locale)
        .map((language) => seoConfig.openGraphLocale[language]),
      url: canonical,
      siteName: companyConfig.brand.name,
      title: brandedTitle,
      description,
      images: absoluteImage
        ? [
            {
              url: absoluteImage,
              alt: imageAlt ?? title,
              width: 1200,
              height: 630,
            },
          ]
        : undefined,
    },
    twitter: {
      card: absoluteImage ? "summary_large_image" : "summary",
      title: brandedTitle,
      description,
      images: absoluteImage
        ? [{ url: absoluteImage, alt: imageAlt ?? title }]
        : undefined,
    },
  };
}

/** @deprecated Use createPageMetadata. */
export const buildMetadata = createPageMetadata;
