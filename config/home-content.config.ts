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
      title: "Ремонт и строительство по всей Армении",
      description:
        "Работаем с квартирами, частными домами и коммерческими помещениями по всей Армении, включая Ереван, Гюмри, Ванадзор, Дилижан и другие города. Условия работ согласовываем с учётом расположения объекта и объёма работ.",
      primaryCta: {
        label: "Заказать осмотр объекта",
        href: "/ru/contacts",
      },
      secondaryCta: {
        label: "Обсудить стоимость ремонта",
        href: "/ru/contacts",
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
          title: "Работаем по всей Армении",
          description: "Условия согласовываем с учётом расположения объекта.",
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
      title: "Renovation and construction across Armenia",
      description:
        "We work on apartment, private home, and commercial-space projects across Armenia, including Yerevan, Gyumri, Vanadzor, Dilijan, and other cities. Work terms are agreed based on the property location and scope.",
      primaryCta: {
        label: "Request a property survey",
        href: "/en/contacts",
      },
      secondaryCta: {
        label: "Discuss renovation costs",
        href: "/en/contacts",
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
          title: "Working across Armenia",
          description: "Terms are agreed based on the property location.",
          enabled: true,
        },
      ],
    },
  },
  de: {
    heroVisual: {
      image:
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=90",
      alt: "Heller, moderner Innenraum als Illustration einer Renovierungsleistung",
    },
    heroDirections: [
      "Wohnungs- und Hausrenovierung",
      "Hausbau",
      "Innenraumgestaltung",
      "Gewerberäume",
    ],
    renovationIncluded: {
      eyebrow: "Schlüsselfertige Renovierung",
      title: "Was eine schlüsselfertige Renovierung umfasst",
      notice:
        "Die endgültige Arbeitsliste wird nach Besichtigung und Besprechung Ihrer Anforderungen erstellt.",
      items: [
        "Objektbesichtigung und Aufmaß",
        "Grundrissplanung und Kostenschätzung",
        "Rückbau und Raumvorbereitung",
        "Elektro- und Sanitärarbeiten",
        "Wand-, Boden- und Deckenvorbereitung",
        "Fliesen und Endausbau",
        "Einbau von Türen, Beleuchtung und Ausstattung",
        "Reinigung, Prüfung und Übergabe",
      ],
    },
    serviceArea: {
      enabled: true,
      label: "Einsatzgebiet",
      title: "Renovierung und Bau in ganz Armenien",
      description:
        "Wir arbeiten an Wohnungs-, Haus- und Gewerbeprojekten in ganz Armenien, darunter Eriwan, Gjumri, Wanadsor, Dilidschan und weitere Städte. Die Bedingungen werden nach Standort und Umfang vereinbart.",
      primaryCta: {
        label: "Objektbesichtigung anfragen",
        href: "/de/contacts",
      },
      secondaryCta: {
        label: "Renovierungskosten besprechen",
        href: "/de/contacts",
      },
      items: [
        {
          id: "homes",
          icon: "building-2",
          title: "Wohnungen und Privathäuser",
          description: "Renovierung, Innenraumgestaltung und Bauarbeiten.",
          enabled: true,
        },
        {
          id: "commercial",
          icon: "store",
          title: "Gewerberäume",
          description: "Renovierungs- und Bauarbeiten für Unternehmen.",
          enabled: true,
        },
        {
          id: "armenia",
          icon: "map",
          title: "In ganz Armenien tätig",
          description:
            "Die Bedingungen werden je nach Standort des Objekts vereinbart.",
          enabled: true,
        },
      ],
    },
  },
  fr: {
    heroVisual: {
      image:
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=90",
      alt: "Intérieur moderne et lumineux illustrant un service de rénovation",
    },
    heroDirections: [
      "Rénovation d’appartements et de maisons",
      "Construction de maison",
      "Aménagement intérieur",
      "Locaux professionnels",
    ],
    renovationIncluded: {
      eyebrow: "Rénovation clé en main",
      title: "Ce que comprend une rénovation clé en main",
      notice:
        "La liste définitive des travaux est établie après une visite et un échange sur vos besoins.",
      items: [
        "Visite du bien et prise de mesures",
        "Planification de l’agencement et devis",
        "Démolition et préparation des espaces",
        "Travaux d’électricité et de plomberie",
        "Préparation des murs, sols et plafonds",
        "Carrelage et finitions finales",
        "Installation des portes, de l’éclairage et des équipements",
        "Nettoyage, contrôle et livraison",
      ],
    },
    serviceArea: {
      enabled: true,
      label: "Zone d’intervention",
      title: "Rénovation et construction dans toute l’Arménie",
      description:
        "Nous réalisons des projets d’appartements, de maisons et de locaux professionnels dans toute l’Arménie, notamment à Erevan, Gyumri, Vanadzor, Dilidjan et dans d’autres villes. Les modalités sont convenues selon la localisation et les travaux prévus.",
      primaryCta: {
        label: "Demander une visite du bien",
        href: "/fr/contacts",
      },
      secondaryCta: {
        label: "Discuter du coût de rénovation",
        href: "/fr/contacts",
      },
      items: [
        {
          id: "homes",
          icon: "building-2",
          title: "Appartements et maisons individuelles",
          description:
            "Rénovation, aménagement intérieur et travaux de construction.",
          enabled: true,
        },
        {
          id: "commercial",
          icon: "store",
          title: "Locaux professionnels",
          description:
            "Travaux de rénovation et de construction pour les entreprises.",
          enabled: true,
        },
        {
          id: "armenia",
          icon: "map",
          title: "Interventions dans toute l’Arménie",
          description:
            "Les modalités sont convenues selon la localisation du bien.",
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
      eyebrow: "Ամբողջական վերանորոգում",
      title: "Ի՞նչ է ներառում բնակարանի ամբողջական վերանորոգումը",
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
      title: "Վերանորոգում և շինարարություն ամբողջ Հայաստանում",
      description:
        "Աշխատում ենք ամբողջ Հայաստանում՝ Երևանում, Գյումրիում, Վանաձորում, Դիլիջանում և այլ քաղաքներում՝ բնակարանների, առանձնատների և առևտրային տարածքների նախագծերի վրա։ Աշխատանքի պայմաններն ու արժեքը որոշվում են՝ հաշվի առնելով օբյեկտի գտնվելու վայրը և աշխատանքների ծավալը։",
      primaryCta: {
        label: "Պատվիրել օբյեկտի զննում",
        href: "/hy/contacts",
      },
      secondaryCta: {
        label: "Քննարկել վերանորոգման արժեքը",
        href: "/hy/contacts",
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
          title: "Աշխատանք Երևանում և մարզերում",
          description:
            "Աշխատանքի պայմանները նախապես համաձայնեցնում ենք՝ հաշվի առնելով օբյեկտի գտնվելու վայրը։",
          enabled: true,
        },
      ],
    },
  },
};
