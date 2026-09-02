import { Container } from "@/components/ui/container";
import { FAQAccordion } from "@/components/ui/faq-accordion";
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
          <FAQAccordion items={dictionary.faq.items} />
        </div>
      </Container>
    </section>
  );
}
