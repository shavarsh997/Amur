export type ServicePriceRange = {
  serviceSlug: string;
  unit: "sqm" | "project" | "hour" | "custom";
  from?: number;
  to?: number;
  currency: "AMD";
  /** Confirmed scope of the published rate; never infer it from the amount. */
  materialsIncluded?: boolean;
  note?: string;
  isPublic: boolean;
};

/** Only owner-confirmed rates are public. Other services remain quote-based. */
export const servicePriceRanges = [
  {
    serviceSlug: "renovation",
    unit: "sqm",
    from: 55_000,
    currency: "AMD",
    // Owner confirmed on 2026-10-28: labour only, materials paid separately.
    materialsIncluded: false,
    isPublic: true,
  },
  {
    serviceSlug: "house-construction",
    unit: "project",
    currency: "AMD",
    isPublic: false,
  },
  {
    serviceSlug: "interior-design",
    unit: "project",
    currency: "AMD",
    isPublic: false,
  },
  {
    serviceSlug: "commercial-construction",
    unit: "custom",
    currency: "AMD",
    isPublic: false,
  },
] as const satisfies readonly ServicePriceRange[];

export function getPublicServicePrice(
  serviceSlug: string
): ServicePriceRange | undefined {
  return servicePriceRanges.find(
    (price) => price.serviceSlug === serviceSlug && price.isPublic
  );
}
