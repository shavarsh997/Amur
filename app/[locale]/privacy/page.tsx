import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { companyConfig } from "@/config/company.config";
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
        breadcrumbsLabel={dictionary.common.breadcrumbs}
        breadcrumbs={[
          { label: dictionary.common.home, href: `/${locale}` },
          { label: privacy.title },
        ]}
        description={privacy.intro}
        title={privacy.title}
      />
      <Container className="py-12 sm:py-16 lg:py-20">
        <article className="mx-auto max-w-4xl">
          {companyConfig.privacy.updatedAt ? (
            <p className="text-sm font-semibold text-[var(--brand-accent)]">
              {privacy.updated}: {companyConfig.privacy.updatedAt}
            </p>
          ) : null}
          <div className="mt-10 space-y-12">
            {privacy.sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 leading-7 text-[var(--text-secondary)]">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </Container>
    </>
  );
}
