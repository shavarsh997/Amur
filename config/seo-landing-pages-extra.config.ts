import type { SeoLandingPage } from "@/config/seo-landing-pages.config";

/** Specialist pages with their own scope. Retired variants are mapped in seo-redirects.config.ts. */
export const extraSeoLandingPages = [
  {
    slug: "apartment-interior-design-yerevan",
    kind: "service",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1800&q=85",
    relatedServiceSlugs: ["interior-design", "renovation"],
    relatedLandingSlugs: ["new-build-renovation"],
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
          "Дизайн квартиры в Ереване: планировка, мебель, освещение и решения для ремонта.",
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
    kind: "service",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1800&q=85",
    relatedServiceSlugs: ["commercial-construction", "interior-design"],
    relatedLandingSlugs: [],
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
    kind: "service",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85",
    relatedServiceSlugs: ["renovation", "interior-design"],
    relatedLandingSlugs: [
      "apartment-renovation-yerevan",
      "cosmetic-renovation-yerevan",
      "renovation-estimate-yerevan",
    ],
    translations: {
      hy: {
        eyebrow: "Կապիտալ վերանորոգում · Երևան",
        title: "Կապիտալ վերանորոգում Երևանում",
        description:
          "Կապիտալ վերանորոգում Երևանում՝ հին ծածկույթների ապամոնտաժումից մինչև ինժեներական համակարգերի թարմացում և վերջնական հարդարում։",
        seoTitle: "Կապիտալ վերանորոգում Երևանում | SHINEX",
        seoDescription:
          "Կապիտալ վերանորոգում Երևանում բնակարանի կամ տան համար՝ ապամոնտաժում, էլեկտրական, սանտեխնիկական և հարդարման աշխատանքներ։",
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
              "Հին շենքում տեսանելի հարդարումը միշտ չէ, որ ցույց է տալիս պատերի, հատակի կամ էլեկտրալարերի ու խողովակների վիճակը։ Զննումը օգնում է նախապես բացահայտել լրացուցիչ աշխատանքների հնարավոր անհրաժեշտությունը։",
            ],
          },
          {
            title: "Գնի վրա ազդող հանգամանքներ",
            paragraphs: [
              "Կապիտալ վերանորոգման արժեքը կախված է ապամոնտաժման, մակերեսների շտկման, էլեկտրական ու սանտեխնիկական աշխատանքների և նյութերի ծավալից։",
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
              "Այո, կարող ենք ներկայացնել նախնական արժեքի հաշվարկ, իսկ ճշգրիտ նախահաշիվը կազմվում է զննումից հետո։",
          },
        ],
        calculatorLabel: "Կապվել մեզ հետ",
        contactLabel: "Կապվել մեզ հետ",
        relatedTitle: "Կապված ծառայություններ",
      },
      ru: {
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
              "Старая отделка не всегда показывает состояние оснований и коммуникаций; осмотр снижает риск сюрпризов.",
            ],
          },
          {
            title: "Что влияет на цену",
            paragraphs: [
              "Важны демонтаж, выравнивание, электрика, сантехника и объём материалов.",
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
            answer: "Да, точная смета готовится после осмотра.",
          },
        ],
        calculatorLabel: "Обсудить ремонт",
        contactLabel: "Обсудить ремонт",
        relatedTitle: "Связанные услуги",
      },
      en: {
        eyebrow: "Major renovation · Yerevan",
        title: "Major renovation in Yerevan",
        description:
          "Renovate an older apartment or house in Yerevan, from removing worn finishes and replacing wiring or plumbing to preparing and finishing surfaces.",
        seoTitle: "Major Renovation in Yerevan | SHINEX",
        seoDescription:
          "Major renovation of apartments and houses in Yerevan: demolition, electrical, plumbing and finishing work.",
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
              "Existing finishes can hide damage to walls, floors, wiring or pipes. A site survey helps identify possible repairs and plan the work before new finishes are applied.",
            ],
          },
          {
            title: "What affects price",
            paragraphs: [
              "Demolition, levelling, electrical and plumbing work, and materials all influence cost.",
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
            answer: "Yes. A precise estimate follows the property survey.",
          },
        ],
        calculatorLabel: "Discuss your renovation",
        contactLabel: "Discuss your renovation",
        relatedTitle: "Related services",
      },
      de: {
        eyebrow: "Umfassende Sanierung · Eriwan",
        title: "Umfassende Sanierung in Eriwan",
        description:
          "Sanieren Sie eine ältere Wohnung oder ein Haus in Eriwan: vom Entfernen verschlissener Oberflächen und Ersetzen von Kabeln oder Rohren bis zur Vorbereitung und zum Ausbau.",
        seoTitle: "Umfassende Sanierung in Eriwan | SHINEX",
        seoDescription:
          "Umfassende Sanierung von Wohnungen und Häusern in Eriwan: Rückbau, Elektro-, Sanitär- und Ausbauarbeiten.",
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
              "Bestehende Oberflächen können Schäden an Wänden, Böden, Kabeln oder Rohren verdecken. Eine Besichtigung hilft, mögliche Reparaturen zu erkennen und vor dem neuen Ausbau zu planen.",
            ],
          },
          {
            title: "Was den Preis beeinflusst",
            paragraphs: [
              "Rückbau, Ausgleichsarbeiten, Elektro- und Sanitärarbeiten sowie Materialien beeinflussen die Kosten.",
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
              "Ja. Eine genaue Kostenschätzung erfolgt nach der Besichtigung.",
          },
        ],
        calculatorLabel: "Renovierung besprechen",
        contactLabel: "Renovierung besprechen",
        relatedTitle: "Passende Leistungen",
      },
      fr: {
        eyebrow: "Rénovation lourde · Erevan",
        title: "Rénovation lourde à Erevan",
        description:
          "Rénovez un appartement ancien ou une maison à Erevan, de la dépose des finitions usées et du remplacement des réseaux à la préparation et à la finition des surfaces.",
        seoTitle: "Rénovation lourde à Erevan | SHINEX",
        seoDescription:
          "Rénovation lourde d’appartements et de maisons à Erevan : démolition, électricité, plomberie et finitions.",
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
              "Les finitions existantes peuvent masquer des dommages aux murs, aux sols, aux câbles ou aux tuyaux. Une visite aide à repérer les réparations possibles et à préparer les travaux avant les nouvelles finitions.",
            ],
          },
          {
            title: "Ce qui influence le prix",
            paragraphs: [
              "La démolition, le nivellement, l’électricité, la plomberie et les matériaux influencent le coût.",
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
            answer: "Oui. Un devis précis est établi après la visite du bien.",
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
    kind: "service",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85",
    relatedServiceSlugs: ["renovation"],
    relatedLandingSlugs: [
      "apartment-renovation-yerevan",
      "capital-renovation-yerevan",
      "renovation-estimate-yerevan",
    ],
    translations: {
      hy: {
        eyebrow: "Կոսմետիկ վերանորոգում · Երևան",
        title: "Կոսմետիկ վերանորոգում Երևանում",
        description:
          "Կոսմետիկ վերանորոգում Երևանում՝ բնակարանի, տան կամ առանձին սենյակի հարդարումը թարմացնելու համար՝ առանց կապիտալ փոփոխությունների։",
        seoTitle: "Կոսմետիկ վերանորոգում Երևանում | SHINEX",
        seoDescription:
          "Կոսմետիկ վերանորոգում Երևանում՝ պատերի, առաստաղի, հատակի, սալիկի և առանձին գոտիների հարդարման թարմացում։",
        introduction: [
          "Կոսմետիկ վերանորոգումը հարմար է, երբ տարածքի մակերեսներն ու ինժեներական համակարգերը բավարար վիճակում են, բայց հարդարումը, գույները կամ առանձին հատվածները թարմացման կարիք ունեն։",
          "Մինչ աշխատանքը ճշտում ենք մակերեսների վիճակը, որպեսզի արտաքին թարմացումը չթաքցնի ավելի լուրջ խնդիր։",
        ],
        sections: [
          {
            title: "Ի՞նչ է ներառում կոսմետիկ վերանորոգումը",
            paragraphs: [
              "Աշխատանքների ծավալը կարող է սահմանափակվել մեկ սենյակով կամ ընդգրկել ամբողջ բնակարանը։",
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
              "Եթե էլեկտրական, սանտեխնիկական և կառուցվածքային խնդիրներ չկան, կոսմետիկ լուծումը կարող է արագ թարմացնել տարածքի տեսքը։",
            ],
          },
          {
            title: "Նախնական հաշվարկ",
            paragraphs: [
              "Գինը կախված է մակերեսից, պատերի ու հատակի վիճակից, ընտրված նյութերից և անհրաժեշտ վերականգնման աշխատանքներից։",
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
              "Այո, հնարավոր է քննարկել մեկ սենյակի կամ առանձին գոտու աշխատանքները։",
          },
          {
            question: "Որքա՞ն ժամանակ է տևում",
            answer:
              "Ժամկետը կախված է մակերեսից, շերտերի չորացման ժամանակից և աշխատանքների կազմից։",
          },
        ],
        calculatorLabel: "Կապվել մեզ հետ",
        contactLabel: "Կապվել մեզ հետ",
        relatedTitle: "Կապված ծառայություններ",
      },
      ru: {
        eyebrow: "Косметический ремонт · Ереван",
        title: "Косметический ремонт в Ереване",
        description:
          "Косметический ремонт в Ереване для обновления отделки квартиры, дома или отдельной комнаты без полного обновления инженерных систем.",
        seoTitle: "Косметический ремонт в Ереване | SHINEX",
        seoDescription:
          "Косметический ремонт в Ереване: обновление стен, потолка, пола, плитки и отдельных зон.",
        introduction: [
          "Косметический ремонт подходит, когда основания и системы в нормальном состоянии, но отделку или отдельные зоны нужно обновить.",
          "До начала уточняем состояние поверхностей, чтобы внешнее обновление не скрыло серьёзную проблему.",
        ],
        sections: [
          {
            title: "Что может включать косметический ремонт",
            paragraphs: [
              "Он может быть небольшим для одной комнаты или охватывать всю квартиру.",
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
              "Если нет инженерных и конструктивных проблем, косметический ремонт может быстро освежить пространство.",
            ],
          },
          {
            title: "Предварительный расчёт",
            paragraphs: [
              "Цена зависит от площади, состояния стен и пола, материалов и восстановительных работ.",
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
            answer: "Да, можно обсудить одну комнату или отдельную зону.",
          },
          {
            question: "Сколько это занимает?",
            answer:
              "Срок зависит от площади, высыхания материалов и состава работ.",
          },
        ],
        calculatorLabel: "Обсудить ремонт",
        contactLabel: "Обсудить ремонт",
        relatedTitle: "Связанные услуги",
      },
      en: {
        eyebrow: "Cosmetic renovation · Yerevan",
        title: "Cosmetic renovation in Yerevan",
        description:
          "Refresh the finishes in your apartment, house or a single room when the existing wiring, plumbing and surfaces are in sound condition.",
        seoTitle: "Cosmetic Renovation in Yerevan | SHINEX",
        seoDescription:
          "Cosmetic renovation in Yerevan: painting, wallpaper, ceiling repairs and flooring updates for an apartment, house or individual room.",
        introduction: [
          "Cosmetic renovation is suitable when walls, floors, wiring and plumbing are in sound condition, but the visible finishes need updating.",
          "We check surfaces first so a visual update does not conceal a more serious issue.",
        ],
        sections: [
          {
            title: "What cosmetic renovation can include",
            paragraphs: [
              "The scope may be limited to one room or extend through the whole apartment.",
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
              "When wiring, plumbing and the building structure are in sound condition, updating the finishes may be enough to improve the room.",
            ],
          },
          {
            title: "Initial estimate",
            paragraphs: [
              "Cost depends on area, wall and floor condition, material choices and required surface repairs.",
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
            answer: "Yes. We can discuss a single room or individual area.",
          },
          {
            question: "How long does it take?",
            answer:
              "It depends on area, material drying time and the agreed scope.",
          },
        ],
        calculatorLabel: "Discuss your renovation",
        contactLabel: "Discuss your renovation",
        relatedTitle: "Related services",
      },
      de: {
        eyebrow: "Optische Renovierung · Eriwan",
        title: "Optische Renovierung in Eriwan",
        description:
          "Frischen Sie Ihre Wohnung, Ihr Haus oder einen einzelnen Raum auf, wenn Kabel, Rohre und Untergründe in gutem Zustand sind.",
        seoTitle: "Optische Renovierung in Eriwan | SHINEX",
        seoDescription:
          "Optische Renovierung in Eriwan: Anstriche, Tapeten, Deckenreparaturen und neue Bodenbeläge für Wohnungen, Häuser oder einzelne Räume.",
        introduction: [
          "Eine optische Renovierung ist geeignet, wenn Wände, Böden, Kabel und Rohre intakt sind, die sichtbaren Oberflächen aber erneuert werden sollen.",
          "Wir prüfen zuerst die Untergründe, damit eine optische Auffrischung keine ernsteren Probleme verdeckt.",
        ],
        sections: [
          {
            title: "Was eine optische Renovierung umfassen kann",
            paragraphs: [
              "Der Umfang kann einen einzelnen Raum oder die gesamte Wohnung betreffen.",
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
              "Sind Kabel, Rohre und Bausubstanz in gutem Zustand, kann die Erneuerung der Oberflächen ausreichen, um den Raum zu verbessern.",
            ],
          },
          {
            title: "Erste Kostenschätzung",
            paragraphs: [
              "Die Kosten hängen von Fläche, Wand- und Bodenzustand, Materialwahl und nötigen Untergrundreparaturen ab.",
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
            question: "Können Sie einen einzelnen Raum renovieren?",
            answer:
              "Ja. Wir können einen einzelnen Raum oder Bereich besprechen.",
          },
          {
            question: "Wie lange dauert es?",
            answer:
              "Das hängt von Fläche, Materialtrocknungszeiten und vereinbartem Umfang ab.",
          },
        ],
        calculatorLabel: "Renovierung besprechen",
        contactLabel: "Renovierung besprechen",
        relatedTitle: "Passende Leistungen",
      },
      fr: {
        eyebrow: "Rénovation légère · Erevan",
        title: "Rénovation légère à Erevan",
        description:
          "Rafraîchissez les finitions de votre appartement, maison ou d’une seule pièce lorsque l’électricité, la plomberie et les surfaces sont en bon état.",
        seoTitle: "Rénovation légère à Erevan | SHINEX",
        seoDescription:
          "Rénovation légère à Erevan : peinture, papier peint, réparations de plafonds et renouvellement des sols pour appartement, maison ou pièce individuelle.",
        introduction: [
          "Une rénovation légère convient lorsque les murs, sols, câbles et canalisations sont sains, mais que les finitions visibles ont besoin d’être renouvelées.",
          "Nous vérifions d’abord les surfaces pour qu’un rafraîchissement ne masque pas un problème plus sérieux.",
        ],
        sections: [
          {
            title: "Ce que peut comprendre une rénovation légère",
            paragraphs: [
              "Les travaux peuvent concerner une seule pièce ou l’ensemble de l’appartement.",
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
              "Lorsque l’électricité, la plomberie et la structure sont en bon état, renouveler les finitions peut suffire à améliorer la pièce.",
            ],
          },
          {
            title: "Première estimation",
            paragraphs: [
              "Le coût dépend de la surface, de l’état des murs et sols, des matériaux et des réparations nécessaires.",
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
            question: "Pouvez-vous rénover une seule pièce ?",
            answer:
              "Oui. Nous pouvons discuter d’une pièce ou d’une zone précise.",
          },
          {
            question: "Combien de temps cela prend-il ?",
            answer:
              "Cela dépend de la surface, du temps de séchage des matériaux et du périmètre convenu.",
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
    kind: "prices",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85",
    relatedServiceSlugs: ["renovation"],
    relatedLandingSlugs: ["prices", "capital-renovation-yerevan"],
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
              "Յուրաքանչյուր տողում պետք է նշված լինեն աշխատանքը, չափված ծավալը և միավորի գինը։ Նյութերն ու լրացուցիչ ծախսերը ներկայացվում են առանձին։ Ստորև բերված օրինակը կօգնի ստուգել առաջարկի կազմը։",
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
              "Каждая строка связывает конкретную работу, измеренный объём и цену за единицу. Отдельно указываются материалы и дополнительные расходы. Ниже — пример структуры, по которой удобно проверить предложение.",
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
              "Each line should identify the task, measured quantity and unit rate. Materials and additional costs should be listed separately. The example below shows a structure you can use to review a quotation.",
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
              "Jede Position sollte Arbeit, gemessene Menge und Einheitspreis nennen. Materialien und Zusatzkosten sollten separat stehen. Das folgende Beispiel zeigt eine Struktur zur Angebotsprüfung.",
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
              "Chaque ligne doit préciser la tâche, la quantité mesurée et le prix unitaire. Les matériaux et frais supplémentaires doivent être séparés. L’exemple ci-dessous propose une structure pour examiner un devis.",
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
              "Դիմելիս նշեք՝ ինչ աշխատանքներ են անհրաժեշտ և ինչ վիճակում են խողովակներն ու սարքավորումները։ Այդ տվյալներով կարող ենք քննարկել առանձին պատվերի ծավալն ու կազմակերպումը։",
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
            question: "Выполняете ли вы отдельные работы?",
            answer: "Обсуждаем объём работ и подходящий формат организации.",
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
              "Tell us what work is needed and the condition of the existing pipes and fixtures. We can then discuss the scope and arrangements for a separate job.",
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
              "Beschreiben Sie die nötigen Arbeiten sowie den Zustand der vorhandenen Rohre und Ausstattung. Danach besprechen wir Umfang und Bedingungen eines Einzelauftrags.",
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
              "Indiquez les travaux souhaités et l’état des tuyaux et équipements existants. Nous pourrons ensuite discuter du périmètre et des modalités d’une intervention distincte.",
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
] as const satisfies readonly SeoLandingPage[];
