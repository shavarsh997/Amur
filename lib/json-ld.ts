import { companyConfig } from "@/config/company.config";
import {
  getAbsoluteUrl,
  getMailHref,
  getPhoneHref,
  getSocialLinks,
} from "@/lib/company";

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
    "@type": "GeneralContractor",
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
    address: companyConfig.contact.address
      ? {
          "@type": "PostalAddress",
          streetAddress: companyConfig.contact.address,
          addressLocality: companyConfig.contact.city,
          addressCountry: companyConfig.contact.countryCode,
        }
      : undefined,
    sameAs: getSocialLinks().map(({ url }) => url),
  };
  return Object.fromEntries(
    Object.entries(organization).filter(
      ([, value]) => value !== undefined && value !== null && value !== ""
    )
  );
}

export function getWebsiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": getAbsoluteUrl("/#website"),
    name: companyConfig.brand.name,
    alternateName: companyConfig.brand.alternateName,
    url: getAbsoluteUrl("/"),
    inLanguage: "hy-AM",
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
