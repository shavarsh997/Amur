import type { CompanyConfiguration } from "@/types/config";
import { SITE_URL } from "@/lib/site-url";

/**
 * The sole source of business facts displayed on the site.
 * Keep unknown values null: UI and structured data intentionally omit them.
 */
export const companyConfig = {
  brand: {
    name: "Shinex",
    alternateName: "Shinex Armenia",
    legalName: null,
    logo: "/brand/shinex-mark.png",
  },
  website: {
    origin: SITE_URL,
    defaultLocale: "hy",
    supportedLocales: ["hy", "ru", "en"],
  },
  contact: {
    phone: "+37455156615",
    displayPhone: "+374 55 15 66 15",
    whatsapp: "+37455156615",
    email: null,
    address: null,
    city: "Yerevan",
    countryCode: "AM",
    workingHours: null,
  },
  social: {
    instagram: null,
    facebook: null,
    youtube: null,
  },
  business: {
    registrationNumber: null,
    foundedYear: null,
    warrantyText: null,
    serviceArea: ["Armenia", "Yerevan"],
  },
  privacy: {
    // TODO: set the real publication/update date before the privacy policy is published.
    updatedAt: null,
  },
} as const satisfies CompanyConfiguration;
