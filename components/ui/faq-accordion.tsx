import { ChevronDown } from "lucide-react";

type FaqItem = { question: string; answer: string };

export function FAQAccordion({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="divide-y divide-[var(--border)] border-y border-[var(--border)] bg-white px-4 sm:px-6">
      {items.map((item) => (
        <details className="group bg-white" key={item.question}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-sm font-semibold text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-copper)]  sm:text-base [&::-webkit-details-marker]:hidden">
            {item.question}
            <ChevronDown
              aria-hidden="true"
              className="size-5 shrink-0 text-[var(--brand-copper)] transition-transform group-open:rotate-180"
            />
          </summary>
          <p className="max-w-2xl pb-5 pr-9 text-sm leading-6 text-[var(--text-secondary)]  sm:text-base sm:leading-7">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
