import { getPublicServicePrice } from "@/config/pricing.config";
import type { Locale } from "@/types";

/** Share the confirmed rate between visible copy and search descriptions. */
export function getRenovationStartingPrice(locale: Locale): string | null {
  const price = getPublicServicePrice("renovation");
  if (
    price?.from === undefined ||
    price.unit !== "sqm" ||
    price.currency !== "AMD"
  ) {
    return null;
  }

  const amount = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
  }).format(price.from);

  const labels: Record<Locale, string> = {
    hy: `${amount} դրամ/մ²-ից`,
    ru: `от ${amount} драм/м²`,
    en: `from AMD ${amount}/m²`,
    de: `ab ${amount} AMD/m²`,
    fr: `à partir de ${amount} AMD/m²`,
  };
  return labels[locale];
}
