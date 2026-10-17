import type { Locale } from "@/types";

type ServicePageCopy = {
  explore: string;
  moreServices: string;
  house: {
    scopeTitle: string;
    detailsTitle: string;
    pricingIntro: string;
    scope: readonly { title: string; description: string }[];
  };
};

/** Presentation copy only; service facts, prices and SEO metadata stay in their original sources. */
export const servicePageTranslations = {
  ru: {
    explore: "Узнать больше",
    moreServices: "Все связанные услуги",
    house: {
      scopeTitle: "Какие работы выполняем",
      detailsTitle: "Что входит в ремонт частного дома",
      pricingIntro:
        "Стоимость зависит от состояния дома и согласованного объёма работ. После осмотра отдельно учитываем внутреннюю отделку, инженерные системы и необходимые наружные работы.",
      scope: [
        {
          title: "Внутренняя отделка",
          description:
            "Подготовка стен и пола, черновые работы и чистовая отделка.",
        },
        {
          title: "Инженерные системы",
          description:
            "Электрика и сантехника с учётом состояния дома и задач ремонта.",
        },
        {
          title: "Капитальный ремонт",
          description:
            "Демонтаж, обновление основных систем и подготовка поверхностей.",
        },
        {
          title: "Фасады и кровля",
          description:
            "Наружные стены и кровлю оцениваем отдельно от внутренней отделки.",
        },
      ],
    },
  },
  hy: {
    explore: "Իմանալ ավելին",
    moreServices: "Բոլոր կապված ծառայությունները",
    house: {
      scopeTitle: "Ինչ աշխատանքներ ենք կատարում",
      detailsTitle: "Ինչ է ներառում առանձնատան վերանորոգումը",
      pricingIntro:
        "Արժեքը կախված է տան վիճակից և համաձայնեցված աշխատանքների ծավալից։ Զննումից հետո առանձին հաշվի ենք առնում ներքին հարդարումը, ինժեներական համակարգերն ու անհրաժեշտ արտաքին աշխատանքները։",
      scope: [
        {
          title: "Ներքին հարդարում",
          description:
            "Պատերի և հատակի պատրաստում, սևագործ աշխատանքներ և վերջնական հարդարում։",
        },
        {
          title: "Ինժեներական համակարգեր",
          description:
            "Էլեկտրական և սանտեխնիկական աշխատանքներ՝ ըստ տան վիճակի ու վերանորոգման խնդիրների։",
        },
        {
          title: "Կապիտալ վերանորոգում",
          description:
            "Ապամոնտաժում, հիմնական համակարգերի թարմացում և մակերեսների պատրաստում։",
        },
        {
          title: "Ճակատ և տանիք",
          description:
            "Արտաքին պատերն ու տանիքը գնահատում ենք ներքին հարդարումից առանձին։",
        },
      ],
    },
  },
  en: {
    explore: "Explore the service",
    moreServices: "All related services",
    house: {
      scopeTitle: "Work we undertake",
      detailsTitle: "What a private house renovation includes",
      pricingIntro:
        "The cost depends on the condition of the house and the agreed scope. After inspection, we assess interior finishes, building services and any exterior work separately.",
      scope: [
        {
          title: "Interior finishes",
          description:
            "Wall and floor preparation, preparatory work and final finishes.",
        },
        {
          title: "Building services",
          description:
            "Electrical and plumbing work based on the house condition and renovation requirements.",
        },
        {
          title: "Major renovation",
          description:
            "Demolition, upgrading key systems and preparing surfaces.",
        },
        {
          title: "Facades and roofing",
          description:
            "External walls and roofing are assessed separately from interior finishes.",
        },
      ],
    },
  },
  de: {
    explore: "Mehr erfahren",
    moreServices: "Alle verwandten Leistungen",
    house: {
      scopeTitle: "Unsere Arbeiten im Überblick",
      detailsTitle: "Was eine Hausrenovierung umfasst",
      pricingIntro:
        "Die Kosten richten sich nach dem Zustand des Hauses und dem vereinbarten Umfang. Nach der Besichtigung bewerten wir Innenausbau, Haustechnik und notwendige Außenarbeiten getrennt.",
      scope: [
        {
          title: "Innenausbau",
          description:
            "Vorbereitung von Wänden und Böden, vorbereitende Arbeiten und Endausbau.",
        },
        {
          title: "Haustechnik",
          description:
            "Elektro- und Sanitärarbeiten nach Hauszustand und Renovierungsbedarf.",
        },
        {
          title: "Umfassende Sanierung",
          description:
            "Rückbau, Erneuerung wichtiger Anlagen und Vorbereitung der Untergründe.",
        },
        {
          title: "Fassade und Dach",
          description:
            "Außenwände und Dach bewerten wir getrennt vom Innenausbau.",
        },
      ],
    },
  },
  fr: {
    explore: "En savoir plus",
    moreServices: "Tous les services associés",
    house: {
      scopeTitle: "Les travaux que nous réalisons",
      detailsTitle: "Ce que comprend la rénovation d’une maison",
      pricingIntro:
        "Le coût dépend de l’état de la maison et du périmètre convenu. Après la visite, nous évaluons séparément les finitions intérieures, les réseaux techniques et les travaux extérieurs nécessaires.",
      scope: [
        {
          title: "Finitions intérieures",
          description:
            "Préparation des murs et des sols, travaux préparatoires et finitions.",
        },
        {
          title: "Réseaux techniques",
          description:
            "Électricité et plomberie selon l’état de la maison et les besoins de rénovation.",
        },
        {
          title: "Rénovation lourde",
          description:
            "Démolition, renouvellement des principaux réseaux et préparation des surfaces.",
        },
        {
          title: "Façades et toiture",
          description:
            "Les murs extérieurs et la toiture sont évalués séparément des finitions intérieures.",
        },
      ],
    },
  },
} as const satisfies Record<Locale, ServicePageCopy>;
