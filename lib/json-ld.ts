import { companyConfig } from "@/config/company.config";
import {
  getAbsoluteUrl,
  getGoogleMapsHref,
  getMailHref,
  getPhoneHref,
  getSocialLinks,
} from "@/lib/company";
import type { Locale } from "@/types";
import { localeLanguageTags } from "@/lib/i18n";

export type JsonLd = Record<string, unknown>;

export function serializeJsonLd(value: JsonLd): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

export function getOrganizationJsonLd(
  locale: Locale = companyConfig.website.defaultLocale
): JsonLd {
  const phone = getPhoneHref()?.replace("tel:", "");
  const email = getMailHref()?.replace("mailto:", "");
  const address = companyConfig.contact.address?.[locale];
  const geo = companyConfig.contact.geo;
  const workingHours = companyConfig.contact.workingHours;
  const organization: JsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": getAbsoluteUrl("/#organization"),
    name: companyConfig.brand.name,
    alternateName: companyConfig.brand.alternateName,
    url: getAbsoluteUrl("/"),
    logo: getAbsoluteUrl(companyConfig.brand.logo),
    areaServed: companyConfig.business.serviceArea.map((name) => ({
      "@type": "Place",
      name,
    })),
    contactPoint: phone
      ? {
          "@type": "ContactPoint",
          telephone: phone,
          contactType: "customer service",
          availableLanguage: ["hy", "ru", "en"],
        }
      : undefined,
    telephone: phone,
    email,
    address:
      address || companyConfig.contact.city
        ? {
            "@type": "PostalAddress",
            streetAddress: address?.streetAddress,
            addressLocality:
              address?.addressLocality ?? companyConfig.contact.city,
            addressCountry: companyConfig.contact.countryCode,
          }
        : undefined,
    geo: geo ? { "@type": "GeoCoordinates", ...geo } : undefined,
    hasMap: getGoogleMapsHref(),
    openingHoursSpecification: workingHours
      ? {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: workingHours.dayOfWeek,
          opens: workingHours.opens,
          closes: workingHours.closes,
        }
      : undefined,
    ...(getSocialLinks().length
      ? { sameAs: getSocialLinks().map(({ url }) => url) }
      : {}),
  };
  return Object.fromEntries(
    Object.entries(organization).filter(
      ([, value]) => value !== undefined && value !== null && value !== ""
    )
  );
}

export function getWebsiteJsonLd(locale: Locale): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": getAbsoluteUrl("/#website"),
    name: companyConfig.brand.name,
    alternateName: companyConfig.brand.alternateName,
    url: getAbsoluteUrl("/"),
    inLanguage: localeLanguageTags[locale],
    publisher: { "@id": getAbsoluteUrl("/#organization") },
  };
}

export function getBreadcrumbJsonLd(
  items: readonly { label: string; href?: string }[]
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: getAbsoluteUrl(item.href) } : {}),
    })),
  };
}

export function getServiceJsonLd({
  locale,
  name,
  description,
  pathname,
}: {
  locale: Locale;
  name: string;
  description: string;
  pathname: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: name,
    url: getAbsoluteUrl(`/${locale}/${pathname.replace(/^\//, "")}`),
    areaServed: companyConfig.business.serviceArea.map((name) => ({
      "@type": "Place",
      name,
    })),
    provider: { "@id": getAbsoluteUrl("/#organization") },
  };
}

export function getWebPageJsonLd({
  locale,
  name,
  description,
  pathname,
}: {
  locale: Locale;
  name: string;
  description: string;
  pathname: string;
}): JsonLd {
  const url = getAbsoluteUrl(`/${locale}/${pathname.replace(/^\//, "")}`);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: locale,
    isPartOf: { "@id": getAbsoluteUrl("/#website") },
    publisher: { "@id": getAbsoluteUrl("/#organization") },
  };
}
