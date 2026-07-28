import { serviceTranslations } from "@/messages/services";
import type { ServiceConfig } from "@/types/service";

/** Stable service data lives here; all visitor-facing copy is in messages/services.ts. */
export const servicesConfig = [
  { id: "renovation", slug: "renovation", order: 1, category: "primary", isActive: true, icon: "paint-roller", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85", calculatorCategory: "renovation", ctaKind: undefined, translations: serviceTranslations.renovation },
  { id: "house-construction", slug: "house-construction", order: 2, category: "primary", isActive: true, icon: "house", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85", calculatorCategory: "private-house", ctaKind: undefined, translations: serviceTranslations.houseConstruction },
  { id: "commercial-construction", slug: "commercial-construction", order: 3, category: "primary", isActive: true, icon: "building-2", image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=85", calculatorCategory: "commercial", ctaKind: "contact", translations: serviceTranslations.commercialConstruction },
  { id: "design", slug: "design", order: 4, category: "additional", isActive: true, icon: "ruler", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=85", calculatorCategory: "design", ctaKind: undefined, translations: serviceTranslations.design },
  { id: "monolithic-work", slug: "monolithic-work", order: 5, category: "additional", isActive: true, icon: "blocks", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=85", calculatorCategory: "separate-works", ctaKind: undefined, translations: serviceTranslations.monolithicWork },
  { id: "facade-and-roofing", slug: "facade-and-roofing", order: 6, category: "additional", isActive: true, icon: "panels-top-left", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85", calculatorCategory: "separate-works", ctaKind: undefined, translations: serviceTranslations.facadeAndRoofing },
] as const satisfies readonly ServiceConfig[];

export type ServiceSlug = (typeof servicesConfig)[number]["slug"];

export function getActiveServices(locale: keyof (typeof servicesConfig)[number]["translations"]) {
  return [...servicesConfig]
    .filter((service) => service.isActive)
    .sort((a, b) => a.order - b.order)
    .map((service) => ({ ...service, content: service.translations[locale] }));
}

export function getServiceBySlug(locale: keyof (typeof servicesConfig)[number]["translations"], slug: string) {
  const service = servicesConfig.find((item) => item.isActive && item.slug === slug);
  return service ? { ...service, content: service.translations[locale] } : undefined;
}
