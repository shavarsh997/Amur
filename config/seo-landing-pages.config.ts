import type { Locale } from "@/types";
import { extraSeoLandingPages } from "@/config/seo-landing-pages-extra.config";

export type SeoLandingPage = {
  slug: string;
  kind: "service" | "prices";
  image: string;
  relatedServiceSlugs: readonly string[];
  /** Links between distinct commercial intents; never use this for keyword variants. */
  relatedLandingSlugs: readonly string[];
  translations: Record<
    Locale,
    {
      eyebrow: string;
      title: string;
      description: string;
      seoTitle: string;
      seoDescription: string;
      introduction: readonly string[];
      sections: readonly {
        title: string;
        paragraphs: readonly string[];
        items?: readonly string[];
      }[];
      faqs: readonly { question: string; answer: string }[];
      calculatorLabel: string;
      contactLabel: string;
      relatedTitle: string;
    }
  >;
};

const apartmentImage =
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85";

/**
 * Intent-led pages only. Add a page when it has its own useful, reviewed content;
 * this is deliberately not a location-page generator.
 */
const coreSeoLandingPages = [
  {
    slug: "apartment-renovation-yerevan",
    kind: "service",
    image: apartmentImage,
    relatedServiceSlugs: ["renovation", "interior-design", "design"],
    relatedLandingSlugs: [
      "turnkey-renovation",
      "new-build-renovation",
      "prices",
    ],
    translations: {
      ru: {
        eyebrow: "Ремонт квартир · Ереван",
        title: "Ремонт квартир в Ереване",
        description:
          "SHINEX выполняет полный ремонт квартир в Ереване — от осмотра и предварительной сметы до электрики, сантехники, отделки и сдачи готового объекта.",
        seoTitle: "Ремонт квартир в Ереване под ключ | SHINEX",
        seoDescription:
          "Ремонт квартир в Ереване: новостройки, капитальный и ремонт под ключ. Электрика, сантехника, отделка и полный комплекс работ. Получите предварительную смету в SHINEX.",
        introduction: [
          "SHINEX выполняет ремонт квартир в Ереване для новостроек и вторичного жилья. Начинаем с осмотра, замеров и предварительной сметы, а затем организуем инженерные и отделочные работы в понятной последовательности.",
          "Вы не ищете отдельно электрика, сантехника, плиточника и других мастеров: при ремонте под ключ одна команда организует весь согласованный объём работ и сдачу готового объекта.",
        ],
        sections: [
          {
            title: "Ремонт квартиры под ключ",
            paragraphs: [
              "Берём на себя весь объект — от подготовки помещения до чистовой отделки и финальной проверки. Состав работ фиксируется после осмотра и согласования решений.",
            ],
            items: [
              "Демонтаж и подготовка помещения.",
              "Электрика, сантехника и отопление.",
              "Подготовка стен, штукатурка и шпаклёвка.",
              "Покраска, кафель и напольные покрытия.",
              "Потолки, двери и освещение.",
              "Чистовая отделка, контроль и сдача объекта.",
            ],
          },
          {
            title: "Ремонт квартиры в новостройке",
            paragraphs: [
              "В квартире от застройщика проверяем стены и пол, инженерные точки, проёмы и готовность поверхностей. Это помогает заложить электрику, сантехнику, перегородки, выравнивание, потолки и отделку до переезда без переделок готовых поверхностей.",
            ],
            items: [
              "Проверка стен, пола и инженерных выводов.",
              "Электрика, сантехника и необходимые перегородки.",
              "Выравнивание, подготовка оснований и потолков.",
              "Чистовая отделка и подготовка квартиры к проживанию.",
            ],
          },
          {
            title: "Капитальный ремонт квартиры",
            paragraphs: [
              "Капитальный ремонт нужен, когда требуется обновить коммуникации, демонтировать старые покрытия, подготовить стены и пол или изменить состав инженерных и отделочных работ. Перед началом определяем фактическое состояние квартиры и безопасную последовательность этапов.",
            ],
          },
          {
            title: "Косметический ремонт",
            paragraphs: [
              "Косметический ремонт помогает обновить отделку квартиры без полного вмешательства в инженерные системы. После осмотра согласуем, какие поверхности, покрытия, свет или отдельные зоны требуют обновления.",
            ],
          },
          {
            title: "Сколько стоит ремонт квартиры в Ереване",
            paragraphs: [
              "Стоимость ремонта квартиры в Ереване зависит не только от площади. На расчёт влияют состояние стен и пола, демонтаж, объём электрики и сантехники, сложность проекта, материалы и объём отделочных работ.",
              "Универсальная фиксированная цена без осмотра может вводить в заблуждение. Калькулятор помогает получить предварительный ориентир, а точную смету можно подготовить после изучения объекта и согласования работ.",
            ],
          },
          {
            title: "Этапы ремонта",
            paragraphs: [
              "Работу организуем поэтапно, чтобы заранее согласовать объём, изменения и следующий шаг.",
            ],
            items: [
              "Первичная консультация.",
              "Осмотр объекта.",
              "Замеры.",
              "Определение объёма работ.",
              "Предварительная смета.",
              "Согласование.",
              "Договор.",
              "Выполнение работ.",
              "Контроль качества.",
              "Сдача объекта.",
            ],
          },
          {
            title: "Почему SHINEX",
            paragraphs: [
              "Условия работы и изменения обсуждаем до их выполнения, чтобы процесс ремонта был понятным для заказчика.",
            ],
            items: [
              "Работа по договору.",
              "Заранее согласованная смета.",
              "Один подрядчик на весь объект.",
              "Поэтапная организация работ.",
              "Контроль качества.",
              "Согласование дополнительных работ до их выполнения.",
            ],
          },
        ],
        faqs: [
          {
            question: "Сколько стоит ремонт квартиры в Ереване?",
            answer:
              "Стоимость зависит от площади, состояния квартиры, демонтажа, инженерных работ, материалов и сложности отделки. Предварительный ориентир даст калькулятор, а точная смета готовится после осмотра.",
          },
          {
            question: "Что входит в ремонт квартиры под ключ?",
            answer:
              "В согласованный объём могут входить демонтаж, электрика, сантехника, подготовка стен и пола, плитка, покрытия, потолки, двери, освещение, чистовая отделка и сдача объекта.",
          },
          {
            question: "Делаете ли вы электрику?",
            answer:
              "Да, при согласованном объёме ремонта организуем электрические работы как часть одного проекта.",
          },
          {
            question: "Делаете ли вы сантехнику?",
            answer:
              "Да, сантехнические работы можно включить в комплексный ремонт после осмотра и определения задач.",
          },
          {
            question: "Можно ли заказать полный ремонт одной компанией?",
            answer:
              "Да. SHINEX может организовать весь согласованный ремонт объекта, чтобы вам не искать отдельных исполнителей для каждого этапа.",
          },
          {
            question: "Делаете ли вы ремонт новостроек?",
            answer:
              "Да. Проверяем исходное состояние квартиры и выполняем согласованные инженерные, подготовительные и отделочные работы.",
          },
          {
            question: "Сколько времени занимает ремонт квартиры?",
            answer:
              "Срок зависит от площади, состояния объекта, инженерных работ и состава отделки. После осмотра можно составить реалистичный поэтапный график.",
          },
          {
            question: "Можно ли предварительно рассчитать стоимость?",
            answer:
              "Да. Используйте калькулятор для ориентира, затем закажите осмотр для подготовки точной сметы.",
          },
          {
            question: "Работаете ли вы за пределами Еревана?",
            answer:
              "SHINEX принимает проекты в Ереване и регионах Армении; возможность выезда зависит от расположения и объёма работ.",
          },
        ],
        calculatorLabel: "Рассчитать стоимость ремонта квартиры",
        contactLabel: "Заказать осмотр квартиры",
        relatedTitle: "Связанные услуги",
      },
      en: {
        eyebrow: "Apartment renovation · Yerevan",
        title: "Apartment renovation in Yerevan",
        description:
          "SHINEX delivers complete apartment renovation in Yerevan, from a survey and initial estimate through electrical, plumbing, finishes, and handover.",
        seoTitle: "Apartment Renovation in Yerevan, Armenia | SHINEX",
        seoDescription:
          "Apartment renovation in Yerevan: new-build, major, and turnkey renovation. Electrical, plumbing, finishes, and a complete range of work. Get an initial estimate from SHINEX.",
        introduction: [
          "SHINEX renovates new-build and existing apartments in Yerevan. We start with a survey, measurements, and an initial estimate, then organise the building-services and finishing work in a clear sequence.",
          "You do not need to find an electrician, plumber, tiler, and other trades separately: for a turnkey renovation, one team coordinates the agreed work scope and handover.",
        ],
        sections: [
          {
            title: "Turnkey apartment renovation",
            paragraphs: [
              "We take responsibility for the whole property, from preparing the space through final finishes and inspection. The work scope is confirmed after the survey and agreement on the solutions.",
            ],
            items: [
              "Demolition and space preparation.",
              "Electrical, plumbing, and heating work.",
              "Wall preparation, plastering, and puttying.",
              "Painting, tiling, and floor finishes.",
              "Ceilings, doors, and lighting.",
              "Final finishes, quality control, and handover.",
            ],
          },
          {
            title: "New-build apartment renovation",
            paragraphs: [
              "For an apartment from the developer, we check walls and floors, service points, openings, and surface readiness. This lets us plan electrical, plumbing, partitions, levelling, ceilings, and finishes before moving in without redoing completed surfaces.",
            ],
            items: [
              "Check walls, floors, and building-services outlets.",
              "Electrical, plumbing, and required partitions.",
              "Levelling, substrate preparation, and ceilings.",
              "Final finishes and preparing the apartment for living.",
            ],
          },
          {
            title: "Major apartment renovation",
            paragraphs: [
              "Major renovation is needed when utilities need updating, old finishes must be removed, walls and floors require preparation, or the building-services and finishing scope needs to change. Before work begins, we establish the actual condition of the apartment and a safe sequence of stages.",
            ],
          },
          {
            title: "Cosmetic renovation",
            paragraphs: [
              "Cosmetic renovation refreshes apartment finishes without a full intervention in the building-services systems. After a survey, we agree which surfaces, finishes, lighting, or individual areas need updating.",
            ],
          },
          {
            title: "How much does apartment renovation in Yerevan cost?",
            paragraphs: [
              "Apartment renovation cost in Yerevan depends on more than area. The calculation is affected by wall and floor condition, demolition, electrical and plumbing scope, project complexity, materials, and finishing work.",
              "A universal fixed price without a survey can be misleading. The calculator provides an initial guide, while an accurate estimate can be prepared after reviewing the property and agreeing the work.",
            ],
          },
          {
            title: "Renovation stages",
            paragraphs: [
              "We organise the work in stages so that the scope, changes, and next step are agreed in advance.",
            ],
            items: [
              "Initial consultation.",
              "Property survey.",
              "Measurements.",
              "Defining the work scope.",
              "Initial estimate.",
              "Agreement.",
              "Contract.",
              "Work delivery.",
              "Quality control.",
              "Handover.",
            ],
          },
          {
            title: "Why SHINEX",
            paragraphs: [
              "We discuss work terms and changes before they are carried out, so the renovation process is clear to the client.",
            ],
            items: [
              "Contract-based work.",
              "Estimate agreed in advance.",
              "One contractor for the whole property.",
              "Work organised in stages.",
              "Quality control.",
              "Additional work agreed before it is carried out.",
            ],
          },
        ],
        faqs: [
          {
            question: "How much does apartment renovation in Yerevan cost?",
            answer:
              "The cost depends on the area, condition, demolition, building-services work, materials, and finish complexity. The calculator gives an initial guide; a precise estimate follows a survey.",
          },
          {
            question: "What is included in turnkey apartment renovation?",
            answer:
              "The agreed scope can include demolition, electrical and plumbing work, wall and floor preparation, tiling, floor finishes, ceilings, doors, lighting, final finishes, and handover.",
          },
          {
            question: "Do you handle electrical work?",
            answer:
              "Yes. Electrical work can be organised as part of the agreed renovation project.",
          },
          {
            question: "Do you handle plumbing work?",
            answer:
              "Yes. Plumbing work can be included in the agreed scope after a survey and project discussion.",
          },
          {
            question: "Can one company complete the whole renovation?",
            answer:
              "Yes. SHINEX can coordinate the agreed work scope so you do not need to find separate contractors for each stage.",
          },
          {
            question: "Do you renovate new-build apartments?",
            answer:
              "Yes. We review the apartment’s starting condition and carry out agreed building-services, preparation, and finishing work.",
          },
          {
            question: "How long does apartment renovation take?",
            answer:
              "Timing depends on area, the starting condition, building-services work, and finish scope. Following a survey, we can prepare a realistic staged schedule.",
          },
          {
            question: "Can I calculate the cost in advance?",
            answer:
              "Yes. Use the calculator for an initial guide, then request a survey for a precise estimate.",
          },
          {
            question: "Do you work outside Yerevan?",
            answer:
              "SHINEX accepts projects in Yerevan and Armenia’s regions; visit availability depends on the location and work scope.",
          },
        ],
        calculatorLabel: "Calculate renovation cost",
        contactLabel: "Request an apartment survey",
        relatedTitle: "Related services",
      },
      hy: {
        eyebrow: "Բնակարանների վերանորոգում · Երևան",
        title: "Բնակարանների վերանորոգում Երևանում",
        description:
          "Կազմակերպում ենք բնակարանների վերանորոգում Երևանում՝ զննումից և նախահաշվից մինչև ինժեներական աշխատանքներ, հարդարում և հանձնում։",
        seoTitle: "Բնակարանների վերանորոգում Երևանում — SHINEX",
        seoDescription:
          "Բնակարանների վերանորոգում Երևանում՝ նորակառույցների և երկրորդային բնակֆոնդի համար, փուլեր, արժեքի գործոններ և նախնական հաշվարկ։",
        introduction: [
          "Բնակարանի վերանորոգումը սկսվում է ոչ թե միայն հարդարման ընտրությունից, այլ հստակ աշխատանքային պլանից։ SHINEX-ը Երևանում վերանորոգում է նորակառույց և երկրորդային բնակարաններ՝ գնահատելով ելակետային վիճակը և փուլերով կազմակերպելով աշխատանքը։",
          "Վերջնական նախահաշիվը կախված է մակերեսից, տարածքի վիճակից, ինժեներական աշխատանքներից և ընտրված նյութերից։ Զննումից հետո հնարավոր է որոշել աշխատանքների հերթականությունն ու իրատեսական բյուջեն։",
        ],
        sections: [
          {
            title: "Ո՞ր բնակարաններն ենք վերանորոգում",
            paragraphs: [
              "Մոտեցումն ընտրում ենք ըստ օբյեկտի վիճակի և վերանորոգման նպատակի՝ բնակվելու, վարձակալության կամ տեղափոխվելու համար։",
            ],
            items: [
              "Նորակառույց բնակարաններ՝ հիմքի նախապատրաստում, ինժեներական համակարգեր և վերջնական հարդարում։",
              "Երկրորդային բնակֆոնդ՝ ապամոնտաժում, հաղորդակցությունների թարմացում և տարածքի վերանորոգում։",
              "Կոսմետիկ վերանորոգում՝ մեկ սենյակի կամ ամբողջ բնակարանի համար։",
              "Կապիտալ և ամբողջական վերանորոգում։",
            ],
          },
          {
            title: "Ինչպե՞ս է կազմակերպվում աշխատանքը",
            paragraphs: [
              "Մինչ մեկնարկը ճշտում ենք ելակետային տվյալներն ու աշխատանքների ծավալը։ Նախապատրաստական, ինժեներական և հարդարման փուլերը կատարվում են համաձայնեցված հերթականությամբ։",
            ],
            items: [
              "Զննում, չափագրում և խնդրի քննարկում։",
              "Լուծումների, աշխատանքների կազմի և նախահաշվի համաձայնեցում։",
              "Ապամոնտաժում և հիմքերի նախապատրաստում՝ անհրաժեշտության դեպքում։",
              "Էլեկտրականություն, սանտեխնիկա, հարթեցում, ստյաժկա և այլ սև աշխատանքներ։",
              "Սալիկ, ծածկույթներ, առաստաղներ, դռներ, լուսավորություն և վերջնական ստուգում։",
            ],
          },
          {
            title: "Ի՞նչն է ազդում բնակարանի վերանորոգման արժեքի վրա",
            paragraphs: [
              "Քառակուսի մետրի ցուցանիշը չի փոխարինում նախահաշվին․ նույն մակերեսով բնակարանները կարող են պահանջել տարբեր նախապատրաստական և ինժեներական աշխատանքներ։",
            ],
            items: [
              "Պատերի, հատակի և առաստաղի վիճակը։",
              "Բնակարանի մակերեսն ու հատակագիծը։",
              "Էլեկտրականության և սանտեխնիկայի նոր կամ փոխարինվող համակարգերը։",
              "Լուծումների, նյութերի և վերջնական հարդարման բարդությունը։",
            ],
          },
        ],
        faqs: [
          {
            question: "Որքա՞ն արժե բնակարանի վերանորոգումը Երևանում",
            answer:
              "Արժեքը կախված է մակերեսից, բնակարանի վիճակից, ապամոնտաժումից, ինժեներական աշխատանքներից, նյութերից և հարդարման բարդությունից։ Հաշվիչը հնարավորություն է տալիս ստանալ նախնական արժեքի հաշվարկ, իսկ ճշգրիտ նախահաշիվը կազմվում է զննումից հետո։",
          },
          {
            question: "Ի՞նչ է ներառում բնակարանի ամբողջական վերանորոգումը",
            answer:
              "Համաձայնեցված աշխատանքների կազմը կարող է ներառել ապամոնտաժում, էլեկտրական և սանտեխնիկական աշխատանքներ, պատերի ու հատակի պատրաստում, սալիկ, ծածկույթներ, առաստաղներ, դռներ, լուսավորություն, վերջնական հարդարում և հանձնում։",
          },
          {
            question: "Կատարո՞ւմ եք էլեկտրական աշխատանքներ",
            answer:
              "Այո, էլեկտրական աշխատանքները կարող են ներառվել համաձայնեցված վերանորոգման նախագծում։",
          },
          {
            question: "Կատարո՞ւմ եք սանտեխնիկական աշխատանքներ",
            answer:
              "Այո, սանտեխնիկական աշխատանքները կարող են ներառվել համալիր վերանորոգման մեջ՝ զննումից և խնդիրների ճշտումից հետո։",
          },
          {
            question:
              "Հնարավո՞ր է ամբողջ վերանորոգումը պատվիրել մեկ ընկերությունից",
            answer:
              "Այո։ SHINEX-ը կարող է կազմակերպել օբյեկտի համաձայնեցված ամբողջ վերանորոգումը, որպեսզի յուրաքանչյուր փուլի համար առանձին կատարող չփնտրեք։",
          },
          {
            question: "Կատարո՞ւմ եք նորակառույց բնակարանների վերանորոգում",
            answer:
              "Այո։ Ստուգում ենք բնակարանի ելակետային վիճակը և կատարում համաձայնեցված ինժեներական, նախապատրաստական ու հարդարման աշխատանքները։",
          },
          {
            question: "Որքա՞ն է տևում բնակարանի վերանորոգումը",
            answer:
              "Ժամկետը կախված է մակերեսից, ելակետային վիճակից, ինժեներական աշխատանքներից և հարդարման ծավալից։ Զննումից հետո կազմում ենք իրատեսական փուլային գրաֆիկ։",
          },
          {
            question: "Հնարավո՞ր է արժեքը նախապես հաշվարկել",
            answer:
              "Այո։ Հաշվիչով կարող եք ստանալ նախնական արժեքի հաշվարկ, ապա պատվիրել զննում՝ ճշգրիտ նախահաշիվ ստանալու համար։",
          },
          {
            question: "Աշխատո՞ւմ եք Երևանից դուրս",
            answer:
              "SHINEX-ը նախագծեր է ընդունում Երևանում և Հայաստանի մարզերում։ Մեկնելու հնարավորությունը կախված է օբյեկտի տեղադրությունից և աշխատանքի ծավալից։",
          },
        ],
        calculatorLabel: "Հաշվել վերանորոգման արժեքը",
        contactLabel: "Պատվիրել բնակարանի զննում",
        relatedTitle: "Կապված ծառայություններ",
      },
    },
  },
  {
    slug: "new-build-renovation",
    kind: "service",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=85",
    relatedServiceSlugs: ["renovation", "interior-design", "design"],
    relatedLandingSlugs: [
      "apartment-renovation-yerevan",
      "turnkey-renovation",
      "prices",
    ],
    translations: {
      ru: {
        eyebrow: "Ремонт новостроек · Ереван",
        title: "Ремонт квартиры в новостройке в Ереване",
        description:
          "Ремонтируем квартиры в новостройках: от черновой подготовки и инженерии до чистовой отделки.",
        seoTitle: "Ремонт новостройки в Ереване под ключ | SHINEX",
        seoDescription:
          "Ремонт квартиры в новостройке в Ереване: черновые и чистовые этапы, сроки и факторы стоимости.",
        introduction: [
          "Квартира от застройщика требует проверки реального состояния стен, пола, проёмов и инженерных точек. Мы начинаем ремонт новостройки с осмотра и согласования того, что необходимо исправить до чистовой отделки.",
          "Последовательность работ важна: она помогает не переделывать готовые поверхности после электрики, сантехники или подготовки оснований.",
        ],
        sections: [
          {
            title: "Что проверяем перед началом",
            paragraphs: [
              "Даже квартира с предчистовой отделкой может требовать корректировок. После осмотра определяем состав подготовки.",
            ],
            items: [
              "Ровность стен, пола и потолка.",
              "Расположение и достаточность электрических точек.",
              "Трассы воды, канализации и сантехнические выводы.",
              "Проёмы, вентиляцию и готовность поверхностей к отделке.",
            ],
          },
          {
            title: "Этапы ремонта новостройки",
            paragraphs: [
              "Работы планируем от скрытых инженерных решений к видимым материалам и оборудованию.",
            ],
            items: [
              "Обмеры, планировка и смета.",
              "Штукатурка, выравнивание и стяжка при необходимости.",
              "Разводка электрики и сантехники.",
              "Гидроизоляция, плитка, потолки, покрытия и покраска.",
              "Монтаж дверей, света, сантехники и финальная проверка.",
            ],
          },
          {
            title: "Сроки и стоимость",
            paragraphs: [
              "Сроки и бюджет зависят от готовности квартиры, площади, числа инженерных точек, выбранных материалов и сложности решений. Точную смету можно подготовить после осмотра объекта.",
            ],
          },
        ],
        faqs: [
          {
            question: "Нужна ли стяжка в новостройке?",
            answer:
              "Это определяется по фактическому состоянию и выбранному покрытию. После проверки пола можно понять, нужна ли локальная корректировка или полноценная стяжка.",
          },
          {
            question: "Когда заказывать дизайн-проект?",
            answer:
              "Лучше до начала инженерных работ: планировка и расстановка оборудования помогают правильно разместить электрические и сантехнические точки.",
          },
        ],
        calculatorLabel: "Рассчитать стоимость ремонта",
        contactLabel: "Заказать осмотр новостройки",
        relatedTitle: "Связанные услуги",
      },
      en: {
        eyebrow: "New-build renovation · Yerevan",
        title: "New-build apartment renovation in Yerevan",
        description:
          "We renovate new-build apartments from base preparation and building services through final finishes.",
        seoTitle: "New-Build Apartment Renovation in Yerevan | SHINEX",
        seoDescription:
          "New apartment renovation in Yerevan: base and finishing stages, timing, and cost factors from SHINEX.",
        introduction: [
          "A developer-delivered apartment needs a real check of walls, floors, openings, and service points. We start with a survey and agree what must be resolved before final finishes.",
          "The work sequence matters: it avoids remaking completed surfaces after electrical, plumbing, or substrate preparation work.",
        ],
        sections: [
          {
            title: "What we check before work",
            paragraphs: [
              "Even a partly finished new build can need corrections. The survey establishes the preparation scope.",
            ],
            items: [
              "Wall, floor, and ceiling level.",
              "Location and adequacy of electrical points.",
              "Water, drainage, and plumbing outlets.",
              "Openings, ventilation, and surface readiness for finishes.",
            ],
          },
          {
            title: "New-build renovation stages",
            paragraphs: [
              "Work moves from concealed systems to visible materials and fittings.",
            ],
            items: [
              "Measurements, layout, and estimate.",
              "Plastering, levelling, and screed where needed.",
              "Electrical and plumbing installation.",
              "Waterproofing, tiling, ceilings, flooring, and painting.",
              "Doors, lighting, fixtures, and final inspection.",
            ],
          },
          {
            title: "Timing and cost",
            paragraphs: [
              "Timing and budget depend on apartment readiness, area, number of service points, chosen materials, and complexity. A site survey is needed for a precise estimate.",
            ],
          },
        ],
        faqs: [
          {
            question: "Does a new build need a screed?",
            answer:
              "That depends on the actual floor condition and selected finish. A floor check establishes whether local correction or a full screed is needed.",
          },
          {
            question: "When should I commission interior design?",
            answer:
              "Preferably before building-services work: a layout and equipment plan help place electrical and plumbing points correctly.",
          },
        ],
        calculatorLabel: "Calculate renovation cost",
        contactLabel: "Request a new-build survey",
        relatedTitle: "Related services",
      },
      hy: {
        eyebrow: "Նորակառույցների վերանորոգում · Երևան",
        title: "Նորակառույց բնակարանի վերանորոգում Երևանում",
        description:
          "Վերանորոգում ենք նորակառույց բնակարաններ՝ հիմքերի նախապատրաստումից և ինժեներական համակարգերից մինչև վերջնական հարդարում։",
        seoTitle: "Նորակառույց բնակարանի վերանորոգում Երևանում | SHINEX",
        seoDescription:
          "Նորակառույց բնակարանի վերանորոգում Երևանում՝ սև և վերջնական փուլեր, ժամկետներ և արժեքի գործոններ։",
        introduction: [
          "Կառուցապատողից հանձնված բնակարանը պահանջում է պատերի, հատակի, բացվածքների և ինժեներական կետերի իրական ստուգում։ Աշխատանքը սկսում ենք զննումից և համաձայնեցնում ենք՝ ինչ է պետք կարգավորել մինչև վերջնական հարդարումը։",
          "Աշխատանքների հերթականությունը կարևոր է․ այն օգնում է չվերամշակել արդեն պատրաստ մակերեսները էլեկտրականությունից, սանտեխնիկայից կամ հիմքերի նախապատրաստումից հետո։",
        ],
        sections: [
          {
            title: "Ի՞նչ ենք ստուգում մեկնարկից առաջ",
            paragraphs: [
              "Նույնիսկ մասնակի հարդարմամբ նորակառույցը կարող է ուղղումներ պահանջել։ Զննումը որոշում է նախապատրաստական աշխատանքի ծավալը։",
            ],
            items: [
              "Պատերի, հատակի և առաստաղի հարթությունը։",
              "Էլեկտրական կետերի տեղադրումն ու բավարարությունը։",
              "Ջրի, կոյուղու և սանտեխնիկայի ելքերը։",
              "Բացվածքները, օդափոխությունը և մակերեսների պատրաստվածությունը։",
            ],
          },
          {
            title: "Նորակառույցի վերանորոգման փուլերը",
            paragraphs: [
              "Աշխատանքը անցնում է թաքնված համակարգերից դեպի տեսանելի նյութեր և սարքավորումներ։",
            ],
            items: [
              "Չափագրում, հատակագիծ և նախահաշիվ։",
              "Սվաղ, հարթեցում և ստյաժկա՝ անհրաժեշտության դեպքում։",
              "Էլեկտրականության և սանտեխնիկայի անցկացում։",
              "Ջրամեկուսացում, սալիկ, առաստաղներ, ծածկույթներ և ներկում։",
              "Դռներ, լուսավորություն, սանտեխնիկա և վերջնական ստուգում։",
            ],
          },
          {
            title: "Ժամկետ և արժեք",
            paragraphs: [
              "Ժամկետն ու բյուջեն կախված են բնակարանի պատրաստվածությունից, մակերեսից, ինժեներական կետերի քանակից, նյութերից և լուծումների բարդությունից։ Ճշգրիտ նախահաշիվը հնարավոր է կազմել զննումից հետո։",
            ],
          },
        ],
        faqs: [
          {
            question: "Նորակառույցում ստյաժկա պե՞տք է",
            answer:
              "Դա որոշվում է հատակի իրական վիճակից և ընտրված ծածկույթից։ Ստուգումից հետո պարզ է՝ անհրաժեշտ է տեղային հարթեցում, թե ամբողջական ստյաժկա։",
          },
          {
            question: "Ե՞րբ պատվիրել ինտերիերի դիզայն",
            answer:
              "Լավ է՝ ինժեներական աշխատանքներից առաջ․ հատակագիծն ու սարքավորումների պլանը օգնում են ճիշտ տեղադրել էլեկտրական և սանտեխնիկական կետերը։",
          },
        ],
        calculatorLabel: "Հաշվել վերանորոգման արժեքը",
        contactLabel: "Պատվիրել նորակառույցի զննում",
        relatedTitle: "Կապված ծառայություններ",
      },
    },
  },
  {
    slug: "turnkey-renovation",
    kind: "service",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=85",
    relatedServiceSlugs: ["renovation", "interior-design", "design"],
    relatedLandingSlugs: [
      "apartment-renovation-yerevan",
      "new-build-renovation",
      "prices",
    ],
    translations: {
      ru: {
        eyebrow: "Комплексный ремонт",
        title: "Полный ремонт квартиры в Ереване",
        description:
          "Организуем полный ремонт квартиры в Ереване: от осмотра и сметы до финальной проверки объекта.",
        seoTitle: "Полный ремонт квартиры в Ереване | SHINEX",
        seoDescription:
          "Полный ремонт квартиры в Ереване: согласованный комплекс работ, этапы и расчет стоимости после осмотра.",
        introduction: [
          "Полный ремонт квартиры — это согласованный комплекс работ, а не фиксированный набор без учёта объекта. Мы выстраиваем процесс от исходного состояния помещения до финальной сдачи.",
          "До начала обсуждаем задачи, состав работ, решения и порядок взаимодействия. Финальный перечень и смета формируются после осмотра.",
        ],
        sections: [
          {
            title: "Что может входить в полный ремонт квартиры",
            paragraphs: ["Состав зависит от объекта и согласованного проекта."],
            items: [
              "Обмеры, планировка и подготовка сметы.",
              "Демонтаж и подготовка поверхностей.",
              "Электрика, сантехника, выравнивание и стяжка.",
              "Плитка, покрытия, потолки, покраска и двери.",
              "Установка согласованного оборудования, проверка и сдача.",
            ],
          },
          {
            title: "Почему важен единый план",
            paragraphs: [
              "Когда инженерные и отделочные работы связаны общей последовательностью, проще контролировать решения, сроки и совместимость материалов. Это не исключает изменений, но помогает согласовывать их до выполнения.",
            ],
          },
          {
            title: "Как получить точный расчет",
            paragraphs: [
              "Отправьте площадь, планировку и краткое описание задачи либо закажите осмотр. Калькулятор даст предварительный ориентир, а точную смету готовим после изучения объекта.",
            ],
          },
        ],
        faqs: [
          {
            question: "Включены ли материалы в полный ремонт квартиры?",
            answer:
              "Это зависит от согласованного формата проекта. Смета должна отдельно обозначать состав работ и материалов.",
          },
          {
            question: "Можно ли начать без дизайн-проекта?",
            answer:
              "Да, если решений достаточно для выполнения работ. Для сложной планировки или большого числа инженерных изменений дизайн-проект помогает согласовать их заранее.",
          },
        ],
        calculatorLabel: "Получить предварительный расчет",
        contactLabel: "Обсудить полный ремонт квартиры",
        relatedTitle: "Связанные услуги",
      },
      en: {
        eyebrow: "Complete renovation",
        title: "Complete apartment renovation in Yerevan",
        description:
          "We coordinate complete apartment renovation in Yerevan, from survey and estimate through final property inspection.",
        seoTitle: "Complete Apartment Renovation in Yerevan | SHINEX",
        seoDescription:
          "Complete apartment renovation in Yerevan: scope, stages, and a cost estimate following a property survey.",
        introduction: [
          "Complete apartment renovation is an agreed scope of coordinated work, not a fixed package that ignores the property. We plan the process from the starting condition through final handover.",
          "Before work begins, we discuss the brief, scope, decisions, and workflow. The final list and estimate follow a property survey.",
        ],
        sections: [
          {
            title: "What complete apartment renovation can include",
            paragraphs: ["The scope follows the property and agreed project."],
            items: [
              "Measurements, layout, and estimate preparation.",
              "Demolition and substrate preparation.",
              "Electrical, plumbing, levelling, and screed work.",
              "Tiling, floors, ceilings, painting, and doors.",
              "Agreed fixture installation, inspection, and handover.",
            ],
          },
          {
            title: "Why one plan matters",
            paragraphs: [
              "When building-services and finishing work follow one sequence, decisions, timing, and material compatibility are easier to control. Changes can still happen, but are agreed before work is done.",
            ],
          },
          {
            title: "How to get an accurate estimate",
            paragraphs: [
              "Send the area, plan, and a short brief, or request a survey. The calculator gives an initial guide; a precise estimate follows a property review.",
            ],
          },
        ],
        faqs: [
          {
            question:
              "Are materials included in complete apartment renovation?",
            answer:
              "That depends on the agreed project format. The estimate should clearly show the scope of work and materials.",
          },
          {
            question:
              "Can renovation begin without an interior design project?",
            answer:
              "Yes, when decisions are sufficient for delivery. For a complex layout or significant services changes, a design project helps agree them beforehand.",
          },
        ],
        calculatorLabel: "Get an initial estimate",
        contactLabel: "Discuss complete apartment renovation",
        relatedTitle: "Related services",
      },
      hy: {
        eyebrow: "Համալիր վերանորոգում",
        title: "Բնակարանի ամբողջական վերանորոգում Երևանում",
        description:
          "Կազմակերպում ենք բնակարանի ամբողջական վերանորոգումը Երևանում՝ զննումից և նախահաշվից մինչև օբյեկտի վերջնական ստուգում։",
        seoTitle: "Բնակարանի ամբողջական վերանորոգում Երևանում — SHINEX",
        seoDescription:
          "Բնակարանի ամբողջական վերանորոգում Երևանում՝ աշխատանքների կազմ, փուլեր և զննումից հետո արժեքի հաշվարկ։",
        introduction: [
          "Բնակարանի ամբողջական վերանորոգումը համաձայնեցված համալիր աշխատանք է, ոչ թե օբյեկտից անկախ ֆիքսված փաթեթ։ Կազմակերպում ենք ընթացքը բնակարանի ելակետային վիճակից մինչև վերջնական հանձնում։",
          "Մինչ մեկնարկը քննարկում ենք խնդիրը, աշխատանքի ծավալը, լուծումներն ու փոխգործակցության կարգը։ Վերջնական ցանկն ու նախահաշիվը կազմվում են զննումից հետո։",
        ],
        sections: [
          {
            title: "Ի՞նչ կարող է ներառել բնակարանի ամբողջական վերանորոգումը",
            paragraphs: ["Կազմը կախված է օբյեկտից և համաձայնեցված նախագծից։"],
            items: [
              "Չափագրում, հատակագիծ և նախահաշվի կազմում։",
              "Ապամոնտաժում և մակերեսների նախապատրաստում։",
              "Էլեկտրականություն, սանտեխնիկա, հարթեցում և ստյաժկա։",
              "Սալիկ, ծածկույթներ, առաստաղներ, ներկում և դռներ։",
              "Համաձայնեցված սարքավորումների տեղադրում, ստուգում և հանձնում։",
            ],
          },
          {
            title: "Ինչո՞ւ է կարևոր միասնական պլանը",
            paragraphs: [
              "Երբ ինժեներական և հարդարման աշխատանքները միավորված են մեկ հերթականությամբ, ավելի հեշտ է վերահսկել լուծումները, ժամկետները և նյութերի համատեղելիությունը։ Փոփոխությունները հնարավոր են, բայց համաձայնեցվում են կատարելուց առաջ։",
            ],
          },
          {
            title: "Ինչպե՞ս ստանալ ճշգրիտ հաշվարկ",
            paragraphs: [
              "Ուղարկեք մակերեսը, հատակագիծը և խնդրի կարճ նկարագրությունը կամ պատվիրեք զննում։ Հաշվիչը հնարավորություն է տալիս ստանալ նախնական արժեքի հաշվարկ, իսկ ճշգրիտ նախահաշիվը կազմում ենք օբյեկտը ուսումնասիրելուց հետո։",
            ],
          },
        ],
        faqs: [
          {
            question:
              "Նյութերը ներառվո՞ւմ են բնակարանի ամբողջական վերանորոգման մեջ",
            answer:
              "Դա կախված է համաձայնեցված ձևաչափից։ Նախահաշվում պետք է հստակ նշված լինի աշխատանքների և նյութերի կազմը։",
          },
          {
            question: "Հնարավո՞ր է սկսել առանց դիզայն-նախագծի",
            answer:
              "Այո, երբ իրականացնելու համար որոշումները բավարար են։ Բարդ հատակագծի կամ լուրջ ինժեներական փոփոխությունների դեպքում դիզայն-նախագիծն օգնում է դրանք նախապես համաձայնեցնել։",
          },
        ],
        calculatorLabel: "Ստանալ նախնական հաշվարկ",
        contactLabel: "Քննարկել ամբողջական վերանորոգումը",
        relatedTitle: "Կապված ծառայություններ",
      },
    },
  },
  {
    slug: "prices",
    kind: "prices",
    image: apartmentImage,
    relatedServiceSlugs: ["renovation", "interior-design", "design"],
    relatedLandingSlugs: [
      "apartment-renovation-yerevan",
      "turnkey-renovation",
      "new-build-renovation",
    ],
    translations: {
      ru: {
        eyebrow: "Стоимость ремонта",
        title: "Цены на ремонт квартир в Ереване",
        description:
          "Что влияет на стоимость ремонта квартиры и как получить точную смету после осмотра.",
        seoTitle: "Цены на ремонт квартир в Ереване | SHINEX",
        seoDescription:
          "Стоимость ремонта квартиры в Ереване: факторы цены за м² и точный расчет после осмотра объекта.",
        introduction: [
          "Стоимость ремонта квартиры в Ереване рассчитывается по фактическому объёму работ. Ориентир полезен для планирования, но предложения сравнивают только при одинаковом составе работ и материалов.",
          "Мы не публикуем универсальную цену, если она не отражает состояние конкретного объекта. Финальная стоимость определяется после осмотра и согласования решений.",
        ],
        sections: [
          {
            title: "Что влияет на цену ремонта",
            paragraphs: [
              "Площадь важна, но не является единственным параметром расчёта.",
            ],
            items: [
              "Состояние стен, пола, потолка и необходимость демонтажа.",
              "Количество и сложность электрических и сантехнических работ.",
              "Тип ремонта: косметический, капитальный или под ключ.",
              "Материалы, плитка, потолки, двери и другие решения.",
            ],
          },
          {
            title: "Почему цена за м² — только ориентир",
            paragraphs: [
              "Стоимость за квадратный метр полезна для первоначального планирования, если известны её состав и ограничения. Она не показывает подготовительные и инженерные работы, необходимые конкретной квартире.",
            ],
          },
          {
            title: "Как получить смету",
            paragraphs: [
              "Используйте калькулятор для предварительного диапазона и закажите осмотр. Для расчёта полезны площадь, планировка, фотографии текущего состояния и перечень желаемых работ.",
            ],
          },
        ],
        faqs: [
          {
            question: "Можно ли узнать точную цену ремонта по телефону?",
            answer:
              "Можно обсудить ориентир, но точная смета без осмотра и состава работ невозможна.",
          },
          {
            question: "Что должно быть в смете?",
            answer:
              "В ней должны быть объём работ, единицы измерения, стоимость работ и отдельно оговорённые материалы или условия.",
          },
        ],
        calculatorLabel: "Рассчитать стоимость ремонта",
        contactLabel: "Заказать осмотр и смету",
        relatedTitle: "Услуги для расчета",
      },
      en: {
        eyebrow: "Renovation costs",
        title: "Apartment renovation prices in Yerevan",
        description:
          "What shapes apartment renovation cost and how to obtain an accurate estimate after a property survey.",
        seoTitle: "Apartment Renovation Prices in Yerevan | SHINEX",
        seoDescription:
          "Apartment renovation cost in Yerevan: per-m² price factors and an accurate estimate after a property survey.",
        introduction: [
          "Apartment renovation cost in Yerevan is calculated from the actual scope. An initial guide helps planning, but offers can only be compared fairly when they include the same work and materials.",
          "We do not publish one universal figure when it would misrepresent a property’s condition. The final cost follows a survey and agreed solutions.",
        ],
        sections: [
          {
            title: "What affects renovation price",
            paragraphs: [
              "Area matters, but it is not the only calculation input.",
            ],
            items: [
              "Wall, floor, and ceiling condition and demolition needs.",
              "Quantity and complexity of electrical and plumbing work.",
              "Renovation type: cosmetic, capital, or turnkey.",
              "Materials, tiling, ceilings, doors, and other choices.",
            ],
          },
          {
            title: "Why a per-m² price is only a guide",
            paragraphs: [
              "A per-square-metre figure supports initial planning when its scope and limits are clear. It cannot show the preparation and building-services work a specific apartment needs.",
            ],
          },
          {
            title: "How to get an estimate",
            paragraphs: [
              "Use the calculator for an initial range and request a survey. Area, a plan, current-condition photos, and a desired-work list help prepare the calculation.",
            ],
          },
        ],
        faqs: [
          {
            question: "Can I get an exact renovation price by phone?",
            answer:
              "We can discuss an initial range, but an exact estimate requires a survey and agreed scope.",
          },
          {
            question: "What should an estimate include?",
            answer:
              "It should show quantities, units, work cost, and separately agreed materials or conditions.",
          },
        ],
        calculatorLabel: "Calculate renovation cost",
        contactLabel: "Request a survey and estimate",
        relatedTitle: "Services to plan your project",
      },
      hy: {
        eyebrow: "Վերանորոգման արժեք",
        title: "Բնակարանների վերանորոգման գներ Երևանում",
        description:
          "Ինչից է կազմվում բնակարանի վերանորոգման արժեքը և ինչպես ստանալ ճշգրիտ նախահաշիվ զննումից հետո։",
        seoTitle: "Բնակարանների վերանորոգման գներ Երևանում | SHINEX",
        seoDescription:
          "Բնակարանի վերանորոգման արժեք Երևանում՝ քմ-ի գնի գործոններ և զննումից հետո ճշգրիտ հաշվարկ։",
        introduction: [
          "Բնակարանի վերանորոգման արժեքը Երևանում հաշվարկվում է աշխատանքի իրական ծավալից։ Նախնական միջակայքը հարմար է պլանավորման համար, սակայն առաջարկները ճիշտ է համեմատել միայն նույն աշխատանքների և նյութերի կազմի դեպքում։",
          "Մենք մեկ ընդհանուր գին չենք հրապարակում, եթե այն չի արտացոլում կոնկրետ օբյեկտի վիճակը։ Վերջնական արժեքը որոշվում է զննումից և լուծումների համաձայնեցումից հետո։",
        ],
        sections: [
          {
            title: "Ի՞նչն է ազդում վերանորոգման գնի վրա",
            paragraphs: ["Մակերեսը կարևոր է, բայց հաշվարկի միակ չափանիշը չէ։"],
            items: [
              "Պատերի, հատակի, առաստաղի վիճակը և ապամոնտաժման անհրաժեշտությունը։",
              "Էլեկտրական և սանտեխնիկական աշխատանքների քանակն ու բարդությունը։",
              "Վերանորոգման տեսակը՝ կոսմետիկ, կապիտալ կամ ամբողջական։",
              "Նյութերը, սալիկը, առաստաղները, դռները և այլ լուծումներ։",
            ],
          },
          {
            title: "Ինչու է քմ-ի գինը միայն նախնական ցուցանիշ",
            paragraphs: [
              "Քառակուսի մետրի արժեքը օգնում է սկզբնական պլանավորմանը, եթե պարզ է դրա կազմն ու սահմանափակումները։ Այն չի ցույց տալիս կոնկրետ բնակարանի նախապատրաստական և ինժեներական աշխատանքները։",
            ],
          },
          {
            title: "Ինչպե՞ս ստանալ նախահաշիվ",
            paragraphs: [
              "Օգտագործեք հաշվիչը նախնական միջակայքի համար և պատվիրեք զննում։ Հաշվարկին օգնում են մակերեսը, հատակագիծը, ներկա վիճակի լուսանկարները և ցանկալի աշխատանքների ցանկը։",
            ],
          },
        ],
        faqs: [
          {
            question: "Հնարավո՞ր է հեռախոսով իմանալ ճշգրիտ գինը",
            answer:
              "Կարող ենք քննարկել նախնական միջակայքը, սակայն ճշգրիտ նախահաշիվը պահանջում է զննում և համաձայնեցված աշխատանքների կազմ։",
          },
          {
            question: "Ի՞նչ պետք է ներառի նախահաշիվը",
            answer:
              "Այն պետք է նշի աշխատանքի ծավալները, չափման միավորները, արժեքը և առանձին համաձայնեցված նյութերը կամ պայմանները։",
          },
        ],
        calculatorLabel: "Հաշվել վերանորոգման արժեքը",
        contactLabel: "Պատվիրել զննում և նախահաշիվ",
        relatedTitle: "Նախագիծը պլանավորելու ծառայություններ",
      },
    },
  },
] as const satisfies readonly SeoLandingPage[];

/**
 * Each landing page targets a distinct customer need. Keep variants of the
 * same intent on one canonical page instead of creating keyword-only copies.
 */
export const seoLandingPages = [
  ...coreSeoLandingPages,
  ...extraSeoLandingPages,
] as const satisfies readonly SeoLandingPage[];

export type SeoLandingSlug = (typeof seoLandingPages)[number]["slug"];

export function getSeoLandingPath(page: Pick<SeoLandingPage, "kind" | "slug">) {
  return page.kind === "service" ? `services/${page.slug}` : page.slug;
}

export function getSeoLandingPage(locale: Locale, slug: string) {
  const page = seoLandingPages.find((item) => item.slug === slug);
  return page ? { ...page, content: page.translations[locale] } : undefined;
}
