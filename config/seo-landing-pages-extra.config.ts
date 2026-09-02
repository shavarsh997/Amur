import type { SeoLandingPage } from "@/config/seo-landing-pages.config";

type LandingContent = SeoLandingPage["translations"]["hy"];

const images = {
  house:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85",
  design:
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1800&q=85",
  commercial:
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1800&q=85",
  renovation:
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85",
} as const;

function content({
  eyebrow,
  title,
  description,
  seoTitle,
  seoDescription,
  introduction,
  scopeTitle,
  scopeText,
  scopeItems,
  planningTitle,
  planningText,
  costTitle,
  costText,
  faqs,
  calculatorLabel,
  contactLabel,
  relatedTitle,
}: {
  eyebrow: string;
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  introduction: readonly string[];
  scopeTitle: string;
  scopeText: string;
  scopeItems: readonly string[];
  planningTitle: string;
  planningText: string;
  costTitle: string;
  costText: string;
  faqs: readonly { question: string; answer: string }[];
  calculatorLabel: string;
  contactLabel: string;
  relatedTitle: string;
}): LandingContent {
  return {
    eyebrow,
    title,
    description,
    seoTitle,
    seoDescription,
    introduction,
    sections: [
      { title: scopeTitle, paragraphs: [scopeText], items: scopeItems },
      { title: planningTitle, paragraphs: [planningText] },
      { title: costTitle, paragraphs: [costText] },
    ],
    faqs,
    calculatorLabel,
    contactLabel,
    relatedTitle,
  };
}

const hyLabels = {
  calculatorLabel: "Ստանալ նախնական հաշվարկ",
  contactLabel: "Պատվիրել զննում",
  relatedTitle: "Կապված ծառայություններ",
} as const;

const ruLabels = {
  calculatorLabel: "Получить предварительный расчёт",
  contactLabel: "Заказать осмотр",
  relatedTitle: "Связанные услуги",
} as const;

const enLabels = {
  calculatorLabel: "Get an initial estimate",
  contactLabel: "Book a survey",
  relatedTitle: "Related services",
} as const;

export const extraSeoLandingPages = [
  {
    slug: "house-construction-yerevan",
    kind: "service",
    image: images.house,
    relatedServiceSlugs: ["house-construction", "design"],
    relatedLandingSlugs: [
      "complete-house-construction-yerevan",
      "interior-design-yerevan",
    ],
    translations: {
      hy: content({
        eyebrow: "Առանձնատների կառուցում · Երևան",
        title: "Առանձնատան կառուցում Երևանում",
        description:
          "SHINEX-ը կազմակերպում է առանձնատների կառուցում Երևանում՝ նախագծի քննարկումից մինչև աշխատանքների փուլային իրականացում։",
        seoTitle: "Առանձնատան կառուցում Երևանում | SHINEX",
        seoDescription:
          "Առանձնատան կառուցում Երևանում՝ շինարարական փուլերի կազմակերպում, նախահաշիվ, ինժեներական լուծումներ և աշխատանքների վերահսկում։",
        introduction: [
          "Առանձնատան կառուցումը պահանջում է նախապես համաձայնեցված ծավալ, հերթականություն և բյուջեի իրատեսական պատկեր։ SHINEX-ը սկսում է հողամասի, նախագծի և պահանջների քննարկումից։",
          "Աշխատանքների կազմը միշտ կախված է նախագծից ու տեղանքի պայմաններից, ուստի ճշգրիտ նախահաշիվը պատրաստվում է տվյալները ուսումնասիրելուց հետո։",
        ],
        scopeTitle: "Ի՞նչ կարող է ներառել տան կառուցումը",
        scopeText:
          "Մեկ թիմով կազմակերպում ենք համաձայնեցված շինարարական փուլերը՝ դրանց ընթացքն ու պատասխանատվությունը հստակեցնելով մինչ մեկնարկը։",
        scopeItems: [
          "Նախապատրաստական աշխատանքներ",
          "Հիմքեր և կրող կառուցվածքներ",
          "Պատեր, միջնապատեր և տանիք",
          "Ինժեներական համակարգերի համակարգում",
          "Արտաքին և ներքին աշխատանքների պլանավորում",
          "Փուլային որակի վերահսկում",
        ],
        planningTitle: "Ինչպե՞ս է պլանավորվում շինարարությունը",
        planningText:
          "Սկզբում ճշտում ենք նախագիծը, տարածքի պայմանները, ցանկալի նյութերն ու փուլերը։ Դրանից հետո համաձայնեցնում ենք աշխատանքների հերթականությունն ու նախնական հաշվարկը։",
        costTitle: "Ինչի՞ց է կախված արժեքը",
        costText:
          "Արժեքի վրա ազդում են տան մակերեսը, ճարտարապետական լուծումները, հողամասի պատրաստվածությունը, հիմքերի տեսակը, նյութերն ու ինժեներական համակարգերի ծավալը։",
        faqs: [
          {
            question: "Կատարո՞ւմ եք առանձնատան կառուցում Երևանում",
            answer:
              "Այո։ Քննարկում ենք նախագիծը, տեղանքի պայմաններն ու անհրաժեշտ աշխատանքների կազմը, ապա առաջարկում ենք իրատեսական հաջորդ քայլը։",
          },
          {
            question: "Ե՞րբ է կազմվում նախահաշիվը",
            answer:
              "Նախնական հաշվարկը հնարավոր է նախագծի և հիմնական տվյալների հիման վրա, իսկ ճշգրտումը՝ ծավալներն ու պայմանները համաձայնեցնելուց հետո։",
          },
          {
            question: "Հնարավո՞ր է փուլերով կառուցել",
            answer:
              "Այո, եթե նախագծի ու տեխնոլոգիական հաջորդականության համար դա ընդունելի է։ Փուլերը սահմանում ենք նախապես։",
          },
        ],
        ...hyLabels,
      }),
      ru: content({
        eyebrow: "Строительство частных домов · Ереван",
        title: "Строительство частного дома в Ереване",
        description:
          "SHINEX организует строительство частных домов в Ереване — от обсуждения проекта до поэтапного выполнения работ.",
        seoTitle: "Строительство частного дома в Ереване | SHINEX",
        seoDescription:
          "Строительство частного дома в Ереване: этапы, предварительная смета, инженерные решения и контроль работ.",
        introduction: [
          "Строительство дома начинается с проекта, участка и понятного объёма работ. Мы согласуем исходные данные до начала каждого этапа.",
          "Точная смета зависит от проекта и условий участка; её уточняем после изучения задачи.",
        ],
        scopeTitle: "Что может входить в строительство",
        scopeText:
          "Организуем согласованные строительные этапы в единой последовательности.",
        scopeItems: [
          "Подготовка участка",
          "Фундамент и несущие конструкции",
          "Стены, перегородки и кровля",
          "Координация инженерных систем",
          "Планирование наружных и внутренних работ",
          "Контроль качества по этапам",
        ],
        planningTitle: "Планирование работ",
        planningText:
          "Уточняем проект, состояние участка, материалы и этапность, затем согласуем предварительный расчёт.",
        costTitle: "От чего зависит стоимость",
        costText:
          "На стоимость влияют площадь, архитектура, подготовка участка, тип фундамента, материалы и инженерные системы.",
        faqs: [
          {
            question: "Строите ли вы частные дома в Ереване?",
            answer:
              "Да. Обсуждаем проект, участок и состав работ, чтобы определить следующий шаг.",
          },
          {
            question: "Когда готовится смета?",
            answer: "После изучения проекта и согласования исходных данных.",
          },
          {
            question: "Можно ли строить по этапам?",
            answer: "Да, если это соответствует проекту и технологии работ.",
          },
        ],
        ...ruLabels,
      }),
      en: content({
        eyebrow: "Private house construction · Yerevan",
        title: "Private house construction in Yerevan",
        description:
          "SHINEX coordinates private house construction in Yerevan, from project discussion through staged delivery.",
        seoTitle: "Private House Construction in Yerevan | SHINEX",
        seoDescription:
          "Private house construction in Yerevan: work stages, initial estimates, engineering coordination and quality control.",
        introduction: [
          "House construction begins with the project, site conditions, and an agreed scope. We establish this information before work starts.",
          "The final estimate depends on the project and site, so it is refined after the brief is reviewed.",
        ],
        scopeTitle: "What construction can include",
        scopeText:
          "We coordinate the agreed construction stages in one clear sequence.",
        scopeItems: [
          "Site preparation",
          "Foundations and structural work",
          "Walls, partitions and roof",
          "Engineering systems coordination",
          "Interior and exterior work planning",
          "Stage-by-stage quality control",
        ],
        planningTitle: "How work is planned",
        planningText:
          "We review the project, site, materials and staging before agreeing an initial estimate.",
        costTitle: "What affects cost",
        costText:
          "Area, architecture, site preparation, foundation type, materials and engineering scope all affect cost.",
        faqs: [
          {
            question: "Do you build private houses in Yerevan?",
            answer:
              "Yes. We review the project, site and required scope before proposing the next step.",
          },
          {
            question: "When is an estimate prepared?",
            answer:
              "After the project and starting information have been reviewed.",
          },
          {
            question: "Can construction be staged?",
            answer:
              "Yes, where the project and construction sequence allow it.",
          },
        ],
        ...enLabels,
      }),
    },
  },
  {
    slug: "complete-house-construction-yerevan",
    kind: "service",
    image: images.house,
    relatedServiceSlugs: ["house-construction", "interior-design"],
    relatedLandingSlugs: [
      "house-construction-yerevan",
      "interior-design-yerevan",
    ],
    translations: {
      hy: content({
        eyebrow: "Համալիր տունաշինություն · Երևան",
        title: "Առանձնատան ամբողջական կառուցում Երևանում",
        description:
          "Կազմակերպում ենք առանձնատան ամբողջական կառուցումը Երևանում՝ համաձայնեցված շինարարական ու ինժեներական փուլերով։",
        seoTitle: "Առանձնատան ամբողջական կառուցում Երևանում | SHINEX",
        seoDescription:
          "Առանձնատան ամբողջական կառուցում Երևանում՝ աշխատանքների համաձայնեցված փուլեր, նախահաշիվ և մեկ պատասխանատու թիմ։",
        introduction: [
          "Ամբողջական կառուցումը նշանակում է մեկ պլանով կապել հիմնական շինարարական, ինժեներական և ավարտական փուլերը։",
          "Մինչ մեկնարկը սահմանում ենք, թե ինչ աշխատանքներ են մտնում նախագծի մեջ և որոնք են իրականացվում առանձին համաձայնեցմամբ։",
        ],
        scopeTitle: "Ամբողջական աշխատանքների կազմը",
        scopeText:
          "Գործերի ցանկը կազմվում է կոնկրետ նախագծի համար, որպեսզի շինարարության ընթացքում պատասխանատվության բացեր չլինեն։",
        scopeItems: [
          "Նախագծի և շինարարության ծավալի քննարկում",
          "Կառուցվածքային աշխատանքների կազմակերպում",
          "Տանիքի և արտաքին հանգույցների պլանավորում",
          "Էլեկտրական ու սանտեխնիկական համակարգերի համակարգում",
          "Ներքին հարդարման հաջորդականության որոշում",
          "Վերջնական ստուգման կազմակերպում",
        ],
        planningTitle: "Մեկ համակարգված գործընթաց",
        planningText:
          "Փուլերի կապակցումը թույլ է տալիս ինժեներական կետերը, հարդարման որոշումները և մատակարարումները որոշել ժամանակին՝ առանց արդեն արված աշխատանքները քանդելու։",
        costTitle: "Նախահաշվի ճշգրտում",
        costText:
          "Ամբողջական կառուցման գինը չի որոշվում միայն քառակուսի մետրով․ այն կախված է նախագծից, շինանյութերից, տեղանքի բարդությունից և ներառված համակարգերից։",
        faqs: [
          {
            question: "Ի՞նչ է նշանակում ամբողջական կառուցում",
            answer:
              "Դա համաձայնեցված նախագծով հիմնական շինարարական, ինժեներական և ավարտական փուլերի կազմակերպումն է։",
          },
          {
            question: "Ամբողջ աշխատանքը մեկ թիմո՞վ է կազմակերպվում",
            answer:
              "SHINEX-ը համակարգում է համաձայնեցված աշխատանքների ծավալը մեկ նախագծի շրջանակում։",
          },
          {
            question: "Կարո՞ղ եք սկսել առանց վերջնական գծագրերի",
            answer:
              "Կարող ենք քննարկել նախնական տվյալները, բայց ճշգրիտ ծավալն ու նախահաշիվը պահանջում են բավարար նախագծային հստակություն։",
          },
        ],
        ...hyLabels,
      }),
      ru: content({
        eyebrow: "Комплексное строительство · Ереван",
        title: "Комплексное строительство частного дома в Ереване",
        description:
          "Организуем комплексное строительство частного дома в Ереване с согласованными строительными и инженерными этапами.",
        seoTitle: "Комплексное строительство дома в Ереване | SHINEX",
        seoDescription:
          "Комплексное строительство частного дома в Ереване: согласованные этапы, смета и координация одной командой.",
        introduction: [
          "Комплексное строительство объединяет строительные, инженерные и отделочные этапы в одном плане.",
          "До начала фиксируем состав работ и порядок согласований.",
        ],
        scopeTitle: "Состав комплексных работ",
        scopeText:
          "Список работ определяется для конкретного проекта, чтобы не было разрывов в ответственности.",
        scopeItems: [
          "Обсуждение проекта",
          "Конструктивные работы",
          "Кровля и наружные узлы",
          "Инженерные системы",
          "Планирование внутренней отделки",
          "Финальная проверка",
        ],
        planningTitle: "Единый процесс",
        planningText:
          "Связанные этапы позволяют вовремя определить инженерные точки, отделочные решения и поставки.",
        costTitle: "Уточнение сметы",
        costText:
          "Цена зависит не только от площади, но и от проекта, материалов, участка и включённых систем.",
        faqs: [
          {
            question: "Что значит комплексное строительство?",
            answer:
              "Это координация согласованных строительных, инженерных и финальных этапов в рамках одного проекта.",
          },
          {
            question: "Одна ли команда отвечает за работы?",
            answer:
              "Мы координируем согласованный объём работ в рамках одного проекта.",
          },
          {
            question: "Можно начать без финальных чертежей?",
            answer:
              "Можно обсудить исходные данные, но точный объём требует достаточной проектной ясности.",
          },
        ],
        ...ruLabels,
      }),
      en: content({
        eyebrow: "Complete house construction · Yerevan",
        title: "Complete private house construction in Yerevan",
        description:
          "We coordinate complete private house construction in Yerevan through agreed construction and engineering stages.",
        seoTitle: "Complete House Construction in Yerevan | SHINEX",
        seoDescription:
          "Complete private house construction in Yerevan: agreed stages, estimates and coordinated delivery.",
        introduction: [
          "Complete construction connects structural, engineering and finishing stages in one plan.",
          "Before work begins, we agree what is included and how decisions are approved.",
        ],
        scopeTitle: "What complete construction includes",
        scopeText:
          "The scope is defined for the specific project to avoid gaps between stages.",
        scopeItems: [
          "Project and scope review",
          "Structural work",
          "Roof and exterior planning",
          "Engineering coordination",
          "Interior finish planning",
          "Final inspection",
        ],
        planningTitle: "One coordinated process",
        planningText:
          "Linking stages lets engineering points, finishes and deliveries be decided at the right time.",
        costTitle: "Refining the estimate",
        costText:
          "Cost depends on more than area: project details, materials, site conditions and included systems matter.",
        faqs: [
          {
            question: "What does complete construction mean?",
            answer:
              "It means coordinating agreed structural, engineering and final stages within one project.",
          },
          {
            question: "Is one team responsible?",
            answer: "We coordinate the agreed scope within one project.",
          },
          {
            question: "Can work start without final drawings?",
            answer:
              "We can discuss the initial brief, but a precise scope needs sufficient project detail.",
          },
        ],
        ...enLabels,
      }),
    },
  },
  {
    slug: "interior-design-yerevan",
    kind: "service",
    image: images.design,
    relatedServiceSlugs: ["interior-design", "design", "renovation"],
    relatedLandingSlugs: [
      "apartment-interior-design-yerevan",
      "apartment-renovation-yerevan",
    ],
    translations: {
      hy: content({
        eyebrow: "Ինտերիերի դիզայն · Երևան",
        title: "Ինտերիերի դիզայն Երևանում",
        description:
          "Ինտերիերի դիզայն Երևանում՝ տարածքի պլանավորում, ֆունկցիոնալ լուծումներ և վերանորոգման համար անհրաժեշտ նախագծային որոշումներ։",
        seoTitle: "Ինտերիերի դիզայն Երևանում | SHINEX",
        seoDescription:
          "Ինտերիերի դիզայն Երևանում բնակարանի, տան կամ բիզնես տարածքի համար՝ հատակագիծ, ոճային ու ֆունկցիոնալ լուծումներ։",
        introduction: [
          "Դիզայնը օգնում է մինչ վերանորոգումը որոշել տարածքի տրամաբանությունը, կահույքի տեղադրումը, լուսավորությունն ու ինժեներական կետերը։",
          "Հստակ նախագծային որոշումները նվազեցնում են աշխատանքների ընթացքում փոփոխությունների և ավելորդ ծախսերի հավանականությունը։",
        ],
        scopeTitle: "Դիզայնի նախագծում",
        scopeText:
          "Մոտեցումը հարմարեցնում ենք տարածքի նշանակությանը՝ բնակարան, առանձնատուն կամ առևտրային միջավայր։",
        scopeItems: [
          "Տարածքի գործառնական վերլուծություն",
          "Հատակագծային լուծումներ",
          "Կահույքի և սարքավորումների տեղաբաշխում",
          "Լուսավորության գաղափար",
          "Նյութերի և գունային ուղղության ընտրություն",
          "Վերանորոգման համար անհրաժեշտ տեխնիկական որոշումներ",
        ],
        planningTitle: "Ե՞րբ սկսել դիզայնը",
        planningText:
          "Լավ է նախագիծը մշակել մինչ էլեկտրական ու սանտեխնիկական աշխատանքները, որպեսզի վարդակները, լուսավորությունը և սարքավորումները ճիշտ տեղում լինեն։",
        costTitle: "Ինչպե՞ս է ձևավորվում արժեքը",
        costText:
          "Արժեքը կախված է մակերեսից, տարածքի տեսակից, պահանջվող գծագրերի և լուծումների խորությունից։",
        faqs: [
          {
            question: "Ե՞րբ պատվիրել ինտերիերի դիզայն",
            answer:
              "Վերանորոգման մեկնարկից առաջ, հատկապես մինչ ինժեներական աշխատանքները։",
          },
          {
            question: "Դիզայնը միայն ոճի՞ մասին է",
            answer:
              "Ոչ։ Այն ներառում է նաև ֆունկցիոնալ պլանավորում, սարքավորումների և լուսավորության տեղաբաշխում։",
          },
          {
            question: "Հնարավո՞ր է դիզայնը կապել վերանորոգման հետ",
            answer:
              "Այո։ Նախագծային որոշումները կարող են դառնալ վերանորոգման աշխատանքների հիմքը։",
          },
        ],
        ...hyLabels,
      }),
      ru: content({
        eyebrow: "Дизайн интерьера · Ереван",
        title: "Дизайн интерьера в Ереване",
        description:
          "Дизайн интерьера в Ереване: планировка, функциональные решения и подготовка к ремонту.",
        seoTitle: "Дизайн интерьера в Ереване | SHINEX",
        seoDescription:
          "Дизайн интерьера в Ереване для квартиры, дома или бизнеса: планировка, стиль и функциональные решения.",
        introduction: [
          "Дизайн помогает определить логику пространства, мебель, освещение и инженерные точки до ремонта.",
          "Чёткие решения уменьшают риск переделок и лишних расходов.",
        ],
        scopeTitle: "Разработка дизайна",
        scopeText:
          "Подход зависит от назначения помещения — квартира, дом или коммерческий объект.",
        scopeItems: [
          "Функциональный анализ",
          "Планировочные решения",
          "Расстановка мебели и оборудования",
          "Концепция освещения",
          "Материалы и цвет",
          "Технические решения для ремонта",
        ],
        planningTitle: "Когда начинать дизайн",
        planningText:
          "Лучше до электрических и сантехнических работ, чтобы точки были предусмотрены заранее.",
        costTitle: "От чего зависит стоимость",
        costText:
          "От площади, типа объекта, состава чертежей и глубины проработки.",
        faqs: [
          {
            question: "Когда заказывать дизайн интерьера?",
            answer: "До начала ремонта, особенно до инженерных работ.",
          },
          {
            question: "Дизайн — это только стиль?",
            answer:
              "Нет, он включает функциональную планировку, оборудование и освещение.",
          },
          {
            question: "Можно связать дизайн с ремонтом?",
            answer: "Да, проектные решения могут лечь в основу ремонта.",
          },
        ],
        ...ruLabels,
      }),
      en: content({
        eyebrow: "Interior design · Yerevan",
        title: "Interior design in Yerevan",
        description:
          "Interior design in Yerevan: space planning, functional decisions and renovation-ready design direction.",
        seoTitle: "Interior Design in Yerevan | SHINEX",
        seoDescription:
          "Interior design in Yerevan for apartments, houses and business spaces: layout, style and functional solutions.",
        introduction: [
          "Design establishes the space logic, furniture, lighting and engineering points before renovation begins.",
          "Clear decisions reduce the likelihood of rework and avoidable costs.",
        ],
        scopeTitle: "Design development",
        scopeText:
          "The approach follows the purpose of the space: apartment, house or commercial property.",
        scopeItems: [
          "Functional analysis",
          "Layout solutions",
          "Furniture and equipment placement",
          "Lighting concept",
          "Materials and colour direction",
          "Technical decisions for renovation",
        ],
        planningTitle: "When to start",
        planningText:
          "Start before electrical and plumbing work so points are placed correctly from the outset.",
        costTitle: "What affects cost",
        costText:
          "It depends on area, property type, required drawings and the depth of the design work.",
        faqs: [
          {
            question: "When should I order interior design?",
            answer:
              "Before renovation starts, especially before engineering work.",
          },
          {
            question: "Is design only about style?",
            answer:
              "No. It also covers functional planning, equipment and lighting.",
          },
          {
            question: "Can design be connected to renovation?",
            answer: "Yes. The design decisions can guide the renovation work.",
          },
        ],
        ...enLabels,
      }),
    },
  },
  {
    slug: "apartment-interior-design-yerevan",
    kind: "service",
    image: images.design,
    relatedServiceSlugs: ["interior-design", "renovation"],
    relatedLandingSlugs: ["interior-design-yerevan", "new-build-renovation"],
    translations: {
      hy: content({
        eyebrow: "Բնակարանի դիզայն · Երևան",
        title: "Բնակարանի ինտերիերի դիզայն Երևանում",
        description:
          "Բնակարանի ինտերիերի դիզայն Երևանում՝ հարմարավետ հատակագիծ, պահեստավորման, լուսավորության և վերանորոգման համար միավորված լուծումներ։",
        seoTitle: "Բնակարանի ինտերիերի դիզայն Երևանում | SHINEX",
        seoDescription:
          "Բնակարանի ինտերիերի դիզայն Երևանում՝ տարածքի պլանավորում, կահույքի ու լուսավորության տեղաբաշխում, վերանորոգման համար լուծումներ։",
        introduction: [
          "Բնակարանի դիզայնում ամենակարևորը տարածքը բնակվող մարդու սովորություններին համապատասխանեցնելն է։",
          "Նախագիծը հատկապես օգտակար է նորակառույցում կամ վերապլանավորում պահանջող բնակարանում, երբ պետք է նախապես որոշել յուրաքանչյուր գոտու դերը։",
        ],
        scopeTitle: "Բնակարանի նախագծային լուծումներ",
        scopeText:
          "Կազմում ենք բնակարանի օգտագործելիության, պահպանման և առօրյա հարմարավետության վրա հիմնված լուծումներ։",
        scopeItems: [
          "Սենյակների և ֆունկցիոնալ գոտիների պլանավորում",
          "Խոհանոցի ու սանհանգույցի դասավորության գաղափար",
          "Պահեստավորման լուծումներ",
          "Կահույքի չափերի ու տեղադրման պլան",
          "Լուսավորության սցենարներ",
          "Վարդակների և տեխնիկայի կետերի պատրաստում",
        ],
        planningTitle: "Նախագիծը մինչև վերանորոգումը",
        planningText:
          "Նախապես հաստատված դասավորությունը թույլ է տալիս էլեկտրիկին, սանտեխնիկին և հարդարողներին աշխատել նույն որոշումների հիման վրա։",
        costTitle: "Դիզայնի ծավալը",
        costText:
          "Դիզայնի արժեքը կախված է բնակարանի մակերեսից, սենյակների քանակից և նախագծային փաստաթղթերի անհրաժեշտ խորությունից։",
        faqs: [
          {
            question: "Նորակառույց բնակարանի համար դիզայն պե՞տք է",
            answer:
              "Այո, քանի որ մինչ հարդարումը կարելի է ճիշտ պլանավորել տեխնիկայի, լուսավորության և կահույքի տեղերը։",
          },
          {
            question: "Կարո՞ղ եք փոքր բնակարանի դիզայն անել",
            answer:
              "Այո։ Փոքր տարածքում հատկապես կարևոր են ֆունկցիոնալ դասավորությունն ու պահեստավորման լուծումները։",
          },
          {
            question: "Դիզայնը ներառո՞ւմ է կահույքի տեղադրումը",
            answer:
              "Կազմը համաձայնեցվում է նախագծի մեկնարկին և կարող է ներառել կահույքի տեղաբաշխման լուծումներ։",
          },
        ],
        ...hyLabels,
      }),
      ru: content({
        eyebrow: "Дизайн квартиры · Ереван",
        title: "Дизайн интерьера квартиры в Ереване",
        description:
          "Дизайн квартиры в Ереване: удобная планировка, хранение, освещение и решения, связанные с ремонтом.",
        seoTitle: "Дизайн интерьера квартиры в Ереване | SHINEX",
        seoDescription:
          "Дизайн квартиры в Ереване: планировка, мебель, освещение и решения для ремонта.",
        introduction: [
          "Главная задача дизайна квартиры — адаптировать пространство к образу жизни жильцов.",
          "Он особенно полезен для новостройки или квартиры, где требуется перепланировка.",
        ],
        scopeTitle: "Проектные решения для квартиры",
        scopeText:
          "Разрабатываем решения для удобства, хранения и повседневного использования.",
        scopeItems: [
          "Планировка комнат и зон",
          "Идея кухни и санузла",
          "Хранение",
          "План расстановки мебели",
          "Сценарии освещения",
          "Точки техники и розеток",
        ],
        planningTitle: "Проект до ремонта",
        planningText:
          "Согласованная планировка помогает всем исполнителям работать на основе одних решений.",
        costTitle: "Объём дизайна",
        costText:
          "Стоимость зависит от площади, числа помещений и требуемой глубины проектной документации.",
        faqs: [
          {
            question: "Нужен ли дизайн для новостройки?",
            answer:
              "Да, он помогает заранее спланировать технику, свет и мебель.",
          },
          {
            question: "Делаете ли вы дизайн небольшой квартиры?",
            answer:
              "Да. В небольшом пространстве особенно важны планировка и хранение.",
          },
          {
            question: "Входит ли расстановка мебели?",
            answer:
              "Состав согласуется до начала и может включать решения по мебели.",
          },
        ],
        ...ruLabels,
      }),
      en: content({
        eyebrow: "Apartment interior design · Yerevan",
        title: "Apartment interior design in Yerevan",
        description:
          "Apartment interior design in Yerevan: layouts, storage, lighting and renovation-ready decisions.",
        seoTitle: "Apartment Interior Design in Yerevan | SHINEX",
        seoDescription:
          "Apartment interior design in Yerevan: layout, furniture, lighting and practical renovation decisions.",
        introduction: [
          "Apartment design should support the daily habits of the people living there.",
          "It is especially useful for new builds or layouts that need rethinking.",
        ],
        scopeTitle: "Apartment design decisions",
        scopeText:
          "We develop solutions around comfort, storage and everyday use.",
        scopeItems: [
          "Room and zone planning",
          "Kitchen and bathroom concept",
          "Storage solutions",
          "Furniture placement plan",
          "Lighting scenarios",
          "Appliance and socket points",
        ],
        planningTitle: "Design before renovation",
        planningText:
          "An agreed layout lets every contractor work from the same decisions.",
        costTitle: "Design scope",
        costText:
          "Cost depends on area, number of rooms and the required level of design documentation.",
        faqs: [
          {
            question: "Is design useful for a new-build apartment?",
            answer:
              "Yes. It helps plan appliances, lighting and furniture before finishes begin.",
          },
          {
            question: "Do you design small apartments?",
            answer: "Yes. Layout and storage matter most in compact spaces.",
          },
          {
            question: "Does the scope include furniture placement?",
            answer:
              "It is agreed before the project starts and can include furniture solutions.",
          },
        ],
        ...enLabels,
      }),
    },
  },
  {
    slug: "commercial-renovation-yerevan",
    kind: "service",
    image: images.commercial,
    relatedServiceSlugs: ["commercial-construction", "design"],
    relatedLandingSlugs: [
      "office-renovation-yerevan",
      "interior-design-yerevan",
    ],
    translations: {
      hy: content({
        eyebrow: "Առևտրային տարածքներ · Երևան",
        title: "Առևտրային տարածքների վերանորոգում Երևանում",
        description:
          "Առևտրային տարածքների վերանորոգում Երևանում՝ գործառույթի, հաճախորդների հոսքի և աշխատանքի շարունակականության հաշվառմամբ։",
        seoTitle: "Առևտրային տարածքների վերանորոգում Երևանում | SHINEX",
        seoDescription:
          "Խանութի, սրահի, սրճարանի և այլ առևտրային տարածքի վերանորոգում Երևանում՝ փուլերի ու տեխնիկական աշխատանքների կազմակերպում։",
        introduction: [
          "Առևտրային տարածքի վերանորոգումը պետք է համապատասխանի բիզնեսի նպատակներին՝ ապահովելով այցելուի հարմարավետությունը, գործառնական գոտիները, տեսանելիությունն ու անվտանգությունը։",
          "Մինչ մեկնարկը քննարկում ենք տարածքի տեսակը, աշխատանքային ժամերը և այն, թե արդյոք վերանորոգումը պետք է չխանգարի գործող բիզնեսին։",
        ],
        scopeTitle: "Առևտրային օբյեկտի աշխատանքներ",
        scopeText:
          "Աշխատանքների կազմը հարմարեցնում ենք տարածքի գործունեությանը և գործող կանոններին։",
        scopeItems: [
          "Գործառնական գոտիների պլանավորում",
          "Պատերի, հատակի և առաստաղի հարդարում",
          "Լուսավորության ու էլեկտրական կետերի կազմակերպում",
          "Սանտեխնիկական հանգույցների աշխատանքներ",
          "Վաճառքի կամ սպասարկման գոտու պատրաստում",
          "Փուլերի կազմակերպում ըստ աշխատանքի ռեժիմի",
        ],
        planningTitle: "Վերանորոգում առանց ավելորդ դադարի",
        planningText:
          "Եթե օբյեկտը գործում է, քննարկում ենք հերթականությունը և աշխատանքային ժամերը՝ գործունեության վրա ազդեցությունը հնարավորինս սահմանափակելու համար։",
        costTitle: "Արժեքի գործոններ",
        costText:
          "Արժեքի վրա ազդում են տարածքի վիճակը, ինժեներական համակարգերը, հատուկ նյութերը, ժամային սահմանափակումները և հարդարման լուծումները։",
        faqs: [
          {
            question: "Ի՞նչ առևտրային տարածքներ եք վերանորոգում",
            answer:
              "Քննարկում ենք խանութների, սրահների, սրճարանների և այլ բիզնես տարածքների նախագծերը՝ ըստ կոնկրետ խնդրի։",
          },
          {
            question: "Կարո՞ղ է բիզնեսը գործել վերանորոգման ընթացքում",
            answer:
              "Որոշ դեպքերում հնարավոր է փուլավորել աշխատանքը, սակայն դա գնահատվում է տարածքի ու անվտանգության պահանջների հիման վրա։",
          },
          {
            question: "Կատարո՞ւմ եք էլեկտրական աշխատանքներ",
            answer:
              "Համաձայնեցված նախագծում կարող են ներառվել էլեկտրական ու այլ ինժեներական աշխատանքներ։",
          },
        ],
        ...hyLabels,
      }),
      ru: content({
        eyebrow: "Коммерческие помещения · Ереван",
        title: "Ремонт коммерческих помещений в Ереване",
        description:
          "Ремонт коммерческих помещений в Ереване с учётом функции пространства, потока клиентов и режима работы.",
        seoTitle: "Ремонт коммерческих помещений в Ереване | SHINEX",
        seoDescription:
          "Ремонт магазинов, салонов, кафе и других коммерческих помещений в Ереване: организация этапов и технических работ.",
        introduction: [
          "Коммерческий ремонт должен поддерживать цель бизнеса: удобство посетителей, функциональные зоны и безопасность.",
          "До начала обсуждаем тип помещения, график и влияние на работающий бизнес.",
        ],
        scopeTitle: "Работы на коммерческом объекте",
        scopeText:
          "Состав работ адаптируем к функции помещения и его требованиям.",
        scopeItems: [
          "Планирование зон",
          "Отделка стен, пола и потолка",
          "Освещение и электрика",
          "Сантехнические узлы",
          "Подготовка зоны продаж или обслуживания",
          "Этапы с учётом графика",
        ],
        planningTitle: "Ремонт без лишнего простоя",
        planningText:
          "Для действующего объекта согласуем порядок и время работ, чтобы уменьшить влияние на работу.",
        costTitle: "Факторы стоимости",
        costText:
          "Важны состояние помещения, инженерные системы, специальные материалы, ограничения по времени и отделка.",
        faqs: [
          {
            question: "Какие коммерческие объекты вы ремонтируете?",
            answer:
              "Рассматриваем магазины, салоны, кафе и другие бизнес-пространства по конкретной задаче.",
          },
          {
            question: "Может ли бизнес работать во время ремонта?",
            answer:
              "Иногда работы можно этапировать; это оценивается по условиям и требованиям безопасности.",
          },
          {
            question: "Выполняете ли вы электрику?",
            answer:
              "Согласованный проект может включать электрические и другие инженерные работы.",
          },
        ],
        ...ruLabels,
      }),
      en: content({
        eyebrow: "Commercial spaces · Yerevan",
        title: "Commercial space renovation in Yerevan",
        description:
          "Commercial space renovation in Yerevan, planned around function, customer flow and operating hours.",
        seoTitle: "Commercial Space Renovation in Yerevan | SHINEX",
        seoDescription:
          "Renovation of shops, salons, cafés and other commercial spaces in Yerevan: staged and technical work coordination.",
        introduction: [
          "Commercial renovation should serve the business: visitor comfort, operational zones, visibility and safety.",
          "Before work begins, we discuss the space type, operating schedule and possible impact on business.",
        ],
        scopeTitle: "Commercial property work",
        scopeText:
          "The scope is adapted to the function and requirements of the property.",
        scopeItems: [
          "Functional zone planning",
          "Wall, floor and ceiling finishes",
          "Lighting and electrical points",
          "Plumbing work",
          "Sales or service-area preparation",
          "Scheduling around operating hours",
        ],
        planningTitle: "Reducing unnecessary downtime",
        planningText:
          "For operating properties, we agree the sequence and hours to limit disruption where possible.",
        costTitle: "Cost factors",
        costText:
          "Cost is affected by condition, engineering systems, specialist materials, time constraints and finish choices.",
        faqs: [
          {
            question: "Which commercial spaces do you renovate?",
            answer:
              "We consider shops, salons, cafés and other business spaces based on the specific brief.",
          },
          {
            question: "Can a business operate during renovation?",
            answer:
              "In some cases work can be staged; this depends on the property and safety requirements.",
          },
          {
            question: "Do you carry out electrical work?",
            answer:
              "An agreed project can include electrical and other engineering work.",
          },
        ],
        ...enLabels,
      }),
    },
  },
  {
    slug: "office-renovation-yerevan",
    kind: "service",
    image: images.commercial,
    relatedServiceSlugs: ["commercial-construction", "interior-design"],
    relatedLandingSlugs: [
      "commercial-renovation-yerevan",
      "interior-design-yerevan",
    ],
    translations: {
      hy: content({
        eyebrow: "Գրասենյակների վերանորոգում · Երևան",
        title: "Գրասենյակի վերանորոգում Երևանում",
        description:
          "Գրասենյակի վերանորոգում Երևանում՝ աշխատատեղերի, հանդիպումների գոտիների, լուսավորության ու տեխնիկական ենթակառուցվածքի պլանավորմամբ։",
        seoTitle: "Գրասենյակի վերանորոգում Երևանում | SHINEX",
        seoDescription:
          "Գրասենյակի վերանորոգում Երևանում՝ հարդարում, աշխատատեղերի կազմակերպում, էլեկտրական ու լուսավորության լուծումներ։",
        introduction: [
          "Գրասենյակի վերանորոգումը պետք է աջակցի թիմի աշխատանքին և այցելուների հարմարավետությանը, ոչ միայն փոխի տեսքը։",
          "Պլանավորման ընթացքում հաշվի ենք առնում աշխատատեղերը, բանակցությունների գոտիները, սարքավորումները և լարային ենթակառուցվածքը։",
        ],
        scopeTitle: "Գրասենյակային աշխատանքների կազմը",
        scopeText:
          "Որոշումներն ընդունվում են տարածքի գործառույթի և ընկերության աշխատանքի ձևաչափի հիման վրա։",
        scopeItems: [
          "Աշխատատեղերի և ընդհանուր գոտիների դասավորություն",
          "Միջնապատեր ու ձայնային հարմարավետություն",
          "Էլեկտրական, ցանցային և լուսավորության կետեր",
          "Հարդարում և հատակի ծածկույթներ",
          "Խոհանոցի կամ սանհանգույցի գոտիներ",
          "Փուլային աշխատանքներ գործող գրասենյակի համար",
        ],
        planningTitle: "Աշխատանքի ռեժիմի հաշվառում",
        planningText:
          "Գործող գրասենյակի համար կարող ենք քննարկել հերթականությունը՝ որպեսզի աղմկոտ կամ խոչընդոտող փուլերը պլանավորվեն հարմար ժամանակ։",
        costTitle: "Բյուջեի ձևավորում",
        costText:
          "Նախահաշվի վրա ազդում են վերապլանավորման ծավալը, ինժեներական կետերը, ցանցային լուծումները, նյութերն ու ավարտման պահանջվող ժամկետը։",
        faqs: [
          {
            question: "Կատարո՞ւմ եք գործող գրասենյակի վերանորոգում",
            answer:
              "Քննարկում ենք աշխատանքների փուլավորումը, եթե տարածքի պայմաններն ու անվտանգությունը թույլ են տալիս։",
          },
          {
            question:
              "Կարո՞ղ եք կազմակերպել լուսավորության և վարդակների կետերը",
            answer:
              "Այո, դրանք որոշվում են աշխատատեղերի ու սարքավորումների պլանի համաձայն։",
          },
          {
            question: "Որքա՞ն է տևում գրասենյակի վերանորոգումը",
            answer:
              "Ժամկետը կախված է մակերեսից, փոփոխությունների ծավալից և աշխատանքային ռեժիմից։",
          },
        ],
        ...hyLabels,
      }),
      ru: content({
        eyebrow: "Ремонт офисов · Ереван",
        title: "Ремонт офиса в Ереване",
        description:
          "Ремонт офиса в Ереване с планированием рабочих мест, переговорных зон, света и технической инфраструктуры.",
        seoTitle: "Ремонт офиса в Ереване | SHINEX",
        seoDescription:
          "Ремонт офиса в Ереване: отделка, организация рабочих мест, электрические и световые решения.",
        introduction: [
          "Офисный ремонт должен поддерживать работу команды и комфорт посетителей, а не только менять внешний вид.",
          "При планировании учитываем рабочие места, переговорные, оборудование и кабельную инфраструктуру.",
        ],
        scopeTitle: "Состав офисных работ",
        scopeText:
          "Решения принимаются с учётом функции пространства и формата работы компании.",
        scopeItems: [
          "Рабочие и общие зоны",
          "Перегородки и акустика",
          "Электрика, сеть и свет",
          "Отделка и напольные покрытия",
          "Кухня или санузел",
          "Этапы для действующего офиса",
        ],
        planningTitle: "Учёт рабочего режима",
        planningText:
          "Для работающего офиса согласуем порядок работ, чтобы шумные этапы проходили в подходящее время.",
        costTitle: "Формирование бюджета",
        costText:
          "На смету влияют перепланировка, инженерные точки, сетевые решения, материалы и требуемый срок.",
        faqs: [
          {
            question: "Ремонтируете ли действующие офисы?",
            answer:
              "Обсуждаем этапность, если это допускают условия помещения и безопасность.",
          },
          {
            question: "Можете организовать свет и розетки?",
            answer: "Да, их планируют по рабочим местам и оборудованию.",
          },
          {
            question: "Сколько длится ремонт офиса?",
            answer:
              "Срок зависит от площади, объёма изменений и режима работы.",
          },
        ],
        ...ruLabels,
      }),
      en: content({
        eyebrow: "Office renovation · Yerevan",
        title: "Office renovation in Yerevan",
        description:
          "Office renovation in Yerevan with planning for workstations, meeting areas, lighting and technical infrastructure.",
        seoTitle: "Office Renovation in Yerevan | SHINEX",
        seoDescription:
          "Office renovation in Yerevan: finishes, workplace organisation, electrical and lighting solutions.",
        introduction: [
          "Office renovation should support the team's work and visitor comfort, not just change appearances.",
          "Planning considers workstations, meeting areas, equipment and cabling.",
        ],
        scopeTitle: "Office work scope",
        scopeText:
          "Decisions follow the space function and the company's work format.",
        scopeItems: [
          "Work and common areas",
          "Partitions and acoustics",
          "Electrical, network and lighting points",
          "Finishes and floor coverings",
          "Kitchen or bathroom areas",
          "Staging for an operating office",
        ],
        planningTitle: "Working around operations",
        planningText:
          "For an operating office, we can agree a sequence so disruptive stages happen at suitable times.",
        costTitle: "Budget factors",
        costText:
          "Layout changes, engineering points, network needs, materials and the target deadline all affect the estimate.",
        faqs: [
          {
            question: "Do you renovate operating offices?",
            answer:
              "We discuss staging where property conditions and safety allow it.",
          },
          {
            question: "Can you plan lighting and sockets?",
            answer: "Yes, based on the workplace and equipment plan.",
          },
          {
            question: "How long does office renovation take?",
            answer: "It depends on area, change scope and operating schedule.",
          },
        ],
        ...enLabels,
      }),
    },
  },
  {
    slug: "capital-renovation-yerevan",
    kind: "service",
    image: images.renovation,
    relatedServiceSlugs: ["renovation", "interior-design"],
    relatedLandingSlugs: [
      "apartment-renovation-yerevan",
      "cosmetic-renovation-yerevan",
      "renovation-estimate-yerevan",
    ],
    translations: {
      hy: content({
        eyebrow: "Կապիտալ վերանորոգում · Երևան",
        title: "Կապիտալ վերանորոգում Երևանում",
        description:
          "Կապիտալ վերանորոգում Երևանում՝ հին ծածկույթների ապամոնտաժումից մինչև ինժեներական համակարգերի թարմացում և վերջնական հարդարում։",
        seoTitle: "Կապիտալ վերանորոգում Երևանում | SHINEX",
        seoDescription:
          "Կապիտալ վերանորոգում Երևանում բնակարանի կամ տան համար՝ ապամոնտաժում, էլեկտրական, սանտեխնիկական և հարդարման աշխատանքներ։",
        introduction: [
          "Կապիտալ վերանորոգումը ճիշտ ընտրություն է, երբ անհրաժեշտ է փոխել ոչ միայն տեսքը, այլև մաշված հաղորդակցությունները, հիմքերը կամ տարածքի կառուցվածքը։",
          "Մինչ մեկնարկը գնահատում ենք օբյեկտի իրական վիճակը, որպեսզի աշխատանքների հերթականությունն անվտանգ ու տրամաբանական լինի։",
        ],
        scopeTitle: "Կապիտալ վերանորոգման փուլեր",
        scopeText:
          "Աշխատանքների վերջնական ցանկը կազմվում է զննումից հետո՝ ելնելով բնակարանի կամ տան վիճակից։",
        scopeItems: [
          "Ապամոնտաժում և աղբի կազմակերպում",
          "Պատերի, հատակի և առաստաղի հիմքերի պատրաստում",
          "Էլեկտրական համակարգի թարմացում",
          "Սանտեխնիկական համակարգի աշխատանքներ",
          "Միջնապատերի կամ դասավորության փոփոխություններ",
          "Վերջնական հարդարում",
        ],
        planningTitle: "Ինչո՞ւ է զննումը կարևոր",
        planningText:
          "Հին շենքում տեսանելի հարդարումը միշտ չէ, որ ցույց է տալիս պատերի, հատակի կամ հաղորդակցությունների վիճակը։ Զննումը օգնում է կանխել անսպասելի ծավալներ։",
        costTitle: "Գնի վրա ազդող հանգամանքներ",
        costText:
          "Կապիտալ վերանորոգման արժեքը կախված է ապամոնտաժման, մակերեսների շտկման, էլեկտրական ու սանտեխնիկական աշխատանքների և նյութերի ծավալից։",
        faqs: [
          {
            question:
              "Ի՞նչ տարբերություն կա կապիտալ և կոսմետիկ վերանորոգման միջև",
            answer:
              "Կապիտալ վերանորոգումը կարող է ներառել հիմքերի ու հաղորդակցությունների փոփոխություն, իսկ կոսմետիկը հիմնականում թարմացնում է տեսանելի հարդարումը։",
          },
          {
            question: "Պե՞տք է փոխել էլեկտրական համակարգը",
            answer:
              "Դա որոշվում է օբյեկտի վիճակից, հզորության պահանջից և անվտանգության գնահատումից հետո։",
          },
          {
            question: "Կարո՞ղ եք նախահաշիվ կազմել",
            answer:
              "Այո, կարող ենք ներկայացնել նախնական արժեքի հաշվարկ, իսկ ճշգրիտ նախահաշիվը կազմվում է զննումից հետո։",
          },
        ],
        ...hyLabels,
      }),
      ru: content({
        eyebrow: "Капитальный ремонт · Ереван",
        title: "Капитальный ремонт в Ереване",
        description:
          "Капитальный ремонт в Ереване: от демонтажа старой отделки до обновления инженерных систем и чистовой отделки.",
        seoTitle: "Капитальный ремонт в Ереване | SHINEX",
        seoDescription:
          "Капитальный ремонт квартиры или дома в Ереване: демонтаж, электрика, сантехника и отделка.",
        introduction: [
          "Капитальный ремонт нужен, когда требуется обновить не только вид, но и коммуникации, основания или планировку.",
          "До начала оцениваем фактическое состояние объекта, чтобы выстроить безопасную последовательность.",
        ],
        scopeTitle: "Этапы капитального ремонта",
        scopeText:
          "Итоговый список работ формируется после осмотра состояния объекта.",
        scopeItems: [
          "Демонтаж",
          "Подготовка стен, пола и потолка",
          "Обновление электрики",
          "Сантехнические работы",
          "Перегородки или изменения планировки",
          "Чистовая отделка",
        ],
        planningTitle: "Почему важен осмотр",
        planningText:
          "Старая отделка не всегда показывает состояние оснований и коммуникаций; осмотр снижает риск сюрпризов.",
        costTitle: "Что влияет на цену",
        costText:
          "Важны демонтаж, выравнивание, электрика, сантехника и объём материалов.",
        faqs: [
          {
            question: "Чем капитальный ремонт отличается от косметического?",
            answer:
              "Капитальный может затрагивать основания и коммуникации, а косметический в основном обновляет видимую отделку.",
          },
          {
            question: "Нужно ли менять электрику?",
            answer:
              "Это определяется состоянием, нагрузкой и оценкой безопасности.",
          },
          {
            question: "Можно составить смету?",
            answer: "Да, точная смета готовится после осмотра.",
          },
        ],
        ...ruLabels,
      }),
      en: content({
        eyebrow: "Capital renovation · Yerevan",
        title: "Capital renovation in Yerevan",
        description:
          "Capital renovation in Yerevan, from removing old finishes to updating engineering systems and final finishes.",
        seoTitle: "Capital Renovation in Yerevan | SHINEX",
        seoDescription:
          "Capital renovation of apartments and houses in Yerevan: demolition, electrical, plumbing and finishing work.",
        introduction: [
          "Capital renovation is appropriate when the property needs more than a visual refresh: utilities, substrates or layout may need attention.",
          "Before work starts, we assess the actual condition to plan a safe sequence.",
        ],
        scopeTitle: "Capital renovation stages",
        scopeText:
          "The final work list is defined after surveying the property.",
        scopeItems: [
          "Demolition",
          "Wall, floor and ceiling preparation",
          "Electrical upgrades",
          "Plumbing work",
          "Partitions or layout changes",
          "Final finishes",
        ],
        planningTitle: "Why a survey matters",
        planningText:
          "Old finishes do not always show the condition of substrates and utilities; a survey reduces surprises.",
        costTitle: "What affects price",
        costText:
          "Demolition, levelling, electrical and plumbing work, and materials all influence cost.",
        faqs: [
          {
            question:
              "How does capital renovation differ from cosmetic renovation?",
            answer:
              "Capital work may affect substrates and utilities; cosmetic work mainly refreshes visible finishes.",
          },
          {
            question: "Does the electrical system need replacing?",
            answer:
              "That depends on condition, demand and a safety assessment.",
          },
          {
            question: "Can you prepare an estimate?",
            answer: "Yes. A precise estimate follows the property survey.",
          },
        ],
        ...enLabels,
      }),
    },
  },
  {
    slug: "cosmetic-renovation-yerevan",
    kind: "service",
    image: images.renovation,
    relatedServiceSlugs: ["renovation"],
    relatedLandingSlugs: [
      "apartment-renovation-yerevan",
      "capital-renovation-yerevan",
      "renovation-estimate-yerevan",
    ],
    translations: {
      hy: content({
        eyebrow: "Կոսմետիկ վերանորոգում · Երևան",
        title: "Կոսմետիկ վերանորոգում Երևանում",
        description:
          "Կոսմետիկ վերանորոգում Երևանում՝ բնակարանի, տան կամ առանձին սենյակի հարդարումը թարմացնելու համար՝ առանց չարդարացված մեծածավալ միջամտության։",
        seoTitle: "Կոսմետիկ վերանորոգում Երևանում | SHINEX",
        seoDescription:
          "Կոսմետիկ վերանորոգում Երևանում՝ պատերի, առաստաղի, հատակի, սալիկի և առանձին գոտիների հարդարման թարմացում։",
        introduction: [
          "Կոսմետիկ վերանորոգումը հարմար է, երբ տարածքի հիմքերը և համակարգերը բավարար վիճակում են, բայց հարդարումը, գույները կամ առանձին հատվածները թարմացման կարիք ունեն։",
          "Մինչ աշխատանքը ճշտում ենք մակերեսների վիճակը, որպեսզի արտաքին թարմացումը չթաքցնի ավելի լուրջ խնդիր։",
        ],
        scopeTitle: "Ի՞նչ է ներառում կոսմետիկ վերանորոգումը",
        scopeText:
          "Կազմը կարող է փոքր լինել մեկ սենյակի համար կամ ընդգրկել ամբողջ բնակարանը՝ ըստ պահանջի։",
        scopeItems: [
          "Պատերի նախապատրաստում և ներկում",
          "Պաստառի կամ այլ պատային ծածկույթի թարմացում",
          "Առաստաղի վերանորոգում",
          "Հատակի ծածկույթի տեղային կամ ամբողջական թարմացում",
          "Սալիկի ու սանտեխնիկայի տեսանելի հատվածների վերականգնում",
          "Լուսավորության կամ դռների փոխարինում",
        ],
        planningTitle: "Ե՞րբ է այն բավարար",
        planningText:
          "Եթե էլեկտրական, սանտեխնիկական և կառուցվածքային խնդիրներ չկան, կոսմետիկ լուծումը կարող է արագ թարմացնել տարածքի տեսքը։",
        costTitle: "Նախնական հաշվարկ",
        costText:
          "Գինը կախված է մակերեսից, պատերի ու հատակի վիճակից, ընտրված նյութերից և անհրաժեշտ վերականգնման աշխատանքներից։",
        faqs: [
          {
            question: "Կոսմետիկ վերանորոգումը ներառո՞ւմ է էլեկտրիկա",
            answer:
              "Եթե առկա են ինժեներական խնդիրներ, գնահատում ենք՝ արդյոք պետք է դրանք լուծել առանձին՝ մինչ հարդարումը։",
          },
          {
            question: "Կարո՞ղ եք վերանորոգել մեկ սենյակ",
            answer:
              "Այո, հնարավոր է քննարկել մեկ սենյակի կամ առանձին գոտու աշխատանքները։",
          },
          {
            question: "Որքա՞ն ժամանակ է տևում",
            answer:
              "Ժամկետը կախված է մակերեսից, շերտերի չորացման ժամանակից և աշխատանքների կազմից։",
          },
        ],
        ...hyLabels,
      }),
      ru: content({
        eyebrow: "Косметический ремонт · Ереван",
        title: "Косметический ремонт в Ереване",
        description:
          "Косметический ремонт в Ереване для обновления отделки квартиры, дома или отдельной комнаты без неоправданного большого вмешательства.",
        seoTitle: "Косметический ремонт в Ереване | SHINEX",
        seoDescription:
          "Косметический ремонт в Ереване: обновление стен, потолка, пола, плитки и отдельных зон.",
        introduction: [
          "Косметический ремонт подходит, когда основания и системы в нормальном состоянии, но отделку или отдельные зоны нужно обновить.",
          "До начала уточняем состояние поверхностей, чтобы внешнее обновление не скрыло серьёзную проблему.",
        ],
        scopeTitle: "Что может включать косметический ремонт",
        scopeText:
          "Он может быть небольшим для одной комнаты или охватывать всю квартиру.",
        scopeItems: [
          "Подготовка и покраска стен",
          "Обновление обоев или покрытий",
          "Ремонт потолка",
          "Обновление пола",
          "Восстановление видимых зон плитки и сантехники",
          "Замена света или дверей",
        ],
        planningTitle: "Когда этого достаточно",
        planningText:
          "Если нет инженерных и конструктивных проблем, косметический ремонт может быстро освежить пространство.",
        costTitle: "Предварительный расчёт",
        costText:
          "Цена зависит от площади, состояния стен и пола, материалов и восстановительных работ.",
        faqs: [
          {
            question: "Входит ли электрика?",
            answer:
              "Если есть инженерные проблемы, оцениваем, нужно ли решить их отдельно до отделки.",
          },
          {
            question: "Можно отремонтировать одну комнату?",
            answer: "Да, можно обсудить одну комнату или отдельную зону.",
          },
          {
            question: "Сколько это занимает?",
            answer:
              "Срок зависит от площади, высыхания материалов и состава работ.",
          },
        ],
        ...ruLabels,
      }),
      en: content({
        eyebrow: "Cosmetic renovation · Yerevan",
        title: "Cosmetic renovation in Yerevan",
        description:
          "Cosmetic renovation in Yerevan for refreshing an apartment, house or individual room without unnecessary major intervention.",
        seoTitle: "Cosmetic Renovation in Yerevan | SHINEX",
        seoDescription:
          "Cosmetic renovation in Yerevan: refreshed walls, ceilings, floors, tile and individual zones.",
        introduction: [
          "Cosmetic renovation suits properties where the substrate and systems are sound but finishes or selected areas need refreshing.",
          "We check surfaces first so a visual update does not conceal a more serious issue.",
        ],
        scopeTitle: "What cosmetic renovation can include",
        scopeText:
          "The scope may be limited to one room or extend through the whole apartment.",
        scopeItems: [
          "Wall preparation and painting",
          "Wallpaper or wall-covering updates",
          "Ceiling repair",
          "Floor-covering updates",
          "Visible tile and sanitary-area refresh",
          "Lighting or door replacement",
        ],
        planningTitle: "When it is enough",
        planningText:
          "Where there are no engineering or structural issues, cosmetic work can quickly refresh the space.",
        costTitle: "Initial estimate",
        costText:
          "Cost depends on area, wall and floor condition, material choices and required restoration work.",
        faqs: [
          {
            question: "Does it include electrical work?",
            answer:
              "If there is an engineering issue, we assess whether it should be resolved separately before finishing.",
          },
          {
            question: "Can you renovate one room?",
            answer: "Yes. We can discuss a single room or individual area.",
          },
          {
            question: "How long does it take?",
            answer:
              "It depends on area, material drying time and the agreed scope.",
          },
        ],
        ...enLabels,
      }),
    },
  },
  {
    slug: "renovation-estimate-yerevan",
    kind: "prices",
    image: images.renovation,
    relatedServiceSlugs: ["renovation"],
    relatedLandingSlugs: [
      "prices",
      "renovation-price-per-square-meter-yerevan",
      "capital-renovation-yerevan",
    ],
    translations: {
      hy: content({
        eyebrow: "Վերանորոգման նախահաշիվ · Երևան",
        title: "Վերանորոգման նախահաշիվ Երևանում",
        description:
          "Վերանորոգման նախահաշիվ Երևանում՝ աշխատանքների ծավալը, չափման միավորները և բյուջեի հիմնական գործոնները հասկանալու համար։",
        seoTitle: "Վերանորոգման նախահաշիվ Երևանում | SHINEX",
        seoDescription:
          "Վերանորոգման նախահաշվի կազմում Երևանում՝ զննումից հետո աշխատանքների ցանկ, ծավալներ և արժեքի ճշգրիտ հաշվարկ։",
        introduction: [
          "Նախահաշիվը պետք է օգնի հասկանալ՝ ինչ աշխատանքների համար է նախատեսվում բյուջեն և ինչից կարող է փոխվել այն։",
          "Հեռախոսով ասված մեկ ընդհանուր թիվը չի փոխարինում օբյեկտի զննմանն ու չափագրությանը, հատկապես երբ կան ինժեներական կամ նախապատրաստական աշխատանքներ։",
        ],
        scopeTitle: "Ի՞նչ է պետք ներառի նախահաշիվը",
        scopeText:
          "Լավ նախահաշիվը բաժանում է աշխատանքները փուլերի և նշում է դրանց չափման միավորը ու հաշվարկի հիմքը։",
        scopeItems: [
          "Աշխատանքների անվանումներ",
          "Ծավալներ և չափման միավորներ",
          "Նախապատրաստական ու ապամոնտաժման աշխատանքներ",
          "Ինժեներական աշխատանքների ցանկ",
          "Հարդարման աշխատանքների շրջանակ",
          "Համաձայնեցման ենթակա լրացուցիչ պայմաններ",
        ],
        planningTitle: "Ինչպե՞ս ստանալ ճշգրիտ հաշվարկ",
        planningText:
          "Սկզբում հավաքում ենք բնակարանի կամ տարածքի հիմնական տվյալները, ապա զննման և չափագրության հիման վրա ճշտում ենք աշխատանքների կազմը։",
        costTitle: "Ինչո՞ւ է գինը փոխվում",
        costText:
          "Փոփոխությունների պատճառ կարող են լինել թաքնված խնդիրները, մակերեսների վիճակը, ընտրված նյութերը, նախագծային լուծումները և աշխատանքների ծավալի հստակեցումը։",
        faqs: [
          {
            question: "Կարո՞ղ եմ հեռախոսով ստանալ ճշգրիտ գին",
            answer:
              "Հեռախոսով կարող ենք ներկայացնել նախնական արժեքի հաշվարկ, սակայն ճշգրիտ նախահաշվի համար անհրաժեշտ են օբյեկտի տվյալներն ու զննումը։",
          },
          {
            question: "Նախահաշիվը ներառո՞ւմ է նյութերը",
            answer:
              "Նյութերի հարցը և դրանց ներառման կարգը համաձայնեցվում են առանձին՝ ըստ նախագծի։",
          },
          {
            question: "Ի՞նչ տվյալներ են պետք հաշվարկի համար",
            answer:
              "Մակերեսը, տարածքի վիճակը, պահանջվող աշխատանքները և հնարավորության դեպքում լուսանկարներ կամ հատակագիծ։",
          },
        ],
        ...hyLabels,
      }),
      ru: content({
        eyebrow: "Смета на ремонт · Ереван",
        title: "Смета на ремонт в Ереване",
        description:
          "Смета на ремонт в Ереване помогает понять объём работ, единицы измерения и ключевые факторы бюджета.",
        seoTitle: "Смета на ремонт в Ереване | SHINEX",
        seoDescription:
          "Составление сметы на ремонт в Ереване: перечень работ, объёмы и точный расчёт после осмотра.",
        introduction: [
          "Смета должна объяснять, на какие работы закладывается бюджет и от чего он может меняться.",
          "Одна цифра по телефону не заменяет осмотр и замеры, особенно при инженерных и подготовительных работах.",
        ],
        scopeTitle: "Что должна включать смета",
        scopeText:
          "Хорошая смета делит работы на этапы и указывает единицы измерения и основу расчёта.",
        scopeItems: [
          "Наименования работ",
          "Объёмы и единицы",
          "Подготовка и демонтаж",
          "Инженерные работы",
          "Объём отделки",
          "Дополнительные условия для согласования",
        ],
        planningTitle: "Как получить точный расчёт",
        planningText:
          "Сначала собираем основные данные, затем уточняем состав работ после осмотра и замеров.",
        costTitle: "Почему цена меняется",
        costText:
          "На неё влияют скрытые проблемы, состояние поверхностей, материалы, проектные решения и уточнение объёмов.",
        faqs: [
          {
            question: "Можно узнать точную цену по телефону?",
            answer:
              "Можно получить ориентир, но точная смета требует данных об объекте и осмотра.",
          },
          {
            question: "Включает ли смета материалы?",
            answer: "Это согласуется отдельно в зависимости от проекта.",
          },
          {
            question: "Что нужно для расчёта?",
            answer:
              "Площадь, состояние, требуемые работы и по возможности фото или план.",
          },
        ],
        ...ruLabels,
      }),
      en: content({
        eyebrow: "Renovation estimate · Yerevan",
        title: "Renovation estimate in Yerevan",
        description:
          "A renovation estimate in Yerevan clarifies work scope, units of measure and the main budget factors.",
        seoTitle: "Renovation Estimate in Yerevan | SHINEX",
        seoDescription:
          "Renovation estimates in Yerevan: work list, quantities and a precise calculation after a survey.",
        introduction: [
          "An estimate should show what the budget covers and what may change it.",
          "A single phone figure cannot replace a survey and measurements, especially where engineering or preparation is required.",
        ],
        scopeTitle: "What an estimate should include",
        scopeText:
          "A useful estimate separates stages and states quantities, units and the calculation basis.",
        scopeItems: [
          "Work names",
          "Quantities and units",
          "Preparation and demolition",
          "Engineering work",
          "Finishing scope",
          "Additional conditions to agree",
        ],
        planningTitle: "Getting a precise calculation",
        planningText:
          "We collect the starting information, then refine the scope after a survey and measurements.",
        costTitle: "Why price changes",
        costText:
          "Hidden issues, substrate condition, materials, design decisions and refined quantities can all affect price.",
        faqs: [
          {
            question: "Can I get an exact price by phone?",
            answer:
              "We can give an initial guide, but a precise estimate needs property details and a survey.",
          },
          {
            question: "Does an estimate include materials?",
            answer: "This is agreed separately according to the project.",
          },
          {
            question: "What is needed for an estimate?",
            answer:
              "Area, condition, required work and, where possible, photos or a plan.",
          },
        ],
        ...enLabels,
      }),
    },
  },
  {
    slug: "renovation-price-per-square-meter-yerevan",
    kind: "prices",
    image: images.renovation,
    relatedServiceSlugs: ["renovation"],
    relatedLandingSlugs: [
      "prices",
      "renovation-estimate-yerevan",
      "apartment-renovation-yerevan",
    ],
    translations: {
      hy: content({
        eyebrow: "Վերանորոգման արժեք · Երևան",
        title: "Վերանորոգման արժեքը մեկ քմ-ի համար Երևանում",
        description:
          "Ինչու վերանորոգման մեկ քմ-ի գինը Երևանում միայն նախնական ցուցանիշ է, և որ գործոններն են որոշում Ձեր օբյեկտի իրական արժեքը։",
        seoTitle: "Վերանորոգման արժեքը մեկ քմ-ի համար Երևանում | SHINEX",
        seoDescription:
          "Վերանորոգման մեկ քմ-ի արժեք Երևանում․ ինչից է կախված գինը և ինչպես ստանալ օբյեկտի համար ճշգրիտ նախահաշիվ։",
        introduction: [
          "Մեկ քառակուսի մետրի գինը կարող է օգնել նախնական բյուջե պատկերացնել, բայց նույն մակերեսով երկու բնակարաններ հաճախ ունեն բոլորովին տարբեր աշխատանքների ծավալ։",
          "Համեմատելու համար կարևոր է հասկանալ՝ տվյալ գնի մեջ ինչ է ներառված՝ ապամոնտաժում, ինժեներական աշխատանքներ, նյութեր, հարդարում, թե դրանցից միայն մի մասը։",
        ],
        scopeTitle: "Ինչո՞ւ մեկ քմ-ի գինը տարբեր է",
        scopeText:
          "Քմ-ի ցուցանիշը չի փոխարինում նախահաշվին, քանի որ այն չի ցույց տալիս տարածքի ելակետային վիճակն ու տեխնիկական բարդությունները։",
        scopeItems: [
          "Բնակարանի ելակետային վիճակ",
          "Ապամոնտաժման անհրաժեշտություն",
          "Էլեկտրական ու սանտեխնիկական կետերի քանակ",
          "Պատերի և հատակի շտկում",
          "Հարդարման նյութերի մակարդակ",
          "Դիզայնի ու անհատական լուծումների բարդություն",
        ],
        planningTitle: "Ինչպե՞ս ճիշտ համեմատել առաջարկները",
        planningText:
          "Համեմատեք ոչ միայն վերջնական թիվը, այլև աշխատանքների ցանկը, ծավալները, ներառված նյութերն ու պայմանները։",
        costTitle: "Ձեր օբյեկտի հաշվարկը",
        costText:
          "Ավելի վստահելի արժեք ստանալու համար անհրաժեշտ են մակերեսի տվյալներ, տարածքի վիճակի նկարագրություն և ցանկալի աշխատանքների ցանկ։",
        faqs: [
          {
            question: "Կա՞ ֆիքսված գին մեկ քմ-ի համար",
            answer:
              "Կողմնորոշիչ միջակայք կարող է լինել, սակայն ճշգրիտ գինը կախված է կոնկրետ աշխատանքի ծավալից։",
          },
          {
            question: "Մեկ քմ-ի գնի մեջ նյութե՞րն են ներառված",
            answer:
              "Սա պետք է ճշտել յուրաքանչյուր առաջարկում, քանի որ նյութերի ներառումը տարբեր կարող է լինել։",
          },
          {
            question: "Ինչպե՞ս ստանալ ճշգրիտ գին",
            answer:
              "Կապվեք հիմնական տվյալներով կամ օգտագործեք հաշվիչը, ապա ճշգրտեք այն զննումից հետո։",
          },
        ],
        ...hyLabels,
      }),
      ru: content({
        eyebrow: "Стоимость ремонта · Ереван",
        title: "Стоимость ремонта за м² в Ереване",
        description:
          "Почему цена ремонта за м² в Ереване является ориентиром и какие факторы определяют реальную стоимость объекта.",
        seoTitle: "Стоимость ремонта за м² в Ереване | SHINEX",
        seoDescription:
          "Цена ремонта за квадратный метр в Ереване: от чего зависит и как получить точную смету для объекта.",
        introduction: [
          "Цена за квадратный метр помогает представить начальный бюджет, но два одинаковых по площади объекта могут требовать очень разного объёма работ.",
          "Важно понимать, что включено: демонтаж, инженерные работы, материалы, отделка или только часть этого.",
        ],
        scopeTitle: "Почему цена за м² отличается",
        scopeText:
          "Показатель за м² не заменяет смету: он не показывает исходное состояние и техническую сложность.",
        scopeItems: [
          "Исходное состояние",
          "Необходимость демонтажа",
          "Количество электрических и сантехнических точек",
          "Выравнивание стен и пола",
          "Уровень материалов",
          "Сложность дизайна",
        ],
        planningTitle: "Как сравнивать предложения",
        planningText:
          "Сравнивайте не только итоговую цифру, но и перечень, объёмы, материалы и условия.",
        costTitle: "Расчёт для вашего объекта",
        costText:
          "Для более точной оценки нужны площадь, описание состояния и желаемый список работ.",
        faqs: [
          {
            question: "Есть фиксированная цена за м²?",
            answer:
              "Ориентир возможен, но точная цена зависит от конкретного объёма.",
          },
          {
            question: "Входит ли материал в цену за м²?",
            answer: "Это нужно уточнять в каждом предложении.",
          },
          {
            question: "Как получить точную цену?",
            answer:
              "Передайте исходные данные или используйте калькулятор, затем уточните расчёт после осмотра.",
          },
        ],
        ...ruLabels,
      }),
      en: content({
        eyebrow: "Renovation cost · Yerevan",
        title: "Renovation cost per m² in Yerevan",
        description:
          "Why a renovation price per m² in Yerevan is only a guide, and what determines the real cost of a property.",
        seoTitle: "Renovation Cost per m² in Yerevan | SHINEX",
        seoDescription:
          "Renovation price per square metre in Yerevan: what affects it and how to get a precise property estimate.",
        introduction: [
          "A per-square-metre figure can guide an initial budget, but two properties with the same area can need very different work.",
          "It matters what the figure includes: demolition, engineering work, materials, finishes, or only part of that scope.",
        ],
        scopeTitle: "Why per-m² pricing differs",
        scopeText:
          "A per-m² figure does not replace an estimate because it does not capture condition and technical complexity.",
        scopeItems: [
          "Starting condition",
          "Demolition needs",
          "Electrical and plumbing point count",
          "Wall and floor levelling",
          "Material level",
          "Design complexity",
        ],
        planningTitle: "Comparing proposals",
        planningText:
          "Compare not only the final number but also the work list, quantities, materials and conditions.",
        costTitle: "A calculation for your property",
        costText:
          "A more reliable estimate needs area, a description of condition and the desired work scope.",
        faqs: [
          {
            question: "Is there a fixed price per m²?",
            answer:
              "A guide range may be possible, but precise cost depends on the specific scope.",
          },
          {
            question: "Are materials included in the price per m²?",
            answer: "This should be checked in each proposal.",
          },
          {
            question: "How do I get an exact price?",
            answer:
              "Share the initial details or use the calculator, then refine after a survey.",
          },
        ],
        ...enLabels,
      }),
    },
  },
  {
    slug: "plumbing-work-yerevan",
    kind: "service",
    image: images.renovation,
    relatedServiceSlugs: ["renovation", "commercial-construction"],
    relatedLandingSlugs: [
      "capital-renovation-yerevan",
      "apartment-renovation-yerevan",
      "renovation-estimate-yerevan",
    ],
    translations: {
      hy: content({
        eyebrow: "Սանտեխնիկական աշխատանքներ · Երևան",
        title: "Սանտեխնիկական աշխատանքներ Երևանում",
        description:
          "Սանտեխնիկական աշխատանքներ Երևանում բնակարանի, տան կամ բիզնես տարածքի վերանորոգման շրջանակում՝ պլանավորումից մինչև տեղադրում և ստուգում։",
        seoTitle: "Սանտեխնիկական աշխատանքներ Երևանում | SHINEX",
        seoDescription:
          "Սանտեխնիկական աշխատանքներ Երևանում՝ ջրամատակարարում, ջրահեռացում, սանհանգույց ու խոհանոցի կետերի կազմակերպում վերանորոգման ընթացքում։",
        introduction: [
          "Սանտեխնիկական աշխատանքները լավագույնն է պլանավորել վերանորոգման սկզբում, մինչ պատերի և հատակի վերջնական հարդարումը։",
          "Կետերի տեղադրումը կախված է խոհանոցի, սանհանգույցի, տեխնիկայի և կահույքի վերջնական դասավորությունից։",
        ],
        scopeTitle: "Սանտեխնիկական լուծումներ",
        scopeText:
          "Կատարվող գործերի ցանկը համաձայնեցնում ենք տարածքի սխեմայի, առկա համակարգերի և ապագա օգտագործման հիման վրա։",
        scopeItems: [
          "Ջրամատակարարման կետերի պլանավորում",
          "Ջրահեռացման լուծումներ",
          "Սանհանգույցի սարքավորումների միացման նախապատրաստում",
          "Խոհանոցի լվացարանի և տեխնիկայի կետեր",
          "Հին հանգույցների վերանորոգման կամ փոխարինման գնահատում",
          "Տեղադրված համակարգի ստուգում",
        ],
        planningTitle: "Ինչո՞ւ է անհրաժեշտ նախապես որոշել դասավորությունը",
        planningText:
          "Սարքավորումների ու կահույքի տեղերի փոփոխությունը վերջնական հարդարումից հետո կարող է լրացուցիչ աշխատանքներ պահանջել, դրա համար կետերը ճշտում ենք սկզբում։",
        costTitle: "Արժեքի վրա ազդող գործոններ",
        costText:
          "Արժեքը կախված է կետերի քանակից, խողովակների ընթացքից, առկա համակարգի վիճակից, ապամոնտաժման կարիքից և ընտրված սարքավորումներից։",
        faqs: [
          {
            question: "Ե՞րբ անել սանտեխնիկական աշխատանքները",
            answer:
              "Սովորաբար՝ վերանորոգման նախապատրաստական ու ինժեներական փուլում, մինչ վերջնական հարդարումը։",
          },
          {
            question: "Կարո՞ղ եք փոխել խոհանոցի կամ սանհանգույցի կետերի տեղերը",
            answer:
              "Հնարավորությունը գնահատվում է տվյալ տարածքի համակարգերի ու տեխնիկական պայմանների հիման վրա։",
          },
          {
            question: "Կատարո՞ւմ եք աշխատանքներ առանձին",
            answer:
              "Քննարկում ենք խնդրի ծավալը և առաջարկում ենք համապատասխան կազմակերպման ձևաչափ։",
          },
        ],
        ...hyLabels,
      }),
      ru: content({
        eyebrow: "Сантехнические работы · Ереван",
        title: "Сантехнические работы в Ереване",
        description:
          "Сантехнические работы в Ереване для квартиры, дома или бизнеса в рамках ремонта: от планирования до монтажа и проверки.",
        seoTitle: "Сантехнические работы в Ереване | SHINEX",
        seoDescription:
          "Сантехнические работы в Ереване: водоснабжение, канализация, точки ванной и кухни в ходе ремонта.",
        introduction: [
          "Сантехнические работы лучше планировать в начале ремонта, до финальной отделки стен и пола.",
          "Расположение точек зависит от планировки кухни, ванной, техники и мебели.",
        ],
        scopeTitle: "Сантехнические решения",
        scopeText:
          "Список работ согласуется по схеме помещения, существующей системе и будущему использованию.",
        scopeItems: [
          "Точки водоснабжения",
          "Канализация",
          "Подготовка подключений санузла",
          "Точки кухни и техники",
          "Оценка замены старых узлов",
          "Проверка смонтированной системы",
        ],
        planningTitle: "Почему планировка нужна заранее",
        planningText:
          "Изменение оборудования и мебели после отделки может требовать дополнительных работ, поэтому точки уточняются заранее.",
        costTitle: "Факторы стоимости",
        costText:
          "Важны число точек, трассы труб, состояние системы, демонтаж и выбранное оборудование.",
        faqs: [
          {
            question: "Когда выполняются сантехнические работы?",
            answer:
              "Обычно на подготовительном и инженерном этапе, до финальной отделки.",
          },
          {
            question: "Можно перенести точки кухни или ванной?",
            answer:
              "Возможность оценивается по существующей системе и техническим условиям.",
          },
          {
            question: "Выполняете ли вы отдельные работы?",
            answer: "Обсуждаем объём задачи и подходящий формат организации.",
          },
        ],
        ...ruLabels,
      }),
      en: content({
        eyebrow: "Plumbing work · Yerevan",
        title: "Plumbing work in Yerevan",
        description:
          "Plumbing work in Yerevan for apartments, houses and business spaces as part of a renovation, from planning to installation and testing.",
        seoTitle: "Plumbing Work in Yerevan | SHINEX",
        seoDescription:
          "Plumbing work in Yerevan: water supply, drainage, bathroom and kitchen point planning during renovation.",
        introduction: [
          "Plumbing is best planned early, before final wall and floor finishes.",
          "Point placement follows the final kitchen, bathroom, appliance and furniture layout.",
        ],
        scopeTitle: "Plumbing solutions",
        scopeText:
          "The work list is agreed from the property layout, existing systems and future use.",
        scopeItems: [
          "Water supply points",
          "Drainage solutions",
          "Bathroom connection preparation",
          "Kitchen and appliance points",
          "Assessment of older fittings",
          "Testing the installed system",
        ],
        planningTitle: "Why layout comes first",
        planningText:
          "Changing appliances or furniture after finishing can create extra work, so points are agreed early.",
        costTitle: "Cost factors",
        costText:
          "Point count, pipe routes, system condition, demolition and selected equipment affect the cost.",
        faqs: [
          {
            question: "When is plumbing done?",
            answer:
              "Usually during preparation and engineering stages, before final finishes.",
          },
          {
            question: "Can kitchen or bathroom points be moved?",
            answer:
              "That depends on the existing system and technical conditions.",
          },
          {
            question: "Do you take separate work?",
            answer: "We discuss the scope and the suitable way to organise it.",
          },
        ],
        ...enLabels,
      }),
    },
  },
  {
    slug: "electrical-work-yerevan",
    kind: "service",
    image: images.renovation,
    relatedServiceSlugs: ["renovation", "commercial-construction"],
    relatedLandingSlugs: [
      "capital-renovation-yerevan",
      "apartment-interior-design-yerevan",
      "office-renovation-yerevan",
    ],
    translations: {
      hy: content({
        eyebrow: "Էլեկտրական աշխատանքներ · Երևան",
        title: "Էլեկտրական աշխատանքներ Երևանում",
        description:
          "Էլեկտրական աշխատանքներ Երևանում վերանորոգման կամ շինարարության ընթացքում՝ կետերի պլանավորում, մալուխների անցկացում և սարքավորումների համար պատրաստում։",
        seoTitle: "Էլեկտրական աշխատանքներ Երևանում | SHINEX",
        seoDescription:
          "Էլեկտրական աշխատանքներ Երևանում բնակարանի, տան և գրասենյակի համար՝ վարդակներ, լուսավորություն, սարքավորումների ու ցանցի կետերի պլանավորում։",
        introduction: [
          "Էլեկտրական աշխատանքների որակը սկսվում է ոչ թե միայն մալուխների անցկացումից, այլ բնակարանի կամ տարածքի օգտագործման ճիշտ պլանից։",
          "Մինչ պատերը փակելը ճշտում ենք լուսավորությունը, վարդակները, տեխնիկան, աշխատանքային գոտիները և անհրաժեշտ հզորությունը։",
        ],
        scopeTitle: "Էլեկտրական աշխատանքների պլան",
        scopeText:
          "Աշխատանքների կազմը համաձայնեցնում ենք տարածքի նախագծի, սարքավորումների և անվտանգության պահանջների հետ։",
        scopeItems: [
          "Լուսավորության սցենարների քննարկում",
          "Վարդակների և անջատիչների տեղաբաշխում",
          "Խոշոր կենցաղային տեխնիկայի կետեր",
          "Աշխատատեղերի ու ցանցային սարքավորումների կետեր",
          "Մալուխային ուղիների կազմակերպում",
          "Սարքավորումների միացման համար նախապատրաստում",
        ],
        planningTitle: "Ինչո՞ւ է դիզայնը կապված էլեկտրիկայի հետ",
        planningText:
          "Կահույքի, խոհանոցի, աշխատատեղերի ու լուսավորության վերջնական դասավորությունը որոշում է, թե որտեղ են անհրաժեշտ կետերը։",
        costTitle: "Հաշվարկի հիմքը",
        costText:
          "Արժեքը կախված է կետերի քանակից, մալուխային ուղիների երկարությունից, վահանակի լուծումներից, պատերի վիճակից և աշխատանքի բարդությունից։",
        faqs: [
          {
            question: "Ե՞րբ պլանավորել վարդակները և լուսավորությունը",
            answer:
              "Դա պետք է անել վերանորոգման սկզբում՝ կահույքի և տեխնիկայի պլանի հետ միասին։",
          },
          {
            question: "Կարո՞ղ եք փոխել հին էլեկտրական համակարգը",
            answer:
              "Աշխատանքի ծավալը որոշվում է առկա համակարգի վիճակի և անհրաժեշտ հզորության գնահատումից հետո։",
          },
          {
            question:
              "Էլեկտրական աշխատանքը ներառո՞ւմ է լուսավորության տեղադրումը",
            answer:
              "Կոնկրետ աշխատանքների կազմը համաձայնեցվում է նախագծի և ընտրված սարքավորումների հիման վրա։",
          },
        ],
        ...hyLabels,
      }),
      ru: content({
        eyebrow: "Электрические работы · Ереван",
        title: "Электрические работы в Ереване",
        description:
          "Электрические работы в Ереване при ремонте и строительстве: планирование точек, прокладка кабеля и подготовка для оборудования.",
        seoTitle: "Электрические работы в Ереване | SHINEX",
        seoDescription:
          "Электрические работы в Ереване для квартиры, дома и офиса: розетки, освещение, точки техники и сети.",
        introduction: [
          "Качество электрики начинается не только с прокладки кабеля, но и с плана использования пространства.",
          "До закрытия стен уточняем свет, розетки, технику, рабочие зоны и требуемую мощность.",
        ],
        scopeTitle: "План электрических работ",
        scopeText:
          "Состав согласуется с проектом, оборудованием и требованиями безопасности.",
        scopeItems: [
          "Сценарии освещения",
          "Розетки и выключатели",
          "Точки крупной техники",
          "Рабочие и сетевые точки",
          "Кабельные трассы",
          "Подготовка подключений",
        ],
        planningTitle: "Почему дизайн связан с электрикой",
        planningText:
          "Итоговая расстановка мебели, кухни, рабочих мест и света определяет нужные точки.",
        costTitle: "Основа расчёта",
        costText:
          "Цена зависит от числа точек, длины трасс, решений по щиту, состояния стен и сложности.",
        faqs: [
          {
            question: "Когда планировать розетки и свет?",
            answer: "В начале ремонта вместе с планом мебели и техники.",
          },
          {
            question: "Можно заменить старую электрику?",
            answer:
              "Объём определяется после оценки существующей системы и нужной мощности.",
          },
          {
            question: "Включает ли работа установку света?",
            answer:
              "Конкретный состав согласуется по проекту и выбранному оборудованию.",
          },
        ],
        ...ruLabels,
      }),
      en: content({
        eyebrow: "Electrical work · Yerevan",
        title: "Electrical work in Yerevan",
        description:
          "Electrical work in Yerevan during renovation or construction: point planning, cable routing and preparation for equipment.",
        seoTitle: "Electrical Work in Yerevan | SHINEX",
        seoDescription:
          "Electrical work in Yerevan for apartments, houses and offices: sockets, lighting, appliance and network points.",
        introduction: [
          "Good electrical work starts with a plan for how the space will be used, not only cable routing.",
          "Before walls are closed, we establish lighting, sockets, appliances, work areas and power needs.",
        ],
        scopeTitle: "Electrical work plan",
        scopeText:
          "The scope is agreed around the design, equipment and safety requirements.",
        scopeItems: [
          "Lighting scenarios",
          "Sockets and switches",
          "Major appliance points",
          "Workplace and network points",
          "Cable routes",
          "Connection preparation",
        ],
        planningTitle: "Why design affects electrics",
        planningText:
          "Final furniture, kitchen, workstation and lighting layouts determine where points are needed.",
        costTitle: "Estimate basis",
        costText:
          "Cost depends on point count, route length, panel decisions, wall condition and complexity.",
        faqs: [
          {
            question: "When should sockets and lighting be planned?",
            answer:
              "At the start of renovation, alongside the furniture and appliance plan.",
          },
          {
            question: "Can an old electrical system be replaced?",
            answer:
              "The scope follows an assessment of the existing system and required capacity.",
          },
          {
            question: "Does work include light installation?",
            answer:
              "The exact scope is agreed from the project and chosen equipment.",
          },
        ],
        ...enLabels,
      }),
    },
  },
] as const satisfies readonly SeoLandingPage[];
