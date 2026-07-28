import { ArrowUpRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { Locale, Project } from "@/types";

type ProjectCardProps = {
  project: Project;
  locale: Locale;
  statusLabel: string;
  href?: string;
};

export function ProjectCard({
  project,
  locale,
  statusLabel,
  href = `/${locale}/projects/${project.slug}`,
}: ProjectCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <Link
        aria-label={project.title}
        className="block rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--button-primary)]"
        href={href}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
          <Image
            alt={project.title}
            className="object-cover transition duration-500 group-hover:scale-105"
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
            src={project.image}
          />
          <span className="absolute left-4 top-4 rounded-full bg-zinc-950/80 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
            {statusLabel}
          </span>
        </div>
        <div className="space-y-4 p-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-semibold tracking-tight text-zinc-950">
              {project.title}
            </h3>
            <ArrowUpRight
              aria-hidden="true"
              className="mt-1 size-5 shrink-0 text-[var(--brand-accent)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-600">
            <span className="inline-flex items-center gap-1.5">
              <MapPin
                aria-hidden="true"
                className="size-4 text-[var(--brand-accent)]"
              />
              {project.location}
            </span>
            <span>{project.area}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
