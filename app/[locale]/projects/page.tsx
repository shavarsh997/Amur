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
  const { projects } = await getDictionary(locale);

  return buildMetadata({
    locale,
    path: "projects",
    title: projects.pageTitle,
    description: projects.availabilityDescription,
    noIndex: true,
  });
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale);

  return (
    <>
      <PageHero
        breadcrumbsLabel={dictionary.common.breadcrumbs}
        breadcrumbs={[
          { label: dictionary.common.home, href: `/${locale}` },
          { label: dictionary.projects.pageTitle },
        ]}
        description={dictionary.projects.availabilityDescription}
        eyebrow={dictionary.projects.eyebrow}
        title={dictionary.projects.availabilityTitle}
      />
      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="rounded-[28px] border border-[var(--border)] bg-[var(--background-soft)] p-8 sm:p-12">
          <p className="max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
            {dictionary.projects.availabilityDescription}
          </p>
          <ContactTrigger
            className="mt-8"
            label={dictionary.projects.availabilityAction}
          />
        </div>
      </Container>
    </>
  );
}
