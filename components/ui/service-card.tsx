import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { getServiceMedia } from "@/config/service-media.config";
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
  mediaSlug?: string;
};

export function ServiceCard({
  service,
  content,
  locale,
  learnMore,
  contactLabel,
  href = `/${locale}/services/${service.slug}`,
  mediaSlug = service.slug,
}: ServiceCardProps) {
  const ctaLabel = content.primaryCta ?? learnMore;
  const media = getServiceMedia(mediaSlug, locale);
  const photo =
    ["apartment-renovation-yerevan", "interior-design"].includes(mediaSlug) ||
    media.hero.src.startsWith("/")
      ? media.hero
      : media.details;

  return (
    <article
      className="motion-service-card layout-region group h-full overflow-hidden rounded-xl border border-[var(--border)] bg-white transition-colors hover:border-[var(--border-strong)]"
      data-motion="reveal"
    >
      <div className="service-card-layout grid h-full">
        <div className="service-card-image relative overflow-hidden bg-[var(--background-warm)]">
          <div
            className="motion-photo"
            data-parallax={service.order % 2 ? "left" : "right"}
          >
            <Image
              alt={photo.alt}
              className="motion-service-photo object-cover"
              fill
              sizes="(max-width: 959px) calc(100vw - 48px), (max-width: 1439px) 46vw, 660px"
              src={photo.src}
            />
          </div>
          <span className="media-caption">{photo.caption}</span>
        </div>
        <div className="service-card-copy flex flex-col items-start">
          <span className="text-sm font-bold tracking-[0.14em] text-[var(--brand-copper-text)]">
            {String(service.order).padStart(2, "0")}
          </span>
          <h3 className="mt-4 text-xl font-semibold leading-[1.15] tracking-[-0.035em] text-[var(--text-primary)] sm:text-2xl">
            <Link
              href={href}
              className="rounded-sm hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              {content.title}
            </Link>
          </h3>
          <p className="mt-3 line-clamp-4 flex-1 text-sm leading-6 text-[var(--text-secondary)] sm:text-[15px]">
            {content.shortDescription}
          </p>
          {service.ctaKind === "calculator" || service.ctaKind === "contact" ? (
            <ContactTrigger
              className="mt-5"
              size="compact"
              label={content.primaryCta ?? contactLabel}
            />
          ) : (
            <Link
              className="mt-5 inline-flex max-w-full items-center gap-2 rounded-sm text-sm font-semibold leading-5 text-[var(--text-primary)] transition-colors hover:text-[var(--brand-copper)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-copper)]"
              href={href}
            >
              <span className="min-w-0 text-pretty">{ctaLabel}</span>
              <ArrowRight
                aria-hidden="true"
                className="size-4 shrink-0 transition-transform group-hover:translate-x-1"
              />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
