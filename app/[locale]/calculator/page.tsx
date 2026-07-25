import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CostCalculator } from "@/components/calculator/cost-calculator";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { getDictionary, isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { calculator } = await getDictionary(locale);

  return buildMetadata({
    locale,
    path: "calculator",
    title: calculator.title,
    description: calculator.description,
  });
}

export default async function CalculatorPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale);
  const copy = dictionary.calculator;

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: dictionary.common.home, href: `/${locale}` },
          { label: copy.title },
        ]}
        description={copy.description}
        eyebrow={copy.eyebrow}
        title={copy.title}
      />
      <Container className="max-w-4xl py-12 sm:py-16 lg:py-20">
        <CostCalculator dictionary={dictionary} locale={locale} />
      </Container>
    </>
  );
}
