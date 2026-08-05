import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ContactTrigger } from "@/components/forms/contact-dialog";
import type { Locale } from "@/types";
import type { ServiceConfig, ServiceContent } from "@/types/service";

type ServiceCardProps = {
  service: ServiceConfig;
  content: ServiceContent;
  locale: Locale;
  learnMore: string;
  contactLabel: string;
  href?: string;
};

export function ServiceCard({
  service,
  content,
  locale,
  learnMore,
  contactLabel,
  href = `/${locale}/services/${service.slug}`,
}: ServiceCardProps) {
  const ctaLabel = content.primaryCta ?? learnMore;

  return (
    <article className="group grid h-full overflow-hidden rounded-xl border border-[var(--border)] bg-white transition-colors hover:border-[var(--border-strong)] sm:grid-cols-[0.95fr_1.05fr]">
      <div className="relative min-h-56 overflow-hidden bg-[var(--background-warm)] sm:min-h-[310px]">
        <Image
          alt={content.title}
          className="object-cover transition duration-500 group-hover:scale-105"
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1199px) 42vw, 27vw"
          src={service.image}
        />
      </div>
      <div className="flex min-h-56 flex-col items-start p-5 sm:min-h-[310px] sm:p-7">
        <span className="text-sm font-bold tracking-[0.14em] text-[var(--brand-copper)]">
          {String(service.order).padStart(2, "0")}
        </span>
        <h3 className="mt-5 text-xl font-semibold leading-[1.15] tracking-[-0.035em] text-[var(--text-primary)] sm:text-2xl">
          {content.title}
        </h3>
        <p className="mt-3 line-clamp-4 flex-1 text-sm leading-6 text-[var(--text-secondary)] sm:text-[15px]">
          {content.shortDescription}
        </p>
        {service.ctaKind === "calculator" || service.ctaKind === "contact" ? (
          <ContactTrigger
            className="mt-5 min-h-10 px-4 text-sm"
            label={content.primaryCta ?? contactLabel}
          />
        ) : (
          <Link
            className="mt-5 inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-[var(--text-primary)] transition-colors hover:text-[var(--brand-copper)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-copper)]"
            href={href}
          >
            {ctaLabel}
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        )}
      </div>
    </article>
  );
}
