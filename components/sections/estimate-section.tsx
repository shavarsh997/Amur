import { CostCalculator } from "@/components/calculator/cost-calculator";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Dictionary, Locale } from "@/types";

export function EstimateSection({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  return (
    <section className="bg-[var(--background-soft)] py-12 sm:py-16 lg:py-20" id="estimate">
      <Container>
        <div className="rounded-[28px] border border-[var(--border)] bg-white p-5 sm:p-7 lg:p-9">
          <div className="grid gap-7 lg:grid-cols-[0.74fr_1.26fr] lg:gap-10">
            <div>
              <SectionHeading
                description={dictionary.calculator.description}
                eyebrow={dictionary.calculator.eyebrow}
                title={dictionary.calculator.title}
              />
            </div>
            <CostCalculator dictionary={dictionary} locale={locale} />
          </div>
        </div>
      </Container>
    </section>
  );
}
