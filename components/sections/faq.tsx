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
          <div className="divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)] bg-white px-5 sm:px-7">
            {dictionary.faq.items.map((item) => (
              <details className="group" key={item.question}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 font-semibold text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--button-primary)] [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <ChevronDown
                    aria-hidden="true"
                    className="size-5 shrink-0 text-[var(--text-secondary)] transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="max-w-2xl pb-6 pr-10 leading-7 text-[var(--text-secondary)]">
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
