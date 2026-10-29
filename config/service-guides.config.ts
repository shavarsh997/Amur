import type { Locale } from "@/types";

type Label = Record<Locale, string>;
type GuideLink = { path: string; label: Label; description: Label };

export const serviceGuidesTitle: Label = {
  hy: "Ընտրեք աշխատանքները կամ հաշվարկեք արժեքը",
  ru: "Выберите задачу или рассчитайте стоимость",
  en: "Explore the work you need or plan your budget",
  de: "Passende Arbeiten finden oder das Budget planen",
  fr: "Découvrez les travaux adaptés ou préparez votre budget",
};

export const serviceGuidesDescription: Label = {
  hy: "Նորակառույցը ցույց է տալիս բնակարանի սկզբնական վիճակը, կապիտալ և կոսմետիկ վերանորոգումը՝ փոփոխությունների ծավալը։ Ամբողջական վերանորոգումը վերաբերում է համաձայնեցված աշխատանքների կազմակերպմանը մեկ ընկերության կողմից։",
  ru: "Новостройка — исходное состояние квартиры, капитальный и косметический ремонт — объём изменений. «Под ключ» означает организацию согласованных работ одной компанией.",
  en: "A new-build describes the apartment’s starting condition; major renovation and redecoration describe the extent of changes. Turnkey renovation means one company coordinates the agreed work.",
  de: "Neubau beschreibt den Ausgangszustand der Wohnung, Sanierung und Auffrischung den Umfang der Änderungen. Bei einer schlüsselfertigen Renovierung koordiniert ein Unternehmen die vereinbarten Arbeiten.",
  fr: "Le neuf décrit l’état initial du logement ; la rénovation lourde et le rafraîchissement décrivent l’ampleur des changements. La formule clé en main confie la coordination des travaux convenus à une entreprise.",
};

export const serviceGuideGroups: readonly {
  title: Label;
  links: readonly GuideLink[];
}[] = [
  {
    title: {
      hy: "Բնակարանի վերանորոգում",
      ru: "Ремонт квартиры",
      en: "Apartment renovation",
      de: "Wohnungsrenovierung",
      fr: "Rénovation d’appartement",
    },
    links: [
      {
        path: "services/apartment-renovation-yerevan",
        description: {
          hy: "Սկսեք այստեղից, եթե դեռ որոշում եք վերանորոգման ծավալը։",
          ru: "Начните здесь, если ещё выбираете объём ремонта.",
          en: "Start here if you are still choosing the scope of renovation.",
          de: "Beginnen Sie hier, wenn der Renovierungsumfang noch offen ist.",
          fr: "Commencez ici si vous définissez encore l’ampleur des travaux.",
        },
        label: {
          hy: "Բնակարանների վերանորոգում Երևանում",
          ru: "Ремонт квартир в Ереване",
          en: "Apartment renovation in Yerevan",
          de: "Wohnungsrenovierung in Eriwan",
          fr: "Rénovation d’appartement à Erevan",
        },
      },
      {
        path: "services/new-build-renovation",
        description: {
          hy: "Ստուգել կառուցապատողի հանձնած վիճակը և պլանավորել հարդարումը։",
          ru: "Проверить состояние после застройщика и спланировать отделку.",
          en: "Assess the developer’s handover condition and plan the finishing work.",
          de: "Den Übergabezustand vom Bauträger prüfen und den Ausbau planen.",
          fr: "Évaluer l’état livré par le promoteur et préparer les finitions.",
        },
        label: {
          hy: "Նորակառույց բնակարան",
          ru: "Квартира в новостройке",
          en: "New-build apartments",
          de: "Neubauwohnungen",
          fr: "Appartements neufs",
        },
      },
      {
        path: "services/turnkey-renovation",
        description: {
          hy: "Համաձայնեցնել փուլերը, գնումների պատասխանատվությունը և հանձնումը։",
          ru: "Согласовать этапы, ответственность за закупки и сдачу объекта.",
          en: "Agree stages, purchasing responsibilities and handover.",
          de: "Etappen, Verantwortung für den Einkauf und Übergabe vereinbaren.",
          fr: "Convenir des étapes, des responsabilités d’achat et de la réception.",
        },
        label: {
          hy: "Ամբողջական վերանորոգում",
          ru: "Ремонт под ключ",
          en: "Complete renovation service",
          de: "Komplette Renovierungsleistung",
          fr: "Service de rénovation complète",
        },
      },
      {
        path: "services/capital-renovation-yerevan",
        description: {
          hy: "Ապամոնտաժում, հիմքերի վերականգնում և համակարգերի փոխարինում՝ ըստ զննման։",
          ru: "Демонтаж, восстановление оснований и замена систем по осмотру.",
          en: "Removal work, substrate repairs and replacement of systems after assessment.",
          de: "Rückbau, Instandsetzung der Untergründe und Erneuerung der Haustechnik nach Prüfung.",
          fr: "Dépose, reprise des supports et remplacement des réseaux après évaluation.",
        },
        label: {
          hy: "Կապիտալ վերանորոգում",
          ru: "Капитальный ремонт",
          en: "Major renovation",
          de: "Umfassende Sanierung",
          fr: "Rénovation lourde",
        },
      },
      {
        path: "services/cosmetic-renovation-yerevan",
        description: {
          hy: "Թարմացնել ծածկույթները՝ պահպանելով պիտանի հիմքերն ու համակարգերը։",
          ru: "Обновить покрытия, сохранив пригодные основания и коммуникации.",
          en: "Refresh finishes while retaining sound substrates and building services.",
          de: "Oberflächen erneuern und intakte Untergründe und Leitungen erhalten.",
          fr: "Renouveler les finitions en conservant les supports et réseaux en bon état.",
        },
        label: {
          hy: "Հարդարման թարմացում",
          ru: "Косметический ремонт",
          en: "Redecoration and interior refresh",
          de: "Renovierung und Auffrischung des Innenraums",
          fr: "Rafraîchissement et rénovation légère",
        },
      },
    ],
  },
  {
    title: {
      hy: "Առանձին աշխատանքներ",
      ru: "Отдельные задачи",
      en: "Specialist work",
      de: "Facharbeiten",
      fr: "Travaux spécialisés",
    },
    links: [
      {
        path: "services/office-renovation-yerevan",
        description: {
          hy: "Աշխատատեղեր, հանդիպումների գոտիներ, ցանց և լուսավորություն։",
          ru: "Рабочие места, переговорные, сеть и освещение.",
          en: "Workstations, meeting spaces, network connections and lighting.",
          de: "Arbeitsplätze, Besprechungsräume, Netzwerk und Beleuchtung.",
          fr: "Postes de travail, salles de réunion, réseau et éclairage.",
        },
        label: {
          hy: "Գրասենյակի վերանորոգում",
          ru: "Ремонт офиса",
          en: "Office renovation",
          de: "Bürorenovierung",
          fr: "Rénovation de bureaux",
        },
      },
      {
        path: "services/plumbing-work-yerevan",
        description: {
          hy: "Ջրամատակարարում, կոյուղի և խոհանոցի ու սանհանգույցի միացումներ։",
          ru: "Вода, канализация и подключения кухни и санузла.",
          en: "Water supply, drainage, kitchen and bathroom connections.",
          de: "Wasserversorgung, Abwasser sowie Küchen- und Badanschlüsse.",
          fr: "Alimentation en eau, évacuation et raccordements de cuisine et salle de bains.",
        },
        label: {
          hy: "Սանտեխնիկական աշխատանքներ",
          ru: "Сантехнические работы",
          en: "Plumbing installation",
          de: "Sanitärinstallation",
          fr: "Installation de plomberie",
        },
      },
      {
        path: "services/electrical-work-yerevan",
        description: {
          hy: "Լարեր, վարդակներ և լույս՝ ըստ կահույքի ու տեխնիկայի դասավորության։",
          ru: "Проводка, розетки и свет по плану мебели и оборудования.",
          en: "Wiring, sockets and lighting matched to furniture and equipment.",
          de: "Leitungen, Steckdosen und Licht passend zu Möbeln und Geräten.",
          fr: "Câblage, prises et éclairage adaptés au mobilier et aux équipements.",
        },
        label: {
          hy: "Էլեկտրական աշխատանքներ",
          ru: "Электромонтажные работы",
          en: "Electrical installation",
          de: "Elektroinstallation",
          fr: "Installation électrique",
        },
      },
      {
        path: "services/apartment-interior-design-yerevan",
        description: {
          hy: "Դասավորություն, պահոցներ, կահույք և գծագրեր՝ մինչև վերանորոգումը։",
          ru: "Планировка, хранение, мебель и чертежи до начала ремонта.",
          en: "Layout, storage, furniture and drawings before renovation begins.",
          de: "Grundriss, Stauraum, Möbel und Pläne vor Renovierungsbeginn.",
          fr: "Agencement, rangements, mobilier et plans avant les travaux.",
        },
        label: {
          hy: "Բնակարանի ինտերիերի դիզայն",
          ru: "Дизайн интерьера квартиры",
          en: "Apartment interior design",
          de: "Wohnungsinnenraumgestaltung",
          fr: "Aménagement intérieur d’appartement",
        },
      },
    ],
  },
  {
    title: {
      hy: "Բյուջե և նախահաշիվ",
      ru: "Бюджет и смета",
      en: "Budget and estimates",
      de: "Budget und Kostenschätzungen",
      fr: "Budget et devis",
    },
    links: [
      {
        path: "prices",
        description: {
          hy: "Աշխատանքի մեկնարկային գին, նյութերն առանձին և մակերեսով օրինակներ։",
          ru: "Стартовая цена работ, материалы отдельно и примеры по площади.",
          en: "Starting labour price, materials priced separately and floor-area examples.",
          de: "Einstiegspreis der Arbeiten, separate Materialkosten und Flächenbeispiele.",
          fr: "Prix de départ des travaux, matériaux séparés et exemples selon la surface.",
        },
        label: {
          hy: "Բնակարանի վերանորոգման արժեքը",
          ru: "Стоимость ремонта квартиры",
          en: "Apartment renovation costs",
          de: "Kosten einer Wohnungsrenovierung",
          fr: "Coût de rénovation d’appartement",
        },
      },
      {
        path: "renovation-estimate-yerevan",
        description: {
          hy: "Ի՞նչ տվյալներ ուղարկել և ինչպե՞ս համաձայնեցնել ծավալներն ու հաշվարկը։",
          ru: "Какие данные отправить и как согласовать объёмы и расчёт.",
          en: "What to send and how quantities and the estimate are agreed.",
          de: "Welche Angaben nötig sind und wie Mengen und Kosten abgestimmt werden.",
          fr: "Quelles informations envoyer et comment convenir des quantités et du devis.",
        },
        label: {
          hy: "Վերանորոգման նախահաշիվ",
          ru: "Смета на ремонт",
          en: "Renovation estimate guide",
          de: "Ratgeber zur Renovierungskostenschätzung",
          fr: "Guide du devis de rénovation",
        },
      },
      {
        path: "calculator",
        description: {
          hy: "Շինարարության կամ դիզայնի հաշվարկի հայտ։ Վերանորոգումը քննարկվում է առանձին։",
          ru: "Заявка на расчёт строительства или дизайна. Ремонт обсуждается отдельно.",
          en: "Request a construction or design calculation. Renovation is discussed separately.",
          de: "Berechnung für Bau oder Planung anfragen. Renovierungen werden gesondert besprochen.",
          fr: "Demander un calcul de construction ou de conception. La rénovation se discute séparément.",
        },
        label: {
          hy: "Շինարարության և դիզայնի հաշվիչ",
          ru: "Калькулятор строительства и дизайна",
          en: "Construction and design calculator",
          de: "Bau- und Planungsrechner",
          fr: "Calculateur de construction et de conception",
        },
      },
    ],
  },
];
