import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ArchitecturalImage } from "@/components/ui/architectural-image";
import { ContactTrigger } from "@/components/forms/contact-dialog";
import { getActiveServices } from "@/config/services.config";
import { getServiceMedia } from "@/config/service-media.config";
import {
  getSeoLandingPage,
  getSeoLandingPath,
} from "@/config/seo-landing-pages.config";
import { ServiceGuides } from "@/components/sections/service-guides";
import type { Dictionary, Locale } from "@/types";
import styles from "./services-section.module.css";

export function ServicesSection({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const apartment = getSeoLandingPage(locale, "apartment-renovation-yerevan");
  return (
    <section className="home-services bg-[var(--brand-background)] py-section">
      <Container>
        <div className="content-section-header flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
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
        <div className={styles.gallery}>
          {getActiveServices(locale)
            .filter((service) => service.category === "primary")
            .map(({ content, ...service }) => {
              const featuredApartment =
                service.slug === "renovation" && apartment;
              const title = featuredApartment
                ? featuredApartment.content.title
                : content.title;
              const description = featuredApartment
                ? featuredApartment.content.description
                : content.shortDescription;
              const href = featuredApartment
                ? `/${locale}/${getSeoLandingPath(featuredApartment)}`
                : `/${locale}/services/${service.slug}`;
              const mediaSlug = featuredApartment
                ? "apartment-renovation-yerevan"
                : service.slug;
              const image = getServiceMedia(mediaSlug, locale).card;
              const primaryCta = featuredApartment
                ? dictionary.services.learnMore
                : content.primaryCta;
              return (
                <article
                  className={styles.card}
                  data-service-card={mediaSlug}
                  key={service.slug}
                >
                  <Link className={styles.visualLink} href={href}>
                    <div className={styles.image}>
                      <ArchitecturalImage
                        // Landscape originals keep the same composition at every size.
                        image={{ ...image, mobileSrc: undefined }}
                        sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 767px) calc(100vw - 48px), (max-width: 1439px) calc(50vw - 48px), 660px"
                      />
                    </div>
                    <div className={styles.heading}>
                      <span className={styles.number} aria-hidden="true">
                        {String(service.order).padStart(2, "0")}
                      </span>
                      <h3>{title}</h3>
                    </div>
                  </Link>
                  <p className={styles.description}>{description}</p>
                  <div className={styles.actions}>
                    {service.ctaKind === "contact" ? (
                      <ContactTrigger
                        className={styles.action}
                        variant="link"
                        label={primaryCta ?? dictionary.nav.contacts}
                      />
                    ) : (
                      <Link className={styles.action} href={href}>
                        {primaryCta ?? dictionary.services.learnMore}
                      </Link>
                    )}
                    <ArrowUpRight
                      className={styles.actionArrow}
                      size={20}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </div>
                </article>
              );
            })}
        </div>
        <ServiceGuides locale={locale} />
      </Container>
    </section>
  );
}
