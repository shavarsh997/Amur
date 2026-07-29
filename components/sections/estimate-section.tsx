import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Dictionary } from "@/types";

export function EstimateSection({
  dictionary,
  locale,
}: {
  dictionary: Dictionary;
  locale: string;
}) {
  return (
    <section
      className="bg-[var(--background-soft)] py-12 sm:py-16 lg:py-20"
      id="estimate"
    >
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
            <div className="rounded-2xl bg-[var(--background-warm)] p-6 sm:p-8">
              <p className="text-sm leading-6 text-[var(--text-secondary)]">
                {dictionary.constructionCalculator.estimateSectionDescription}
              </p>
              <ButtonLink className="mt-6 w-full" href={`/${locale}/calculator`}>
                {dictionary.hero.primaryAction}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
