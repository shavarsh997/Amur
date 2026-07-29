import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactTrigger } from "@/components/forms/contact-dialog";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { getDictionary, isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { contacts } = await getDictionary(locale);

  return buildMetadata({
    locale,
    path: "contacts",
    title: contacts.title,
    description: contacts.description,
  });
}

export default async function ContactsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale);
  const copy = dictionary.contacts;

  return (
    <>
      <PageHero
        breadcrumbsLabel={dictionary.common.breadcrumbs}
        breadcrumbs={[
          { label: dictionary.common.home, href: `/${locale}` },
          { label: copy.title },
        ]}
        description={copy.description}
        eyebrow={copy.eyebrow}
        title={copy.title}
      />
      <Container className="py-12 sm:py-16 lg:py-20">
        <section className="mx-auto max-w-2xl rounded-2xl border border-[var(--border)] bg-white p-6 text-center sm:p-9">
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
            {copy.formTitle}
          </h2>
          <p className="mt-4 leading-7 text-[var(--text-secondary)]">
            {copy.formDescription}
          </p>
          <ContactTrigger className="mt-8" label={dictionary.nav.contacts} />
        </section>
      </Container>
    </>
  );
}
