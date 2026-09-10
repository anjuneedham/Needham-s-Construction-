import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import type { Project } from "@/types/content";

export function ProjectsShowcase({
  projects,
  eyebrow = "Our work",
  title = "Recent projects",
  description,
  emptyHeading,
  emptyMessage,
  emptyLabels,
  ctaHref = "/projects",
  ctaLabel = "View all projects",
  tone = "light",
  id = "our-work",
}: {
  projects: Project[];
  eyebrow?: string;
  title?: string;
  description?: string;
  emptyHeading?: string;
  emptyMessage?: string;
  emptyLabels?: string[];
  ctaHref?: string;
  ctaLabel?: string;
  tone?: "light" | "muted";
  id?: string;
}) {
  return (
    <Section id={id} tone={tone} labelledBy="work-heading">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id="work-heading"
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        {projects.length > 0 ? (
          <ButtonLink
            href={ctaHref}
            variant="outline"
            className="shrink-0 self-start lg:self-auto"
          >
            {ctaLabel}
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </ButtonLink>
        ) : null}
      </div>

      <div className="mt-12">
        <ProjectGrid
          projects={projects}
          emptyHeading={emptyHeading}
          emptyMessage={emptyMessage}
          emptyLabels={emptyLabels}
        />
      </div>
    </Section>
  );
}
