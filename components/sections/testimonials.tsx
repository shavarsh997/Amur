import { Quote } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Dictionary } from "@/types";

export function Testimonials({ dictionary }: { dictionary: Dictionary }) {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <Container>
        <SectionHeading
          align="center"
          description={dictionary.testimonials.description}
          eyebrow={dictionary.testimonials.eyebrow}
          title={dictionary.testimonials.title}
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {dictionary.testimonials.items.map((item, index) => (
            <figure
              className="flex flex-col rounded-3xl border border-zinc-200 bg-zinc-50 p-7"
              key={`${item.name}-${index}`}
            >
              <Quote aria-hidden="true" className="size-7 text-[var(--brand-accent)]" />
              <blockquote className="mt-5 flex-1 text-lg leading-8 text-zinc-700">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-7 border-t border-zinc-200 pt-5">
                <p className="font-semibold text-zinc-950">{item.name}</p>
                <p className="mt-1 text-sm text-zinc-500">{item.role}</p>
                {item.isPlaceholder ? (
                  <p className="mt-3 text-xs font-bold uppercase tracking-wide text-[var(--brand-accent)]">
                    {dictionary.testimonials.placeholderNotice}
                  </p>
                ) : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
