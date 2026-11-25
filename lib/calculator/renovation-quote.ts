import {
  renovationPriceTiers,
  type RenovationPriceTier,
} from "@/config/pricing.config";
import type { Dictionary, Locale } from "@/types";

export type RenovationQuoteCondition = "newBuilding" | "secondary";
export const renovationQuoteConditions: readonly RenovationQuoteCondition[] = [
  "newBuilding",
  "secondary",
];

/** Same bounds as the renovation area validation of the calculator form. */
export const renovationQuoteAreaLimits = { min: 10, max: 2_000 } as const;

/** The only owner-confirmed timeline: a ~60 m² new-build apartment takes
 * 1.5–2 months. Every other case is clarified after the survey. */
const referenceTimeline = {
  condition: "newBuilding",
  minArea: 55,
  maxArea: 65,
} as const;

export type RenovationQuote = {
  area: number;
  condition: RenovationQuoteCondition;
  tier: RenovationPriceTier;
  pricePerSquareMeter: number;
  /** Labour only, materials are paid separately. */
  total: number;
  timeline: "reference" | "afterSurvey";
};

export function parseRenovationArea(value: string): number | null {
  const normalized = value.trim().replace(",", ".");
  if (!normalized) return null;
  const area = Number(normalized);
  return Number.isFinite(area) &&
    area >= renovationQuoteAreaLimits.min &&
    area <= renovationQuoteAreaLimits.max
    ? area
    : null;
}

/** Instant labour-only quote: area × owner-confirmed tier rate. */
export function calculateRenovationQuote(input: {
  area: string;
  condition: RenovationQuoteCondition;
  tier: RenovationPriceTier;
}): RenovationQuote | null {
  const area = parseRenovationArea(input.area);
  const tier = renovationPriceTiers.find(({ id }) => id === input.tier);
  if (area === null || !tier) return null;
  return {
    area,
    condition: input.condition,
    tier: tier.id,
    pricePerSquareMeter: tier.from,
    total: Math.round(area * tier.from),
    timeline:
      input.condition === referenceTimeline.condition &&
      area >= referenceTimeline.minArea &&
      area <= referenceTimeline.maxArea
        ? "reference"
        : "afterSurvey",
  };
}

const fill = (template: string, values: Record<string, string>) =>
  template.replace(/\{(\w+)\}/g, (match, key: string) =>
    Object.hasOwn(values, key) ? values[key] : match
  );

/** Visible result lines and the prefilled WhatsApp text, in the page language. */
export function renovationQuoteText(
  quote: RenovationQuote,
  copy: Dictionary["constructionCalculator"]["renovationQuote"],
  locale: Locale
) {
  const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 });
  const values = {
    area: number.format(quote.area),
    condition: copy.conditions[quote.condition],
    tier: copy.tiers[quote.tier],
    total: new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(
      quote.total
    ),
    rate: number.format(quote.pricePerSquareMeter),
    currency: copy.currency,
  };
  return {
    total: fill(copy.total, values),
    rate: fill(copy.rate, values),
    timeline:
      quote.timeline === "reference"
        ? copy.timelineReference
        : copy.timelineAfterSurvey,
    whatsappMessage: fill(copy.whatsappMessage, values),
  };
}
