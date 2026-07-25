import { LeadForm } from "@/components/forms/lead-form";
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
    <section className="bg-zinc-100 py-20 sm:py-24 lg:py-28" id="estimate">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            description={dictionary.estimate.description}
            eyebrow={dictionary.estimate.eyebrow}
            title={dictionary.estimate.title}
          />
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <LeadForm dictionary={dictionary} locale={locale} />
          </div>
        </div>
      </Container>
    </section>
  );
}
