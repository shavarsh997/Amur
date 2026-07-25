import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EstimateSection } from "@/components/sections/estimate-section";
import { FAQSection } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ServicesSection } from "@/components/sections/services-section";
import { Testimonials } from "@/components/sections/testimonials";
import { WhyUs } from "@/components/sections/why-us";
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
  });
}

export default async function LocaleHome({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale);

  return (
    <>
      <Hero dictionary={dictionary} locale={locale} />
      <ServicesSection dictionary={dictionary} locale={locale} />
      <ProjectsSection dictionary={dictionary} locale={locale} />
      <WhyUs dictionary={dictionary} />
      <WorkProcess dictionary={dictionary} />
      <EstimateSection dictionary={dictionary} locale={locale} />
      <Testimonials dictionary={dictionary} />
      <FAQSection dictionary={dictionary} />
      <FinalCta dictionary={dictionary} locale={locale} />
    </>
  );
}
