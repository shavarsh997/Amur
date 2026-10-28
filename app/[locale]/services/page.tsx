import { PageSchema } from "@/components/seo/page-schema";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ServiceGuides } from "@/components/sections/service-guides";
import { getServiceImageAlt } from "@/config/service-images.config";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { getActiveServices } from "@/config/services.config";
import { getDictionary, isLocale } from "@/lib/i18n";
import { getBreadcrumbJsonLd, serializeJsonLd } from "@/lib/json-ld";
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
      <PageSchema
        locale={locale}
        pathname="services"
        name={services.pageTitle}
        description={services.pageDescription}
        type="CollectionPage"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            getBreadcrumbJsonLd([
              { label: common.home, href: `/${locale}` },
              { label: services.pageTitle },
            ])
          ),
        }}
        type="application/ld+json"
      />
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
      <Container className="space-y-8 py-section">
        <ServiceGuides locale={locale} prominent />
        <div className="space-y-8">
          {getActiveServices(locale).map(({ content, ...service }) => (
            <article
              className="content-split service-catalog-card grid overflow-hidden rounded-[24px] border border-[var(--border)] bg-white lg:grid-cols-2"
              key={service.slug}
            >
              <div className="service-catalog-image relative min-h-72 bg-[var(--background-warm)]">
                <Image
                  alt={getServiceImageAlt(service.image, locale)}
                  className="object-cover"
                  fill
                  sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 959px) calc(100vw - 48px), (max-width: 1279px) 35vw, (max-width: 1589px) 28vw, 410px"
                  src={service.image}
                />
              </div>
              <div className="service-catalog-copy">
                <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--text-primary)] sm:text-3xl">
                  <Link
                    href={`/${locale}/services/${service.slug}`}
                    className="rounded-sm hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
                  >
                    {content.title}
                  </Link>
                </h2>
                <p className="mt-4 leading-7 text-[var(--text-secondary)]">
                  {content.shortDescription}
                </p>
                <div className="mt-6">
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)]">
                      {services.detail.included}
                    </h3>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-[var(--text-secondary)]">
                      {content.includedWorks.slice(0, 3).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <ButtonLink
                  className="mt-8"
                  href={`/${locale}/services/${service.slug}`}
                >
                  {services.learnMore}
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </>
  );
}
