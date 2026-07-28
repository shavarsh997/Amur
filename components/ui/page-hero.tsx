import type { ReactNode } from "react";

import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: readonly BreadcrumbItem[];
  breadcrumbsLabel?: string;
  actions?: ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  breadcrumbsLabel,
  actions,
}: PageHeroProps) {
  return (
    <section className="border-b border-[var(--border)] bg-[var(--background-soft)] py-10 sm:py-12 lg:py-16">
      <Container>
        {breadcrumbs?.length && breadcrumbsLabel ? (
          <Breadcrumbs
            ariaLabel={breadcrumbsLabel}
            className="mb-7"
            items={breadcrumbs}
          />
        ) : null}
        <div className="max-w-4xl">
          {eyebrow ? (
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-pretty text-4xl font-semibold tracking-[-0.05em] text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
              {description}
            </p>
          ) : null}
          {actions ? (
            <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
