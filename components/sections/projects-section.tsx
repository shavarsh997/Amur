import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { ProjectCard } from "@/components/ui/project-card";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Dictionary, Locale } from "@/types";

export function ProjectsSection({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  return (
    <section className="bg-zinc-50 py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            description={dictionary.projects.description}
            eyebrow={dictionary.projects.eyebrow}
            title={dictionary.projects.title}
          />
          <Link
            className="inline-flex items-center gap-2 self-start rounded-sm font-semibold text-zinc-950 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
            href={`/${locale}/projects`}
          >
            {dictionary.projects.viewAll}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dictionary.projects.items.slice(0, 3).map((project) => (
            <ProjectCard
              key={project.slug}
              locale={locale}
              project={project}
              statusLabel={dictionary.projects.statusLabels[project.status]}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
