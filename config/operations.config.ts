/**
 * Structural settings for operations shown through localized messages.
 * Localized explanatory copy stays in messages/{locale}.ts.
 */
export const operationsConfig = {
  workflow: [
    "consultation",
    "site-review",
    "estimate",
    "agreement",
    "delivery",
    "handover",
  ],
  benefits: [
    "agreement",
    "estimate",
    "schedule",
    "quality",
    "warranty",
    "geography",
  ],
} as const;
