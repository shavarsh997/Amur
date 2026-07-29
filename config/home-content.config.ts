import type { Locale } from "@/types";

type ServiceAreaItemIcon = "building-2" | "map" | "store";

export type ServiceAreaSectionConfig = {
  enabled: boolean;
  label: string;
  title: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  items: Array<{
    id: string;
    icon: ServiceAreaItemIcon;
    title: string;
    description: string;
    enabled: boolean;
  }>;
};

export type HomeContent = {
  heroVisual: { image: string; alt: string };
  heroDirections: readonly string[];
  renovationIncluded: {
    eyebrow: string;
    title: string;
    notice: string;
    items: readonly string[];
  };
  serviceArea: ServiceAreaSectionConfig;
};

export const homeContent: Record<Locale, HomeContent> = {
  ru: {
    heroVisual: {
      image:
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=90",
      alt: "Светлый современный интерьер как иллюстрация услуги ремонта",
    },
    heroDirections: [
      "Ремонт квартир и домов",
      "Строительство домов",
      "Дизайн интерьера",
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
      enabled: true,
      label: "География работ",
      title: "Работаем по Еревану и всей Армении",
      description:
        "Выезжаем на осмотр квартир, частных домов и коммерческих помещений. Возможность выезда и логистику уточняем после обсуждения задачи.",
      primaryCta: {
        label: "Обсудить объект",
        href: "/ru/contacts",
      },
      secondaryCta: {
        label: "Указать регион в калькуляторе",
        href: "/ru/calculator?step=region",
      },
      items: [
        {
          id: "homes",
          icon: "building-2",
          title: "Квартиры и частные дома",
          description: "Ремонт, дизайн интерьера и строительные работы.",
          enabled: true,
        },
        {
          id: "commercial",
          icon: "store",
          title: "Коммерческие помещения",
          description: "Ремонт и строительные работы для бизнеса.",
          enabled: true,
        },
        {
          id: "armenia",
          icon: "map",
          title: "Выезд по Армении",
          description: "По предварительному согласованию и с учетом логистики.",
          enabled: true,
        },
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
      "Apartment and house renovation",
      "House construction",
      "Interior design",
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
      enabled: true,
      label: "Service area",
      title: "Working in Yerevan and across Armenia",
      description:
        "We visit apartments, private homes, and commercial properties to assess the project. Site visits and logistics are confirmed after we discuss the scope.",
      primaryCta: {
        label: "Discuss your property",
        href: "/en/contacts",
      },
      secondaryCta: {
        label: "Add your region in the calculator",
        href: "/en/calculator?step=region",
      },
      items: [
        {
          id: "homes",
          icon: "building-2",
          title: "Apartments and private homes",
          description: "Renovation, interior design, and construction work.",
          enabled: true,
        },
        {
          id: "commercial",
          icon: "store",
          title: "Commercial spaces",
          description: "Renovation and construction work for businesses.",
          enabled: true,
        },
        {
          id: "armenia",
          icon: "map",
          title: "Visits across Armenia",
          description: "By prior arrangement and subject to logistics.",
          enabled: true,
        },
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
      "Բնակարանների և տների վերանորոգում",
      "Տների կառուցում",
      "Ինտերիերի դիզայն",
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
      enabled: true,
      label: "Աշխատանքների աշխարհագրություն",
      title: "Աշխատում ենք Երևանում և Հայաստանի մարզերում",
      description:
        "Մեկնում ենք բնակարանների, առանձնատների և առևտրային տարածքների զննության։ Մեկնման հնարավորությունն ու լոգիստիկան ճշտում ենք աշխատանքը քննարկելուց հետո։",
      primaryCta: {
        label: "Քննարկել օբյեկտը",
        href: "/hy/contacts",
      },
      secondaryCta: {
        label: "Նշել մարզը հաշվիչում",
        href: "/hy/calculator?step=region",
      },
      items: [
        {
          id: "homes",
          icon: "building-2",
          title: "Բնակարաններ և առանձնատներ",
          description:
            "Վերանորոգում, ինտերիերի դիզայն և շինարարական աշխատանքներ։",
          enabled: true,
        },
        {
          id: "commercial",
          icon: "store",
          title: "Առևտրային տարածքներ",
          description: "Բիզնեսի համար վերանորոգման և շինարարական աշխատանքներ։",
          enabled: true,
        },
        {
          id: "armenia",
          icon: "map",
          title: "Մեկնում Հայաստանի մարզեր",
          description: "Նախնական համաձայնությամբ և լոգիստիկայի հաշվառմամբ։",
          enabled: true,
        },
      ],
    },
  },
};
