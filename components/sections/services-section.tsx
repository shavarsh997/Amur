import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceCard } from "@/components/ui/service-card";
import type { Dictionary, Locale } from "@/types";

export function ServicesSection({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            description={dictionary.services.description}
            eyebrow={dictionary.services.eyebrow}
            title={dictionary.services.title}
          />
          <Link
            className="inline-flex items-center gap-2 self-start rounded-sm font-semibold text-zinc-950 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
            href={`/${locale}/services`}
          >
            {dictionary.services.viewAll}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dictionary.services.items.map((service) => (
            <ServiceCard
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
