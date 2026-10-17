import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BaseServicePage } from "@/components/services/base-service-page";
import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { getActiveServices, getServiceBySlug } from "@/config/services.config";
import {
  getSeoLandingPage,
  getSeoLandingPath,
  seoLandingPages,
} from "@/config/seo-landing-pages.config";
import { getServiceImageAlt } from "@/config/service-images.config";
import { getDictionary, isLocale } from "@/lib/i18n";
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
      imageAlt: getServiceImageAlt(landing.image, locale),
    });
  }

  if (!service) notFound();

  return buildMetadata({
    locale,
    path: `services/${service.slug}`,
    title: service.content.seoTitle,
    description: service.content.seoDescription,
    image: service.image,
    imageAlt: getServiceImageAlt(service.image, locale),
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            getServiceJsonLd({
              locale,
              name: service.content.title,
              description: service.content.seoDescription,
              pathname: `services/${service.slug}`,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
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
      />
      <BaseServicePage
        service={service}
        dictionary={dictionary}
        locale={locale}
      />
    </>
  );
}
