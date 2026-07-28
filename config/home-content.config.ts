import type { Locale } from "@/types";

export type HomeContent = {
  heroVisual: { image: string; alt: string };
  heroDirections: readonly string[];
  renovationIncluded: {
    eyebrow: string;
    title: string;
    notice: string;
    items: readonly string[];
  };
  serviceArea: {
    title: string;
    description: string;
    details: readonly string[];
  };
};

export const homeContent: Record<Locale, HomeContent> = {
  ru: {
    heroVisual: {
      image:
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=90",
      alt: "Светлый современный интерьер как иллюстрация услуги ремонта",
    },
    heroDirections: [
      "Ремонт квартир",
      "Ремонт домов",
      "Строительство домов",
      "Коммерческие помещения",
    ],
    renovationIncluded: {
      eyebrow: "Ремонт под ключ",
      title: "Что может входить в ремонт под ключ",
      notice:
        "Конкретный состав работ определяется после осмотра объекта и согласования задачи.",
      items: [
        "Осмотр и замеры",
        "Планирование и предварительная смета",
        "Демонтаж и подготовка",
        "Электрика и сантехника",
        "Выравнивание и черновая отделка",
        "Отделка стен, пола и потолка",
        "Установка дверей, оборудования и освещения",
        "Финальная проверка и передача",
      ],
    },
    serviceArea: {
      title: "Работаем в Ереване и регионах Армении",
      description:
        "Обсуждаем ремонт и строительство с учётом расположения объекта, объёма задачи и логистики.",
      details: [
        "Квартиры и частные дома",
        "Коммерческие помещения",
        "Выезд на объект по согласованию",
      ],
    },
  },
  en: {
    heroVisual: {
      image:
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=90",
      alt: "Bright modern interior illustrating a renovation service",
    },
    heroDirections: [
      "Apartment renovation",
      "House renovation",
      "House construction",
      "Commercial spaces",
    ],
    renovationIncluded: {
      eyebrow: "Turnkey renovation",
      title: "What a turnkey renovation may include",
      notice:
        "The exact scope is confirmed after a site visit and discussion of the project.",
      items: [
        "Survey and measurements",
        "Planning and an initial estimate",
        "Demolition and preparation",
        "Electrical and plumbing work",
        "Levelling and preparatory finishes",
        "Wall, floor, and ceiling finishes",
        "Installation of doors, fixtures, and lighting",
        "Final inspection and handover",
      ],
    },
    serviceArea: {
      title: "Working in Yerevan and across Armenia",
      description:
        "We discuss renovation and construction in view of the property location, project scope, and logistics.",
      details: [
        "Apartments and private homes",
        "Commercial spaces",
        "Site visit by arrangement",
      ],
    },
  },
  hy: {
    heroVisual: {
      image:
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=90",
      alt: "Լուսավոր ժամանակակից ինտերիեր՝ որպես վերանորոգման ծառայության պատկերացում",
    },
    heroDirections: [
      "Բնակարանների վերանորոգում",
      "Տների վերանորոգում",
      "Տների կառուցում",
      "Առևտրային տարածքներ",
    ],
    renovationIncluded: {
      eyebrow: "Բանալիով վերանորոգում",
      title: "Ինչ կարող է ներառվել բանալիով վերանորոգման մեջ",
      notice:
        "Աշխատանքների կոնկրետ կազմը որոշվում է օբյեկտի զննումից և խնդրի համաձայնեցումից հետո։",
      items: [
        "Զննում և չափագրում",
        "Պլանավորում և նախնական նախահաշիվ",
        "Ապամոնտաժում և նախապատրաստում",
        "Էլեկտրական և սանտեխնիկական աշխատանքներ",
        "Հարթեցում և սևագործ հարդարում",
        "Պատերի, հատակի և առաստաղի հարդարում",
        "Դռների, սարքավորումների և լուսավորության տեղադրում",
        "Վերջնական ստուգում և հանձնում",
      ],
    },
    serviceArea: {
      title: "Աշխատում ենք Երևանում և Հայաստանի մարզերում",
      description:
        "Վերանորոգումն ու շինարարությունը քննարկում ենք՝ հաշվի առնելով օբյեկտի գտնվելու վայրը, աշխատանքի ծավալը և լոգիստիկան։",
      details: [
        "Բնակարաններ և առանձնատներ",
        "Առևտրային տարածքներ",
        "Զննում՝ նախնական համաձայնությամբ",
      ],
    },
  },
};
