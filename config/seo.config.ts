import type { Locale } from "@/types";

/** Technical SEO settings; localized page titles and descriptions remain in messages/{locale}.ts. */
export const seoConfig = {
  category: "construction",
  robots: {
    index: true,
    follow: true,
  },
  openGraphLocale: {
    hy: "hy_AM",
    ru: "ru_RU",
    en: "en_US",
  },
} as const satisfies {
  category: string;
  robots: { index: boolean; follow: boolean };
  openGraphLocale: Record<Locale, "hy_AM" | "ru_RU" | "en_US">;
};
