import { companyConfig } from "@/config/company.config";

/** @deprecated Use `companyConfig` and URL helpers from `@/lib/company`. */
export const siteConfig = {
  companyName: companyConfig.brand.name,
  shortCompanyName: companyConfig.brand.name,
  domain: companyConfig.website.origin,
  defaultLocale: companyConfig.website.defaultLocale,
  locales: companyConfig.website.supportedLocales,
  country: "Armenia",
  city: companyConfig.contact.city,
} as const;
