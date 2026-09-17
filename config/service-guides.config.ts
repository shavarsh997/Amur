import type { Locale } from "@/types";

type Label = Record<Locale, string>;
type GuideLink = { path: string; label: Label };

export const serviceGuidesTitle: Label = {
  hy: "Ընտրեք աշխատանքները կամ հաշվարկեք արժեքը",
  ru: "Выберите задачу или рассчитайте стоимость",
  en: "Explore the work you need or plan your budget",
  de: "Passende Arbeiten finden oder das Budget planen",
  fr: "Découvrez les travaux adaptés ou préparez votre budget",
};

export const serviceGuideGroups: readonly {
  title: Label;
  links: readonly GuideLink[];
}[] = [
  {
    title: {
      hy: "Բնակարանի վերանորոգում",
      ru: "Ремонт квартиры",
      en: "Apartment renovation",
      de: "Wohnungsrenovierung",
      fr: "Rénovation d’appartement",
    },
    links: [
      {
        path: "services/apartment-renovation-yerevan",
        label: {
          hy: "Բնակարանների վերանորոգում Երևանում",
          ru: "Ремонт квартир в Ереване",
          en: "Apartment renovation in Yerevan",
          de: "Wohnungsrenovierung in Eriwan",
          fr: "Rénovation d’appartement à Erevan",
        },
      },
      {
        path: "services/new-build-renovation",
        label: {
          hy: "Նորակառույց բնակարան",
          ru: "Квартира в новостройке",
          en: "New-build apartments",
          de: "Neubauwohnungen",
          fr: "Appartements neufs",
        },
      },
      {
        path: "services/turnkey-renovation",
        label: {
          hy: "Ամբողջական վերանորոգում",
          ru: "Ремонт под ключ",
          en: "Complete renovation service",
          de: "Komplette Renovierungsleistung",
          fr: "Service de rénovation complète",
        },
      },
      {
        path: "services/capital-renovation-yerevan",
        label: {
          hy: "Կապիտալ վերանորոգում",
          ru: "Капитальный ремонт",
          en: "Major renovation",
          de: "Umfassende Sanierung",
          fr: "Rénovation lourde",
        },
      },
      {
        path: "services/cosmetic-renovation-yerevan",
        label: {
          hy: "Հարդարման թարմացում",
          ru: "Косметический ремонт",
          en: "Redecoration and interior refresh",
          de: "Renovierung und Auffrischung des Innenraums",
          fr: "Rafraîchissement et rénovation légère",
        },
      },
    ],
  },
  {
    title: {
      hy: "Առանձին աշխատանքներ",
      ru: "Отдельные задачи",
      en: "Specialist work",
      de: "Facharbeiten",
      fr: "Travaux spécialisés",
    },
    links: [
      {
        path: "services/office-renovation-yerevan",
        label: {
          hy: "Գրասենյակի վերանորոգում",
          ru: "Ремонт офиса",
          en: "Office renovation",
          de: "Bürorenovierung",
          fr: "Rénovation de bureaux",
        },
      },
      {
        path: "services/plumbing-work-yerevan",
        label: {
          hy: "Սանտեխնիկական աշխատանքներ",
          ru: "Сантехнические работы",
          en: "Plumbing installation",
          de: "Sanitärinstallation",
          fr: "Installation de plomberie",
        },
      },
      {
        path: "services/electrical-work-yerevan",
        label: {
          hy: "Էլեկտրական աշխատանքներ",
          ru: "Электромонтажные работы",
          en: "Electrical installation",
          de: "Elektroinstallation",
          fr: "Installation électrique",
        },
      },
      {
        path: "services/apartment-interior-design-yerevan",
        label: {
          hy: "Բնակարանի ինտերիերի դիզայն",
          ru: "Дизайн интерьера квартиры",
          en: "Apartment interior design",
          de: "Wohnungsinnenraumgestaltung",
          fr: "Aménagement intérieur d’appartement",
        },
      },
    ],
  },
  {
    title: {
      hy: "Բյուջե և նախահաշիվ",
      ru: "Бюджет и смета",
      en: "Budget and estimates",
      de: "Budget und Kostenschätzungen",
      fr: "Budget et devis",
    },
    links: [
      {
        path: "prices",
        label: {
          hy: "Բնակարանի վերանորոգման արժեքը",
          ru: "Стоимость ремонта квартиры",
          en: "Apartment renovation costs",
          de: "Kosten einer Wohnungsrenovierung",
          fr: "Coût de rénovation d’appartement",
        },
      },
      {
        path: "renovation-estimate-yerevan",
        label: {
          hy: "Վերանորոգման նախահաշիվ",
          ru: "Смета на ремонт",
          en: "Renovation estimate guide",
          de: "Ratgeber zur Renovierungskostenschätzung",
          fr: "Guide du devis de rénovation",
        },
      },
      {
        path: "calculator",
        label: {
          hy: "Շինարարության և դիզայնի հաշվիչ",
          ru: "Калькулятор строительства и дизайна",
          en: "Construction and design calculator",
          de: "Bau- und Planungsrechner",
          fr: "Calculateur de construction et de conception",
        },
      },
    ],
  },
];
