import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { operationsConfig } from "@/config/operations.config";
import type { Dictionary } from "@/types";

export function WorkProcess({ dictionary }: { dictionary: Dictionary }) {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <Container>
        <SectionHeading
          description={dictionary.process.description}
          eyebrow={dictionary.process.eyebrow}
          title={dictionary.process.title}
        />
        <ol className="mt-8 grid gap-x-0 gap-y-7 md:grid-cols-2 lg:grid-cols-3">
          {operationsConfig.workflow.map((workflowKey, index) => {
            const step = dictionary.process.steps[index];
            if (!step) return null;

            return (
              <li
                className="relative border-t border-[var(--border)] pt-5 lg:pr-8"
                key={workflowKey}
              >
                <span className="inline-flex size-8 items-center justify-center rounded-full bg-[var(--background-warm)] text-xs font-semibold text-[var(--text-secondary)]">
                  {step.number}
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
                  {step.title}
                </h3>
                <p className="mt-2 leading-7 text-[var(--text-secondary)]">{step.description}</p>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
