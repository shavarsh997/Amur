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

/** Owner-confirmed starting rates per m², excluding materials (2026-11-17).
 * Mid-range includes standard interior design; premium includes more elaborate bespoke design. */
export const renovationPriceTiers = [
  { id: "standard", from: 55_000 },
  { id: "middle", from: 70_000 },
  { id: "premium", from: 85_000 },
] as const;

export type RenovationPriceTier = (typeof renovationPriceTiers)[number]["id"];

/** Only owner-confirmed rates are public. Other services remain quote-based. */
export const servicePriceRanges = [
  {
    serviceSlug: "renovation",
    unit: "sqm",
    from: renovationPriceTiers[0].from,
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
