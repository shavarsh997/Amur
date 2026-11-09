import type { Locale } from "@/types";

// One site-wide explanation keeps service illustrations distinct from a portfolio.
// Asset provenance remains in service-media.config and docs/ultra-redesign.
export const imageDisclosure: Record<Locale, string> = {
  hy: "Ճարտարապետական պատկերները ներկայացնում են ծառայությունները և SHINEX-ի իրականացրած նախագծերի պորտֆոլիո չեն։",
  ru: "Архитектурные изображения иллюстрируют услуги и не являются портфолио выполненных проектов SHINEX.",
  en: "Architectural images illustrate our services and are not a portfolio of completed SHINEX projects.",
  fr: "Les images architecturales illustrent les services et ne constituent pas un portfolio de projets réalisés par SHINEX.",
  de: "Die Architekturbilder veranschaulichen die Leistungen und sind kein Portfolio abgeschlossener SHINEX-Projekte.",
};
