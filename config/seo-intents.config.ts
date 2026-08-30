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
      hy: "services/house-construction-yerevan",
      ru: "services/house-construction-yerevan",
      en: "services/house-construction-yerevan",
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
      hy: "services/interior-design-yerevan",
      ru: "services/interior-design-yerevan",
      en: "services/interior-design-yerevan",
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
  "complete-house-construction": {
    paths: {
      hy: "services/complete-house-construction-yerevan",
      ru: "services/complete-house-construction-yerevan",
      en: "services/complete-house-construction-yerevan",
    },
    primary: {
      hy: "առանձնատան ամբողջական կառուցում Երևանում",
      ru: "комплексное строительство частного дома в Ереване",
      en: "complete private house construction in Yerevan",
    },
    secondary: {
      hy: ["ամբողջական տունաշինություն Երևանում"],
      ru: ["строительство дома одной компанией Ереван"],
      en: ["complete house build Yerevan"],
    },
  },
  "apartment-interior-design": {
    paths: {
      hy: "services/apartment-interior-design-yerevan",
      ru: "services/apartment-interior-design-yerevan",
      en: "services/apartment-interior-design-yerevan",
    },
    primary: {
      hy: "բնակարանի ինտերիերի դիզայն Երևանում",
      ru: "дизайн интерьера квартиры в Ереване",
      en: "apartment interior design in Yerevan",
    },
    secondary: {
      hy: ["բնակարանի դիզայն Երևան"],
      ru: ["дизайн квартиры Ереван"],
      en: ["apartment design Yerevan"],
    },
  },
  "commercial-renovation": {
    paths: {
      hy: "services/commercial-renovation-yerevan",
      ru: "services/commercial-renovation-yerevan",
      en: "services/commercial-renovation-yerevan",
    },
    primary: {
      hy: "առևտրային տարածքների վերանորոգում Երևանում",
      ru: "ремонт коммерческих помещений в Ереване",
      en: "commercial space renovation in Yerevan",
    },
    secondary: {
      hy: ["խանութի վերանորոգում Երևանում", "սրահի վերանորոգում Երևանում"],
      ru: ["ремонт магазина Ереван", "ремонт салона Ереван"],
      en: ["shop renovation Yerevan", "salon renovation Yerevan"],
    },
  },
  "office-renovation": {
    paths: {
      hy: "services/office-renovation-yerevan",
      ru: "services/office-renovation-yerevan",
      en: "services/office-renovation-yerevan",
    },
    primary: {
      hy: "գրասենյակի վերանորոգում Երևանում",
      ru: "ремонт офиса в Ереване",
      en: "office renovation in Yerevan",
    },
    secondary: {
      hy: ["գրասենյակի հարդարում Երևանում"],
      ru: ["отделка офиса Ереван"],
      en: ["office fit-out Yerevan"],
    },
  },
  "capital-renovation": {
    paths: {
      hy: "services/capital-renovation-yerevan",
      ru: "services/capital-renovation-yerevan",
      en: "services/capital-renovation-yerevan",
    },
    primary: {
      hy: "կապիտալ վերանորոգում Երևանում",
      ru: "капитальный ремонт в Ереване",
      en: "capital renovation in Yerevan",
    },
    secondary: {
      hy: ["բնակարանի կապիտալ վերանորոգում"],
      ru: ["капитальный ремонт квартиры Ереван"],
      en: ["capital apartment renovation Yerevan"],
    },
  },
  "cosmetic-renovation": {
    paths: {
      hy: "services/cosmetic-renovation-yerevan",
      ru: "services/cosmetic-renovation-yerevan",
      en: "services/cosmetic-renovation-yerevan",
    },
    primary: {
      hy: "կոսմետիկ վերանորոգում Երևանում",
      ru: "косметический ремонт в Ереване",
      en: "cosmetic renovation in Yerevan",
    },
    secondary: {
      hy: ["բնակարանի կոսմետիկ վերանորոգում"],
      ru: ["косметический ремонт квартиры Ереван"],
      en: ["cosmetic apartment renovation Yerevan"],
    },
  },
  "renovation-estimate": {
    paths: {
      hy: "renovation-estimate-yerevan",
      ru: "renovation-estimate-yerevan",
      en: "renovation-estimate-yerevan",
    },
    primary: {
      hy: "վերանորոգման նախահաշիվ Երևանում",
      ru: "смета на ремонт в Ереване",
      en: "renovation estimate in Yerevan",
    },
    secondary: {
      hy: ["վերանորոգման նախահաշվի կազմում"],
      ru: ["расчёт сметы на ремонт Ереван"],
      en: ["renovation cost estimate Yerevan"],
    },
  },
  "renovation-price-per-square-meter": {
    paths: {
      hy: "renovation-price-per-square-meter-yerevan",
      ru: "renovation-price-per-square-meter-yerevan",
      en: "renovation-price-per-square-meter-yerevan",
    },
    primary: {
      hy: "վերանորոգման արժեքը մեկ քմ-ի համար Երևանում",
      ru: "стоимость ремонта за м² в Ереване",
      en: "renovation cost per m² in Yerevan",
    },
    secondary: {
      hy: ["վերանորոգման գին քմ Երևան"],
      ru: ["цена ремонта за квадратный метр Ереван"],
      en: ["renovation price per square metre Yerevan"],
    },
  },
  "plumbing-work": {
    paths: {
      hy: "services/plumbing-work-yerevan",
      ru: "services/plumbing-work-yerevan",
      en: "services/plumbing-work-yerevan",
    },
    primary: {
      hy: "սանտեխնիկական աշխատանքներ Երևանում",
      ru: "сантехнические работы в Ереване",
      en: "plumbing work in Yerevan",
    },
    secondary: {
      hy: ["սանտեխնիկ Երևան", "սանհանգույցի սանտեխնիկա"],
      ru: ["сантехник Ереван", "сантехника для ремонта"],
      en: ["plumber Yerevan", "renovation plumbing Yerevan"],
    },
  },
  "electrical-work": {
    paths: {
      hy: "services/electrical-work-yerevan",
      ru: "services/electrical-work-yerevan",
      en: "services/electrical-work-yerevan",
    },
    primary: {
      hy: "էլեկտրական աշխատանքներ Երևանում",
      ru: "электрические работы в Ереване",
      en: "electrical work in Yerevan",
    },
    secondary: {
      hy: ["էլեկտրիկ Երևան", "բնակարանի էլեկտրական աշխատանքներ"],
      ru: ["электрик Ереван", "электрика в квартире Ереван"],
      en: ["electrician Yerevan", "apartment electrical work Yerevan"],
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
