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
    <section className="bg-[var(--brand-surface-warm)] py-12 sm:py-16 lg:py-20">
      <Container>
        <SectionHeading
          align="left"
          description={dictionary.whyUs.description}
          eyebrow={dictionary.whyUs.eyebrow}
          title={dictionary.whyUs.title}
        />
        <div className="mt-8 grid border-t border-[var(--border)] sm:grid-cols-2 lg:grid-cols-3">
          {operationsConfig.benefits.map((benefitKey, index) => {
            const item = dictionary.whyUs.items[index];
            if (!item) return null;
            const Icon = icons[index] ?? BadgeCheck;

            return (
              <article
                className="flex gap-3 border-b border-[var(--border)] py-5 sm:block sm:p-6 lg:[&:nth-child(3n+2)]:border-x lg:[&:nth-child(3n+2)]:px-7"
                key={benefitKey}
              >
                <span className="grid size-9 shrink-0 place-items-center text-[var(--brand-copper)] sm:size-10">
                  <Icon aria-hidden="true" className="size-5 stroke-[1.35]" />
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold tracking-[-0.02em] text-[var(--text-primary)] sm:mt-3 sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)] sm:mt-2 sm:text-sm sm:leading-6">
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
