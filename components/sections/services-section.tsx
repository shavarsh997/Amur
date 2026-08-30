import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceCard } from "@/components/ui/service-card";
import { getActiveServices } from "@/config/services.config";
import {
  getSeoLandingPath,
  seoLandingPages,
} from "@/config/seo-landing-pages.config";
import type { Dictionary, Locale } from "@/types";

export function ServicesSection({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  return (
    <section className="bg-[var(--brand-background)] py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            description={dictionary.services.description}
            eyebrow={dictionary.services.eyebrow}
            title={dictionary.services.title}
          />
          <Link
            className="inline-flex items-center gap-2 self-start rounded-sm font-semibold text-[var(--text-primary)] hover:text-[var(--text-secondary)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--button-primary)]"
            href={`/${locale}/services`}
          >
            {dictionary.services.viewAll}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {getActiveServices(locale)
            .filter((service) => service.category === "primary")
            .map(({ content, ...service }) => (
              <ServiceCard
                contactLabel={dictionary.nav.contacts}
                content={content}
                key={service.slug}
                learnMore={dictionary.services.learnMore}
                locale={locale}
                service={service}
              />
            ))}
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {seoLandingPages.map((page) => (
            <Link
              className="rounded-xl border border-[var(--border)] bg-white p-5 transition hover:border-[var(--brand-copper)]"
              href={`/${locale}/${getSeoLandingPath(page)}`}
              key={page.slug}
            >
              <h3 className="font-semibold text-[var(--text-primary)]">
                {page.translations[locale].title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                {page.translations[locale].description}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
