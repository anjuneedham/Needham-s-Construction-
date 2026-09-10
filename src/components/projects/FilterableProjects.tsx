"use client";

import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import { ProjectCard } from "./ProjectCard";
import { ProjectsEmptyState } from "./ProjectsEmptyState";
import type { Project } from "@/types/content";

interface Filter {
  slug: string;
  label: string;
}

/**
 * The projects grid with service filtering. Filters are derived from the
 * projects themselves, so a category only appears once there is work in it.
 */
export function FilterableProjects({
  projects,
  filters,
  emptyHeading,
  emptyMessage,
  emptyLabels,
}: {
  projects: Project[];
  /** Candidate filters, in display order — usually the service list. */
  filters: Filter[];
  emptyHeading?: string;
  emptyMessage?: string;
  emptyLabels?: string[];
}) {
  const [active, setActive] = useState("all");

  const available = useMemo(() => {
    const counts = new Map<string, number>();
    for (const project of projects) {
      counts.set(project.category, (counts.get(project.category) ?? 0) + 1);
    }
    return filters
      .filter((filter) => counts.has(filter.slug))
      .map((filter) => ({ ...filter, count: counts.get(filter.slug) ?? 0 }));
  }, [filters, projects]);

  const visible = useMemo(
    () =>
      active === "all"
        ? projects
        : projects.filter((project) => project.category === active),
    [active, projects],
  );

  if (projects.length === 0) {
    return (
      <ProjectsEmptyState
        heading={emptyHeading}
        message={emptyMessage}
        labels={emptyLabels}
      />
    );
  }

  // One category only — the filter row would say nothing useful.
  const showFilters = available.length > 1;

  return (
    <div>
      {showFilters ? (
        <div
          role="group"
          aria-label="Filter projects by service"
          className="flex flex-wrap gap-2"
        >
          <FilterChip
            label="All work"
            count={projects.length}
            selected={active === "all"}
            onClick={() => setActive("all")}
          />
          {available.map((filter) => (
            <FilterChip
              key={filter.slug}
              label={filter.label}
              count={filter.count}
              selected={active === filter.slug}
              onClick={() => setActive(filter.slug)}
            />
          ))}
        </div>
      ) : null}

      <p aria-live="polite" className="sr-only">
        Showing {visible.length} project{visible.length === 1 ? "" : "s"}.
      </p>

      <div
        className={cn(
          "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
          showFilters && "mt-10",
        )}
      >
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}

function FilterChip({
  label,
  count,
  selected,
  onClick,
}: {
  label: string;
  count: number;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "inline-flex items-center gap-2 rounded-sm border px-4 py-2.5 text-sm font-semibold transition-all duration-150 active:scale-[0.98]",
        selected
          ? "border-iron-900 bg-iron-900 text-white"
          : "border-concrete-300 bg-white text-iron-700 hover:border-iron-900 hover:text-iron-900",
      )}
    >
      {label}
      <span
        className={cn(
          "text-xs font-bold tabular-nums",
          selected ? "text-amber-400" : "text-concrete-600",
        )}
      >
        {count}
      </span>
    </button>
  );
}
