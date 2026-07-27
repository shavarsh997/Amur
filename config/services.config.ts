import { serviceTranslations } from "@/messages/services";
import type { ServiceConfig } from "@/types/service";

/** Stable service data lives here; all visitor-facing copy is in messages/services.ts. */
export const servicesConfig = [
  { id: "house-construction", slug: "house-construction", isActive: true, icon: "house", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85", calculatorCategory: "private-house", translations: serviceTranslations.houseConstruction },
  { id: "commercial-construction", slug: "commercial-construction", isActive: true, icon: "building-2", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85", calculatorCategory: "commercial", translations: serviceTranslations.commercialConstruction },
  { id: "design", slug: "design", isActive: true, icon: "ruler", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=85", calculatorCategory: "design", translations: serviceTranslations.design },
  { id: "renovation", slug: "renovation", isActive: true, icon: "paint-roller", image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85", calculatorCategory: "renovation", translations: serviceTranslations.renovation },
  { id: "monolithic-work", slug: "monolithic-work", isActive: true, icon: "blocks", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=85", calculatorCategory: "separate-works", translations: serviceTranslations.monolithicWork },
  { id: "facade-and-roofing", slug: "facade-and-roofing", isActive: true, icon: "panels-top-left", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85", calculatorCategory: "separate-works", translations: serviceTranslations.facadeAndRoofing },
] as const satisfies readonly ServiceConfig[];

export type ServiceSlug = (typeof servicesConfig)[number]["slug"];

export function getActiveServices(locale: keyof (typeof servicesConfig)[number]["translations"]) {
  return servicesConfig.filter((service) => service.isActive).map((service) => ({ ...service, content: service.translations[locale] }));
}

export function getServiceBySlug(locale: keyof (typeof servicesConfig)[number]["translations"], slug: string) {
  const service = servicesConfig.find((item) => item.isActive && item.slug === slug);
  return service ? { ...service, content: service.translations[locale] } : undefined;
}
