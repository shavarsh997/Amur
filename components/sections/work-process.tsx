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
        <ol className="relative mt-8 grid gap-x-0 gap-y-0 before:absolute before:bottom-4 before:left-4 before:top-4 before:w-px before:bg-[var(--border)] md:grid-cols-2 md:gap-y-7 md:before:hidden lg:grid-cols-3">
          {operationsConfig.workflow.map((workflowKey, index) => {
            const step = dictionary.process.steps[index];
            if (!step) return null;

            return (
              <li
                className="relative grid grid-cols-[2rem_1fr] gap-x-3 py-4 first:pt-0 last:pb-0 md:block md:border-t md:pt-5 md:first:pt-5 lg:pr-8"
                key={workflowKey}
              >
                <span className="relative z-10 inline-flex size-8 items-center justify-center rounded-full bg-[var(--background-warm)] text-xs font-semibold text-[var(--text-secondary)]">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-base font-semibold tracking-[-0.02em] text-[var(--text-primary)] md:mt-4 md:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)] md:mt-2 md:text-base md:leading-7">{step.description}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
