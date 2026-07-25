import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Dictionary } from "@/types";

export function WorkProcess({ dictionary }: { dictionary: Dictionary }) {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <Container>
        <SectionHeading
          description={dictionary.process.description}
          eyebrow={dictionary.process.eyebrow}
          title={dictionary.process.title}
        />
        <ol className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {dictionary.process.steps.map((step) => (
            <li
              className="relative border-t border-zinc-300 pt-7"
              key={step.number}
            >
              <span className="text-sm font-bold tracking-[0.18em] text-blue-700">
                {step.number}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-zinc-950">
                {step.title}
              </h3>
              <p className="mt-3 leading-7 text-zinc-600">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
