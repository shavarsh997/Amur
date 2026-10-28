import type { Locale } from "@/types";
import { extraSeoLandingPages } from "@/config/seo-landing-pages-extra.config";
import { getRenovationStartingPrice } from "@/lib/pricing";

const renovationStartingPrice = {
  hy: getRenovationStartingPrice("hy"),
  ru: getRenovationStartingPrice("ru"),
  en: getRenovationStartingPrice("en"),
  de: getRenovationStartingPrice("de"),
  fr: getRenovationStartingPrice("fr"),
};

export type SeoLandingPage = {
  slug: string;
  /** Date of the last substantial content edit, never the build date. */
  contentUpdatedAt?: string;
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
        choices?: readonly {
          title: string;
          description: string;
          path: string;
        }[];
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
    contentUpdatedAt: "2026-10-28",
    kind: "service",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85",
    relatedServiceSlugs: ["renovation", "interior-design", "design"],
    relatedLandingSlugs: [
      "turnkey-renovation",
      "new-build-renovation",
      "prices",
      "capital-renovation-yerevan",
      "cosmetic-renovation-yerevan",
      "renovation-estimate-yerevan",
    ],
    translations: {
      ru: {
        eyebrow: "Ремонт квартир · Ереван",
        title: "Ремонт квартир в Ереване",
        description:
          "От осмотра квартиры до готовой отделки: планируем работы с учётом состояния помещения, вашей планировки и выбранных материалов.",
        seoTitle: "Ремонт квартир в Ереване | SHINEX",
        seoDescription:
          "Ремонт квартир в Ереване: новостройки и вторичное жильё, косметический и капитальный ремонт. Смета, этапы и материалы — по согласованному объёму. SHINEX.",
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
            choices: [
              {
                title: "Косметический ремонт квартиры",
                description:
                  "Подходит для обновления краски, обоев и напольных покрытий, если основания и инженерные системы пригодны для дальнейшего использования.",
                path: "services/cosmetic-renovation-yerevan",
              },
              {
                title: "Капитальный ремонт квартиры",
                description:
                  "Нужен, когда требуется демонтаж, восстановление оснований или замена проводки и труб. Сначала оцениваем состояние квартиры.",
                path: "services/capital-renovation-yerevan",
              },
              {
                title: "Ремонт квартиры в новостройке",
                description:
                  "Объём зависит от того, что передал застройщик: бетонную коробку, черновую или предчистовую отделку. Проверяем выполненные работы до составления сметы.",
                path: "services/new-build-renovation",
              },
              {
                title: "Ремонт квартиры под ключ",
                description:
                  "Определяет организацию проекта одной командой. Работы, закупку материалов, мебель и технику нужно отдельно перечислить в договоре.",
                path: "services/turnkey-renovation",
              },
            ],
          },
          {
            title: "Как рассчитать стоимость",
            paragraphs: [
              "Для обсуждения сметы расскажите о площади и состоянии квартиры. Уточним объёмы демонтажа, электрики, сантехники и отделки. В разделе стоимости можно посмотреть структуру бюджета.",
            ],
          },
          {
            title: "Как выбрать подрядчика для ремонта квартиры",
            paragraphs: [
              "Сравнивайте предложения по одной планировке и одному перечню работ. Просите показать реальные объекты с похожей задачей и уточняйте, кто отвечает за каждый этап.",
            ],
            items: [
              "Смета: объёмы и единицы измерения, работы, материалы и дополнительные расходы отдельными строками.",
              "Договор: состав работ, этапы оплаты, порядок изменений и приёмки результата.",
              "Приёмка: перечень выполненных работ и замечаний; фотографии скрытых коммуникаций, если их фиксация предусмотрена договором.",
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
          {
            question: "Сколько стоит ремонт квартиры в Ереване?",
            answer:
              "Ориентир и примеры расчёта для 40, 60 и 80 м² приведены на странице цен. Для вашей квартиры нужны площадь, исходное состояние и перечень работ. Стоимость материалов и комплектацию согласуем отдельно в смете.",
          },
          {
            question: "Сколько длится ремонт квартиры?",
            answer:
              "Срок зависит от демонтажа, инженерных работ, подготовки поверхностей и поставок. В графике нужно учитывать технологические перерывы и доступ в квартиру. После осмотра согласуем последовательность этапов и сроки для вашего объёма.",
          },
          {
            question: "Можно ли заказать ремонт квартиры без дизайн-проекта?",
            answer:
              "Для обновления отделки полного дизайн-проекта может не потребоваться. До электрики и сантехники всё равно нужно согласовать план мебели, розеток, освещения и подключений. При изменении планировки состав проектных документов обсуждается отдельно.",
          },
        ],
        calculatorLabel: "Обсудить ремонт",
        contactLabel: "Обсудить ремонт",
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
            choices: [
              {
                title: "Cosmetic apartment renovation",
                description:
                  "Refresh paint, wallpaper and floor finishes when the underlying surfaces and building services can be retained.",
                path: "services/cosmetic-renovation-yerevan",
              },
              {
                title: "Major apartment renovation",
                description:
                  "Consider this when removal work, repairs to underlying surfaces or replacement wiring and pipes are needed. The survey determines the scope.",
                path: "services/capital-renovation-yerevan",
              },
              {
                title: "New-build apartment renovation",
                description:
                  "The scope depends on the developer’s handover: a bare shell, initial preparation or surfaces ready for finishing. Completed work is checked before the estimate.",
                path: "services/new-build-renovation",
              },
              {
                title: "Complete apartment renovation",
                description:
                  "One team coordinates the agreed project. List works, material purchasing, furniture and appliances separately in the contract.",
                path: "services/turnkey-renovation",
              },
            ],
          },
          {
            title: "Planning the budget",
            paragraphs: [
              "Tell us about the size and condition of your apartment so we can discuss an estimate. We will clarify the demolition, wiring, plumbing and finishing work needed. Our cost guide explains how the budget is structured.",
            ],
          },
          {
            title: "Choosing an apartment renovation contractor",
            paragraphs: [
              "Compare proposals using the same layout and scope. Ask to see real projects with similar requirements and clarify who is responsible for each stage.",
            ],
            items: [
              "Estimate: quantities, units, labour, materials and additional costs on separate lines.",
              "Contract: scope, payment stages, change approval and handover procedure.",
              "Handover: a record of completed work and outstanding items; photos of concealed services where documentation is included in the contract.",
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
          {
            question: "How much does apartment renovation in Yerevan cost?",
            answer:
              "The prices page shows the starting rate and examples for 40, 60 and 80 m². An estimate for your apartment requires its area, current condition and work scope. Materials and fitting out are agreed separately in the estimate.",
          },
          {
            question: "How long does apartment renovation take?",
            answer:
              "Timing depends on removal work, building services, surface preparation and deliveries. The schedule needs to allow for drying and other technical pauses, as well as access. Stages and timing are agreed after the survey.",
          },
          {
            question: "Can I renovate without a full interior design project?",
            answer:
              "A finish refresh may not require a full design project. Furniture, socket, lighting and plumbing layouts still need to be agreed before wiring and pipework. Documentation for layout changes is discussed separately.",
          },
        ],
        calculatorLabel: "Discuss your renovation",
        contactLabel: "Discuss your renovation",
        relatedTitle: "Related services",
      },
      de: {
        eyebrow: "Wohnungsrenovierung · Eriwan",
        title: "Wohnungsrenovierung in Eriwan",
        description:
          "Planen Sie Ihre Wohnungsrenovierung nach Objektzustand, gewünschtem Grundriss und gewählten Oberflächen.",
        seoTitle: "Wohnungsrenovierung in Eriwan | SHINEX",
        seoDescription:
          "Wohnungsrenovierung in Eriwan: von der Bestandsaufnahme über Elektro- und Sanitärarbeiten bis zum Ausbau. Informieren Sie sich über die Arbeiten und planen Sie Ihr Budget.",
        introduction: [
          "SHINEX beginnt eine Wohnungsrenovierung mit Besichtigung und Aufmaß. Anschließend erstellen wir eine Kostenschätzung für Untergrundvorbereitung, Elektro- und Sanitärarbeiten sowie Ausbau.",
          "Bei einer Neubauwohnung prüfen wir den Übergabezustand. Bei einer älteren Wohnung beurteilen wir, welche Oberflächen und Anlagen erhalten bleiben können und welche ersetzt werden müssen.",
        ],
        sections: [
          {
            title: "Was wir vor Beginn prüfen",
            paragraphs: [
              "Die Bodenfläche ist nur ein Faktor. Wand- und Bodenzustand, Küchen- und Badaufteilung, Steckdosen und Oberflächenwahl beeinflussen die Arbeiten ebenfalls.",
            ],
            items: [
              "Raumaufteilung und Möblierung.",
              "Vorhandene Kabel und Rohrleitungen.",
              "Rückbau und Untergrundvorbereitung.",
              "Boden-, Wand- und Deckenoberflächen.",
            ],
          },
          {
            title: "Von der Vorbereitung bis zum Abschluss",
            paragraphs: [
              "Die Reihenfolge richtet sich nach Objekt und Planung. Kabel, Rohre und Gerätestandorte werden vor dem Endausbau geplant.",
            ],
            items: [
              "Besichtigung, Aufmaß und Kostenschätzung.",
              "Rückbau und Vorbereitung nach Bedarf.",
              "Elektro-, Sanitärarbeiten und Untergrundvorbereitung.",
              "Fliesen, Anstriche und Bodenbeläge.",
              "Montage der vereinbarten Ausstattung und Abschlussprüfung.",
            ],
          },
          {
            title: "Den Renovierungsumfang festlegen",
            paragraphs: [
              "Für intakte Oberflächen kann eine Auffrischung genügen. Eine umfassende Sanierung betrifft verschlissene Kabel, Rohre und Untergründe. Eine komplette Renovierungsleistung beschreibt die Projektkoordination; welche Phasen enthalten sind, muss ausdrücklich festgelegt werden.",
            ],
            choices: [
              {
                title: "Kosmetische Wohnungsrenovierung",
                description:
                  "Farben, Tapeten und Bodenbeläge erneuern, wenn Untergründe und technische Anlagen weiterhin genutzt werden können.",
                path: "services/cosmetic-renovation-yerevan",
              },
              {
                title: "Umfassende Wohnungssanierung",
                description:
                  "Bei notwendigem Rückbau, der Instandsetzung von Untergründen oder dem Austausch von Leitungen. Eine Besichtigung klärt den Umfang.",
                path: "services/capital-renovation-yerevan",
              },
              {
                title: "Renovierung einer Neubauwohnung",
                description:
                  "Der Umfang hängt vom Übergabezustand ab: Rohbau, vorbereitete Flächen oder Ausbauvorbereitung. Vor der Kostenschätzung werden vorhandene Arbeiten geprüft.",
                path: "services/new-build-renovation",
              },
              {
                title: "Komplette Wohnungsrenovierung",
                description:
                  "Ein Team koordiniert das vereinbarte Projekt. Arbeiten, Materialbeschaffung, Möbel und Geräte werden im Vertrag einzeln aufgeführt.",
                path: "services/turnkey-renovation",
              },
            ],
          },
          {
            title: "Das Budget planen",
            paragraphs: [
              "Beschreiben Sie Größe und Zustand Ihrer Wohnung, damit wir eine Kostenschätzung besprechen können. Wir klären Rückbau, Elektro- und Sanitärarbeiten sowie Ausbau. Unser Kostenratgeber erläutert die Budgetstruktur.",
            ],
          },
          {
            title: "Einen Auftragnehmer für die Wohnungsrenovierung auswählen",
            paragraphs: [
              "Vergleichen Sie Angebote anhand desselben Grundrisses und Leistungsumfangs. Fragen Sie nach realen, vergleichbaren Projekten und den Verantwortlichen für jede Phase.",
            ],
            items: [
              "Kostenvoranschlag: Mengen, Einheiten, Arbeiten, Materialien und Nebenkosten getrennt ausweisen.",
              "Vertrag: Leistungsumfang, Zahlungsphasen, Änderungen und Abnahmeverfahren.",
              "Abnahme: erledigte Arbeiten und offene Punkte dokumentieren; Fotos verdeckter Leitungen, sofern vertraglich vereinbart.",
            ],
          },
        ],
        faqs: [
          {
            question: "Was sollte ich für eine erste Einschätzung senden?",
            answer:
              "Senden Sie Fläche, Adresse, aktuelle Fotos und gegebenenfalls einen Grundriss. Erläutern Sie, ob Sie Oberflächen auffrischen oder Küche, Bad beziehungsweise Möblierung ändern möchten.",
          },
          {
            question: "Müssen alle Kabel und Rohrleitungen erneuert werden?",
            answer:
              "Das hängt vom Zustand der bestehenden Anlagen und den künftigen Anforderungen ab. Der Austauschumfang wird vor Ort beurteilt und nicht allein nach dem Alter der Wohnung.",
          },
          {
            question:
              "Welche Entscheidungen sollten vor dem Ausbau getroffen werden?",
            answer:
              "Möbelpositionen, Steckdosen, Beleuchtung, Sanitärobjekte und Oberflächen. Werden sie früh abgestimmt, können die nötigen Anschlüsse vor der Fertigstellung von Wänden und Böden geplant werden.",
          },
          {
            question: "Was kostet die Renovierung einer Wohnung in Eriwan?",
            answer:
              "Die Preisseite zeigt den Einstiegspreis und Rechenbeispiele für 40, 60 und 80 m². Für Ihre Wohnung benötigen wir Fläche, Zustand und Arbeitsumfang. Materialien und Ausstattung werden im Kostenvoranschlag separat vereinbart.",
          },
          {
            question: "Wie lange dauert eine Wohnungsrenovierung?",
            answer:
              "Die Dauer hängt von Rückbau, Haustechnik, Untergrundvorbereitung und Lieferungen ab. Technisch notwendige Pausen und der Zugang zur Wohnung werden berücksichtigt. Ablauf und Termine werden nach der Besichtigung vereinbart.",
          },
          {
            question:
              "Ist eine Renovierung ohne vollständige Innenraumplanung möglich?",
            answer:
              "Für neue Oberflächen ist nicht immer eine vollständige Planung nötig. Möbel, Steckdosen, Beleuchtung und Anschlüsse müssen vor den Installationsarbeiten festgelegt werden. Unterlagen für Grundrissänderungen werden separat besprochen.",
          },
        ],
        calculatorLabel: "Renovierung besprechen",
        contactLabel: "Renovierung besprechen",
        relatedTitle: "Passende Leistungen",
      },
      fr: {
        eyebrow: "Rénovation d’appartement · Erevan",
        title: "Rénovation d’appartement à Erevan",
        description:
          "Préparez la rénovation de votre appartement selon l’état du bien, l’agencement souhaité et les finitions choisies.",
        seoTitle: "Rénovation d’appartement à Erevan | SHINEX",
        seoDescription:
          "Rénovation d’appartement à Erevan, de l’évaluation du bien à l’électricité, la plomberie et les finitions. Découvrez les travaux et préparez votre budget.",
        introduction: [
          "SHINEX commence la rénovation d’un appartement par une visite et des mesures. Nous préparons ensuite un devis couvrant la préparation des surfaces, l’électricité, la plomberie et les finitions.",
          "Pour un appartement neuf, nous vérifions l’état de livraison. Pour un appartement ancien, nous évaluons les finitions et les réseaux à conserver ou à remplacer.",
        ],
        sections: [
          {
            title: "Ce que nous examinons avant les travaux",
            paragraphs: [
              "La surface au sol n’est qu’un élément. L’état des murs et des sols, l’agencement de la cuisine et de la salle de bains, les prises et les finitions influencent aussi les travaux.",
            ],
            items: [
              "Agencement des pièces et implantation du mobilier.",
              "Câblage et canalisations existants.",
              "Démolition et préparation des surfaces.",
              "Finitions des sols, murs et plafonds.",
            ],
          },
          {
            title: "De la préparation à l’achèvement",
            paragraphs: [
              "L’ordre des travaux suit le bien et le projet. Le câblage, les canalisations et l’emplacement des équipements sont prévus avant les finitions.",
            ],
            items: [
              "Visite, mesures et devis.",
              "Démolition et préparation selon les besoins.",
              "Électricité, plomberie et préparation des surfaces.",
              "Carrelage, peinture et revêtements de sol.",
              "Pose des équipements convenus et contrôle final.",
            ],
          },
          {
            title: "Choisir l’étendue de la rénovation",
            paragraphs: [
              "Un rafraîchissement peut suffire pour des surfaces saines. Une rénovation lourde traite les câbles, canalisations et surfaces usés. Un service de rénovation complète décrit la coordination du projet ; son périmètre doit préciser les étapes incluses.",
            ],
            choices: [
              {
                title: "Rénovation légère d’appartement",
                description:
                  "Renouveler peintures, papiers peints et revêtements de sol lorsque les supports et les réseaux peuvent être conservés.",
                path: "services/cosmetic-renovation-yerevan",
              },
              {
                title: "Rénovation lourde d’appartement",
                description:
                  "À envisager si une dépose, une remise en état des supports ou un remplacement des réseaux est nécessaire. La visite précise le périmètre.",
                path: "services/capital-renovation-yerevan",
              },
              {
                title: "Rénovation d’un appartement neuf",
                description:
                  "Le périmètre dépend de la livraison du promoteur : volume brut, préparation initiale ou supports prêts à finir. Les travaux existants sont vérifiés avant le devis.",
                path: "services/new-build-renovation",
              },
              {
                title: "Rénovation complète d’appartement",
                description:
                  "Une équipe coordonne le projet convenu. Travaux, achats de matériaux, mobilier et électroménager sont détaillés séparément dans le contrat.",
                path: "services/turnkey-renovation",
              },
            ],
          },
          {
            title: "Préparer le budget",
            paragraphs: [
              "Indiquez la taille et l’état de votre appartement pour discuter d’une estimation. Nous préciserons la démolition, l’électricité, la plomberie et les finitions nécessaires. Notre guide des coûts explique la structure du budget.",
            ],
          },
          {
            title: "Choisir une entreprise de rénovation d’appartement",
            paragraphs: [
              "Comparez les propositions sur le même plan et le même périmètre. Demandez à voir des réalisations comparables et précisez le responsable de chaque étape.",
            ],
            items: [
              "Devis : quantités, unités, main-d’œuvre, matériaux et frais annexes sur des lignes séparées.",
              "Contrat : périmètre, paiements par étapes, validation des changements et réception.",
              "Réception : liste des travaux réalisés et des réserves ; photos des réseaux cachés si leur documentation est prévue au contrat.",
            ],
          },
        ],
        faqs: [
          {
            question: "Que dois-je envoyer pour une première évaluation ?",
            answer:
              "Envoyez la surface, l’adresse, des photos récentes et un plan si possible. Précisez si vous souhaitez rafraîchir les finitions ou modifier la cuisine, la salle de bains ou l’agencement du mobilier.",
          },
          {
            question: "Faut-il remplacer toute l’électricité et la plomberie ?",
            answer:
              "Cela dépend de l’état des réseaux existants et des besoins futurs en électricité et en plomberie. Les remplacements sont évalués sur place, et non uniquement selon l’âge de l’appartement.",
          },
          {
            question: "Quelles décisions prendre avant les finitions ?",
            answer:
              "L’emplacement du mobilier, les prises, l’éclairage, les équipements sanitaires et les finitions. Les définir tôt permet de prévoir les raccordements avant de terminer les murs et les sols.",
          },
          {
            question: "Combien coûte la rénovation d’un appartement à Erevan ?",
            answer:
              "La page des prix présente le tarif de départ et des exemples pour 40, 60 et 80 m². Votre devis dépend de la surface, de l’état initial et des travaux. Les matériaux et l’équipement sont convenus séparément.",
          },
          {
            question: "Combien de temps dure la rénovation d’un appartement ?",
            answer:
              "Le délai dépend de la dépose, des réseaux, de la préparation des supports et des livraisons. Le planning tient compte des pauses techniques et de l’accès au logement. Les étapes et délais sont convenus après la visite.",
          },
          {
            question:
              "Peut-on rénover sans projet complet d’aménagement intérieur ?",
            answer:
              "Un rafraîchissement ne nécessite pas toujours un projet complet. Il faut néanmoins définir mobilier, prises, éclairage et raccordements avant les travaux de réseaux. Les documents liés aux changements de plan sont étudiés séparément.",
          },
        ],
        calculatorLabel: "Discuter de votre rénovation",
        contactLabel: "Discuter de votre rénovation",
        relatedTitle: "Services associés",
      },
      hy: {
        eyebrow: "Բնակարանների վերանորոգում · Երևան",
        title: "Բնակարանների վերանորոգում Երևանում",
        description:
          "Բնակարանի վերանորոգումը պլանավորում ենք՝ հաշվի առնելով տարածքի վիճակը, ձեր նախընտրած դասավորությունն ու հարդարման նյութերը։",
        seoTitle: "Բնակարանների վերանորոգում Երևանում | SHINEX",
        seoDescription:
          "Բնակարանների վերանորոգում Երևանում՝ նորակառույց և հին բնակարաններ, կոսմետիկ ու կապիտալ աշխատանքներ։ Նախահաշիվ, փուլեր և նյութերի համաձայնեցում՝ SHINEX։",
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
            choices: [
              {
                title: "Բնակարանի կոսմետիկ վերանորոգում",
                description:
                  "Ներկի, պաստառների և հատակի ծածկույթների թարմացում, երբ հիմքերն ու ինժեներական համակարգերը պիտանի են հետագա օգտագործման համար։",
                path: "services/cosmetic-renovation-yerevan",
              },
              {
                title: "Բնակարանի կապիտալ վերանորոգում",
                description:
                  "Ընտրեք, երբ անհրաժեշտ են ապամոնտաժում, հիմքերի վերականգնում կամ լարերի ու խողովակների փոխարինում։ Նախ գնահատում ենք բնակարանի վիճակը։",
                path: "services/capital-renovation-yerevan",
              },
              {
                title: "Նորակառույց բնակարանի վերանորոգում",
                description:
                  "Ծավալը կախված է կառուցապատողի հանձնած վիճակից՝ բետոնե պատերից մինչև նախնական հարդարում։ Նախահաշվից առաջ ստուգում ենք կատարված աշխատանքները։",
                path: "services/new-build-renovation",
              },
              {
                title: "Բնակարանի ամբողջական վերանորոգում",
                description:
                  "Նախագծի կազմակերպում մեկ թիմի միջոցով։ Աշխատանքները, նյութերի գնումը, կահույքն ու տեխնիկան պետք է առանձին նշվեն պայմանագրում։",
                path: "services/turnkey-renovation",
              },
            ],
          },
          {
            title: "Ինչպե՞ս հաշվարկել արժեքը",
            paragraphs: [
              "Նախահաշիվը քննարկելու համար նշեք բնակարանի մակերեսն ու վիճակը։ Կճշտենք ապամոնտաժման, էլեկտրական, սանտեխնիկական և հարդարման աշխատանքների ծավալները։ Արժեքի բաժնում կարող եք ծանոթանալ բյուջեի կազմին։",
            ],
          },
          {
            title: "Ինչպե՞ս ընտրել բնակարանի վերանորոգման կատարողին",
            paragraphs: [
              "Առաջարկները համեմատեք նույն հատակագծի և աշխատանքների նույն ցանկի հիման վրա։ Խնդրեք ցույց տալ նմանատիպ իրական աշխատանքներ և ճշտեք յուրաքանչյուր փուլի պատասխանատուին։",
            ],
            items: [
              "Նախահաշիվ՝ ծավալներ, չափման միավորներ, աշխատանքներ, նյութեր և լրացուցիչ ծախսեր՝ առանձին տողերով։",
              "Պայմանագիր՝ աշխատանքների կազմ, վճարման փուլեր, փոփոխությունների և արդյունքի ընդունման կարգ։",
              "Ընդունում՝ կատարված աշխատանքների ու դիտողությունների ցանկ, թաքնված հաղորդակցությունների լուսանկարներ, եթե դրանց գրանցումը նախատեսված է պայմանագրով։",
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
          {
            question: "Ի՞նչ արժե բնակարանի վերանորոգումը Երևանում։",
            answer:
              "Մեկնարկային արժեքն ու 40, 60 և 80 մ² բնակարանների հաշվարկի օրինակները ներկայացված են գների էջում։ Ձեր բնակարանի համար անհրաժեշտ են մակերեսը, սկզբնական վիճակն ու աշխատանքների ցանկը։ Նյութերի արժեքն ու համալրումը համաձայնեցնում ենք նախահաշվում առանձին։",
          },
          {
            question: "Որքա՞ն է տևում բնակարանի վերանորոգումը։",
            answer:
              "Ժամկետը կախված է ապամոնտաժումից, ինժեներական աշխատանքներից, մակերեսների պատրաստումից և մատակարարումից։ Ժամանակացույցում հաշվի են առնվում տեխնոլոգիական դադարներն ու բնակարանի հասանելիությունը։ Զննումից հետո համաձայնեցնում ենք փուլերն ու ժամկետները։",
          },
          {
            question: "Կարելի՞ է բնակարանը վերանորոգել առանց դիզայն-նախագծի։",
            answer:
              "Հարդարման թարմացման համար ամբողջական դիզայն-նախագիծ կարող է պետք չլինել։ Սակայն էլեկտրական և սանտեխնիկական աշխատանքներից առաջ անհրաժեշտ է համաձայնեցնել կահույքի, վարդակների, լուսավորության ու միացումների տեղերը։ Վերահատակագծման դեպքում նախագծային փաստաթղթերը քննարկվում են առանձին։",
          },
        ],
        calculatorLabel: "Կապվել մեզ հետ",
        contactLabel: "Կապվել մեզ հետ",
        relatedTitle: "Կապված ծառայություններ",
      },
    },
  },
  {
    slug: "new-build-renovation",
    contentUpdatedAt: "2026-10-28",
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
        seoTitle: "Ремонт новостройки в Ереване — с нуля и White Box | SHINEX",
        seoDescription:
          "Ремонт квартиры в новостройке в Ереване: с нуля или после предчистовой отделки. Проверка состояния, электрика, сантехника, отделка и смета после осмотра.",
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
          {
            title: "Ремонт с нуля: черновая и предчистовая отделка",
            paragraphs: [
              "Названия «чёрный каркас», «белый каркас» и White Box не гарантируют одинаковую комплектацию у разных застройщиков. Для сметы важны фактическое наличие перегородок, стяжки, штукатурки и разводки коммуникаций.",
              "В квартире без отделки сначала определяем планировку и инженерные решения. При предчистовой отделке проверяем основания и расположение выводов: часть выполненных работ может подходить вашему проекту, а часть потребует корректировки. Передайте план и фотографии, чтобы обсудить ремонт квартиры с нуля.",
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
        calculatorLabel: "Обсудить ремонт",
        contactLabel: "Обсудить ремонт",
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
          {
            title: "Renovating from a bare shell or a prepared finish",
            paragraphs: [
              "Labels such as black shell, white shell and White Box do not guarantee the same specification from every developer. The estimate depends on the actual partitions, screed, plaster and installed services.",
              "For a bare apartment, layout and building services come first. For a prepared finish, we check the underlying surfaces and connection locations: some existing work may be usable, while other parts may need adjusting. Share the plan and photos to discuss renovation from scratch.",
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
        calculatorLabel: "Discuss your renovation",
        contactLabel: "Discuss your renovation",
        relatedTitle: "Related services",
      },
      de: {
        eyebrow: "Neubaurenovierung · Eriwan",
        title: "Renovierung von Neubauwohnungen in Eriwan",
        description:
          "Bereiten Sie Ihre Neubauwohnung für den Einzug vor: Elektro- und Sanitärinstallation, Untergründe und Innenausbau werden vorab geplant.",
        seoTitle: "Renovierung von Neubauwohnungen in Eriwan | SHINEX",
        seoDescription:
          "Neubauwohnungsrenovierung in Eriwan: Vorbereitungs- und Ausbauphasen, Zeitplanung und Kostenfaktoren bei SHINEX.",
        introduction: [
          "Zunächst prüfen wir, was der Bauträger übergeben hat: Wände, Böden, Öffnungen und Versorgungsanschlüsse. Daraus ergibt sich, welche Vorbereitungs- und Ausbauarbeiten noch nötig sind.",
          "Stimmen Sie Möbel, Beleuchtung und Sanitärobjekte früh ab, damit die Anschlüsse vor der Oberflächenbearbeitung geplant werden können.",
        ],
        sections: [
          {
            title: "Was wir vor den Arbeiten prüfen",
            paragraphs: [
              "Auch ein teilweise ausgebauter Neubau kann Korrekturen benötigen. Die Besichtigung klärt den Vorbereitungsumfang.",
            ],
            items: [
              "Ebenheit von Wänden, Böden und Decken.",
              "Lage und ausreichende Anzahl der Elektroanschlüsse.",
              "Wasser-, Abwasser- und Sanitäranschlüsse.",
              "Öffnungen, Lüftung und Eignung der Untergründe für den Ausbau.",
            ],
          },
          {
            title: "Phasen der Neubaurenovierung",
            paragraphs: [
              "Planen Sie verdeckte Kabel und Rohre vor dem Endausbau. Die Vorbereitungsfolge richtet sich nach Planung und Wohnungszustand.",
            ],
            items: [
              "Aufmaß, Grundriss und Kostenschätzung.",
              "Verputzen, Ausgleichen und Estrich nach Bedarf.",
              "Elektro- und Sanitärinstallation.",
              "Abdichtung, Fliesen, Decken, Bodenbeläge und Anstriche.",
              "Türen, Beleuchtung, Ausstattung und Abschlussprüfung.",
            ],
          },
          {
            title: "Dauer und Kosten",
            paragraphs: [
              "Dauer und Budget hängen vom Fertigstellungsstand, der Fläche, den Anschlusspunkten, Materialien und der Komplexität ab. Für eine genaue Kostenschätzung ist eine Besichtigung nötig.",
            ],
          },
          {
            title: "Renovierung ab Rohbau oder vorbereitetem Ausbau",
            paragraphs: [
              "Bezeichnungen wie Rohbau, weißer Ausbau oder White Box garantieren nicht bei jedem Bauträger denselben Umfang. Entscheidend sind vorhandene Trennwände, Estrich, Putz und Installationen.",
              "Bei einer Wohnung ohne Ausbau werden zunächst Grundriss und Haustechnik festgelegt. Bei vorbereiteten Flächen prüfen wir Untergründe und Anschlüsse: Ein Teil kann erhalten bleiben, anderes muss angepasst werden. Ein Plan und Fotos helfen bei der ersten Abstimmung.",
            ],
          },
        ],
        faqs: [
          {
            question: "Braucht ein Neubau einen Estrich?",
            answer:
              "Das hängt vom tatsächlichen Bodenzustand und dem gewählten Belag ab. Eine Prüfung zeigt, ob örtliche Korrekturen oder ein vollständiger Estrich nötig sind.",
          },
          {
            question: "Wann sollte ich die Innenraumplanung beauftragen?",
            answer:
              "Am besten vor den gebäudetechnischen Arbeiten: Ein Grundriss und Ausstattungsplan helfen, Elektro- und Sanitäranschlüsse richtig zu platzieren.",
          },
          {
            question:
              "Welche Informationen sollte ich vom Bauträger anfordern?",
            answer:
              "Fragen Sie, welche Arbeiten bei Übergabe abgeschlossen sind und welche Angaben zu Versorgungsanschlüssen vorliegen. Senden Sie vorhandene Anschlusspläne und Übergabeunterlagen zusammen mit dem Grundriss.",
          },
        ],
        calculatorLabel: "Renovierung besprechen",
        contactLabel: "Renovierung besprechen",
        relatedTitle: "Passende Leistungen",
      },
      fr: {
        eyebrow: "Rénovation de logement neuf · Erevan",
        title: "Rénovation d’appartement neuf à Erevan",
        description:
          "Préparez votre appartement neuf avant l’emménagement en planifiant l’électricité, la plomberie, la préparation des surfaces et les finitions intérieures.",
        seoTitle: "Rénovation d’appartement neuf à Erevan | SHINEX",
        seoDescription:
          "Rénovation d’appartement neuf à Erevan : préparation, finitions, délais et facteurs de coût avec SHINEX.",
        introduction: [
          "Nous vérifions d’abord ce que le promoteur a livré : murs, sols, ouvertures et raccordements. Cela permet de définir les travaux de préparation et de finition restants.",
          "Définissez tôt l’emplacement du mobilier, de l’éclairage et des équipements sanitaires afin de prévoir les raccordements avant les finitions.",
        ],
        sections: [
          {
            title: "Ce que nous vérifions avant les travaux",
            paragraphs: [
              "Même un logement neuf partiellement aménagé peut nécessiter des corrections. La visite définit les préparations nécessaires.",
            ],
            items: [
              "Planéité des murs, sols et plafonds.",
              "Emplacement et nombre suffisant de points électriques.",
              "Arrivées d’eau, évacuations et raccordements sanitaires.",
              "Ouvertures, ventilation et préparation des supports pour les finitions.",
            ],
          },
          {
            title: "Étapes de rénovation d’un logement neuf",
            paragraphs: [
              "Prévoyez les câbles et canalisations encastrés avant les finitions. L’ordre de préparation suit le projet et l’état de l’appartement.",
            ],
            items: [
              "Mesures, agencement et devis.",
              "Enduits, nivellement et chape selon les besoins.",
              "Installations électriques et de plomberie.",
              "Étanchéité, carrelage, plafonds, sols et peinture.",
              "Portes, éclairage, équipements et contrôle final.",
            ],
          },
          {
            title: "Délais et coût",
            paragraphs: [
              "Les délais et le budget dépendent de l’état de livraison, de la surface, du nombre de points techniques, des matériaux et de la complexité. Une visite est nécessaire pour un devis précis.",
            ],
          },
          {
            title: "Rénover depuis un volume brut ou des supports préparés",
            paragraphs: [
              "Les appellations volume brut, finition blanche ou White Box ne garantissent pas le même contenu chez tous les promoteurs. Le devis dépend des cloisons, de la chape, des enduits et des réseaux réellement présents.",
              "Dans un logement brut, le plan et les réseaux sont définis en premier. Si les supports sont préparés, nous vérifions leur état et les raccordements : certains travaux peuvent être conservés, d’autres adaptés. Transmettez le plan et des photos pour préparer la discussion.",
            ],
          },
        ],
        faqs: [
          {
            question: "Un logement neuf a-t-il besoin d’une chape ?",
            answer:
              "Cela dépend de l’état réel du sol et du revêtement choisi. Un contrôle permet de déterminer si une correction locale ou une chape complète est nécessaire.",
          },
          {
            question: "Quand commander la conception intérieure ?",
            answer:
              "De préférence avant les travaux techniques : un plan d’agencement et d’équipements aide à placer correctement les points électriques et de plomberie.",
          },
          {
            question: "Quelles informations demander au promoteur ?",
            answer:
              "Demandez quels travaux sont achevés à la livraison et quelles informations existent sur les raccordements. Transmettez les plans de réseaux et documents de livraison disponibles avec le plan de l’appartement.",
          },
        ],
        calculatorLabel: "Discuter de votre rénovation",
        contactLabel: "Discuter de votre rénovation",
        relatedTitle: "Services associés",
      },
      hy: {
        eyebrow: "Նորակառույցների վերանորոգում · Երևան",
        title: "Նորակառույց բնակարանի վերանորոգում Երևանում",
        description:
          "Նորակառույց բնակարանի վերանորոգում՝ պատերի ու հատակի նախապատրաստումից մինչև էլեկտրական, սանտեխնիկական և հարդարման աշխատանքներ։",
        seoTitle: "Նորակառույց բնակարանի վերանորոգում Երևանում | SHINEX",
        seoDescription:
          "Նորակառույց բնակարանի վերանորոգում Երևանում՝ «սև գործ» կամ «սպիտակ գործ» վիճակից։ Զննում, էլեկտրական և սանտեխնիկական աշխատանքներ, հարդարում ու նախահաշիվ։",
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
          {
            title: "Վերանորոգում զրոյից․ «սև գործ» և «սպիտակ գործ»",
            paragraphs: [
              "«Սև գործ», «սպիտակ գործ» կամ White Box անվանումները տարբեր կառուցապատողների մոտ նույն կազմը չեն երաշխավորում։ Նախահաշվի համար կարևոր է միջնապատերի, հատակի հարթեցման, սվաղի և հաղորդակցությունների փաստացի վիճակը։",
              "Առանց հարդարման բնակարանում նախ որոշում ենք հատակագիծն ու ինժեներական լուծումները։ Նախնական հարդարման դեպքում ստուգում ենք հիմքերն ու միացումների տեղերը․ կատարված աշխատանքների մի մասը կարող է պահպանվել, իսկ մյուս մասը՝ փոփոխվել։ Զրոյից վերանորոգումը քննարկելու համար ուղարկեք հատակագիծն ու լուսանկարները։",
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
        calculatorLabel: "Կապվել մեզ հետ",
        contactLabel: "Կապվել մեզ հետ",
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
        calculatorLabel: "Обсудить ремонт",
        contactLabel: "Обсудить ремонт",
        relatedTitle: "Связанные услуги",
      },
      en: {
        eyebrow: "Complete renovation",
        title: "Complete renovation service in Yerevan",
        description:
          "Bring the renovation stages together with one company, an agreed scope and decisions made before work begins.",
        seoTitle: "Turnkey Renovation in Yerevan | SHINEX",
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
        calculatorLabel: "Discuss your renovation",
        contactLabel: "Discuss your renovation",
        relatedTitle: "Related services",
      },
      de: {
        eyebrow: "Komplettrenovierung",
        title: "Komplette Renovierung in Eriwan",
        description:
          "Bündeln Sie die Renovierungsphasen bei einem Unternehmen, mit vereinbartem Umfang und Entscheidungen vor Arbeitsbeginn.",
        seoTitle: "Komplette Renovierung in Eriwan | SHINEX",
        seoDescription:
          "Komplette Renovierung in Eriwan. Planen Sie Arbeiten, Materialien, Verantwortlichkeiten und Übergabe mit SHINEX.",
        introduction: [
          "Eine komplette Renovierung beginnt mit einem klaren Umfang: den Arbeiten von SHINEX, den nötigen Materialien und dem Zustand bei Übergabe.",
          "Eine umfassende Sanierung beschreibt, wie stark ein Objekt verändert wird. Eine komplette oder schlüsselfertige Leistung beschreibt die Organisation des Projekts. Der tatsächliche Umfang wird für Ihre Wohnung oder Ihr Haus vereinbart.",
        ],
        sections: [
          {
            title: "Arbeiten von Anfang bis Ende festlegen",
            paragraphs: [
              "Die Bestandsaufnahme bestimmt den Ablauf von der Vorbereitung bis zur Prüfung der Oberflächen und montierten Ausstattung.",
            ],
            items: [
              "Aufmaß und Kostenschätzung.",
              "Rückbau und Untergrundvorbereitung nach Bedarf.",
              "Elektro-, Sanitärarbeiten und Ausbau.",
              "Montage der vereinbarten Einbauten und Geräte.",
              "Abschlussprüfung und Übergabe.",
            ],
          },
          {
            title: "Materialien, Einkauf und Planung",
            paragraphs: [
              "Legen Sie vor Beginn fest, wer Materialien auswählt, kauft und liefert. Innenraumplanung, Möbel und einzelne Geräte werden separat besprochen und sind nicht automatisch im Renovierungspreis enthalten.",
            ],
          },
          {
            title: "Änderungen während des Projekts abstimmen",
            paragraphs: [
              "Änderungen an Grundriss, Materialien oder Arbeiten können Budget und Zeitplan beeinflussen. Wir besprechen neue Anforderungen vor Beginn der betroffenen Phase, damit alle nach demselben Plan arbeiten.",
            ],
          },
        ],
        faqs: [
          {
            question: "Sind alle Materialien enthalten?",
            answer:
              "Der Kostenvoranschlag muss neben den Arbeitskosten ausweisen, welche Materialien, Lieferungen und Geräte enthalten sind und wer den Einkauf übernimmt.",
          },
          {
            question:
              "Wie unterscheidet sich das von einer umfassenden Sanierung?",
            answer:
              "Eine umfassende Sanierung beschreibt das Ausmaß der Änderungen am Objekt und seinen Anlagen. Eine komplette Leistung beschreibt die Koordination der vereinbarten Phasen bis zur Übergabe.",
          },
          {
            question:
              "Können Sie nach einer vorhandenen Innenraumplanung arbeiten?",
            answer:
              "Senden Sie die Planung und Objektdaten. Wir prüfen, ob Pläne, Maße und Materialspezifikationen für eine Kostenschätzung und die Ausführung ausreichen.",
          },
        ],
        calculatorLabel: "Renovierung besprechen",
        contactLabel: "Renovierung besprechen",
        relatedTitle: "Passende Leistungen",
      },
      fr: {
        eyebrow: "Rénovation complète",
        title: "Service de rénovation complète à Erevan",
        description:
          "Réunissez les étapes de rénovation auprès d’une seule entreprise, avec un périmètre convenu et des décisions prises avant les travaux.",
        seoTitle: "Rénovation complète à Erevan | SHINEX",
        seoDescription:
          "Service de rénovation complète à Erevan. Préparez les travaux, les matériaux, les responsabilités et la livraison avec SHINEX.",
        introduction: [
          "Une rénovation complète commence par un périmètre clair : les travaux réalisés par SHINEX, les matériaux nécessaires et ce qui sera compris à la livraison.",
          "Une rénovation lourde décrit l’ampleur des changements du bien. Un service complet ou clé en main décrit la gestion du projet. Le périmètre réel est convenu pour votre appartement ou votre maison.",
        ],
        sections: [
          {
            title: "Définir les travaux du début à la fin",
            paragraphs: [
              "L’évaluation du bien définit une séquence allant de la préparation au contrôle des finitions et des équipements posés.",
            ],
            items: [
              "Mesures et devis.",
              "Démolition et préparation des surfaces selon les besoins.",
              "Électricité, plomberie et finitions.",
              "Installation des équipements et appareils convenus.",
              "Contrôle final et livraison.",
            ],
          },
          {
            title: "Matériaux, achats et conception",
            paragraphs: [
              "Définissez avant les travaux qui choisit, achète et livre les matériaux. La conception intérieure, le mobilier et les appareils sont discutés séparément et ne sont pas automatiquement inclus dans le prix de rénovation.",
            ],
          },
          {
            title: "Convenir des modifications en cours de projet",
            paragraphs: [
              "Des modifications d’agencement, de matériaux ou de travaux peuvent affecter le budget et le planning. Nous discutons des nouveaux besoins avant l’étape concernée pour que chacun travaille sur la même base.",
            ],
          },
        ],
        faqs: [
          {
            question: "Tous les matériaux sont-ils inclus ?",
            answer:
              "Le devis doit préciser, en plus de la main-d’œuvre, les matériaux, livraisons et équipements inclus, ainsi que la personne responsable des achats.",
          },
          {
            question: "Quelle différence avec une rénovation lourde ?",
            answer:
              "Une rénovation lourde décrit l’ampleur des changements du bien et de ses réseaux. Un service complet décrit la coordination des étapes convenues jusqu’à la livraison.",
          },
          {
            question:
              "Pouvez-vous travailler à partir d’un projet d’intérieur existant ?",
            answer:
              "Envoyez le projet et les informations du bien. Nous vérifions si les plans, dimensions et spécifications des matériaux suffisent pour établir un devis et réaliser les travaux.",
          },
        ],
        calculatorLabel: "Discuter de votre rénovation",
        contactLabel: "Discuter de votre rénovation",
        relatedTitle: "Services associés",
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
        calculatorLabel: "Կապվել մեզ հետ",
        contactLabel: "Կապվել մեզ հետ",
        relatedTitle: "Կապված ծառայություններ",
      },
    },
  },
  {
    slug: "prices",
    contentUpdatedAt: "2026-10-28",
    kind: "prices",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85",
    relatedServiceSlugs: ["renovation", "interior-design", "design"],
    relatedLandingSlugs: [
      "apartment-renovation-yerevan",
      "turnkey-renovation",
      "new-build-renovation",
      "renovation-estimate-yerevan",
      "capital-renovation-yerevan",
      "cosmetic-renovation-yerevan",
    ],
    translations: {
      ru: {
        eyebrow: "Стоимость ремонта",
        title: "Стоимость ремонта квартиры в Ереване",
        description: `${renovationStartingPrice.ru ? `Работа по ремонту квартиры ${renovationStartingPrice.ru}. ` : ""}Материалы оплачиваются отдельно. Точную стоимость работ определяем после осмотра и согласования сметы.`,
        seoTitle: "Ремонт квартир в Ереване: цены за м² и примеры | SHINEX",
        seoDescription: `${renovationStartingPrice.ru ? `Ремонт квартир в Ереване: работа ${renovationStartingPrice.ru}. ` : ""}Материалы отдельно. Примеры для 40, 60 и 80 м². Смета после осмотра — SHINEX.`,
        introduction: [
          "Стоимость ремонта квартиры зависит от её состояния, площади и согласованного перечня работ. В SHINEX обсуждаем демонтаж, электрику, сантехнику и отделку, а точную смету составляем после осмотра и замеров.",
          "Ниже показано, как различаются площадь пола и площадь отделки и что уточнить в предложении подрядчика. Свяжитесь с нами, чтобы обсудить смету для вашего объекта.",
        ],
        sections: [
          {
            title: "Стоимость ремонта за 1 м²: что именно считают",
            paragraphs: [
              "Средняя стоимость ремонта за м² = согласованная сумма сметы ÷ площадь квартиры. Этот показатель помогает сравнивать предложения, только если в них совпадает состав работ и одинаково учтены материалы.",
              "Цена отдельной операции за м² считается по обрабатываемой поверхности. Например, покраску считают по площади стен, а укладку покрытия — по площади пола. Такие ставки нельзя напрямую сравнивать со стоимостью всего ремонта за м² квартиры.",
            ],
          },
          {
            title: "Как вид ремонта влияет на бюджет",
            paragraphs: [
              "Для двух квартир одинаковой площади могут потребоваться разные работы. До сравнения стоимости определите, что сохраняется, а что нужно подготовить или заменить.",
            ],
            items: [
              "Косметический ремонт: обновление покрытий с учётом состояния стен, пола и потолка.",
              "Капитальный ремонт: демонтаж, подготовка оснований и замена инженерных систем по результатам осмотра.",
              "Новостройка: проверка работ застройщика, подготовка поверхностей, разводка коммуникаций и отделка.",
              "Полный ремонт: согласованный перечень этапов; мебель, техника и дизайн обсуждаются отдельно.",
            ],
          },
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
            question: "Сколько стоит ремонт квартиры с материалами?",
            answer:
              "Опубликованная стартовая ставка SHINEX включает только работу. Материалы оплачиваются отдельно: их стоимость зависит от количества и выбранной отделки. Для общего бюджета отдельно учитывают работы, черновые и чистовые материалы, доставку и вывоз мусора.",
          },
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
          {
            question:
              "Как рассчитать ремонт однокомнатной, двухкомнатной или трёхкомнатной квартиры?",
            answer:
              "Количество комнат само по себе не определяет цену. Нужны площадь и состояние квартиры, объём работ в кухне и санузлах, число инженерных точек и выбранная отделка. В примерах выше показана арифметика для 40, 60 и 80 м²; итоговую смету считаем по фактическому объёму.",
          },
          {
            question: "Что уточнить, если предлагают ремонт «с материалами»?",
            answer:
              "Попросите перечислить черновые и чистовые материалы, их количество и характеристики, а также доставку и подъём. Отдельно проверьте, включены ли двери, сантехническое оборудование, свет, мебель и техника. Без списка комплектации две суммы за м² не сопоставимы.",
          },
        ],
        calculatorLabel: "Обсудить ремонт",
        contactLabel: "Обсудить стоимость ремонта",
        relatedTitle: "Услуги для расчета",
      },
      en: {
        eyebrow: "Renovation costs",
        title: "Apartment renovation costs in Yerevan",
        description: `${renovationStartingPrice.en ? `Apartment renovation labour ${renovationStartingPrice.en}. ` : ""}Materials are paid for separately. The exact labour cost is agreed after a survey and a detailed estimate.`,
        seoTitle: "Apartment Renovation Cost in Yerevan | SHINEX",
        seoDescription: `${renovationStartingPrice.en ? `Apartment renovation in Yerevan: labour ${renovationStartingPrice.en}. ` : ""}Materials extra. Examples for 40, 60 and 80 m². Request a SHINEX estimate.`,
        introduction: [
          "Apartment renovation cost depends on the property's condition, area and agreed work. At SHINEX, we discuss demolition, electrical work, plumbing and finishes, then prepare an accurate estimate after a survey and measurements.",
          "Below, we explain how floor area differs from finishing area and what to check in a quotation. Contact us to discuss an estimate for your property.",
        ],
        sections: [
          {
            title: "Renovation cost per m²: what is being measured?",
            paragraphs: [
              "Average renovation cost per m² = the agreed estimate total ÷ apartment floor area. This is useful for comparing quotations only when they cover the same work and account for materials in the same way.",
              "An individual task's rate per m² applies to the surface being treated. Painting uses wall area, while flooring uses floor area. These rates cannot be compared directly with the cost of a complete renovation per m² of apartment space.",
            ],
          },
          {
            title: "How the type of renovation affects the budget",
            paragraphs: [
              "Two apartments with the same floor area can need different work. Before comparing costs, establish what can stay and what needs preparation or replacement.",
            ],
            items: [
              "Cosmetic renovation: refreshing finishes according to the condition of the walls, floors and ceilings.",
              "Major renovation: demolition, surface preparation and replacement of building services where the survey identifies a need.",
              "New-build renovation: checking the developer's work, preparing surfaces, installing services and finishing.",
              "Complete renovation: an agreed set of stages; furniture, appliances and design are discussed separately.",
            ],
          },
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
            question: "How much does apartment renovation with materials cost?",
            answer:
              "The published SHINEX starting rate covers labour only. Materials are paid for separately and depend on quantities and chosen finishes. The overall budget lists labour, preparation and finishing materials, delivery and waste removal separately.",
          },
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
          {
            question:
              "How is renovation priced for apartments with different room counts?",
            answer:
              "Room count alone does not determine the price. Floor area, condition, kitchen and bathroom work, service connections and finishes all matter. The examples above show calculations for 40, 60 and 80 m²; the final estimate uses the actual work quantities.",
          },
          {
            question:
              "What should a renovation quote including materials specify?",
            answer:
              "Ask for a list of preparation and finishing materials, quantities and specifications, delivery and handling. Check doors, sanitary equipment, lighting, furniture and appliances separately. Two rates per m² are not comparable without the specification.",
          },
        ],
        calculatorLabel: "Discuss your renovation",
        contactLabel: "Discuss renovation costs",
        relatedTitle: "Services to plan your project",
      },
      de: {
        eyebrow: "Renovierungskosten",
        title: "Kosten der Wohnungsrenovierung in Eriwan",
        description: `${renovationStartingPrice.de ? `Arbeitskosten für Wohnungsrenovierung ${renovationStartingPrice.de}. ` : ""}Materialien werden separat bezahlt. Die genauen Arbeitskosten vereinbaren wir nach Besichtigung und Kostenvoranschlag.`,
        seoTitle: "Kosten der Wohnungsrenovierung in Eriwan | SHINEX",
        seoDescription: `${renovationStartingPrice.de ? `Wohnungsrenovierung in Eriwan ${renovationStartingPrice.de}. ` : ""}Nur Arbeitskosten, Material extra. Beispiele für 40, 60 und 80 m². Kostenvoranschlag von SHINEX.`,
        introduction: [
          "Die Kosten einer Wohnungsrenovierung hängen von Zustand, Fläche und vereinbarten Arbeiten ab. Bei SHINEX besprechen wir Rückbau, Elektro- und Sanitärarbeiten sowie Ausbau und erstellen nach Besichtigung und Aufmaß eine genaue Kostenschätzung.",
          "Nachfolgend erklären wir den Unterschied zwischen Boden- und Bearbeitungsfläche und worauf Sie in einem Angebot achten sollten. Kontaktieren Sie uns für eine Kostenschätzung Ihres Objekts.",
        ],
        sections: [
          {
            title: "Renovierungskosten je m²: Was wird gemessen?",
            paragraphs: [
              "Durchschnittliche Renovierungskosten je m² = vereinbarte Gesamtsumme ÷ Wohnungsbodenfläche. Dies eignet sich nur zum Angebotsvergleich, wenn die Arbeiten und die Berücksichtigung der Materialien identisch sind.",
              "Der Quadratmeterpreis einer einzelnen Arbeit gilt für die behandelte Oberfläche. Beim Streichen zählt die Wandfläche, beim Bodenbelag die Bodenfläche. Diese Preise sind nicht direkt mit den Gesamtrenovierungskosten je Quadratmeter Wohnungsfläche vergleichbar.",
            ],
          },
          {
            title: "Wie die Renovierungsart das Budget beeinflusst",
            paragraphs: [
              "Zwei Wohnungen mit gleicher Bodenfläche können unterschiedliche Arbeiten benötigen. Klären Sie vor dem Kostenvergleich, was bleiben kann und was vorbereitet oder ersetzt werden muss.",
            ],
            items: [
              "Optische Renovierung: Oberflächen erneuern, je nach Zustand von Wänden, Böden und Decken.",
              "Umfassende Sanierung: Rückbau, Untergrundvorbereitung und Austausch der Gebäudetechnik, soweit die Besichtigung dies erfordert.",
              "Neubaurenovierung: Bauträgerarbeiten prüfen, Untergründe vorbereiten, Technik installieren und Ausbau durchführen.",
              "Komplettrenovierung: ein vereinbarter Phasenumfang; Möbel, Geräte und Planung werden separat besprochen.",
            ],
          },
          {
            title: "Angebote vergleichen",
            paragraphs: [
              "Vergleichen Sie in jedem Angebot dieselben Arbeiten. Prüfen Sie Untergrundvorbereitung, Rückbau, Verbrauchsmaterialien, Lieferung und Bauschuttentsorgung. Eine Summe ohne Aufschlüsselung ist schwer vergleichbar.",
            ],
          },
          {
            title: "Eine genaue Kostenschätzung vorbereiten",
            paragraphs: [
              "Sammeln Sie Grundriss, Fotos, Fläche und gewünschte Änderungen. Eine Besichtigung hilft, Mengen und Materialbedarf festzustellen. Unser Ratgeber erläutert, wie Sie den Kostenvoranschlag lesen.",
            ],
          },
        ],
        faqs: [
          {
            question: "Was kostet eine Wohnungsrenovierung mit Materialien?",
            answer:
              "Der veröffentlichte SHINEX-Einstiegspreis umfasst nur die Arbeiten. Materialien werden separat bezahlt; ihre Kosten hängen von Mengen und gewählter Ausstattung ab. Im Gesamtbudget werden Arbeiten, Vorbereitungs- und Ausbaumaterialien, Lieferung und Entsorgung getrennt aufgeführt.",
          },
          {
            question:
              "Kann ich telefonisch einen genauen Renovierungspreis erhalten?",
            answer:
              "Wir können einen ersten Kostenrahmen besprechen. Eine genaue Kostenschätzung erfordert jedoch eine Besichtigung und einen abgestimmten Umfang.",
          },
          {
            question: "Was sollte ein Kostenvoranschlag enthalten?",
            answer:
              "Er sollte Mengen, Einheiten, Arbeitskosten und separat vereinbarte Materialien oder Bedingungen ausweisen.",
          },
          {
            question:
              "Wie wird die Renovierung von Ein-, Zwei- oder Dreizimmerwohnungen berechnet?",
            answer:
              "Die Zimmerzahl allein bestimmt den Preis nicht. Fläche, Zustand, Arbeiten in Küche und Bad, Anschlüsse und Oberflächen sind entscheidend. Oben finden Sie Beispiele für 40, 60 und 80 m²; der endgültige Kostenvoranschlag beruht auf den tatsächlichen Mengen.",
          },
          {
            question: "Was sollte ein Angebot inklusive Materialien enthalten?",
            answer:
              "Fragen Sie nach Vorbereitungsmaterialien und Belägen mit Mengen und Eigenschaften sowie Lieferung und Transport. Prüfen Sie Türen, Sanitärausstattung, Beleuchtung, Möbel und Geräte getrennt. Ohne genaue Ausstattung sind zwei Quadratmeterpreise nicht vergleichbar.",
          },
        ],
        calculatorLabel: "Renovierung besprechen",
        contactLabel: "Renovierungskosten besprechen",
        relatedTitle: "Leistungen zur Projektplanung",
      },
      fr: {
        eyebrow: "Coûts de rénovation",
        title: "Coût de rénovation d’appartement à Erevan",
        description: `${renovationStartingPrice.fr ? `Main-d’œuvre pour rénovation d’appartement ${renovationStartingPrice.fr}. ` : ""}Les matériaux sont payés séparément. Le coût exact des travaux est défini après une visite et un devis détaillé.`,
        seoTitle: "Coût de rénovation d’appartement à Erevan | SHINEX",
        seoDescription: `${renovationStartingPrice.fr ? `Rénovation d’appartement à Erevan ${renovationStartingPrice.fr}. ` : ""}Main-d’œuvre seule, matériaux en supplément. Exemples pour 40, 60 et 80 m². Devis SHINEX.`,
        introduction: [
          "Le coût de rénovation dépend de l’état du bien, de sa surface et des travaux convenus. Chez SHINEX, nous discutons de la démolition, de l’électricité, de la plomberie et des finitions, puis établissons un devis précis après visite et mesures.",
          "Nous expliquons ci-dessous la différence entre surface au sol et surface à traiter, ainsi que les points à vérifier dans un devis. Contactez-nous pour discuter d’une estimation de votre bien.",
        ],
        sections: [
          {
            title: "Coût de rénovation au m² : que mesure-t-on ?",
            paragraphs: [
              "Coût moyen de rénovation au m² = montant total du devis convenu ÷ surface au sol de l’appartement. Cette valeur permet de comparer des devis uniquement s’ils couvrent les mêmes travaux et comptabilisent les matériaux de la même façon.",
              "Le tarif au m² d’une tâche s’applique à la surface traitée. La peinture utilise la surface des murs, les revêtements de sol la surface au sol. Ces tarifs ne se comparent pas directement au coût d’une rénovation complète par m² d’appartement.",
            ],
          },
          {
            title: "Comment le type de rénovation influence le budget",
            paragraphs: [
              "Deux appartements de même surface peuvent nécessiter des travaux différents. Avant de comparer les coûts, déterminez ce qui peut être conservé et ce qui doit être préparé ou remplacé.",
            ],
            items: [
              "Rénovation légère : renouveler les finitions selon l’état des murs, sols et plafonds.",
              "Rénovation lourde : démolition, préparation des surfaces et remplacement des réseaux lorsque la visite en confirme le besoin.",
              "Rénovation de logement neuf : vérification des travaux du promoteur, préparation des surfaces, installation des réseaux et finitions.",
              "Rénovation complète : un ensemble d’étapes convenues ; le mobilier, les appareils et la conception sont discutés séparément.",
            ],
          },
          {
            title: "Comparer les devis",
            paragraphs: [
              "Comparez les mêmes travaux dans chaque devis. Vérifiez la préparation des surfaces, la démolition, les consommables, la livraison et l’évacuation des gravats. Un total sans ce détail est difficile à comparer.",
            ],
          },
          {
            title: "Préparer un devis précis",
            paragraphs: [
              "Réunissez un plan, des photos, la surface et les changements souhaités. Une visite permet de déterminer les quantités et les matériaux nécessaires. Notre guide explique comment lire le devis obtenu.",
            ],
          },
        ],
        faqs: [
          {
            question:
              "Combien coûte une rénovation d’appartement avec matériaux ?",
            answer:
              "Le tarif de départ publié par SHINEX comprend uniquement la main-d’œuvre. Les matériaux sont payés séparément selon les quantités et les finitions choisies. Le budget total distingue travaux, matériaux de préparation et de finition, livraison et évacuation.",
          },
          {
            question:
              "Puis-je obtenir un prix exact de rénovation par téléphone ?",
            answer:
              "Nous pouvons discuter d’une première fourchette, mais un devis exact nécessite une visite et un périmètre convenu.",
          },
          {
            question: "Que doit contenir un devis ?",
            answer:
              "Il doit indiquer les quantités, les unités, le coût des travaux et les matériaux ou conditions convenus séparément.",
          },
          {
            question:
              "Comment calculer la rénovation selon le nombre de pièces ?",
            answer:
              "Le nombre de pièces ne suffit pas à déterminer le prix. Surface, état, travaux en cuisine et salles d’eau, raccordements et finitions comptent aussi. Les exemples ci-dessus portent sur 40, 60 et 80 m² ; le devis définitif repose sur les quantités réelles.",
          },
          {
            question:
              "Que vérifier dans un devis de rénovation matériaux compris ?",
            answer:
              "Demandez la liste des matériaux de préparation et de finition, leurs quantités et caractéristiques, la livraison et la manutention. Vérifiez séparément portes, sanitaires, éclairage, mobilier et électroménager. Sans cette liste, deux prix au m² ne sont pas comparables.",
          },
        ],
        calculatorLabel: "Discuter de votre rénovation",
        contactLabel: "Discuter du coût de rénovation",
        relatedTitle: "Services pour préparer votre projet",
      },
      hy: {
        eyebrow: "Վերանորոգման արժեք",
        title: "Բնակարանի վերանորոգման արժեքը Երևանում",
        description: `${renovationStartingPrice.hy ? `Բնակարանի վերանորոգման աշխատանքներ՝ ${renovationStartingPrice.hy}։ ` : ""}Նյութերը վճարվում են առանձին։ Աշխատանքի ճշգրիտ արժեքը որոշվում է զննումից և նախահաշվի համաձայնեցումից հետո։`,
        seoTitle: "Բնակարանի վերանորոգման գներ Երևանում | SHINEX",
        seoDescription: `${renovationStartingPrice.hy ? `Բնակարանի վերանորոգում Երևանում՝ ${renovationStartingPrice.hy}։ ` : ""}Միայն աշխատանքը, նյութերն առանձին։ 40, 60 և 80 մ²-ի օրինակներ։ Նախահաշիվ՝ SHINEX-ից։`,
        introduction: [
          "Բնակարանի վերանորոգման գինը կախված է տարածքի վիճակից, մակերեսից և համաձայնեցված աշխատանքներից։ SHINEX-ում քննարկում ենք ապամոնտաժումը, էլեկտրական ու սանտեխնիկական աշխատանքները և հարդարումը, իսկ ճշգրիտ նախահաշիվը կազմում ենք զննումից ու չափագրումից հետո։",
          "Ստորև կտեսնեք՝ ինչով է հատակի մակերեսը տարբերվում հարդարման մակերեսից և ինչ ճշտել գնային առաջարկում։ Ձեր տարածքի նախահաշիվը քննարկելու համար կապվեք մեզ հետ։",
        ],
        sections: [
          {
            title: "Վերանորոգման արժեքը 1 քմ-ի համար․ ի՞նչ է հաշվարկվում",
            paragraphs: [
              "Վերանորոգման միջին արժեքը մեկ քմ-ի համար = համաձայնեցված նախահաշվի ընդհանուր գումար ÷ բնակարանի հատակի մակերես։ Այս ցուցանիշով առաջարկները կարելի է համեմատել, երբ աշխատանքների ցանկը նույնն է, և նյութերը նույն կերպ են հաշվառված։",
              "Առանձին աշխատանքի մեկ քմ-ի գինը վերաբերում է մշակվող մակերեսին։ Օրինակ՝ ներկումը հաշվարկվում է պատերի մակերեսով, իսկ հատակի ծածկույթի տեղադրումը՝ հատակի մակերեսով։ Այդ գները չի կարելի ուղղակի համեմատել բնակարանի ամբողջ վերանորոգման մեկ քմ-ի արժեքի հետ։",
            ],
          },
          {
            title: "Ինչպե՞ս է վերանորոգման տեսակը ազդում բյուջեի վրա",
            paragraphs: [
              "Նույն մակերեսով երկու բնակարաններում կարող են տարբեր աշխատանքներ պահանջվել։ Գները համեմատելուց առաջ որոշեք՝ ինչն է պահպանվում, և ինչը պետք է նախապատրաստել կամ փոխարինել։",
            ],
            items: [
              "Կոսմետիկ վերանորոգում՝ ծածկույթների թարմացում՝ ըստ պատերի, հատակի և առաստաղի վիճակի։",
              "Կապիտալ վերանորոգում՝ ապամոնտաժում, մակերեսների նախապատրաստում և ինժեներական համակարգերի փոխարինում՝ ըստ զննման արդյունքների։",
              "Նորակառույց բնակարան՝ կառուցապատողի աշխատանքների ստուգում, մակերեսների նախապատրաստում, հաղորդակցությունների անցկացում և հարդարում։",
              "Ամբողջական վերանորոգում՝ համաձայնեցված փուլերի ցանկով․ կահույքը, տեխնիկան և դիզայնը քննարկվում են առանձին։",
            ],
          },
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
            question: "Որքա՞ն արժե բնակարանի վերանորոգումը նյութերով",
            answer:
              "SHINEX-ի հրապարակված մեկնարկային գինը ներառում է միայն աշխատանքը։ Նյութերը վճարվում են առանձին․ դրանց արժեքը կախված է քանակից և ընտրված հարդարումից։ Ընդհանուր բյուջեում առանձին նշվում են աշխատանքները, նախապատրաստական ու հարդարման նյութերը, առաքումն ու աղբի տեղափոխումը։",
          },
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
          {
            question:
              "Ինչպե՞ս հաշվարկել մեկ, երկու կամ երեք սենյականոց բնակարանի վերանորոգումը։",
            answer:
              "Միայն սենյակների քանակը գին չի որոշում։ Անհրաժեշտ են մակերեսն ու վիճակը, խոհանոցի և սանհանգույցների աշխատանքների ծավալը, ինժեներական կետերի քանակն ու ընտրված հարդարումը։ Վերևում բերված են 40, 60 և 80 մ² հաշվարկի օրինակներ, իսկ վերջնական նախահաշիվը կազմում ենք փաստացի ծավալով։",
          },
          {
            question: "Ի՞նչ ճշտել «նյութերով վերանորոգում» առաջարկի դեպքում։",
            answer:
              "Խնդրեք թվարկել սևագործ և հարդարման նյութերը, քանակներն ու բնութագրերը, առաքումն ու բարձրացումը։ Առանձին ստուգեք՝ ներառվա՞ծ են դռները, սանտեխնիկական սարքերը, լույսերը, կահույքն ու տեխնիկան։ Առանց համալրման ցանկի մեկ մ²-ի երկու գին համեմատելի չեն։",
          },
        ],
        calculatorLabel: "Կապվել մեզ հետ",
        contactLabel: "Քննարկել վերանորոգման արժեքը",
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
