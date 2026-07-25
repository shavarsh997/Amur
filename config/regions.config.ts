/**
 * Confirm individual service areas before adding them to `serviceAreas`.
 * The site currently states only country-wide availability in localized copy.
 */
export const regionsConfig = {
  country: "Armenia",
  primaryCity: "Yerevan",
  serviceAreas: [] as readonly string[],
} as const;
