import type { Locale } from "@/types";
import type { RenovationPriceTier } from "@/config/pricing.config";

export const priceExampleCopy: Record<
  Locale,
  {
    tiersTitle: string;
    tiersDescription: string;
    from: string;
    labour: string;
    tiers: Record<RenovationPriceTier, { name: string; description: string }>;
    title: string;
    description: string;
    area: string;
    calculation: string;
    unit: string;
    currency: string;
    scopeTitle: string;
    scope: string;
    extrasTitle: string;
    extras: string;
    next: string;
  }
> = {
  ru: {
    tiersTitle: "Три уровня ремонта",
    tiersDescription:
      "Выберите ориентир по сложности отделки и желаемому результату. Все цены — за работу, без материалов. Окончательную стоимость и перечень работ согласуем после осмотра.",
    from: "от",
    labour: "Только работа · материалы отдельно",
    tiers: {
      standard: {
        name: "Стандарт",
        description:
          "Базовый вариант с простой отделкой и стандартными решениями.",
      },
      middle: {
        name: "Средний",
        description:
          "Более сложная отделка и больше индивидуальных решений в интерьере.",
      },
      premium: {
        name: "Премиум",
        description:
          "Сложные интерьерные решения, декоративные детали и трудоёмкая отделка. Верхняя граница бюджета зависит от проекта.",
      },
    },
    title: "Примеры расчёта для 40, 60 и 80 м²",
    description:
      "Предварительная стоимость работы: площадь квартиры × стартовая ставка выбранного уровня. Все суммы указаны «от», без материалов. Точный состав и стоимость работ определяются после осмотра.",
    area: "Площадь квартиры",
    calculation: "Работа без материалов, от",
    unit: "м²",
    currency: "драм",
    scopeTitle: "Что входит в стартовую стоимость",
    scope:
      "Стартовая ставка относится только к работе. Черновые и чистовые материалы оплачиваются отдельно. Перечень работ фиксируем в индивидуальной смете; мебель, техника, дизайн, доставка и вывоз мусора обсуждаются отдельными позициями.",
    extrasTitle: "Что может увеличить бюджет и сроки",
    extras:
      "Демонтаж старой отделки, выравнивание оснований, новая проводка и трубы, гидроизоляция и перенос точек меняют объём работ. Срок также зависит от высыхания материалов, поставок и доступа на объект. Окончательный график согласуется после осмотра и выбора материалов.",
    next: "Получить индивидуальную смету",
  },
  hy: {
    tiersTitle: "Վերանորոգման երեք մակարդակ",
    tiersDescription:
      "Ընտրեք տարբերակը՝ ըստ հարդարման բարդության և ցանկալի արդյունքի։ Բոլոր գները միայն աշխատանքի համար են՝ առանց նյութերի։ Վերջնական արժեքն ու աշխատանքների ցանկը համաձայնեցնում ենք զննումից հետո։",
    from: "սկսած",
    labour: "Միայն աշխատանք · նյութերն առանձին",
    tiers: {
      standard: {
        name: "Ստանդարտ",
        description:
          "Հիմնական տարբերակ՝ պարզ հարդարմամբ և ստանդարտ լուծումներով։",
      },
      middle: {
        name: "Միջին",
        description:
          "Ավելի բարդ հարդարում և ինտերիերի ավելի շատ անհատական լուծումներ։",
      },
      premium: {
        name: "Պրեմիում",
        description:
          "Ինտերիերի բարդ լուծումներ, դեկորատիվ մանրամասներ և աշխատատար հարդարում։ Բյուջեի վերին սահմանը կախված է նախագծից։",
      },
    },
    title: "Հաշվարկի օրինակներ՝ 40, 60 և 80 մ² բնակարանների համար",
    description:
      "Աշխատանքի նախնական արժեքը՝ բնակարանի մակերես × ընտրված մակարդակի մեկնարկային գին։ Բոլոր գումարները մեկնարկային են՝ առանց նյութերի։ Աշխատանքների ճշգրիտ կազմն ու արժեքը որոշվում են զննումից հետո։",
    area: "Բնակարանի մակերեսը",
    calculation: "Աշխատանք՝ առանց նյութերի, սկսած",
    unit: "մ²",
    currency: "դրամ",
    scopeTitle: "Ի՞նչ է ներառում մեկնարկային գինը",
    scope:
      "Մեկնարկային գինը վերաբերում է միայն աշխատանքին։ Նախապատրաստական և հարդարման նյութերը վճարվում են առանձին։ Աշխատանքների ցանկը նշվում է անհատական նախահաշվում․ կահույքը, տեխնիկան, դիզայնը, առաքումն ու աղբի տեղափոխումը քննարկվում են առանձին։",
    extrasTitle: "Ի՞նչը կարող է ավելացնել ծախսերն ու ժամկետը",
    extras:
      "Հին հարդարման ապամոնտաժումը, մակերեսների հարթեցումը, լարերի ու խողովակների փոխարինումը, ջրամեկուսացումն ու միացումների տեղափոխումը փոխում են աշխատանքի ծավալը։ Ժամկետի վրա ազդում են նաև նյութերի չորացումը, մատակարարումն ու տարածք մուտք գործելու պայմանները։ Գրաֆիկը ճշտվում է զննումից և նյութերի ընտրությունից հետո։",
    next: "Ստանալ անհատական նախահաշիվ",
  },
  en: {
    tiersTitle: "Three renovation levels",
    tiersDescription:
      "Choose a guide based on the complexity of the finishes and your desired result. All prices cover labour only, excluding materials. The final cost and scope are agreed after a survey.",
    from: "from",
    labour: "Labour only · materials separate",
    tiers: {
      standard: {
        name: "Standard",
        description:
          "An entry-level option with simple finishes and standard solutions.",
      },
      middle: {
        name: "Mid-range",
        description:
          "More complex finishes and more individual interior solutions.",
      },
      premium: {
        name: "Premium",
        description:
          "Complex interior solutions, decorative details and labour-intensive finishes. The upper budget depends on the project.",
      },
    },
    title: "Calculation examples for 40, 60 and 80 m²",
    description:
      "Preliminary labour cost: apartment floor area × the starting rate for the chosen level. All totals are starting prices, excluding materials. The exact scope and cost are determined after a survey.",
    area: "Apartment floor area",
    calculation: "Labour excluding materials, from",
    unit: "m²",
    currency: "AMD",
    scopeTitle: "What the starting price includes",
    scope:
      "The starting rate covers labour only. Preparation and finishing materials are paid for separately. The individual estimate defines the work; furniture, appliances, design, delivery and waste removal are discussed as separate items.",
    extrasTitle: "What can increase the budget and schedule",
    extras:
      "Removing old finishes, levelling surfaces, replacing wiring or pipes, waterproofing and relocating connections change the scope. Drying times, deliveries and site access also affect the schedule, which is agreed after a survey and material selection.",
    next: "Request an individual estimate",
  },
  de: {
    tiersTitle: "Drei Renovierungsstufen",
    tiersDescription:
      "Wählen Sie einen Richtwert nach der Komplexität des Ausbaus und dem gewünschten Ergebnis. Alle Preise gelten nur für die Arbeiten, ohne Materialien. Endpreis und Leistungsumfang werden nach der Besichtigung vereinbart.",
    from: "ab",
    labour: "Nur Arbeitskosten · Material separat",
    tiers: {
      standard: {
        name: "Standard",
        description:
          "Die Basisvariante mit einfachen Oberflächen und Standardlösungen.",
      },
      middle: {
        name: "Mittelklasse",
        description:
          "Aufwendigere Oberflächen und mehr individuelle Innenraumlösungen.",
      },
      premium: {
        name: "Premium",
        description:
          "Komplexe Innenraumlösungen, dekorative Details und arbeitsintensiver Ausbau. Die Budgetobergrenze hängt vom Projekt ab.",
      },
    },
    title: "Rechenbeispiele für 40, 60 und 80 m²",
    description:
      "Vorläufige Arbeitskosten: Wohnungsfläche × Einstiegspreis der gewählten Stufe. Alle Beträge sind Ab-Preise ohne Material. Der genaue Umfang und die Kosten werden nach der Besichtigung bestimmt.",
    area: "Wohnungsfläche",
    calculation: "Arbeitskosten ohne Material, ab",
    unit: "m²",
    currency: "AMD",
    scopeTitle: "Was der Einstiegspreis umfasst",
    scope:
      "Der Einstiegspreis umfasst nur die Arbeiten. Materialien für Vorbereitung und Ausbau werden separat bezahlt. Der Kostenvoranschlag legt die Arbeiten fest; Möbel, Geräte, Planung, Lieferung und Entsorgung werden als separate Positionen besprochen.",
    extrasTitle: "Was Budget und Dauer beeinflusst",
    extras:
      "Rückbau, das Ausgleichen von Oberflächen, neue Leitungen, Abdichtung und verlegte Anschlüsse verändern den Umfang. Trocknungszeiten, Lieferungen und Zugang beeinflussen ebenfalls den Zeitplan. Dieser wird nach Besichtigung und Materialwahl vereinbart.",
    next: "Individuellen Kostenvoranschlag anfragen",
  },
  fr: {
    tiersTitle: "Trois niveaux de rénovation",
    tiersDescription:
      "Choisissez un repère selon la complexité des finitions et le résultat souhaité. Tous les prix concernent uniquement la main-d’œuvre, hors matériaux. Le coût final et les travaux sont convenus après une visite.",
    from: "dès",
    labour: "Main-d’œuvre seule · matériaux séparés",
    tiers: {
      standard: {
        name: "Standard",
        description:
          "Une formule de base avec des finitions simples et des solutions standard.",
      },
      middle: {
        name: "Intermédiaire",
        description:
          "Des finitions plus complexes et davantage de solutions intérieures personnalisées.",
      },
      premium: {
        name: "Premium",
        description:
          "Des solutions intérieures complexes, des détails décoratifs et des finitions exigeantes en main-d’œuvre. Le budget maximal dépend du projet.",
      },
    },
    title: "Exemples de calcul pour 40, 60 et 80 m²",
    description:
      "Coût préliminaire de la main-d’œuvre : surface de l’appartement × tarif de départ du niveau choisi. Tous les montants sont des prix de départ, hors matériaux. Les travaux exacts et leur coût sont définis après une visite.",
    area: "Surface de l’appartement",
    calculation: "Main-d’œuvre hors matériaux, dès",
    unit: "m²",
    currency: "AMD",
    scopeTitle: "Ce que comprend le tarif de départ",
    scope:
      "Le tarif de départ comprend uniquement la main-d’œuvre. Les matériaux de préparation et de finition sont payés séparément. Le devis définit les travaux ; meubles, appareils, études, livraison et évacuation sont discutés comme des postes distincts.",
    extrasTitle: "Ce qui peut augmenter le budget et la durée",
    extras:
      "La dépose, le ragréage, le remplacement des réseaux, l’étanchéité et le déplacement des raccordements modifient les travaux. Le séchage, les livraisons et l’accès influencent aussi le calendrier, établi après visite et choix des matériaux.",
    next: "Demander un devis personnalisé",
  },
};
