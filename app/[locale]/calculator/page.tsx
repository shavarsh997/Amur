import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactTrigger } from "@/components/forms/contact-dialog";
import { Container } from "@/components/ui/container";
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
    <Container className="py-10 sm:py-16">
      <div className="rounded-[28px] border border-[var(--border)] bg-[var(--background-soft)] p-7 text-center sm:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand-accent)]">
          {copy.eyebrow}
        </p>
        <h1 className="mx-auto mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.05em] text-[var(--text-primary)] sm:text-5xl">
          {copy.title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[var(--text-secondary)]">
          {copy.description}
        </p>
        <ContactTrigger className="mt-7" label={dictionary.nav.contacts} />
      </div>
    </Container>
  );
}
