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
      title: "Что включает ремонт под ключ",
      notice:
        "Финальный перечень работ составляется после осмотра объекта и обсуждения ваших требований.",
      items: [
        "Осмотр объекта и замеры",
        "Планировка и смета",
        "Демонтаж и подготовка помещения",
        "Электрика и сантехника",
        "Подготовка стен, пола и потолка",
        "Плитка и чистовая отделка",
        "Установка дверей, освещения и оборудования",
        "Уборка, проверка и сдача объекта",
      ],
    },
    serviceArea: {
      enabled: true,
      label: "География работ",
      title: "Ремонт и строительство в Ереване и регионах",
      description:
        "Принимаем проекты квартир, частных домов и коммерческих помещений в Ереване и регионах Армении. Возможность выезда и условия зависят от объёма работ и расположения объекта.",
      primaryCta: {
        label: "Заказать осмотр объекта",
        href: "/ru/contacts",
      },
      secondaryCta: {
        label: "Рассчитать стоимость ремонта",
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
      title: "What a turnkey renovation includes",
      notice:
        "The final work list is prepared after a site survey and discussion of your requirements.",
      items: [
        "Property survey and measurements",
        "Layout planning and estimate",
        "Demolition and space preparation",
        "Electrical and plumbing work",
        "Wall, floor, and ceiling preparation",
        "Tiling and final finishes",
        "Installation of doors, lighting, and fixtures",
        "Cleaning, inspection, and handover",
      ],
    },
    serviceArea: {
      enabled: true,
      label: "Service area",
      title: "Renovation and construction in Yerevan and the regions",
      description:
        "We accept apartment, private home, and commercial-space projects in Yerevan and across Armenia. Visit availability and terms depend on the scope and property location.",
      primaryCta: {
        label: "Request a property survey",
        href: "/en/contacts",
      },
      secondaryCta: {
        label: "Calculate renovation cost",
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
      title: "Ի՞նչ է ներառում բանալիով վերանորոգումը",
      notice:
        "Աշխատանքների վերջնական ցանկը կազմվում է օբյեկտի զննումից և Ձեր պահանջների քննարկումից հետո։",
      items: [
        "Օբյեկտի զննում և չափագրում",
        "Հատակագծում և նախահաշիվ",
        "Ապամոնտաժում և տարածքի նախապատրաստում",
        "Էլեկտրական և սանտեխնիկական աշխատանքներ",
        "Պատերի, հատակի և առաստաղի պատրաստում",
        "Սալիկապատում և վերջնական հարդարում",
        "Դռների, լուսավորության և սարքավորումների տեղադրում",
        "Մաքրում, ստուգում և օբյեկտի հանձնում",
      ],
    },
    serviceArea: {
      enabled: true,
      label: "Աշխատանքների աշխարհագրություն",
      title: "Վերանորոգում և շինարարություն Երևանում ու մարզերում",
      description:
        "Ընդունում ենք բնակարանների, առանձնատների և առևտրային տարածքների նախագծեր Երևանում և Հայաստանի մարզերում։ Մեկնելու հնարավորությունն ու պայմանները կախված են աշխատանքի ծավալից և օբյեկտի գտնվելու վայրից։",
      primaryCta: {
        label: "Պատվիրել օբյեկտի զննում",
        href: "/hy/contacts",
      },
      secondaryCta: {
        label: "Հաշվել վերանորոգման արժեքը",
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
