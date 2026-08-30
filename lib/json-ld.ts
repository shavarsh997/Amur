import { companyConfig } from "@/config/company.config";
import {
  getAbsoluteUrl,
  getMailHref,
  getPhoneHref,
  getSocialLinks,
} from "@/lib/company";
import type { Locale } from "@/types";

export type JsonLd = Record<string, unknown>;

export function serializeJsonLd(value: JsonLd): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

export function getOrganizationJsonLd(): JsonLd {
  const phone = getPhoneHref()?.replace("tel:", "");
  const email = getMailHref()?.replace("mailto:", "");
  const organization: JsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "HomeAndConstructionBusiness"],
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
      companyConfig.contact.address || companyConfig.contact.city
        ? {
            "@type": "PostalAddress",
            ...(companyConfig.contact.address
              ? { streetAddress: companyConfig.contact.address }
              : {}),
            addressLocality: companyConfig.contact.city,
            addressCountry: companyConfig.contact.countryCode,
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

export function getWebsiteJsonLd(locale: "hy" | "ru" | "en"): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": getAbsoluteUrl("/#website"),
    name: companyConfig.brand.name,
    alternateName: companyConfig.brand.alternateName,
    url: getAbsoluteUrl("/"),
    inLanguage: locale === "hy" ? "hy-AM" : locale === "ru" ? "ru-AM" : "en",
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
