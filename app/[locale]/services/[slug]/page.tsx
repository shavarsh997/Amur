import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FinalCta } from "@/components/sections/final-cta";
import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { ContactTrigger } from "@/components/forms/contact-dialog";
import { Container } from "@/components/ui/container";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { PageHero } from "@/components/ui/page-hero";
import { getActiveServices, getServiceBySlug } from "@/config/services.config";
import {
  getSeoLandingPage,
  getSeoLandingPath,
  seoLandingPages,
} from "@/config/seo-landing-pages.config";
import { getDictionary, isLocale } from "@/lib/i18n";
import { getFaqsWithMinimum } from "@/lib/faq";
import { buildMetadata } from "@/lib/metadata";
import {
  getBreadcrumbJsonLd,
  getServiceJsonLd,
  serializeJsonLd,
} from "@/lib/json-ld";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return [
    ...getActiveServices("hy").map(({ slug }) => ({ slug })),
    ...seoLandingPages
      .filter((page) => page.kind === "service")
      .map(({ slug }) => ({ slug })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const service = getServiceBySlug(locale, slug);
  const landing = getSeoLandingPage(locale, slug);

  if (landing?.kind === "service") {
    return buildMetadata({
      locale,
      path: getSeoLandingPath(landing),
      title: landing.content.seoTitle,
      description: landing.content.seoDescription,
      image: landing.image,
      imageAlt: landing.content.title,
    });
  }

  if (!service) notFound();

  return buildMetadata({
    locale,
    path: `services/${service.slug}`,
    title: service.content.seoTitle,
    description: service.content.seoDescription,
    image: service.image,
    imageAlt: service.content.shortDescription,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale);
  const service = getServiceBySlug(locale, slug);
  const landing = getSeoLandingPage(locale, slug);
  if (landing?.kind === "service") {
    return (
      <SeoLandingPage dictionary={dictionary} locale={locale} page={landing} />
    );
  }
  if (!service) notFound();
  const copy = dictionary.services.detail;
  const faqs = getFaqsWithMinimum(service.content.faq, locale);
  const primaryCta = service.content.primaryCta ?? copy.requestEstimate;
  const relatedSeoPages = seoLandingPages.filter((page) =>
    (page.relatedServiceSlugs as readonly string[]).includes(service.slug)
  );
  const serviceJsonLd = getServiceJsonLd({
    locale,
    name: service.content.title,
    description: service.content.seoDescription,
    pathname: `services/${service.slug}`,
  });

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(serviceJsonLd),
        }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            getBreadcrumbJsonLd([
              { label: dictionary.common.home, href: `/${locale}` },
              {
                label: dictionary.services.pageTitle,
                href: `/${locale}/services`,
              },
              { label: service.content.title },
            ])
          ),
        }}
        type="application/ld+json"
      />
      <PageHero
        actions={<ContactTrigger label={primaryCta} />}
        breadcrumbsLabel={dictionary.common.breadcrumbs}
        breadcrumbs={[
          { label: dictionary.common.home, href: `/${locale}` },
          { label: dictionary.services.pageTitle, href: `/${locale}/services` },
          { label: service.content.title },
        ]}
        description={service.content.heroDescription}
        eyebrow={dictionary.services.eyebrow}
        title={service.content.heroTitle ?? service.content.title}
      />
      <article>
        <Container className="py-12 sm:py-16 lg:py-20">
          <div className="relative aspect-[16/8] overflow-hidden rounded-[28px] bg-[var(--background-warm)]">
            <Image
              alt={service.content.shortDescription}
              className="object-cover"
              fill
              sizes="(max-width: 1279px) 100vw, 1200px"
              src={service.image}
            />
          </div>
          <div className="mx-auto mt-14 max-w-5xl space-y-14">
            <section>
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
                {copy.overview}
              </h2>
              <p className="mt-5 text-lg leading-8 text-[var(--text-secondary)]">
                {service.content.fullDescription}
              </p>
            </section>
            <div className="grid gap-10 md:grid-cols-3">
              <section>
                <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                  {copy.included}
                </h2>
                <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-[var(--text-secondary)]">
                  {service.content.includedWorks.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
              <section>
                <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                  {copy.stages}
                </h2>
                <ol className="mt-4 list-decimal space-y-3 pl-5 leading-7 text-[var(--text-secondary)]">
                  {service.content.workflow.map((step) => (
                    <li key={step.title}>
                      <span className="font-medium text-[var(--text-primary)]">
                        {step.title}
                      </span>
                      {step.description ? (
                        <span className="block mt-1">{step.description}</span>
                      ) : null}
                    </li>
                  ))}
                </ol>
              </section>
              <section>
                <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                  {copy.audience}
                </h2>
                <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-[var(--text-secondary)]">
                  {service.content.suitableFor.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            </div>
            {service.content.customerTypes?.length ||
            service.content.workTypes?.length ||
            service.content.estimateRequirements?.length ? (
              <div className="grid gap-5 md:grid-cols-3">
                {service.content.customerTypes?.length ? (
                  <ContentList
                    items={service.content.customerTypes}
                    title={copy.customerTypes}
                  />
                ) : null}
                {service.content.workTypes?.length ? (
                  <ContentList
                    items={service.content.workTypes}
                    title={copy.workTypes}
                  />
                ) : null}
                {service.content.estimateRequirements?.length ? (
                  <ContentList
                    items={service.content.estimateRequirements}
                    title={copy.estimateRequirements}
                  />
                ) : null}
              </div>
            ) : null}
            {service.content.priceFactors.length || faqs.length ? (
              <div
                className={`grid gap-8 ${service.content.priceFactors.length && faqs.length ? "md:grid-cols-2" : "md:grid-cols-1"}`}
              >
                {service.content.priceFactors.length ? (
                  <section className="rounded-2xl border border-[var(--border)] bg-[var(--background-soft)] p-6">
                    <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                      {copy.priceFactors}
                    </h2>
                    <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-[var(--text-secondary)]">
                      {service.content.priceFactors.map((factor) => (
                        <li key={factor}>{factor}</li>
                      ))}
                    </ul>
                  </section>
                ) : null}
                {faqs.length ? (
                  <section className="rounded-2xl border border-[var(--border)] bg-white p-6 w-full">
                    <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                      {copy.faq}
                    </h2>
                    <div className="mt-4">
                      <FAQAccordion items={faqs} />
                    </div>
                  </section>
                ) : null}
              </div>
            ) : null}
            {relatedSeoPages.length ? (
              <section>
                <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--text-primary)]">
                  {locale === "ru"
                    ? "Полезные материалы и расчёт"
                    : locale === "en"
                      ? "Planning and pricing"
                      : "Պլանավորում և հաշվարկ"}
                </h2>
                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {relatedSeoPages.map((page) => (
                    <Link
                      className="rounded-2xl border border-[var(--border)] bg-[var(--background-soft)] p-5 transition hover:border-[var(--brand-copper)]"
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
              </section>
            ) : null}
            {/* <div className="rounded-[24px] bg-[var(--background-warm)] p-7 sm:p-10">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--text-primary)]">
                {dictionary.estimate.title}
              </h2>
              <ContactTrigger className="mt-6" label={primaryCta} />
            </div> */}
          </div>
        </Container>
      </article>
      {/* <EstimateSection
        dictionary={dictionary}
        locale={locale}
      /> */}
      <FinalCta dictionary={dictionary} locale={locale} />
    </>
  );
}

function ContentList({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--background-soft)] p-5">
      <h2 className="text-lg font-semibold text-[var(--text-primary)]">
        {title}
      </h2>
      <ul className="mt-4 space-y-2 text-sm leading-6 text-[var(--text-secondary)]">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
