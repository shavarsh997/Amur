import type { Locale } from "@/types";

export const priceExampleCopy: Record<
  Locale,
  {
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
    title: "Примеры расчёта для 40, 60 и 80 м²",
    description:
      "Примеры показывают стоимость работы при умножении площади квартиры на стартовую ставку. Материалы оплачиваются отдельно. Это предварительный ориентир: точный состав и стоимость работ определяются после осмотра.",
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
    title: "Հաշվարկի օրինակներ՝ 40, 60 և 80 մ² բնակարանների համար",
    description:
      "Օրինակներում բնակարանի մակերեսը բազմապատկված է աշխատանքի մեկնարկային գնով։ Նյութերը վճարվում են առանձին։ Սա նախնական կողմնորոշիչ է․ աշխատանքների ճշգրիտ կազմն ու արժեքը որոշվում են զննումից հետո։",
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
    title: "Calculation examples for 40, 60 and 80 m²",
    description:
      "These examples multiply apartment floor area by the starting labour rate. Materials are paid for separately. They are preliminary guides; the exact scope and labour cost are determined after a survey.",
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
    title: "Rechenbeispiele für 40, 60 und 80 m²",
    description:
      "Die Beispiele multiplizieren die Wohnungsfläche mit dem Einstiegspreis für die Arbeiten. Materialien werden separat bezahlt. Es sind vorläufige Richtwerte; der genaue Umfang und die Arbeitskosten werden nach der Besichtigung bestimmt.",
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
    title: "Exemples de calcul pour 40, 60 et 80 m²",
    description:
      "Ces exemples multiplient la surface de l’appartement par le tarif de départ de la main-d’œuvre. Les matériaux sont payés séparément. Ce sont des repères préliminaires ; les travaux exacts et leur coût sont définis après une visite.",
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
