import { Building2, Map, Store } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { homeContent } from "@/config/home-content.config";
import { Container } from "@/components/ui/container";
import type { Locale } from "@/types";

const itemIcons = {
  "building-2": Building2,
  map: Map,
  store: Store,
} as const;

export function ServiceArea({ locale }: { locale: Locale }) {
  const content = homeContent[locale].serviceArea;

  if (!content.enabled) return null;

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="grid gap-8 rounded-2xl bg-[var(--background-warm)] p-6 sm:p-9 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:p-10">
          <div className="min-w-0">
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.13em] text-[var(--text-secondary)]">
              <span aria-hidden="true" className="h-px w-8 bg-[var(--brand-copper)]" />
              {content.label}
            </p>
            <h2 className="mt-5 max-w-xl text-balance text-3xl font-semibold leading-[1.14] tracking-[-0.04em] text-[var(--text-primary)] sm:text-4xl">
              {content.title}
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-6 text-[var(--text-secondary)] sm:text-base sm:leading-7">
              {content.description}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={content.primaryCta.href}>
                {content.primaryCta.label}
              </ButtonLink>
              {content.secondaryCta ? (
                <ButtonLink
                  href={content.secondaryCta.href}
                  variant="secondary"
                >
                  {content.secondaryCta.label}
                </ButtonLink>
              ) : null}
            </div>
          </div>
          <ul className="border-y border-[var(--border)]">
            {content.items
              .filter((item) => item.enabled)
              .map((item) => {
                const Icon = itemIcons[item.icon];

                return (
                  <li
                    className="flex gap-3 border-b border-[var(--border)] py-5 last:border-b-0"
                    key={item.id}
                  >
                    <span className="grid size-9 shrink-0 place-items-center text-[var(--brand-copper)]">
                      <Icon
                        aria-hidden="true"
                        className="size-4.5 stroke-[1.45]"
                      />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold leading-5 tracking-[-0.01em] text-[var(--text-primary)]">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-5 text-[var(--text-secondary)]">
                        {item.description}
                      </p>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
