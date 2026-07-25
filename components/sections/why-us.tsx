import {
  BadgeCheck,
  CalendarCheck,
  FileCheck2,
  Map,
  ReceiptText,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { operationsConfig } from "@/config/operations.config";
import type { Dictionary } from "@/types";

const icons: LucideIcon[] = [
  FileCheck2,
  ReceiptText,
  CalendarCheck,
  BadgeCheck,
  ShieldCheck,
  Map,
];

export function WhyUs({ dictionary }: { dictionary: Dictionary }) {
  return (
    <section className="bg-[var(--background-warm)] py-12 sm:py-16 lg:py-20">
      <Container>
        <SectionHeading
          align="left"
          description={dictionary.whyUs.description}
          eyebrow={dictionary.whyUs.eyebrow}
          title={dictionary.whyUs.title}
        />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {operationsConfig.benefits.map((benefitKey, index) => {
            const item = dictionary.whyUs.items[index];
            if (!item) return null;
            const Icon = icons[index] ?? BadgeCheck;

            return (
              <article className="rounded-2xl border border-white bg-white/70 p-5 sm:p-6" key={benefitKey}>
                <span className="grid size-10 place-items-center rounded-xl bg-white text-[var(--text-primary)] shadow-sm">
                  <Icon aria-hidden="true" className="size-5 stroke-[1.35]" />
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-[-0.02em] text-[var(--text-primary)]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{item.description}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
