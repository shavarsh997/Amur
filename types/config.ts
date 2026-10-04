import type { Locale } from "@/types";

export type NavigationKey =
  "home" | "services" | "about" | "contacts" | "privacy";

export type LeadObjectType =
  "private-house" | "commercial" | "apartment" | "other";

export type LeadWorkType =
  "turnkey" | "design" | "renovation" | "separate-works";

export type ServiceIcon =
  | "blocks"
  | "building-2"
  | "house"
  | "paint-roller"
  | "pen-tool"
  | "panels-top-left"
  | "ruler";

export interface CompanyConfiguration {
  brand: {
    name: string;
    alternateName: string;
    legalName: string | null;
    logo: string;
  };
  website: {
    origin: string;
    defaultLocale: Locale;
    supportedLocales: readonly Locale[];
  };
  contact: {
    phone: string | null;
    displayPhone: string | null;
    whatsapp: string | null;
    telegram: string | null;
    email: string | null;
    address: Record<
      Locale,
      { streetAddress: string; addressLocality: string }
    > | null;
    city: string;
    countryCode: string;
    geo: { latitude: number; longitude: number } | null;
    acceptsVisitors: boolean | null;
    workingHours: {
      dayOfWeek: readonly (
        | "Monday"
        | "Tuesday"
        | "Wednesday"
        | "Thursday"
        | "Friday"
        | "Saturday"
        | "Sunday"
      )[];
      opens: string;
      closes: string;
      display: Record<Locale, string>;
    } | null;
  };
  social: {
    instagram: string | null;
    facebook: string | null;
    youtube: string | null;
  };
  business: {
    registrationNumber: string | null;
    foundedYear: number | null;
    warrantyText: string | null;
    serviceArea: readonly string[];
  };
  privacy: { updatedAt: string | null };
}

/** Kept as aliases for components that consume contact data. */
export type ContactConfigData = CompanyConfiguration["contact"];
