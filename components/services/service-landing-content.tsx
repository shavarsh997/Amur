import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { RenovationContact } from "@/components/calculator/renovation-contact";
import { getServiceMedia } from "@/config/service-media.config";
import { serviceSectionRoles } from "@/config/service-presentation.config";
import { servicePageTranslations } from "@/messages/service-pages";
import type { BreadcrumbItem } from "@/components/ui/breadcrumbs";
import type { SeoLandingPage } from "@/config/seo-landing-pages.config";
import type { Dictionary, Locale } from "@/types";
import { ServicePlanning } from "./service-planning";
import {
  ServicePage,
  ServiceHero,
  ServiceSection,
  ServiceDetails,
  ServiceWorkGrid,
  ServiceProcess,
  ServicePricing,
  ServiceFAQ,
  ServiceCTA,
  RelatedServices,
  type ServiceLink,
} from "./service-page";

export function ServiceLandingContent({
  page,
  locale,
  dictionary,
  breadcrumbs,
  relatedLinks,
  secondaryAction,
}: {
  page: SeoLandingPage & { content: SeoLandingPage["translations"][Locale] };
  locale: Locale;
  dictionary: Dictionary;
  breadcrumbs: readonly BreadcrumbItem[];
  relatedLinks: readonly ServiceLink[];
  secondaryAction?: React.ReactNode;
}) {
  const { content } = page;
  const media = getServiceMedia(page.slug, locale);
  const presentation = servicePageTranslations[locale];
  const roles = serviceSectionRoles[page.slug];
  const scope = roles ? content.sections[roles.scope] : undefined;
  const process =
    roles?.process !== undefined ? content.sections[roles.process] : undefined;
  const pricing =
    roles?.pricing !== undefined ? content.sections[roles.pricing] : undefined;
  const otherSections = content.sections.filter(
    (_, index) =>
      !roles || ![roles.scope, roles.process, roles.pricing].includes(index)
  );
  const supportsCalculator = page.slug === "apartment-interior-design-yerevan";
  const estimate = supportsCalculator ? (
    <section>
      <h3>{content.calculatorLabel}</h3>
      <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
        {dictionary.seo.calculatorEstimateNotice}
      </p>
      <ButtonLink className="mt-6" href={`/${locale}/calculator`}>
        {content.calculatorLabel}
      </ButtonLink>
    </section>
  ) : (
    <div id="request-estimate" className="scroll-mt-24">
      <RenovationContact
        copy={dictionary.constructionCalculator.renovationContact}
      />
    </div>
  );

  return (
    <ServicePage>
      <ServiceHero
        title={content.title}
        description={content.description}
        breadcrumbs={breadcrumbs}
        breadcrumbsLabel={dictionary.common.breadcrumbs}
        contactLabel={content.contactLabel}
        exploreLabel={presentation.explore}
        image={media.hero}
        secondaryAction={secondaryAction}
      />
      {scope ? (
        <ServiceSection
          id="service-overview"
          title={scope.title}
          eyebrow={content.eyebrow}
          description={
            <>
              {scope.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </>
          }
          tone="warm"
        >
          <ServiceWorkGrid items={scope.items ?? []} />
        </ServiceSection>
      ) : null}
      <ServiceDetails
        title={dictionary.services.detail.overview}
        eyebrow={content.eyebrow}
        paragraphs={content.introduction}
        image={media.details}
      >
        {otherSections.map((section) => (
          <section className="mt-8" key={section.title}>
            <h3>{section.title}</h3>
            {section.paragraphs.map((p) => (
              <p
                className="mt-4 text-sm leading-7 text-[var(--text-secondary)]"
                key={p}
              >
                {p}
              </p>
            ))}
            {section.items?.length ? (
              <ServiceWorkGrid items={section.items} />
            ) : null}
          </section>
        ))}
      </ServiceDetails>
      <ServicePlanning slug={page.slug} locale={locale} />
      {process ? (
        <ServiceSection
          id="service-process"
          title={process.title}
          description={
            <>
              {process.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </>
          }
          tone="warm"
        >
          <ServiceProcess
            steps={(process.items ?? []).map((title) => ({
              title,
              description: "",
            }))}
          />
        </ServiceSection>
      ) : null}
      {pricing ? (
        <ServicePricing
          title={pricing.title}
          description={
            <>
              {pricing.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </>
          }
          factors={pricing.items}
          contactLabel={content.contactLabel}
          aside={estimate}
        />
      ) : (
        <Container className="pb-12 sm:pb-16">{estimate}</Container>
      )}
      <ServiceFAQ title={dictionary.seo.faqTitle} items={content.faqs} />
      <RelatedServices
        title={content.relatedTitle}
        links={relatedLinks}
        moreLabel={presentation.moreServices}
      />
      <ServiceCTA dictionary={dictionary} />
    </ServicePage>
  );
}
