import type { Locale } from "@/types";

const localeMap: Record<Locale, string> = {
  hy: "hy-AM",
  ru: "ru-RU",
  en: "en-US",
};

export function formatPrice(
  value: number,
  locale: Locale,
  currency: string
): string {
  return new Intl.NumberFormat(localeMap[locale], {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}
