import type { ServiceContent, ServiceWorkflowStep } from "@/types/service";

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
    workflow: readonly (string | ServiceWorkflowStep)[];
  };

function serviceContent(input: ServiceTranslationInput): ServiceContent {
  return {
    ...input,
    heroTitle: input.heroTitle ?? input.title,
    heroDescription: input.shortDescription,
    workflow: input.workflow.map((step) =>
      typeof step === "string" ? { title: step, description: "" } : step
    ),
    priceFactors: input.priceFactors ?? [],
    faq: input.faq ?? [],
    seoTitle: input.seoTitle ?? input.title,
    seoDescription: input.seoDescription ?? input.fullDescription,
  };
}

export const serviceTranslations = {
  houseConstruction: {
    ru: serviceContent({
      title: "Строительство частных домов в Ереване и по всей Армении",
      shortDescription:
        "Строим частные дома: от изучения участка и проекта до фундамента, основных конструкций, кровли, инженерных систем и отделки.",
      fullDescription:
        "Организуем и контролируем этапы строительства дома в Ереване и по всей Армении — от согласованного проекта до проверки и сдачи. Состав работ и стоимость зависят от участка, проекта и выбранной степени готовности.",
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
      primaryCta: "Посмотреть этапы строительства",
      secondaryCta: "Обсудить строительство дома",
      seoTitle: "Строительство домов в Ереване и по всей Армении | SHINEX",
      seoDescription:
        "Строительство частных домов в Ереване и по всей Армении: участок, проект, фундамент, конструкции, инженерные системы и согласованные этапы работ.",
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
      title: "House construction in Yerevan and across Armenia",
      shortDescription:
        "We build private homes from site and design review through foundations, main structure, roofing, building services, and finishes.",
      fullDescription:
        "We organise and control each stage of a home build in Yerevan and across Armenia, from the agreed design to inspection and handover. The scope and cost depend on the site, design, and selected level of completion.",
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
      primaryCta: "View construction stages",
      secondaryCta: "Discuss a home build",
      seoTitle:
        "Private House Construction in Yerevan and across Armenia | SHINEX",
      seoDescription:
        "Private house construction in Yerevan and across Armenia: site and design review, foundations, structure, building services, and agreed work stages.",
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
      title: "Առանձնատների կառուցում Երևանում և ամբողջ Հայաստանում",
      shortDescription:
        "Կառուցում ենք առանձնատներ՝ հողամասի և նախագծի ուսումնասիրությունից մինչև հիմք, հիմնական կառուցվածքներ, տանիք, ինժեներական համակարգեր և հարդարում։",
      fullDescription:
        "Կազմակերպում և վերահսկում ենք տան կառուցման փուլերը Երևանում և ամբողջ Հայաստանում՝ համաձայնեցված նախագծից մինչև ստուգում և հանձնում։ Աշխատանքների կազմն ու արժեքը կախված են հողամասից, նախագծից և աշխատանքների և հարդարման նախատեսված մակարդակից։",
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
        "Շինարարության և հարդարման նախատեսված մակարդակ",
      ],
      priceFactors: [
        "Մակերես և հարկերի քանակ",
        "Հողամասի պայմաններ",
        "Կառուցվածքային և ինժեներական լուծումներ",
        "Շինարարության և հարդարման նախատեսված մակարդակ",
        "Օբյեկտի գտնվելու վայր և տեղափոխման պայմաններ",
      ],
      faq: [
        {
          question: "Ինչպե՞ս է հաշվարկվում տան շինարարության արժեքը",
          answer:
            "Նախնական միջակայքը կախված է մակերեսից, հողամասից, կառուցվածքից, ինժեներական լուծումներից և աշխատանքների և հարդարման նախատեսված մակարդակից։ Ճշգրիտ նախահաշիվը կազմվում է խնդրի և առկա նյութերի ուսումնասիրությունից հետո։",
        },
      ],
      primaryCta: "Դիտել կառուցման փուլերը",
      secondaryCta: "Քննարկել տան կառուցումը",
      seoTitle: "Առանձնատների կառուցում Երևանում և ամբողջ Հայաստանում | SHINEX",
      seoDescription:
        "Առանձնատների կառուցում Երևանում և ամբողջ Հայաստանում՝ հողամասի ու նախագծի ուսումնասիրությունից մինչև հիմք, կառուցվածքներ, ինժեներական համակարգեր և հանձնում։",
      workflow: [
        {
          title: "Հողամասի և նախագծի ուսումնասիրություն",
          description:
            "Ստուգում ենք առկա տվյալները և հաստատում աշխատանքների մեկնարկային պայմանները։",
        },
        {
          title: "Հողային աշխատանքներ և հիմքի կառուցում",
          description:
            "Կատարում ենք նախապատրաստումը և հիմքի աշխատանքները՝ համաձայնեցված նախագծով։",
        },
        {
          title: "Կրող կառուցվածքներ, արտաքին պատեր և միջնապատեր",
          description:
            "Կառուցում ենք տան հիմնական ծավալը և ներքին բաժանումները։",
        },
        {
          title: "Տանիք, դռներ և պատուհաններ",
          description:
            "Տեղադրում ենք տանիքը, դռներն ու պատուհանները՝ շենքը հաջորդ աշխատանքային փուլերին պատրաստելու համար։",
        },
        {
          title: "Ինժեներական համակարգեր",
          description:
            "Տեղադրում ենք էլեկտրականության, ջրամատակարարման, կոյուղու, ջեռուցման և օդափոխության համաձայնեցված լուծումները։",
        },
        {
          title: "Արտաքին և ներքին հարդարում",
          description: "Ավարտում ենք նախատեսված հարդարման աշխատանքները։",
        },
        {
          title: "Ստուգում և հանձնում",
          description:
            "Ձեզ հետ ստուգում ենք կատարված աշխատանքները և հանձնում պատրաստի օբյեկտը։",
        },
      ],
    }),
  },
  interiorDesign: {
    ru: serviceContent({
      title: "Дизайн интерьера в Ереване и по всей Армении",
      shortDescription:
        "Разрабатываем практичный и целостный интерьер: планировочные решения, концепция, подбор материалов, чертежи и документы для реализации.",
      fullDescription:
        "Дизайн-проект помогает начать ремонт с понятными решениями. Планировка организует пространство, концепция определяет стиль и материалы, а рабочие чертежи нужны для реализации. Визуализации, подбор мебели и авторское сопровождение включаются только в согласованный пакет.",
      includedWorks: [
        "Планировка с расстановкой мебели и зонированием",
        "Концепция интерьера и подбор материалов",
        "3D-визуализация — в согласованном пакете",
        "Рабочие чертежи и материалы для реализации",
      ],
      suitableFor: [
        "Квартир и частных домов перед ремонтом",
        "Коммерческих пространств, которым нужен функциональный интерьер",
      ],
      workTypes: [
        "Планировочное решение",
        "Концепция интерьера",
        "Дизайн-проект",
        "Авторское сопровождение — по согласованию",
      ],
      estimateRequirements: [
        "Тип и площадь помещения",
        "План или существующие обмеры",
        "Краткое описание задачи и удобный способ связи",
      ],
      primaryCta: "Посмотреть услугу дизайна",
      secondaryCta: "Обсудить мой проект",
      seoTitle: "Дизайн интерьера в Ереване и по всей Армении | SHINEX",
      seoDescription:
        "Дизайн интерьера квартир, частных домов и коммерческих пространств в Ереване и по всей Армении: планировка, концепция, материалы и рабочие чертежи.",
      workflow: [
        "Предварительная консультация",
        "Разработка планировки",
        "Концепция и материалы",
        "Подготовка согласованных чертежей",
      ],
    }),
    en: serviceContent({
      title: "Interior design in Yerevan and across Armenia",
      shortDescription:
        "We develop practical, complete interiors with layout solutions, a design concept, material selection, drawings, and documents for delivery.",
      fullDescription:
        "A design project helps you start renovation with clear decisions. The layout organises the space, the concept defines the style and materials, and working drawings support delivery. Visualisations, furniture selection, and design supervision are included only in the agreed package.",
      includedWorks: [
        "Layout with furniture placement and zoning",
        "Interior concept and material selection",
        "3D visualisation in the agreed package",
        "Working drawings and delivery materials",
      ],
      suitableFor: [
        "Apartments and private homes before renovation",
        "Commercial spaces that need a functional interior",
      ],
      workTypes: [
        "Layout solution",
        "Interior concept",
        "Design project",
        "Design supervision by agreement",
      ],
      estimateRequirements: [
        "Property type and area",
        "Floor plan or existing measurements",
        "A short brief and preferred contact method",
      ],
      primaryCta: "View the design service",
      secondaryCta: "Discuss my project",
      seoTitle: "Interior Design in Yerevan and across Armenia | SHINEX",
      seoDescription:
        "Interior design for apartments, private homes, and commercial spaces in Yerevan and across Armenia: layouts, concepts, materials, and working drawings.",
      workflow: [
        "Initial consultation",
        "Layout development",
        "Concept and material selection",
        "Preparation of agreed drawings",
      ],
    }),
    hy: serviceContent({
      title: "Ինտերիերի դիզայն Երևանում և ամբողջ Հայաստանում",
      shortDescription:
        "Ստեղծում ենք ֆունկցիոնալ և ամբողջական ինտերիերի լուծումներ՝ հատակագծային լուծումներով, ոճային կոնցեպտով, նյութերի ընտրությամբ, գծագրերով և իրականացման համար անհրաժեշտ փաստաթղթերով։",
      fullDescription:
        "Դիզայն-նախագիծը օգնում է սկսել վերանորոգումը հստակ լուծումներով։ Հատակագծային լուծումը կազմակերպում է տարածքը, ինտերիերի կոնցեպտը սահմանում է ոճն ու նյութերը, իսկ աշխատանքային գծագրերը անհրաժեշտ են իրականացման համար։ 3D վիզուալիզացիան, կահույքի ընտրությունը և հեղինակային ուղեկցումը ներառվում են միայն համաձայնեցված փաթեթում։",
      includedWorks: [
        "Հատակագծային լուծում՝ կահույքի և գոտիների տեղադրմամբ",
        "Ինտերիերի կոնցեպտ և նյութերի ընտրություն",
        "3D վիզուալիզացիա՝ համաձայնեցված փաթեթի դեպքում",
        "Աշխատանքային գծագրեր և իրականացման նյութեր",
      ],
      suitableFor: [
        "Բնակարանների և առանձնատների համար՝ վերանորոգումից առաջ",
        "Առևտրային տարածքների համար, որոնց անհրաժեշտ է ֆունկցիոնալ ինտերիեր",
      ],
      workTypes: [
        "Հատակագծային լուծում",
        "Ինտերիերի կոնցեպտ",
        "Դիզայն-նախագիծ",
        "Հեղինակային ուղեկցում՝ համաձայնեցված դեպքում",
      ],
      estimateRequirements: [
        "Տարածքի տեսակ և մակերես",
        "Հատակագիծ կամ առկա չափագրումներ",
        "Խնդրի կարճ նկարագրություն և կապի հարմար եղանակ",
      ],
      faq: [
        {
          question: "Ի՞նչ է ներառում դիզայն-նախագիծը",
          answer:
            "Դիզայն-նախագիծը կարող է ներառել հատակագծային լուծում, ինտերիերի կոնցեպտ, նյութերի ընտրություն, 3D վիզուալիզացիա և աշխատանքային գծագրեր։ Կազմը հաստատում ենք նախքան աշխատանքների մեկնարկը։",
        },
      ],
      primaryCta: "Դիտել դիզայնի ծառայությունը",
      secondaryCta: "Քննարկել իմ նախագիծը",
      seoTitle: "Ինտերիերի դիզայն Երևանում և ամբողջ Հայաստանում | SHINEX",
      seoDescription:
        "Բնակարանների, առանձնատների և առևտրային տարածքների ինտերիերի դիզայն Երևանում և ամբողջ Հայաստանում՝ հատակագիծ, կոնցեպտ, նյութեր և աշխատանքային գծագրեր։",
      workflow: [
        {
          title: "Նախնական խորհրդատվություն և տվյալների հավաքագրում",
          description:
            "Ճշտում ենք տարածքի գործառույթը, Ձեր նախընտրությունները և առկա տվյալները։",
        },
        {
          title: "Հատակագծային լուծման մշակում",
          description:
            "Առաջարկում ենք կահույքի, գոտիների և անցումների հարմար դասավորություն։",
        },
        {
          title: "Ինտերիերի կոնցեպտ և նյութերի ընտրություն",
          description:
            "Համաձայնեցնում ենք ոճը, գույները, նյութերն ու հիմնական կահույքի լուծումները։",
        },
        {
          title: "Աշխատանքային գծագրերի պատրաստում",
          description:
            "Պատրաստում ենք համաձայնեցված փաթեթի փաստաթղթերը՝ վերանորոգումը սկսելու համար։",
        },
      ],
    }),
  },
  commercialConstruction: {
    ru: serviceContent({
      title: "Ремонт коммерческих помещений",
      shortDescription:
        "Ремонтируем и обустраиваем офисы, магазины, салоны, рестораны и сервисные пространства с учётом работы бизнеса, инженерных требований и функции помещения.",
      fullDescription:
        "Организуем ремонт и обустройство коммерческого помещения с учётом рабочих зон, потока клиентов и инженерных требований. До начала согласовываем этапы, чтобы влияние на работу бизнеса было понятным.",
      includedWorks: [
        "Осмотр и подготовка объекта",
        "Строительные, инженерные и отделочные работы",
        "Предварительное согласование этапов и изменений",
      ],
      suitableFor: [
        "Офисам, магазинам, сервисным и другим коммерческим пространствам",
      ],
      primaryCta: "Обсудить коммерческий объект",
      secondaryCta: "Отправить данные проекта",
      seoTitle: "Ремонт коммерческих помещений в Армении — SHINEX",
      seoDescription:
        "Работы для офисов, магазинов и сервисных пространств в Армении.",
      workflow: [
        "Обсуждение функции помещения и рабочего графика",
        "Осмотр, решения и смета",
        "Строительные, инженерные и отделочные работы",
        "Проверка и передача",
      ],
    }),
    en: serviceContent({
      title: "Commercial space renovation",
      shortDescription:
        "We renovate and fit out offices, shops, salons, restaurants, and service spaces around business operations, building-services requirements, and room function.",
      fullDescription:
        "We organise commercial renovation and fit-out around work zones, customer flow, and building-services requirements. Before work begins, we agree the stages so the impact on business operations is clear.",
      includedWorks: [
        "Survey and property preparation",
        "Construction, building-services, and finishing work",
        "Stages and changes agreed in advance",
      ],
      suitableFor: ["Offices, retail, service, and other commercial spaces"],
      primaryCta: "Discuss a commercial project",
      secondaryCta: "Send project details",
      seoTitle: "Commercial space renovation in Armenia — SHINEX",
      seoDescription:
        "Work for offices, retail, and service spaces in Armenia.",
      workflow: [
        "Discuss room function and operating hours",
        "Survey, solutions, and estimate",
        "Construction, building-services, and finishing work",
        "Inspect and hand over",
      ],
    }),
    hy: serviceContent({
      title: "Առևտրային տարածքների վերանորոգում",
      shortDescription:
        "Վերանորոգում և կառուցապատում ենք գրասենյակներ, խանութներ, սրահներ, ռեստորաններ և սպասարկման տարածքներ՝ հաշվի առնելով բիզնեսի աշխատանքը, ինժեներական պահանջներն ու տարածքի գործառույթը։",
      fullDescription:
        "Կազմակերպում ենք առևտրային տարածքի վերանորոգումն ու կառուցապատումը՝ աշխատանքային գոտիների, հաճախորդների հոսքի և ինժեներական պահանջների հաշվառմամբ։ Նախքան մեկնարկը համաձայնեցնում ենք փուլերը, որպեսզի բիզնեսի աշխատանքի վրա ազդեցությունը հասկանալի լինի։",
      includedWorks: [
        "Օբյեկտի զննում և նախապատրաստում",
        "Շինարարական, ինժեներական և հարդարման աշխատանքներ",
        "Փուլերի և փոփոխությունների նախնական համաձայնեցում",
      ],
      suitableFor: [
        "Գրասենյակների, խանութների, սպասարկման և այլ առևտրային տարածքների համար",
      ],
      primaryCta: "Քննարկել առևտրային օբյեկտը",
      secondaryCta: "Ուղարկել նախագծի տվյալները",
      seoTitle: "Առևտրային տարածքների վերանորոգում Հայաստանում — SHINEX",
      seoDescription:
        "Աշխատանքներ գրասենյակների, խանութների և սպասարկման տարածքների համար Հայաստանում։",
      workflow: [
        {
          title: "Տարածքի գործառույթի և աշխատանքային ժամերի քննարկում",
          description:
            "Ճշտում ենք բիզնեսի ընթացքը, հասանելի ժամերը և տարածքի գործառույթը։",
        },
        {
          title: "Զննում, լուծումների և նախահաշվի պատրաստում",
          description:
            "Կազմում ենք աշխատանքների հերթականությունն ու նախնական հաշվարկը։",
        },
        {
          title: "Շինարարական, ինժեներական և հարդարման աշխատանքներ",
          description:
            "Իրականացնում ենք համաձայնեցված աշխատանքներն ու վերահսկում փուլերը։",
        },
        {
          title: "Ստուգում և հանձնում",
          description: "Ստուգում ենք արդյունքը և հանձնում ավարտված տարածքը։",
        },
      ],
    }),
  },
  design: {
    ru: serviceContent({
      title: "Архитектурное проектирование",
      shortDescription:
        "Архитектурные решения, планировка здания и рабочая документация для подготовки к строительству.",
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
      title: "Architectural design",
      shortDescription:
        "Architectural solutions, building layouts, and working documentation to prepare for construction.",
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
      title: "Ճարտարապետական նախագծում",
      shortDescription:
        "Ճարտարապետական լուծումներ, շենքի հատակագիծ և աշխատանքային փաստաթղթեր՝ շինարարությանը նախապատրաստվելու համար։",
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
        "Выполняем косметический, капитальный и ремонт под ключ. Организуем демонтаж, электрику и сантехнику, подготовку стен и пола, чистовую отделку и сдачу объекта.",
      fullDescription:
        "Ремонтируем квартиры и частные дома полностью или отдельными этапами. Косметический ремонт обновляет отделку, капитальный затрагивает основные системы и поверхности, а ремонт под ключ охватывает весь процесс до сдачи.",
      includedWorks: [
        "Осмотр и замеры",
        "Планирование и предварительная смета",
        "Демонтаж и подготовка",
        "Электрика, сантехника, черновые и отделочные работы",
        "Финальная проверка и передача",
      ],
      suitableFor: [
        "Владельцам квартир и частных домов",
        "Тем, кто ремонтирует квартиру в новостройке или на вторичном рынке",
      ],
      customerTypes: [
        "Квартира в новостройке",
        "Квартира на вторичном рынке",
        "Частный дом",
        "Существующий интерьер",
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
      primaryCta: "Посмотреть варианты ремонта",
      secondaryCta: "Получить предварительный расчёт",
      seoTitle: "Ремонт квартир и домов под ключ в Армении — SHINEX",
      seoDescription:
        "Ремонт квартир и частных домов под ключ в Ереване и по всей Армении: осмотр, предварительная оценка и согласование этапов.",
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
        "We deliver cosmetic, major, and turnkey renovation. We organise demolition, electrical and plumbing work, wall and floor preparation, final finishes, and handover.",
      fullDescription:
        "We renovate apartments and private homes as a complete service or in individual stages. Cosmetic renovation refreshes finishes, major renovation changes key systems and surfaces, and turnkey renovation covers the full process through handover.",
      includedWorks: [
        "Survey and measurements",
        "Planning and an initial estimate",
        "Demolition and preparation",
        "Electrical, plumbing, preparatory, and finishing work",
        "Final inspection and handover",
      ],
      suitableFor: [
        "Apartment and private home owners",
        "People renovating a new-build or existing apartment",
      ],
      customerTypes: [
        "New-build apartment",
        "Existing apartment",
        "Private house",
        "Existing interior",
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
      primaryCta: "View renovation options",
      secondaryCta: "Get an initial estimate",
      seoTitle: "Turnkey apartment and house renovation in Armenia — SHINEX",
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
        "Կատարում ենք կոսմետիկ, կապիտալ և ամբողջական վերանորոգում։ Կազմակերպում ենք ապամոնտաժումը, էլեկտրական և սանտեխնիկական աշխատանքները, պատերի ու հատակի պատրաստումը, վերջնական հարդարումը և օբյեկտի հանձնումը։",
      fullDescription:
        "Վերանորոգում ենք բնակարաններ և առանձնատներ՝ ամբողջական կամ առանձին փուլերով։ Կոսմետիկ վերանորոգումը թարմացնում է հարդարումը, կապիտալ վերանորոգումը ներառում է հիմնական համակարգերի և մակերեսների փոփոխությունը, իսկ ամբողջական տարբերակում կազմակերպում ենք ամբողջ ընթացքը մինչև հանձնումը։",
      includedWorks: [
        "Զննում և չափագրում",
        "Պլանավորում և նախնական հաշվարկ",
        "Ապամոնտաժում և նախապատրաստում",
        "Էլեկտրական, սանտեխնիկական, սևագործ և հարդարման աշխատանքներ",
        "Վերջնական ստուգում և հանձնում",
      ],
      suitableFor: [
        "Բնակարանների և առանձնատների սեփականատերերին",
        "Նորակառույց կամ երկրորդային բնակարան վերանորոգողներին",
      ],
      customerTypes: [
        "Նորակառույց բնակարան",
        "Երկրորդային շուկայի բնակարան",
        "Առանձնատուն",
        "Գոյություն ունեցող ինտերիեր",
      ],
      workTypes: [
        "Կոսմետիկ վերանորոգում",
        "Կապիտալ վերանորոգում",
        "Բնակարանի ամբողջական վերանորոգում",
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
        "Օբյեկտի գտնվելու վայր և տեղափոխման պայմաններ",
      ],
      faq: [
        {
          question: "Ինչի՞ց է կախված վերանորոգման արժեքը",
          answer:
            "Վերանորոգման արժեքը կախված է մակերեսից, տարածքի վիճակից, ապամոնտաժման, ինժեներական աշխատանքների, հարդարման բարդության և նյութերի ընտրության ծավալից։ Նախնական արժեքը կարող եք հաշվարկել կայքում, իսկ ճշգրիտ նախահաշիվը կազմում ենք օբյեկտի զննումից հետո։",
        },
        {
          question: "Կարո՞ղ եմ պատվիրել վերանորոգման առանձին փուլեր",
          answer:
            "Այո, կարող եք պատվիրել միայն անհրաժեշտ փուլերը՝ օրինակ էլեկտրականություն, սանտեխնիկա, սալիկապատում կամ հարդարում։ Ուղարկեք օբյեկտի տվյալները, և կճշտենք հաշվարկի համար անհրաժեշտ մանրամասները։",
        },
      ],
      primaryCta: "Դիտել վերանորոգման տարբերակները",
      secondaryCta: "Ստանալ նախնական հաշվարկ",
      seoTitle: "Բնակարանների ամբողջական վերանորոգում Հայաստանում — SHINEX",
      seoDescription:
        "Բնակարանների և առանձնատների ամբողջական վերանորոգում Երևանում և ամբողջ Հայաստանում՝ զննում, նախնական գնահատում և փուլերի համաձայնեցում։",
      workflow: [
        {
          title: "Օբյեկտի զննում և չափագրում",
          description:
            "Չափագրում ենք տարածքը, գնահատում ներկա վիճակը և հավաքում հաշվարկի համար անհրաժեշտ տվյալները։",
        },
        {
          title: "Պլանավորում և նախնական հաշվարկ",
          description:
            "Հաստատում ենք աշխատանքների ցանկը, հերթականությունը և նախնական արժեքը։",
        },
        {
          title: "Ապամոնտաժում և նախապատրաստում",
          description:
            "Ազատում և պատրաստում ենք տարածքը հաջորդ աշխատանքների համար։",
        },
        {
          title: "Ինժեներական և սևագործ աշխատանքներ",
          description:
            "Կատարում ենք էլեկտրական, սանտեխնիկական և մակերեսների պատրաստման աշխատանքները։",
        },
        {
          title: "Մաքուր հարդարում",
          description:
            "Ավարտում ենք սալիկապատումը, պատերի, հատակի և առաստաղի հարդարումը։",
        },
        {
          title: "Վերջնական ստուգում և հանձնում",
          description:
            "Ստուգում ենք կատարվածը և հանձնում պատրաստի բնակարանը կամ տունը։",
        },
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
