type FaqItem = { question: string; answer: string };

export const MIN_FAQ_ITEMS = 4;

/** Keeps every page's FAQ useful even when its page-specific copy has fewer than four items. */
export function getFaqsWithMinimum(
  faqs: readonly FaqItem[],
  fallbackFaqs: readonly FaqItem[]
): readonly FaqItem[] {
  const items = [...faqs];

  for (const fallback of fallbackFaqs) {
    if (items.length >= MIN_FAQ_ITEMS) break;
    if (!items.some((item) => item.question === fallback.question)) {
      items.push(fallback);
    }
  }

  return items;
}
