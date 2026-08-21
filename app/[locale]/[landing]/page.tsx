import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { getSeoLandingPage, getSeoLandingPath, seoLandingPages } from "@/config/seo-landing-pages.config";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string; landing: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    seoLandingPages
      .filter((page) => page.kind !== "service")
      .map((page) => ({ locale, landing: page.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, landing } = await params;
  if (!isLocale(locale)) notFound();
  const page = getSeoLandingPage(locale, landing);
  if (!page || page.kind === "service") notFound();

  return createPageMetadata({
    locale,
    pathname: getSeoLandingPath(page),
    title: page.content.seoTitle,
    description: page.content.seoDescription,
    image: page.image,
    imageAlt: page.content.title,
  });
}

export default async function LandingPage({ params }: Props) {
  const { locale, landing } = await params;
  if (!isLocale(locale)) notFound();
  const page = getSeoLandingPage(locale, landing);
  if (!page || page.kind === "service") notFound();

  return (
    <SeoLandingPage
      dictionary={await getDictionary(locale)}
      locale={locale}
      page={page}
    />
  );
}
