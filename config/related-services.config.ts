import type { ServiceSlug } from "@/config/services.config";

/** Adjacent project stages, not an all-to-all list of search terms. */
export const relatedBaseServices: Record<ServiceSlug, readonly ServiceSlug[]> =
  {
    renovation: ["interior-design", "facade-and-roofing"],
    "house-construction": ["design", "monolithic-work", "facade-and-roofing"],
    "interior-design": ["renovation", "commercial-construction"],
    "commercial-construction": ["design", "interior-design", "monolithic-work"],
    design: ["house-construction", "monolithic-work", "interior-design"],
    "monolithic-work": ["design", "house-construction", "facade-and-roofing"],
    "facade-and-roofing": ["renovation", "house-construction"],
  };
