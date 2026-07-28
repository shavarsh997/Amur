import type { LeadObjectType, LeadWorkType } from "@/types/config";
import type { LeadOption } from "@/types/lead";

/** Options for the general contact form. They do not affect calculator pricing. */
export const leadFormConfig = {
  objectTypes: [
    { value: "private-house", labelKey: "privateHouse" },
    { value: "commercial", labelKey: "commercial" },
    { value: "apartment", labelKey: "apartment" },
    { value: "other", labelKey: "other" },
  ],
  workTypes: [
    { value: "turnkey", labelKey: "turnkey" },
    { value: "design", labelKey: "design" },
    { value: "renovation", labelKey: "renovation" },
    { value: "separate-works", labelKey: "separateWorks" },
  ],
  options: [
    { value: "design-documentation", labelKey: "designDocumentation" },
    { value: "materials", labelKey: "materials" },
    { value: "site-conditions", labelKey: "siteConditions" },
  ],
} as const satisfies {
  objectTypes: readonly {
    value: LeadObjectType;
    labelKey: "privateHouse" | "commercial" | "apartment" | "other";
  }[];
  workTypes: readonly {
    value: LeadWorkType;
    labelKey: "turnkey" | "design" | "renovation" | "separateWorks";
  }[];
  options: readonly {
    value: LeadOption;
    labelKey: "designDocumentation" | "materials" | "siteConditions";
  }[];
};
