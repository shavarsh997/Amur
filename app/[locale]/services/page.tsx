import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { getActiveServices } from "@/config/services.config";
import { getDictionary, isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { services } = await getDictionary(locale);

  return buildMetadata({
    locale,
    path: "services",
    title: services.pageTitle,
    description: services.pageDescription,
  });
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale);
  const { services, common } = dictionary;

  return (
    <>
      <PageHero
        breadcrumbsLabel={common.breadcrumbs}
        breadcrumbs={[
          { label: common.home, href: `/${locale}` },
          { label: services.pageTitle },
        ]}
        description={services.pageDescription}
        eyebrow={services.eyebrow}
        title={services.pageTitle}
      />
      <Container className="space-y-5 py-12 sm:py-16 lg:py-20">
        {getActiveServices(locale).map(({ content, ...service }, index) => (
          <article
            className="grid overflow-hidden rounded-[24px] border border-[var(--border)] bg-white lg:grid-cols-2"
            key={service.slug}
          >
            <div className={`relative min-h-72 bg-[var(--background-warm)] ${index % 2 ? "lg:order-2" : ""}`}>
              <Image
                alt={content.title}
                className="object-cover"
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
                src={service.image}
              />
            </div>
            <div className="p-6 sm:p-9 lg:p-12">
              <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--text-primary)] sm:text-3xl">
                {content.title}
              </h2>
              <p className="mt-4 leading-7 text-[var(--text-secondary)]">{content.fullDescription}</p>
              <div className="mt-7 grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)]">{services.detail.included}</h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-[var(--text-secondary)]">
                    {content.includedWorks.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)]">{services.detail.stages}</h3>
                  <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-[var(--text-secondary)]">
                    {content.workflow.map((step) => <li key={step.title}>{step.title}</li>)}
                  </ol>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="font-semibold text-[var(--text-primary)]">{services.detail.audience}</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-[var(--text-secondary)]">
                  {content.suitableFor.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <ButtonLink className="mt-8" href={`/${locale}/services/${service.slug}`}>
                {content.primaryCta ?? services.detail.requestEstimate}
              </ButtonLink>
            </div>
          </article>
        ))}
      </Container>
    </>
  );
}
