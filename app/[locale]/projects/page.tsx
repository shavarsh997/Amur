import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectFilter } from "@/components/projects/project-filter";
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
    description: projects.pageDescription,
  });
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: dictionary.common.home, href: `/${locale}` },
          { label: dictionary.projects.pageTitle },
        ]}
        description={dictionary.projects.pageDescription}
        eyebrow={dictionary.projects.eyebrow}
        title={dictionary.projects.pageTitle}
      />
      <Container className="py-16 sm:py-20 lg:py-24">
        <ProjectFilter
          ariaLabel={dictionary.projects.pageTitle}
          labels={dictionary.projects.filters}
          locale={locale}
          projects={dictionary.projects.items}
          statusLabels={dictionary.projects.statusLabels}
        />
      </Container>
    </>
  );
}
