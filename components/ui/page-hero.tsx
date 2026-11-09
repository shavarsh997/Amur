import type { ReactNode } from "react";
import Image from "next/image";

import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: readonly BreadcrumbItem[];
  breadcrumbsLabel?: string;
  actions?: ReactNode;
  image?: { src: string; alt: string; caption?: string };
};

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  breadcrumbsLabel,
  actions,
  image,
}: PageHeroProps) {
  return (
    <section
      className={`page-hero border-b border-[var(--border)] bg-[var(--background-soft)] py-10 sm:py-12 lg:py-14 ${image ? "page-hero--with-image" : ""}`}
    >
      <Container className={image ? "page-hero__layout" : undefined}>
        <div className="page-hero__copy">
          {breadcrumbs?.length && breadcrumbsLabel ? (
            <Breadcrumbs
              ariaLabel={breadcrumbsLabel}
              className="mb-7"
              items={breadcrumbs}
            />
          ) : null}
          <div className="max-w-6xl">
            {eyebrow ? (
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="content-heading text-pretty text-4xl font-semibold leading-[1.14] tracking-[-0.05em] text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {description ? (
              <p className="mt-5 max-w-full text-lg leading-8 text-[var(--text-secondary)]">
                {description}
              </p>
            ) : null}
            {actions ? (
              <div className="action-group mt-8">{actions}</div>
            ) : null}
          </div>
        </div>
        {image ? (
          <figure className="page-hero__image">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              loading="eager"
              fetchPriority="high"
              quality={82}
              sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 959px) calc(100vw - 48px), (max-width: 1439px) 52vw, 720px"
            />
            {image.caption ? <figcaption>{image.caption}</figcaption> : null}
          </figure>
        ) : null}
      </Container>
    </section>
  );
}
