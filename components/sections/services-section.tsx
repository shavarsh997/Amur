import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceCard } from "@/components/ui/service-card";
import { getActiveServices } from "@/config/services.config";
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
      </Container>
    </section>
  );
}
