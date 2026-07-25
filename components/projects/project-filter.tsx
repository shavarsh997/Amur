"use client";

import { useMemo, useState } from "react";

import { ProjectCard } from "@/components/ui/project-card";
import type { Dictionary, Locale, Project } from "@/types";

type Filter =
  | "all"
  | "private-house"
  | "commercial"
  | "renovation"
  | "in-progress"
  | "completed";

type ProjectFilterProps = {
  locale: Locale;
  projects: readonly Project[];
  labels: Dictionary["projects"]["filters"];
  statusLabels: Dictionary["projects"]["statusLabels"];
  ariaLabel: string;
};

export function ProjectFilter({
  locale,
  projects,
  labels,
  statusLabels,
  ariaLabel,
}: ProjectFilterProps) {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const filters: ReadonlyArray<{ value: Filter; label: string }> = [
    { value: "all", label: labels.all },
    { value: "private-house", label: labels.privateHouses },
    { value: "commercial", label: labels.commercial },
    { value: "renovation", label: labels.renovation },
    { value: "in-progress", label: labels.inProgress },
    { value: "completed", label: labels.completed },
  ];

  const visibleProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    if (activeFilter === "in-progress" || activeFilter === "completed") {
      return projects.filter((project) => project.status === activeFilter);
    }
    return projects.filter((project) => project.objectType === activeFilter);
  }, [activeFilter, projects]);

  return (
    <div>
      <div aria-label={ariaLabel} className="flex flex-wrap gap-2" role="group">
        {filters.map((filter) => {
          const active = activeFilter === filter.value;

          return (
            <button
              aria-pressed={active}
              className={`min-h-11 rounded-full border px-5 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                active
                  ? "border-zinc-950 bg-zinc-950 text-white"
                  : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-950 hover:text-zinc-950"
              }`}
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              type="button"
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((project) => (
          <ProjectCard
            key={project.slug}
            locale={locale}
            project={project}
            statusLabel={statusLabels[project.status]}
          />
        ))}
      </div>
    </div>
  );
}
