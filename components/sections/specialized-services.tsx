import {
  ArrowRight,
  Blocks,
  PanelsTopLeft,
  Ruler,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { getActiveServices } from "@/config/services.config";
import type { Dictionary, Locale } from "@/types";

const specializedIcons: Record<string, LucideIcon> = {
  blocks: Blocks,
  "panels-top-left": PanelsTopLeft,
  ruler: Ruler,
};

export function SpecializedServices({
  dictionary,
  locale,
}: {
  dictionary: Dictionary;
  locale: Locale;
}) {
  return (
    <section className="bg-white py-section">
      <Container>
        <div className="min-w-0">
          <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--text-primary)] sm:text-3xl">
            {dictionary.services.specializedTitle}
          </h2>
          <div className="content-grid-three mt-8 grid gap-4 sm:grid-cols-3">
            {getActiveServices(locale)
              .filter((service) => service.category === "additional")
              .map(({ content, ...service }) => {
                const Icon = specializedIcons[service.icon] ?? Ruler;
                return (
                  <Link
                    className="group flex flex-col items-start rounded-xl border border-[var(--border)] bg-[var(--background-soft)] p-5 transition-colors hover:border-[var(--border-strong)] hover:bg-white"
                    href={`/${locale}/services/${service.slug}`}
                    key={service.slug}
                  >
                    <Icon
                      aria-hidden="true"
                      className="size-5 stroke-[1.4] text-[var(--brand-copper)]"
                    />
                    <h3 className="mt-4 font-semibold text-[var(--text-primary)]">
                      {content.title}
                    </h3>
                    <p className="mt-3 flex-1 line-clamp-3 text-sm leading-6 text-[var(--text-secondary)]">
                      {content.shortDescription}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--text-primary)] transition-colors group-hover:text-[var(--brand-copper)]">
                      {dictionary.services.learnMore}
                      <ArrowRight
                        aria-hidden="true"
                        className="size-3.5 transition-transform group-hover:translate-x-0.5"
                      />
                    </span>
                  </Link>
                );
              })}
          </div>
        </div>
      </Container>
    </section>
  );
}
