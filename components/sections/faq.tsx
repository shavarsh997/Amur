import { ChevronDown } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Dictionary } from "@/types";

export function FAQSection({ dictionary }: { dictionary: Dictionary }) {
  return (
    <section className="bg-zinc-50 py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            description={dictionary.faq.description}
            eyebrow={dictionary.faq.eyebrow}
            title={dictionary.faq.title}
          />
          <div className="divide-y divide-zinc-200 border-y border-zinc-200">
            {dictionary.faq.items.map((item) => (
              <details className="group" key={item.question}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 font-semibold text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <ChevronDown
                    aria-hidden="true"
                    className="size-5 shrink-0 text-blue-700 transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="max-w-2xl pb-6 pr-10 leading-7 text-zinc-600">
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
