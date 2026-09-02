import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CostCalculator } from "@/components/calculator/cost-calculator";
import { Container } from "@/components/ui/container";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { calculatorSeo } from "@/config/calculator-seo.config";
import { getFaqsWithMinimum } from "@/lib/faq";
import { getDictionary, isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { getBreadcrumbJsonLd, serializeJsonLd } from "@/lib/json-ld";
import Link from "next/link";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = calculatorSeo[locale];

  return buildMetadata({
    locale,
    path: "calculator",
    title: copy.title,
    description: copy.description,
  });
}

export default async function CalculatorPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale);
  const copy = dictionary.calculator;
  const seo = calculatorSeo[locale];
  const faqs = getFaqsWithMinimum(
    seo.faqs.map(([question, answer]) => ({ question, answer })),
    locale
  );

  return (
    <Container className="py-10 sm:py-16">
      <script
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            getBreadcrumbJsonLd([
              { label: dictionary.common.home, href: `/${locale}` },
              { label: seo.title },
            ])
          ),
        }}
        type="application/ld+json"
      />
      <div className="rounded-[28px] border border-[var(--border)] bg-[var(--background-soft)] p-7 text-center sm:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand-accent)]">
          {copy.eyebrow}
        </p>
        <h1 className="mx-auto mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.05em] text-[var(--text-primary)] sm:text-5xl">
          {seo.title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[var(--text-secondary)]">
          {seo.description}
        </p>
      </div>
      <section className="mx-auto mt-8 max-w-4xl">
        <CostCalculator
          copy={dictionary.constructionCalculator}
          locale={locale}
        />
      </section>
      <section className="mx-auto mt-12 max-w-4xl border-t border-[var(--border)] pt-10">
        <p className="leading-7 text-[var(--text-secondary)]">{seo.intro}</p>
        <h2 className="mt-10 text-2xl font-semibold tracking-[-0.035em] text-[var(--text-primary)]">
          {seo.faqTitle}
        </h2>
        <div className="mt-5">
          <FAQAccordion items={faqs} />
        </div>
        <p className="mt-8 text-sm leading-6 text-[var(--text-secondary)]">
          <Link
            className="font-semibold text-[var(--text-primary)] underline"
            href={`/${locale}/prices`}
          >
            {locale === "ru"
              ? "Цены на ремонт квартир в Ереване"
              : locale === "en"
                ? "Apartment renovation prices in Yerevan"
                : "Բնակարանների վերանորոգման գներ Երևանում"}
          </Link>
        </p>
      </section>
    </Container>
  );
}
