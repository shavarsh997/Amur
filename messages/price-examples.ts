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
      "Ниже — только умножение площади пола на опубликованную стартовую ставку. Это ориентир для первого обсуждения, а не смета конкретной квартиры или отдельный тариф на работы.",
    area: "Площадь квартиры",
    calculation: "Площадь × стартовая ставка",
    unit: "м²",
    currency: "драм",
    scopeTitle: "Что входит в стартовую стоимость",
    scope:
      "Состав работ и материалов фиксируется в индивидуальной смете. Публичная ставка сама по себе не определяет комплектацию: не считайте черновые и чистовые материалы, мебель, технику, дизайн, доставку или вывоз мусора автоматически включёнными. Перед заказом согласуйте каждую позицию и отдельно запросите сумму за работу.",
    extrasTitle: "Что может увеличить бюджет и сроки",
    extras:
      "Демонтаж старой отделки, выравнивание оснований, новая проводка и трубы, гидроизоляция и перенос точек меняют объём работ. Срок также зависит от высыхания материалов, поставок и доступа на объект. Окончательный график согласуется после осмотра и выбора материалов.",
    next: "Получить индивидуальную смету",
  },
  hy: {
    title: "Հաշվարկի օրինակներ՝ 40, 60 և 80 մ² բնակարանների համար",
    description:
      "Ստորև բնակարանի հատակի մակերեսը բազմապատկված է հրապարակված մեկնարկային գնով։ Սա նախնական քննարկման կողմնորոշիչ է, ոչ թե կոնկրետ բնակարանի նախահաշիվ կամ միայն աշխատանքի գին։",
    area: "Բնակարանի մակերեսը",
    calculation: "Մակերես × մեկնարկային գին",
    unit: "մ²",
    currency: "դրամ",
    scopeTitle: "Ի՞նչ է ներառում մեկնարկային գինը",
    scope:
      "Աշխատանքների և նյութերի ցանկը նշվում է անհատական նախահաշվում։ Միայն հրապարակված գինը չի որոշում ամբողջ կազմը․ նյութերը, կահույքը, տեխնիկան, դիզայնը, առաքումն ու աղբի տեղափոխումը մի համարեք ինքնաբերաբար ներառված։ Նախքան պատվիրելը համաձայնեցրեք յուրաքանչյուր կետ և խնդրեք առանձին նշել աշխատանքի արժեքը։",
    extrasTitle: "Ի՞նչը կարող է ավելացնել ծախսերն ու ժամկետը",
    extras:
      "Հին հարդարման ապամոնտաժումը, մակերեսների հարթեցումը, լարերի ու խողովակների փոխարինումը, ջրամեկուսացումն ու միացումների տեղափոխումը փոխում են աշխատանքի ծավալը։ Ժամկետի վրա ազդում են նաև նյութերի չորացումը, մատակարարումն ու տարածք մուտք գործելու պայմանները։ Գրաֆիկը ճշտվում է զննումից և նյութերի ընտրությունից հետո։",
    next: "Ստանալ անհատական նախահաշիվ",
  },
  en: {
    title: "Calculation examples for 40, 60 and 80 m²",
    description:
      "These examples only multiply floor area by the published starting rate. They support an initial discussion and are not a quotation for a particular apartment or a labour-only tariff.",
    area: "Apartment floor area",
    calculation: "Area × starting rate",
    unit: "m²",
    currency: "AMD",
    scopeTitle: "What the starting price includes",
    scope:
      "The individual estimate defines labour and materials. The published rate alone does not specify a package: do not assume materials, furniture, appliances, design, delivery or waste removal are included. Agree each item and request a separate labour subtotal before ordering.",
    extrasTitle: "What can increase the budget and schedule",
    extras:
      "Removing old finishes, levelling surfaces, replacing wiring or pipes, waterproofing and relocating connections change the scope. Drying times, deliveries and site access also affect the schedule, which is agreed after a survey and material selection.",
    next: "Request an individual estimate",
  },
  de: {
    title: "Rechenbeispiele für 40, 60 und 80 m²",
    description:
      "Die Beispiele multiplizieren lediglich die Bodenfläche mit dem veröffentlichten Einstiegspreis. Sie dienen dem ersten Gespräch und sind weder ein Angebot für eine konkrete Wohnung noch ein reiner Arbeitstarif.",
    area: "Wohnungsfläche",
    calculation: "Fläche × Einstiegspreis",
    unit: "m²",
    currency: "AMD",
    scopeTitle: "Was der Einstiegspreis umfasst",
    scope:
      "Arbeiten und Materialien werden im individuellen Kostenvoranschlag festgelegt. Der veröffentlichte Preis definiert kein Leistungspaket: Materialien, Möbel, Geräte, Planung, Lieferung und Entsorgung sind nicht automatisch eingeschlossen. Vereinbaren Sie jede Position und lassen Sie die Arbeitskosten separat ausweisen.",
    extrasTitle: "Was Budget und Dauer beeinflusst",
    extras:
      "Rückbau, das Ausgleichen von Oberflächen, neue Leitungen, Abdichtung und verlegte Anschlüsse verändern den Umfang. Trocknungszeiten, Lieferungen und Zugang beeinflussen ebenfalls den Zeitplan. Dieser wird nach Besichtigung und Materialwahl vereinbart.",
    next: "Individuellen Kostenvoranschlag anfragen",
  },
  fr: {
    title: "Exemples de calcul pour 40, 60 et 80 m²",
    description:
      "Ces exemples multiplient uniquement la surface au sol par le tarif de départ publié. Ils servent à une première discussion et ne constituent ni un devis pour un appartement précis ni un tarif de main-d’œuvre seule.",
    area: "Surface de l’appartement",
    calculation: "Surface × tarif de départ",
    unit: "m²",
    currency: "AMD",
    scopeTitle: "Ce que comprend le tarif de départ",
    scope:
      "Le devis individuel précise les travaux et les matériaux. Le tarif publié ne définit pas un forfait : les matériaux, meubles, appareils, études, livraisons et évacuations ne sont pas automatiquement inclus. Convenez de chaque poste et demandez un sous-total distinct pour la main-d’œuvre.",
    extrasTitle: "Ce qui peut augmenter le budget et la durée",
    extras:
      "La dépose, le ragréage, le remplacement des réseaux, l’étanchéité et le déplacement des raccordements modifient les travaux. Le séchage, les livraisons et l’accès influencent aussi le calendrier, établi après visite et choix des matériaux.",
    next: "Demander un devis personnalisé",
  },
};
