import { ArrowRight, Blocks, PanelsTopLeft, Ruler, type LucideIcon } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { getActiveServices } from "@/config/services.config";
import type { Dictionary, Locale } from "@/types";

const specializedIcons: Record<string, LucideIcon> = { blocks: Blocks, "panels-top-left": PanelsTopLeft, ruler: Ruler };

export function SpecializedServices({ dictionary, locale }: { dictionary: Dictionary; locale: Locale }) {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="border-t border-[var(--border)] pt-8 sm:pt-10">
          <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--text-primary)] sm:text-3xl">{dictionary.services.specializedTitle}</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {getActiveServices(locale).filter((service) => service.category === "additional").map(({ content, ...service }) => {
              const Icon = specializedIcons[service.icon] ?? Ruler;
              return <Link className="group rounded-2xl border border-[var(--border)] bg-[var(--background-soft)] p-4 transition hover:bg-white" href={`/${locale}/services/${service.slug}`} key={service.slug}><Icon aria-hidden="true" className="size-5 stroke-[1.4] text-[var(--text-primary)]" /><h3 className="mt-5 font-semibold text-[var(--text-primary)]">{content.title}</h3><p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{content.shortDescription}</p><span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--text-primary)]">{dictionary.services.learnMore}<ArrowRight aria-hidden="true" className="size-3.5 transition-transform group-hover:translate-x-0.5" /></span></Link>;
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
