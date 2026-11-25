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
    "response",
    "measurement",
    "estimate",
    "fixed-price",
    "staged-payment",
    "weekly-report",
    "own-crew",
    "warranty",
  ],
} as const;
