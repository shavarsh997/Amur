import type { CompanyConfig } from "@/types/config";
import { regionsConfig } from "@/config/regions.config";

/** Replace every TODO_REPLACE value before publishing the website. */
export const companyConfig = {
  companyName: "Shinex",
  shortCompanyName: "Shinex",
  tagline: "TODO_REPLACE_COMPANY_TAGLINE",
  description: "TODO_REPLACE_COMPANY_DESCRIPTION",
  country: regionsConfig.country,
  city: regionsConfig.primaryCity,
} as const satisfies CompanyConfig;
