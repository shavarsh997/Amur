import type { Locale } from "@/types";

export const calculatorSeo = {
  ru: {
    title: "Калькулятор ремонта квартиры в Ереване и по всей Армении",
    description: "Рассчитайте предварительную стоимость ремонта квартиры в Ереване и по всей Армении и узнайте, какие данные нужны для точной сметы.",
    intro: "Этот калькулятор помогает получить первоначальный ориентир по стоимости ремонта. Он не заменяет осмотр: фактическая смета зависит от состояния квартиры, площади, инженерных работ, материалов и сложности решений.",
    faqTitle: "Как пользоваться калькулятором ремонта",
    faqs: [
      ["Насколько точен результат?", "Результат предназначен для предварительного планирования. После осмотра и согласования работ можно подготовить точную смету."],
      ["Что подготовить для расчёта?", "Укажите тип объекта, площадь, район и желаемый вид работ. Планировка и фотографии помогут уточнить расчет при дальнейшем обсуждении."],
    ],
  },
  en: {
    title: "Apartment renovation cost calculator in Yerevan and across Armenia",
    description: "Calculate an initial apartment renovation cost in Yerevan and across Armenia, and learn what information is needed for an accurate estimate.",
    intro: "This calculator provides an initial renovation-cost guide. It does not replace a survey: the actual estimate depends on property condition, area, building-services work, materials, and the complexity of the chosen solutions.",
    faqTitle: "How to use the renovation calculator",
    faqs: [
      ["How accurate is the result?", "The result is for initial planning. A precise estimate can be prepared after a survey and agreement on the work scope."],
      ["What should I prepare for an estimate?", "Choose the property type, area, district, and desired work. A plan and current-condition photos help refine the calculation in a follow-up discussion."],
    ],
  },
  hy: {
    title: "Բնակարանի վերանորոգման արժեքի հաշվիչ Երևանում և ամբողջ Հայաստանում",
    description: "Հաշվեք բնակարանի վերանորոգման նախնական արժեքը Երևանում և ամբողջ Հայաստանում ու իմացեք՝ ինչ տվյալներ են անհրաժեշտ ճշգրիտ նախահաշվի համար։",
    intro: "Այս հաշվիչն օգնում է ստանալ վերանորոգման արժեքի նախնական կողմնորոշիչ։ Այն չի փոխարինում զննմանը․ փաստացի նախահաշիվը կախված է բնակարանի վիճակից, մակերեսից, ինժեներական աշխատանքներից, նյութերից և ընտրված լուծումների բարդությունից։",
    faqTitle: "Ինչպե՞ս օգտվել վերանորոգման հաշվիչից",
    faqs: [
      ["Որքա՞ն ճշգրիտ է արդյունքը", "Արդյունքը նախատեսված է նախնական պլանավորման համար։ Ճշգրիտ նախահաշիվը կազմվում է զննումից և աշխատանքների կազմի համաձայնեցումից հետո։"],
      ["Ի՞նչ պատրաստել հաշվարկի համար", "Նշեք օբյեկտի տեսակը, մակերեսը, շրջանը և ցանկալի աշխատանքները։ Հատակագիծն ու ներկա վիճակի լուսանկարները օգնում են ճշտել հաշվարկը հետագա քննարկման ժամանակ։"],
    ],
  },
} as const satisfies Record<
  Locale,
  { title: string; description: string; intro: string; faqTitle: string; faqs: readonly (readonly [string, string])[] }
>;
