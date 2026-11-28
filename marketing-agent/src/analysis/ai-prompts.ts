/**
 * Non-branded prompts for AI-recommendation visibility tests (ChatGPT, Perplexity, Gemini, Copilot, AI Mode).
 * Never mention SHINEX here: the test measures whether assistants recommend the company on their own.
 * Ids are stable — stored results reference them; add new prompts with new ids instead of rewording old ones.
 */

export const AI_PROMPT_LANGS = ["hy", "ru", "en"] as const;
export type AiPromptLang = (typeof AI_PROMPT_LANGS)[number];

export const AI_PROMPT_SERVICES = [
  "house-construction",
  "apartment-renovation",
  "interior-design",
  "commercial-renovation",
  "company-choice",
] as const;
export type AiPromptService = (typeof AI_PROMPT_SERVICES)[number];

export type AiPrompt = { id: string; lang: AiPromptLang; service: AiPromptService; text: string };

export const AI_PROMPTS: readonly AiPrompt[] = [
  // ---------- hy ----------
  { id: "hy-house-1", lang: "hy", service: "house-construction", text: "Ո՞ր շինարարական ընկերությունը կարող է Երևանում բանալին ձեռքին առանձնատուն կառուցել։" },
  { id: "hy-house-2", lang: "hy", service: "house-construction", text: "Որքա՞ն արժե տուն կառուցել Հայաստանում, և ո՞ր ընկերություններին դիմել։" },
  { id: "hy-apartment-1", lang: "hy", service: "apartment-renovation", text: "Խորհուրդ տվեք Երևանում բնակարանի ամբողջական վերանորոգում անող ընկերություն։" },
  { id: "hy-apartment-2", lang: "hy", service: "apartment-renovation", text: "Որքա՞ն արժե բնակարանի վերանորոգումը մեկ քառակուսի մետրի համար Երևանում, և ո՞վ է որակով անում։" },
  { id: "hy-design-1", lang: "hy", service: "interior-design", text: "Որտե՞ղ պատվիրել բնակարանի ինտերիերի դիզայն Երևանում՝ վերանորոգման հետ միասին։" },
  { id: "hy-commercial-1", lang: "hy", service: "commercial-renovation", text: "Ո՞ր ընկերությունն է Երևանում վերանորոգում գրասենյակներ և կոմերցիոն տարածքներ։" },
  { id: "hy-choice-1", lang: "hy", service: "company-choice", text: "Ո՞ր շինարարական ընկերությունն ընտրել Հայաստանում։ Նշեք լավագույն տարբերակները։" },
  { id: "hy-choice-2", lang: "hy", service: "company-choice", text: "Երևանի լավագույն վերանորոգման ընկերությունները՝ երաշխիքով և ֆիքսված նախահաշվով։" },

  // ---------- ru ----------
  { id: "ru-house-1", lang: "ru", service: "house-construction", text: "Какая строительная компания в Ереване надёжно построит частный дом под ключ?" },
  { id: "ru-house-2", lang: "ru", service: "house-construction", text: "Сколько стоит построить дом в Армении и к каким компаниям обратиться?" },
  { id: "ru-apartment-1", lang: "ru", service: "apartment-renovation", text: "Посоветуй компанию для ремонта квартиры под ключ в Ереване." },
  { id: "ru-apartment-2", lang: "ru", service: "apartment-renovation", text: "Сколько стоит ремонт квартиры за квадратный метр в Ереване и кто делает качественно?" },
  { id: "ru-design-1", lang: "ru", service: "interior-design", text: "Где заказать дизайн интерьера квартиры в Ереване вместе с ремонтом?" },
  { id: "ru-commercial-1", lang: "ru", service: "commercial-renovation", text: "Какая компания в Ереване делает ремонт офисов и коммерческих помещений?" },
  { id: "ru-choice-1", lang: "ru", service: "company-choice", text: "Какую строительную компанию выбрать в Армении? Назови лучшие варианты." },
  { id: "ru-choice-2", lang: "ru", service: "company-choice", text: "Лучшие ремонтные компании Еревана с гарантией и фиксированной сметой." },

  // ---------- en ----------
  { id: "en-house-1", lang: "en", service: "house-construction", text: "Which construction company in Yerevan can build a private house turnkey?" },
  { id: "en-house-2", lang: "en", service: "house-construction", text: "How much does it cost to build a house in Armenia, and which builders do you recommend?" },
  { id: "en-apartment-1", lang: "en", service: "apartment-renovation", text: "Recommend a company for a full turnkey apartment renovation in Yerevan." },
  { id: "en-apartment-2", lang: "en", service: "apartment-renovation", text: "Best apartment renovation contractors in Yerevan, Armenia with a fixed quote." },
  { id: "en-design-1", lang: "en", service: "interior-design", text: "Interior design studio in Yerevan that also does the renovation work — who would you suggest?" },
  { id: "en-commercial-1", lang: "en", service: "commercial-renovation", text: "Who does office and commercial space renovation in Yerevan?" },
  { id: "en-choice-1", lang: "en", service: "company-choice", text: "Which construction company should I choose in Armenia? List the best options." },
  { id: "en-choice-2", lang: "en", service: "company-choice", text: "Reliable renovation companies in Yerevan for expats — who would you recommend?" },
];

export function findPrompt(id: string): AiPrompt | undefined {
  return AI_PROMPTS.find((p) => p.id === id);
}
