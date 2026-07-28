import type { Locale } from "@/types";

export type ConfiguredLocale = Locale;

export type NavigationKey =
  "home" | "services" | "about" | "contacts" | "privacy";

export type CalculatorObjectType =
  "private-house" | "commercial" | "apartment" | "other";

export type CalculatorWorkType =
  "turnkey" | "design" | "renovation" | "separate-works";

export type ServiceIcon =
  | "blocks"
  | "building-2"
  | "house"
  | "paint-roller"
  | "pen-tool"
  | "panels-top-left"
  | "ruler";

export interface CompanyConfig {
  companyName: string;
  shortCompanyName: string;
  tagline: string;
  description: string;
  country: string;
  city: string;
}

export interface ContactConfigData {
  phone: string;
  phoneHref: string;
  email: string;
  address: string;
  hours: string;
  telegramUrl: string;
  whatsappUrl: string;
  socials: readonly {
    label: string;
    url: string;
  }[];
}

export interface SiteConfiguration extends CompanyConfig {
  domain: string;
  defaultLocale: ConfiguredLocale;
  locales: readonly ConfiguredLocale[];
  contacts: ContactConfigData;
  legal: {
    legalEntityName: string;
    registrationNumber: string;
    taxNumber: string;
  };
}
