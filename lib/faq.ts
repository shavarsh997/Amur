import type { Locale } from "@/types";

type FaqItem = { question: string; answer: string };

export const MIN_FAQ_ITEMS = 4;

const fallbackFaqs: Record<Locale, readonly FaqItem[]> = {
  ru: [
    {
      question: "Как получить точную смету?",
      answer:
        "Предварительный расчёт можно получить онлайн, а точная смета составляется после обсуждения задачи и осмотра объекта.",
    },
    {
      question: "Нужен ли осмотр объекта?",
      answer:
        "Осмотр помогает оценить исходное состояние, уточнить объём работ и подготовить реалистичный расчёт.",
    },
    {
      question: "Можно ли согласовать объём работ до начала?",
      answer:
        "Да. До старта обсуждаем задачи, состав работ и последовательность этапов, чтобы согласовать подходящий формат проекта.",
    },
    {
      question: "Какие данные нужны для первого расчёта?",
      answer:
        "Полезно указать тип и площадь объекта, желаемые работы, а также приложить план или фотографии, если они есть.",
    },
  ],
  en: [
    {
      question: "How can I get an accurate estimate?",
      answer:
        "An initial guide is available online; an accurate estimate is prepared after discussing the project and surveying the property.",
    },
    {
      question: "Is a property survey needed?",
      answer:
        "A survey helps assess the starting condition, clarify the work scope, and prepare a realistic estimate.",
    },
    {
      question: "Can the work scope be agreed before the start?",
      answer:
        "Yes. Before work starts, we discuss the tasks, scope, and sequence of stages to agree a suitable project format.",
    },
    {
      question: "What information is needed for an initial estimate?",
      answer:
        "It is helpful to provide the property type and area, the work you need, plus a plan or photographs if available.",
    },
  ],
  hy: [
    {
      question: "Ինչպե՞ս ստանալ ճշգրիտ նախահաշիվ",
      answer:
        "Նախնական արժեքի հաշվարկը կարող եք ստանալ առցանց։ Ճշգրիտ նախահաշիվը կազմվում է խնդիրը քննարկելուց և օբյեկտը զննելուց հետո։",
    },
    {
      question: "Պե՞տք է օբյեկտի զննում",
      answer:
        "Զննումը օգնում է գնահատել օբյեկտի սկզբնական վիճակը, ճշտել աշխատանքների ծավալը և կազմել հնարավորինս ճշգրիտ նախնական հաշվարկ։",
    },
    {
      question: "Կարելի՞ է աշխատանքի ծավալը համաձայնեցնել մեկնարկից առաջ",
      answer:
        "Այո՛։ Մինչ աշխատանքը սկսելը քննարկում ենք խնդիրները, աշխատանքների ծավալն ու փուլերի հերթականությունը՝ աշխատանքի կազմակերպման ձևաչափը նախապես հստակեցնելու համար։",
    },
    {
      question: "Ի՞նչ տվյալներ են անհրաժեշտ առաջին հաշվարկի համար",
      answer:
        "Օգտակար է նշել օբյեկտի տեսակը և մակերեսը, ցանկալի աշխատանքները, ինչպես նաև կցել հատակագիծ կամ լուսանկարներ, եթե դրանք կան։",
    },
  ],
};

/** Keeps every page's FAQ useful even when its page-specific copy has fewer than four items. */
export function getFaqsWithMinimum(
  faqs: readonly FaqItem[],
  locale: Locale
): readonly FaqItem[] {
  const items = [...faqs];

  for (const fallback of fallbackFaqs[locale]) {
    if (items.length >= MIN_FAQ_ITEMS) break;
    if (!items.some((item) => item.question === fallback.question)) {
      items.push(fallback);
    }
  }

  return items;
}
