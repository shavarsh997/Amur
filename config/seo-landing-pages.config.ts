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

/** Apartment renovation, project coordination and budget planning have distinct roles. */
const coreSeoLandingPages = [
  {
    slug: "apartment-renovation-yerevan",
    kind: "service",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85",
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
          "От осмотра квартиры до готовой отделки: планируем работы с учётом состояния помещения, вашей планировки и выбранных материалов.",
        seoTitle: "Ремонт квартир в Ереване | SHINEX",
        seoDescription:
          "Ремонт квартир в Ереване: подготовка помещения, электрика, сантехника и отделка. Состав работ для новостройки и вторичного жилья, расчёт стоимости.",
        introduction: [
          "Ремонт квартиры в Ереване начинаем с осмотра и замеров. Затем составляем смету и согласуем перечень работ: подготовку поверхностей, электрику, сантехнику и отделку.",
          "В новостройке проверяем, в каком состоянии застройщик передал помещение. В квартире со старым ремонтом определяем, какие покрытия и системы можно сохранить, а какие нужно заменить.",
        ],
        sections: [
          {
            title: "Что учитываем перед ремонтом",
            paragraphs: [
              "Площадь квартиры не показывает весь объём работ. Важно знать состояние стен и пола, расположение кухни и санузла, количество розеток и выбранную отделку.",
            ],
            items: [
              "Планировка и расстановка мебели.",
              "Состояние существующей проводки и труб.",
              "Участки демонтажа и поверхности под отделку.",
              "Материалы для пола, стен и потолка.",
            ],
          },
          {
            title: "Как проходят работы",
            paragraphs: [
              "Последовательность зависит от квартиры и проекта. Расположение проводки, труб и оборудования определяем до финишной отделки.",
            ],
            items: [
              "Осмотр, замеры и согласование сметы.",
              "Демонтаж и подготовка помещения при необходимости.",
              "Электрика, сантехника и подготовка поверхностей.",
              "Плитка, покраска и напольные покрытия.",
              "Установка согласованного оборудования и проверка результата.",
            ],
          },
          {
            title: "Выберите подходящий объём ремонта",
            paragraphs: [
              "Для обновления покрытий может быть достаточно косметического ремонта. При изношенной проводке, трубах и основаниях нужен капитальный ремонт. Формат «под ключ» относится к организации всего проекта и отдельно определяет, какие этапы ведёт одна компания.",
            ],
          },
          {
            title: "Как рассчитать стоимость",
            paragraphs: [
              "Для первого расчёта укажите площадь и состояние квартиры. Затем уточняем объёмы демонтажа, электрики, сантехники и отделки. В разделе стоимости можно посмотреть структуру бюджета и воспользоваться калькулятором.",
            ],
          },
        ],
        faqs: [
          {
            question: "Что нужно подготовить для оценки квартиры?",
            answer:
              "Площадь, адрес, фотографии текущего состояния и планировку, если она есть. Также укажите, хотите ли вы обновить отделку или изменить расположение кухни, санузла и мебели.",
          },
          {
            question: "Нужно ли менять всю проводку и сантехнику?",
            answer:
              "Решение зависит от состояния существующих систем и будущей нагрузки. Перечень замены определяем после осмотра, а не только по возрасту квартиры.",
          },
          {
            question: "Что согласовывается до начала отделки?",
            answer:
              "Расстановка мебели, расположение розеток, освещения, сантехники и выбор покрытий. Это позволяет предусмотреть необходимые подключения до закрытия стен и пола.",
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
          "Plan your apartment renovation around the property condition, your preferred layout and the finishes you choose.",
        seoTitle: "Apartment Renovation in Yerevan | SHINEX",
        seoDescription:
          "Apartment renovation in Yerevan, from property assessment to electrical work, plumbing and finishes. Explore the work involved and plan your budget.",
        introduction: [
          "SHINEX starts an apartment renovation with a site visit and measurements. We then prepare an estimate covering surface preparation, electrical work, plumbing and finishes.",
          "For a newly built apartment, we check the condition in which it was handed over. For an older apartment, we assess which finishes and systems can stay and which need replacing.",
        ],
        sections: [
          {
            title: "What we review before work begins",
            paragraphs: [
              "Floor area is only part of the picture. Wall and floor condition, kitchen and bathroom layouts, electrical outlets and finish choices all affect the work.",
            ],
            items: [
              "Room layout and furniture placement.",
              "Existing wiring and pipework.",
              "Demolition and surface preparation.",
              "Floor, wall and ceiling finishes.",
            ],
          },
          {
            title: "From preparation to completion",
            paragraphs: [
              "The sequence follows the property and design. Wiring, pipes and equipment locations are planned before final finishes.",
            ],
            items: [
              "Site visit, measurements and estimate.",
              "Demolition and preparation where needed.",
              "Electrical work, plumbing and surface preparation.",
              "Tiling, painting and floor coverings.",
              "Installation of agreed fixtures and final inspection.",
            ],
          },
          {
            title: "Choosing the scope of renovation",
            paragraphs: [
              "Redecoration may be enough to refresh sound surfaces. Major renovation deals with worn wiring, pipes and surfaces. A complete renovation service describes who coordinates the project; its scope needs to specify which stages are included.",
            ],
          },
          {
            title: "Planning the budget",
            paragraphs: [
              "Start with the area and condition of your apartment. Demolition, wiring, plumbing and finishing quantities refine the estimate. Visit our cost guide for a budget breakdown and calculator.",
            ],
          },
        ],
        faqs: [
          {
            question: "What should I send for an initial assessment?",
            answer:
              "Send the area, address, current photographs and a floor plan if available. Explain whether you want to refresh the finishes or change the kitchen, bathroom or furniture layout.",
          },
          {
            question: "Does all wiring and plumbing need replacing?",
            answer:
              "That depends on the condition of the existing systems and the future electrical and plumbing requirements. The replacement scope is assessed on site rather than based on the age of the apartment alone.",
          },
          {
            question: "Which decisions should be made before finishing?",
            answer:
              "Furniture positions, outlets, lighting, plumbing fixtures and finishes. Agreeing these early lets the necessary connections be planned before walls and floors are finished.",
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
          "Բնակարանի վերանորոգումը պլանավորում ենք՝ հաշվի առնելով տարածքի վիճակը, ձեր նախընտրած դասավորությունն ու հարդարման նյութերը։",
        seoTitle: "Բնակարանների վերանորոգում Երևանում | SHINEX",
        seoDescription:
          "Բնակարանների վերանորոգում Երևանում՝ տարածքի նախապատրաստում, էլեկտրական և սանտեխնիկական աշխատանքներ, հարդարում ու արժեքի հաշվարկ։",
        introduction: [
          "SHINEX-ը Երևանում բնակարանների վերանորոգումը սկսում է տարածքի զննումից ու չափագրումից։ Այնուհետև կազմում ենք նախահաշիվ և համաձայնեցնում նախապատրաստական, էլեկտրական, սանտեխնիկական ու հարդարման աշխատանքների ցանկը։",
          "Նորակառույցում ստուգում ենք կառուցապատողի հանձնած բնակարանի վիճակը։ Հին վերանորոգմամբ բնակարանում պարզում ենք՝ որ ծածկույթներն ու համակարգերը կարելի է պահպանել, և որոնք են փոխարինման կարիք ունենում։",
        ],
        sections: [
          {
            title: "Ի՞նչ ենք հաշվի առնում մինչև աշխատանքը սկսելը",
            paragraphs: [
              "Միայն բնակարանի մակերեսը բավարար չէ աշխատանքների ծավալը որոշելու համար։ Կարևոր են պատերի ու հատակի վիճակը, խոհանոցի և սանհանգույցի դասավորությունը, վարդակների քանակն ու ընտրված հարդարումը։",
            ],
            items: [
              "Սենյակների հատակագիծը և կահույքի տեղադրությունը։",
              "Առկա էլեկտրալարերի և խողովակների վիճակը։",
              "Ապամոնտաժման ենթակա հատվածներն ու հարդարման մակերեսները։",
              "Պատերի, հատակի և առաստաղի նյութերը։",
            ],
          },
          {
            title: "Ինչպե՞ս են կատարվում աշխատանքները",
            paragraphs: [
              "Փուլերի հերթականությունը որոշում ենք ըստ բնակարանի և նախագծի։ Էլեկտրալարերի, խողովակների ու սարքավորումների տեղերը ճշտում ենք մինչև վերջնական հարդարումը։",
            ],
            items: [
              "Զննում, չափագրում և նախահաշվի համաձայնեցում։",
              "Անհրաժեշտ ապամոնտաժում և տարածքի նախապատրաստում։",
              "Էլեկտրական ու սանտեխնիկական աշխատանքներ, մակերեսների նախապատրաստում։",
              "Սալիկապատում, ներկում և հատակի ծածկույթի տեղադրում։",
              "Համաձայնեցված սարքավորումների տեղադրում և վերջնական ստուգում։",
            ],
          },
          {
            title: "Վերանորոգման ո՞ր տարբերակն ընտրել",
            paragraphs: [
              "Լավ վիճակում գտնվող մակերեսների հարդարումը թարմացնելու համար կարող է բավարար լինել կոսմետիկ վերանորոգումը։ Մաշված էլեկտրալարերը, խողովակներն ու մակերեսները վերականգնելու համար անհրաժեշտ է կապիտալ վերանորոգում։ Ամբողջական վերանորոգման դեպքում առանձին սահմանում ենք, թե որ փուլերն է կազմակերպում մեկ ընկերությունը։",
            ],
          },
          {
            title: "Ինչպե՞ս հաշվարկել արժեքը",
            paragraphs: [
              "Սկզբում նշեք բնակարանի մակերեսն ու վիճակը։ Հետո ճշտում ենք ապամոնտաժման, էլեկտրական, սանտեխնիկական և հարդարման աշխատանքների ծավալները։ Արժեքի բաժնում կարող եք ծանոթանալ բյուջեի կազմին և օգտվել հաշվիչից։",
            ],
          },
        ],
        faqs: [
          {
            question: "Ի՞նչ ուղարկել նախնական գնահատման համար։",
            answer:
              "Նշեք մակերեսն ու հասցեն, ուղարկեք ներկա վիճակի լուսանկարները և հատակագիծը, եթե ունեք։ Գրեք նաև՝ ուզում եք թարմացնել միայն հարդարումը, թե փոխել խոհանոցի, սանհանգույցի կամ կահույքի դասավորությունը։",
          },
          {
            question: "Պե՞տք է փոխարինել բոլոր էլեկտրալարերն ու խողովակները։",
            answer:
              "Դա կախված է առկա համակարգերի վիճակից և հետագա օգտագործման պահանջներից։ Փոխարինման ցանկը որոշում ենք զննումից հետո՝ հաշվի առնելով ոչ միայն բնակարանի տարիքը։",
          },
          {
            question: "Ի՞նչ պետք է որոշել մինչև հարդարումը։",
            answer:
              "Կահույքի, վարդակների, լուսավորության ու սանտեխնիկայի տեղերը և հարդարման նյութերը։ Այդպես անհրաժեշտ միացումները հնարավոր է նախատեսել մինչև պատերն ու հատակը վերջնական հարդարելը։",
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
          "В квартире от застройщика проверяем стены, пол, проёмы, расположение розеток и выводов воды. По результатам осмотра определяем, что нужно подготовить до чистовой отделки.",
          "Расстановку мебели, освещение и сантехнику согласовываем заранее: необходимые подключения проще предусмотреть до укладки плитки, покраски и монтажа покрытий.",
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
              "Проводку и трубы планируем до финишной отделки. Порядок подготовительных работ уточняется по проекту и состоянию квартиры.",
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
              "Сроки и бюджет зависят от готовности квартиры, площади, числа розеток, освещения и подключений воды, выбранных материалов и сложности решений. Точную смету можно подготовить после осмотра объекта.",
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
          {
            question: "Что уточнить у застройщика перед ремонтом?",
            answer:
              "Какие работы выполнены при передаче квартиры и какие сведения есть об инженерных системах. Если доступны планы подключения и документы о состоянии помещения, передайте их вместе с планировкой.",
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
          "Finish your new-build apartment with the wiring, plumbing, surface preparation and interior finishes planned before you move in.",
        seoTitle: "New-Build Apartment Renovation in Yerevan | SHINEX",
        seoDescription:
          "New apartment renovation in Yerevan: base and finishing stages, timing, and cost factors from SHINEX.",
        introduction: [
          "We begin by checking what the developer has provided: walls, floors, openings and utility connections. This establishes the preparation and finishing work still needed.",
          "Agree furniture, lighting and plumbing fixture positions early so the necessary connections can be planned before surfaces are finished.",
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
              "Plan concealed wiring and pipework before final finishes. The preparation sequence follows the design and the condition of the apartment.",
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
          {
            question: "What information should I request from the developer?",
            answer:
              "Ask what work has been completed at handover and what information is available about utility connections. Share any connection plans and handover documents with the apartment layout.",
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
          "Նորակառույց բնակարանի վերանորոգում՝ պատերի ու հատակի նախապատրաստումից մինչև էլեկտրական, սանտեխնիկական և հարդարման աշխատանքներ։",
        seoTitle: "Նորակառույց բնակարանի վերանորոգում Երևանում | SHINEX",
        seoDescription:
          "Նորակառույց բնակարանի վերանորոգում Երևանում՝ վիճակի ստուգում, նախապատրաստական ու հարդարման աշխատանքներ, փուլերի և բյուջեի պլանավորում։",
        introduction: [
          "Կառուցապատողի հանձնած բնակարանում նախ ստուգում ենք պատերի, հատակի, դռների ու պատուհանների բացվածքների և ինժեներական համակարգերի վիճակը։ Զննումից հետո որոշում ենք, թե ինչ աշխատանքներ են անհրաժեշտ մինչև վերջնական հարդարումը։",
          "Կահույքի, վարդակների, լուսավորության ու սանտեխնիկայի տեղերը ճշտում ենք նախապես։ Այդպես խողովակներն ու էլեկտրալարերը հնարավոր է անցկացնել մինչև պատրաստ մակերեսները հարդարելը։",
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
              "Սկզբում պլանավորում ենք թաքնված խողովակներն ու էլեկտրալարերը, ապա անցնում մակերեսների նախապատրաստմանն ու հարդարմանը՝ ըստ նախագծի։",
            ],
            items: [
              "Չափագրում, հատակագիծ և նախահաշիվ։",
              "Սվաղ, հարթեցում և հատակի հարթեցնող շերտ (ստյաժկա)՝ անհրաժեշտության դեպքում։",
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
            question: "Նորակառույցում հատակի հարթեցնող շերտ (ստյաժկա) պե՞տք է",
            answer:
              "Դա որոշվում է հատակի իրական վիճակից և ընտրված ծածկույթից։ Ստուգումից հետո պարզ է՝ անհրաժեշտ է տեղային հարթեցում, թե ամբողջական ստյաժկա։",
          },
          {
            question: "Ե՞րբ պատվիրել ինտերիերի դիզայն",
            answer:
              "Լավ է՝ ինժեներական աշխատանքներից առաջ․ հատակագիծն ու սարքավորումների պլանը օգնում են ճիշտ տեղադրել էլեկտրական և սանտեխնիկական կետերը։",
          },
          {
            question: "Ի՞նչ տեղեկություն խնդրել կառուցապատողից։",
            answer:
              "Ճշտեք՝ ինչ աշխատանքներ են կատարված բնակարանը հանձնելիս և ինչ տվյալներ կան ինժեներական համակարգերի մասին։ Եթե ունեք միացումների պլաններ ու հանձնման փաստաթղթեր, ուղարկեք դրանք հատակագծի հետ։",
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
        title: "Ремонт под ключ в Ереване",
        description:
          "Организация ремонта одной компанией: определяем состав проекта, связываем этапы и согласовываем решения до выполнения работ.",
        seoTitle: "Ремонт под ключ в Ереване: состав и этапы | SHINEX",
        seoDescription:
          "Ремонт под ключ в Ереване: какие работы включить, как согласовать материалы, этапы и изменения. Подготовьте проект к работе с SHINEX.",
        introduction: [
          "При ремонте под ключ важно заранее определить границы проекта: какие работы выполняет SHINEX, какие материалы нужны и что входит в сдачу объекта.",
          "Косметический или капитальный ремонт описывает объём изменений в помещении. «Под ключ» описывает организацию этих работ. Поэтому состав такого ремонта фиксируем для вашей квартиры или дома.",
        ],
        sections: [
          {
            title: "Что включить в перечень работ",
            paragraphs: [
              "По результатам осмотра составляем последовательность от подготовки помещения до проверки отделки и установленного оборудования.",
            ],
            items: [
              "Замеры и подготовка сметы.",
              "Демонтаж и подготовка поверхностей при необходимости.",
              "Электрика, сантехника и отделка.",
              "Установка оборудования из согласованного перечня.",
              "Проверка выполненных работ и сдача объекта.",
            ],
          },
          {
            title: "Материалы, закупки и дизайн",
            paragraphs: [
              "До старта нужно определить, кто выбирает, закупает и доставляет материалы. Дизайн-проект, мебель и отдельное оборудование обсуждаются отдельно: они не считаются автоматически включёнными в стоимость ремонта.",
            ],
          },
          {
            title: "Как согласовывать изменения",
            paragraphs: [
              "Изменение планировки, материалов или состава работ может повлиять на смету и сроки. Новое решение обсуждаем до выполнения соответствующего этапа, чтобы обновлённые требования были понятны всем участникам.",
            ],
          },
        ],
        faqs: [
          {
            question: "Все материалы входят в ремонт под ключ?",
            answer:
              "Это определяется сметой. В ней нужно отдельно указать работы, материалы, доставку и оборудование, а также кто отвечает за закупку.",
          },
          {
            question: "Чем ремонт под ключ отличается от капитального?",
            answer:
              "Капитальный ремонт описывает глубину обновления помещения и инженерных систем. Под ключ — способ организации проекта, при котором компания ведёт согласованные этапы до сдачи.",
          },
          {
            question: "Можно ли работать по готовому дизайн-проекту?",
            answer:
              "Пришлите проект вместе с данными объекта. Проверяем, достаточно ли в нём планов, размеров и указаний по материалам для составления сметы и выполнения работ.",
          },
        ],
        calculatorLabel: "Получить предварительный расчет",
        contactLabel: "Обсудить ремонт под ключ",
        relatedTitle: "Связанные услуги",
      },
      en: {
        eyebrow: "Complete renovation",
        title: "Complete renovation service in Yerevan",
        description:
          "Bring the renovation stages together with one company, an agreed scope and decisions made before work begins.",
        seoTitle: "Complete Renovation Service in Yerevan | SHINEX",
        seoDescription:
          "A complete renovation service in Yerevan. Plan the work, materials, responsibilities and handover with SHINEX.",
        introduction: [
          "A complete renovation starts with a clear scope: the work SHINEX will carry out, the materials required and what is included at handover.",
          "Major renovation describes how much a property changes. A complete or turnkey service describes how the project is managed. The actual scope is agreed for your apartment or house.",
        ],
        sections: [
          {
            title: "Define the work from start to finish",
            paragraphs: [
              "The property assessment establishes a sequence from preparation to checking the finishes and installed fixtures.",
            ],
            items: [
              "Measurements and estimate.",
              "Demolition and surface preparation where needed.",
              "Electrical work, plumbing and finishes.",
              "Installation of agreed fixtures and equipment.",
              "Final inspection and handover.",
            ],
          },
          {
            title: "Materials, purchasing and design",
            paragraphs: [
              "Decide who selects, buys and delivers materials before work starts. Interior design, furniture and individual appliances are discussed separately and are not automatically included in the renovation price.",
            ],
          },
          {
            title: "Agreeing changes during the project",
            paragraphs: [
              "Changes to layouts, materials or work can affect the budget and schedule. We discuss the new requirements before the relevant stage begins so everyone works from the same plan.",
            ],
          },
        ],
        faqs: [
          {
            question: "Are all materials included?",
            answer:
              "The estimate needs to state which materials, deliveries and equipment are included, alongside labour, and who is responsible for purchasing them.",
          },
          {
            question: "How does this differ from major renovation?",
            answer:
              "Major renovation describes the extent of changes to the property and its systems. A complete service describes the coordination of agreed stages through to handover.",
          },
          {
            question: "Can you work from an existing interior design?",
            answer:
              "Send the design and property details. We review whether the plans, dimensions and material specifications provide enough information to prepare an estimate and carry out the work.",
          },
        ],
        calculatorLabel: "Get an initial estimate",
        contactLabel: "Discuss a complete renovation",
        relatedTitle: "Related services",
      },
      hy: {
        eyebrow: "Համալիր վերանորոգում",
        title: "Ամբողջական վերանորոգում Երևանում",
        description:
          "Վերանորոգման փուլերը կազմակերպում ենք մեկ ընկերության շրջանակում՝ նախապես հստակեցնելով աշխատանքները, նյութերն ու պատասխանատվությունը։",
        seoTitle: "Ամբողջական վերանորոգում Երևանում | SHINEX",
        seoDescription:
          "Ամբողջական վերանորոգում Երևանում՝ աշխատանքների ցանկի, նյութերի, փուլերի և հանձնման պայմանների նախնական համաձայնեցմամբ։",
        introduction: [
          "Ամբողջական վերանորոգում պատվիրելիս կարևոր է նախապես իմանալ՝ ինչ աշխատանքներ է կատարելու SHINEX-ը, ինչ նյութեր են անհրաժեշտ և ինչ վիճակում է հանձնվելու տարածքը։",
          "Կապիտալ վերանորոգումը նկարագրում է տարածքի ու համակարգերի փոփոխությունների ծավալը։ Ամբողջական վերանորոգումը վերաբերում է նաև աշխատանքների կազմակերպմանը, ուստի դրա կազմը սահմանում ենք ձեր բնակարանի կամ տան համար։",
        ],
        sections: [
          {
            title: "Աշխատանքների ցանկը՝ սկզբից մինչև հանձնում",
            paragraphs: [
              "Զննումից հետո որոշում ենք փուլերի հերթականությունը՝ տարածքի նախապատրաստումից մինչև հարդարման և տեղադրված սարքավորումների ստուգում։",
            ],
            items: [
              "Չափագրում և նախահաշվի կազմում։",
              "Անհրաժեշտ ապամոնտաժում և մակերեսների նախապատրաստում։",
              "Էլեկտրական, սանտեխնիկական ու հարդարման աշխատանքներ։",
              "Համաձայնեցված սարքավորումների տեղադրում։",
              "Աշխատանքների ստուգում և տարածքի հանձնում։",
            ],
          },
          {
            title: "Նյութեր, գնումներ և դիզայն",
            paragraphs: [
              "Մինչ մեկնարկը որոշում ենք՝ ով է ընտրում, գնում և առաքում նյութերը։ Դիզայն-նախագիծը, կահույքն ու առանձին սարքավորումները քննարկվում են առանձին և ինքնաբերաբար չեն մտնում վերանորոգման արժեքի մեջ։",
            ],
          },
          {
            title: "Փոփոխությունների համաձայնեցում",
            paragraphs: [
              "Հատակագծի, նյութերի կամ աշխատանքների փոփոխությունը կարող է ազդել բյուջեի և ժամկետների վրա։ Նոր պահանջները քննարկում ենք մինչև համապատասխան փուլը սկսելը, որպեսզի բոլոր մասնակիցներն աշխատեն նույն պլանով։",
            ],
          },
        ],
        faqs: [
          {
            question: "Բոլոր նյութերը ներառվա՞ծ են արժեքի մեջ։",
            answer:
              "Դա պետք է հստակ նշված լինի նախահաշվում։ Առանձին նշվում են աշխատանքները, նյութերը, առաքումն ու սարքավորումները, ինչպես նաև գնումների պատասխանատուն։",
          },
          {
            question: "Ինչո՞վ է ամբողջական վերանորոգումը տարբերվում կապիտալից։",
            answer:
              "Կապիտալ վերանորոգումը վերաբերում է տարածքի և դրա համակարգերի փոփոխությունների ծավալին։ Ամբողջական տարբերակում ընկերությունը կազմակերպում է համաձայնեցված փուլերը մինչև տարածքի հանձնումը։",
          },
          {
            question: "Կարո՞ղ եք աշխատել պատրաստի դիզայն-նախագծով։",
            answer:
              "Ուղարկեք նախագիծն ու տարածքի տվյալները։ Ստուգում ենք՝ արդյոք հատակագծերը, չափերն ու նյութերի նկարագրությունները բավարար են նախահաշիվ կազմելու և աշխատանքը կատարելու համար։",
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
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85",
    relatedServiceSlugs: ["renovation", "interior-design", "design"],
    relatedLandingSlugs: [
      "apartment-renovation-yerevan",
      "turnkey-renovation",
      "new-build-renovation",
    ],
    translations: {
      ru: {
        eyebrow: "Стоимость ремонта",
        title: "Стоимость ремонта в Ереване",
        description:
          "Разберите бюджет на работы, материалы и дополнительные расходы. Рассчитайте предварительную стоимость для вашего объекта прямо на странице.",
        seoTitle: "Стоимость ремонта в Ереване: расчёт бюджета | SHINEX",
        seoDescription:
          "Стоимость ремонта в Ереване: состав бюджета, расчёт площадей, работы и материалы. Калькулятор для предварительной оценки вашей квартиры или дома.",
        introduction: [
          "Бюджет ремонта складывается из конкретных работ и материалов. Цена за квадратный метр полезна только тогда, когда понятно, за какие поверхности и операции вы платите.",
          "Ниже показано, как различаются площадь пола и площадь отделки, что уточнить в предложении подрядчика и как получить предварительный расчёт для своего объекта.",
        ],
        sections: [
          {
            title: "Как сравнивать предложения",
            paragraphs: [
              "Сопоставляйте одинаковый перечень работ. Уточните, входят ли подготовка поверхностей, демонтаж, расходные материалы, доставка и вывоз строительного мусора. Низкая итоговая сумма без этих деталей не позволяет сравнить предложения.",
            ],
          },
          {
            title: "Что потребуется для точной сметы",
            paragraphs: [
              "Подготовьте планировку, фотографии, площадь и список желаемых изменений. После осмотра можно уточнить объёмы работ и выбранные материалы. Подробный разбор документа находится на странице сметы.",
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
        title: "Renovation costs in Yerevan",
        description:
          "Understand labour, materials and additional costs, then use the calculator below to explore a budget for your property.",
        seoTitle: "Renovation Costs in Yerevan: Budget Calculator | SHINEX",
        seoDescription:
          "Plan renovation costs in Yerevan. Understand floor and finishing areas, labour and materials, and use our calculator for an initial estimate.",
        introduction: [
          "A renovation budget is built from the work and materials your property needs. A price per square metre is useful only when you know which surfaces and tasks it covers.",
          "The guide below explains the difference between floor area and finishing area, what to check in a quotation and how to get an initial estimate for your property.",
        ],
        sections: [
          {
            title: "Comparing quotations",
            paragraphs: [
              "Compare the same work in each quotation. Check surface preparation, demolition, consumables, delivery and removal of construction waste. A total without this breakdown is difficult to compare.",
            ],
          },
          {
            title: "Preparing for an accurate estimate",
            paragraphs: [
              "Gather a floor plan, photographs, the area and the changes you want. A site visit helps establish quantities and material requirements. Our estimate guide explains how to read the resulting document.",
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
        title: "Վերանորոգման արժեքը Երևանում",
        description:
          "Ծանոթացեք աշխատանքների, նյութերի և լրացուցիչ ծախսերի կազմին։ Հաշվիչով ստացեք ձեր բնակարանի կամ տան վերանորոգման նախնական արժեքը։",
        seoTitle: "Վերանորոգման արժեքը Երևանում․ բյուջեի հաշվարկ | SHINEX",
        seoDescription:
          "Վերանորոգման արժեքը Երևանում՝ աշխատանքներ, նյութեր և մակերեսների հաշվարկ։ Օգտվեք հաշվիչից՝ ձեր տարածքի նախնական բյուջեն գնահատելու համար։",
        introduction: [
          "Վերանորոգման բյուջեն ձևավորվում է անհրաժեշտ աշխատանքների և նյութերի արժեքից։ Մեկ քառակուսի մետրի գինը համեմատելու համար պետք է իմանալ՝ որ մակերեսներն ու աշխատանքներն են ներառված դրա մեջ։",
          "Ստորև կտեսնեք՝ ինչով է հատակի մակերեսը տարբերվում հարդարման մակերեսից, ինչ ճշտել գնային առաջարկում և ինչպես ստանալ ձեր տարածքի նախնական հաշվարկը։",
        ],
        sections: [
          {
            title: "Ինչպե՞ս համեմատել առաջարկները",
            paragraphs: [
              "Համեմատեք նույն աշխատանքների ցանկը։ Ճշտեք՝ ներառված են արդյոք մակերեսների նախապատրաստումը, ապամոնտաժումը, օժանդակ նյութերը, առաքումն ու շինարարական աղբի տեղափոխումը։ Առանց այս մանրամասների միայն վերջնական գումարը բավարար չէ առաջարկները համեմատելու համար։",
            ],
          },
          {
            title: "Ի՞նչ պատրաստել ճշգրիտ նախահաշվի համար",
            paragraphs: [
              "Պատրաստեք հատակագիծը, լուսանկարները, մակերեսի տվյալներն ու ցանկալի փոփոխությունների ցանկը։ Զննումից հետո հնարավոր է ճշտել աշխատանքների ծավալներն ու նյութերը։ Նախահաշվի բաժնում բացատրում ենք փաստաթղթի կառուցվածքը։",
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
