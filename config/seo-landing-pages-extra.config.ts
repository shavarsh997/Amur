import type { SeoLandingPage } from "@/config/seo-landing-pages.config";

/** Specialist pages with their own scope. Retired variants are mapped in seo-redirects.config.ts. */
export const extraSeoLandingPages = [
  {
    slug: "apartment-interior-design-yerevan",
    contentUpdatedAt: "2026-10-29",
    kind: "service",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1800&q=85",
    relatedServiceSlugs: ["interior-design"],
    relatedLandingSlugs: [
      "apartment-renovation-yerevan",
      "new-build-renovation",
    ],
    translations: {
      hy: {
        eyebrow: "Բնակարանի դիզայն · Երևան",
        title: "Բնակարանի ինտերիերի դիզայն Երևանում",
        description:
          "Բնակարանի դիզայնը սկսում ենք հարմարավետ դասավորությունից․ պլանավորում ենք կահույքի, պահարանների ու լուսավորության տեղերը և դրանք կապում վերանորոգման աշխատանքների հետ։",
        seoTitle: "Բնակարանի ինտերիերի դիզայն Երևանում | SHINEX",
        seoDescription:
          "Բնակարանի ինտերիերի դիզայն Երևանում՝ տարածքի պլանավորում, կահույքի ու լուսավորության տեղաբաշխում, վերանորոգման համար լուծումներ։",
        introduction: [
          "Բնակարանի դիզայնում ամենակարևորը տարածքը բնակիչների առօրյա սովորություններին և կարիքներին համապատասխանեցնելն է։",
          "Նախագիծը հատկապես օգտակար է նորակառույցում կամ վերապլանավորում պահանջող բնակարանում, երբ պետք է նախապես որոշել յուրաքանչյուր գոտու դերը։",
        ],
        sections: [
          {
            title: "Բնակարանի նախագծային լուծումներ",
            paragraphs: [
              "Բնակարանը պլանավորում ենք այնպես, որ սենյակներում հարմար լինի տեղաշարժվել, աշխատել ու հանգստանալ, իսկ հագուստի և կենցաղային իրերի համար բավարար տեղ լինի։",
            ],
            items: [
              "Սենյակների և ֆունկցիոնալ գոտիների պլանավորում",
              "Խոհանոցի ու սանհանգույցի դասավորություն",
              "Պահարանների և պահոցների տեղաբաշխում",
              "Կահույքի չափերն ու տեղաբաշխումը ցույց տվող պլան",
              "Լուսավորության սցենարներ",
              "Վարդակների և տեխնիկայի միացման կետերի պլանավորում",
            ],
          },
          {
            title: "Նախագիծը մինչև վերանորոգումը",
            paragraphs: [
              "Նախապես հաստատված դասավորությունը թույլ է տալիս էլեկտրիկին, սանտեխնիկին և հարդարողներին աշխատել նույն որոշումների հիման վրա։",
              "Մինչև նախագծումը համաձայնեցրեք անհրաժեշտ գծագրերի ցանկը։ Բնակարանի համար կարևոր է, որ կահույքի, անցումների և միացումների չափերը համընկնեն բոլոր պլաններում։",
            ],
            items: [
              "Կահույքի և պահարանների տեղաբաշխում՝ չափերով և դռների բացման համար անհրաժեշտ տարածքով։",
              "Խոհանոցի տեխնիկայի և սանհանգույցի սարքերի միացումներ՝ ըստ ընտրված դասավորության։",
              "Վարդակների, անջատիչների և լուսավորության պլան՝ կապված կահույքի հետ։ Վիզուալիզացիաներն ու հեղինակային ուղեկցումը համաձայնեցվում են առանձին։",
            ],
          },
          {
            title: "Դիզայնի ծավալը",
            paragraphs: [
              "Դիզայնի արժեքը կախված է բնակարանի մակերեսից, սենյակների քանակից, ինչպես նաև անհրաժեշտ գծագրերի ցանկից ու մանրամասնության աստիճանից։",
            ],
          },
        ],
        faqs: [
          {
            question: "Ինչո՞վ է դիզայնն օգտակար նորակառույց բնակարանի համար",
            answer:
              "Այն օգնում է մինչև հարդարումը որոշել կահույքի, տեխնիկայի ու լուսավորության տեղերը և դրանց համապատասխան պլանավորել վարդակներն ու խողովակները։",
          },
          {
            question: "Կարո՞ղ եք փոքր բնակարանի դիզայն անել",
            answer:
              "Այո։ Փոքր բնակարանում հատկապես կարևոր է հարմար դասավորությունը․ կահույքն ու պահարանները պետք է բավարարեն առօրյա կարիքները՝ առանց ազատ տարածքը ծանրաբեռնելու։",
          },
          {
            question: "Նախագիծը ներառո՞ւմ է կահույքի տեղաբաշխման պլան",
            answer:
              "Կահույքի տեղաբաշխման պլանը կարող է ներառվել նախագծում։ Անհրաժեշտ գծագրերի ցանկը համաձայնեցնում ենք մինչև նախագծման սկիզբը։",
          },
        ],
        calculatorLabel: "Ստանալ նախնական հաշվարկ",
        contactLabel: "Պատվիրել զննում",
        relatedTitle: "Կապված ծառայություններ",
      },
      ru: {
        eyebrow: "Дизайн квартиры · Ереван",
        title: "Дизайн интерьера квартиры в Ереване",
        description:
          "Дизайн квартиры в Ереване: удобная планировка, хранение, освещение и решения, связанные с ремонтом.",
        seoTitle: "Дизайн интерьера квартиры в Ереване | SHINEX",
        seoDescription:
          "Дизайн интерьера квартиры в Ереване: планировка, хранение, мебель, освещение и точки подключения. Согласуем решения и состав чертежей до ремонта.",
        introduction: [
          "Главная задача дизайна квартиры — адаптировать пространство к образу жизни жильцов.",
          "Он особенно полезен для новостройки или квартиры, где требуется перепланировка.",
        ],
        sections: [
          {
            title: "Проектные решения для квартиры",
            paragraphs: [
              "Разрабатываем решения для удобства, хранения и повседневного использования.",
            ],
            items: [
              "Планировка комнат и зон",
              "Идея кухни и санузла",
              "Хранение",
              "План расстановки мебели",
              "Сценарии освещения",
              "Точки техники и розеток",
            ],
          },
          {
            title: "Проект до ремонта",
            paragraphs: [
              "Согласованная планировка помогает всем исполнителям работать на основе одних решений.",
              "До проектирования согласуйте перечень нужных чертежей. Для квартиры важно, чтобы размеры мебели, проходов и подключений совпадали на всех планах.",
            ],
            items: [
              "План мебели и хранения с размерами и местом для открывания дверей и шкафов.",
              "Привязки кухонной техники и сантехнических приборов к выбранной планировке.",
              "План розеток, выключателей и освещения, связанный с мебелью. Визуализации и авторское сопровождение согласуются отдельно.",
            ],
          },
          {
            title: "Объём дизайна",
            paragraphs: [
              "Стоимость зависит от площади, числа помещений и состава и детализации чертежей.",
            ],
          },
        ],
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
            question: "Может ли проект включать план расстановки мебели?",
            answer:
              "Да. План расстановки мебели может входить в проект. Перечень необходимых чертежей согласуем до начала проектирования.",
          },
        ],
        calculatorLabel: "Получить предварительный расчёт",
        contactLabel: "Заказать осмотр",
        relatedTitle: "Связанные услуги",
      },
      en: {
        eyebrow: "Apartment interior design · Yerevan",
        title: "Apartment interior design in Yerevan",
        description:
          "Plan an apartment that works for daily life, with furniture, storage and lighting arranged before renovation starts.",
        seoTitle: "Apartment Interior Design in Yerevan | SHINEX",
        seoDescription:
          "Apartment interior design in Yerevan: layout, furniture, lighting and practical renovation decisions.",
        introduction: [
          "Apartment design should support the daily habits of the people living there.",
          "It is especially useful for new builds or layouts that need rethinking.",
        ],
        sections: [
          {
            title: "Planning your apartment",
            paragraphs: [
              "We develop solutions around comfort, storage and everyday use.",
            ],
            items: [
              "Room layouts and activity areas",
              "Kitchen and bathroom layouts",
              "Storage solutions",
              "Furniture sizes and placement",
              "Lighting for different activities",
              "Socket locations and appliance connections",
            ],
          },
          {
            title: "Design before renovation",
            paragraphs: [
              "An agreed plan shows electricians, plumbers and decorators where furniture, fittings and equipment will go.",
              "Agree the required drawings before design begins. Furniture dimensions, clearances and connection positions need to be consistent across the apartment plans.",
            ],
            items: [
              "A dimensioned furniture and storage plan with room to open doors and cupboards.",
              "Kitchen appliance and bathroom fitting connections matched to the chosen layout.",
              "A socket, switch and lighting plan coordinated with furniture. Visualisations and design supervision are agreed separately.",
            ],
          },
          {
            title: "Design scope",
            paragraphs: [
              "The fee depends on the apartment size, number of rooms and the drawings and specifications required.",
            ],
          },
        ],
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
            question: "Can the design include a furniture layout?",
            answer:
              "Yes. A furniture layout can form part of the project. We agree the list of drawings before design work begins.",
          },
        ],
        calculatorLabel: "Get an initial estimate",
        contactLabel: "Book a survey",
        relatedTitle: "Related services",
      },
      de: {
        eyebrow: "Wohnungsinnenraumgestaltung · Eriwan",
        title: "Innenraumgestaltung für Wohnungen in Eriwan",
        description:
          "Planen Sie eine alltagstaugliche Wohnung: Möbel, Stauraum und Beleuchtung werden vor Renovierungsbeginn festgelegt.",
        seoTitle: "Innenraumgestaltung für Wohnungen in Eriwan | SHINEX",
        seoDescription:
          "Innenraumgestaltung für Wohnungen in Eriwan: Grundriss, Möbel, Beleuchtung und praktische Renovierungsentscheidungen.",
        introduction: [
          "Die Wohnungsplanung sollte die täglichen Gewohnheiten der Bewohner unterstützen.",
          "Besonders sinnvoll ist sie bei Neubauten oder Grundrissen, die neu durchdacht werden müssen.",
        ],
        sections: [
          {
            title: "Ihre Wohnung planen",
            paragraphs: [
              "Wir entwickeln Lösungen für Komfort, Stauraum und Alltagstauglichkeit.",
            ],
            items: [
              "Raumaufteilung und Funktionsbereiche",
              "Küchen- und Badgrundrisse",
              "Stauraumlösungen",
              "Möbelmaße und Anordnung",
              "Beleuchtung für verschiedene Tätigkeiten",
              "Steckdosen und Geräteanschlüsse",
            ],
          },
          {
            title: "Planung vor der Renovierung",
            paragraphs: [
              "Ein abgestimmter Plan zeigt Elektrikern, Installateuren und Ausbaugewerken, wo Möbel, Einbauten und Geräte vorgesehen sind.",
              "Vereinbaren Sie vor Planungsbeginn die benötigten Zeichnungen. Möbelmaße, Bewegungsflächen und Anschlusspunkte müssen in allen Wohnungsplänen übereinstimmen.",
            ],
            items: [
              "Ein bemaßter Möbel- und Stauraumplan mit Platz zum Öffnen von Türen und Schränken.",
              "Anschlüsse für Küchengeräte und Sanitärobjekte passend zum gewählten Grundriss.",
              "Ein mit den Möbeln abgestimmter Steckdosen-, Schalter- und Beleuchtungsplan. Visualisierungen und gestalterische Begleitung werden gesondert vereinbart.",
            ],
          },
          {
            title: "Planungsumfang",
            paragraphs: [
              "Das Honorar hängt von Wohnungsgröße, Raumanzahl und den benötigten Plänen und Spezifikationen ab.",
            ],
          },
        ],
        faqs: [
          {
            question: "Ist eine Planung für eine Neubauwohnung sinnvoll?",
            answer:
              "Ja. Sie hilft, Geräte, Beleuchtung und Möbel vor dem Ausbau zu planen.",
          },
          {
            question: "Gestalten Sie auch kleine Wohnungen?",
            answer:
              "Ja. Gerade in kleinen Räumen sind Grundriss und Stauraum entscheidend.",
          },
          {
            question: "Kann die Planung einen Möblierungsplan enthalten?",
            answer:
              "Ja. Ein Möblierungsplan kann Teil des Projekts sein. Die Liste der Zeichnungen vereinbaren wir vor Planungsbeginn.",
          },
        ],
        calculatorLabel: "Erste Kostenschätzung anfragen",
        contactLabel: "Besichtigung vereinbaren",
        relatedTitle: "Passende Leistungen",
      },
      fr: {
        eyebrow: "Aménagement intérieur d’appartement · Erevan",
        title: "Aménagement intérieur d’appartement à Erevan",
        description:
          "Concevez un appartement adapté au quotidien, avec mobilier, rangements et éclairage prévus avant la rénovation.",
        seoTitle: "Aménagement intérieur d’appartement à Erevan | SHINEX",
        seoDescription:
          "Aménagement intérieur d’appartement à Erevan : agencement, mobilier, éclairage et choix pratiques pour la rénovation.",
        introduction: [
          "La conception d’un appartement doit s’adapter aux habitudes quotidiennes de ses habitants.",
          "Elle est particulièrement utile dans les logements neufs ou lorsque l’agencement doit être repensé.",
        ],
        sections: [
          {
            title: "Concevoir votre appartement",
            paragraphs: [
              "Nous élaborons des solutions autour du confort, du rangement et de l’usage quotidien.",
            ],
            items: [
              "Agencement des pièces et zones d’activité",
              "Agencement de la cuisine et de la salle de bains",
              "Solutions de rangement",
              "Dimensions et implantation du mobilier",
              "Éclairage adapté aux différentes activités",
              "Emplacement des prises et raccordements des appareils",
            ],
          },
          {
            title: "Concevoir avant de rénover",
            paragraphs: [
              "Un plan convenu indique aux électriciens, plombiers et professionnels des finitions où se trouveront les meubles, équipements et appareils.",
              "Convenez des plans nécessaires avant la conception. Les dimensions du mobilier, les dégagements et les raccordements doivent correspondre sur tous les plans de l’appartement.",
            ],
            items: [
              "Un plan coté du mobilier et des rangements, avec l’espace nécessaire pour ouvrir portes et placards.",
              "Les raccordements des appareils de cuisine et des équipements sanitaires selon l’agencement retenu.",
              "Un plan des prises, interrupteurs et éclairages coordonné au mobilier. Les visualisations et le suivi de conception sont convenus séparément.",
            ],
          },
          {
            title: "Périmètre de conception",
            paragraphs: [
              "Les honoraires dépendent de la surface, du nombre de pièces et des plans et spécifications nécessaires.",
            ],
          },
        ],
        faqs: [
          {
            question: "La conception est-elle utile pour un appartement neuf ?",
            answer:
              "Oui. Elle permet de prévoir les appareils, l’éclairage et le mobilier avant les finitions.",
          },
          {
            question: "Concevez-vous de petits appartements ?",
            answer:
              "Oui. L’agencement et le rangement sont essentiels dans les petits espaces.",
          },
          {
            question: "Le projet peut-il inclure un plan de mobilier ?",
            answer:
              "Oui. Un plan de mobilier peut faire partie du projet. Nous convenons de la liste des plans avant le début de la conception.",
          },
        ],
        calculatorLabel: "Demander une première estimation",
        contactLabel: "Réserver une visite",
        relatedTitle: "Services associés",
      },
    },
  },
  {
    slug: "office-renovation-yerevan",
    contentUpdatedAt: "2026-10-29",
    kind: "service",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1800&q=85",
    relatedServiceSlugs: ["commercial-construction", "interior-design"],
    relatedLandingSlugs: [
      "electrical-work-yerevan",
      "renovation-estimate-yerevan",
    ],
    translations: {
      hy: {
        eyebrow: "Գրասենյակների վերանորոգում · Երևան",
        title: "Գրասենյակի վերանորոգում Երևանում",
        description:
          "Գրասենյակի վերանորոգում Երևանում՝ աշխատատեղերի, հանդիպումների գոտիների, լուսավորության ու տեխնիկական ենթակառուցվածքի պլանավորմամբ։",
        seoTitle: "Գրասենյակի վերանորոգում Երևանում | SHINEX",
        seoDescription:
          "Գրասենյակի վերանորոգում Երևանում՝ հարդարում, աշխատատեղերի կազմակերպում, էլեկտրական ու լուսավորության լուծումներ։",
        introduction: [
          "Գրասենյակի վերանորոգումը պետք է աջակցի թիմի աշխատանքին և այցելուների հարմարավետությանը, ոչ միայն փոխի տեսքը։",
          "Պլանավորման ընթացքում հաշվի ենք առնում աշխատատեղերը, հանդիպումների գոտիները, սարքավորումները և լարային ենթակառուցվածքը։",
        ],
        sections: [
          {
            title: "Գրասենյակային աշխատանքների կազմը",
            paragraphs: [
              "Որոշումներն ընդունվում են տարածքի գործառույթի և ընկերության աշխատանքի ձևաչափի հիման վրա։",
            ],
            items: [
              "Աշխատատեղերի և ընդհանուր գոտիների դասավորություն",
              "Միջնապատեր, ձայնամեկուսացում և ակուստիկ հարմարավետություն",
              "Էլեկտրական, ցանցային և լուսավորության կետեր",
              "Հարդարում և հատակի ծածկույթներ",
              "Խոհանոցի կամ սանհանգույցի գոտիներ",
              "Փուլային աշխատանքներ գործող գրասենյակի համար",
            ],
          },
          {
            title:
              "Աշխատանքների պլանավորում՝ ըստ գրասենյակի աշխատանքային ռեժիմի",
            paragraphs: [
              "Գործող գրասենյակի համար կարող ենք քննարկել հերթականությունը՝ որպեսզի աղմկոտ կամ խոչընդոտող փուլերը պլանավորվեն հարմար ժամանակ։",
              "Թիմի վերադարձը յուրաքանչյուր գոտի պլանավորեք ըստ դրա պատրաստվածության։ Մինչև աշխատանքների սկիզբը համաձայնեցրեք ստուգումների ցանկն ու պատասխանատուներին։",
            ],
            items: [
              "Նշեք համակարգիչների, տպիչների և ցանցային սարքավորումների տեղերը, ինչպես նաև էլեկտրականության կամ ցանցի անջատման ընդունելի ժամանակը։",
              "Սահմանեք սարքավորումների տեղափոխման և աշխատակիցների անցումների կազմակերպման պատասխանատուներին։",
              "Մինչև գոտու օգտագործումը ստուգեք համաձայնեցված լուսավորությունը, վարդակներն ու ցանցային կետերը՝ շինարարական և ՏՏ աշխատանքների պատասխանատվությունն առանձնացնելով։",
            ],
          },
          {
            title: "Բյուջեի ձևավորում",
            paragraphs: [
              "Բյուջեի վրա ազդում են դասավորության փոփոխությունները, վարդակների ու լուսավորության տեղերը, ցանցային մալուխների անցկացումը, նյութերը և աշխատանքների ժամանակացույցը։",
            ],
          },
        ],
        faqs: [
          {
            question: "Կատարո՞ւմ եք գործող գրասենյակի վերանորոգում",
            answer:
              "Քննարկում ենք աշխատանքների փուլավորումը, եթե տարածքի պայմաններն ու անվտանգությունը թույլ են տալիս։",
          },
          {
            question:
              "Կարո՞ղ եք պլանավորել վարդակների ու լուսավորության տեղերը",
            answer:
              "Այո, դրանք որոշվում են աշխատատեղերի ու սարքավորումների պլանի համաձայն։",
          },
          {
            question: "Որքա՞ն է տևում գրասենյակի վերանորոգումը",
            answer:
              "Ժամկետը կախված է մակերեսից, փոփոխությունների ծավալից և աշխատանքային ռեժիմից։",
          },
        ],
        calculatorLabel: "Կապվել մեզ հետ",
        contactLabel: "Կապվել մեզ հետ",
        relatedTitle: "Կապված ծառայություններ",
      },
      ru: {
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
        sections: [
          {
            title: "Состав офисных работ",
            paragraphs: [
              "Решения принимаются с учётом функции пространства и формата работы компании.",
            ],
            items: [
              "Рабочие и общие зоны",
              "Перегородки и акустика",
              "Электрика, сеть и свет",
              "Отделка и напольные покрытия",
              "Кухня или санузел",
              "Этапы для действующего офиса",
            ],
          },
          {
            title: "Учёт рабочего режима",
            paragraphs: [
              "Для работающего офиса согласуем порядок работ, чтобы шумные этапы проходили в подходящее время.",
              "Возвращение команды в каждую зону планируйте по её готовности. До начала работ согласуйте список проверок и ответственных за них.",
            ],
            items: [
              "Отметьте компьютеры, принтеры и сетевое оборудование, а также допустимое время отключения электричества или сети.",
              "Определите, кто переносит оборудование и организует проходы для сотрудников.",
              "Перед использованием зоны проверьте согласованные свет, розетки и сетевые точки, разделив ответственность за строительные и ИТ-работы.",
            ],
          },
          {
            title: "Формирование бюджета",
            paragraphs: [
              "На смету влияют перепланировка, розетки, освещение и подключения воды, сетевые решения, материалы и требуемый срок.",
            ],
          },
        ],
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
        calculatorLabel: "Обсудить ремонт",
        contactLabel: "Обсудить ремонт",
        relatedTitle: "Связанные услуги",
      },
      en: {
        eyebrow: "Office renovation · Yerevan",
        title: "Office renovation in Yerevan",
        description:
          "Renovate your office around the way your team works, with planned workstations, meeting areas, lighting and network cabling.",
        seoTitle: "Office Renovation in Yerevan | SHINEX",
        seoDescription:
          "Office renovation in Yerevan: finishes, workplace organisation, electrical and lighting solutions.",
        introduction: [
          "Office renovation should support the team's work and visitor comfort, not just change appearances.",
          "Planning considers workstations, meeting areas, equipment and cabling.",
        ],
        sections: [
          {
            title: "What office renovation can include",
            paragraphs: [
              "We plan the work around the office layout, equipment and everyday activities.",
            ],
            items: [
              "Workstations and shared areas",
              "Partitions, sound insulation and acoustics",
              "Sockets, network connections and lighting",
              "Wall finishes and flooring",
              "Kitchen and bathroom areas",
              "Phased work where the office remains in use",
            ],
          },
          {
            title: "Scheduling work in an occupied office",
            paragraphs: [
              "If work can be carried out safely while the office remains in use, we discuss the sequence and timing of noisy or disruptive tasks.",
              "Plan the team’s return to each area around its readiness. Agree the handover checks and who is responsible before work starts.",
            ],
            items: [
              "Identify computers, printers and network equipment, along with acceptable power or network downtime.",
              "Establish who moves equipment and arranges access routes for staff.",
              "Before using an area, check the agreed lighting, sockets and network points, with separate responsibilities for building work and IT work.",
            ],
          },
          {
            title: "Budget factors",
            paragraphs: [
              "Layout changes, electrical outlets, lighting and plumbing connections, network needs, materials and the target deadline all affect the estimate.",
            ],
          },
        ],
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
            answer:
              "The schedule depends on the office size, the work required and any restrictions on working hours.",
          },
        ],
        calculatorLabel: "Discuss your renovation",
        contactLabel: "Discuss your renovation",
        relatedTitle: "Related services",
      },
      de: {
        eyebrow: "Bürorenovierung · Eriwan",
        title: "Bürorenovierung in Eriwan",
        description:
          "Renovieren Sie Ihr Büro passend zur Arbeitsweise Ihres Teams, mit geplanten Arbeitsplätzen, Besprechungsbereichen, Beleuchtung und Netzwerkverkabelung.",
        seoTitle: "Bürorenovierung in Eriwan | SHINEX",
        seoDescription:
          "Bürorenovierung in Eriwan: Ausbau, Arbeitsplatzgestaltung, Elektro- und Beleuchtungslösungen.",
        introduction: [
          "Eine Bürorenovierung sollte die Arbeit des Teams und den Komfort der Besucher verbessern und nicht nur die Optik verändern.",
          "Die Planung berücksichtigt Arbeitsplätze, Besprechungsbereiche, Geräte und Verkabelung.",
        ],
        sections: [
          {
            title: "Was eine Bürorenovierung umfassen kann",
            paragraphs: [
              "Wir planen die Arbeiten nach Bürogrundriss, Ausstattung und täglichen Abläufen.",
            ],
            items: [
              "Arbeitsplätze und Gemeinschaftsbereiche",
              "Trennwände, Schalldämmung und Akustik",
              "Steckdosen, Netzwerkanschlüsse und Beleuchtung",
              "Wandoberflächen und Bodenbeläge",
              "Küchen- und Sanitärbereiche",
              "Arbeiten in Phasen bei laufender Büronutzung",
            ],
          },
          {
            title: "Arbeiten im genutzten Büro planen",
            paragraphs: [
              "Können die Arbeiten während der Büronutzung sicher ausgeführt werden, besprechen wir Reihenfolge und Zeiten lauter oder störender Tätigkeiten.",
              "Planen Sie die Rückkehr des Teams in jeden Bereich nach dessen Fertigstellung. Vereinbaren Sie Prüfungen und Zuständigkeiten vor Arbeitsbeginn.",
            ],
            items: [
              "Erfassen Sie Computer, Drucker und Netzwerkgeräte sowie zulässige Strom- oder Netzwerkausfallzeiten.",
              "Klären Sie, wer Geräte versetzt und Zugangswege für Mitarbeitende organisiert.",
              "Prüfen Sie vor der Nutzung die vereinbarte Beleuchtung, Steckdosen und Netzwerkanschlüsse; Zuständigkeiten für Bau- und IT-Arbeiten werden getrennt festgelegt.",
            ],
          },
          {
            title: "Budgetfaktoren",
            paragraphs: [
              "Grundrissänderungen, Steckdosen, Beleuchtung, Sanitäranschlüsse, Netzwerkbedarf, Materialien und der gewünschte Termin beeinflussen die Kostenschätzung.",
            ],
          },
        ],
        faqs: [
          {
            question: "Renovieren Sie Büros im laufenden Betrieb?",
            answer:
              "Wir besprechen eine Aufteilung in Phasen, sofern Objektbedingungen und Sicherheit dies erlauben.",
          },
          {
            question: "Können Sie Beleuchtung und Steckdosen planen?",
            answer:
              "Ja, auf Grundlage des Arbeitsplatz- und Ausstattungsplans.",
          },
          {
            question: "Wie lange dauert eine Bürorenovierung?",
            answer:
              "Der Zeitplan hängt von Bürogröße, nötigen Arbeiten und möglichen Einschränkungen der Arbeitszeiten ab.",
          },
        ],
        calculatorLabel: "Renovierung besprechen",
        contactLabel: "Renovierung besprechen",
        relatedTitle: "Passende Leistungen",
      },
      fr: {
        eyebrow: "Rénovation de bureaux · Erevan",
        title: "Rénovation de bureaux à Erevan",
        description:
          "Rénovez vos bureaux selon la façon de travailler de votre équipe, en prévoyant les postes, espaces de réunion, éclairages et câblages réseau.",
        seoTitle: "Rénovation de bureaux à Erevan | SHINEX",
        seoDescription:
          "Rénovation de bureaux à Erevan : finitions, organisation des postes, électricité et éclairage.",
        introduction: [
          "La rénovation de bureaux doit faciliter le travail de l’équipe et le confort des visiteurs, au-delà du changement d’apparence.",
          "La planification prend en compte les postes de travail, les espaces de réunion, les équipements et le câblage.",
        ],
        sections: [
          {
            title: "Ce que peut comprendre une rénovation de bureaux",
            paragraphs: [
              "Nous planifions les travaux selon l’agencement des bureaux, les équipements et les activités quotidiennes.",
            ],
            items: [
              "Postes de travail et espaces communs",
              "Cloisons, isolation phonique et acoustique",
              "Prises, connexions réseau et éclairage",
              "Finitions murales et revêtements de sol",
              "Espaces cuisine et sanitaires",
              "Travaux par phases lorsque les bureaux restent occupés",
            ],
          },
          {
            title: "Planifier les travaux dans des bureaux occupés",
            paragraphs: [
              "Si les travaux peuvent être réalisés en sécurité pendant l’occupation des bureaux, nous discutons de l’ordre et des horaires des interventions bruyantes ou perturbantes.",
              "Planifiez le retour de l’équipe dans chaque zone selon son état d’achèvement. Convenez des vérifications et des responsables avant le début des travaux.",
            ],
            items: [
              "Repérez ordinateurs, imprimantes et équipements réseau, ainsi que les créneaux acceptables de coupure électrique ou réseau.",
              "Définissez qui déplace les équipements et organise les passages du personnel.",
              "Avant de réutiliser une zone, vérifiez l’éclairage, les prises et les points réseau convenus, en distinguant les responsabilités des travaux et de l’informatique.",
            ],
          },
          {
            title: "Facteurs du budget",
            paragraphs: [
              "Les changements d’agencement, les prises, l’éclairage, les raccordements sanitaires, les besoins réseau, les matériaux et l’échéance visée influencent le devis.",
            ],
          },
        ],
        faqs: [
          {
            question: "Rénovez-vous des bureaux en activité ?",
            answer:
              "Nous discutons d’un phasage lorsque les conditions du bien et la sécurité le permettent.",
          },
          {
            question: "Pouvez-vous prévoir l’éclairage et les prises ?",
            answer:
              "Oui, à partir du plan des postes de travail et des équipements.",
          },
          {
            question: "Combien de temps dure une rénovation de bureaux ?",
            answer:
              "Le planning dépend de la taille des bureaux, des travaux nécessaires et des éventuelles restrictions horaires.",
          },
        ],
        calculatorLabel: "Discuter de votre rénovation",
        contactLabel: "Discuter de votre rénovation",
        relatedTitle: "Services associés",
      },
    },
  },
  {
    slug: "capital-renovation-yerevan",
    contentUpdatedAt: "2026-10-28",
    kind: "service",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85",
    relatedServiceSlugs: ["renovation", "interior-design"],
    relatedLandingSlugs: [
      "apartment-renovation-yerevan",
      "cosmetic-renovation-yerevan",
      "renovation-estimate-yerevan",
      "prices",
    ],
    translations: {
      hy: {
        eyebrow: "Կապիտալ վերանորոգում · Երևան",
        title: "Բնակարանի կապիտալ վերանորոգում Երևանում",
        description:
          "Կապիտալ վերանորոգում Երևանում՝ հին ծածկույթների ապամոնտաժումից մինչև ինժեներական համակարգերի թարմացում և վերջնական հարդարում։",
        seoTitle: "Բնակարանի կապիտալ վերանորոգում Երևանում | SHINEX",
        seoDescription:
          "Բնակարանի կապիտալ վերանորոգում Երևանում՝ ապամոնտաժում, լարերի ու խողովակների փոխարինում ըստ զննման, հիմքերի պատրաստում և հարդարում։ SHINEX։",
        introduction: [
          "Կապիտալ վերանորոգումը ճիշտ ընտրություն է, երբ անհրաժեշտ է փոխել ոչ միայն տեսքը, այլև մաշված ինժեներական համակարգերը, պատերի ու հատակի մակերեսները կամ հատակագիծը։",
          "Մինչ մեկնարկը գնահատում ենք օբյեկտի իրական վիճակը, որպեսզի աշխատանքների հերթականությունն անվտանգ ու տրամաբանական լինի։",
        ],
        sections: [
          {
            title: "Կապիտալ վերանորոգման փուլեր",
            paragraphs: [
              "Աշխատանքների վերջնական ցանկը կազմվում է զննումից հետո՝ ելնելով բնակարանի կամ տան վիճակից։",
            ],
            items: [
              "Ապամոնտաժում և շինարարական աղբի հեռացում",
              "Պատերի, հատակի և առաստաղի մակերեսների նախապատրաստում",
              "Էլեկտրական համակարգի թարմացում",
              "Սանտեխնիկական համակարգի աշխատանքներ",
              "Միջնապատերի կամ դասավորության փոփոխություններ",
              "Վերջնական հարդարում",
            ],
          },
          {
            title: "Ինչո՞ւ է զննումը կարևոր",
            paragraphs: [
              "Հին հարդարմամբ բնակարանում նախ որոշում են՝ ինչն է հնարավոր պահպանել։ Թաքնված հատվածների վիճակը երբեմն պարզվում է միայն ապամոնտաժումից հետո։ Լրացուցիչ աշխատանքների ծավալը, արժեքն ու ժամկետի փոփոխությունը պետք է համաձայնեցնել մինչև դրանց կատարումը։",
            ],
          },
          {
            title: "Գնի վրա ազդող հանգամանքներ",
            paragraphs: [
              "Նախահաշվում առանձնացնում են ապամոնտաժումը, պատերի ու հատակի պատրաստումը, էլեկտրական, սանտեխնիկական և հարդարման աշխատանքները։ Նյութերը հաշվարկվում են աշխատանքից առանձին։ Բնակարանի մակերեսը չի ցույց տալիս լարերի երկարությունը, միացման կետերի քանակը կամ հարթեցման ծավալը։",
            ],
          },
        ],
        faqs: [
          {
            question:
              "Ի՞նչ տարբերություն կա կապիտալ և կոսմետիկ վերանորոգման միջև",
            answer:
              "Կապիտալ վերանորոգումը կարող է ներառել պատերի ու հատակի վերականգնում, էլեկտրալարերի և խողովակների փոխարինում, իսկ կոսմետիկը հիմնականում թարմացնում է տեսանելի հարդարումը։",
          },
          {
            question: "Պե՞տք է փոխել էլեկտրական համակարգը",
            answer:
              "Դա որոշվում է օբյեկտի վիճակից, հզորության պահանջից և անվտանգության գնահատումից հետո։",
          },
          {
            question: "Կարո՞ղ եք նախահաշիվ կազմել",
            answer:
              "Նախնական քննարկման համար պատրաստեք մակերեսի տվյալները, հատակագիծը, լուսանկարներն ու փոփոխությունների ցանկը։ Զննումից հետո ճշտում ենք աշխատանքների կազմն ու ծավալը․ թաքնված հատվածները երբեմն հնարավոր է ստուգել միայն ապամոնտաժումից հետո։",
          },
          {
            question: "Ինչի՞ց սկսել գնված բնակարանի կապիտալ վերանորոգումը։",
            answer:
              "Մինչ հարդարման նյութեր գնելը որոշեք հատակագիծը, խոհանոցի, սանհանգույցի, կահույքի ու տեխնիկայի տեղերը։ Այնուհետև գնահատեք հիմքերի ու հաղորդակցությունների վիճակը և համաձայնեցրեք ապամոնտաժման, ինժեներական ու հարդարման աշխատանքների ցանկը։ Այդպես նախահաշիվը կհամապատասխանի հենց ձեր բնակարանի խնդիրներին։",
          },
        ],
        calculatorLabel: "Կապվել մեզ հետ",
        contactLabel: "Կապվել մեզ հետ",
        relatedTitle: "Կապված ծառայություններ",
      },
      ru: {
        eyebrow: "Капитальный ремонт · Ереван",
        title: "Капитальный ремонт квартир в Ереване",
        description:
          "Капитальный ремонт в Ереване: от демонтажа старой отделки до обновления инженерных систем и чистовой отделки.",
        seoTitle: "Капитальный ремонт квартир в Ереване | SHINEX",
        seoDescription:
          "Капитальный ремонт квартиры в Ереване: демонтаж, замена проводки и труб по результатам осмотра, подготовка оснований и отделка. Смета SHINEX.",
        introduction: [
          "Капитальный ремонт нужен, когда требуется обновить не только вид, но и коммуникации, основания или планировку.",
          "До начала оцениваем фактическое состояние объекта, чтобы выстроить безопасную последовательность.",
        ],
        sections: [
          {
            title: "Этапы капитального ремонта",
            paragraphs: [
              "После осмотра составляем перечень необходимых работ.",
            ],
            items: [
              "Демонтаж",
              "Подготовка стен, пола и потолка",
              "Обновление электрики",
              "Сантехнические работы",
              "Перегородки или изменения планировки",
              "Чистовая отделка",
            ],
          },
          {
            title: "Почему важен осмотр",
            paragraphs: [
              "В квартире со старой отделкой сначала определяют, что можно сохранить. Состояние скрытых участков может стать понятным только после демонтажа. Если выявлены дополнительные работы, их объём, стоимость и влияние на график нужно согласовать до выполнения.",
            ],
          },
          {
            title: "Что влияет на цену",
            paragraphs: [
              "В смете разделяют демонтаж, подготовку стен и пола, электрику, сантехнику и чистовую отделку. Материалы рассчитываются отдельно от работы. Площадь квартиры помогает оценить масштаб, но не показывает длину проводки, число подключений или объём выравнивания.",
            ],
          },
        ],
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
            answer:
              "Для первого обсуждения подготовьте площадь, план квартиры, фотографии и список изменений. После осмотра уточняем объёмы и состав работ; скрытые участки могут потребовать проверки после демонтажа.",
          },
          {
            question:
              "С чего начать капитальный ремонт квартиры после покупки?",
            answer:
              "До покупки отделочных материалов определите планировку, расположение кухни, санузла, мебели и техники. Затем оцените состояние оснований и коммуникаций и согласуйте перечень демонтажа, инженерных работ и отделки. Так смета будет опираться на задачи конкретной квартиры.",
          },
        ],
        calculatorLabel: "Обсудить ремонт",
        contactLabel: "Обсудить ремонт",
        relatedTitle: "Связанные услуги",
      },
      en: {
        eyebrow: "Major renovation · Yerevan",
        title: "Major apartment renovation in Yerevan",
        description:
          "Renovate an older apartment or house in Yerevan, from removing worn finishes and replacing wiring or plumbing to preparing and finishing surfaces.",
        seoTitle: "Major apartment renovation in Yerevan | SHINEX",
        seoDescription:
          "Major apartment renovation in Yerevan: removal, wiring and pipe replacement as needed, surface preparation and finishing. Request a SHINEX estimate.",
        introduction: [
          "Major renovation may be needed when worn wiring, plumbing, walls or floors require attention alongside the visible finishes.",
          "Before work starts, we assess the actual condition to plan a safe sequence.",
        ],
        sections: [
          {
            title: "Major renovation stages",
            paragraphs: [
              "The final work list is defined after surveying the property.",
            ],
            items: [
              "Demolition",
              "Wall, floor and ceiling preparation",
              "Electrical upgrades",
              "Plumbing work",
              "Partitions or layout changes",
              "Final finishes",
            ],
          },
          {
            title: "Why a survey matters",
            paragraphs: [
              "In an older apartment, first establish what can be retained. Hidden conditions may become clear only after removal. If extra work is discovered, its scope, cost and effect on the schedule should be agreed before it proceeds.",
            ],
          },
          {
            title: "What affects price",
            paragraphs: [
              "The estimate separates removal, wall and floor preparation, electrical work, plumbing and finishing. Materials are calculated separately from labour. Floor area indicates scale but does not reveal wiring lengths, connection counts or levelling requirements.",
            ],
          },
        ],
        faqs: [
          {
            question:
              "How does major renovation differ from cosmetic renovation?",
            answer:
              "Major renovation can include repairs to walls and floors, rewiring and pipe replacement. Cosmetic renovation mainly updates visible finishes.",
          },
          {
            question: "Does the electrical system need replacing?",
            answer:
              "That depends on condition, demand and a safety assessment.",
          },
          {
            question: "Can you prepare an estimate?",
            answer:
              "For an initial discussion, prepare the floor area, a plan, photographs and a list of changes. A survey refines the work quantities and scope; hidden areas may need checking after removal.",
          },
          {
            question:
              "Where should major renovation of a newly purchased apartment start?",
            answer:
              "Before buying finishes, decide on the layout and locations of the kitchen, bathroom, furniture and appliances. Then assess surfaces and services and agree the removal, installation and finishing work. This makes the estimate specific to the apartment.",
          },
        ],
        calculatorLabel: "Discuss your renovation",
        contactLabel: "Discuss your renovation",
        relatedTitle: "Related services",
      },
      de: {
        eyebrow: "Umfassende Sanierung · Eriwan",
        title: "Umfassende Wohnungssanierung in Eriwan",
        description:
          "Sanieren Sie eine ältere Wohnung oder ein Haus in Eriwan: vom Entfernen verschlissener Oberflächen und Ersetzen von Kabeln oder Rohren bis zur Vorbereitung und zum Ausbau.",
        seoTitle: "Umfassende Wohnungssanierung in Eriwan | SHINEX",
        seoDescription:
          "Umfassende Wohnungssanierung in Eriwan: Rückbau, bedarfsgerechter Austausch von Leitungen, Untergrundvorbereitung und Ausbau. Kostenvoranschlag von SHINEX.",
        introduction: [
          "Eine umfassende Sanierung kann nötig sein, wenn neben den sichtbaren Oberflächen auch verschlissene Kabel, Rohre, Wände oder Böden bearbeitet werden müssen.",
          "Vor Beginn prüfen wir den tatsächlichen Zustand, um eine sichere Arbeitsfolge zu planen.",
        ],
        sections: [
          {
            title: "Phasen einer umfassenden Sanierung",
            paragraphs: [
              "Die endgültige Arbeitsliste wird nach der Objektbesichtigung festgelegt.",
            ],
            items: [
              "Rückbau",
              "Vorbereitung von Wänden, Böden und Decken",
              "Modernisierung der Elektroinstallation",
              "Sanitärarbeiten",
              "Trennwände oder Grundrissänderungen",
              "Endausbau",
            ],
          },
          {
            title: "Warum eine Besichtigung wichtig ist",
            paragraphs: [
              "Bei einer älteren Wohnung wird zunächst geklärt, was erhalten bleiben kann. Verdeckte Zustände zeigen sich manchmal erst nach dem Rückbau. Zusätzliche Arbeiten, ihre Kosten und Auswirkungen auf den Zeitplan sollten vor der Ausführung vereinbart werden.",
            ],
          },
          {
            title: "Was den Preis beeinflusst",
            paragraphs: [
              "Der Kostenvoranschlag trennt Rückbau, Wand- und Bodenvorbereitung, Elektroarbeiten, Sanitärarbeiten und Ausbau. Materialien werden getrennt von den Arbeiten berechnet. Die Wohnfläche allein zeigt weder Leitungslängen noch Anschlusszahlen oder den nötigen Ausgleich von Untergründen.",
            ],
          },
        ],
        faqs: [
          {
            question:
              "Wie unterscheiden sich umfassende und optische Renovierung?",
            answer:
              "Eine umfassende Sanierung kann Wand- und Bodenreparaturen sowie den Austausch von Kabeln und Rohren umfassen. Eine optische Renovierung erneuert hauptsächlich sichtbare Oberflächen.",
          },
          {
            question: "Muss die Elektroanlage ersetzt werden?",
            answer:
              "Das hängt von Zustand, Leistungsbedarf und einer Sicherheitsprüfung ab.",
          },
          {
            question: "Können Sie einen Kostenvoranschlag erstellen?",
            answer:
              "Halten Sie für das erste Gespräch Fläche, Grundriss, Fotos und gewünschte Änderungen bereit. Nach der Besichtigung werden Umfang und Mengen präzisiert; verdeckte Bereiche lassen sich gegebenenfalls erst nach dem Rückbau prüfen.",
          },
          {
            question:
              "Womit beginnt die Sanierung einer gerade gekauften Wohnung?",
            answer:
              "Legen Sie vor dem Kauf der Ausbaumaterialien den Grundriss sowie die Positionen von Küche, Bad, Möbeln und Geräten fest. Danach werden Untergründe und Haustechnik bewertet und Rückbau, Installationen und Ausbau abgestimmt. So bezieht sich der Kostenvoranschlag auf die konkrete Wohnung.",
          },
        ],
        calculatorLabel: "Renovierung besprechen",
        contactLabel: "Renovierung besprechen",
        relatedTitle: "Passende Leistungen",
      },
      fr: {
        eyebrow: "Rénovation lourde · Erevan",
        title: "Rénovation lourde d’appartement à Erevan",
        description:
          "Rénovez un appartement ancien ou une maison à Erevan, de la dépose des finitions usées et du remplacement des réseaux à la préparation et à la finition des surfaces.",
        seoTitle: "Rénovation lourde d’appartement à Erevan | SHINEX",
        seoDescription:
          "Rénovation lourde d’appartement à Erevan : dépose, remplacement des réseaux selon leur état, préparation des supports et finitions. Devis SHINEX.",
        introduction: [
          "Une rénovation lourde peut être nécessaire lorsque les câbles, la plomberie, les murs ou les sols usés demandent une intervention en plus des finitions visibles.",
          "Avant le démarrage, nous évaluons l’état réel pour planifier un ordre de travaux sûr.",
        ],
        sections: [
          {
            title: "Étapes d’une rénovation lourde",
            paragraphs: [
              "La liste définitive des travaux est définie après la visite du bien.",
            ],
            items: [
              "Démolition",
              "Préparation des murs, sols et plafonds",
              "Modernisation de l’installation électrique",
              "Travaux de plomberie",
              "Cloisons ou modifications de l’agencement",
              "Finitions finales",
            ],
          },
          {
            title: "Pourquoi une visite est importante",
            paragraphs: [
              "Dans un appartement ancien, il faut d’abord déterminer ce qui peut être conservé. Certains défauts cachés n’apparaissent qu’après la dépose. Les travaux supplémentaires, leur coût et leur effet sur le calendrier sont à convenir avant leur réalisation.",
            ],
          },
          {
            title: "Ce qui influence le prix",
            paragraphs: [
              "Le devis distingue dépose, préparation des murs et sols, électricité, plomberie et finitions. Les matériaux sont chiffrés séparément de la main-d’œuvre. La surface seule ne précise ni la longueur des câbles, ni le nombre de raccordements, ni les besoins de ragréage.",
            ],
          },
        ],
        faqs: [
          {
            question:
              "Quelle différence entre rénovation lourde et rénovation légère ?",
            answer:
              "Une rénovation lourde peut inclure la réparation des murs et sols, la réfection électrique et le remplacement des canalisations. Une rénovation légère renouvelle surtout les finitions visibles.",
          },
          {
            question: "Faut-il remplacer l’installation électrique ?",
            answer:
              "Cela dépend de l’état, des besoins et d’une évaluation de sécurité.",
          },
          {
            question: "Pouvez-vous établir un devis ?",
            answer:
              "Pour un premier échange, préparez la surface, un plan, des photos et les changements souhaités. La visite précise les quantités et les travaux ; certaines zones cachées nécessitent une vérification après dépose.",
          },
          {
            question:
              "Par où commencer la rénovation lourde d’un appartement récemment acheté ?",
            answer:
              "Avant d’acheter les finitions, définissez le plan et l’emplacement de la cuisine, de la salle de bains, des meubles et des appareils. Évaluez ensuite les supports et les réseaux, puis convenez des travaux de dépose, d’installation et de finition. Le devis correspondra ainsi au logement concerné.",
          },
        ],
        calculatorLabel: "Discuter de votre rénovation",
        contactLabel: "Discuter de votre rénovation",
        relatedTitle: "Services associés",
      },
    },
  },
  {
    slug: "cosmetic-renovation-yerevan",
    contentUpdatedAt: "2026-10-28",
    kind: "service",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85",
    relatedServiceSlugs: ["renovation"],
    relatedLandingSlugs: [
      "apartment-renovation-yerevan",
      "capital-renovation-yerevan",
      "renovation-estimate-yerevan",
      "prices",
    ],
    translations: {
      hy: {
        eyebrow: "Կոսմետիկ վերանորոգում · Երևան",
        title: "Բնակարանի կոսմետիկ վերանորոգում Երևանում",
        description:
          "Կոսմետիկ վերանորոգում Երևանում՝ ամբողջ բնակարանի հարդարումը թարմացնելու համար՝ առանց կապիտալ փոփոխությունների։",
        note: "Կատարում ենք բնակարանի համալիր վերանորոգման շրջանակում։",
        seoTitle: "Բնակարանի կոսմետիկ վերանորոգում Երևանում | SHINEX",
        seoDescription:
          "Բնակարանի կոսմետիկ վերանորոգում Երևանում՝ պատեր, առաստաղ և հատակ ամբողջ բնակարանում։ Թարմացում բնակվելուց կամ վարձակալության հանձնելուց առաջ։ SHINEX։",
        introduction: [
          "Կոսմետիկ վերանորոգումը հարմար է, երբ տարածքի մակերեսներն ու ինժեներական համակարգերը բավարար վիճակում են, բայց հարդարումը, գույները կամ առանձին հատվածները թարմացման կարիք ունեն։",
          "Մինչ աշխատանքը ճշտում ենք մակերեսների վիճակը, որպեսզի արտաքին թարմացումը չթաքցնի ավելի լուրջ խնդիր։",
        ],
        sections: [
          {
            title: "Ի՞նչ է ներառում կոսմետիկ վերանորոգումը",
            paragraphs: [
              "Կոսմետիկ վերանորոգումը կատարում ենք ամբողջ բնակարանում՝ մեկ բրիգադով և մեկ նախահաշվով։",
            ],
            items: [
              "Պատերի նախապատրաստում և ներկում",
              "Պաստառի կամ այլ պատային ծածկույթի թարմացում",
              "Առաստաղի վերանորոգում",
              "Հատակի ծածկույթի տեղային կամ ամբողջական թարմացում",
              "Սալիկի ու սանտեխնիկայի տեսանելի հատվածների վերականգնում",
              "Լուսավորության կամ դռների փոխարինում",
            ],
          },
          {
            title: "Ե՞րբ է այն բավարար",
            paragraphs: [
              "Հարդարման թարմացումը կարող է բավարար լինել բնակվելուց, վաճառքից կամ վարձակալության հանձնելուց առաջ, եթե հիմքերն ու ինժեներական համակարգերը լուրջ վերանորոգում չեն պահանջում։ Նախ որոշեք՝ որ մակերեսներն են թարմացվելու, իսկ որ ծածկույթներն են պահպանվելու։ Խոնավությունը, վնասված հիմքերն ու անսարք հաղորդակցությունները պետք է գնահատել մինչև հարդարումը։",
            ],
          },
          {
            title: "Նախնական հաշվարկ",
            paragraphs: [
              "Արժեքը հաշվարկվում է ըստ մակերեսների և գործողությունների՝ հին ծածկույթի հեռացում, նախապատրաստում, ներկում, պաստառապատում կամ հատակի տեղադրում։ Նյութերը վճարվում են առանձին։ Նախնական քննարկման համար անհրաժեշտ են սենյակների չափերը, լուսանկարներն ու հարդարման տեսակը․ միայն բնակարանի մակերեսը բավարար չէ ճշգրիտ հաշվարկի համար։",
            ],
          },
        ],
        faqs: [
          {
            question: "Կոսմետիկ վերանորոգումը ներառո՞ւմ է էլեկտրիկա",
            answer:
              "Եթե առկա են ինժեներական խնդիրներ, գնահատում ենք՝ արդյոք պետք է դրանք լուծել առանձին՝ մինչ հարդարումը։",
          },
          {
            question: "Կարո՞ղ եք վերանորոգել մեկ սենյակ",
            answer:
              "Մենք կատարում ենք միայն համալիր վերանորոգում։ Հարդարումը կատարում ենք դրա շրջանակում՝ մեկ բրիգադով, ամբողջ բնակարանում։",
          },
          {
            question: "Որքա՞ն ժամանակ է տևում",
            answer:
              "Ժամկետը կախված է սենյակների քանակից, մակերեսների պատրաստումից, նյութերի չորացումից և տարածք մուտք գործելու պայմաններից։ Նախապես քննարկեք սենյակների ազատումն ու նյութերի առաքումը։ Գրաֆիկը որոշվում է աշխատանքների ցանկը ճշտելուց հետո։",
          },
          {
            question:
              "Հնարավո՞ր է կոսմետիկ վերանորոգման ընթացքում բնակվել բնակարանում։",
            answer:
              "Դա կախված է աշխատանքների կազմից և աշխատանքային գոտին առանձնացնելու հնարավորությունից։ Նախապես պետք է քննարկել փոշին, կահույքի տեղափոխումը, խոհանոցից ու սանհանգույցից օգտվելու պայմանները։ Սենյակ առ սենյակ աշխատելու հնարավորությունը գնահատվում է զննման ժամանակ․ ոչ բոլոր աշխատանքներն են համատեղելի բնակվելու հետ։",
          },
        ],
        calculatorLabel: "Կապվել մեզ հետ",
        contactLabel: "Կապվել մեզ հետ",
        relatedTitle: "Կապված ծառայություններ",
      },
      ru: {
        eyebrow: "Косметический ремонт · Ереван",
        title: "Косметический ремонт квартир в Ереване",
        description:
          "Косметический ремонт квартиры в Ереване целиком: обновление отделки без полной замены инженерных систем.",
        note: "Выполняем в составе комплексного ремонта квартиры.",
        seoTitle: "Косметический ремонт квартир в Ереване | SHINEX",
        seoDescription:
          "Косметический ремонт квартиры в Ереване: стены, потолок и пол во всей квартире. Обновление перед заселением или сдачей в аренду. Смета SHINEX.",
        introduction: [
          "Косметический ремонт подходит, когда основания и системы в нормальном состоянии, но отделку или отдельные зоны нужно обновить.",
          "До начала уточняем состояние поверхностей, чтобы внешнее обновление не скрыло серьёзную проблему.",
        ],
        sections: [
          {
            title: "Что может включать косметический ремонт",
            paragraphs: [
              "Косметический ремонт делаем для всей квартиры — одной бригадой и по одной смете.",
            ],
            items: [
              "Подготовка и покраска стен",
              "Обновление обоев или покрытий",
              "Ремонт потолка",
              "Обновление пола",
              "Восстановление видимых зон плитки и сантехники",
              "Замена света или дверей",
            ],
          },
          {
            title: "Когда этого достаточно",
            paragraphs: [
              "Обновление отделки может подойти перед заселением, продажей или сдачей квартиры в аренду, если основания и инженерные системы не требуют серьёзного ремонта. Сначала определите поверхности, которые нужно обновить, и покрытия, которые можно сохранить. Влага, повреждённые основания и неисправные коммуникации требуют отдельной оценки до отделки.",
            ],
          },
          {
            title: "Предварительный расчёт",
            paragraphs: [
              "Стоимость считают по конкретным поверхностям и операциям: снятию покрытия, подготовке, покраске, оклейке или укладке пола. Материалы оплачиваются отдельно. Для предварительного обсуждения нужны размеры комнат, фотографии и выбранный вид отделки; одна площадь квартиры не даёт точного расчёта.",
            ],
          },
        ],
        faqs: [
          {
            question: "Входит ли электрика?",
            answer:
              "Если есть инженерные проблемы, оцениваем, нужно ли решить их отдельно до отделки.",
          },
          {
            question: "Можно отремонтировать одну комнату?",
            answer:
              "Мы выполняем только комплексный ремонт. Отделку делаем в его составе — для всей квартиры, одной бригадой.",
          },
          {
            question: "Сколько это занимает?",
            answer:
              "Срок зависит от количества комнат, подготовки поверхностей, высыхания материалов и доступа на объект. Обсудите освобождение комнат и доставку покрытий заранее. График определяют после уточнения перечня работ.",
          },
          {
            question:
              "Можно ли делать косметический ремонт, продолжая жить в квартире?",
            answer:
              "Это зависит от состава работ и возможности отделить рабочую зону. Нужно заранее обсудить пыль, перемещение мебели, доступ к кухне и санузлу. Возможность ремонта по комнатам оценивается при осмотре; не каждый объём работ совместим с проживанием.",
          },
        ],
        calculatorLabel: "Обсудить ремонт",
        contactLabel: "Обсудить ремонт",
        relatedTitle: "Связанные услуги",
      },
      en: {
        eyebrow: "Cosmetic renovation · Yerevan",
        title: "Cosmetic apartment renovation in Yerevan",
        description:
          "Refresh the finishes throughout your apartment when the existing wiring, plumbing and surfaces are in sound condition.",
        note: "We carry out this work as part of a complete apartment renovation.",
        seoTitle: "Cosmetic apartment renovation in Yerevan | SHINEX",
        seoDescription:
          "Cosmetic apartment renovation in Yerevan: walls, ceilings and floors across the whole apartment. Refresh before moving in or renting out. SHINEX estimate.",
        introduction: [
          "Cosmetic renovation is suitable when walls, floors, wiring and plumbing are in sound condition, but the visible finishes need updating.",
          "We check surfaces first so a visual update does not conceal a more serious issue.",
        ],
        sections: [
          {
            title: "What cosmetic renovation can include",
            paragraphs: [
              "We carry out cosmetic renovation across the whole apartment, with one team and one estimate.",
            ],
            items: [
              "Wall preparation and painting",
              "Wallpaper or wall-covering updates",
              "Ceiling repair",
              "Floor-covering updates",
              "Local repairs to tiles and bathroom finishes",
              "Lighting or door replacement",
            ],
          },
          {
            title: "When it is enough",
            paragraphs: [
              "Refreshing finishes may suit an apartment before moving in, selling or renting it out if surfaces and services do not need major repairs. Identify which surfaces need updating and which finishes can stay. Moisture, damaged substrates and faulty services need separate assessment before finishing.",
            ],
          },
          {
            title: "Initial estimate",
            paragraphs: [
              "Cost is based on surfaces and tasks: removing coverings, preparation, painting, wallpapering or flooring. Materials are paid for separately. Room dimensions, photographs and chosen finishes help the initial discussion; floor area alone cannot give an exact cost.",
            ],
          },
        ],
        faqs: [
          {
            question: "Does it include electrical work?",
            answer:
              "We assess any wiring problems separately and clarify the work needed before new finishes are applied.",
          },
          {
            question: "Can you renovate one room?",
            answer:
              "We only carry out complete renovations. Finishing work is done as part of that, across the whole apartment, by one team.",
          },
          {
            question: "How long does it take?",
            answer:
              "Timing depends on room count, preparation, drying and site access. Discuss clearing rooms and delivering finishes in advance. The schedule is determined once the work list is clear.",
          },
          {
            question: "Can I stay in the apartment during cosmetic renovation?",
            answer:
              "It depends on the work and whether the work area can be separated. Discuss dust, moving furniture and kitchen and bathroom access in advance. Room-by-room work is assessed during the survey; some scopes are incompatible with staying in the apartment.",
          },
        ],
        calculatorLabel: "Discuss your renovation",
        contactLabel: "Discuss your renovation",
        relatedTitle: "Related services",
      },
      de: {
        eyebrow: "Optische Renovierung · Eriwan",
        title: "Optische Wohnungsrenovierung in Eriwan",
        description:
          "Frischen Sie die Oberflächen Ihrer gesamten Wohnung auf, wenn Kabel, Rohre und Untergründe in gutem Zustand sind.",
        note: "Wir führen diese Arbeiten im Rahmen einer Komplettrenovierung der Wohnung aus.",
        seoTitle: "Optische Wohnungsrenovierung in Eriwan | SHINEX",
        seoDescription:
          "Optische Wohnungsrenovierung in Eriwan: Wände, Decken und Böden der gesamten Wohnung. Auffrischung vor Einzug oder Vermietung. Kostenvoranschlag von SHINEX.",
        introduction: [
          "Eine optische Renovierung ist geeignet, wenn Wände, Böden, Kabel und Rohre intakt sind, die sichtbaren Oberflächen aber erneuert werden sollen.",
          "Wir prüfen zuerst die Untergründe, damit eine optische Auffrischung keine ernsteren Probleme verdeckt.",
        ],
        sections: [
          {
            title: "Was eine optische Renovierung umfassen kann",
            paragraphs: [
              "Die optische Renovierung führen wir für die gesamte Wohnung aus – mit einem Team und einem Kostenvoranschlag.",
            ],
            items: [
              "Wandvorbereitung und Anstrich",
              "Erneuerung von Tapeten oder Wandbelägen",
              "Deckenreparatur",
              "Erneuerung der Bodenbeläge",
              "Örtliche Reparaturen an Fliesen und Badoberflächen",
              "Austausch von Beleuchtung oder Türen",
            ],
          },
          {
            title: "Wann eine Auffrischung ausreicht",
            paragraphs: [
              "Vor Einzug, Verkauf oder Vermietung kann eine Auffrischung genügen, wenn Untergründe und Haustechnik keine größeren Reparaturen brauchen. Klären Sie, welche Flächen erneuert und welche Beläge erhalten werden. Feuchtigkeit, beschädigte Untergründe und defekte Leitungen müssen vor dem Ausbau gesondert bewertet werden.",
            ],
          },
          {
            title: "Erste Kostenschätzung",
            paragraphs: [
              "Die Kosten richten sich nach Flächen und Tätigkeiten: Beläge entfernen, vorbereiten, streichen, tapezieren oder Boden verlegen. Materialien werden separat bezahlt. Raummaße, Fotos und gewünschte Beläge helfen beim ersten Gespräch; die Wohnfläche allein erlaubt keine genaue Berechnung.",
            ],
          },
        ],
        faqs: [
          {
            question: "Sind Elektroarbeiten enthalten?",
            answer:
              "Probleme mit der Verkabelung prüfen wir separat und klären die nötigen Arbeiten vor dem Aufbringen neuer Oberflächen.",
          },
          {
            question: "Können Sie nur ein Zimmer renovieren?",
            answer:
              "Wir führen ausschließlich Komplettrenovierungen aus. Ausbauarbeiten erledigen wir in deren Rahmen – für die gesamte Wohnung, mit einem Team.",
          },
          {
            question: "Wie lange dauert es?",
            answer:
              "Die Dauer hängt von Raumzahl, Vorbereitung, Trocknung und Zugang ab. Besprechen Sie das Freiräumen der Zimmer und Materiallieferungen im Voraus. Der Zeitplan wird nach Klärung der Arbeiten festgelegt.",
          },
          {
            question:
              "Kann ich während der Renovierung in der Wohnung bleiben?",
            answer:
              "Das hängt von den Arbeiten und der Abtrennbarkeit des Arbeitsbereichs ab. Staub, Möbeltransport sowie Zugang zu Küche und Bad sind vorab zu besprechen. Ob raumweise gearbeitet werden kann, wird bei der Besichtigung geprüft; nicht jeder Umfang lässt sich mit dem Bewohnen vereinbaren.",
          },
        ],
        calculatorLabel: "Renovierung besprechen",
        contactLabel: "Renovierung besprechen",
        relatedTitle: "Passende Leistungen",
      },
      fr: {
        eyebrow: "Rénovation légère · Erevan",
        title: "Rénovation légère d’appartement à Erevan",
        description:
          "Rafraîchissez les finitions de tout votre appartement lorsque l’électricité, la plomberie et les surfaces sont en bon état.",
        note: "Nous réalisons ces travaux dans le cadre d’une rénovation complète de l’appartement.",
        seoTitle: "Rénovation légère d’appartement à Erevan | SHINEX",
        seoDescription:
          "Rénovation légère d’appartement à Erevan : murs, plafonds et sols de tout l’appartement. Rafraîchissement avant emménagement ou location. Devis SHINEX.",
        introduction: [
          "Une rénovation légère convient lorsque les murs, sols, câbles et canalisations sont sains, mais que les finitions visibles ont besoin d’être renouvelées.",
          "Nous vérifions d’abord les surfaces pour qu’un rafraîchissement ne masque pas un problème plus sérieux.",
        ],
        sections: [
          {
            title: "Ce que peut comprendre une rénovation légère",
            paragraphs: [
              "Nous réalisons la rénovation légère sur l’ensemble de l’appartement, avec une seule équipe et un seul devis.",
            ],
            items: [
              "Préparation et peinture des murs",
              "Renouvellement du papier peint ou des revêtements muraux",
              "Réparation du plafond",
              "Renouvellement des revêtements de sol",
              "Réparations localisées du carrelage et des finitions de salle de bains",
              "Remplacement de l’éclairage ou des portes",
            ],
          },
          {
            title: "Quand un rafraîchissement suffit",
            paragraphs: [
              "Un rafraîchissement peut convenir avant un emménagement, une vente ou une mise en location si les supports et les réseaux ne nécessitent pas de réparations importantes. Déterminez les surfaces à reprendre et les revêtements à conserver. Humidité, supports dégradés et réseaux défectueux doivent être évalués avant les finitions.",
            ],
          },
          {
            title: "Première estimation",
            paragraphs: [
              "Le coût dépend des surfaces et des tâches : dépose de revêtements, préparation, peinture, papier peint ou pose de sol. Les matériaux sont payés séparément. Dimensions, photos et finitions souhaitées aident au premier échange ; la surface de l’appartement seule ne suffit pas à un chiffrage précis.",
            ],
          },
        ],
        faqs: [
          {
            question: "Les travaux électriques sont-ils inclus ?",
            answer:
              "Nous évaluons séparément les problèmes électriques et précisons les travaux nécessaires avant les nouvelles finitions.",
          },
          {
            question: "Pouvez-vous rénover uniquement une pièce ?",
            answer:
              "Nous réalisons uniquement des rénovations complètes. Les finitions sont faites dans ce cadre, sur tout l’appartement, par une seule équipe.",
          },
          {
            question: "Combien de temps cela prend-il ?",
            answer:
              "La durée dépend du nombre de pièces, de la préparation, du séchage et de l’accès. Prévoyez le dégagement des pièces et la livraison des matériaux. Le calendrier est établi une fois la liste des travaux précisée.",
          },
          {
            question:
              "Puis-je habiter l’appartement pendant une rénovation légère ?",
            answer:
              "Cela dépend des travaux et de la possibilité de séparer la zone de chantier. Il faut discuter à l’avance de la poussière, du déplacement des meubles et de l’accès à la cuisine et à la salle de bains. La faisabilité d’un travail pièce par pièce est évaluée lors de la visite ; certains travaux ne permettent pas de rester sur place.",
          },
        ],
        calculatorLabel: "Discuter de votre rénovation",
        contactLabel: "Discuter de votre rénovation",
        relatedTitle: "Services associés",
      },
    },
  },
  {
    slug: "renovation-estimate-yerevan",
    contentUpdatedAt: "2026-10-29",
    kind: "prices",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85",
    relatedServiceSlugs: ["renovation"],
    relatedLandingSlugs: [
      "prices",
      "apartment-renovation-yerevan",
      "capital-renovation-yerevan",
      "cosmetic-renovation-yerevan",
      "new-build-renovation",
      "turnkey-renovation",
    ],
    translations: {
      hy: {
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
        sections: [
          {
            title: "Ի՞նչ պետք է ներառի նախահաշիվը",
            paragraphs: [
              "Յուրաքանչյուր տողում պետք է նշված լինեն աշխատանքը, չափված ծավալը և միավորի գինը։ Նյութերն ու լրացուցիչ ծախսերը ներկայացվում են առանձին։ Այս էջի օրինակը կօգնի ստուգել առաջարկի կազմը։",
            ],
            items: [
              "Աշխատանքների անվանումներ",
              "Ծավալներ և չափման միավորներ",
              "Նախապատրաստական ու ապամոնտաժման աշխատանքներ",
              "Ինժեներական աշխատանքների ցանկ",
              "Հարդարման աշխատանքների շրջանակ",
              "Համաձայնեցման ենթակա լրացուցիչ պայմաններ",
            ],
          },
          {
            title: "Ինչպե՞ս ստանալ ճշգրիտ հաշվարկ",
            paragraphs: [
              "Սկզբում հավաքում ենք բնակարանի կամ տարածքի հիմնական տվյալները, ապա զննման և չափագրության հիման վրա ճշտում ենք աշխատանքների կազմը։",
              "Էջի կապի կոճակով թողեք հայտ կամ կապվեք հեռախոսով։ Նշեք տարածքի տեսակը, մակերեսն ու ցանկալի աշխատանքները։ Լուսանկարների և հատակագծի փոխանցման եղանակը կհամաձայնեցնենք կապի ընթացքում։",
            ],
            items: [
              "Մինչև զննումը նշեք՝ ինչն եք ցանկանում պահպանել, փոխարինել կամ ավելացնել, և կա՞ պատրաստի նախագիծ։",
              "Չափագրությունից հետո համաձայնեցրեք սենյակները, աշխատանքների ծավալներն ու չափման միավորները։ Նյութերը, առաքումն ու բացառությունները նշվում են առանձին։",
              "Նախահաշվի փոփոխությունները համաձայնեցրեք մինչև լրացուցիչ աշխատանքը՝ հստակեցնելով գումարի և ժամկետի փոփոխությունը։",
            ],
          },
          {
            title: "Ինչո՞ւ է գինը փոխվում",
            paragraphs: [
              "Փոփոխությունների պատճառ կարող են լինել թաքնված խնդիրները, մակերեսների վիճակը, ընտրված նյութերը, նախագծային լուծումները և աշխատանքների ծավալի հստակեցումը։",
            ],
          },
        ],
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
        calculatorLabel: "Կապվել մեզ հետ",
        contactLabel: "Կապվել մեզ հետ",
        relatedTitle: "Կապված ծառայություններ",
      },
      ru: {
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
        sections: [
          {
            title: "Что должна включать смета",
            paragraphs: [
              "Каждая строка связывает конкретную работу, измеренный объём и цену за единицу. Отдельно указываются материалы и дополнительные расходы. Пример на этой странице помогает проверить структуру предложения.",
            ],
            items: [
              "Наименования работ",
              "Объёмы и единицы",
              "Подготовка и демонтаж",
              "Инженерные работы",
              "Объём отделки",
              "Дополнительные условия для согласования",
            ],
          },
          {
            title: "Как получить точный расчёт",
            paragraphs: [
              "Сначала собираем основные данные, затем уточняем состав работ после осмотра и замеров.",
              "Оставьте заявку через кнопку связи на странице или позвоните. Укажите тип объекта, площадь и нужные работы. Способ передачи фотографий и планировки согласуем при общении.",
            ],
            items: [
              "До осмотра отметьте, что хотите сохранить, заменить или добавить, и есть ли готовый проект.",
              "После замеров согласуйте помещения, объёмы и единицы работ. Материалы, доставку и исключения перечислите отдельно.",
              "Изменения сметы согласуйте до дополнительных работ, уточнив влияние на сумму и сроки.",
            ],
          },
          {
            title: "Почему цена меняется",
            paragraphs: [
              "На неё влияют скрытые проблемы, состояние поверхностей, материалы, проектные решения и уточнение объёмов.",
            ],
          },
        ],
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
        calculatorLabel: "Обсудить ремонт",
        contactLabel: "Обсудить ремонт",
        relatedTitle: "Связанные услуги",
      },
      en: {
        eyebrow: "Renovation estimate · Yerevan",
        title: "Renovation estimate in Yerevan",
        description:
          "Learn how to read a renovation estimate: check the tasks, measured quantities, unit rates, materials and additional costs.",
        seoTitle: "Renovation Estimate in Yerevan | SHINEX",
        seoDescription:
          "Renovation estimates in Yerevan: work list, quantities and a precise calculation after a survey.",
        introduction: [
          "An estimate should show what the budget covers and what may change it.",
          "A price discussed over the phone is only a starting point. A site survey and measurements are needed to assess surface preparation, wiring, plumbing and other work.",
        ],
        sections: [
          {
            title: "What an estimate should include",
            paragraphs: [
              "Each line should identify the task, measured quantity and unit rate. Materials and additional costs should be listed separately. The example on this page shows a structure you can use to review a quotation.",
            ],
            items: [
              "Individual tasks",
              "Measured quantities and units",
              "Preparation and removal of old finishes",
              "Electrical and plumbing work",
              "Painting, flooring and other finishes",
              "Materials, additional costs and agreed exclusions",
            ],
          },
          {
            title: "Getting a precise calculation",
            paragraphs: [
              "We collect the starting information, then refine the scope after a survey and measurements.",
              "Use the contact button on this page or call us. Include the property type, floor area and intended work. We will agree how to share photos and plans when we speak.",
            ],
            items: [
              "Before the survey, identify what you want to retain, replace or add, and whether a design is available.",
              "After measurements, agree the rooms, quantities and units of work. List materials, delivery and exclusions separately.",
              "Agree estimate revisions before additional work, including their effect on cost and timing.",
            ],
          },
          {
            title: "Why price changes",
            paragraphs: [
              "Hidden damage, uneven walls or floors, different material choices and changes to the design or work quantities can affect the budget.",
            ],
          },
        ],
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
        calculatorLabel: "Discuss your renovation",
        contactLabel: "Discuss your renovation",
        relatedTitle: "Related services",
      },
      de: {
        eyebrow: "Renovierungskostenschätzung · Eriwan",
        title: "Renovierungskostenschätzung in Eriwan",
        description:
          "So lesen Sie einen Renovierungskostenvoranschlag: Prüfen Sie Arbeiten, gemessene Mengen, Einheitspreise, Materialien und Zusatzkosten.",
        seoTitle: "Renovierungskostenschätzung in Eriwan | SHINEX",
        seoDescription:
          "Renovierungskostenschätzungen in Eriwan: Arbeitsliste, Mengen und genaue Berechnung nach Besichtigung.",
        introduction: [
          "Ein Kostenvoranschlag sollte zeigen, was das Budget abdeckt und was es verändern kann.",
          "Ein telefonisch genannter Preis ist nur ein Ausgangspunkt. Besichtigung und Aufmaß sind nötig, um Untergrundvorbereitung, Elektro-, Sanitär- und weitere Arbeiten einzuschätzen.",
        ],
        sections: [
          {
            title: "Was ein Kostenvoranschlag enthalten sollte",
            paragraphs: [
              "Jede Position sollte Arbeit, gemessene Menge und Einheitspreis nennen. Materialien und Zusatzkosten sollten separat stehen. Das Beispiel auf dieser Seite zeigt eine Struktur zur Angebotsprüfung.",
            ],
            items: [
              "Einzelne Tätigkeiten",
              "Gemessene Mengen und Einheiten",
              "Vorbereitung und Entfernung alter Oberflächen",
              "Elektro- und Sanitärarbeiten",
              "Anstriche, Bodenbeläge und weiterer Ausbau",
              "Materialien, Zusatzkosten und vereinbarte Ausschlüsse",
            ],
          },
          {
            title: "Eine genaue Berechnung erhalten",
            paragraphs: [
              "Wir sammeln die Ausgangsdaten und präzisieren den Umfang nach Besichtigung und Aufmaß.",
              "Nutzen Sie die Kontakt-Schaltfläche dieser Seite oder rufen Sie an. Nennen Sie Objektart, Fläche und gewünschte Arbeiten. Wie Sie Fotos und Pläne übermitteln, klären wir im Gespräch.",
            ],
            items: [
              "Notieren Sie vor der Besichtigung, was erhalten, ersetzt oder ergänzt werden soll und ob eine Planung vorliegt.",
              "Stimmen Sie nach dem Aufmaß Räume, Mengen und Einheiten ab. Materialien, Lieferung und ausgeschlossene Leistungen werden separat aufgeführt.",
              "Vereinbaren Sie Änderungen der Kostenschätzung vor zusätzlichen Arbeiten einschließlich der Auswirkungen auf Kosten und Termine.",
            ],
          },
          {
            title: "Warum sich der Preis ändern kann",
            paragraphs: [
              "Verdeckte Schäden, unebene Wände oder Böden, andere Materialien sowie Änderungen an Planung oder Mengen können das Budget beeinflussen.",
            ],
          },
        ],
        faqs: [
          {
            question: "Kann ich telefonisch einen genauen Preis erhalten?",
            answer:
              "Wir können eine erste Orientierung geben. Eine genaue Kostenschätzung benötigt jedoch Objektdaten und eine Besichtigung.",
          },
          {
            question: "Enthält ein Kostenvoranschlag Materialien?",
            answer: "Das wird je nach Projekt separat vereinbart.",
          },
          {
            question: "Was wird für eine Kostenschätzung benötigt?",
            answer:
              "Fläche, Zustand, gewünschte Arbeiten und möglichst Fotos oder ein Plan.",
          },
        ],
        calculatorLabel: "Renovierung besprechen",
        contactLabel: "Renovierung besprechen",
        relatedTitle: "Passende Leistungen",
      },
      fr: {
        eyebrow: "Devis de rénovation · Erevan",
        title: "Devis de rénovation à Erevan",
        description:
          "Apprenez à lire un devis de rénovation : vérifiez les tâches, quantités mesurées, prix unitaires, matériaux et frais supplémentaires.",
        seoTitle: "Devis de rénovation à Erevan | SHINEX",
        seoDescription:
          "Devis de rénovation à Erevan : liste des travaux, quantités et calcul précis après une visite.",
        introduction: [
          "Un devis doit montrer ce que couvre le budget et ce qui peut le modifier.",
          "Un prix évoqué par téléphone n’est qu’un point de départ. Une visite et des mesures sont nécessaires pour évaluer la préparation des surfaces, l’électricité, la plomberie et les autres travaux.",
        ],
        sections: [
          {
            title: "Ce qu’un devis doit contenir",
            paragraphs: [
              "Chaque ligne doit préciser la tâche, la quantité mesurée et le prix unitaire. Les matériaux et frais supplémentaires doivent être séparés. L’exemple de cette page propose une structure pour examiner un devis.",
            ],
            items: [
              "Tâches individuelles",
              "Quantités mesurées et unités",
              "Préparation et dépose des anciennes finitions",
              "Travaux d’électricité et de plomberie",
              "Peinture, sols et autres finitions",
              "Matériaux, frais supplémentaires et exclusions convenues",
            ],
          },
          {
            title: "Obtenir un calcul précis",
            paragraphs: [
              "Nous réunissons les informations initiales, puis affinons le périmètre après visite et mesures.",
              "Utilisez le bouton de contact de cette page ou appelez-nous. Indiquez le type de bien, sa surface et les travaux souhaités. Nous conviendrons ensemble du moyen de transmettre photos et plans.",
            ],
            items: [
              "Avant la visite, indiquez ce que vous souhaitez conserver, remplacer ou ajouter, et si un projet est déjà disponible.",
              "Après les mesures, convenez des pièces, quantités et unités de travaux. Distinguez matériaux, livraison et exclusions.",
              "Validez les modifications du devis avant les travaux supplémentaires, en précisant leurs effets sur le coût et les délais.",
            ],
          },
          {
            title: "Pourquoi le prix peut changer",
            paragraphs: [
              "Des dommages cachés, des murs ou sols irréguliers, d’autres matériaux et des modifications de conception ou de quantités peuvent affecter le budget.",
            ],
          },
        ],
        faqs: [
          {
            question: "Puis-je obtenir un prix exact par téléphone ?",
            answer:
              "Nous pouvons donner une première indication, mais un devis précis nécessite les informations du bien et une visite.",
          },
          {
            question: "Un devis comprend-il les matériaux ?",
            answer: "Cela est convenu séparément selon le projet.",
          },
          {
            question: "Que faut-il pour établir un devis ?",
            answer:
              "La surface, l’état, les travaux souhaités et, si possible, des photos ou un plan.",
          },
        ],
        calculatorLabel: "Discuter de votre rénovation",
        contactLabel: "Discuter de votre rénovation",
        relatedTitle: "Services associés",
      },
    },
  },
  {
    slug: "plumbing-work-yerevan",
    kind: "service",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85",
    relatedServiceSlugs: ["renovation", "commercial-construction"],
    relatedLandingSlugs: [
      "capital-renovation-yerevan",
      "apartment-renovation-yerevan",
      "renovation-estimate-yerevan",
    ],
    translations: {
      hy: {
        eyebrow: "Սանտեխնիկական աշխատանքներ · Երևան",
        title: "Սանտեխնիկական աշխատանքներ Երևանում",
        description:
          "Սանտեխնիկական աշխատանքներ Երևանում բնակարանի, տան կամ բիզնես տարածքի վերանորոգման շրջանակում՝ պլանավորումից մինչև տեղադրում և ստուգում։",
        note: "Կատարում ենք բնակարանի համալիր վերանորոգման շրջանակում։",
        seoTitle: "Սանտեխնիկական աշխատանքներ Երևանում | SHINEX",
        seoDescription:
          "Սանտեխնիկական աշխատանքներ Երևանում՝ ջրամատակարարման ու ջրահեռացման խողովակներ, խոհանոցի և սանհանգույցի սարքավորումների միացում։",
        introduction: [
          "Սանտեխնիկական աշխատանքները ցանկալի է պլանավորել վերանորոգման սկզբնական փուլում՝ մինչև պատերի և հատակի վերջնական հարդարումը։",
          "Խողովակների ուղիներն ու միացման տեղերը որոշում ենք խոհանոցի, սանհանգույցի, կահույքի և տեխնիկայի դասավորությունը ճշտելուց հետո։",
        ],
        sections: [
          {
            title: "Սանտեխնիկական լուծումներ",
            paragraphs: [
              "Անհրաժեշտ աշխատանքները որոշում ենք՝ հաշվի առնելով տարածքի հատակագիծը, առկա խողովակների վիճակը և տեղադրվող սարքավորումները։",
            ],
            items: [
              "Ջրամատակարարման կետերի պլանավորում",
              "Ջրահեռացման լուծումներ",
              "Սանհանգույցի սարքավորումների միացման նախապատրաստում",
              "Խոհանոցի լվացարանի և տեխնիկայի միացման տեղեր",
              "Հին հանգույցների վերանորոգման կամ փոխարինման գնահատում",
              "Տեղադրված համակարգի ստուգում",
            ],
          },
          {
            title: "Ինչո՞ւ է անհրաժեշտ նախապես որոշել դասավորությունը",
            paragraphs: [
              "Սարքավորումների կամ կահույքի տեղերը հարդարումից հետո փոխելը կարող է պահանջել խողովակների տեղափոխում և պատրաստի մակերեսների վնասում։ Այդ պատճառով դրանց տեղերը ճշտում ենք սկզբում։",
            ],
          },
          {
            title: "Արժեքի վրա ազդող գործոններ",
            paragraphs: [
              "Արժեքը կախված է կետերի քանակից, խողովակաշարերի երկարությունից և դասավորությունից, առկա համակարգի վիճակից, ապամոնտաժման կարիքից և ընտրված սարքավորումներից։",
            ],
          },
        ],
        faqs: [
          {
            question: "Ե՞րբ անել սանտեխնիկական աշխատանքները",
            answer:
              "Սովորաբար՝ վերանորոգման նախապատրաստական ու ինժեներական փուլում, մինչ վերջնական հարդարումը։",
          },
          {
            question:
              "Կարո՞ղ եք տեղափոխել խոհանոցի կամ սանհանգույցի միացման կետերը",
            answer:
              "Հնարավորությունը գնահատվում է տվյալ տարածքի համակարգերի ու տեխնիկական պայմանների հիման վրա։",
          },
          {
            question: "Հնարավո՞ր է պատվիրել միայն սանտեխնիկական աշխատանքներ",
            answer:
              "Մենք կատարում ենք միայն համալիր վերանորոգում։ Սանտեխնիկական աշխատանքները կատարում ենք դրա շրջանակում՝ մեկ բրիգադով։",
          },
        ],
        calculatorLabel: "Կապվել մեզ հետ",
        contactLabel: "Կապվել մեզ հետ",
        relatedTitle: "Կապված ծառայություններ",
      },
      ru: {
        eyebrow: "Сантехнические работы · Ереван",
        title: "Сантехнические работы в Ереване",
        description:
          "Сантехнические работы в Ереване для квартиры, дома или бизнеса в рамках ремонта: от планирования до монтажа и проверки.",
        note: "Выполняем в составе комплексного ремонта квартиры.",
        seoTitle: "Сантехнические работы в Ереване | SHINEX",
        seoDescription:
          "Сантехнические работы в Ереване: водоснабжение, канализация, точки ванной и кухни в ходе ремонта.",
        introduction: [
          "Сантехнические работы лучше планировать в начале ремонта, до финальной отделки стен и пола.",
          "Расположение точек зависит от планировки кухни, ванной, техники и мебели.",
        ],
        sections: [
          {
            title: "Сантехнические решения",
            paragraphs: [
              "Список работ согласуется по схеме помещения, существующей системе и будущему использованию.",
            ],
            items: [
              "Точки водоснабжения",
              "Канализация",
              "Подготовка подключений санузла",
              "Точки кухни и техники",
              "Оценка замены старых узлов",
              "Проверка смонтированной системы",
            ],
          },
          {
            title: "Почему планировка нужна заранее",
            paragraphs: [
              "Изменение оборудования и мебели после отделки может требовать дополнительных работ, поэтому точки уточняются заранее.",
            ],
          },
          {
            title: "Факторы стоимости",
            paragraphs: [
              "Важны число точек, трассы труб, состояние системы, демонтаж и выбранное оборудование.",
            ],
          },
        ],
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
            question: "Можно заказать только сантехнику?",
            answer:
              "Мы выполняем только комплексный ремонт. Сантехнику делаем в его составе, одной бригадой.",
          },
        ],
        calculatorLabel: "Обсудить ремонт",
        contactLabel: "Обсудить ремонт",
        relatedTitle: "Связанные услуги",
      },
      en: {
        eyebrow: "Plumbing work · Yerevan",
        title: "Plumbing work in Yerevan",
        description:
          "Plumbing work in Yerevan for apartments, houses and business spaces as part of a renovation, from planning to installation and testing.",
        note: "We carry out this work as part of a complete apartment renovation.",
        seoTitle: "Plumbing Work in Yerevan | SHINEX",
        seoDescription:
          "Plumbing work in Yerevan: water supply and drainage pipes, kitchen and bathroom connections, installation and testing during renovation.",
        introduction: [
          "Plumbing is best planned early, before final wall and floor finishes.",
          "We plan pipe routes and connection locations around the kitchen and bathroom layout, including appliances and fitted furniture.",
        ],
        sections: [
          {
            title: "Plumbing solutions",
            paragraphs: [
              "We agree the work after reviewing the layout, existing pipes and the fixtures or appliances to be installed.",
            ],
            items: [
              "Water supply connections",
              "Drainage pipe routes",
              "Connections for bathroom fixtures",
              "Kitchen sink and appliance connections",
              "Assessment of existing pipes and fittings",
              "Testing the installed system",
            ],
          },
          {
            title: "Why layout comes first",
            paragraphs: [
              "Moving appliances or fixtures after decorating can mean moving pipes and opening finished surfaces. Agreeing their positions early helps avoid this extra work.",
            ],
          },
          {
            title: "Cost factors",
            paragraphs: [
              "The number of plumbing connections, pipe routes, system condition, demolition and selected equipment affect the cost.",
            ],
          },
        ],
        faqs: [
          {
            question: "When is plumbing done?",
            answer:
              "Pipework is usually installed during the early renovation stages, before walls and floors receive their final finishes.",
          },
          {
            question: "Can kitchen or bathroom connections be moved?",
            answer:
              "That depends on the existing system and technical conditions.",
          },
          {
            question: "Can I request plumbing work on its own?",
            answer:
              "We only carry out complete renovations. Plumbing is done as part of that, by one team.",
          },
        ],
        calculatorLabel: "Discuss your renovation",
        contactLabel: "Discuss your renovation",
        relatedTitle: "Related services",
      },
      de: {
        eyebrow: "Sanitärarbeiten · Eriwan",
        title: "Sanitärarbeiten in Eriwan",
        description:
          "Sanitärarbeiten in Eriwan für Wohnungen, Häuser und Gewerberäume im Rahmen einer Renovierung, von der Planung bis zur Installation und Prüfung.",
        note: "Wir führen diese Arbeiten im Rahmen einer Komplettrenovierung der Wohnung aus.",
        seoTitle: "Sanitärarbeiten in Eriwan | SHINEX",
        seoDescription:
          "Sanitärarbeiten in Eriwan: Wasser- und Abwasserleitungen, Küchen- und Badanschlüsse, Installation und Prüfung bei Renovierungen.",
        introduction: [
          "Sanitärarbeiten sollten früh geplant werden, vor dem endgültigen Wand- und Bodenausbau.",
          "Wir planen Leitungswege und Anschlüsse nach Küchen- und Badgrundriss, einschließlich Geräten und Einbaumöbeln.",
        ],
        sections: [
          {
            title: "Sanitärlösungen",
            paragraphs: [
              "Wir vereinbaren die Arbeiten nach Prüfung von Grundriss, vorhandenen Rohren und den geplanten Sanitärobjekten oder Geräten.",
            ],
            items: [
              "Wasseranschlüsse",
              "Abwasserleitungswege",
              "Anschlüsse für Sanitärobjekte",
              "Anschlüsse für Spüle und Küchengeräte",
              "Prüfung vorhandener Rohre und Armaturen",
              "Prüfung der installierten Anlage",
            ],
          },
          {
            title: "Warum der Grundriss zuerst kommt",
            paragraphs: [
              "Werden Geräte oder Sanitärobjekte nach dem Ausbau versetzt, müssen möglicherweise Rohre verlegt und fertige Oberflächen geöffnet werden. Eine frühe Abstimmung hilft, diese Zusatzarbeiten zu vermeiden.",
            ],
          },
          {
            title: "Kostenfaktoren",
            paragraphs: [
              "Die Anzahl der Anschlüsse, Leitungswege, der Anlagenzustand, Rückbau und ausgewählte Ausstattung beeinflussen die Kosten.",
            ],
          },
        ],
        faqs: [
          {
            question: "Wann werden Sanitärarbeiten ausgeführt?",
            answer:
              "Leitungen werden üblicherweise in frühen Renovierungsphasen installiert, bevor Wände und Böden ihre endgültigen Oberflächen erhalten.",
          },
          {
            question: "Können Küchen- oder Badanschlüsse versetzt werden?",
            answer:
              "Das hängt von der vorhandenen Anlage und den technischen Bedingungen ab.",
          },
          {
            question: "Kann ich Sanitärarbeiten separat beauftragen?",
            answer:
              "Wir führen ausschließlich Komplettrenovierungen aus. Sanitärarbeiten erledigen wir in deren Rahmen, mit einem Team.",
          },
        ],
        calculatorLabel: "Renovierung besprechen",
        contactLabel: "Renovierung besprechen",
        relatedTitle: "Passende Leistungen",
      },
      fr: {
        eyebrow: "Plomberie · Erevan",
        title: "Travaux de plomberie à Erevan",
        description:
          "Travaux de plomberie à Erevan pour appartements, maisons et locaux professionnels dans le cadre d’une rénovation, de la planification à l’installation et aux essais.",
        note: "Nous réalisons ces travaux dans le cadre d’une rénovation complète de l’appartement.",
        seoTitle: "Travaux de plomberie à Erevan | SHINEX",
        seoDescription:
          "Plomberie à Erevan : conduites d’eau et d’évacuation, raccordements de cuisine et de salle de bains, installation et essais pendant la rénovation.",
        introduction: [
          "La plomberie se prépare de préférence tôt, avant les finitions définitives des murs et des sols.",
          "Nous prévoyons les tracés des canalisations et les raccordements selon l’agencement de la cuisine et de la salle de bains, appareils et mobilier intégré compris.",
        ],
        sections: [
          {
            title: "Solutions de plomberie",
            paragraphs: [
              "Nous convenons des travaux après étude de l’agencement, des canalisations existantes et des équipements sanitaires ou appareils à installer.",
            ],
            items: [
              "Raccordements d’alimentation en eau",
              "Tracés des évacuations",
              "Raccordements des équipements sanitaires",
              "Raccordements de l’évier et des appareils de cuisine",
              "Évaluation des canalisations et raccords existants",
              "Essais de l’installation",
            ],
          },
          {
            title: "Pourquoi l’agencement vient d’abord",
            paragraphs: [
              "Déplacer des appareils ou équipements après les finitions peut obliger à déplacer les tuyaux et à ouvrir les surfaces terminées. Définir leurs positions tôt aide à éviter ces travaux supplémentaires.",
            ],
          },
          {
            title: "Facteurs de coût",
            paragraphs: [
              "Le nombre de raccordements, les tracés des tuyaux, l’état du réseau, la démolition et les équipements choisis influencent le coût.",
            ],
          },
        ],
        faqs: [
          {
            question: "Quand réalise-t-on la plomberie ?",
            answer:
              "Les canalisations sont généralement installées au début de la rénovation, avant les finitions définitives des murs et des sols.",
          },
          {
            question:
              "Peut-on déplacer les raccordements de cuisine ou de salle de bains ?",
            answer:
              "Cela dépend du réseau existant et des conditions techniques.",
          },
          {
            question: "Puis-je demander uniquement des travaux de plomberie ?",
            answer:
              "Nous réalisons uniquement des rénovations complètes. La plomberie est faite dans ce cadre, par une seule équipe.",
          },
        ],
        calculatorLabel: "Discuter de votre rénovation",
        contactLabel: "Discuter de votre rénovation",
        relatedTitle: "Services associés",
      },
    },
  },
  {
    slug: "electrical-work-yerevan",
    kind: "service",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85",
    relatedServiceSlugs: ["renovation", "commercial-construction"],
    relatedLandingSlugs: [
      "capital-renovation-yerevan",
      "apartment-interior-design-yerevan",
      "office-renovation-yerevan",
    ],
    translations: {
      hy: {
        eyebrow: "Էլեկտրական աշխատանքներ · Երևան",
        title: "Էլեկտրական աշխատանքներ Երևանում",
        description:
          "Վերանորոգման կամ շինարարության ընթացքում պլանավորում ենք վարդակներն ու լուսավորությունը, անցկացնում մալուխները և պատրաստում սարքավորումների միացումները։",
        note: "Կատարում ենք բնակարանի համալիր վերանորոգման շրջանակում։",
        seoTitle: "Էլեկտրական աշխատանքներ Երևանում | SHINEX",
        seoDescription:
          "Էլեկտրական աշխատանքներ Երևանում բնակարանի, տան և գրասենյակի համար՝ վարդակներ, լուսավորություն, սարքավորումների ու ցանցի կետերի պլանավորում։",
        introduction: [
          "Էլեկտրական աշխատանքները պլանավորելիս նախ պարզում ենք՝ որտեղ են լինելու կահույքը, տեխնիկան ու աշխատատեղերը, և ինչպես է օգտագործվելու յուրաքանչյուր սենյակը։",
          "Մինչ պատերի հարդարումը որոշում ենք վարդակների, անջատիչների ու լուսատուների տեղերը և գնահատում սարքավորումների պահանջվող հզորությունը։",
        ],
        sections: [
          {
            title: "Էլեկտրական աշխատանքների պլան",
            paragraphs: [
              "Աշխատանքների կազմը որոշում ենք՝ հաշվի առնելով տարածքի նախագիծը, սարքավորումները և անվտանգության պահանջները։",
            ],
            items: [
              "Լուսավորության սցենարների քննարկում",
              "Վարդակների և անջատիչների տեղաբաշխում",
              "Խոշոր կենցաղային տեխնիկայի միացումներ",
              "Աշխատատեղերի և ցանցային սարքավորումների միացումներ",
              "Մալուխային ուղիների կազմակերպում",
              "Սարքավորումների միացման համար նախապատրաստում",
            ],
          },
          {
            title: "Ինչո՞ւ է դիզայնը կապված էլեկտրիկայի հետ",
            paragraphs: [
              "Կահույքի, խոհանոցի, աշխատատեղերի ու լուսավորության վերջնական դասավորությունը որոշում է, թե որտեղ են անհրաժեշտ կետերը։",
            ],
          },
          {
            title: "Հաշվարկի հիմքը",
            paragraphs: [
              "Արժեքը կախված է վարդակների ու միացումների քանակից, մալուխների երկարությունից, էլեկտրական վահանակի աշխատանքներից, պատերի վիճակից և տեղադրման բարդությունից։",
            ],
          },
        ],
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
        calculatorLabel: "Կապվել մեզ հետ",
        contactLabel: "Կապվել մեզ հետ",
        relatedTitle: "Կապված ծառայություններ",
      },
      ru: {
        eyebrow: "Электрические работы · Ереван",
        title: "Электрические работы в Ереване",
        description:
          "Электрические работы в Ереване при ремонте и строительстве: планирование точек, прокладка кабеля и подготовка для оборудования.",
        note: "Выполняем в составе комплексного ремонта квартиры.",
        seoTitle: "Электрические работы в Ереване | SHINEX",
        seoDescription:
          "Электрические работы в Ереване для квартиры, дома и офиса: розетки, освещение, точки техники и сети.",
        introduction: [
          "Качество электрики начинается не только с прокладки кабеля, но и с плана использования пространства.",
          "До закрытия стен уточняем свет, розетки, технику, рабочие зоны и требуемую мощность.",
        ],
        sections: [
          {
            title: "План электрических работ",
            paragraphs: [
              "Состав согласуется с проектом, оборудованием и требованиями безопасности.",
            ],
            items: [
              "Сценарии освещения",
              "Розетки и выключатели",
              "Точки крупной техники",
              "Рабочие и сетевые точки",
              "Кабельные трассы",
              "Подготовка подключений",
            ],
          },
          {
            title: "Почему дизайн связан с электрикой",
            paragraphs: [
              "Итоговая расстановка мебели, кухни, рабочих мест и света определяет нужные точки.",
            ],
          },
          {
            title: "Основа расчёта",
            paragraphs: [
              "Цена зависит от числа точек, длины трасс, решений по щиту, состояния стен и сложности.",
            ],
          },
        ],
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
        calculatorLabel: "Обсудить ремонт",
        contactLabel: "Обсудить ремонт",
        relatedTitle: "Связанные услуги",
      },
      en: {
        eyebrow: "Electrical work · Yerevan",
        title: "Electrical work in Yerevan",
        description:
          "Electrical installation during renovation or construction: plan sockets and lighting, route cables and prepare connections for appliances.",
        note: "We carry out this work as part of a complete apartment renovation.",
        seoTitle: "Electrical Work in Yerevan | SHINEX",
        seoDescription:
          "Electrical installation in Yerevan: sockets, lighting, wiring and appliance connections planned around your renovation or construction project.",
        introduction: [
          "Electrical planning starts with the furniture, appliances and activities in each room.",
          "Before wall finishes are applied, we agree socket, switch and light positions and assess the power required by the equipment.",
        ],
        sections: [
          {
            title: "Electrical work plan",
            paragraphs: [
              "The scope is agreed around the design, equipment and safety requirements.",
            ],
            items: [
              "Lighting for different rooms and activities",
              "Socket and switch locations",
              "Connections for major appliances",
              "Workstation and network connections",
              "Cable routes",
              "Preparation for equipment connections",
            ],
          },
          {
            title: "Why design affects electrics",
            paragraphs: [
              "Furniture, kitchen units and workstations determine where sockets, switches, lights and equipment connections will be needed.",
            ],
          },
          {
            title: "Estimate basis",
            paragraphs: [
              "Cost depends on the number of outlets and connections, route length, distribution board requirements, wall condition and complexity.",
            ],
          },
        ],
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
        calculatorLabel: "Discuss your renovation",
        contactLabel: "Discuss your renovation",
        relatedTitle: "Related services",
      },
      de: {
        eyebrow: "Elektroarbeiten · Eriwan",
        title: "Elektroarbeiten in Eriwan",
        description:
          "Elektroinstallation bei Renovierung oder Bau: Steckdosen und Beleuchtung planen, Kabel verlegen und Geräteanschlüsse vorbereiten.",
        note: "Wir führen diese Arbeiten im Rahmen einer Komplettrenovierung der Wohnung aus.",
        seoTitle: "Elektroarbeiten in Eriwan | SHINEX",
        seoDescription:
          "Elektroinstallation in Eriwan: Steckdosen, Beleuchtung, Verkabelung und Geräteanschlüsse passend zu Ihrem Renovierungs- oder Bauprojekt.",
        introduction: [
          "Die Elektroplanung beginnt mit Möbeln, Geräten und den Tätigkeiten in jedem Raum.",
          "Vor dem Wandfinish stimmen wir Steckdosen, Schalter und Leuchten ab und prüfen den Leistungsbedarf der Geräte.",
        ],
        sections: [
          {
            title: "Elektroplanung",
            paragraphs: [
              "Der Umfang wird anhand von Planung, Geräten und Sicherheitsanforderungen vereinbart.",
            ],
            items: [
              "Beleuchtung für verschiedene Räume und Tätigkeiten",
              "Positionen von Steckdosen und Schaltern",
              "Anschlüsse für Großgeräte",
              "Arbeitsplatz- und Netzwerkanschlüsse",
              "Kabelwege",
              "Vorbereitung von Geräteanschlüssen",
            ],
          },
          {
            title: "Warum die Gestaltung die Elektroinstallation beeinflusst",
            paragraphs: [
              "Möbel, Küchenzeilen und Arbeitsplätze bestimmen, wo Steckdosen, Schalter, Leuchten und Geräteanschlüsse benötigt werden.",
            ],
          },
          {
            title: "Grundlage der Kostenschätzung",
            paragraphs: [
              "Die Kosten hängen von Anschlussanzahl, Leitungslängen, Verteileranforderungen, Wandzustand und Komplexität ab.",
            ],
          },
        ],
        faqs: [
          {
            question: "Wann sollten Steckdosen und Beleuchtung geplant werden?",
            answer:
              "Zu Beginn der Renovierung, zusammen mit dem Möbel- und Geräteplan.",
          },
          {
            question: "Kann eine alte Elektroanlage ersetzt werden?",
            answer:
              "Der Umfang ergibt sich aus der Prüfung der bestehenden Anlage und der erforderlichen Leistung.",
          },
          {
            question: "Ist die Montage der Leuchten enthalten?",
            answer:
              "Der genaue Umfang wird anhand des Projekts und der gewählten Ausstattung vereinbart.",
          },
        ],
        calculatorLabel: "Renovierung besprechen",
        contactLabel: "Renovierung besprechen",
        relatedTitle: "Passende Leistungen",
      },
      fr: {
        eyebrow: "Électricité · Erevan",
        title: "Travaux électriques à Erevan",
        description:
          "Installation électrique pendant une rénovation ou une construction : prévoir les prises et éclairages, poser les câbles et préparer les raccordements des appareils.",
        note: "Nous réalisons ces travaux dans le cadre d’une rénovation complète de l’appartement.",
        seoTitle: "Travaux électriques à Erevan | SHINEX",
        seoDescription:
          "Installation électrique à Erevan : prises, éclairage, câblage et raccordements prévus selon votre projet de rénovation ou de construction.",
        introduction: [
          "La conception électrique commence par le mobilier, les appareils et les usages de chaque pièce.",
          "Avant les finitions murales, nous convenons des emplacements des prises, interrupteurs et luminaires et évaluons la puissance nécessaire aux équipements.",
        ],
        sections: [
          {
            title: "Plan des travaux électriques",
            paragraphs: [
              "Le périmètre est convenu selon le projet, les équipements et les exigences de sécurité.",
            ],
            items: [
              "Éclairage selon les pièces et les activités",
              "Emplacements des prises et interrupteurs",
              "Raccordements des gros appareils",
              "Connexions des postes de travail et du réseau",
              "Cheminements des câbles",
              "Préparation des raccordements d’équipements",
            ],
          },
          {
            title: "Pourquoi l’agencement influence l’électricité",
            paragraphs: [
              "Le mobilier, les meubles de cuisine et les postes de travail déterminent où les prises, interrupteurs, luminaires et raccordements seront nécessaires.",
            ],
          },
          {
            title: "Base du devis",
            paragraphs: [
              "Le coût dépend du nombre de prises et raccordements, de la longueur des tracés, des besoins du tableau électrique, de l’état des murs et de la complexité.",
            ],
          },
        ],
        faqs: [
          {
            question: "Quand prévoir les prises et l’éclairage ?",
            answer:
              "Au début de la rénovation, avec le plan du mobilier et des appareils.",
          },
          {
            question:
              "Peut-on remplacer une ancienne installation électrique ?",
            answer:
              "Le périmètre suit l’évaluation de l’installation existante et de la puissance nécessaire.",
          },
          {
            question: "Les travaux comprennent-ils la pose des luminaires ?",
            answer:
              "Le périmètre exact est convenu selon le projet et les équipements choisis.",
          },
        ],
        calculatorLabel: "Discuter de votre rénovation",
        contactLabel: "Discuter de votre rénovation",
        relatedTitle: "Services associés",
      },
    },
  },
  {
    slug: "how-to-choose-construction-company",
    contentUpdatedAt: "2026-11-28",
    kind: "guide",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1800&q=85",
    relatedServiceSlugs: ["house-construction"],
    relatedLandingSlugs: ["apartment-renovation-yerevan"],
    translations: {
      hy: {
        eyebrow: "Ուղեցույց պատվիրատուի համար",
        title:
          "Ինչպես ընտրել շինարարական ընկերություն Հայաստանում․ ստուգաթերթ մինչև պայմանագիրը",
        description:
          "9 կետ, որոնք արժե ստուգել մինչև տան կառուցման կամ վերանորոգման պայմանագիր կնքելը․ պայմանագիր և գին, նախահաշիվ, վճարում, երաշխիք, թիմ, հաշվետվություններ, նյութեր և փաստաթղթեր։",
        seoTitle: "Ինչպես ընտրել շինարարական ընկերություն Հայաստանում | SHINEX",
        seoDescription:
          "Ինչ ստուգել մինչև շինարարական ընկերության հետ պայմանագիր կնքելը․ ֆիքսված գին, մանրամասն նախահաշիվ, վճարում ըստ փուլերի, երաշխիք, սեփական թիմ և հաշվետվություններ։",
        introduction: [
          "Շինարարական ընկերությունն ավելի ճիշտ է ընտրել ոչ թե գովազդով կամ ամենացածր գնով, այլ նրանով, թե ինչ է այն պատրաստ գրել պայմանագրում։ Գրավոր ամրագրված պայմանները կարելի է ստուգել և պահանջել դրանց կատարումը, իսկ բանավոր խոստումները՝ ոչ։",
          "Ստորև 9 կետից բաղկացած ստուգաթերթ է, որը հարմար է և՛ առանձնատան կառուցման, և՛ բնակարանի կամ կոմերցիոն տարածքի վերանորոգման համար։ Անցեք այն յուրաքանչյուր կապալառուի հետ մինչև պայմանագիր կնքելը և առաջին վճարումը։",
        ],
        sections: [
          {
            title: "Ստուգաթերթ․ ինչ ստուգել մինչև պայմանագիր կնքելը",
            paragraphs: [
              "Եթե որևէ կետի վերաբերյալ կապալառուն հստակ պատասխան չի տալիս կամ հրաժարվում է այն գրել պայմանագրում, դա լրացուցիչ հարցեր տալու կամ այլ ընկերություն դիտարկելու առիթ է։",
            ],
            items: [
              "Պայմանագիր՝ աշխատանքների ծավալով և գնով։ Պայմանագրում պետք է լինեն աշխատանքների ցանկը, ընդհանուր գումարը և այն պայմանը, որի դեպքում գումարը կարող է փոխվել։ Լավ է, երբ գինը ֆիքսված է և փոխվում է միայն ծավալը փոխելու դեպքում՝ գրավոր։",
              "Մանրամասն նախահաշիվ։ Յուրաքանչյուր աշխատանք նշված է առանձին տողով՝ ծավալով, չափման միավորով և գնով։ Նյութերը՝ առանձին կամ հստակ նշումով, թե ինչ և ինչ քանակով է ներառված։ Միայն ընդհանուր գումարով առաջարկները համեմատել հնարավոր չէ։",
              "Վճարում ըստ փուլերի։ Յուրաքանչյուր փուլի համար վճարեք այն կատարելուց և ընդունելուց հետո, ցանկալի է՝ ստորագրված ակտով։ Մեծ կանխավճարը մինչև աշխատանքների սկիզբը ամբողջ ռիսկը տեղափոխում է ձեզ վրա։",
              "Գրավոր երաշխիք։ Երաշխիքի ժամկետը, թե որ աշխատանքների վրա է այն տարածվում և ինչպես է ներկայացվում պահանջը, պետք է գրված լինեն պայմանագրում, ոչ թե միայն ասված հանդիպման ժամանակ։",
              "Ով է կատարում աշխատանքները։ Ճշտեք՝ ընկերությունն ունի՞ սեփական բրիգադ, թե օբյեկտը փոխանցվում է ենթակապալառուներին։ Հարցրեք, թե կոնկրետ ով է պատասխանատու օբյեկտի համար և ում հետ եք կապ պահելու։",
              "Պարբերական հաշվետվություններ։ Պայմանավորվեք, թե որքան հաճախ և ինչ ձևով եք տեղեկություն ստանալու աշխատանքների ընթացքի մասին՝ լուսանկարներ, տեսանյութեր, կատարված փուլի կարճ նկարագրություն։ Դա հատկապես կարևոր է, եթե չեք կարող հաճախ լինել օբյեկտում։",
              "Նյութեր և մատակարարման ժամկետներ։ Պետք է պարզ լինի, թե ով է գնում նյութերը, երբ դրանք պետք է լինեն օբյեկտում և ինչպես է մատակարարման ուշացումն ազդում աշխատանքների ժամանակացույցի վրա։",
              "Տան կառուցման դեպքում՝ նախագիծ և թույլտվության փաստաթղթեր։ Ճշտեք՝ կա՞ նախագիծ, ով է այն պատրաստում և ով է ձևակերպում թույլտվության փաստաթղթերը։ Առանց համաձայնեցված նախագծի շինարարություն սկսելը ռիսկային է։",
              "Ընթացիկ օբյեկտ։ Խնդրեք ցույց տալ օբյեկտ, որտեղ ընկերությունը հիմա է աշխատում․ այնտեղ երևում է, թե ինչպես է կազմակերպված աշխատանքային տարածքը, ինչպես են ընթանում աշխատանքները և ով է դրանք ղեկավարում։",
            ],
          },
          {
            title: "Ինչպես է դա կազմակերպված SHINEX-ում",
            paragraphs: [
              "SHINEX-ը երիտասարդ շինարարական ընկերություն է, բայց մեր թիմը շինարարության և վերանորոգման ոլորտում աշխատում է ավելի քան 10 տարի։ Այդ պատճառով այն պայմանները, որոնք սովորաբար պետք է ճշտել, մենք ինքներս ենք գրում պայմանագրում․ դրանք նույնն են յուրաքանչյուր հաճախորդի համար։",
            ],
            items: [
              "Գինն ամրագրվում է պայմանագրում։ Գումարը փոխվում է միայն այն դեպքում, երբ դուք եք փոխում աշխատանքների ծավալը, և միայն գրավոր։",
              "Վճարում ըստ փուլերի՝ առանց կանխավճարի․ վճարում եք արդեն կատարված աշխատանքի համար։",
              "Երաշխիք՝ 12 ամիս մեր կատարած բոլոր աշխատանքների համար։",
              "Սեփական թիմը՝ 10+ տարվա փորձով, վարում է օբյեկտը սկզբից մինչև հանձնում, առանց պատահական կապալառուների։",
              "Ամեն շաբաթ ուղարկում ենք օբյեկտի լուսանկարներ և տեսանյութեր։",
              "Երևանում գալիս ենք օբյեկտ դիմելուց հաջորդ օրը։ Այցն անվճար է։",
              "Աշխատանքային ժամերին WhatsApp-ով պատասխանում ենք 15 րոպեի ընթացքում։",
            ],
          },
        ],
        faqs: [
          {
            question:
              "Ինչի՞ն նայել առաջին հերթին շինարարական ընկերություն ընտրելիս",
            answer:
              "Պայմանագրին․ դրանում պետք է լինեն աշխատանքների ծավալը, գինը և դրա փոփոխման պայմանը, ըստ փուլերի վճարման կարգը և երաշխիքը։ Եթե ընկերությունը պատրաստ է այդ պայմանները գրել, ստուգաթերթի մյուս կետերը ստուգելն ավելի հեշտ է։",
          },
          {
            question: "Նորմա՞լ է մեծ կանխավճար տալը",
            answer:
              "Մեծ կանխավճարը մինչև աշխատանքների սկիզբը նշանակում է, որ ռիսկը մնում է պատվիրատուի վրա։ Ավելի ապահով է վճարել յուրաքանչյուր փուլի համար՝ այն կատարելուց և ընդունելուց հետո։ SHINEX-ում կանխավճար չկա․ վճարում եք ըստ փուլերի՝ արդեն կատարված աշխատանքների համար։",
          },
          {
            question: "Ինչպե՞ս համեմատել տարբեր կապալառուների նախահաշիվները",
            answer:
              "Համեմատեք աշխատանքների նույն ցանկը՝ յուրաքանչյուր տողի ծավալները, չափման միավորները և գները։ Ստուգեք՝ ներառվա՞ծ են նյութերը, ապամոնտաժը, առաքումը և շինարարական աղբի դուրսբերումը։ Առանց մանրամասնության ընդհանուր գումարը ոչինչ չի ասում այն մասին, թե ինչ է ներառված։",
          },
          {
            question: "Ինչպե՞ս ընտրել, եթե ընկերությունը երիտասարդ է",
            answer:
              "Հենվեք այն բանի վրա, ինչը կարելի է ստուգել՝ պայմանագրի պայմանները, նախահաշիվը, վճարման կարգը և երաշխիքը, ինչպես նաև օբյեկտում աշխատող մարդկանց փորձը։ SHINEX-ը երիտասարդ ընկերություն է, որի թիմն աշխատում է ավելի քան 10 տարի, ուստի աշխատում ենք առանց կանխավճարի, գինն ամրագրում ենք պայմանագրում և ամեն շաբաթ ուղարկում ենք օբյեկտի լուսանկարներ ու տեսանյութեր։",
          },
          {
            question: "Ի՞նչ փաստաթղթեր են պետք առանձնատուն կառուցելու համար",
            answer:
              "Սովորաբար անհրաժեշտ են տան նախագիծը և շինարարության թույլտվության փաստաթղթերը։ Դրանց կազմը կախված է հողամասից և օբյեկտից, ուստի մինչև աշխատանքների սկիզբը ճշտեք, թե ով է պատրաստում նախագիծը և ով է ձևակերպում փաստաթղթերը։",
          },
        ],
        calculatorLabel: "Քննարկել ձեր օբյեկտը",
        contactLabel: "Քննարկել ձեր օբյեկտը",
        relatedTitle: "Ծառայություններ և գներ",
      },
      ru: {
        eyebrow: "Гид для заказчика",
        title:
          "Как выбрать строительную компанию в Армении: чек-лист перед договором",
        description:
          "9 пунктов, которые стоит проверить до подписания договора на строительство дома или ремонт: договор и цена, смета, оплата, гарантия, команда, отчёты, материалы и документы.",
        seoTitle:
          "Как выбрать строительную компанию в Армении: чек-лист | SHINEX",
        seoDescription:
          "Что проверить до договора со строительной компанией в Армении: фиксированная цена, подробная смета, оплата по этапам, гарантия, своя бригада, отчёты и документы.",
        introduction: [
          "Строительную компанию лучше выбирать не по рекламе и не по самой низкой цене, а по тому, что она готова записать в договор. Условия, зафиксированные письменно, можно проверить и потребовать их выполнения; устные обещания — нельзя.",
          "Ниже — чек-лист из 9 пунктов. Он подходит и для строительства частного дома, и для ремонта квартиры или коммерческого помещения. Пройдите его с каждым подрядчиком до подписания договора и до первой оплаты.",
        ],
        sections: [
          {
            title: "Чек-лист: что проверить до подписания договора",
            paragraphs: [
              "Если по какому-то пункту подрядчик не даёт ясного ответа или отказывается записать его в договор, это повод задать дополнительные вопросы или рассмотреть другую компанию.",
            ],
            items: [
              "Договор с объёмом работ и ценой. В договоре должны быть перечень работ, итоговая сумма и условие, при котором она может измениться. Хорошо, если цена фиксирована и меняется только письменно при изменении объёма.",
              "Подробная смета. Каждая работа указана отдельной строкой с объёмом, единицей измерения и ценой. Материалы — отдельно или с понятным указанием, что и в каком количестве входит. Предложения, где есть только общая сумма, сравнить нельзя.",
              "Оплата по этапам. Платите за каждый этап после того, как он выполнен и принят вами, лучше по подписанному акту. Большая предоплата до начала работ переносит весь риск на вас.",
              "Письменная гарантия. Срок гарантии, на какие работы она распространяется и как подать претензию, должны быть записаны в договоре, а не только сказаны на встрече.",
              "Кто выполняет работы. Уточните, есть ли у компании своя бригада или объект передают субподрядчикам. Спросите, кто конкретно отвечает за объект и с кем вы будете на связи.",
              "Регулярные отчёты. Договоритесь, как часто и в каком виде вы будете получать информацию о ходе работ: фото, видео, короткое описание выполненного этапа. Это особенно важно, если вы не можете часто бывать на объекте.",
              "Материалы и сроки поставки. Должно быть понятно, кто закупает материалы, когда они должны быть на объекте и как задержка поставки влияет на график работ.",
              "Для строительства дома — проект и разрешительные документы. Уточните, есть ли проект, кто его готовит и кто оформляет разрешительные документы. Начинать стройку без согласованного проекта рискованно.",
              "Текущий объект. Попросите показать объект, на котором компания работает сейчас: по нему видно, как организована площадка, как идут работы и кто ими руководит.",
            ],
          },
          {
            title: "Как это устроено в SHINEX",
            paragraphs: [
              "SHINEX — молодая строительная компания, но наша команда работает в строительстве и ремонте больше 10 лет. Поэтому условия, которые обычно приходится выяснять, мы сами записываем в договор — они одинаковы для каждого клиента.",
            ],
            items: [
              "Цена фиксируется в договоре. Сумма меняется, только если вы меняете объём работ, и только письменно.",
              "Оплата по этапам без аванса: вы платите за то, что уже сделано.",
              "Гарантия 12 месяцев на все выполненные нами работы.",
              "Своя команда с опытом 10+ лет ведёт объект от начала до сдачи, без случайных подрядчиков.",
              "Каждую неделю присылаем фото и видео с объекта.",
              "В Ереване приезжаем на объект на следующий день после обращения. Выезд бесплатный.",
              "В рабочее время отвечаем в WhatsApp в течение 15 минут.",
            ],
          },
        ],
        faqs: [
          {
            question:
              "На что смотреть в первую очередь при выборе строительной компании?",
            answer:
              "На договор: в нём должны быть объём работ, цена и условие её изменения, порядок оплаты по этапам и гарантия. Если компания готова записать эти условия письменно, остальные пункты чек-листа проверить проще.",
          },
          {
            question: "Нормально ли вносить большую предоплату?",
            answer:
              "Большая предоплата до начала работ означает, что риск остаётся на заказчике. Безопаснее оплачивать каждый этап после его выполнения и приёмки. В SHINEX аванса нет: вы платите по этапам за уже выполненные работы.",
          },
          {
            question: "Как сравнить сметы разных подрядчиков?",
            answer:
              "Сравнивайте одинаковый перечень работ: объёмы, единицы измерения и цены по каждой строке. Проверьте, входят ли материалы, демонтаж, доставка и вывоз строительного мусора. Итоговая сумма без расшифровки ничего не говорит о том, что в неё вошло.",
          },
          {
            question: "Как выбирать, если компания молодая?",
            answer:
              "Опирайтесь на то, что можно проверить: условия договора, смету, порядок оплаты и гарантию, а также опыт людей, которые будут работать на объекте. SHINEX — молодая компания с командой, которая работает больше 10 лет, поэтому мы работаем без аванса, фиксируем цену в договоре и каждую неделю присылаем фото и видео с объекта.",
          },
          {
            question: "Какие документы нужны для строительства частного дома?",
            answer:
              "Как правило, нужны проект дома и разрешительные документы на строительство. Их состав зависит от участка и объекта, поэтому до начала работ уточните, кто готовит проект и кто оформляет документы.",
          },
        ],
        calculatorLabel: "Обсудить ваш объект",
        contactLabel: "Обсудить ваш объект",
        relatedTitle: "Услуги и цены",
      },
      en: {
        eyebrow: "Client guide",
        title:
          "How to choose a construction company in Armenia: a pre-contract checklist",
        description:
          "Nine things to check before you sign a contract for building a house or a renovation: contract and price, estimate, payments, warranty, team, reports, materials and documents.",
        seoTitle: "How to Choose a Construction Company in Armenia | SHINEX",
        seoDescription:
          "What to check before signing with a construction company in Armenia: fixed price, detailed estimate, staged payments, warranty, own crew, reports and permits.",
        introduction: [
          "Choose a construction company not by its advertising or the lowest price, but by what it is willing to put in the contract. Terms that are written down can be checked and enforced; verbal promises cannot.",
          "Below is a nine-point checklist. It works for building a private house as well as for renovating an apartment or a commercial space. Go through it with every contractor before you sign the contract and make the first payment.",
        ],
        sections: [
          {
            title: "Checklist: what to verify before signing the contract",
            paragraphs: [
              "If a contractor gives no clear answer on a point or refuses to put it in the contract, that is a reason to ask more questions or to consider another company.",
            ],
            items: [
              "A contract with the scope of work and the price. The contract should list the works, the total amount and the conditions under which it may change. Ideally, the price is fixed and changes only in writing when the scope changes.",
              "A detailed estimate. Each work item is a separate line with its quantity, unit of measurement and price. Materials are listed separately or with a clear note of what is included and in what quantity. Offers that show only a total cannot be compared.",
              "Staged payments. Pay for each stage after it is completed and you have accepted it, preferably against a signed acceptance certificate. A large prepayment before work starts shifts all the risk to you.",
              "A written warranty. The warranty period, the works it covers and how to file a claim should be written in the contract, not only mentioned at a meeting.",
              "Who does the work. Ask whether the company has its own crew or passes the project to subcontractors. Find out who exactly is responsible for the site and who your contact person will be.",
              "Regular reports. Agree how often and in what form you will hear about progress: photos, videos, a short description of the completed stage. This matters most if you cannot visit the site often.",
              "Materials and delivery times. It should be clear who buys the materials, when they must be on site and how a delivery delay affects the work schedule.",
              "For a house: the design and permit documents. Ask whether there is a design, who prepares it and who handles the permit documents. Starting construction without an approved design is risky.",
              "A current project. Ask to see a site the company is working on now: it shows how the site is organised, how the work is going and who is in charge.",
            ],
          },
          {
            title: "How it works at SHINEX",
            paragraphs: [
              "SHINEX is a young construction company, but our team has worked in construction and renovation for more than 10 years. That is why we write into the contract ourselves the terms you would otherwise have to ask about. They are the same for every client.",
            ],
            items: [
              "The price is fixed in the contract. It changes only if you change the scope of work, and only in writing.",
              "Staged payments with no advance: you pay for what has already been done.",
              "A 12-month warranty on all work we have carried out.",
              "Our own team with 10+ years of experience runs the project from start to handover, with no random subcontractors.",
              "Every week we send photos and videos from the site.",
              "In Yerevan we visit your property the day after you contact us. The visit is free.",
              "During working hours we reply on WhatsApp within 15 minutes.",
            ],
          },
        ],
        faqs: [
          {
            question:
              "What should I check first when choosing a construction company?",
            answer:
              "The contract: it should state the scope of work, the price and how it can change, the staged payment terms and the warranty. If a company is willing to put these terms in writing, the rest of the checklist is easier to verify.",
          },
          {
            question: "Is it normal to pay a large prepayment?",
            answer:
              "A large prepayment before work starts leaves the risk with the client. It is safer to pay for each stage after it is completed and accepted. SHINEX takes no advance: you pay in stages for work that has already been done.",
          },
          {
            question: "How do I compare estimates from different contractors?",
            answer:
              "Compare the same list of works: quantities, units and prices line by line. Check whether materials, demolition, delivery and removal of construction waste are included. A total without a breakdown tells you nothing about what it covers.",
          },
          {
            question: "How do I choose if the company is young?",
            answer:
              "Rely on what you can verify: the contract terms, the estimate, the payment schedule and the warranty, as well as the experience of the people who will work on site. SHINEX is a young company whose team has more than 10 years of experience, so we work without an advance, fix the price in the contract and send photos and videos from the site every week.",
          },
          {
            question: "What documents are needed to build a private house?",
            answer:
              "As a rule, you need a house design and permit documents for construction. What exactly is required depends on the plot and the building, so before work starts, clarify who prepares the design and who handles the documents.",
          },
        ],
        calculatorLabel: "Discuss your project",
        contactLabel: "Discuss your project",
        relatedTitle: "Services and prices",
      },
      de: {
        eyebrow: "Ratgeber für Bauherren",
        title:
          "So wählen Sie eine Baufirma in Armenien: Checkliste vor dem Vertrag",
        description:
          "Neun Punkte, die Sie vor einem Vertrag über Hausbau oder Renovierung prüfen sollten: Vertrag und Preis, Kostenvoranschlag, Zahlung, Garantie, Team, Berichte, Material und Unterlagen.",
        seoTitle: "Baufirma in Armenien wählen: Checkliste | SHINEX",
        seoDescription:
          "Was Sie vor dem Vertrag mit einer Baufirma in Armenien prüfen sollten: Festpreis, detaillierter Kostenvoranschlag, Zahlung in Etappen, Garantie, eigenes Team und Berichte.",
        introduction: [
          "Wählen Sie eine Baufirma nicht nach Werbung oder dem niedrigsten Preis, sondern danach, was sie bereit ist, in den Vertrag zu schreiben. Schriftlich festgehaltene Bedingungen lassen sich prüfen und einfordern, mündliche Zusagen nicht.",
          "Unten finden Sie eine Checkliste mit neun Punkten. Sie passt für den Bau eines Einfamilienhauses ebenso wie für die Renovierung einer Wohnung oder einer Gewerbefläche. Gehen Sie sie mit jedem Auftragnehmer durch, bevor Sie den Vertrag unterschreiben und die erste Zahlung leisten.",
        ],
        sections: [
          {
            title: "Checkliste: Was Sie vor der Vertragsunterzeichnung prüfen",
            paragraphs: [
              "Wenn ein Auftragnehmer zu einem Punkt keine klare Antwort gibt oder ihn nicht in den Vertrag aufnehmen will, ist das ein Anlass für weitere Fragen oder für den Vergleich mit einer anderen Firma.",
            ],
            items: [
              "Vertrag mit Leistungsumfang und Preis. Der Vertrag sollte die Arbeiten, den Gesamtbetrag und die Bedingungen enthalten, unter denen er sich ändern kann. Am besten ist ein Festpreis, der sich nur bei geändertem Umfang und nur schriftlich ändert.",
              "Detaillierter Kostenvoranschlag. Jede Arbeit steht in einer eigenen Zeile mit Menge, Einheit und Preis. Material ist separat aufgeführt oder klar beschrieben: was in welcher Menge enthalten ist. Angebote mit nur einer Gesamtsumme lassen sich nicht vergleichen.",
              "Zahlung in Etappen. Zahlen Sie jede Etappe, nachdem sie ausgeführt und von Ihnen abgenommen wurde, am besten gegen ein unterschriebenes Abnahmeprotokoll. Eine hohe Vorauszahlung vor Arbeitsbeginn verlagert das ganze Risiko auf Sie.",
              "Schriftliche Garantie. Garantiedauer, erfasste Arbeiten und der Weg zur Reklamation gehören in den Vertrag, nicht nur ins Gespräch.",
              "Wer die Arbeiten ausführt. Fragen Sie, ob die Firma ein eigenes Team hat oder das Objekt an Subunternehmer weitergibt. Klären Sie, wer konkret für das Objekt verantwortlich ist und wer Ihr Ansprechpartner ist.",
              "Regelmäßige Berichte. Vereinbaren Sie, wie oft und in welcher Form Sie über den Fortschritt informiert werden: Fotos, Videos, eine kurze Beschreibung der fertigen Etappe. Das ist besonders wichtig, wenn Sie nicht oft vor Ort sein können.",
              "Material und Lieferzeiten. Es sollte klar sein, wer das Material kauft, wann es auf der Baustelle sein muss und wie sich eine Lieferverzögerung auf den Zeitplan auswirkt.",
              "Beim Hausbau: Planung und Genehmigungsunterlagen. Fragen Sie, ob es eine Planung gibt, wer sie erstellt und wer die Genehmigungsunterlagen besorgt. Ohne abgestimmte Planung mit dem Bau zu beginnen, ist riskant.",
              "Ein laufendes Objekt. Bitten Sie darum, eine aktuelle Baustelle der Firma zu sehen: Dort erkennen Sie, wie die Baustelle organisiert ist, wie die Arbeiten laufen und wer sie leitet.",
            ],
          },
          {
            title: "So arbeitet SHINEX",
            paragraphs: [
              "SHINEX ist eine junge Baufirma, aber unser Team arbeitet seit mehr als 10 Jahren im Bau und in der Renovierung. Deshalb schreiben wir die Bedingungen, nach denen Sie sonst fragen müssten, selbst in den Vertrag. Sie gelten für jeden Kunden gleich.",
            ],
            items: [
              "Der Preis wird im Vertrag festgeschrieben. Er ändert sich nur, wenn Sie den Leistungsumfang ändern, und nur schriftlich.",
              "Zahlung in Etappen ohne Vorauszahlung: Sie zahlen für das, was bereits erledigt ist.",
              "12 Monate Garantie auf alle von uns ausgeführten Arbeiten.",
              "Unser eigenes Team mit über 10 Jahren Erfahrung betreut das Objekt vom Start bis zur Übergabe, ohne zufällige Subunternehmer.",
              "Jede Woche schicken wir Fotos und Videos von der Baustelle.",
              "In Jerewan kommen wir am Tag nach Ihrer Anfrage zu Ihrem Objekt. Der Termin ist kostenlos.",
              "Während der Arbeitszeit antworten wir per WhatsApp innerhalb von 15 Minuten.",
            ],
          },
        ],
        faqs: [
          {
            question:
              "Worauf sollte ich bei der Wahl einer Baufirma zuerst achten?",
            answer:
              "Auf den Vertrag: Er sollte Leistungsumfang, Preis und die Bedingungen für Preisänderungen, die Zahlung in Etappen und die Garantie enthalten. Wenn eine Firma diese Bedingungen schriftlich festhält, lassen sich die übrigen Punkte der Checkliste leichter prüfen.",
          },
          {
            question: "Ist eine hohe Vorauszahlung normal?",
            answer:
              "Eine hohe Vorauszahlung vor Arbeitsbeginn lässt das Risiko beim Auftraggeber. Sicherer ist es, jede Etappe nach Ausführung und Abnahme zu bezahlen. Bei SHINEX gibt es keine Vorauszahlung: Sie zahlen in Etappen für bereits ausgeführte Arbeiten.",
          },
          {
            question:
              "Wie vergleiche ich Kostenvoranschläge verschiedener Firmen?",
            answer:
              "Vergleichen Sie denselben Leistungsumfang: Mengen, Einheiten und Preise Zeile für Zeile. Prüfen Sie, ob Material, Abbruch, Lieferung und Entsorgung des Bauschutts enthalten sind. Eine Gesamtsumme ohne Aufschlüsselung sagt nichts darüber, was sie umfasst.",
          },
          {
            question: "Wie wähle ich, wenn die Firma noch jung ist?",
            answer:
              "Verlassen Sie sich auf das, was sich prüfen lässt: Vertragsbedingungen, Kostenvoranschlag, Zahlungsplan und Garantie sowie die Erfahrung der Menschen, die auf der Baustelle arbeiten. SHINEX ist eine junge Firma mit einem Team, das seit mehr als 10 Jahren arbeitet. Deshalb arbeiten wir ohne Vorauszahlung, schreiben den Preis im Vertrag fest und schicken jede Woche Fotos und Videos von der Baustelle.",
          },
          {
            question:
              "Welche Unterlagen braucht man für den Bau eines Einfamilienhauses?",
            answer:
              "In der Regel braucht man eine Hausplanung und Genehmigungsunterlagen für den Bau. Was genau erforderlich ist, hängt vom Grundstück und vom Gebäude ab. Klären Sie deshalb vor Baubeginn, wer die Planung erstellt und wer sich um die Unterlagen kümmert.",
          },
        ],
        calculatorLabel: "Ihr Vorhaben besprechen",
        contactLabel: "Ihr Vorhaben besprechen",
        relatedTitle: "Leistungen und Preise",
      },
      fr: {
        eyebrow: "Guide pour le client",
        title:
          "Comment choisir une entreprise de construction en Arménie : check-list avant le contrat",
        description:
          "Neuf points à vérifier avant de signer un contrat de construction de maison ou de rénovation : contrat et prix, devis, paiement, garantie, équipe, rapports, matériaux et documents.",
        seoTitle: "Choisir une entreprise de construction en Arménie | SHINEX",
        seoDescription:
          "Ce qu’il faut vérifier avant de signer avec une entreprise de construction en Arménie : prix fixe, devis détaillé, paiement par étapes, garantie, équipe propre, rapports.",
        introduction: [
          "Choisissez une entreprise de construction non pas sur sa publicité ou le prix le plus bas, mais sur ce qu’elle accepte d’écrire dans le contrat. Des conditions écrites peuvent être vérifiées et exigées ; des promesses orales, non.",
          "Voici une check-list en neuf points. Elle convient aussi bien à la construction d’une maison individuelle qu’à la rénovation d’un appartement ou d’un local professionnel. Parcourez-la avec chaque entreprise avant de signer le contrat et de faire le premier paiement.",
        ],
        sections: [
          {
            title: "Check-list : ce qu’il faut vérifier avant de signer",
            paragraphs: [
              "Si une entreprise ne répond pas clairement sur un point ou refuse de l’inscrire dans le contrat, c’est une raison de poser d’autres questions ou d’envisager une autre entreprise.",
            ],
            items: [
              "Un contrat avec le volume des travaux et le prix. Le contrat doit indiquer la liste des travaux, le montant total et les conditions dans lesquelles il peut changer. L’idéal : un prix fixe qui ne change que par écrit, en cas de modification du volume.",
              "Un devis détaillé. Chaque travail figure sur une ligne distincte avec sa quantité, son unité et son prix. Les matériaux sont indiqués à part ou avec une mention claire de ce qui est inclus et en quelle quantité. Des offres qui n’indiquent qu’un total ne se comparent pas.",
              "Un paiement par étapes. Payez chaque étape une fois réalisée et réceptionnée, de préférence sur procès-verbal signé. Un gros acompte avant le début des travaux vous fait porter tout le risque.",
              "Une garantie écrite. La durée de la garantie, les travaux couverts et la manière de faire une réclamation doivent figurer dans le contrat, pas seulement être évoqués en rendez-vous.",
              "Qui réalise les travaux. Demandez si l’entreprise a sa propre équipe ou confie le chantier à des sous-traitants. Vérifiez qui est responsable du chantier et qui sera votre interlocuteur.",
              "Des rapports réguliers. Convenez de la fréquence et de la forme des informations sur l’avancement : photos, vidéos, courte description de l’étape terminée. C’est essentiel si vous ne pouvez pas venir souvent sur place.",
              "Les matériaux et les délais de livraison. Il doit être clair qui achète les matériaux, quand ils doivent être sur le chantier et comment un retard de livraison affecte le planning.",
              "Pour une maison : le projet et les documents d’autorisation. Demandez s’il existe un projet, qui le prépare et qui s’occupe des documents d’autorisation. Commencer la construction sans projet validé est risqué.",
              "Un chantier en cours. Demandez à voir un chantier sur lequel l’entreprise travaille actuellement : on y voit comment il est organisé, comment avancent les travaux et qui les dirige.",
            ],
          },
          {
            title: "Comment cela fonctionne chez SHINEX",
            paragraphs: [
              "SHINEX est une jeune entreprise de construction, mais notre équipe travaille dans la construction et la rénovation depuis plus de 10 ans. C’est pourquoi nous inscrivons nous-mêmes dans le contrat les conditions qu’il faudrait sinon demander. Elles sont les mêmes pour chaque client.",
            ],
            items: [
              "Le prix est fixé dans le contrat. Il ne change que si vous modifiez le volume des travaux, et uniquement par écrit.",
              "Paiement par étapes, sans acompte : vous payez ce qui est déjà réalisé.",
              "Garantie de 12 mois sur tous les travaux que nous avons réalisés.",
              "Notre propre équipe, avec plus de 10 ans d’expérience, mène le chantier du début à la livraison, sans sous-traitants de passage.",
              "Chaque semaine, nous envoyons des photos et des vidéos du chantier.",
              "À Erevan, nous venons sur votre bien le lendemain de votre demande. La visite est gratuite.",
              "Pendant les heures d’ouverture, nous répondons sur WhatsApp en 15 minutes.",
            ],
          },
        ],
        faqs: [
          {
            question:
              "Que vérifier en premier pour choisir une entreprise de construction ?",
            answer:
              "Le contrat : il doit indiquer le volume des travaux, le prix et ses conditions de modification, le paiement par étapes et la garantie. Si l’entreprise accepte d’écrire ces conditions, les autres points de la check-list sont plus faciles à vérifier.",
          },
          {
            question: "Est-il normal de verser un gros acompte ?",
            answer:
              "Un gros acompte avant le début des travaux laisse le risque au client. Il est plus sûr de payer chaque étape après sa réalisation et sa réception. Chez SHINEX, il n’y a pas d’acompte : vous payez par étapes les travaux déjà réalisés.",
          },
          {
            question: "Comment comparer les devis de plusieurs entreprises ?",
            answer:
              "Comparez la même liste de travaux : quantités, unités et prix ligne par ligne. Vérifiez si les matériaux, la démolition, la livraison et l’évacuation des gravats sont inclus. Un total sans détail ne dit rien de ce qu’il couvre.",
          },
          {
            question: "Comment choisir si l’entreprise est jeune ?",
            answer:
              "Appuyez-vous sur ce qui se vérifie : les conditions du contrat, le devis, le calendrier de paiement et la garantie, ainsi que l’expérience des personnes qui travailleront sur le chantier. SHINEX est une jeune entreprise dont l’équipe a plus de 10 ans d’expérience : nous travaillons donc sans acompte, fixons le prix dans le contrat et envoyons chaque semaine des photos et des vidéos du chantier.",
          },
          {
            question:
              "Quels documents faut-il pour construire une maison individuelle ?",
            answer:
              "En règle générale, il faut un projet de maison et des documents d’autorisation de construire. Leur contenu dépend du terrain et du bâtiment : avant le début des travaux, précisez qui prépare le projet et qui s’occupe des documents.",
          },
        ],
        calculatorLabel: "Discuter de votre projet",
        contactLabel: "Discuter de votre projet",
        relatedTitle: "Services et prix",
      },
    },
  },
] as const satisfies readonly SeoLandingPage[];
