import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FAQSection } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { ProjectsSection } from "@/components/sections/projects-section";
import { RenovationIncluded } from "@/components/sections/renovation-included";
import { ServiceArea } from "@/components/sections/service-area";
import { SpecializedServices } from "@/components/sections/specialized-services";
import { ServicesSection } from "@/components/sections/services-section";
import { WhyUs } from "@/components/sections/why-us";
import { homeContent } from "@/config/home-content.config";
import { WorkProcess } from "@/components/sections/work-process";
import { getDictionary, isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale);

  return buildMetadata({
    locale,
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    image: homeContent[locale].heroVisual.image,
    imageAlt: homeContent[locale].heroVisual.alt,
  });
}

export default async function LocaleHome({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale);

  return (
    <>
      <Hero dictionary={dictionary} locale={locale} />
      <ProjectsSection dictionary={dictionary} locale={locale} />
      {/* <EstimateSection dictionary={dictionary} locale={locale} /> */}
      <ServicesSection dictionary={dictionary} locale={locale} />
      <RenovationIncluded locale={locale} />
      <WorkProcess dictionary={dictionary} />
      <WhyUs dictionary={dictionary} />
      <SpecializedServices dictionary={dictionary} locale={locale} />
      <ServiceArea locale={locale} />
      <FAQSection dictionary={dictionary} />
      <FinalCta dictionary={dictionary} locale={locale} />
    </>
  );
}
