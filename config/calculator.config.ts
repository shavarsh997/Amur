import type { CalculatorRate, CalculatorOption } from "@/types/calculator";
import type { CalculatorObjectType, CalculatorWorkType } from "@/types/config";

/**
 * Add verified rates before enabling public calculation. The application will
 * never invent a price when this array is empty.
 */
export const calculatorConfig = {
  steps: ["objectType", "workType", "area", "location", "options", "contact", "result"],
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
  limits: {
    minArea: 1,
    maxArea: 100_000,
  },
  pricing: {
    currency: "AMD",
    // Add only approved public ranges, for example:
    // { objectType: "private-house", workType: "turnkey", minPerSquareMeter: 0, maxPerSquareMeter: 0 },
    rates: [] as readonly CalculatorRate[],
    optionMultipliers: {
      "design-documentation": 1,
      materials: 1,
      "site-conditions": 1,
    } as const satisfies Record<CalculatorOption, number>,
  },
} as const satisfies {
  steps: readonly string[];
  objectTypes: readonly { value: CalculatorObjectType; labelKey: "privateHouse" | "commercial" | "apartment" | "other" }[];
  workTypes: readonly { value: CalculatorWorkType; labelKey: "turnkey" | "design" | "renovation" | "separateWorks" }[];
  options: readonly { value: CalculatorOption; labelKey: "designDocumentation" | "materials" | "siteConditions" }[];
  limits: { minArea: number; maxArea: number };
  pricing: {
    currency: string;
    rates: readonly CalculatorRate[];
    optionMultipliers: Record<CalculatorOption, number>;
  };
};
