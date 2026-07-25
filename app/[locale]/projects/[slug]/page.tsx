import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { projectCatalog } from "@/data/projects";
import { getDictionary, isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import type { Dictionary, Project } from "@/types";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return projectCatalog.map(({ slug }) => ({ slug }));
}

function objectTypeLabel(project: Project, dictionary: Dictionary) {
  if (project.objectType === "private-house") return dictionary.projects.filters.privateHouses;
  if (project.objectType === "commercial") return dictionary.projects.filters.commercial;
  return dictionary.projects.filters.renovation;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale);
  const project = dictionary.projects.items.find((item) => item.slug === slug);
  if (!project) notFound();

  return buildMetadata({
    locale,
    path: `projects/${project.slug}`,
    title: project.title,
    description: project.task,
    image: project.image,
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale);
  const project = dictionary.projects.items.find((item) => item.slug === slug);
  if (!project) notFound();
  const copy = dictionary.projects.detail;
  const facts = [
    [copy.location, project.location],
    [copy.objectType, objectTypeLabel(project, dictionary)],
    [copy.area, project.area],
    [copy.year, project.year],
    [copy.status, dictionary.projects.statusLabels[project.status]],
  ];

  return (
    <>
      <PageHero
        actions={
          <ButtonLink href={`/${locale}/contacts#estimate`}>
            {copy.discussProject}
          </ButtonLink>
        }
        breadcrumbs={[
          { label: dictionary.common.home, href: `/${locale}` },
          { label: dictionary.projects.pageTitle, href: `/${locale}/projects` },
          { label: project.title },
        ]}
        description={project.task}
        eyebrow={dictionary.projects.eyebrow}
        title={project.title}
      />
      <article>
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="relative aspect-[16/8] overflow-hidden rounded-3xl bg-zinc-100">
            <Image
              alt={project.title}
              className="object-cover"
              fill
              sizes="(max-width: 1279px) 100vw, 1200px"
              src={project.image}
            />
            {project.isDemo ? (
              <span className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-zinc-950">
                Demo
              </span>
            ) : null}
          </div>

          <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-zinc-200 sm:grid-cols-2 lg:grid-cols-5">
            {facts.map(([label, value]) => (
              <div className="bg-zinc-50 p-5" key={label}>
                <dt className="text-xs font-bold uppercase tracking-wide text-zinc-500">{label}</dt>
                <dd className="mt-2 font-semibold text-zinc-950">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mx-auto mt-14 max-w-5xl space-y-14">
            <section>
              <h2 className="text-2xl font-semibold text-zinc-950">{copy.task}</h2>
              <p className="mt-4 text-lg leading-8 text-zinc-600">{project.task}</p>
            </section>
            <div className="grid gap-10 md:grid-cols-3">
              <section>
                <h2 className="text-xl font-semibold text-zinc-950">{copy.completedWorks}</h2>
                <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-zinc-600">
                  {project.completedWorks.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </section>
              <section>
                <h2 className="text-xl font-semibold text-zinc-950">{copy.stages}</h2>
                <ol className="mt-4 list-decimal space-y-3 pl-5 leading-7 text-zinc-600">
                  {project.stages.map((stage) => <li key={stage}>{stage}</li>)}
                </ol>
              </section>
              <section>
                <h2 className="text-xl font-semibold text-zinc-950">{copy.materials}</h2>
                <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-zinc-600">
                  {project.materials.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </section>
            </div>
            <section className="rounded-3xl bg-zinc-950 p-7 text-white sm:p-10">
              <h2 className="text-2xl font-semibold">{copy.result}</h2>
              <p className="mt-4 leading-7 text-zinc-300">{project.result}</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-zinc-950">{copy.gallery}</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {project.gallery.map((image, index) => (
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100" key={image}>
                    <Image
                      alt={`${project.title} — ${copy.gallery} ${index + 1}`}
                      className="object-cover"
                      fill
                      sizes="(max-width: 639px) 100vw, 50vw"
                      src={image}
                    />
                  </div>
                ))}
              </div>
            </section>
            <ButtonLink href={`/${locale}/contacts#estimate`}>
              {copy.discussProject}
            </ButtonLink>
          </div>
        </Container>
      </article>
    </>
  );
}
