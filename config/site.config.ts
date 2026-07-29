import { companyConfig } from "@/config/company.config";
import { contactConfig } from "@/config/contact.config";
import type { SiteConfiguration } from "@/types/config";

export const siteConfig = {
  ...companyConfig,
  domain: "https://www.shinex.am",
  defaultLocale: "hy",
  locales: ["hy", "ru", "en"],
  contacts: contactConfig,
  legal: {
    legalEntityName: "TODO_REPLACE_LEGAL_ENTITY_NAME",
    registrationNumber: "TODO_REPLACE_REGISTRATION_NUMBER",
    taxNumber: "TODO_REPLACE_TAX_NUMBER",
  },
} as const satisfies SiteConfiguration;

export function isPlaceholder(value: string): boolean {
  return value.startsWith("TODO_REPLACE") || value === "";
}
