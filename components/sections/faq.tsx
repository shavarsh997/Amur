import { ChevronDown } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Dictionary } from "@/types";

export function FAQSection({ dictionary }: { dictionary: Dictionary }) {
  return (
    <section className="bg-[var(--background-soft)] py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
          <SectionHeading
            description={dictionary.faq.description}
            eyebrow={dictionary.faq.eyebrow}
            title={dictionary.faq.title}
          />
          <div className="space-y-2 sm:space-y-0 sm:divide-y sm:divide-[var(--border)] sm:rounded-2xl sm:border sm:border-[var(--border)] sm:bg-white sm:px-7">
            {dictionary.faq.items.map((item) => (
              <details className="group rounded-xl border border-[var(--border)] bg-white px-4 sm:rounded-none sm:border-0 sm:px-0" key={item.question}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-4 text-sm font-semibold text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--button-primary)] sm:py-6 sm:text-base [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <ChevronDown
                    aria-hidden="true"
                    className="size-5 shrink-0 text-[var(--text-secondary)] transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="max-w-2xl pb-4 pr-8 text-sm leading-6 text-[var(--text-secondary)] sm:pb-6 sm:pr-10 sm:text-base sm:leading-7">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
