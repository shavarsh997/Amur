export type ServicePriceRange = {
  serviceSlug: string;
  unit: "sqm" | "project" | "hour" | "custom";
  from?: number;
  to?: number;
  currency: "AMD";
  note?: string;
  isPublic: boolean;
};

/** Public prices stay hidden until Shinex approves real ranges. */
export const servicePriceRanges = [
  { serviceSlug: "renovation", unit: "sqm", currency: "AMD", isPublic: false },
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
