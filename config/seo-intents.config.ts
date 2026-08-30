import type { Locale } from "@/types";

/**
 * Editorial map for commercial search intent. Keep one URL per intent so
 * spelling and grammatical variants strengthen the same canonical page.
 */
export const seoIntentMap = {
  "apartment-renovation": {
    paths: {
      hy: "services/apartment-renovation-yerevan",
      ru: "services/apartment-renovation-yerevan",
      en: "services/apartment-renovation-yerevan",
    },
    primary: {
      hy: "բնակարանների վերանորոգում Երևանում",
      ru: "ремонт квартир в Ереване",
      en: "apartment renovation in Yerevan",
    },
    secondary: {
      hy: [
        "բնակարանի վերանորոգում",
        "կապիտալ վերանորոգում",
        "կոսմետիկ վերանորոգում",
      ],
      ru: [
        "ремонт квартиры",
        "капитальный ремонт квартиры",
        "косметический ремонт",
      ],
      en: [
        "apartment repair",
        "capital apartment renovation",
        "cosmetic renovation",
      ],
    },
  },
  "turnkey-renovation": {
    paths: {
      hy: "services/turnkey-renovation",
      ru: "services/turnkey-renovation",
      en: "services/turnkey-renovation",
    },
    primary: {
      hy: "բնակարանի ամբողջական վերանորոգում Երևանում",
      ru: "полный ремонт квартиры в Ереване",
      en: "complete apartment renovation in Yerevan",
    },
    secondary: {
      hy: [
        "բնակարանի ամբողջական վերանորոգում",
        "վերանորոգման աշխատանքներ Երևանում",
      ],
      ru: ["ремонт квартиры под ключ Ереван", "ремонт под ключ Армения"],
      en: ["complete renovation", "turnkey apartment renovation"],
    },
  },
  "new-build-renovation": {
    paths: {
      hy: "services/new-build-renovation",
      ru: "services/new-build-renovation",
      en: "services/new-build-renovation",
    },
    primary: {
      hy: "նորակառույց բնակարանի վերանորոգում Երևանում",
      ru: "ремонт квартиры в новостройке в Ереване",
      en: "new-build apartment renovation in Yerevan",
    },
    secondary: {
      hy: ["նորակառույցի վերանորոգում"],
      ru: ["ремонт новостройки Ереван"],
      en: ["new apartment renovation"],
    },
  },
  prices: {
    paths: { hy: "prices", ru: "prices", en: "prices" },
    primary: {
      hy: "բնակարանի վերանորոգման գներ Երևանում",
      ru: "цены на ремонт квартир в Ереване",
      en: "apartment renovation prices in Yerevan",
    },
    secondary: {
      hy: ["բնակարանի վերանորոգման արժեք"],
      ru: [
        "стоимость ремонта квартиры Ереван",
        "сколько стоит ремонт квартиры Ереван",
      ],
      en: ["apartment renovation cost in Yerevan"],
    },
  },
  "house-construction": {
    paths: {
      hy: "services/house-construction",
      ru: "services/house-construction",
      en: "services/house-construction",
    },
    primary: {
      hy: "առանձնատան կառուցում Երևան",
      ru: "строительство домов Ереван",
      en: "house construction in Yerevan",
    },
    secondary: {
      hy: ["տան կառուցում", "շինարարական ընկերություն Երևանում"],
      ru: [
        "построить дом в Армении",
        "дом под ключ Ереван",
        "строительная компания Ереван",
      ],
      en: [
        "private house construction Armenia",
        "construction company Yerevan",
      ],
    },
  },
  "interior-design": {
    paths: {
      hy: "services/interior-design",
      ru: "services/interior-design",
      en: "services/interior-design",
    },
    primary: {
      hy: "ինտերիերի դիզայն Երևան",
      ru: "дизайн интерьера Ереван",
      en: "interior design in Yerevan",
    },
    secondary: {
      hy: ["բնակարանի դիզայն", "բնակարանի ինտերիերի դիզայն"],
      ru: ["дизайнер интерьера Ереван", "дизайн проект квартиры Ереван"],
      en: ["apartment interior design Yerevan"],
    },
  },
  company: {
    paths: { hy: "", ru: "", en: "" },
    primary: {
      hy: "շինարարական ընկերություն Երևանում",
      ru: "строительная компания Ереван",
      en: "renovation company Yerevan",
    },
    secondary: {
      hy: ["շինարարական աշխատանքներ Երևանում"],
      ru: ["строительная компания Армения"],
      en: ["construction company Yerevan"],
    },
  },
} as const satisfies Record<
  string,
  {
    paths: Record<Locale, string>;
    primary: Record<Locale, string>;
    secondary: Record<Locale, readonly string[]>;
  }
>;
