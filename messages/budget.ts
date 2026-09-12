import type { Locale } from "@/types";

type BudgetCopy = {
  title: string;
  items: readonly { title: string; description: string }[];
  areaTitle: string;
  areaDescription: string;
  formula: string;
  exampleTitle: string;
  exampleDescription: string;
  work: string;
  quantity: string;
  amount: string;
  squareMetres: string;
  rate: string;
  rows: readonly string[];
  exampleNote: string;
  totalNote: string;
};

export const budgetCopy: Record<Locale, BudgetCopy> = {
  ru: {
    title: "Из чего складывается бюджет",
    items: [
      {
        title: "Работы",
        description:
          "Перечень операций, их объём и цена за единицу. Подготовка стен, покраска, укладка пола и монтаж оборудования рассчитываются отдельно.",
      },
      {
        title: "Материалы",
        description:
          "Черновые и отделочные материалы, расходники и оборудование. В предложении должны быть понятны выбранные позиции и кто отвечает за их закупку.",
      },
      {
        title: "Дополнительные расходы",
        description:
          "Проверьте, учтены ли доставка, подъём материалов, вывоз строительного мусора и условия работы на объекте. Перечень зависит от задачи.",
      },
    ],
    areaTitle: "Площадь квартиры и площадь отделки — разные величины",
    areaDescription:
      "В комнате 4 × 5 м площадь пола составляет 20 м². При высоте 2,7 м площадь четырёх стен до вычета дверей и окон — 48,6 м². Поэтому цену покраски стены нельзя просто умножить на площадь пола.",
    formula: "Стоимость работы = измеренный объём × цена за единицу",
    exampleTitle: "Как читать строки сметы",
    exampleDescription:
      "Пример объёмов для комнаты 4 × 5 м с высотой 2,7 м. Для каждой операции нужна своя ставка, а материалы указываются отдельно.",
    work: "Работа",
    quantity: "Объём",
    amount: "Расчёт суммы",
    squareMetres: "м²",
    rate: "ставка за м²",
    rows: [
      "Подготовка стен",
      "Покраска стен",
      "Отделка потолка",
      "Укладка напольного покрытия",
    ],
    exampleNote:
      "Это пример структуры сметы. Площадь дверей и окон, фактическое состояние поверхностей и выбранная отделка уточняют объёмы; тарифы определяются для конкретной работы.",
    totalNote:
      "Итоговая смета складывается из стоимости всех работ, отдельно перечисленных материалов и согласованных дополнительных расходов. Проверьте, не посчитана ли одна операция дважды.",
  },
  en: {
    title: "What makes up the budget",
    items: [
      {
        title: "Labour",
        description:
          "Each task has a quantity and unit rate. Wall preparation, painting, flooring and fixture installation should be itemised separately.",
      },
      {
        title: "Materials",
        description:
          "Preparation and finishing materials, consumables and equipment. The quotation should identify the selected items and who will purchase them.",
      },
      {
        title: "Additional costs",
        description:
          "Check delivery, moving materials to the work area, construction waste removal and site access requirements. The relevant items depend on the project.",
      },
    ],
    areaTitle: "Floor area is different from finishing area",
    areaDescription:
      "A room measuring 4 × 5 m has a floor area of 20 m². At a height of 2.7 m, its four walls cover 48.6 m² before deducting doors and windows. A wall painting rate therefore cannot simply be multiplied by the floor area.",
    formula: "Cost of a task = measured quantity × unit rate",
    exampleTitle: "Reading an itemised estimate",
    exampleDescription:
      "Example quantities for a 4 × 5 m room with a height of 2.7 m. Each task needs its own rate, with materials listed separately.",
    work: "Task",
    quantity: "Quantity",
    amount: "Cost calculation",
    squareMetres: "m²",
    rate: "rate per m²",
    rows: [
      "Wall preparation",
      "Wall painting",
      "Ceiling finish",
      "Floor covering installation",
    ],
    exampleNote:
      "This illustrates the structure of an estimate. Door and window openings, surface condition and finish choices affect the quantities; rates are established for the specific work.",
    totalNote:
      "The final estimate combines all labour items, separately listed materials and agreed additional costs. Check that the same task has not been counted twice.",
  },
  hy: {
    title: "Ինչի՞ց է կազմվում բյուջեն",
    items: [
      {
        title: "Աշխատանքներ",
        description:
          "Յուրաքանչյուր աշխատանքի համար նշվում են ծավալն ու միավորի գինը։ Պատերի նախապատրաստումը, ներկումը, հատակի ծածկույթի և սարքավորումների տեղադրումը հաշվարկվում են առանձին։",
      },
      {
        title: "Նյութեր",
        description:
          "Նախապատրաստական ու հարդարման նյութեր, օժանդակ նյութեր և սարքավորումներ։ Առաջարկում պետք է պարզ լինի, թե ինչ է ընտրված և ով է կատարում գնումները։",
      },
      {
        title: "Լրացուցիչ ծախսեր",
        description:
          "Ճշտեք՝ հաշվի են առնված արդյոք առաքումը, նյութերի բարձրացումը, շինարարական աղբի տեղափոխումն ու տարածքում աշխատելու պայմանները։ Ցանկը կախված է նախագծից։",
      },
    ],
    areaTitle: "Հատակի և հարդարման մակերեսները տարբեր են",
    areaDescription:
      "4 × 5 մ չափերով սենյակի հատակը 20 մ² է։ Եթե բարձրությունը 2,7 մ է, չորս պատերի ընդհանուր մակերեսը մինչև դռների ու պատուհանների մակերեսները հանելը 48,6 մ² է։ Ուստի պատերի ներկման միավորի գինը ճիշտ չէ պարզապես բազմապատկել հատակի մակերեսով։",
    formula: "Աշխատանքի արժեքը = չափված ծավալ × միավորի գին",
    exampleTitle: "Ինչպե՞ս կարդալ նախահաշվի տողերը",
    exampleDescription:
      "Ծավալների օրինակ՝ 4 × 5 մ չափերով և 2,7 մ բարձրությամբ սենյակի համար։ Յուրաքանչյուր աշխատանք ունի իր միավորի գինը, իսկ նյութերը նշվում են առանձին։",
    work: "Աշխատանք",
    quantity: "Ծավալ",
    amount: "Արժեքի հաշվարկ",
    squareMetres: "մ²",
    rate: "մ²-ի գին",
    rows: [
      "Պատերի նախապատրաստում",
      "Պատերի ներկում",
      "Առաստաղի հարդարում",
      "Հատակի ծածկույթի տեղադրում",
    ],
    exampleNote:
      "Սա նախահաշվի կառուցվածքի օրինակ է։ Դռների ու պատուհանների բացվածքները, մակերեսների վիճակն ու հարդարման ընտրությունը ճշտում են ծավալները։ Միավորի գինը որոշվում է կոնկրետ աշխատանքի համար։",
    totalNote:
      "Վերջնական նախահաշիվը ներառում է բոլոր աշխատանքների, առանձին նշված նյութերի և համաձայնեցված լրացուցիչ ծախսերի արժեքը։ Ստուգեք, որ նույն աշխատանքը երկու անգամ հաշվարկված չլինի։",
  },
};
