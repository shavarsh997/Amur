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
        "Организуем и контролируем этапы строительства дома в Ереване и по всей Армении — от согласованного проекта до проверки и сдачи. Состав работ и стоимость зависят от участка, проекта и предусмотренного уровня работ и отделки.",
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
        "Уровень работ и отделки",
        "Расположение объекта и условия выезда",
      ],
      faq: [
        {
          question: "С чего начать, если есть участок, но нет проекта?",
          answer:
            "Подготовьте данные об участке и желаемой площади дома. Сначала нужно определить требования к дому и состав проектных работ, затем оценивать строительные этапы.",
        },
        {
          question: "Можно ли разделить строительство на этапы?",
          answer:
            "Этапы определяются проектом и технологической последовательностью. Заранее обсуждаем, в каком состоянии завершить очередной этап и что потребуется для продолжения.",
        },
        {
          question: "Что входит в полный цикл строительства?",
          answer:
            "Перечень может включать подготовку участка, фундамент, несущие конструкции, стены, кровлю, инженерные системы и отделку. Проектирование, материалы и уровень готовности фиксируются отдельно в составе проекта.",
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
        "We organise and control each stage of a home build in Yerevan and across Armenia, from the agreed design to inspection and handover. The scope and cost depend on the site, design, and intended level of work and finishes.",
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
        "Level of work and finishes",
        "Property location and travel arrangements",
      ],
      faq: [
        {
          question: "Where do I start if I have land but no design?",
          answer:
            "Gather the site information and the approximate size of the home you want. First establish the design requirements and required drawings, then assess the construction stages.",
        },
        {
          question: "Can construction be split into stages?",
          answer:
            "The design and construction sequence determine the stages. We discuss where each stage should end and what will be required before work can continue.",
        },
        {
          question: "What does a complete home build include?",
          answer:
            "The scope may cover site preparation, foundations, structure, walls, roofing, building services and finishes. Design work, materials and the intended level of completion must be specified in the project scope.",
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
        "Կազմակերպում և վերահսկում ենք տան կառուցման փուլերը Երևանում և ամբողջ Հայաստանում՝ համաձայնեցված նախագծից մինչև ստուգում և հանձնում։ Աշխատանքների կազմն ու արժեքը կախված են հողամասից, նախագծից, ինչպես նաև աշխատանքների և հարդարման նախատեսված մակարդակից։",
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
          question: "Ինչի՞ց սկսել, եթե հողամաս կա, բայց նախագիծ չկա։",
          answer:
            "Պատրաստեք հողամասի տվյալներն ու նշեք տան ցանկալի մակերեսը։ Սկզբում պետք է որոշել տան պահանջներն ու նախագծային աշխատանքների կազմը, ապա գնահատել շինարարության փուլերը։",
        },
        {
          question: "Հնարավո՞ր է տունը կառուցել փուլերով։",
          answer:
            "Փուլերը որոշվում են նախագծով և աշխատանքների տեխնոլոգիական հերթականությամբ։ Նախապես քննարկում ենք՝ ինչ վիճակում ավարտել յուրաքանչյուր փուլը և ինչ է անհրաժեշտ շարունակելու համար։",
        },
        {
          question: "Ի՞նչ է ներառում տան ամբողջական կառուցումը։",
          answer:
            "Ցանկը կարող է ընդգրկել հողամասի նախապատրաստումը, հիմքը, կրող կառուցվածքները, պատերը, տանիքը, ինժեներական համակարգերն ու հարդարումը։ Նախագծումը, նյութերը և պատրաստվածության աստիճանը հստակեցվում են առանձին։",
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
      faq: [
        {
          question: "Какие документы нужны для ремонта по дизайн-проекту?",
          answer:
            "Нужны согласованная планировка и рабочие чертежи для предусмотренных работ: расположение мебели, розеток, освещения, сантехники и отделки. Точный комплект зависит от задачи.",
        },
        {
          question: "Входят ли визуализации и подбор мебели?",
          answer:
            "Их включение и объём согласовываются до начала проектирования. Изображение интерьера не заменяет рабочие чертежи и перечень материалов.",
        },
        {
          question: "Когда лучше начинать дизайн?",
          answer:
            "До прокладки проводки и труб. План мебели и оборудования помогает определить расположение подключений и избежать изменений после отделки.",
        },
      ],
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
      faq: [
        {
          question: "Which drawings are needed for renovation?",
          answer:
            "An agreed layout and working drawings for the planned work: furniture, outlets, lighting, plumbing fixtures and finishes. The exact set depends on the project.",
        },
        {
          question: "Are visualisations and furniture selection included?",
          answer:
            "Their inclusion and scope are agreed before design work begins. An interior rendering does not replace working drawings and material specifications.",
        },
        {
          question: "When should interior design begin?",
          answer:
            "Before wiring and pipework are installed. Furniture and appliance layouts help establish connection locations and reduce changes after finishing.",
        },
      ],
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
        "Ստեղծում ենք ֆունկցիոնալ և ամբողջական ինտերիերի լուծումներ՝ հատակագծային լուծումներով, ոճային հայեցակարգով, նյութերի ընտրությամբ, գծագրերով և իրականացման համար անհրաժեշտ փաստաթղթերով։",
      fullDescription:
        "Դիզայն-նախագիծը օգնում է սկսել վերանորոգումը հստակ լուծումներով։ Հատակագծային լուծումը կազմակերպում է տարածքը, ինտերիերի հայեցակարգը սահմանում է ոճն ու նյութերը, իսկ աշխատանքային գծագրերը անհրաժեշտ են իրականացման համար։ 3D վիզուալիզացիան, կահույքի ընտրությունը և հեղինակային ուղեկցումը ներառվում են միայն համաձայնեցված փաթեթում։",
      includedWorks: [
        "Հատակագծային լուծում՝ կահույքի և գոտիների տեղադրմամբ",
        "Ինտերիերի հայեցակարգ և նյութերի ընտրություն",
        "3D վիզուալիզացիա՝ համաձայնեցված փաթեթի դեպքում",
        "Աշխատանքային գծագրեր և իրականացման նյութեր",
      ],
      suitableFor: [
        "Բնակարանների և առանձնատների համար՝ վերանորոգումից առաջ",
        "Առևտրային տարածքների համար, որոնց անհրաժեշտ է ֆունկցիոնալ ինտերիեր",
      ],
      workTypes: [
        "Հատակագծային լուծում",
        "Ինտերիերի հայեցակարգ",
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
          question: "Ի՞նչ գծագրեր են անհրաժեշտ վերանորոգման համար։",
          answer:
            "Անհրաժեշտ են համաձայնեցված հատակագիծը և նախատեսված աշխատանքների գծագրերը՝ կահույքի, վարդակների, լուսավորության, սանտեխնիկայի ու հարդարման համար։ Ճշգրիտ ցանկը կախված է նախագծից։",
        },
        {
          question: "Ներառվա՞ծ են վիզուալիզացիան և կահույքի ընտրությունը։",
          answer:
            "Դրանց ընդգրկումն ու ծավալը համաձայնեցնում ենք մինչև նախագծումը սկսելը։ Ինտերիերի պատկերը չի փոխարինում աշխատանքային գծագրերին և նյութերի ցանկին։",
        },
        {
          question: "Ե՞րբ սկսել ինտերիերի դիզայնը։",
          answer:
            "Մինչև էլեկտրալարերի և խողովակների անցկացումը։ Կահույքի ու սարքավորումների դասավորությունը օգնում է նախապես որոշել միացումների տեղերը և խուսափել հարդարումից հետո փոփոխություններից։",
        },
      ],
      primaryCta: "Դիտել դիզայնի ծառայությունը",
      secondaryCta: "Քննարկել իմ նախագիծը",
      seoTitle: "Ինտերիերի դիզայն Երևանում և ամբողջ Հայաստանում | SHINEX",
      seoDescription:
        "Բնակարանների, առանձնատների և առևտրային տարածքների ինտերիերի դիզայն Երևանում և ամբողջ Հայաստանում՝ հատակագիծ, հայեցակարգ, նյութեր և աշխատանքային գծագրեր։",
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
          title: "Ինտերիերի հայեցակարգ և նյութերի ընտրություն",
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
      faq: [
        {
          question: "Можно ли ремонтировать помещение, пока бизнес работает?",
          answer:
            "Сначала оцениваем возможность разделить рабочую зону и зону ремонта. Последовательность, доступ и время шумных работ обсуждаются с учётом безопасности и режима бизнеса.",
        },
        {
          question: "Что сообщить для оценки магазина или салона?",
          answer:
            "Назначение помещения, площадь, планировку, состояние систем, предполагаемое оборудование и желаемый срок открытия. Эти данные помогают определить требования к ремонту.",
        },
        {
          question: "Чем отличается ремонт офиса?",
          answer:
            "Для офиса особенно важны рабочие места, переговорные, освещение, розетки и сетевая инфраструктура. Эти задачи разобраны на отдельной странице ремонта офисов.",
        },
      ],
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
      faq: [
        {
          question: "Can renovation take place while the business stays open?",
          answer:
            "We first assess whether operating and construction areas can be separated. Access, sequencing and noisy work are discussed around safety and the business schedule.",
        },
        {
          question: "What details are needed to assess a shop or salon?",
          answer:
            "The property use, area, layout, existing systems, planned equipment and desired opening date. These help establish the renovation requirements.",
        },
        {
          question: "What is different about office renovation?",
          answer:
            "Offices need particular attention to workstations, meeting rooms, lighting, power outlets and network cabling. Our office renovation page covers these requirements.",
        },
      ],
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
      faq: [
        {
          question: "Հնարավո՞ր է վերանորոգել տարածքը, երբ բիզնեսն աշխատում է։",
          answer:
            "Նախ գնահատում ենք՝ կարելի է արդյոք առանձնացնել գործող և վերանորոգվող գոտիները։ Մուտքը, փուլերի հերթականությունն ու աղմկոտ աշխատանքների ժամերը քննարկում ենք՝ հաշվի առնելով անվտանգությունն ու բիզնեսի աշխատանքային ռեժիմը։",
        },
        {
          question: "Ի՞նչ տվյալներ են պետք խանութի կամ սրահի գնահատման համար։",
          answer:
            "Տարածքի նշանակությունը, մակերեսը, հատակագիծը, համակարգերի վիճակը, նախատեսված սարքավորումներն ու բացման ցանկալի ժամկետը։ Դրանք օգնում են որոշել վերանորոգման պահանջները։",
        },
        {
          question: "Ի՞նչ առանձնահատկություններ ունի գրասենյակի վերանորոգումը։",
          answer:
            "Կարևոր են աշխատատեղերը, հանդիպումների սենյակները, լուսավորությունը, վարդակներն ու ցանցային մալուխները։ Այդ հարցերը ներկայացված են գրասենյակների վերանորոգման առանձին էջում։",
        },
      ],
      title: "Առևտրային տարածքների վերանորոգում",
      shortDescription:
        "Վերանորոգում և հարմարեցնում ենք գրասենյակներ, խանութներ, սրահներ, ռեստորաններ ու սպասարկման տարածքներ՝ հաշվի առնելով դրանց նշանակությունը, բիզնեսի աշխատանքային ռեժիմն ու ինժեներական պահանջները։",
      fullDescription:
        "Վերանորոգում և հարմարեցնում ենք բիզնես տարածքները՝ հաշվի առնելով աշխատանքային գոտիները, հաճախորդների հոսքը և ինժեներական պահանջները։ Մինչ մեկնարկը համաձայնեցնում ենք փուլերն ու աշխատանքային ժամերը, որպեսզի պարզ լինի դրանց ազդեցությունը բիզնեսի գործունեության վրա։",
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
      faq: [
        {
          question: "Какие исходные данные нужны для проекта дома?",
          answer:
            "Данные об участке, планируемая площадь и этажность, требования к помещениям и имеющиеся документы. После изучения задачи определяем необходимый состав проекта.",
        },
        {
          question: "Чем архитектурный проект отличается от дизайна интерьера?",
          answer:
            "Архитектурный проект определяет здание и его планировочные решения. Дизайн интерьера уточняет внутреннее пространство, мебель, освещение и отделку. Состав каждого проекта согласовывается отдельно.",
        },
      ],
      title: "Архитектурное проектирование",
      shortDescription:
        "Архитектурные решения, планировка здания и рабочая документация для подготовки к строительству.",
      fullDescription:
        "Разрабатываем архитектурные решения с учётом цели проекта, особенностей участка, действующих норм и последующего строительства, чтобы строительство опиралось на согласованную документацию.",
      includedWorks: [
        "Сбор исходных данных",
        "Архитектурные и планировочные решения",
        "Рабочие чертежи и проектная документация",
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
      faq: [
        {
          question: "What information is needed for a house design?",
          answer:
            "Site information, the planned area and number of floors, room requirements and existing documents. Reviewing these establishes the required design scope.",
        },
        {
          question:
            "How does architectural design differ from interior design?",
          answer:
            "Architectural design defines the building and its layout. Interior design develops the internal spaces, furniture, lighting and finishes. Each design scope is agreed separately.",
        },
      ],
      title: "Architectural design",
      shortDescription:
        "Architectural solutions, building layouts, and working documentation to prepare for construction.",
      fullDescription:
        "We develop architectural solutions around the project purpose, site characteristics, applicable requirements, and future construction so work starts from agreed documentation.",
      includedWorks: [
        "Source-information collection",
        "Architectural and planning solutions",
        "Working drawings and project documentation",
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
      faq: [
        {
          question: "Ի՞նչ տվյալներ են անհրաժեշտ տան նախագծման համար։",
          answer:
            "Հողամասի տվյալները, նախատեսված մակերեսն ու հարկերի քանակը, սենյակների պահանջները և առկա փաստաթղթերը։ Դրանք ուսումնասիրելուց հետո որոշում ենք նախագծի անհրաժեշտ կազմը։",
        },
        {
          question:
            "Ճարտարապետական նախագիծն ինչո՞վ է տարբերվում ինտերիերի դիզայնից։",
          answer:
            "Ճարտարապետական նախագիծը սահմանում է շենքն ու դրա հատակագծային լուծումները։ Ինտերիերի դիզայնը մանրամասնում է ներքին տարածքը, կահույքը, լուսավորությունն ու հարդարումը։ Յուրաքանչյուր նախագծի կազմը համաձայնեցվում է առանձին։",
        },
      ],
      title: "Ճարտարապետական նախագծում",
      shortDescription:
        "Ճարտարապետական լուծումներ, շենքի հատակագիծ և աշխատանքային փաստաթղթեր՝ շինարարությանը նախապատրաստվելու համար։",
      fullDescription:
        "Մշակում ենք ճարտարապետական լուծումներ՝ հաշվի առնելով նախագծի նպատակը, հողամասի առանձնահատկությունները, գործող նորմերը և հետագա շինարարությունը։",
      includedWorks: [
        "Ելակետային տվյալների հավաքագրում",
        "Ճարտարապետական և հատակագծային լուծումներ",
        "Աշխատանքային գծագրեր և նախագծային փաստաթղթեր",
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
        "Расположение объекта и условия выезда",
      ],
      faq: [
        {
          question: "Как выбрать между косметическим и капитальным ремонтом?",
          answer:
            "Если стены, пол и инженерные системы исправны, может быть достаточно обновления отделки. Изношенная проводка, трубы или повреждённые поверхности требуют более глубокого ремонта. Это уточняется при осмотре.",
        },
        {
          question: "Чем ремонт частного дома отличается от ремонта квартиры?",
          answer:
            "В доме дополнительно учитываются состояние наружных стен, кровли и самостоятельных инженерных систем. Такие работы нужно отделить в смете от внутренней отделки.",
        },
        {
          question: "Можно заказать отдельный этап?",
          answer:
            "Да, необходимые работы обсуждаем по данным объекта. Важно проверить, готовы ли смежные поверхности и системы, чтобы результат можно было использовать без переделок.",
        },
      ],
      primaryCta: "Посмотреть варианты ремонта",
      secondaryCta: "Получить предварительный расчёт",
      seoTitle: "Ремонт жилья в Армении: виды и состав работ | SHINEX",
      seoDescription:
        "Ремонт квартир и частных домов под ключ в Ереване и по всей Армении: осмотр, предварительная оценка и согласование этапов.",
      workflow: [
        "Осмотр и обсуждение требований проекта",
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
        "Property location and travel arrangements",
      ],
      faq: [
        {
          question: "Do I need redecoration or major renovation?",
          answer:
            "If walls, floors and building services are sound, refreshing the finishes may be enough. Worn wiring, pipes or damaged surfaces need a more extensive scope, established during a site assessment.",
        },
        {
          question: "How does renovating a house differ from an apartment?",
          answer:
            "A house also requires consideration of external walls, roofing and its own building services. These should be listed separately from interior finishes in the estimate.",
        },
        {
          question: "Can I request just one stage of work?",
          answer:
            "Yes, we can discuss a specific stage using the property details. We first need to check whether adjoining surfaces and systems are ready so the work will not need to be repeated.",
        },
      ],
      primaryCta: "View renovation options",
      secondaryCta: "Get an initial estimate",
      seoTitle: "Home Renovation in Armenia: Services and Options | SHINEX",
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
          question: "Ինչպե՞ս ընտրել կոսմետիկ և կապիտալ վերանորոգման միջև։",
          answer:
            "Եթե պատերը, հատակն ու ինժեներական համակարգերը լավ վիճակում են, կարող է բավարար լինել հարդարումը թարմացնելը։ Մաշված էլեկտրալարերը, խողովակներն ու վնասված մակերեսները պահանջում են ավելի ծավալուն աշխատանք։ Դա ճշտում ենք զննումից հետո։",
        },
        {
          question:
            "Առանձնատան վերանորոգումն ինչո՞վ է տարբերվում բնակարանի վերանորոգումից։",
          answer:
            "Առանձնատան դեպքում հաշվի ենք առնում նաև արտաքին պատերի, տանիքի և առանձին ինժեներական համակարգերի վիճակը։ Այդ աշխատանքները նախահաշվում պետք է առանձնացնել ներքին հարդարումից։",
        },
        {
          question: "Կարելի՞ է պատվիրել միայն մեկ փուլ։",
          answer:
            "Այո, անհրաժեշտ աշխատանքները քննարկում ենք ըստ տարածքի տվյալների։ Նախ պետք է ստուգել՝ պատրաստ են արդյոք հարակից մակերեսներն ու համակարգերը, որպեսզի կատարված աշխատանքը կրկնելու կարիք չլինի։",
        },
      ],
      primaryCta: "Դիտել վերանորոգման տարբերակները",
      secondaryCta: "Ստանալ նախնական հաշվարկ",
      seoTitle: "Բնակարանի և տան վերանորոգում Հայաստանում | SHINEX",
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
      seoTitle: "Монолитные работы в Армении | SHINEX",
      faq: [
        {
          question:
            "Можно ли оценить монолитные работы только по площади дома?",
          answer:
            "Для точной оценки нужны конструктивные чертежи и объёмы бетона, арматуры и опалубки. Одинаковая площадь дома не означает одинаковый объём монолитных конструкций.",
        },
        {
          question: "Что подготовить для обсуждения работ?",
          answer:
            "Конструктивный проект, сведения об участке, готовности основания и доступе для техники. По этим данным уточняются состав и последовательность работ.",
        },
      ],
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
      seoTitle: "Reinforced Concrete Construction in Armenia | SHINEX",
      faq: [
        {
          question: "Can concrete work be estimated from floor area alone?",
          answer:
            "An accurate estimate needs structural drawings and quantities for concrete, reinforcement and formwork. Buildings with the same floor area can require different structural quantities.",
        },
        {
          question: "What should I provide to discuss the work?",
          answer:
            "Structural drawings, site information, the condition of the prepared base and equipment access. These help establish the scope and sequence.",
        },
      ],
      title: "Reinforced concrete construction",
      shortDescription:
        "Reinforced-concrete structures delivered to approved project documentation.",
      fullDescription:
        "We carry out reinforced concrete work according to the structural design, with attention to dimensions, construction sequence and the checks required at each stage.",
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
      seoTitle: "Մոնոլիտ աշխատանքներ Հայաստանում | SHINEX",
      faq: [
        {
          question:
            "Մոնոլիտ աշխատանքները կարելի՞ է գնահատել միայն տան մակերեսով։",
          answer:
            "Ճշգրիտ գնահատման համար անհրաժեշտ են կառուցվածքային գծագրերը, բետոնի, ամրանի և կաղապարամածի ծավալները։ Նույն մակերեսով տները կարող են տարբեր քանակի մոնոլիտ կառուցվածքներ պահանջել։",
        },
        {
          question: "Ի՞նչ պատրաստել աշխատանքները քննարկելու համար։",
          answer:
            "Կառուցվածքային նախագիծը, հողամասի տվյալները, հիմքի պատրաստվածության և տեխնիկայի մուտքի մասին տեղեկությունը։ Դրանք օգնում են ճշտել աշխատանքների կազմն ու հերթականությունը։",
        },
      ],
      title: "Մոնոլիտ աշխատանքներ",
      shortDescription:
        "Երկաթբետոնե կառուցվածքների իրականացում՝ նախագծային փաստաթղթերով։",
      fullDescription:
        "Կատարում ենք մոնոլիտ կառուցվածքային աշխատանքներ՝ պահպանելով նախագծային երկրաչափությունն ու տեխնոլոգիական հաջորդականությունը և վերահսկելով աշխատանքի հիմնական փուլերը։",
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
      faq: [
        {
          question: "Какие данные нужны для оценки кровли или фасада?",
          answer:
            "Фотографии, размеры, тип существующего покрытия, сведения об утеплении и замеченных протечках или повреждениях. Также важны высота здания и доступ к рабочей зоне.",
        },
        {
          question: "Почему одного выбора покрытия недостаточно?",
          answer:
            "На результат влияют состояние основания, примыкания, защитные слои и водоотведение. Их нужно проверить и учесть в составе работ вместе с покрытием.",
        },
      ],
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
      faq: [
        {
          question: "What is needed to assess roofing or facade work?",
          answer:
            "Photographs, dimensions, the existing finish, insulation details and any leaks or damage. Building height and access to the work area also matter.",
        },
        {
          question: "Why is choosing a finish not enough?",
          answer:
            "The base condition, junctions, protective layers and drainage also affect the result. They need to be assessed and included in the scope alongside the finish.",
        },
      ],
      title: "Facade and roofing work",
      shortDescription:
        "Construction and renewal of facades, roofs, and protective building details.",
      fullDescription:
        "We plan facade and roofing work around the design, drainage, protective layers and junctions, taking the condition of the existing structure into account.",
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
      faq: [
        {
          question: "Ի՞նչ տվյալներ են պետք տանիքի կամ ճակատի գնահատման համար։",
          answer:
            "Լուսանկարները, չափերը, առկա ծածկույթի տեսակը, ջերմամեկուսացման և նկատված արտահոսքերի կամ վնասվածքների մասին տեղեկությունը։ Կարևոր են նաև շենքի բարձրությունն ու աշխատանքային գոտու հասանելիությունը։",
        },
        {
          question: "Ինչո՞ւ բավարար չէ միայն ծածկույթ ընտրելը։",
          answer:
            "Արդյունքի վրա ազդում են հիմքի վիճակը, միացումները, պաշտպանական շերտերն ու ջրահեռացումը։ Դրանք պետք է ստուգել և ներառել աշխատանքների կազմում՝ ծածկույթի հետ միասին։",
        },
      ],
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
