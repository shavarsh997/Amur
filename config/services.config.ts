import type { ServiceConfig, ServiceContent } from "@/types/service";

type ServiceTranslationInput = Pick<
  ServiceContent,
  "title" | "shortDescription" | "fullDescription" | "includedWorks" | "suitableFor"
> & {
  workflow: readonly string[];
};

function serviceContent(input: ServiceTranslationInput): ServiceContent {
  return {
    ...input,
    heroDescription: input.shortDescription,
    workflow: input.workflow.map((title) => ({ title, description: "" })),
    priceFactors: [],
    faq: [],
    seoTitle: input.title,
    seoDescription: input.fullDescription,
  };
}

/**
 * The single source of truth for services. Fill `priceFactors` and `faq` only
 * after confirming them for publication; empty arrays intentionally hide those sections.
 */
export const servicesConfig = [
  {
    id: "house-construction",
    slug: "house-construction",
    isActive: true,
    icon: "house",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
    calculatorCategory: "private-house",
    translations: {
      ru: serviceContent({
        title: "Строительство жилых домов",
        shortDescription: "Организация строительства частных домов по утверждённому проекту.",
        fullDescription: "Координируем этапы строительства дома: от подготовки площадки и несущих конструкций до готовности к инженерным и отделочным работам.",
        includedWorks: ["Подготовка площадки", "Общестроительные и инженерные работы", "Координация участников проекта"],
        suitableFor: ["Владельцам участка для строительства постоянного или загородного дома"],
        workflow: ["Изучение участка и проекта", "Подготовительные и конструктивные работы", "Инженерные сети и отделка", "Проверка и сдача"],
      }),
      en: serviceContent({
        title: "Residential construction",
        shortDescription: "Private home construction organized around an approved design.",
        fullDescription: "We coordinate each stage of a home build, from site preparation and structural work to readiness for engineering and finishing.",
        includedWorks: ["Site preparation", "General construction and building services", "Project participant coordination"],
        suitableFor: ["Landowners planning a primary residence or country home"],
        workflow: ["Site and design review", "Preparation and structural work", "Building services and finishes", "Inspection and handover"],
      }),
      hy: serviceContent({
        title: "Բնակելի տների կառուցում",
        shortDescription: "Առանձնատների կառուցման կազմակերպում՝ հաստատված նախագծի հիման վրա։",
        fullDescription: "Համակարգում ենք առանձնատան շինարարական փուլերը՝ տարածքի նախապատրաստումից և կրող կառուցվածքներից մինչև ինժեներական ու հարդարման աշխատանքների պատրաստ վիճակ։",
        includedWorks: ["Շինհրապարակի նախապատրաստում", "Ընդհանուր շինարարական և ինժեներական աշխատանքներ", "Մասնակիցների համակարգում"],
        suitableFor: ["Հողամասի սեփականատերերին՝ մշտական կամ ամառանոցային տուն կառուցելու համար"],
        workflow: ["Հողամասի և նախագծի ուսումնասիրություն", "Նախապատրաստում և կառուցվածքներ", "Ինժեներական ցանցեր և հարդարում", "Ստուգում և հանձնում"],
      }),
    },
  },
  {
    id: "commercial-construction",
    slug: "commercial-construction",
    isActive: true,
    icon: "building-2",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
    calculatorCategory: "commercial",
    translations: {
      ru: serviceContent({ title: "Коммерческое строительство", shortDescription: "Строительство офисных, сервисных и общественных пространств.", fullDescription: "Выполняем работы для бизнес-пространств с учётом функциональных требований, потоков посетителей и дальнейшей эксплуатации.", includedWorks: ["Подготовка объекта", "Общестроительные и инженерные работы", "Координация смежных подрядчиков"], suitableFor: ["Компаниям и предпринимателям, создающим офисные, торговые или сервисные помещения"], workflow: ["Сбор требований бизнеса", "Проектная подготовка", "Строительно-монтажные работы", "Проверка и сдача"] }),
      en: serviceContent({ title: "Commercial construction", shortDescription: "Construction of offices, service venues, and public-facing spaces.", fullDescription: "We deliver business spaces with attention to operational requirements, visitor flow, and long-term day-to-day use.", includedWorks: ["Property preparation", "Construction and building-services work", "Specialist contractor coordination"], suitableFor: ["Companies and entrepreneurs creating office, retail, or service premises"], workflow: ["Business requirements", "Design preparation", "Construction and installation", "Inspection and handover"] }),
      hy: serviceContent({ title: "Առևտրային շինարարություն", shortDescription: "Գրասենյակների, սպասարկման և հանրային տարածքների կառուցում։", fullDescription: "Իրականացնում ենք բիզնես տարածքների շինարարական աշխատանքներ՝ գործառնական պահանջները, այցելուների հոսքը և հետագա շահագործումը հաշվի առնելով։", includedWorks: ["Օբյեկտի նախապատրաստում", "Շինարարական և ինժեներական աշխատանքներ", "Կապալառուների համակարգում"], suitableFor: ["Գրասենյակ, առևտրային կամ սպասարկման տարածք ստեղծող ընկերություններին"], workflow: ["Բիզնեսի պահանջների հավաքագրում", "Նախագծային նախապատրաստում", "Շինմոնտաժային աշխատանքներ", "Ստուգում և հանձնում"] }),
    },
  },
  {
    id: "design",
    slug: "design",
    isActive: true,
    icon: "ruler",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=85",
    calculatorCategory: "design",
    translations: {
      ru: serviceContent({ title: "Проектирование", shortDescription: "Архитектурная и рабочая подготовка будущего строительства.", fullDescription: "Формируем решения с учётом задачи, участка, норм и последующей реализации, чтобы строительство опиралось на согласованную документацию.", includedWorks: ["Сбор исходных данных", "Архитектурные и планировочные решения", "Рабочие материалы в согласованном составе"], suitableFor: ["Заказчикам, которым нужна обоснованная основа перед строительством или реконструкцией"], workflow: ["Техническое задание", "Концепция", "Согласование решений", "Подготовка рабочей документации"] }),
      en: serviceContent({ title: "Design", shortDescription: "Architectural and technical preparation for future construction.", fullDescription: "We develop solutions around the brief, site, applicable requirements, and practical delivery so construction starts from agreed documentation.", includedWorks: ["Source-information collection", "Architectural and planning solutions", "Agreed working materials"], suitableFor: ["Clients who need a sound design basis before construction or reconstruction"], workflow: ["Technical brief", "Concept", "Solution approval", "Working documentation"] }),
      hy: serviceContent({ title: "Նախագծում", shortDescription: "Ապագա շինարարության ճարտարապետական և աշխատանքային նախապատրաստում։", fullDescription: "Մշակում ենք լուծումներ՝ հաշվի առնելով խնդիրը, հողամասը, նորմերը և հետագա իրականացումը։", includedWorks: ["Ելակետային տվյալների հավաքագրում", "Ճարտարապետական և հատակագծային լուծումներ", "Համաձայնեցված աշխատանքային նյութեր"], suitableFor: ["Շինարարությունից կամ վերակառուցումից առաջ հիմնավորված նախագիծ պահանջող պատվիրատուներին"], workflow: ["Տեխնիկական առաջադրանք", "Հայեցակարգ", "Լուծումների համաձայնեցում", "Աշխատանքային փաստաթղթեր"] }),
    },
  },
  {
    id: "renovation",
    slug: "renovation",
    isActive: true,
    icon: "paint-roller",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85",
    calculatorCategory: "renovation",
    translations: {
      ru: serviceContent({ title: "Ремонт под ключ", shortDescription: "Комплексный ремонт квартир, домов и коммерческих помещений.", fullDescription: "Организуем весь цикл ремонта: от обследования и демонтажа до инженерных работ, чистовой отделки и сдачи помещения.", includedWorks: ["Демонтаж и подготовка", "Инженерные и отделочные работы", "Финальная проверка и уборка"], suitableFor: ["Владельцам квартир, домов и бизнеса, которым нужен единый ответственный исполнитель"], workflow: ["Осмотр и фиксация задачи", "Смета и план работ", "Черновые и инженерные работы", "Чистовая отделка и сдача"] }),
      en: serviceContent({ title: "Turnkey renovation", shortDescription: "Comprehensive renovation of apartments, houses, and commercial premises.", fullDescription: "We organize the full cycle from survey and demolition through building services, final finishes, and handover.", includedWorks: ["Demolition and preparation", "Building-services and finishing work", "Final inspection and cleaning"], suitableFor: ["Home and business owners who want one accountable delivery partner"], workflow: ["Survey and brief", "Estimate and work plan", "Preparatory and services work", "Final finishes and handover"] }),
      hy: serviceContent({ title: "Վերանորոգում բանալիով", shortDescription: "Բնակարանների, տների և առևտրային տարածքների համալիր վերանորոգում։", fullDescription: "Կազմակերպում ենք ամբողջ ընթացքը՝ զննումից ու ապամոնտաժումից մինչև ինժեներական աշխատանքներ, հարդարում և հանձնում։", includedWorks: ["Ապամոնտաժում և նախապատրաստում", "Ինժեներական և հարդարման աշխատանքներ", "Վերջնական ստուգում և մաքրում"], suitableFor: ["Բնակարանի, տան կամ բիզնեսի սեփականատերերին, ովքեր ցանկանում են մեկ պատասխանատու կատարող"], workflow: ["Զննում և խնդրի ամրագրում", "Նախահաշիվ և պլան", "Սևագործ և ինժեներական աշխատանքներ", "Մաքուր հարդարում և հանձնում"] }),
    },
  },
  {
    id: "monolithic-work",
    slug: "monolithic-work",
    isActive: true,
    icon: "blocks",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=85",
    calculatorCategory: "separate-works",
    translations: {
      ru: serviceContent({ title: "Монолитные работы", shortDescription: "Устройство железобетонных конструкций по проектной документации.", fullDescription: "Выполняем монолитные конструктивные работы с соблюдением проектной геометрии, последовательности и контроля ключевых операций.", includedWorks: ["Подготовка и опалубка", "Армирование", "Бетонирование и контроль выполнения"], suitableFor: ["Заказчикам частного и коммерческого строительства с утверждённым конструктивным проектом"], workflow: ["Проверка проекта и основания", "Опалубочные и арматурные работы", "Бетонирование", "Контроль и распалубка"] }),
      en: serviceContent({ title: "Monolithic concrete work", shortDescription: "Reinforced-concrete structures delivered to approved project documentation.", fullDescription: "We execute monolithic structural work with control of project geometry, sequence, and critical operations.", includedWorks: ["Preparation and formwork", "Reinforcement", "Concrete placement and execution control"], suitableFor: ["Private and commercial clients with an approved structural design"], workflow: ["Design and base review", "Formwork and reinforcement", "Concrete placement", "Inspection and striking"] }),
      hy: serviceContent({ title: "Մոնոլիտ աշխատանքներ", shortDescription: "Երկաթբետոնե կառուցվածքների իրականացում՝ նախագծային փաստաթղթերով։", fullDescription: "Կատարում ենք մոնոլիտ կառուցվածքային աշխատանքներ՝ պահպանելով նախագծային երկրաչափությունը, հերթականությունն ու հիմնական գործողությունների վերահսկումը։", includedWorks: ["Նախապատրաստում և կաղապարում", "Ամրանավորում", "Բետոնացում և կատարման վերահսկում"], suitableFor: ["Հաստատված կոնստրուկտիվ նախագիծ ունեցող մասնավոր և առևտրային պատվիրատուներին"], workflow: ["Նախագծի և հիմքի ստուգում", "Կաղապար և ամրան", "Բետոնացում", "Վերահսկում և ապակաղապարում"] }),
    },
  },
  {
    id: "facade-and-roofing",
    slug: "facade-and-roofing",
    isActive: true,
    icon: "panels-top-left",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",
    calculatorCategory: "separate-works",
    translations: {
      ru: serviceContent({ title: "Фасадные и кровельные работы", shortDescription: "Устройство и обновление фасадов, кровли и защитных узлов здания.", fullDescription: "Организуем наружные работы с учётом проектных решений, водоотведения, защитных слоёв и целостности примыканий.", includedWorks: ["Фасадные системы", "Кровельные узлы", "Водоотведение и примыкания"], suitableFor: ["Владельцам новых и существующих частных или коммерческих зданий"], workflow: ["Обследование и проектные уточнения", "Подготовка основания", "Монтаж системы", "Финальная проверка"] }),
      en: serviceContent({ title: "Facade and roofing work", shortDescription: "Construction and renewal of facades, roofs, and protective building details.", fullDescription: "We organize exterior work around the approved design, drainage, protective layers, and junction integrity.", includedWorks: ["Facade systems", "Roof assemblies", "Drainage and junctions"], suitableFor: ["Owners of new or existing residential and commercial buildings"], workflow: ["Survey and design clarification", "Substrate preparation", "System installation", "Final inspection"] }),
      hy: serviceContent({ title: "Ճակատային և տանիքային աշխատանքներ", shortDescription: "Շենքի ճակատի, տանիքի և պաշտպանական հանգույցների կառուցում ու նորոգում։", fullDescription: "Կազմակերպում ենք արտաքին աշխատանքները՝ հաշվի առնելով նախագիծը, ջրահեռացումը, պաշտպանական շերտերն ու միացումները։", includedWorks: ["Ճակատային համակարգեր", "Տանիքային հանգույցներ", "Ջրահեռացում և միացումներ"], suitableFor: ["Նոր կամ գործող մասնավոր և առևտրային շենքերի սեփականատերերին"], workflow: ["Զննում և նախագծային ճշտումներ", "Հիմքի նախապատրաստում", "Համակարգի տեղադրում", "Վերջնական ստուգում"] }),
    },
  },
] as const satisfies readonly ServiceConfig[];

export type ServiceSlug = (typeof servicesConfig)[number]["slug"];

export function getActiveServices(locale: keyof (typeof servicesConfig)[number]["translations"]) {
  return servicesConfig.filter((service) => service.isActive).map((service) => ({
    ...service,
    content: service.translations[locale],
  }));
}

export function getServiceBySlug(locale: keyof (typeof servicesConfig)[number]["translations"], slug: string) {
  const service = servicesConfig.find((item) => item.isActive && item.slug === slug);
  return service ? { ...service, content: service.translations[locale] } : undefined;
}
