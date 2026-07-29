import { Building2, Map, MapPin, Store } from "lucide-react";

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
    <section className="bg-white py-12 sm:py-14 lg:py-16">
      <Container>
        <div className="grid gap-7 rounded-[24px] bg-[var(--background-warm)] p-5 sm:rounded-[28px] sm:p-7 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:p-8">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 text-xs font-semibold text-[var(--text-secondary)]">
              <MapPin aria-hidden="true" className="size-3.5 stroke-[1.6]" />
              {content.label}
            </p>
            <h2 className="mt-4 max-w-xl text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-[var(--text-primary)] sm:text-4xl">
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
          <ul className="grid gap-2.5 min-[769px]:grid-cols-3 lg:grid-cols-1">
            {content.items
              .filter((item) => item.enabled)
              .map((item) => {
                const Icon = itemIcons[item.icon];

                return (
                  <li
                    className="flex gap-3 rounded-2xl border border-[var(--border)] bg-white/85 p-4 sm:p-[18px]"
                    key={item.id}
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[var(--surface-muted)] text-[var(--text-primary)]">
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
