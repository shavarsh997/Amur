import type { Locale } from "@/types";

/** Describe illustrative photographs, without presenting them as completed SHINEX work. */
const imageDescriptions = [
  {
    photo: "photo-1600210492486",
    hy: "Բնակելի ինտերիերի ձևավորման օրինակ",
    ru: "Пример оформления жилого интерьера",
    en: "Residential interior used to illustrate renovation",
  },
  {
    photo: "photo-1600585154340",
    hy: "Առանձնատան արտաքին տեսքի օրինակ",
    ru: "Иллюстрация внешнего вида частного дома",
    en: "House exterior used to illustrate home construction",
  },
  {
    photo: "photo-1616486338812",
    hy: "Ինտերիերի դիզայնի պատկերավոր օրինակ",
    ru: "Иллюстрация интерьерного решения",
    en: "Interior design inspiration",
  },
  {
    photo: "photo-1556761175",
    hy: "Գրասենյակային տարածքի ձևավորման օրինակ",
    ru: "Пример организации офисного пространства",
    en: "Office space used to illustrate commercial renovation",
  },
  {
    photo: "photo-1503387762",
    hy: "Ճարտարապետական նախագծման պատկերավոր օրինակ",
    ru: "Иллюстрация архитектурного проектирования",
    en: "Architectural design illustration",
  },
  {
    photo: "photo-1504307651254",
    hy: "Շինարարական աշխատանքների պատկերավոր օրինակ",
    ru: "Иллюстрация строительных работ",
    en: "Construction work illustration",
  },
  {
    photo: "photo-1600607687920",
    hy: "Տան արտաքին հարդարման օրինակ",
    ru: "Иллюстрация наружной отделки дома",
    en: "Exterior finishing illustration",
  },
] as const;

export function getServiceImageAlt(image: string, locale: Locale): string {
  return (
    imageDescriptions.find(({ photo }) => image.includes(photo))?.[locale] ??
    {
      hy: "Ծառայությունը ներկայացնող պատկեր",
      ru: "Иллюстрация услуги",
      en: "Service illustration",
    }[locale]
  );
}
