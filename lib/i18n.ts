import type { Dictionary, Locale } from "@/types";

export const locales = ["hy", "ru", "en"] as const satisfies readonly Locale[];
export const defaultLocale: Locale = "hy";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  hy: async () => (await import("@/messages/hy")).default,
  ru: async () => (await import("@/messages/ru")).default,
  en: async () => (await import("@/messages/en")).default,
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

export function assertLocale(value: unknown): asserts value is Locale {
  if (!isLocale(value)) {
    throw new RangeError(`Unsupported locale: ${String(value)}`);
  }
}

export function resolveLocale(value: unknown): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export async function getDictionary(locale: unknown): Promise<Dictionary> {
  assertLocale(locale);

  const dictionary = await dictionaries[locale]();
  if (
    typeof dictionary !== "object" ||
    dictionary === null ||
    typeof dictionary.localeName !== "string" ||
    !Array.isArray(dictionary.services.items) ||
    !Array.isArray(dictionary.projects.items)
  ) {
    throw new TypeError(`Invalid dictionary for locale: ${locale}`);
  }

  return dictionary;
}
