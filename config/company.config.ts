import type { CompanyConfig } from "@/types/config";
import { regionsConfig } from "@/config/regions.config";

/** Replace every TODO_REPLACE value before publishing the website. */
export const companyConfig = {
  companyName: "COMPANY_NAME",
  shortCompanyName: "COMPANY_SHORT_NAME",
  tagline: "COMPANY_TAGLINE",
  description: "COMPANY_DESCRIPTION",
  country: regionsConfig.country,
  city: regionsConfig.primaryCity,
} as const satisfies CompanyConfig;
