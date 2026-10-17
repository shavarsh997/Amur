import type { Locale } from "@/types";

export type ServicePlanningContent = {
  title: string;
  description: string;
  items: readonly string[];
};

/** Practical guidance drawn from each service's existing scope and FAQ.
 * Keep estimates, deliverables and optional work subject to the agreed project.
 */
export const servicePlanningTranslations = {
  renovation: {
    ru: {
      title: "Как спланировать ремонт дома по частям",
      description:
        "Внутреннюю отделку, самостоятельные инженерные системы и наружные работы важно рассмотреть отдельно.",
      items: [
        "Укажите, какие помещения нужно обновить и в каком состоянии находится существующая отделка.",
        "Отдельно обсудите электрику и сантехнику: их состояние влияет на подготовку к отделочным работам.",
        "Фасад и кровлю включайте в согласованный перечень отдельно, чтобы границы каждого этапа были понятны.",
      ],
    },
    en: {
      title: "Planning a house renovation in stages",
      description:
        "Consider interior finishes, the home's building services and exterior work separately.",
      items: [
        "Identify the rooms to update and the condition of their existing finishes.",
        "Discuss wiring and plumbing separately: their condition affects preparation for finishing work.",
        "List facade and roof work separately in the agreed scope so that each stage has clear boundaries.",
      ],
    },
    hy: {
      title: "Ինչպես պլանավորել տան վերանորոգումն ըստ փուլերի",
      description:
        "Ներքին հարդարումը, տան ինժեներական համակարգերն ու արտաքին աշխատանքները դիտարկեք առանձին։",
      items: [
        "Նշեք՝ որ սենյակներն եք ցանկանում թարմացնել և ինչ վիճակում է առկա հարդարումը։",
        "Առանձին քննարկեք էլեկտրականությունն ու սանտեխնիկան․ դրանց վիճակն ազդում է հարդարման նախապատրաստման վրա։",
        "Ճակատի և տանիքի աշխատանքներն առանձին ներառեք համաձայնեցված ցանկում՝ յուրաքանչյուր փուլի սահմանները հստակեցնելու համար։",
      ],
    },
    de: {
      title: "Eine Hausrenovierung in Etappen planen",
      description:
        "Innenausbau, Haustechnik und Außenarbeiten sollten getrennt betrachtet werden.",
      items: [
        "Benennen Sie die zu erneuernden Räume und den Zustand der vorhandenen Oberflächen.",
        "Besprechen Sie Elektrik und Sanitäranlagen gesondert: Ihr Zustand beeinflusst die Vorbereitung des Innenausbaus.",
        "Führen Sie Fassaden- und Dacharbeiten im vereinbarten Umfang separat auf, damit jede Etappe klar abgegrenzt ist.",
      ],
    },
    fr: {
      title: "Planifier la rénovation d’une maison par étapes",
      description:
        "Les finitions intérieures, les réseaux de la maison et les travaux extérieurs sont à examiner séparément.",
      items: [
        "Précisez les pièces à rénover et l’état des finitions existantes.",
        "Discutez séparément de l’électricité et de la plomberie : leur état conditionne la préparation des finitions.",
        "Distinguez la façade et la toiture dans le périmètre convenu pour délimiter clairement chaque étape.",
      ],
    },
  },
  "house-construction": {
    ru: {
      title: "Что определить до начала строительства",
      description:
        "Для обсуждения строительства нужны исходные данные об участке, проекте и желаемой готовности дома.",
      items: [
        "Уточните, есть ли готовый проект или сначала нужно определить требования к дому и состав чертежей.",
        "Подготовьте ориентировочную площадь, этажность и имеющиеся материалы по участку.",
        "Обозначьте нужный этап готовности: конструкции, инженерные системы и отделку учитывают в составе работ отдельно.",
      ],
    },
    en: {
      title: "What to establish before building",
      description:
        "A construction discussion starts with the site, design and intended level of completion.",
      items: [
        "Clarify whether a design is ready or the home's requirements and drawing set still need defining.",
        "Prepare the approximate floor area, number of storeys and available site information.",
        "Define the intended completion stage: structure, building services and finishes need separate scope decisions.",
      ],
    },
    hy: {
      title: "Ինչ հստակեցնել շինարարությունից առաջ",
      description:
        "Շինարարությունը քննարկելու համար անհրաժեշտ են հողամասի, նախագծի և տան նախատեսվող պատրաստվածության տվյալները։",
      items: [
        "Հստակեցրեք՝ կա՞ պատրաստի նախագիծ, թե նախ պետք է սահմանել տան պահանջներն ու գծագրերի կազմը։",
        "Ներկայացրեք մոտավոր մակերեսը, հարկերի քանակը և հողամասի վերաբերյալ առկա նյութերը։",
        "Նշեք պատրաստվածության ցանկալի փուլը․ կառուցվածքները, ինժեներական համակարգերն ու հարդարումը համաձայնեցվում են առանձին։",
      ],
    },
    de: {
      title: "Was vor dem Baubeginn feststehen sollte",
      description:
        "Grundlage sind Angaben zum Grundstück, zur Planung und zum gewünschten Fertigstellungsstand.",
      items: [
        "Klären Sie, ob ein Entwurf vorliegt oder Anforderungen und benötigte Pläne noch festzulegen sind.",
        "Stellen Sie die ungefähre Fläche, Geschosszahl und vorhandene Grundstücksunterlagen zusammen.",
        "Definieren Sie den gewünschten Bauzustand: Tragwerk, Haustechnik und Ausbau werden im Leistungsumfang getrennt betrachtet.",
      ],
    },
    fr: {
      title: "Ce qu’il faut définir avant de construire",
      description:
        "La discussion repose sur le terrain, le projet et le niveau d’achèvement souhaité.",
      items: [
        "Précisez si le projet est prêt ou si les besoins de la maison et les plans restent à définir.",
        "Préparez la surface approximative, le nombre de niveaux et les informations disponibles sur le terrain.",
        "Définissez le stade d’achèvement attendu : structure, réseaux et finitions nécessitent des choix de périmètre distincts.",
      ],
    },
  },
  "interior-design": {
    ru: {
      title: "Как сформировать задание на интерьер",
      description:
        "Задача помещения и состав проектных материалов определяют содержание дизайн-проекта.",
      items: [
        "Подготовьте план или обмеры и опишите, как должны использоваться основные зоны помещения.",
        "Согласуйте расстановку мебели и оборудования до определения розеток, освещения и сантехнических подключений.",
        "Уточните комплект чертежей; визуализации, подбор мебели и авторское сопровождение включаются только по согласованию.",
      ],
    },
    en: {
      title: "Preparing an interior design brief",
      description:
        "The space's purpose and agreed design documents determine the project scope.",
      items: [
        "Provide a plan or measurements and explain how the main areas will be used.",
        "Agree furniture and equipment layouts before locating outlets, lighting and plumbing connections.",
        "Confirm the drawing set; visualisations, furniture selection and design supervision are included only by agreement.",
      ],
    },
    hy: {
      title: "Ինչպես կազմել ինտերիերի նախագծման առաջադրանքը",
      description:
        "Տարածքի գործառույթն ու համաձայնեցված նախագծային նյութերը որոշում են դիզայն-նախագծի ծավալը։",
      items: [
        "Ներկայացրեք հատակագիծը կամ չափագրումները և նկարագրեք հիմնական գոտիների օգտագործումը։",
        "Կահույքի և սարքավորումների դասավորությունը համաձայնեցրեք մինչև վարդակների, լուսավորության և ջրային միացումների տեղադրությունը որոշելը։",
        "Հստակեցրեք գծագրերի կազմը․ վիզուալիզացիաները, կահույքի ընտրությունն ու հեղինակային ուղեկցումը ներառվում են միայն համաձայնությամբ։",
      ],
    },
    de: {
      title: "Ein Briefing für die Innenraumgestaltung erstellen",
      description:
        "Die Nutzung der Räume und die vereinbarten Planungsunterlagen bestimmen den Projektumfang.",
      items: [
        "Stellen Sie einen Grundriss oder Aufmaße bereit und beschreiben Sie die Nutzung der wichtigsten Bereiche.",
        "Stimmen Sie Möbel und Geräte ab, bevor Steckdosen, Beleuchtung und Sanitäranschlüsse festgelegt werden.",
        "Klären Sie den Planumfang; Visualisierungen, Möbelauswahl und gestalterische Begleitung gehören nur nach Vereinbarung dazu.",
      ],
    },
    fr: {
      title: "Préparer le cahier des charges de l’intérieur",
      description:
        "L’usage des espaces et les documents convenus définissent le contenu du projet.",
      items: [
        "Fournissez un plan ou des relevés et décrivez l’usage des principales zones.",
        "Validez l’emplacement du mobilier et des équipements avant celui des prises, éclairages et raccordements sanitaires.",
        "Précisez les plans attendus ; visualisations, choix du mobilier et suivi de conception sont inclus uniquement sur accord.",
      ],
    },
  },
  "commercial-construction": {
    ru: {
      title: "Что согласовать до ремонта коммерческого объекта",
      description:
        "План работ должен учитывать назначение помещения и условия работы бизнеса.",
      items: [
        "Опишите рабочие зоны, движение посетителей и оборудование, для которого нужны инженерные подключения.",
        "Укажите действующий график или желаемую дату открытия: это исходные данные для обсуждения этапов, а не готовый срок ремонта.",
        "Возможность работы без закрытия объекта оценивается по разделению зон, доступу и безопасности.",
      ],
    },
    en: {
      title: "What to agree before renovating business premises",
      description:
        "The work plan needs to reflect the premises' purpose and business operations.",
      items: [
        "Describe work areas, visitor flow and equipment that needs service connections.",
        "Share operating hours or the desired opening date as inputs for sequencing, not an assumed completion deadline.",
        "Keeping the business open depends on whether work zones, access and safety arrangements allow it.",
      ],
    },
    hy: {
      title: "Ինչ համաձայնեցնել առևտրային տարածքի վերանորոգումից առաջ",
      description:
        "Աշխատանքների պլանը պետք է հաշվի առնի տարածքի գործառույթն ու բիզնեսի աշխատանքի պայմանները։",
      items: [
        "Նկարագրեք աշխատանքային գոտիները, այցելուների շարժը և ինժեներական միացումներ պահանջող սարքավորումները։",
        "Նշեք գործող գրաֆիկը կամ բացման ցանկալի օրը․ դրանք փուլերը քննարկելու տվյալներ են, ոչ թե վերանորոգման հաստատված ժամկետ։",
        "Առանց գործունեությունը դադարեցնելու աշխատելու հնարավորությունը կախված է գոտիների բաժանումից, մուտքից և անվտանգությունից։",
      ],
    },
    de: {
      title: "Was vor der Renovierung eines Gewerbeobjekts zu klären ist",
      description:
        "Der Arbeitsplan berücksichtigt die Raumnutzung und den Geschäftsbetrieb.",
      items: [
        "Beschreiben Sie Arbeitsbereiche, Besucherwege und Geräte mit technischen Anschlussanforderungen.",
        "Nennen Sie Betriebszeiten oder den gewünschten Eröffnungstermin als Planungsgrundlage, nicht als bereits feststehenden Fertigstellungstermin.",
        "Ob der Betrieb geöffnet bleiben kann, hängt von der Trennung der Arbeitsbereiche, dem Zugang und der Sicherheit ab.",
      ],
    },
    fr: {
      title: "Ce qu’il faut convenir avant de rénover un local professionnel",
      description:
        "Le programme des travaux tient compte de l’usage du local et de l’activité de l’entreprise.",
      items: [
        "Décrivez les zones de travail, les parcours des visiteurs et les équipements à raccorder.",
        "Indiquez les horaires ou la date d’ouverture souhaitée comme éléments de planification, sans présumer du délai de réalisation.",
        "Le maintien de l’activité dépend de la séparation des zones, des accès et des conditions de sécurité.",
      ],
    },
  },
  design: {
    ru: {
      title: "От исходных данных к составу проекта",
      description:
        "До подготовки архитектурных решений нужно определить, для какого здания и участка создаётся проект.",
      items: [
        "Соберите имеющиеся документы по участку и обозначьте предполагаемую площадь и этажность здания.",
        "Опишите необходимые помещения и их назначение: эти требования становятся основой планировочных решений.",
        "Разделяйте архитектурную документацию и дизайн интерьера; состав каждого направления согласовывается отдельно.",
      ],
    },
    en: {
      title: "From initial information to the design scope",
      description:
        "Architectural work starts by establishing the building and site the design must address.",
      items: [
        "Collect available site documents and specify the proposed floor area and number of storeys.",
        "Describe the rooms required and their uses to establish the basis for the building layout.",
        "Distinguish architectural documentation from interior design; each has a separately agreed scope.",
      ],
    },
    hy: {
      title: "Ելակետային տվյալներից մինչև նախագծի կազմը",
      description:
        "Ճարտարապետական լուծումներից առաջ պետք է հստակեցնել նախագծվող շենքի և հողամասի պահանջները։",
      items: [
        "Հավաքեք հողամասի առկա փաստաթղթերը և նշեք շենքի նախատեսվող մակերեսն ու հարկերի քանակը։",
        "Նկարագրեք անհրաժեշտ սենյակներն ու դրանց գործառույթը՝ որպես հատակագծային լուծումների հիմք։",
        "Տարբերակեք ճարտարապետական փաստաթղթերն ու ինտերիերի դիզայնը․ յուրաքանչյուր ուղղության կազմը համաձայնեցվում է առանձին։",
      ],
    },
    de: {
      title: "Von den Ausgangsdaten zum Planungsumfang",
      description:
        "Vor dem architektonischen Entwurf werden die Anforderungen an Gebäude und Grundstück geklärt.",
      items: [
        "Sammeln Sie vorhandene Grundstücksunterlagen und nennen Sie die geplante Fläche und Geschosszahl.",
        "Beschreiben Sie benötigte Räume und deren Nutzung als Grundlage der Grundrissplanung.",
        "Trennen Sie Architekturunterlagen und Innenraumgestaltung; der Umfang beider Bereiche wird gesondert vereinbart.",
      ],
    },
    fr: {
      title: "Des données initiales au périmètre du projet",
      description:
        "La conception architecturale commence par les besoins du bâtiment et les caractéristiques du terrain.",
      items: [
        "Rassemblez les documents du terrain et précisez la surface et le nombre de niveaux envisagés.",
        "Décrivez les pièces nécessaires et leurs fonctions pour établir les bases du plan du bâtiment.",
        "Distinguez les documents architecturaux de l’aménagement intérieur ; leurs périmètres sont convenus séparément.",
      ],
    },
  },
  "monolithic-work": {
    ru: {
      title: "Подготовка к обсуждению монолитных работ",
      description:
        "Площадь здания сама по себе не определяет объём железобетонных конструкций.",
      items: [
        "Передайте конструктивные чертежи: по ним определяются геометрия и последовательность работ.",
        "Для оценки нужны объёмы бетона, арматуры и опалубки, а не только общая площадь дома.",
        "Уточните готовность основания и доступ для техники, чтобы обсуждать работы с учётом условий участка.",
      ],
    },
    en: {
      title: "Preparing to discuss concrete construction",
      description:
        "Floor area alone does not determine the quantity of reinforced concrete work.",
      items: [
        "Provide structural drawings to establish the geometry and work sequence.",
        "An estimate needs quantities of concrete, reinforcement and formwork, not just the home's floor area.",
        "Clarify the condition of the prepared base and equipment access so the discussion reflects site conditions.",
      ],
    },
    hy: {
      title: "Մոնոլիտ աշխատանքների քննարկման նախապատրաստում",
      description:
        "Միայն շենքի մակերեսը չի որոշում երկաթբետոնե կառուցվածքների ծավալը։",
      items: [
        "Տրամադրեք կոնստրուկտիվ գծագրերը․ դրանք սահմանում են երկրաչափությունն ու աշխատանքների հաջորդականությունը։",
        "Գնահատման համար անհրաժեշտ են բետոնի, ամրանի և կաղապարի ծավալները, ոչ միայն տան ընդհանուր մակերեսը։",
        "Հստակեցրեք հիմքի պատրաստվածությունն ու տեխնիկայի մուտքը՝ հողամասի պայմանները հաշվի առնելու համար։",
      ],
    },
    de: {
      title: "Ein Gespräch über Stahlbetonarbeiten vorbereiten",
      description:
        "Die Gebäudefläche allein bestimmt nicht den Umfang der Stahlbetonkonstruktion.",
      items: [
        "Stellen Sie Tragwerkspläne bereit, aus denen Geometrie und Arbeitsfolge hervorgehen.",
        "Für die Einschätzung werden Mengen für Beton, Bewehrung und Schalung benötigt, nicht nur die Hausfläche.",
        "Klären Sie den Zustand des vorbereiteten Untergrunds und die Zufahrt für Geräte unter den örtlichen Bedingungen.",
      ],
    },
    fr: {
      title: "Préparer l’étude des travaux en béton armé",
      description:
        "La surface du bâtiment ne suffit pas à définir le volume de la structure en béton armé.",
      items: [
        "Transmettez les plans de structure pour préciser la géométrie et l’enchaînement des travaux.",
        "L’estimation nécessite les quantités de béton, d’armatures et de coffrage, pas seulement la surface de la maison.",
        "Précisez l’état du support préparé et l’accès des engins pour tenir compte des conditions du terrain.",
      ],
    },
  },
  "facade-and-roofing": {
    ru: {
      title: "Что оценить помимо наружного покрытия",
      description:
        "Фасад и кровля работают вместе с основанием, защитными слоями и водоотведением.",
      items: [
        "Покажите существующее покрытие, повреждения и места протечек; фотографии помогают подготовить обсуждение осмотра.",
        "Уточните сведения об утеплении и примыканиях, чтобы оценивать систему целиком, а не только внешний слой.",
        "Сообщите размеры, высоту здания и условия доступа к рабочей зоне: они важны для определения состава наружных работ.",
      ],
    },
    en: {
      title: "What to assess beyond the exterior finish",
      description:
        "Facades and roofs depend on the base, protective layers and drainage as well as the finish.",
      items: [
        "Show existing finishes, damage and leaks; photographs help prepare the site assessment discussion.",
        "Provide information on insulation and junctions so the whole system can be considered.",
        "Share dimensions, building height and work-area access conditions to help establish the exterior work scope.",
      ],
    },
    hy: {
      title: "Ինչ գնահատել արտաքին ծածկույթից բացի",
      description:
        "Ճակատն ու տանիքը կապված են հիմքի, պաշտպանիչ շերտերի և ջրահեռացման հետ։",
      items: [
        "Ցույց տվեք առկա ծածկույթը, վնասվածքներն ու արտահոսքի տեղերը․ լուսանկարները կօգնեն նախապատրաստել զննման քննարկումը։",
        "Ներկայացրեք ջերմամեկուսացման և կցամասերի տվյալները՝ ամբողջ համակարգը գնահատելու համար։",
        "Նշեք չափերը, շենքի բարձրությունն ու աշխատանքային գոտու հասանելիությունը՝ արտաքին աշխատանքների ծավալը հստակեցնելու համար։",
      ],
    },
    de: {
      title: "Was neben der äußeren Oberfläche zu prüfen ist",
      description:
        "Fassade und Dach hängen auch vom Untergrund, den Schutzschichten und der Entwässerung ab.",
      items: [
        "Zeigen Sie vorhandene Oberflächen, Schäden und undichte Stellen; Fotos helfen bei der Vorbereitung der Besichtigung.",
        "Stellen Sie Angaben zu Dämmung und Anschlüssen bereit, damit das gesamte System betrachtet werden kann.",
        "Nennen Sie Abmessungen, Gebäudehöhe und Zugangsmöglichkeiten zur Festlegung des Umfangs der Außenarbeiten.",
      ],
    },
    fr: {
      title: "Ce qu’il faut examiner au-delà du revêtement extérieur",
      description:
        "Façades et toitures dépendent aussi du support, des couches de protection et de l’évacuation des eaux.",
      items: [
        "Montrez les revêtements, dommages et fuites ; les photos aident à préparer la discussion avant la visite.",
        "Fournissez les informations sur l’isolation et les raccords pour examiner le système dans son ensemble.",
        "Indiquez les dimensions, la hauteur du bâtiment et les accès à la zone de travail pour préciser le périmètre des travaux extérieurs.",
      ],
    },
  },
  "new-build-renovation": {
    ru: {
      title: "Что подготовить после передачи квартиры",
      description:
        "Состояние квартиры от застройщика нужно сопоставить с будущей планировкой и выбранной отделкой.",
      items: [
        "Соберите сведения о выполненных застройщиком работах и доступные планы инженерных подключений.",
        "Отметьте расстановку кухни, сантехники и мебели, чтобы уточнить нужные розетки и выводы воды до отделки.",
        "Не считайте стяжку и выравнивание обязательными заранее: необходимость подготовки определяется состоянием поверхностей и покрытием.",
      ],
    },
    en: {
      title: "What to prepare after apartment handover",
      description:
        "Compare the developer's handover condition with the intended layout and finishes.",
      items: [
        "Gather details of the developer's completed work and any available service connection plans.",
        "Mark kitchen fixtures, plumbing fixtures and furniture so outlets and water connections can be settled before finishing.",
        "Do not assume screeding or levelling is always needed: preparation depends on surface condition and the chosen finish.",
      ],
    },
    hy: {
      title: "Ինչ պատրաստել բնակարանի հանձնումից հետո",
      description:
        "Կառուցապատողի հանձնած բնակարանի վիճակը պետք է համադրել ապագա հատակագծի և հարդարման հետ։",
      items: [
        "Հավաքեք կառուցապատողի կատարած աշխատանքների տվյալներն ու ինժեներական միացումների առկա սխեմաները։",
        "Նշեք խոհանոցի, սանտեխնիկայի և կահույքի տեղերը՝ վարդակներն ու ջրի ելքերը մինչև հարդարումը հստակեցնելու համար։",
        "Հատակի շերտի պատրաստումն ու հարթեցումը նախապես պարտադիր մի համարեք․ անհրաժեշտությունը կախված է մակերեսների վիճակից և ծածկույթից։",
      ],
    },
    de: {
      title: "Was nach der Wohnungsübergabe vorzubereiten ist",
      description:
        "Der Übergabezustand wird mit der geplanten Raumaufteilung und den gewünschten Oberflächen abgeglichen.",
      items: [
        "Sammeln Sie Angaben zu den Arbeiten des Bauträgers und vorhandene Pläne der technischen Anschlüsse.",
        "Markieren Sie Küche, Sanitärgegenstände und Möbel, um Steckdosen und Wasseranschlüsse vor dem Ausbau festzulegen.",
        "Estrich und Ausgleich sind nicht automatisch nötig: Die Vorbereitung richtet sich nach Untergrund und gewähltem Belag.",
      ],
    },
    fr: {
      title: "Que préparer après la remise de l’appartement",
      description:
        "L’état livré par le promoteur doit être rapproché du futur agencement et des finitions choisies.",
      items: [
        "Rassemblez les informations sur les travaux du promoteur et les plans de raccordement disponibles.",
        "Situez cuisine, sanitaires et mobilier pour définir prises et arrivées d’eau avant les finitions.",
        "Ne présumez pas qu’une chape ou un ragréage sera nécessaire : la préparation dépend des surfaces et du revêtement retenu.",
      ],
    },
  },
  "turnkey-renovation": {
    ru: {
      title: "Как определить границы ремонта под ключ",
      description:
        "Единая организация ремонта требует понятного перечня работ и решений по комплектации.",
      items: [
        "Уточните, какие этапы и какое оборудование входят в сдачу объекта по вашему проекту.",
        "Разделите в смете работы, материалы и доставку; заранее определите ответственность за закупки.",
        "Передайте готовый дизайн-проект, если он есть, и согласовывайте изменения материалов или планировки до соответствующего этапа.",
      ],
    },
    en: {
      title: "Defining the scope of a complete renovation",
      description:
        "Coordinating a renovation requires a clear work list and decisions about what will be supplied.",
      items: [
        "Clarify which stages and fixtures are included in the project's handover scope.",
        "Separate labour, materials and delivery in the estimate and agree who handles purchasing.",
        "Share an existing design if available and agree changes to materials or layout before the affected stage.",
      ],
    },
    hy: {
      title: "Ինչպես սահմանել ամբողջական վերանորոգման ծավալը",
      description:
        "Վերանորոգման միասնական կազմակերպումը պահանջում է աշխատանքների հստակ ցանկ և մատակարարումների համաձայնեցում։",
      items: [
        "Հստակեցրեք՝ որ փուլերն ու սարքավորումներն են ներառված ձեր նախագծով օբյեկտի հանձնման մեջ։",
        "Նախահաշվում առանձնացրեք աշխատանքները, նյութերն ու առաքումը և նախապես որոշեք՝ ով է պատասխանատու գնումների համար։",
        "Տրամադրեք պատրաստի դիզայն-նախագիծը, եթե կա, և նյութերի կամ հատակագծի փոփոխությունները համաձայնեցրեք մինչև համապատասխան փուլը։",
      ],
    },
    de: {
      title: "Den Umfang einer Komplettsanierung abgrenzen",
      description:
        "Eine koordinierte Renovierung braucht eine klare Leistungsliste und Vereinbarungen zur Ausstattung.",
      items: [
        "Klären Sie, welche Etappen und Einbauten zur vereinbarten Übergabe gehören.",
        "Trennen Sie Arbeit, Material und Lieferung im Kostenvoranschlag und legen Sie die Beschaffung fest.",
        "Übermitteln Sie vorhandene Entwürfe und stimmen Sie Material- oder Grundrissänderungen vor der betroffenen Etappe ab.",
      ],
    },
    fr: {
      title: "Délimiter le périmètre d’une rénovation complète",
      description:
        "La coordination d’une rénovation exige une liste claire des travaux et des fournitures convenues.",
      items: [
        "Précisez les étapes et équipements compris dans la livraison du projet.",
        "Distinguez travaux, matériaux et livraison dans le devis, puis définissez la responsabilité des achats.",
        "Transmettez le projet existant et validez toute modification de matériaux ou d’agencement avant l’étape concernée.",
      ],
    },
  },
  "apartment-interior-design-yerevan": {
    ru: {
      title: "Что обсудить на старте дизайна квартиры",
      description:
        "Проектные решения должны учитывать повседневные привычки жильцов и размеры помещений.",
      items: [
        "Опишите, как используются комнаты и сколько места нужно для хранения и основных предметов мебели.",
        "Свяжите расположение кухни, техники и мебели со сценариями освещения и нужными розетками.",
        "Согласуйте перечень и детализацию чертежей до проектирования: площадь квартиры не определяет весь объём дизайна.",
      ],
    },
    en: {
      title: "Starting an apartment design discussion",
      description:
        "Design decisions should reflect residents' daily routines and the size of each room.",
      items: [
        "Explain how rooms are used and how much space is needed for storage and main furniture pieces.",
        "Connect the kitchen, appliance and furniture layouts with lighting scenarios and outlet locations.",
        "Agree the drawing set and level of detail before design begins: floor area does not define the whole scope.",
      ],
    },
    hy: {
      title: "Ինչ քննարկել բնակարանի դիզայնը սկսելուց առաջ",
      description:
        "Նախագծային լուծումները պետք է հաշվի առնեն բնակիչների առօրյան և սենյակների չափերը։",
      items: [
        "Նկարագրեք սենյակների օգտագործումը և պահեստավորման ու հիմնական կահույքի համար անհրաժեշտ տեղը։",
        "Խոհանոցի, տեխնիկայի և կահույքի դասավորությունը կապեք լուսավորության սցենարների ու վարդակների տեղերի հետ։",
        "Մինչև նախագծումը համաձայնեցրեք գծագրերի ցանկն ու մանրամասնությունը․ միայն մակերեսը չի որոշում դիզայնի ամբողջ ծավալը։",
      ],
    },
    de: {
      title: "Der Einstieg in die Wohnungsgestaltung",
      description:
        "Entwurfsentscheidungen berücksichtigen den Alltag der Bewohner und die Größe der Räume.",
      items: [
        "Beschreiben Sie die Raumnutzung und den Platzbedarf für Stauraum und wichtige Möbel.",
        "Stimmen Sie Küche, Geräte und Möbel mit den Beleuchtungsszenarien und Steckdosen ab.",
        "Vereinbaren Sie Planumfang und Detailtiefe vor Beginn: Die Wohnfläche allein bestimmt nicht den gesamten Gestaltungsumfang.",
      ],
    },
    fr: {
      title: "Bien commencer la conception d’un appartement",
      description:
        "Les choix de conception tiennent compte du quotidien des habitants et des dimensions des pièces.",
      items: [
        "Décrivez l’usage des pièces et la place nécessaire au rangement et aux principaux meubles.",
        "Reliez l’agencement de la cuisine, des appareils et du mobilier aux éclairages et aux prises nécessaires.",
        "Convenez des plans et de leur précision avant la conception : la surface ne définit pas à elle seule tout le périmètre.",
      ],
    },
  },
  "office-renovation-yerevan": {
    ru: {
      title: "Как связать ремонт с работой офиса",
      description:
        "План помещения должен отражать размещение команды, посетителей и оборудования.",
      items: [
        "Отметьте рабочие места, переговорные и общие зоны, прежде чем уточнять перегородки и отделку.",
        "Планируйте сеть, розетки и свет по оборудованию и рабочим местам, а не только по площади офиса.",
        "Для действующего офиса обсудите доступные зоны и время шумных работ; этапность возможна только при подходящих условиях и безопасности.",
      ],
    },
    en: {
      title: "Aligning renovation with office operations",
      description: "The layout needs to reflect staff, visitors and equipment.",
      items: [
        "Mark workstations, meeting rooms and shared areas before settling partitions and finishes.",
        "Plan network points, outlets and lighting around equipment and desks, not floor area alone.",
        "For an occupied office, discuss available zones and noisy-work hours; phased work depends on suitable conditions and safety.",
      ],
    },
    hy: {
      title: "Ինչպես համադրել վերանորոգումն ու գրասենյակի աշխատանքը",
      description:
        "Հատակագիծը պետք է արտացոլի թիմի, այցելուների և սարքավորումների տեղաբաշխումը։",
      items: [
        "Նշեք աշխատատեղերը, հանդիպումների և ընդհանուր գոտիները՝ մինչև միջնապատերն ու հարդարումը հստակեցնելը։",
        "Ցանցը, վարդակներն ու լուսավորությունը պլանավորեք ըստ սարքավորումների և աշխատատեղերի, ոչ միայն մակերեսի։",
        "Գործող գրասենյակում քննարկեք հասանելի գոտիներն ու աղմկոտ աշխատանքների ժամերը․ փուլային աշխատանքը կախված է պայմաններից և անվտանգությունից։",
      ],
    },
    de: {
      title: "Renovierung und Büroalltag aufeinander abstimmen",
      description:
        "Die Raumplanung berücksichtigt Mitarbeitende, Besucher und Ausstattung.",
      items: [
        "Markieren Sie Arbeitsplätze, Besprechungsräume und Gemeinschaftsbereiche vor der Festlegung von Trennwänden und Oberflächen.",
        "Planen Sie Netzwerk, Steckdosen und Licht nach Geräten und Arbeitsplätzen, nicht nur nach Bürofläche.",
        "Besprechen Sie bei laufendem Betrieb verfügbare Bereiche und Zeiten für laute Arbeiten; Etappen setzen geeignete und sichere Bedingungen voraus.",
      ],
    },
    fr: {
      title: "Articuler les travaux avec l’activité du bureau",
      description:
        "Le plan doit refléter la répartition des équipes, des visiteurs et des équipements.",
      items: [
        "Situez postes de travail, salles de réunion et espaces communs avant de définir cloisons et finitions.",
        "Prévoyez réseau, prises et éclairage selon les équipements et les postes, pas uniquement selon la surface.",
        "Dans un bureau occupé, discutez des zones disponibles et des horaires bruyants ; le phasage dépend des conditions et de la sécurité.",
      ],
    },
  },
  "capital-renovation-yerevan": {
    ru: {
      title: "Как определить необходимую глубину ремонта",
      description:
        "Решение о капитальном обновлении опирается на состояние оснований и коммуникаций.",
      items: [
        "Обсудите, какие поверхности и системы требуют проверки: внешний вид отделки не раскрывает их фактическое состояние.",
        "Не включайте полную замену электрики автоматически — её объём зависит от состояния системы и будущей нагрузки.",
        "Уточните демонтаж, выравнивание и инженерные работы до чистовой отделки; точная смета опирается на осмотр.",
      ],
    },
    en: {
      title: "Establishing how extensive the renovation should be",
      description:
        "Major renovation decisions depend on the condition of substrates and building services.",
      items: [
        "Discuss which surfaces and systems need assessment: visible finishes do not reveal their full condition.",
        "Do not assume a complete rewire is required; the scope depends on the existing system and future demand.",
        "Settle demolition, levelling and service work before final finishes; an accurate estimate requires a site assessment.",
      ],
    },
    hy: {
      title: "Ինչպես որոշել վերանորոգման անհրաժեշտ խորությունը",
      description:
        "Կապիտալ վերանորոգման որոշումը հիմնվում է հիմքային մակերեսների և ինժեներական համակարգերի վիճակի վրա։",
      items: [
        "Քննարկեք՝ որ մակերեսներն ու համակարգերն են ստուգման կարիք ունենում․ հարդարման տեսքը չի բացահայտում դրանց ամբողջ վիճակը։",
        "Էլեկտրականության ամբողջական փոխարինումը ինքնաբերաբար մի ներառեք․ ծավալը կախված է համակարգի վիճակից և ապագա բեռից։",
        "Ապամոնտաժումը, հարթեցումն ու ինժեներական աշխատանքները հստակեցրեք մինչև մաքուր հարդարումը․ ճշգրիտ նախահաշիվը հիմնվում է զննման վրա։",
      ],
    },
    de: {
      title: "Die notwendige Eingriffstiefe bestimmen",
      description:
        "Eine umfassende Sanierung richtet sich nach dem Zustand von Untergründen und Haustechnik.",
      items: [
        "Besprechen Sie, welche Flächen und Anlagen geprüft werden müssen: Sichtbare Oberflächen zeigen nicht den gesamten Zustand.",
        "Gehen Sie nicht automatisch von einer vollständigen Erneuerung der Elektrik aus; Zustand und künftige Belastung bestimmen den Umfang.",
        "Klären Sie Rückbau, Ausgleich und technische Arbeiten vor den Endoberflächen; eine genaue Kostenschätzung setzt die Besichtigung voraus.",
      ],
    },
    fr: {
      title: "Déterminer l’ampleur nécessaire de la rénovation",
      description:
        "Une rénovation lourde dépend de l’état des supports et des réseaux.",
      items: [
        "Discutez des surfaces et installations à examiner : l’aspect des finitions ne révèle pas tout leur état.",
        "Ne présumez pas d’un remplacement électrique complet ; son étendue dépend de l’installation et des besoins futurs.",
        "Définissez démolition, mise à niveau et réseaux avant les finitions ; un devis précis repose sur la visite.",
      ],
    },
  },
  "cosmetic-renovation-yerevan": {
    ru: {
      title: "Что проверить перед обновлением отделки",
      description:
        "Косметический ремонт подходит для обновления поверхностей, когда основания и системы в нормальном состоянии.",
      items: [
        "Обозначьте комнаты или отдельные зоны и покрытия, которые нужно обновить: весь объект ремонтировать необязательно.",
        "Уточните состояние стен и пола до выбора материалов, чтобы учесть подготовку и восстановление поверхностей.",
        "Если обнаружены инженерные проблемы, их нужно оценить до отделки; в сроках учитывается высыхание материалов.",
      ],
    },
    en: {
      title: "What to check before refreshing finishes",
      description:
        "Redecoration suits surface updates where substrates and building services are in sound condition.",
      items: [
        "Identify rooms, individual areas and finishes to update; the whole property need not be renovated.",
        "Assess walls and floors before choosing materials so preparation and repairs are included.",
        "Any building-services problems need assessment before finishing; the schedule must also allow for material drying.",
      ],
    },
    hy: {
      title: "Ինչ ստուգել հարդարումը թարմացնելուց առաջ",
      description:
        "Կոսմետիկ վերանորոգումը հարմար է մակերեսները թարմացնելու համար, երբ հիմքերն ու համակարգերը նորմալ վիճակում են։",
      items: [
        "Նշեք թարմացման ենթակա սենյակները, առանձին գոտիներն ու ծածկույթները․ ամբողջ օբյեկտի վերանորոգումը պարտադիր չէ։",
        "Նյութերն ընտրելուց առաջ հստակեցրեք պատերի և հատակի վիճակը՝ նախապատրաստումն ու վերականգնումը հաշվի առնելու համար։",
        "Հայտնաբերված ինժեներական խնդիրները գնահատեք մինչև հարդարումը․ ժամկետներում հաշվի է առնվում նաև նյութերի չորացումը։",
      ],
    },
    de: {
      title: "Was vor der Erneuerung der Oberflächen zu prüfen ist",
      description:
        "Eine kosmetische Renovierung eignet sich bei intakten Untergründen und technischen Anlagen.",
      items: [
        "Benennen Sie Räume, einzelne Bereiche und Beläge; nicht das gesamte Objekt muss erneuert werden.",
        "Prüfen Sie Wände und Böden vor der Materialwahl, damit Vorbereitung und Ausbesserungen berücksichtigt werden.",
        "Technische Probleme müssen vor der Oberflächenbearbeitung bewertet werden; auch Trocknungszeiten gehören in die Zeitplanung.",
      ],
    },
    fr: {
      title: "Que vérifier avant de rafraîchir les finitions",
      description:
        "Le rafraîchissement convient lorsque les supports et les réseaux sont en bon état.",
      items: [
        "Identifiez les pièces, zones et revêtements à renouveler ; tout le logement n’a pas forcément besoin de travaux.",
        "Évaluez murs et sols avant de choisir les matériaux pour intégrer préparation et réparations.",
        "Les problèmes de réseaux doivent être examinés avant les finitions ; le calendrier tient aussi compte du séchage des matériaux.",
      ],
    },
  },
  "plumbing-work-yerevan": {
    ru: {
      title: "Что согласовать до разводки труб",
      description:
        "Схема сантехнических точек должна соответствовать будущему оборудованию и существующей системе.",
      items: [
        "Отметьте сантехнику, кухонную технику и мебель, чтобы определить места подачи воды и канализации.",
        "Перенос точек и замену старых узлов оценивайте с учётом технических условий, а не только желаемой планировки.",
        "Согласуйте инженерный этап до отделки стен и пола и включите проверку смонтированной системы в перечень работ.",
      ],
    },
    en: {
      title: "What to agree before installing pipework",
      description:
        "Plumbing points need to suit the planned equipment and the existing system.",
      items: [
        "Mark fixtures, kitchen appliances and furniture to establish water supply and drainage locations.",
        "Assess relocated connections and replacement of old components against technical conditions, not the preferred layout alone.",
        "Agree service installation before wall and floor finishes and include checking the installed system in the work scope.",
      ],
    },
    hy: {
      title: "Ինչ համաձայնեցնել խողովակների անցկացումից առաջ",
      description:
        "Սանտեխնիկական կետերի սխեման պետք է համապատասխանի նախատեսվող սարքավորումներին և առկա համակարգին։",
      items: [
        "Նշեք սանտեխնիկան, խոհանոցային տեխնիկան և կահույքը՝ ջրամատակարարման ու կոյուղու կետերը որոշելու համար։",
        "Կետերի տեղափոխումն ու հին հանգույցների փոխարինումը գնահատեք ըստ տեխնիկական պայմանների, ոչ միայն ցանկալի հատակագծի։",
        "Ինժեներական փուլը համաձայնեցրեք մինչև պատերի ու հատակի հարդարումը և ցանկում ներառեք տեղադրված համակարգի ստուգումը։",
      ],
    },
    de: {
      title: "Was vor der Rohrverlegung abzustimmen ist",
      description:
        "Sanitäranschlüsse müssen zur geplanten Ausstattung und zum vorhandenen System passen.",
      items: [
        "Markieren Sie Sanitärobjekte, Küchengeräte und Möbel für die Planung von Wasser- und Abwasseranschlüssen.",
        "Bewerten Sie Verlegungen und den Austausch alter Komponenten anhand technischer Bedingungen, nicht allein nach dem Wunschgrundriss.",
        "Stimmen Sie die Installation vor Wand- und Bodenbelägen ab und nehmen Sie die Prüfung des eingebauten Systems in den Umfang auf.",
      ],
    },
    fr: {
      title: "Ce qu’il faut convenir avant la pose des canalisations",
      description:
        "Les points sanitaires doivent correspondre aux équipements prévus et au réseau existant.",
      items: [
        "Situez sanitaires, appareils de cuisine et mobilier pour définir les arrivées et évacuations d’eau.",
        "Évaluez déplacements et remplacement d’anciens éléments selon les conditions techniques, pas seulement l’agencement souhaité.",
        "Planifiez les réseaux avant les revêtements des murs et sols et incluez la vérification du système installé dans les travaux.",
      ],
    },
  },
  "electrical-work-yerevan": {
    ru: {
      title: "Что подготовить для плана электрики",
      description:
        "План подключений начинается с использования помещения, мебели и оборудования.",
      items: [
        "Составьте перечень техники и отметьте рабочие зоны, чтобы обсудить нужную мощность и места подключения.",
        "Свяжите розетки, выключатели и освещение с расстановкой мебели до закрытия стен.",
        "Замену существующей системы и установку выбранных светильников согласуйте отдельно в составе проекта.",
      ],
    },
    en: {
      title: "Preparing an electrical layout",
      description:
        "Connection planning starts with how the space, furniture and equipment will be used.",
      items: [
        "List appliances and mark work areas to discuss power requirements and connection locations.",
        "Coordinate outlets, switches and lighting with furniture placement before walls are closed.",
        "Agree replacement of the existing system and installation of chosen light fittings explicitly in the project scope.",
      ],
    },
    hy: {
      title: "Ինչ պատրաստել էլեկտրականության պլանի համար",
      description:
        "Միացումների պլանավորումը սկսվում է տարածքի, կահույքի և սարքավորումների օգտագործումից։",
      items: [
        "Կազմեք տեխնիկայի ցանկը և նշեք աշխատանքային գոտիները՝ անհրաժեշտ հզորությունն ու միացումների տեղերը քննարկելու համար։",
        "Վարդակները, անջատիչներն ու լուսավորությունը համադրեք կահույքի դասավորության հետ՝ մինչև պատերը փակելը։",
        "Առկա համակարգի փոխարինումն ու ընտրված լուսատուների տեղադրումը նախագծի կազմում համաձայնեցրեք առանձին։",
      ],
    },
    de: {
      title: "Einen Elektroplan vorbereiten",
      description:
        "Die Anschlussplanung beginnt mit der Nutzung der Räume, Möbel und Geräte.",
      items: [
        "Erstellen Sie eine Geräteliste und markieren Sie Arbeitsbereiche, um Leistungsbedarf und Anschlussorte zu besprechen.",
        "Stimmen Sie Steckdosen, Schalter und Beleuchtung mit der Möblierung ab, bevor Wände geschlossen werden.",
        "Vereinbaren Sie den Austausch der vorhandenen Anlage und die Montage ausgewählter Leuchten ausdrücklich im Projektumfang.",
      ],
    },
    fr: {
      title: "Préparer le plan électrique",
      description:
        "La planification des raccordements part de l’usage des espaces, du mobilier et des équipements.",
      items: [
        "Dressez la liste des appareils et situez les zones de travail pour discuter puissance nécessaire et raccordements.",
        "Coordonnez prises, interrupteurs et éclairages avec le mobilier avant de fermer les murs.",
        "Convenez explicitement du remplacement de l’installation et de la pose des luminaires choisis dans le périmètre du projet.",
      ],
    },
  },
} as const satisfies Record<string, Record<Locale, ServicePlanningContent>>;

export function getServicePlanning(
  slug: string,
  locale: Locale
): ServicePlanningContent | undefined {
  if (!Object.hasOwn(servicePlanningTranslations, slug)) return undefined;
  return servicePlanningTranslations[
    slug as keyof typeof servicePlanningTranslations
  ][locale];
}
