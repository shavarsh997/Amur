import { CalculatorTrigger } from "@/components/calculator/calculator-dialog";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Dictionary } from "@/types";

export function EstimateSection({ dictionary }: { dictionary: Dictionary }) {
  return (
    <section className="bg-[var(--background-soft)] py-12 sm:py-16 lg:py-20" id="estimate">
      <Container>
        <div className="rounded-[28px] border border-[var(--border)] bg-white p-6 sm:p-9 lg:p-12">
          <div className="grid items-center gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
            <div>
              <SectionHeading
                description={dictionary.calculator.description}
                eyebrow={dictionary.calculator.eyebrow}
                title={dictionary.calculator.title}
              />
            </div>
            <div className="rounded-2xl bg-[var(--background-warm)] p-6 sm:p-8"><p className="text-sm leading-6 text-[var(--text-secondary)]">{dictionary.constructionCalculator.estimateSectionDescription}</p><CalculatorTrigger className="mt-6" label={dictionary.hero.primaryAction} /></div>
          </div>
        </div>
      </Container>
    </section>
  );
}
