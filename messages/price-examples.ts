import type { Locale } from "@/types";
import type { RenovationPriceTier } from "@/config/pricing.config";

export const priceExampleCopy: Record<
  Locale,
  {
    tiersTitle: string;
    tiersDescription: string;
    from: string;
    materialsNote: string;
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
    /** "{price}" is replaced with the formatted standard-tier rate. */
    whyTitle: string;
    whyText: string;
    timeline: string;
    conditions: readonly string[];
  }
> = {
  ru: {
    tiersTitle: "Три уровня ремонта",
    tiersDescription:
      "Выберите ориентир по сложности отделки и желаемому результату. Цены включают ремонтные работы, а для среднего и премиального уровней — также дизайн. Материалы оплачиваются отдельно. Окончательную стоимость и перечень работ согласуем после осмотра.",
    from: "от",
    materialsNote: "Материалы оплачиваются отдельно",
    tiers: {
      standard: {
        name: "Стандарт",
        description:
          "Базовый вариант с простой отделкой и стандартными решениями.",
      },
      middle: {
        name: "Средний",
        description:
          "Стандартный дизайн интерьера включён в стоимость. Более сложная отделка и больше индивидуальных решений.",
      },
      premium: {
        name: "Премиум",
        description:
          "Более сложный индивидуальный дизайн интерьера включён в стоимость. Декоративные детали и трудоёмкая отделка. Верхняя граница бюджета зависит от проекта.",
      },
    },
    title: "Примеры расчёта для 40, 60 и 80 м²",
    description:
      "Предварительная стоимость выбранного уровня: площадь квартиры × стартовая ставка выбранного уровня. Все суммы указаны «от», без материалов. Точный состав и стоимость работ определяются после осмотра.",
    area: "Площадь квартиры",
    calculation: "Стоимость без материалов, от",
    unit: "м²",
    currency: "драм",
    scopeTitle: "Что входит в стартовую стоимость",
    scope:
      "Все уровни включают ремонтные работы. В среднем уровне также включён стандартный дизайн интерьера, в премиуме — более сложный индивидуальный дизайн. Для уровня «Стандарт» дизайн обсуждается отдельно. Состав дизайна и перечень работ фиксируем в смете. Черновые и чистовые материалы оплачиваются отдельно; мебель, техника, доставка и вывоз мусора обсуждаются отдельными позициями.",
    extrasTitle: "Что может увеличить бюджет и сроки",
    extras:
      "Демонтаж старой отделки, выравнивание оснований, новая проводка и трубы, гидроизоляция и перенос точек меняют объём работ. Срок также зависит от высыхания материалов, поставок и доступа на объект. Окончательный график согласуется после осмотра и выбора материалов.",
    next: "Получить индивидуальную смету",
    whyTitle: "Почему от {price}, а не 45 000 ֏/м²",
    whyText:
      "Цены 40–45 тыс. за м² обычно означают лёгкое обновление без технической части. В наши {price} входит полный ремонт: электрика, сантехника, подготовка стен и пола, чистовая отделка — одной бригадой и по одной смете.",
    timeline: "Срок: новостройка 60 м² — 1,5–2 месяца.",
    conditions: [
      "Бесплатный замер",
      "Смета за 1–2 дня",
      "Без аванса",
      "Гарантия 12 месяцев",
    ],
  },
  hy: {
    tiersTitle: "Վերանորոգման երեք մակարդակ",
    tiersDescription:
      "Ընտրեք տարբերակը՝ ըստ հարդարման բարդության և ցանկալի արդյունքի։ Գները ներառում են վերանորոգման աշխատանքները, իսկ միջին և պրեմիում մակարդակներում՝ նաև դիզայնը։ Նյութերը վճարվում են առանձին։ Վերջնական արժեքն ու աշխատանքների ցանկը համաձայնեցնում ենք զննումից հետո։",
    from: "սկսած",
    materialsNote: "Նյութերը վճարվում են առանձին",
    tiers: {
      standard: {
        name: "Ստանդարտ",
        description:
          "Հիմնական տարբերակ՝ պարզ հարդարմամբ և ստանդարտ լուծումներով։",
      },
      middle: {
        name: "Միջին",
        description:
          "Ինտերիերի ստանդարտ դիզայնը ներառված է արժեքի մեջ։ Ավելի բարդ հարդարում և ավելի շատ անհատական լուծումներ։",
      },
      premium: {
        name: "Պրեմիում",
        description:
          "Ինտերիերի ավելի բարդ անհատական դիզայնը ներառված է արժեքի մեջ։ Դեկորատիվ մանրամասներ և աշխատատար հարդարում։ Բյուջեի վերին սահմանը կախված է նախագծից։",
      },
    },
    title: "Հաշվարկի օրինակներ՝ 40, 60 և 80 մ² բնակարանների համար",
    description:
      "Ընտրված մակարդակի նախնական արժեքը՝ բնակարանի մակերես × ընտրված մակարդակի մեկնարկային գին։ Բոլոր գումարները մեկնարկային են՝ առանց նյութերի։ Աշխատանքների ճշգրիտ կազմն ու արժեքը որոշվում են զննումից հետո։",
    area: "Բնակարանի մակերեսը",
    calculation: "Արժեքն առանց նյութերի՝ սկսած",
    unit: "մ²",
    currency: "դրամ",
    scopeTitle: "Ի՞նչ է ներառում մեկնարկային գինը",
    scope:
      "Բոլոր մակարդակները ներառում են վերանորոգման աշխատանքները։ Միջին մակարդակում ներառված է նաև ինտերիերի ստանդարտ դիզայնը, իսկ պրեմիումում՝ ավելի բարդ անհատական դիզայնը։ «Ստանդարտ» մակարդակի համար դիզայնը քննարկվում է առանձին։ Դիզայնի կազմն ու աշխատանքների ցանկը նշվում են նախահաշվում։ Նախապատրաստական և հարդարման նյութերը վճարվում են առանձին․ կահույքը, տեխնիկան, առաքումն ու աղբի տեղափոխումը քննարկվում են առանձին։",
    extrasTitle: "Ի՞նչը կարող է ավելացնել ծախսերն ու ժամկետը",
    extras:
      "Հին հարդարման ապամոնտաժումը, մակերեսների հարթեցումը, լարերի ու խողովակների փոխարինումը, ջրամեկուսացումն ու միացումների տեղափոխումը փոխում են աշխատանքի ծավալը։ Ժամկետի վրա ազդում են նաև նյութերի չորացումը, մատակարարումն ու տարածք մուտք գործելու պայմանները։ Գրաֆիկը ճշտվում է զննումից և նյութերի ընտրությունից հետո։",
    next: "Ստանալ անհատական նախահաշիվ",
    whyTitle: "Ինչո՞ւ {price}-ից, և ոչ թե 45 000 դրամ/մ²-ից",
    whyText:
      "Մ²-ի համար 40–45 հազար դրամ գինը սովորաբար նշանակում է թեթև թարմացում՝ առանց տեխնիկական մասի։ Մեր {price} դրամի մեջ ներառված է ամբողջական վերանորոգումը՝ էլեկտրամոնտաժ, սանտեխնիկա, պատերի ու հատակի նախապատրաստում, վերջնական հարդարում՝ մեկ բրիգադով և մեկ նախահաշվով։",
    timeline: "Ժամկետը՝ 60 մ² նորակառույց բնակարան՝ 1,5–2 ամիս։",
    conditions: [
      "Անվճար չափագրում",
      "Նախահաշիվ 1–2 օրում",
      "Առանց կանխավճարի",
      "12 ամիս երաշխիք",
    ],
  },
  en: {
    tiersTitle: "Three renovation levels",
    tiersDescription:
      "Choose a guide based on the complexity of the finishes and your desired result. Prices include renovation labour, with design also included in the mid-range and premium levels. Materials are paid for separately. The final cost and scope are agreed after a survey.",
    from: "from",
    materialsNote: "Materials paid for separately",
    tiers: {
      standard: {
        name: "Standard",
        description:
          "An entry-level option with simple finishes and standard solutions.",
      },
      middle: {
        name: "Mid-range",
        description:
          "Standard interior design is included in the price. More complex finishes and more individual interior solutions.",
      },
      premium: {
        name: "Premium",
        description:
          "More elaborate, bespoke interior design is included in the price. Decorative details and labour-intensive finishes. The upper budget depends on the project.",
      },
    },
    title: "Calculation examples for 40, 60 and 80 m²",
    description:
      "Preliminary cost for the chosen level: apartment floor area × the starting rate for the chosen level. All totals are starting prices, excluding materials. The exact scope and cost are determined after a survey.",
    area: "Apartment floor area",
    calculation: "Cost excluding materials, from",
    unit: "m²",
    currency: "AMD",
    scopeTitle: "What the starting price includes",
    scope:
      "All levels include renovation labour. Mid-range also includes standard interior design; premium includes more elaborate, bespoke design. Design for the Standard level is discussed separately. The estimate defines the design scope and renovation work. Preparation and finishing materials are paid for separately; furniture, appliances, delivery and waste removal are discussed as separate items.",
    extrasTitle: "What can increase the budget and schedule",
    extras:
      "Removing old finishes, levelling surfaces, replacing wiring or pipes, waterproofing and relocating connections change the scope. Drying times, deliveries and site access also affect the schedule, which is agreed after a survey and material selection.",
    next: "Request an individual estimate",
    whyTitle: "Why from AMD {price}, not AMD 45,000/m²",
    whyText:
      "Rates of AMD 40,000–45,000 per m² usually mean a light refresh without the technical work. Our AMD {price} covers a full renovation: electrics, plumbing, wall and floor preparation and final finishes — by one crew, under one estimate.",
    timeline: "Timeline: a 60 m² new-build apartment takes 1.5–2 months.",
    conditions: [
      "Free measurement visit",
      "Estimate in 1–2 days",
      "No advance payment",
      "12-month warranty",
    ],
  },
  de: {
    tiersTitle: "Drei Renovierungsstufen",
    tiersDescription:
      "Wählen Sie einen Richtwert nach der Komplexität des Ausbaus und dem gewünschten Ergebnis. Die Preise umfassen die Renovierungsarbeiten; in Mittelklasse und Premium ist auch die Innenraumgestaltung enthalten. Materialien werden separat bezahlt. Endpreis und Leistungsumfang werden nach der Besichtigung vereinbart.",
    from: "ab",
    materialsNote: "Materialien werden separat bezahlt",
    tiers: {
      standard: {
        name: "Standard",
        description:
          "Die Basisvariante mit einfachen Oberflächen und Standardlösungen.",
      },
      middle: {
        name: "Mittelklasse",
        description:
          "Eine Standard-Innenraumgestaltung ist im Preis enthalten. Aufwendigere Oberflächen und mehr individuelle Lösungen.",
      },
      premium: {
        name: "Premium",
        description:
          "Eine aufwendigere, individuelle Innenraumgestaltung ist im Preis enthalten. Dekorative Details und arbeitsintensiver Ausbau. Die Budgetobergrenze hängt vom Projekt ab.",
      },
    },
    title: "Rechenbeispiele für 40, 60 und 80 m²",
    description:
      "Vorläufige Kosten der gewählten Stufe: Wohnungsfläche × Einstiegspreis der gewählten Stufe. Alle Beträge sind Ab-Preise ohne Material. Der genaue Umfang und die Kosten werden nach der Besichtigung bestimmt.",
    area: "Wohnungsfläche",
    calculation: "Kosten ohne Material, ab",
    unit: "m²",
    currency: "AMD",
    scopeTitle: "Was der Einstiegspreis umfasst",
    scope:
      "Alle Stufen umfassen die Renovierungsarbeiten. Mittelklasse beinhaltet auch eine Standard-Innenraumgestaltung, Premium eine aufwendigere, individuelle Gestaltung. Bei Standard wird die Gestaltung separat besprochen. Der Kostenvoranschlag legt den Gestaltungs- und Arbeitsumfang fest. Materialien für Vorbereitung und Ausbau werden separat bezahlt; Möbel, Geräte, Lieferung und Entsorgung werden als separate Positionen besprochen.",
    extrasTitle: "Was Budget und Dauer beeinflusst",
    extras:
      "Rückbau, das Ausgleichen von Oberflächen, neue Leitungen, Abdichtung und verlegte Anschlüsse verändern den Umfang. Trocknungszeiten, Lieferungen und Zugang beeinflussen ebenfalls den Zeitplan. Dieser wird nach Besichtigung und Materialwahl vereinbart.",
    next: "Individuellen Kostenvoranschlag anfragen",
    whyTitle: "Warum ab {price} AMD und nicht 45.000 AMD/m²",
    whyText:
      "Preise von 40.000–45.000 AMD pro m² bedeuten meist eine leichte Auffrischung ohne technische Arbeiten. Unsere {price} AMD umfassen eine komplette Renovierung: Elektrik, Sanitär, Vorbereitung von Wänden und Böden sowie den Endausbau – durch ein Team und nach einem Kostenvoranschlag.",
    timeline: "Dauer: Neubauwohnung mit 60 m² – 1,5–2 Monate.",
    conditions: [
      "Kostenloses Aufmaß",
      "Kostenvoranschlag in 1–2 Tagen",
      "Keine Anzahlung",
      "12 Monate Garantie",
    ],
  },
  fr: {
    tiersTitle: "Trois niveaux de rénovation",
    tiersDescription:
      "Choisissez un repère selon la complexité des finitions et le résultat souhaité. Les prix comprennent les travaux de rénovation, ainsi que la conception intérieure pour les niveaux Intermédiaire et Premium. Les matériaux sont payés séparément. Le coût final et les travaux sont convenus après une visite.",
    from: "dès",
    materialsNote: "Matériaux payés séparément",
    tiers: {
      standard: {
        name: "Standard",
        description:
          "Une formule de base avec des finitions simples et des solutions standard.",
      },
      middle: {
        name: "Intermédiaire",
        description:
          "La conception intérieure standard est incluse dans le prix. Des finitions plus complexes et davantage de solutions personnalisées.",
      },
      premium: {
        name: "Premium",
        description:
          "Une conception intérieure plus élaborée et personnalisée est incluse dans le prix. Des détails décoratifs et des finitions exigeantes en main-d’œuvre. Le budget maximal dépend du projet.",
      },
    },
    title: "Exemples de calcul pour 40, 60 et 80 m²",
    description:
      "Coût préliminaire du niveau choisi : surface de l’appartement × tarif de départ du niveau choisi. Tous les montants sont des prix de départ, hors matériaux. Les travaux exacts et leur coût sont définis après une visite.",
    area: "Surface de l’appartement",
    calculation: "Coût hors matériaux, dès",
    unit: "m²",
    currency: "AMD",
    scopeTitle: "Ce que comprend le tarif de départ",
    scope:
      "Tous les niveaux comprennent les travaux de rénovation. Le niveau Intermédiaire inclut aussi la conception intérieure standard ; Premium inclut une conception plus élaborée et personnalisée. Pour le niveau Standard, la conception est discutée séparément. Le devis définit le périmètre de la conception et des travaux. Les matériaux de préparation et de finition sont payés séparément ; meubles, appareils, livraison et évacuation sont discutés comme des postes distincts.",
    extrasTitle: "Ce qui peut augmenter le budget et la durée",
    extras:
      "La dépose, le ragréage, le remplacement des réseaux, l’étanchéité et le déplacement des raccordements modifient les travaux. Le séchage, les livraisons et l’accès influencent aussi le calendrier, établi après visite et choix des matériaux.",
    next: "Demander un devis personnalisé",
    whyTitle: "Pourquoi dès {price} AMD et non 45 000 AMD/m²",
    whyText:
      "Un tarif de 40 000 à 45 000 AMD le m² correspond généralement à un simple rafraîchissement, sans partie technique. Nos {price} AMD couvrent une rénovation complète : électricité, plomberie, préparation des murs et des sols, finitions — par une seule équipe et sur un seul devis.",
    timeline: "Délai : appartement neuf de 60 m² — 1,5 à 2 mois.",
    conditions: [
      "Prise de mesures gratuite",
      "Devis sous 1 à 2 jours",
      "Sans acompte",
      "Garantie 12 mois",
    ],
  },
};
