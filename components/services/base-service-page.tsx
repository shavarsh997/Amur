import Link from "next/link";

import { Container } from "@/components/ui/container";
import {
  getSeoLandingPage,
  getSeoLandingPath,
  seoLandingPages,
} from "@/config/seo-landing-pages.config";
import { getServiceMedia } from "@/config/service-media.config";
import { servicePageTranslations } from "@/messages/service-pages";
import type { Dictionary, Locale } from "@/types";
import type { ServiceConfig, ServiceContent } from "@/types/service";
import { ServicePlanning } from "./service-planning";
import {
  ServicePage,
  ServiceHero,
  ServiceSection,
  ServiceScope,
  ServiceDetails,
  ServiceList,
  ServiceFacts,
  ServiceProcess,
  ServicePricing,
  ServiceFAQ,
  RelatedServices,
  ServiceCTA,
} from "./service-page";

export function BaseServicePage({
  service,
  dictionary,
  locale,
}: {
  service: ServiceConfig & { content: ServiceContent };
  dictionary: Dictionary;
  locale: Locale;
}) {
  const { content } = service;
  const copy = dictionary.services.detail;
  const presentation = servicePageTranslations[locale];
  const isHouse = service.slug === "renovation";
  const apartment = isHouse
    ? getSeoLandingPage(locale, "apartment-renovation-yerevan")
    : undefined;
  const media = getServiceMedia(service.slug, locale);
  const primaryCta = content.secondaryCta ?? copy.requestEstimate;
  const related = seoLandingPages.filter((page) =>
    (page.relatedServiceSlugs as readonly string[]).includes(service.slug)
  );
  // Keep every existing relationship; only promote the principal destinations visually.
  const priority = [
    "apartment-renovation-yerevan",
    "new-build-renovation",
    "prices",
  ];
  const links = [...related]
    .sort((a, b) => {
      const rank = (slug: string) =>
        priority.includes(slug) ? priority.indexOf(slug) : priority.length;
      return rank(a.slug) - rank(b.slug);
    })
    .map((page) => ({
      href: `/${locale}/${getSeoLandingPath(page)}`,
      title: page.translations[locale].title,
      description: page.translations[locale].description,
    }));
  const scopePaths = [
    "#service-details",
    `/${locale}/services/electrical-work-yerevan`,
    "#service-process",
    `/${locale}/services/facade-and-roofing`,
  ];

  return (
    <ServicePage>
      <ServiceHero
        breadcrumbs={[
          { label: dictionary.common.home, href: `/${locale}` },
          { label: dictionary.services.pageTitle, href: `/${locale}/services` },
          { label: content.title },
        ]}
        breadcrumbsLabel={dictionary.common.breadcrumbs}
        title={content.heroTitle ?? content.title}
        description={content.heroDescription}
        image={media.hero}
        contactLabel={primaryCta}
        exploreLabel={presentation.explore}
      />
      <ServicePlanning
        slug={service.slug}
        locale={locale}
        id="service-overview"
        eyebrow={dictionary.services.eyebrow}
      />
      <ServiceDetails
        title={isHouse ? presentation.house.detailsTitle : copy.overview}
        eyebrow={dictionary.services.eyebrow}
        paragraphs={[content.fullDescription]}
        image={media.details}
      >
        <h3>{copy.included}</h3>
        <ServiceList items={content.includedWorks} />
      </ServiceDetails>
      {isHouse ? (
        <ServiceSection
          eyebrow={dictionary.services.eyebrow}
          title={presentation.house.scopeTitle}
          tone="warm"
        >
          <ServiceScope
            cards={presentation.house.scope.map((card, index) => ({
              ...card,
              href: scopePaths[index],
            }))}
          />
        </ServiceSection>
      ) : null}
      <Container className="pb-12 sm:pb-16">
        {apartment ? (
          <p className="max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
            <Link
              className="font-medium text-[var(--text-primary)] underline underline-offset-4"
              href={`/${locale}/${getSeoLandingPath(apartment)}`}
            >
              {apartment.content.title}
            </Link>
            {": "}
            {apartment.content.description}
          </p>
        ) : null}
        <ServiceFacts
          groups={[
            { title: copy.audience, items: content.suitableFor },
            { title: copy.customerTypes, items: content.customerTypes ?? [] },
            { title: copy.workTypes, items: content.workTypes ?? [] },
          ]}
        />
      </Container>
      <ServiceSection id="service-process" title={copy.stages} tone="warm">
        <ServiceProcess steps={content.workflow} />
      </ServiceSection>
      {content.priceFactors.length || content.estimateRequirements?.length ? (
        <ServicePricing
          title={copy.priceFactors}
          description={
            isHouse ? <p>{presentation.house.pricingIntro}</p> : undefined
          }
          factors={content.priceFactors}
          requirementsTitle={copy.estimateRequirements}
          requirements={content.estimateRequirements}
          contactLabel={primaryCta}
        />
      ) : null}
      <ServiceFAQ title={copy.faq} items={content.faq} />
      <RelatedServices
        title={dictionary.seo.relatedPlanningTitle}
        links={links}
        moreLabel={presentation.moreServices}
      />
      <ServiceCTA dictionary={dictionary} />
    </ServicePage>
  );
}
