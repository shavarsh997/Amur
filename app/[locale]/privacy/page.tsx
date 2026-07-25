import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { getDictionary, isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { privacy } = await getDictionary(locale);

  return buildMetadata({
    locale,
    path: "privacy",
    title: privacy.title,
    description: privacy.intro,
  });
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale);
  const { privacy } = dictionary;

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: dictionary.common.home, href: `/${locale}` },
          { label: privacy.title },
        ]}
        description={privacy.intro}
        title={privacy.title}
      />
      <Container className="py-16 sm:py-20 lg:py-24">
        <article className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold text-blue-700">{privacy.updated}</p>
          <div className="mt-10 space-y-12">
            {privacy.sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-2xl font-semibold text-zinc-950">{section.title}</h2>
                <div className="mt-4 space-y-4 leading-7 text-zinc-600">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </section>
            ))}
          </div>
        </article>
      </Container>
    </>
  );
}
