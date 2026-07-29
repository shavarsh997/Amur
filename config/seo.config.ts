import type { Locale } from "@/types";

/** Technical SEO settings; localized page titles and descriptions remain in messages/{locale}.ts. */
export const seoConfig = {
  category: "construction",
  titleSeparator: " — ",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraphLocale: {
    hy: "hy_AM",
    ru: "ru_RU",
    en: "en_US",
  },
} as const satisfies {
  category: string;
  titleSeparator: string;
  robots: {
    index: boolean;
    follow: boolean;
    googleBot: {
      index: boolean;
      follow: boolean;
      "max-image-preview": "large";
      "max-snippet": number;
      "max-video-preview": number;
    };
  };
  openGraphLocale: Record<Locale, "hy_AM" | "ru_RU" | "en_US">;
};
