import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { EstimateSection } from "@/components/sections/estimate-section";
import { FinalCta } from "@/components/sections/final-cta";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { getActiveServices, getServiceBySlug } from "@/config/services.config";
import { getDictionary, isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return getActiveServices("hy").map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const service = getServiceBySlug(locale, slug);
  if (!service) notFound();

  return buildMetadata({
    locale,
    path: `services/${service.slug}`,
    title: service.content.seoTitle,
    description: service.content.seoDescription,
    image: service.image,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale);
  const service = getServiceBySlug(locale, slug);
  if (!service) notFound();
  const copy = dictionary.services.detail;

  return (
    <>
      <PageHero
        actions={
          <ButtonLink href={`/${locale}/contacts#estimate`}>
            {copy.requestEstimate}
          </ButtonLink>
        }
        breadcrumbs={[
          { label: dictionary.common.home, href: `/${locale}` },
          { label: dictionary.services.pageTitle, href: `/${locale}/services` },
          { label: service.content.title },
        ]}
        description={service.content.heroDescription}
        eyebrow={dictionary.services.eyebrow}
        title={service.content.title}
      />
      <article>
        <Container className="py-12 sm:py-16 lg:py-20">
          <div className="relative aspect-[16/8] overflow-hidden rounded-[28px] bg-[var(--background-warm)]">
            <Image
              alt={service.content.title}
              className="object-cover"
              fill
              sizes="(max-width: 1279px) 100vw, 1200px"
              src={service.image}
            />
          </div>
          <div className="mx-auto mt-14 max-w-5xl space-y-14">
            <section>
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">{copy.overview}</h2>
              <p className="mt-5 text-lg leading-8 text-[var(--text-secondary)]">{service.content.fullDescription}</p>
            </section>
            <div className="grid gap-10 md:grid-cols-3">
              <section>
                <h2 className="text-xl font-semibold text-[var(--text-primary)]">{copy.included}</h2>
                <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-[var(--text-secondary)]">
                  {service.content.includedWorks.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </section>
              <section>
                <h2 className="text-xl font-semibold text-[var(--text-primary)]">{copy.stages}</h2>
                <ol className="mt-4 list-decimal space-y-3 pl-5 leading-7 text-[var(--text-secondary)]">
                  {service.content.workflow.map((step) => <li key={step.title}><span className="font-medium text-[var(--text-primary)]">{step.title}</span>{step.description ? <span className="block mt-1">{step.description}</span> : null}</li>)}
                </ol>
              </section>
              <section>
                <h2 className="text-xl font-semibold text-[var(--text-primary)]">{copy.audience}</h2>
                <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-[var(--text-secondary)]">
                  {service.content.suitableFor.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </section>
            </div>
            {service.content.priceFactors.length || service.content.faq.length ? (
              <div className="grid gap-8 md:grid-cols-2">
                {service.content.priceFactors.length ? (
                  <section className="rounded-2xl border border-[var(--border)] bg-[var(--background-soft)] p-6">
                    <h2 className="text-xl font-semibold text-[var(--text-primary)]">{copy.priceFactors}</h2>
                    <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-[var(--text-secondary)]">
                      {service.content.priceFactors.map((factor) => <li key={factor}>{factor}</li>)}
                    </ul>
                  </section>
                ) : null}
                {service.content.faq.length ? (
                  <section className="rounded-2xl border border-[var(--border)] bg-white p-6">
                    <h2 className="text-xl font-semibold text-[var(--text-primary)]">{copy.faq}</h2>
                    <div className="mt-4 space-y-5">
                      {service.content.faq.map((item) => <div key={item.question}><h3 className="font-semibold text-[var(--text-primary)]">{item.question}</h3><p className="mt-2 leading-7 text-[var(--text-secondary)]">{item.answer}</p></div>)}
                    </div>
                  </section>
                ) : null}
              </div>
            ) : null}
            <div className="rounded-[24px] bg-[var(--background-warm)] p-7 sm:p-10">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--text-primary)]">{copy.requestEstimate}</h2>
              <ButtonLink className="mt-6" href={`/${locale}/contacts#estimate`}>
                {copy.requestEstimate}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </article>
      <EstimateSection dictionary={dictionary} locale={locale} />
      <FinalCta dictionary={dictionary} locale={locale} />
    </>
  );
}
