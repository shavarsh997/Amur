import type { ReactNode } from "react";

import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: readonly BreadcrumbItem[];
  actions?: ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  actions,
}: PageHeroProps) {
  return (
    <section className="border-b border-zinc-200 bg-zinc-50 py-16 sm:py-20 lg:py-24">
      <Container>
        {breadcrumbs?.length ? (
          <Breadcrumbs className="mb-10" items={breadcrumbs} />
        ) : null}
        <div className="max-w-4xl">
          {eyebrow ? (
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-pretty text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
              {description}
            </p>
          ) : null}
          {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
      </Container>
    </section>
  );
}
