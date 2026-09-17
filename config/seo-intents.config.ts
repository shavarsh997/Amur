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
      de: "services/apartment-renovation-yerevan",
      fr: "services/apartment-renovation-yerevan",
    },
    primary: {
      hy: "բնակարանների վերանորոգում Երևանում",
      ru: "ремонт квартир в Ереване",
      en: "apartment renovation in Yerevan",
      de: "Wohnungsrenovierung in Eriwan",
      fr: "rénovation d’appartement à Erevan",
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
        "major apartment renovation",
        "cosmetic renovation",
      ],
      de: [
        "Wohnung renovieren",
        "umfassende Wohnungssanierung",
        "optische Renovierung",
      ],
      fr: [
        "rénovation d’appartement",
        "rénovation lourde d’appartement",
        "rénovation légère",
      ],
    },
  },
  "turnkey-renovation": {
    paths: {
      hy: "services/turnkey-renovation",
      ru: "services/turnkey-renovation",
      en: "services/turnkey-renovation",
      de: "services/turnkey-renovation",
      fr: "services/turnkey-renovation",
    },
    primary: {
      hy: "բնակարանի ամբողջական վերանորոգում Երևանում",
      ru: "полный ремонт квартиры в Ереване",
      en: "complete apartment renovation in Yerevan",
      de: "komplette Wohnungsrenovierung in Eriwan",
      fr: "rénovation complète d’appartement à Erevan",
    },
    secondary: {
      hy: [
        "բնակարանի ամբողջական վերանորոգում",
        "վերանորոգման աշխատանքներ Երևանում",
      ],
      ru: ["ремонт квартиры под ключ Ереван", "ремонт под ключ Армения"],
      en: ["complete renovation", "turnkey apartment renovation"],
      de: ["Komplettrenovierung", "schlüsselfertige Wohnungsrenovierung"],
      fr: ["rénovation complète", "rénovation d’appartement clé en main"],
    },
  },
  "new-build-renovation": {
    paths: {
      hy: "services/new-build-renovation",
      ru: "services/new-build-renovation",
      en: "services/new-build-renovation",
      de: "services/new-build-renovation",
      fr: "services/new-build-renovation",
    },
    primary: {
      hy: "նորակառույց բնակարանի վերանորոգում Երևանում",
      ru: "ремонт квартиры в новостройке в Ереване",
      en: "new-build apartment renovation in Yerevan",
      de: "Neubauwohnungsrenovierung in Eriwan",
      fr: "rénovation d’appartement neuf à Erevan",
    },
    secondary: {
      hy: ["նորակառույցի վերանորոգում"],
      ru: ["ремонт новостройки Ереван"],
      en: ["new apartment renovation"],
      de: ["Renovierung einer Neubauwohnung"],
      fr: ["rénovation d’appartement neuf"],
    },
  },
  prices: {
    paths: {
      hy: "prices",
      ru: "prices",
      en: "prices",
      de: "prices",
      fr: "prices",
    },
    primary: {
      hy: "բնակարանի վերանորոգման գներ Երևանում",
      ru: "цены на ремонт квартир в Ереване",
      en: "apartment renovation prices in Yerevan",
      de: "Preise für Wohnungsrenovierung in Eriwan",
      fr: "prix de rénovation d’appartement à Erevan",
    },
    secondary: {
      hy: ["բնակարանի վերանորոգման արժեք"],
      ru: [
        "стоимость ремонта квартиры Ереван",
        "сколько стоит ремонт квартиры Ереван",
      ],
      en: ["apartment renovation cost in Yerevan"],
      de: ["Kosten der Wohnungsrenovierung in Eriwan"],
      fr: ["coût de rénovation d’appartement à Erevan"],
    },
  },
  "house-construction": {
    paths: {
      hy: "services/house-construction",
      ru: "services/house-construction",
      en: "services/house-construction",
      de: "services/house-construction",
      fr: "services/house-construction",
    },
    primary: {
      hy: "առանձնատան կառուցում Երևան",
      ru: "строительство домов Ереван",
      en: "house construction in Yerevan",
      de: "Hausbau in Eriwan",
      fr: "construction de maison à Erevan",
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
      de: ["Bau von Privathäusern in Armenien", "Bauunternehmen Eriwan"],
      fr: [
        "construction de maison individuelle en Arménie",
        "entreprise de construction Erevan",
      ],
    },
  },
  "house-renovation": {
    paths: {
      hy: "services/renovation",
      ru: "services/renovation",
      en: "services/renovation",
      de: "services/renovation",
      fr: "services/renovation",
    },
    primary: {
      hy: "առանձնատան վերանորոգում",
      ru: "ремонт частного дома в Армении",
      en: "private house renovation in Armenia",
      de: "Renovierung von Privathäusern in Armenien",
      fr: "rénovation de maison individuelle en Arménie",
    },
    secondary: {
      hy: ["տան վերանորոգում Հայաստանում"],
      ru: ["ремонт дома Ереван"],
      en: ["house renovation Yerevan"],
      de: ["Hausrenovierung Eriwan"],
      fr: ["rénovation de maison Erevan"],
    },
  },
  "house-construction-cost": {
    paths: {
      hy: "calculator",
      ru: "calculator",
      en: "calculator",
      de: "calculator",
      fr: "calculator",
    },
    primary: {
      hy: "տան կառուցման արժեքը",
      ru: "стоимость строительства дома в Армении",
      en: "house construction cost in Armenia",
      de: "Hausbaukosten in Armenien",
      fr: "coût de construction de maison en Arménie",
    },
    secondary: {
      hy: ["առանձնատան կառուցման հաշվիչ"],
      ru: ["калькулятор строительства дома Ереван"],
      en: ["house construction cost calculator Yerevan"],
      de: ["Hausbaukostenrechner Eriwan"],
      fr: ["calculateur de construction de maison Erevan"],
    },
  },
  "interior-design": {
    paths: {
      hy: "services/interior-design",
      ru: "services/interior-design",
      en: "services/interior-design",
      de: "services/interior-design",
      fr: "services/interior-design",
    },
    primary: {
      hy: "ինտերիերի դիզայն Երևան",
      ru: "дизайн интерьера Ереван",
      en: "interior design in Yerevan",
      de: "Innenraumgestaltung in Eriwan",
      fr: "aménagement intérieur à Erevan",
    },
    secondary: {
      hy: ["բնակարանի դիզայն", "բնակարանի ինտերիերի դիզայն"],
      ru: ["дизайнер интерьера Ереван", "дизайн проект квартиры Ереван"],
      en: ["apartment interior design Yerevan"],
      de: ["Wohnungsinnenraumgestaltung Eriwan"],
      fr: ["aménagement intérieur d’appartement Erevan"],
    },
  },
  "complete-house-construction": {
    paths: {
      hy: "services/house-construction",
      ru: "services/house-construction",
      en: "services/house-construction",
      de: "services/house-construction",
      fr: "services/house-construction",
    },
    primary: {
      hy: "առանձնատան ամբողջական կառուցում Երևանում",
      ru: "комплексное строительство частного дома в Ереване",
      en: "complete private house construction in Yerevan",
      de: "kompletter Privathausbau in Eriwan",
      fr: "construction complète de maison individuelle à Erevan",
    },
    secondary: {
      hy: ["ամբողջական տունաշինություն Երևանում"],
      ru: ["строительство дома одной компанией Ереван"],
      en: ["complete house build Yerevan"],
      de: ["kompletter Hausbau Eriwan"],
      fr: ["construction complète de maison Erevan"],
    },
  },
  "apartment-interior-design": {
    paths: {
      hy: "services/apartment-interior-design-yerevan",
      ru: "services/apartment-interior-design-yerevan",
      en: "services/apartment-interior-design-yerevan",
      de: "services/apartment-interior-design-yerevan",
      fr: "services/apartment-interior-design-yerevan",
    },
    primary: {
      hy: "բնակարանի ինտերիերի դիզայն Երևանում",
      ru: "дизайн интерьера квартиры в Ереване",
      en: "apartment interior design in Yerevan",
      de: "Innenraumgestaltung für Wohnungen in Eriwan",
      fr: "aménagement intérieur d’appartement à Erevan",
    },
    secondary: {
      hy: ["բնակարանի դիզայն Երևան"],
      ru: ["дизайн квартиры Ереван"],
      en: ["apartment design Yerevan"],
      de: ["Wohnungsgestaltung Eriwan"],
      fr: ["conception d’appartement Erevan"],
    },
  },
  "commercial-renovation": {
    paths: {
      hy: "services/commercial-construction",
      ru: "services/commercial-construction",
      en: "services/commercial-construction",
      de: "services/commercial-construction",
      fr: "services/commercial-construction",
    },
    primary: {
      hy: "առևտրային տարածքների վերանորոգում Երևանում",
      ru: "ремонт коммерческих помещений в Ереване",
      en: "commercial space renovation in Yerevan",
      de: "Gewerberenovierung in Eriwan",
      fr: "rénovation de locaux professionnels à Erevan",
    },
    secondary: {
      hy: ["խանութի վերանորոգում Երևանում", "սրահի վերանորոգում Երևանում"],
      ru: ["ремонт магазина Ереван", "ремонт салона Ереван"],
      en: ["shop renovation Yerevan", "salon renovation Yerevan"],
      de: ["Ladenrenovierung Eriwan", "Salonrenovierung Eriwan"],
      fr: ["rénovation de commerce Erevan", "rénovation de salon Erevan"],
    },
  },
  "office-renovation": {
    paths: {
      hy: "services/office-renovation-yerevan",
      ru: "services/office-renovation-yerevan",
      en: "services/office-renovation-yerevan",
      de: "services/office-renovation-yerevan",
      fr: "services/office-renovation-yerevan",
    },
    primary: {
      hy: "գրասենյակի վերանորոգում Երևանում",
      ru: "ремонт офиса в Ереване",
      en: "office renovation in Yerevan",
      de: "Bürorenovierung in Eriwan",
      fr: "rénovation de bureaux à Erevan",
    },
    secondary: {
      hy: ["գրասենյակի հարդարում Երևանում"],
      ru: ["отделка офиса Ереван"],
      en: ["office fit-out Yerevan"],
      de: ["Büroausbau Eriwan"],
      fr: ["aménagement de bureaux Erevan"],
    },
  },
  "capital-renovation": {
    paths: {
      hy: "services/capital-renovation-yerevan",
      ru: "services/capital-renovation-yerevan",
      en: "services/capital-renovation-yerevan",
      de: "services/capital-renovation-yerevan",
      fr: "services/capital-renovation-yerevan",
    },
    primary: {
      hy: "կապիտալ վերանորոգում Երևանում",
      ru: "капитальный ремонт в Ереване",
      en: "major renovation in Yerevan",
      de: "umfassende Sanierung in Eriwan",
      fr: "rénovation lourde à Erevan",
    },
    secondary: {
      hy: ["բնակարանի կապիտալ վերանորոգում"],
      ru: ["капитальный ремонт квартиры Ереван"],
      en: ["major apartment renovation Yerevan"],
      de: ["umfassende Wohnungssanierung Eriwan"],
      fr: ["rénovation lourde d’appartement Erevan"],
    },
  },
  "cosmetic-renovation": {
    paths: {
      hy: "services/cosmetic-renovation-yerevan",
      ru: "services/cosmetic-renovation-yerevan",
      en: "services/cosmetic-renovation-yerevan",
      de: "services/cosmetic-renovation-yerevan",
      fr: "services/cosmetic-renovation-yerevan",
    },
    primary: {
      hy: "կոսմետիկ վերանորոգում Երևանում",
      ru: "косметический ремонт в Ереване",
      en: "cosmetic renovation in Yerevan",
      de: "optische Renovierung in Eriwan",
      fr: "rénovation légère à Erevan",
    },
    secondary: {
      hy: ["բնակարանի կոսմետիկ վերանորոգում"],
      ru: ["косметический ремонт квартиры Ереван"],
      en: ["cosmetic apartment renovation Yerevan"],
      de: ["optische Wohnungsrenovierung Eriwan"],
      fr: ["rafraîchissement d’appartement Erevan"],
    },
  },
  "renovation-estimate": {
    paths: {
      hy: "renovation-estimate-yerevan",
      ru: "renovation-estimate-yerevan",
      en: "renovation-estimate-yerevan",
      de: "renovation-estimate-yerevan",
      fr: "renovation-estimate-yerevan",
    },
    primary: {
      hy: "վերանորոգման նախահաշիվ Երևանում",
      ru: "смета на ремонт в Ереване",
      en: "renovation estimate in Yerevan",
      de: "Renovierungskostenschätzung in Eriwan",
      fr: "devis de rénovation à Erevan",
    },
    secondary: {
      hy: ["վերանորոգման նախահաշվի կազմում"],
      ru: ["расчёт сметы на ремонт Ереван"],
      en: ["renovation cost estimate Yerevan"],
      de: ["Renovierungskostenvoranschlag Eriwan"],
      fr: ["estimation de rénovation Erevan"],
    },
  },
  "renovation-price-per-square-meter": {
    paths: {
      hy: "prices",
      ru: "prices",
      en: "prices",
      de: "prices",
      fr: "prices",
    },
    primary: {
      hy: "վերանորոգման արժեքը մեկ քմ-ի համար Երևանում",
      ru: "стоимость ремонта за м² в Ереване",
      en: "renovation cost per m² in Yerevan",
      de: "Renovierungskosten je m² in Eriwan",
      fr: "coût de rénovation au m² à Erevan",
    },
    secondary: {
      hy: ["վերանորոգման գին քմ Երևան"],
      ru: ["цена ремонта за квадратный метр Ереван"],
      en: ["renovation price per square metre Yerevan"],
      de: ["Renovierungspreis pro Quadratmeter Eriwan"],
      fr: ["prix de rénovation au mètre carré Erevan"],
    },
  },
  "plumbing-work": {
    paths: {
      hy: "services/plumbing-work-yerevan",
      ru: "services/plumbing-work-yerevan",
      en: "services/plumbing-work-yerevan",
      de: "services/plumbing-work-yerevan",
      fr: "services/plumbing-work-yerevan",
    },
    primary: {
      hy: "սանտեխնիկական աշխատանքներ Երևանում",
      ru: "сантехнические работы в Ереване",
      en: "plumbing work in Yerevan",
      de: "Sanitärarbeiten in Eriwan",
      fr: "travaux de plomberie à Erevan",
    },
    secondary: {
      hy: ["սանտեխնիկ Երևան", "սանհանգույցի սանտեխնիկա"],
      ru: ["сантехник Ереван", "сантехника для ремонта"],
      en: ["plumber Yerevan", "renovation plumbing Yerevan"],
      de: ["Installateur Eriwan", "Sanitärarbeiten bei Renovierung Eriwan"],
      fr: ["plombier Erevan", "plomberie de rénovation Erevan"],
    },
  },
  "electrical-work": {
    paths: {
      hy: "services/electrical-work-yerevan",
      ru: "services/electrical-work-yerevan",
      en: "services/electrical-work-yerevan",
      de: "services/electrical-work-yerevan",
      fr: "services/electrical-work-yerevan",
    },
    primary: {
      hy: "էլեկտրական աշխատանքներ Երևանում",
      ru: "электрические работы в Ереване",
      en: "electrical work in Yerevan",
      de: "Elektroarbeiten in Eriwan",
      fr: "travaux électriques à Erevan",
    },
    secondary: {
      hy: ["էլեկտրիկ Երևան", "բնակարանի էլեկտրական աշխատանքներ"],
      ru: ["электрик Ереван", "электрика в квартире Ереван"],
      en: ["electrician Yerevan", "apartment electrical work Yerevan"],
      de: ["Elektriker Eriwan", "Elektroarbeiten in Wohnungen Eriwan"],
      fr: ["électricien Erevan", "électricité d’appartement Erevan"],
    },
  },
  company: {
    paths: { hy: "", ru: "", en: "", de: "", fr: "" },
    primary: {
      hy: "շինարարական ընկերություն Երևանում",
      ru: "строительная компания Ереван",
      en: "construction company Yerevan",
      de: "Bauunternehmen Eriwan",
      fr: "entreprise de construction Erevan",
    },
    secondary: {
      hy: ["շինարարական աշխատանքներ Երևանում"],
      ru: ["строительная компания Армения"],
      en: ["construction company Yerevan"],
      de: ["Bauunternehmen Eriwan"],
      fr: ["entreprise de construction Erevan"],
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
