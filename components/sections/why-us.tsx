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
    <section className="bg-zinc-950 py-20 text-white sm:py-24 lg:py-28">
      <Container>
        <SectionHeading
          align="center"
          description={dictionary.whyUs.description}
          eyebrow={dictionary.whyUs.eyebrow}
          inverted
          title={dictionary.whyUs.title}
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {dictionary.whyUs.items.map((item, index) => {
            const Icon = icons[index] ?? BadgeCheck;

            return (
              <article className="bg-zinc-950 p-7 sm:p-8" key={item.title}>
                <Icon aria-hidden="true" className="size-7 text-blue-400" />
                <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 leading-7 text-zinc-400">{item.description}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
