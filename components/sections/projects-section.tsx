import Image from "next/image";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { featuredProjects } from "@/data/featured-projects";
import type { Dictionary, Locale } from "@/types";

export function ProjectsSection({ locale, dictionary }: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            description={dictionary.projects.description}
            eyebrow={dictionary.projects.eyebrow}
            title={dictionary.projects.title}
          />
        </div>
        <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {featuredProjects.map((project, index) => (
            <figure
              className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--surface-muted)]"
              key={project.id}
            >
              <Image
                alt={project.imageAlt[locale]}
                className="object-cover transition duration-500 group-hover:scale-[1.025]"
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                src={project.image}
              />
              <figcaption className="absolute bottom-4 left-4 text-xs font-bold tracking-[0.16em] text-white">
                <span className="border-l-2 border-[var(--brand-copper)] pl-2.5">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-5 max-w-2xl border-l-2 border-[var(--brand-copper)] pl-4 text-sm leading-6 text-[var(--text-secondary)]">
          {dictionary.projects.availabilityDescription}
        </p>
      </Container>
    </section>
  );
}
