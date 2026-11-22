import { companyConfig } from "@/config/company.config";
import {
  getAbsoluteUrl,
  getGoogleMapsHref,
  getMailHref,
  getPhoneHref,
  getSocialLinks,
} from "@/lib/company";
import { getServiceBySlug } from "@/config/services.config";
import { getSeoLandingPage } from "@/config/seo-landing-pages.config";
import de from "@/messages/de";
import en from "@/messages/en";
import fr from "@/messages/fr";
import hy from "@/messages/hy";
import ru from "@/messages/ru";
import type { Dictionary, Locale } from "@/types";
import { localeLanguageTags } from "@/lib/i18n";

export type JsonLd = Record<string, unknown>;

export function serializeJsonLd(value: JsonLd): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

/** Loaded synchronously so the layout and SEO checks build the same object. */
const organizationDictionaries: Record<Locale, Dictionary> = {
  hy,
  ru,
  en,
  de,
  fr,
};

/** Short topic names for services the site already offers; each is kept only
 * while its page is live, so structured data cannot outlive the offer. */
const organizationTopics = [
  {
    isOffered: (locale: Locale) =>
      Boolean(getSeoLandingPage(locale, "apartment-renovation-yerevan")),
    name: {
      hy: "Բնակարանների վերանորոգում",
      ru: "Ремонт квартир",
      en: "Apartment renovation",
      de: "Wohnungsrenovierung",
      fr: "Rénovation d’appartements",
    },
  },
  {
    isOffered: (locale: Locale) =>
      Boolean(getServiceBySlug(locale, "house-construction")),
    name: {
      hy: "Առանձնատների կառուցում",
      ru: "Строительство частных домов",
      en: "Private house construction",
      de: "Hausbau",
      fr: "Construction de maisons",
    },
  },
  {
    isOffered: (locale: Locale) =>
      Boolean(getServiceBySlug(locale, "monolithic-work")),
    name: {
      hy: "Մոնոլիտ աշխատանքներ",
      ru: "Монолитные работы",
      en: "Reinforced concrete construction",
      de: "Stahlbetonbau",
      fr: "Construction en béton armé",
    },
  },
  {
    isOffered: (locale: Locale) =>
      Boolean(getServiceBySlug(locale, "interior-design")),
    name: {
      hy: "Ինտերիերի դիզայն",
      ru: "Дизайн интерьера",
      en: "Interior design",
      de: "Innenraumgestaltung",
      fr: "Aménagement intérieur",
    },
  },
] as const satisfies readonly {
  isOffered: (locale: Locale) => boolean;
  name: Record<Locale, string>;
}[];

export function getOrganizationJsonLd(
  locale: Locale = companyConfig.website.defaultLocale
): JsonLd {
  const phone = getPhoneHref()?.replace("tel:", "");
  const email = getMailHref()?.replace("mailto:", "");
  const address = companyConfig.contact.address?.[locale];
  const geo = companyConfig.contact.geo;
  const workingHours = companyConfig.contact.workingHours;
  const knowsAbout = organizationTopics
    .filter(({ isOffered }) => isOffered(locale))
    .map(({ name }) => name[locale]);
  const organization: JsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": getAbsoluteUrl("/#organization"),
    name: companyConfig.brand.name,
    alternateName: companyConfig.brand.alternateName,
    // Construction wording keeps SHINEX apart from unrelated cleaning firms with a similar name.
    description: organizationDictionaries[locale].metadata.manifestDescription,
    url: getAbsoluteUrl("/"),
    logo: getAbsoluteUrl(companyConfig.brand.logo),
    knowsAbout: knowsAbout.length ? knowsAbout : undefined,
    // Owner-confirmed renovation labour rate; null hides it when unconfirmed.
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
  const url = getAbsoluteUrl(`/${locale}/${pathname.replace(/^\//, "")}`);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    description,
    serviceType: name,
    url,
    mainEntityOfPage: getWebPageJsonLd({
      locale,
      name,
      description,
      pathname,
      mainEntityId: `${url}#service`,
    }),
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
  type = "WebPage",
  mainEntityId,
}: {
  locale: Locale;
  name: string;
  description: string;
  pathname: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  mainEntityId?: string;
}): JsonLd {
  const path = pathname.replace(/^\/|\/$/g, "");
  const url = getAbsoluteUrl(`/${locale}${path ? `/${path}` : ""}`);
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: localeLanguageTags[locale],
    ...(mainEntityId ? { mainEntity: { "@id": mainEntityId } } : {}),
    isPartOf: { "@id": getAbsoluteUrl("/#website") },
    publisher: { "@id": getAbsoluteUrl("/#organization") },
  };
}
