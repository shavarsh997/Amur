import type { ServiceContent } from "@/types/service";

type ServiceTranslationInput = Pick<
  ServiceContent,
  | "title"
  | "shortDescription"
  | "fullDescription"
  | "includedWorks"
  | "suitableFor"
> &
  Partial<
    Pick<
      ServiceContent,
      | "shortTitle"
      | "heroTitle"
      | "customerTypes"
      | "workTypes"
      | "priceFactors"
      | "estimateRequirements"
      | "faq"
      | "primaryCta"
      | "secondaryCta"
      | "seoTitle"
      | "seoDescription"
    >
  > & {
    workflow: readonly string[];
  };

function serviceContent(input: ServiceTranslationInput): ServiceContent {
  return {
    ...input,
    heroTitle: input.heroTitle ?? input.title,
    heroDescription: input.shortDescription,
    workflow: input.workflow.map((title) => ({ title, description: "" })),
    priceFactors: input.priceFactors ?? [],
    faq: input.faq ?? [],
    seoTitle: input.seoTitle ?? input.title,
    seoDescription: input.seoDescription ?? input.fullDescription,
  };
}

export const serviceTranslations = {
  houseConstruction: {
    ru: serviceContent({
      title: "Строительство частных домов",
      shortDescription:
        "Помогаем организовать строительство частного дома: предварительная оценка, подготовительные работы, основные конструкции, инженерные системы и отделка.",
      fullDescription:
        "Помогаем пройти основные этапы строительства частного дома: оценку участка и проекта, подготовительные работы, конструкции, инженерные решения и отделку.",
      includedWorks: [
        "Изучение участка и проекта",
        "Подготовительные и конструктивные работы",
        "Инженерные решения и отделка",
      ],
      suitableFor: [
        "Владельцам участка, которые планируют строительство частного дома",
      ],
      customerTypes: [
        "Есть участок и проект",
        "Есть участок, но проект ещё уточняется",
        "Нужно оценить следующий этап строительства",
      ],
      estimateRequirements: [
        "Ориентировочная площадь дома",
        "Материалы по участку и проекту, если они есть",
        "Планируемая стадия готовности",
      ],
      priceFactors: [
        "Площадь и этажность",
        "Условия участка",
        "Конструктивные и инженерные решения",
        "Степень готовности и отделка",
        "Регион и логистика",
      ],
      faq: [
        {
          question: "Как рассчитывается стоимость строительства дома?",
          answer:
            "Предварительный диапазон зависит от площади, участка, конструкции, инженерных решений и выбранной степени готовности. Точная смета формируется после изучения задачи и имеющихся материалов.",
        },
      ],
      primaryCta: "Подробнее о строительстве",
      secondaryCta: "Обсудить строительство",
      seoTitle: "Строительство частных домов в Армении — Shinex",
      seoDescription:
        "Строительство частных домов в Ереване и регионах Армении: предварительная оценка, этапы работ и согласование решений.",
      workflow: [
        "Изучение участка и проекта",
        "Подготовка",
        "Фундамент и конструктив",
        "Стены и кровля",
        "Инженерные системы",
        "Отделка",
        "Проверка и сдача",
      ],
    }),
    en: serviceContent({
      title: "Private house construction",
      shortDescription:
        "We help organize a private home build: initial assessment, preparation, structure, building services, and finishes.",
      fullDescription:
        "We help organize the key stages of a private home build: site and design review, preparation, structure, building services, and finishes.",
      includedWorks: [
        "Site and design review",
        "Preparation and structural work",
        "Building-services solutions and finishes",
      ],
      suitableFor: ["Landowners planning a private home"],
      customerTypes: [
        "A site and design are available",
        "A site is available while the design is being clarified",
        "The next construction stage needs an assessment",
      ],
      estimateRequirements: [
        "Approximate house area",
        "Available site and design information",
        "Planned level of completion",
      ],
      priceFactors: [
        "Area and number of floors",
        "Site conditions",
        "Structural and building-services solutions",
        "Level of completion and finishes",
        "Region and logistics",
      ],
      faq: [
        {
          question: "How is the cost of a home build calculated?",
          answer:
            "An initial range depends on the area, site, structure, building services, and selected level of completion. A precise estimate is prepared after reviewing the brief and available information.",
        },
      ],
      primaryCta: "Learn about construction",
      secondaryCta: "Discuss construction",
      seoTitle: "Private house construction in Armenia — Shinex",
      seoDescription:
        "Private house construction in Yerevan and across Armenia: initial assessment, work stages, and coordinated decisions.",
      workflow: [
        "Site and design review",
        "Preparation",
        "Foundation and structure",
        "Walls and roof",
        "Building services",
        "Finishes",
        "Inspection and handover",
      ],
    }),
    hy: serviceContent({
      title: "Առանձնատների կառուցում",
      shortDescription:
        "Օգնում ենք կազմակերպել առանձնատան շինարարությունը՝ նախնական գնահատում, նախապատրաստական աշխատանքներ, հիմնական կառուցվածքներ, ինժեներական համակարգեր և հարդարում։",
      fullDescription:
        "Օգնում ենք անցնել առանձնատան շինարարության հիմնական փուլերը՝ հողամասի և նախագծի գնահատում, նախապատրաստում, կառուցվածքներ, ինժեներական լուծումներ և հարդարում։",
      includedWorks: [
        "Հողամասի և նախագծի ուսումնասիրություն",
        "Նախապատրաստական և կառուցվածքային աշխատանքներ",
        "Ինժեներական լուծումներ և հարդարում",
      ],
      suitableFor: [
        "Հողամասի սեփականատերերին, որոնք նախատեսում են առանձնատուն կառուցել",
      ],
      customerTypes: [
        "Կա հողամաս և նախագիծ",
        "Կա հողամաս, իսկ նախագիծը ճշտվում է",
        "Անհրաժեշտ է գնահատել շինարարության հաջորդ փուլը",
      ],
      estimateRequirements: [
        "Տան մոտավոր մակերես",
        "Հողամասի և նախագծի առկա նյութեր",
        "Նախատեսվող պատրաստվածության աստիճան",
      ],
      priceFactors: [
        "Մակերես և հարկերի քանակ",
        "Հողամասի պայմաններ",
        "Կառուցվածքային և ինժեներական լուծումներ",
        "Պատրաստվածության աստիճան և հարդարում",
        "Մարզ և լոգիստիկա",
      ],
      faq: [
        {
          question: "Ինչպե՞ս է հաշվարկվում տան շինարարության արժեքը",
          answer:
            "Նախնական միջակայքը կախված է մակերեսից, հողամասից, կառուցվածքից, ինժեներական լուծումներից և ընտրված պատրաստվածության աստիճանից։ Ճշգրիտ նախահաշիվը կազմվում է խնդրի և առկա նյութերի ուսումնասիրությունից հետո։",
        },
      ],
      primaryCta: "Մանրամասն՝ շինարարության մասին",
      secondaryCta: "Քննարկել շինարարությունը",
      seoTitle: "Առանձնատների կառուցում Հայաստանում — Shinex",
      seoDescription:
        "Առանձնատների կառուցում Երևանում և Հայաստանի մարզերում՝ նախնական գնահատում, աշխատանքի փուլեր և լուծումների համաձայնեցում։",
      workflow: [
        "Հողամասի և նախագծի ուսումնասիրություն",
        "Նախապատրաստում",
        "Հիմք և կառուցվածք",
        "Պատեր և տանիք",
        "Ինժեներական համակարգեր",
        "Հարդարում",
        "Ստուգում և հանձնում",
      ],
    }),
  },
  commercialConstruction: {
    ru: serviceContent({
      title: "Ремонт и строительство коммерческих помещений",
      shortDescription:
        "Работы для офисов, магазинов, сервисных и других коммерческих пространств с учетом назначения, инженерных требований и будущей эксплуатации.",
      fullDescription:
        "Помогаем организовать ремонт или строительство коммерческого помещения с учетом его функций, инженерных требований и дальнейшего использования.",
      includedWorks: [
        "Осмотр и подготовка объекта",
        "Строительные, инженерные и отделочные работы",
        "Согласование этапов с заказчиком",
      ],
      suitableFor: [
        "Офисам, магазинам, сервисным и другим коммерческим пространствам",
      ],
      primaryCta: "Обсудить коммерческий объект",
      secondaryCta: "Получить предварительную оценку",
      seoTitle: "Ремонт и строительство коммерческих помещений — Shinex",
      seoDescription:
        "Работы для офисов, магазинов и сервисных пространств в Армении.",
      workflow: [
        "Обсуждение задачи",
        "Подготовка решения",
        "Выполнение работ",
        "Проверка и передача",
      ],
    }),
    en: serviceContent({
      title: "Commercial renovation and construction",
      shortDescription:
        "Work for offices, retail, service, and other commercial spaces, shaped around their purpose, building-services requirements, and future operation.",
      fullDescription:
        "We help organize the renovation or construction of a commercial space around its use, building-services requirements, and day-to-day operation.",
      includedWorks: [
        "Survey and property preparation",
        "Construction, building-services, and finishing work",
        "Stage coordination with the client",
      ],
      suitableFor: ["Offices, retail, service, and other commercial spaces"],
      primaryCta: "Discuss a commercial project",
      secondaryCta: "Get an initial assessment",
      seoTitle: "Commercial renovation and construction — Shinex",
      seoDescription:
        "Work for offices, retail, and service spaces in Armenia.",
      workflow: [
        "Discuss the brief",
        "Prepare the solution",
        "Complete the work",
        "Inspect and hand over",
      ],
    }),
    hy: serviceContent({
      title: "Առևտրային տարածքների վերանորոգում և շինարարություն",
      shortDescription:
        "Աշխատանքներ գրասենյակների, խանութների, սպասարկման և այլ առևտրային տարածքների համար՝ հաշվի առնելով նպատակը, ինժեներական պահանջները և հետագա շահագործումը։",
      fullDescription:
        "Օգնում ենք կազմակերպել առևտրային տարածքի վերանորոգումը կամ շինարարությունը՝ հաշվի առնելով դրա գործառույթը, ինժեներական պահանջները և հետագա օգտագործումը։",
      includedWorks: [
        "Օբյեկտի զննում և նախապատրաստում",
        "Շինարարական, ինժեներական և հարդարման աշխատանքներ",
        "Փուլերի համաձայնեցում պատվիրատուի հետ",
      ],
      suitableFor: [
        "Գրասենյակների, խանութների, սպասարկման և այլ առևտրային տարածքների համար",
      ],
      primaryCta: "Քննարկել առևտրային օբյեկտը",
      secondaryCta: "Ստանալ նախնական գնահատում",
      seoTitle: "Առևտրային տարածքների վերանորոգում և շինարարություն — Shinex",
      seoDescription:
        "Աշխատանքներ գրասենյակների, խանութների և սպասարկման տարածքների համար Հայաստանում։",
      workflow: [
        "Խնդրի քննարկում",
        "Լուծման նախապատրաստում",
        "Աշխատանքների կատարում",
        "Ստուգում և հանձնում",
      ],
    }),
  },
  design: {
    ru: serviceContent({
      title: "Проектирование",
      shortDescription:
        "Архитектурная и рабочая подготовка будущего строительства.",
      fullDescription:
        "Формируем решения с учётом задачи, участка, норм и последующей реализации, чтобы строительство опиралось на согласованную документацию.",
      includedWorks: [
        "Сбор исходных данных",
        "Архитектурные и планировочные решения",
        "Рабочие материалы в согласованном составе",
      ],
      suitableFor: [
        "Заказчикам, которым нужна обоснованная основа перед строительством или реконструкцией",
      ],
      workflow: [
        "Техническое задание",
        "Концепция",
        "Согласование решений",
        "Подготовка рабочей документации",
      ],
    }),
    en: serviceContent({
      title: "Design",
      shortDescription:
        "Architectural and technical preparation for future construction.",
      fullDescription:
        "We develop solutions around the brief, site, applicable requirements, and practical delivery so construction starts from agreed documentation.",
      includedWorks: [
        "Source-information collection",
        "Architectural and planning solutions",
        "Agreed working materials",
      ],
      suitableFor: [
        "Clients who need a sound design basis before construction or reconstruction",
      ],
      workflow: [
        "Technical brief",
        "Concept",
        "Solution approval",
        "Working documentation",
      ],
    }),
    hy: serviceContent({
      title: "Նախագծում",
      shortDescription:
        "Ապագա շինարարության ճարտարապետական և աշխատանքային նախապատրաստում։",
      fullDescription:
        "Մշակում ենք լուծումներ՝ հաշվի առնելով խնդիրը, հողամասը, նորմերը և հետագա իրականացումը։",
      includedWorks: [
        "Ելակետային տվյալների հավաքագրում",
        "Ճարտարապետական և հատակագծային լուծումներ",
        "Համաձայնեցված աշխատանքային նյութեր",
      ],
      suitableFor: [
        "Շինարարությունից կամ վերակառուցումից առաջ հիմնավորված նախագիծ պահանջող պատվիրատուներին",
      ],
      workflow: [
        "Տեխնիկական առաջադրանք",
        "Հայեցակարգ",
        "Լուծումների համաձայնեցում",
        "Աշխատանքային փաստաթղթեր",
      ],
    }),
  },
  renovation: {
    ru: serviceContent({
      title: "Ремонт квартир и частных домов",
      shortDescription:
        "Выполняем комплексный и поэтапный ремонт квартир и домов: от оценки состояния объекта и подготовки сметы до инженерных, черновых и отделочных работ.",
      fullDescription:
        "Начинаем с состояния объекта и ожидаемого результата. После осмотра определяем состав работ, последовательность этапов и предварительный диапазон стоимости.",
      includedWorks: [
        "Осмотр и замеры",
        "Планирование и предварительная смета",
        "Демонтаж и подготовка",
        "Инженерные и отделочные работы",
        "Финальная проверка и передача",
      ],
      suitableFor: [
        "Владельцам квартир и частных домов",
        "Тем, кто обновляет существующий интерьер",
        "Коммерческим помещениям как отдельному случаю",
      ],
      customerTypes: [
        "Квартира в новостройке",
        "Квартира на вторичном рынке",
        "Частный дом",
        "Существующий интерьер",
        "Коммерческое помещение",
      ],
      workTypes: [
        "Косметический ремонт",
        "Капитальный ремонт",
        "Ремонт под ключ",
        "Отдельные этапы",
      ],
      estimateRequirements: [
        "Тип и состояние объекта",
        "Ориентировочная площадь",
        "Что нужно изменить или выполнить",
        "Адрес объекта и удобное время для связи",
      ],
      priceFactors: [
        "Площадь и состояние помещения",
        "Объём демонтажа",
        "Инженерные работы",
        "Сложность отделки",
        "Материалы и дизайн",
        "Регион и логистика",
      ],
      faq: [
        {
          question: "От чего зависит стоимость ремонта?",
          answer:
            "От площади, состояния помещения, объема демонтажа, инженерных работ, сложности отделки и выбранных материалов. Предварительный диапазон можно получить через калькулятор, а точная смета формируется после уточнения задачи и осмотра.",
        },
        {
          question: "Можно заказать отдельные этапы ремонта?",
          answer:
            "Да, состав работ обсуждается для конкретной задачи. После осмотра можно определить, нужен ли комплексный ремонт или отдельные этапы.",
        },
      ],
      primaryCta: "Подробнее о ремонте",
      secondaryCta: "Обсудить ремонт",
      seoTitle: "Ремонт квартир и домов под ключ в Армении — Shinex",
      seoDescription:
        "Ремонт квартир и частных домов под ключ в Ереване и регионах Армении: осмотр, предварительная оценка и согласование этапов.",
      workflow: [
        "Осмотр и обсуждение задачи",
        "Планирование и предварительная смета",
        "Демонтаж и подготовка",
        "Инженерные и черновые работы",
        "Чистовая отделка",
        "Финальная проверка и передача",
      ],
    }),
    en: serviceContent({
      title: "Apartment and private house renovation",
      shortDescription:
        "We complete full and phased apartment and house renovation, from assessing the property and preparing an estimate through building-services, preparatory, and finishing work.",
      fullDescription:
        "We begin with the property’s condition and the expected result. After a survey, we define the scope, sequence of stages, and an initial cost range.",
      includedWorks: [
        "Survey and measurements",
        "Planning and an initial estimate",
        "Demolition and preparation",
        "Building-services and finishing work",
        "Final inspection and handover",
      ],
      suitableFor: [
        "Apartment and private home owners",
        "People updating an existing interior",
        "Commercial spaces as a separate case",
      ],
      customerTypes: [
        "New-build apartment",
        "Existing apartment",
        "Private house",
        "Existing interior",
        "Commercial space",
      ],
      workTypes: [
        "Cosmetic renovation",
        "Major renovation",
        "Turnkey renovation",
        "Separate stages",
      ],
      estimateRequirements: [
        "Property type and condition",
        "Approximate area",
        "What needs to change or be completed",
        "Property address and a convenient time to connect",
      ],
      priceFactors: [
        "Area and current condition",
        "Demolition scope",
        "Building-services work",
        "Finish complexity",
        "Materials and design",
        "Region and logistics",
      ],
      faq: [
        {
          question: "What affects the renovation cost?",
          answer:
            "It depends on the area, property condition, demolition scope, building-services work, finish complexity, and selected materials. An initial range can be explored with the calculator; a precise estimate follows clarification and a survey.",
        },
        {
          question: "Can separate renovation stages be ordered?",
          answer:
            "Yes. The scope is discussed for the particular project, and a survey helps determine whether a full renovation or individual stages are suitable.",
        },
      ],
      primaryCta: "Learn about renovation",
      secondaryCta: "Discuss renovation",
      seoTitle: "Turnkey apartment and house renovation in Armenia — Shinex",
      seoDescription:
        "Turnkey apartment and private house renovation in Yerevan and across Armenia: survey, initial assessment, and agreed stages.",
      workflow: [
        "Survey and brief",
        "Planning and initial estimate",
        "Demolition and preparation",
        "Building services and preparatory work",
        "Final finishes",
        "Final inspection and handover",
      ],
    }),
    hy: serviceContent({
      title: "Բնակարանների և առանձնատների վերանորոգում",
      shortDescription:
        "Կատարում ենք բնակարանների և տների համալիր ու փուլային վերանորոգում՝ օբյեկտի վիճակի գնահատումից և նախահաշվի պատրաստումից մինչև ինժեներական, սևագործ և հարդարման աշխատանքներ։",
      fullDescription:
        "Սկսում ենք օբյեկտի վիճակից և ակնկալվող արդյունքից։ Զննումից հետո որոշում ենք աշխատանքների կազմը, փուլերի հերթականությունը և արժեքի նախնական միջակայքը։",
      includedWorks: [
        "Զննում և չափագրում",
        "Պլանավորում և նախնական նախահաշիվ",
        "Ապամոնտաժում և նախապատրաստում",
        "Ինժեներական և հարդարման աշխատանքներ",
        "Վերջնական ստուգում և հանձնում",
      ],
      suitableFor: [
        "Բնակարանների և առանձնատների սեփականատերերին",
        "Գոյություն ունեցող ինտերիերը թարմացնողներին",
        "Առևտրային տարածքներին՝ որպես առանձին դեպք",
      ],
      customerTypes: [
        "Նորակառույց բնակարան",
        "Երկրորդային շուկայի բնակարան",
        "Առանձնատուն",
        "Գոյություն ունեցող ինտերիեր",
        "Առևտրային տարածք",
      ],
      workTypes: [
        "Կոսմետիկ վերանորոգում",
        "Կապիտալ վերանորոգում",
        "Բանալիով վերանորոգում",
        "Առանձին փուլեր",
      ],
      estimateRequirements: [
        "Օբյեկտի տեսակն ու վիճակը",
        "Մոտավոր մակերես",
        "Ինչ է պետք փոխել կամ կատարել",
        "Օբյեկտի հասցեն և կապի հարմար ժամանակը",
      ],
      priceFactors: [
        "Մակերես և տարածքի վիճակ",
        "Ապամոնտաժման ծավալ",
        "Ինժեներական աշխատանքներ",
        "Հարդարման բարդություն",
        "Նյութեր և նախագիծ",
        "Մարզ և լոգիստիկա",
      ],
      faq: [
        {
          question: "Ինչի՞ց է կախված վերանորոգման արժեքը",
          answer:
            "Այն կախված է մակերեսից, տարածքի վիճակից, ապամոնտաժման ծավալից, ինժեներական աշխատանքներից, հարդարման բարդությունից և ընտրված նյութերից։ Նախնական միջակայքը կարելի է դիտարկել հաշվիչով, իսկ ճշգրիտ նախահաշիվը կազմվում է խնդրի ճշտումից և զննումից հետո։",
        },
        {
          question: "Կարո՞ղ եմ պատվիրել վերանորոգման առանձին փուլեր",
          answer:
            "Այո, աշխատանքների կազմը քննարկվում է կոնկրետ խնդրի համար։ Զննումից հետո հնարավոր է որոշել՝ անհրաժեշտ է համալիր վերանորոգում, թե առանձին փուլեր։",
        },
      ],
      primaryCta: "Մանրամասն՝ վերանորոգման մասին",
      secondaryCta: "Քննարկել վերանորոգումը",
      seoTitle:
        "Բնակարանների և տների վերանորոգում բանալիով Հայաստանում — Shinex",
      seoDescription:
        "Բնակարանների և առանձնատների բանալիով վերանորոգում Երևանում և Հայաստանի մարզերում՝ զննում, նախնական գնահատում և փուլերի համաձայնեցում։",
      workflow: [
        "Զննում և խնդրի քննարկում",
        "Պլանավորում և նախնական նախահաշիվ",
        "Ապամոնտաժում և նախապատրաստում",
        "Ինժեներական և սևագործ աշխատանքներ",
        "Մաքուր հարդարում",
        "Վերջնական ստուգում և հանձնում",
      ],
    }),
  },
  monolithicWork: {
    ru: serviceContent({
      title: "Монолитные работы",
      shortDescription:
        "Устройство железобетонных конструкций по проектной документации.",
      fullDescription:
        "Выполняем монолитные конструктивные работы с соблюдением проектной геометрии, последовательности и контроля ключевых операций.",
      includedWorks: [
        "Подготовка и опалубка",
        "Армирование",
        "Бетонирование и контроль выполнения",
      ],
      suitableFor: [
        "Заказчикам частного и коммерческого строительства с утверждённым конструктивным проектом",
      ],
      workflow: [
        "Проверка проекта и основания",
        "Опалубочные и арматурные работы",
        "Бетонирование",
        "Контроль и распалубка",
      ],
    }),
    en: serviceContent({
      title: "Monolithic concrete work",
      shortDescription:
        "Reinforced-concrete structures delivered to approved project documentation.",
      fullDescription:
        "We execute monolithic structural work with control of project geometry, sequence, and critical operations.",
      includedWorks: [
        "Preparation and formwork",
        "Reinforcement",
        "Concrete placement and execution control",
      ],
      suitableFor: [
        "Private and commercial clients with an approved structural design",
      ],
      workflow: [
        "Design and base review",
        "Formwork and reinforcement",
        "Concrete placement",
        "Inspection and striking",
      ],
    }),
    hy: serviceContent({
      title: "Մոնոլիտ աշխատանքներ",
      shortDescription:
        "Երկաթբետոնե կառուցվածքների իրականացում՝ նախագծային փաստաթղթերով։",
      fullDescription:
        "Կատարում ենք մոնոլիտ կառուցվածքային աշխատանքներ՝ պահպանելով նախագծային երկրաչափությունը, հերթականությունն ու հիմնական գործողությունների վերահսկումը։",
      includedWorks: [
        "Նախապատրաստում և կաղապարում",
        "Ամրանավորում",
        "Բետոնացում և կատարման վերահսկում",
      ],
      suitableFor: [
        "Հաստատված կոնստրուկտիվ նախագիծ ունեցող մասնավոր և առևտրային պատվիրատուներին",
      ],
      workflow: [
        "Նախագծի և հիմքի ստուգում",
        "Կաղապար և ամրան",
        "Բետոնացում",
        "Վերահսկում և ապակաղապարում",
      ],
    }),
  },
  facadeAndRoofing: {
    ru: serviceContent({
      title: "Фасадные и кровельные работы",
      shortDescription:
        "Устройство и обновление фасадов, кровли и защитных узлов здания.",
      fullDescription:
        "Организуем наружные работы с учётом проектных решений, водоотведения, защитных слоёв и целостности примыканий.",
      includedWorks: [
        "Фасадные системы",
        "Кровельные узлы",
        "Водоотведение и примыкания",
      ],
      suitableFor: [
        "Владельцам новых и существующих частных или коммерческих зданий",
      ],
      workflow: [
        "Обследование и проектные уточнения",
        "Подготовка основания",
        "Монтаж системы",
        "Финальная проверка",
      ],
    }),
    en: serviceContent({
      title: "Facade and roofing work",
      shortDescription:
        "Construction and renewal of facades, roofs, and protective building details.",
      fullDescription:
        "We organize exterior work around the approved design, drainage, protective layers, and junction integrity.",
      includedWorks: [
        "Facade systems",
        "Roof assemblies",
        "Drainage and junctions",
      ],
      suitableFor: [
        "Owners of new or existing residential and commercial buildings",
      ],
      workflow: [
        "Survey and design clarification",
        "Substrate preparation",
        "System installation",
        "Final inspection",
      ],
    }),
    hy: serviceContent({
      title: "Ճակատային և տանիքային աշխատանքներ",
      shortDescription:
        "Շենքի ճակատի, տանիքի և պաշտպանական հանգույցների կառուցում ու նորոգում։",
      fullDescription:
        "Կազմակերպում ենք արտաքին աշխատանքները՝ հաշվի առնելով նախագիծը, ջրահեռացումը, պաշտպանական շերտերն ու միացումները։",
      includedWorks: [
        "Ճակատային համակարգեր",
        "Տանիքային հանգույցներ",
        "Ջրահեռացում և միացումներ",
      ],
      suitableFor: [
        "Նոր կամ գործող մասնավոր և առևտրային շենքերի սեփականատերերին",
      ],
      workflow: [
        "Զննում և նախագծային ճշտումներ",
        "Հիմքի նախապատրաստում",
        "Համակարգի տեղադրում",
        "Վերջնական ստուգում",
      ],
    }),
  },
} satisfies Record<string, Record<"hy" | "ru" | "en", ServiceContent>>;
