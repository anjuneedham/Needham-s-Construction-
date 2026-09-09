import { ProjectCard } from "./ProjectCard";
import { ProjectsEmptyState } from "./ProjectsEmptyState";
import type { Project } from "@/types/content";

/**
 * Renders a set of projects, or the designed empty state when there are none.
 * Used by the home page, the projects page and every service page.
 */
export function ProjectGrid({
  projects,
  emptyHeading,
  emptyMessage,
  emptyLabels,
  tone = "light",
}: {
  projects: Project[];
  emptyHeading?: string;
  emptyMessage?: string;
  emptyLabels?: string[];
  tone?: "light" | "dark";
}) {
  if (projects.length === 0) {
    return (
      <ProjectsEmptyState
        heading={emptyHeading}
        message={emptyMessage}
        labels={emptyLabels}
        tone={tone}
      />
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
