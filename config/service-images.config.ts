import type { Locale } from "@/types";

/** Describe illustrative photographs, without presenting them as completed SHINEX work. */
const imageDescriptions = [
  {
    photo: "photo-1600210492486",
    hy: "Բնակելի ինտերիերի ձևավորման օրինակ",
    ru: "Пример оформления жилого интерьера",
    en: "Residential interior used to illustrate renovation",
    de: "Wohnraum zur Veranschaulichung einer Renovierung",
    fr: "Intérieur résidentiel illustrant la rénovation",
  },
  {
    photo: "photo-1600585154340",
    hy: "Առանձնատան արտաքին տեսքի օրինակ",
    ru: "Иллюстрация внешнего вида частного дома",
    en: "House exterior used to illustrate home construction",
    de: "Hausansicht zur Veranschaulichung des Hausbaus",
    fr: "Extérieur de maison illustrant la construction",
  },
  {
    photo: "photo-1616486338812",
    hy: "Ինտերիերի դիզայնի պատկերավոր օրինակ",
    ru: "Иллюстрация интерьерного решения",
    en: "Interior design inspiration",
    de: "Inspiration für Innenraumgestaltung",
    fr: "Inspiration pour l’aménagement intérieur",
  },
  {
    photo: "photo-1556761175",
    hy: "Գրասենյակային տարածքի ձևավորման օրինակ",
    ru: "Пример организации офисного пространства",
    en: "Office space used to illustrate commercial renovation",
    de: "Büroraum zur Veranschaulichung einer Gewerberenovierung",
    fr: "Bureau illustrant la rénovation de locaux professionnels",
  },
  {
    photo: "photo-1503387762",
    hy: "Ճարտարապետական նախագծման պատկերավոր օրինակ",
    ru: "Иллюстрация архитектурного проектирования",
    en: "Architectural design illustration",
    de: "Illustration zur Architekturplanung",
    fr: "Illustration de conception architecturale",
  },
  {
    photo: "photo-1504307651254",
    hy: "Շինարարական աշխատանքների պատկերավոր օրինակ",
    ru: "Иллюстрация строительных работ",
    en: "Construction work illustration",
    de: "Illustration von Bauarbeiten",
    fr: "Illustration de travaux de construction",
  },
  {
    photo: "photo-1600607687920",
    hy: "Տան արտաքին հարդարման օրինակ",
    ru: "Иллюстрация наружной отделки дома",
    en: "Exterior finishing illustration",
    de: "Illustration von Außenarbeiten",
    fr: "Illustration de finitions extérieures",
  },
] as const;

export function getServiceImageAlt(image: string, locale: Locale): string {
  return (
    imageDescriptions.find(({ photo }) => image.includes(photo))?.[locale] ??
    {
      hy: "Ծառայությունը ներկայացնող պատկեր",
      ru: "Иллюстрация услуги",
      en: "Service illustration",
      de: "Illustration der Leistung",
      fr: "Illustration du service",
    }[locale]
  );
}
