import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import { MapPinIcon, VideoIcon } from "@/components/ui/Icons";
import { SmartImage } from "@/components/media/SmartImage";
import { getService } from "@/data/services";
import type { Project } from "@/types/content";

export function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const service = getService(project.category);
  const cover = project.images[0];
  const videoCount = project.videos.length;

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden bg-white ring-1 ring-concrete-300 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg",
        className,
      )}
    >
      <div className="relative">
        <SmartImage
          image={cover}
          fallbackLabel={project.title}
          ratio="4/3"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        {videoCount > 0 ? (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 bg-iron-950/85 px-2.5 py-1 text-[0.68rem] font-semibold tracking-[0.12em] text-concrete-100 uppercase backdrop-blur-sm">
            <VideoIcon className="h-3.5 w-3.5" />
            {videoCount} video{videoCount > 1 ? "s" : ""}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.7rem] font-semibold tracking-[0.14em] text-amber-700 uppercase">
          <span>{service?.name ?? project.category}</span>
          {project.date ? (
            <span className="text-concrete-600">{formatDate(project.date)}</span>
          ) : null}
        </div>

        <h3 className="mt-3 text-xl leading-snug font-bold text-iron-900">
          {project.title}
        </h3>

        {project.location ? (
          <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-iron-500">
            <MapPinIcon className="h-4 w-4 shrink-0" />
            {project.location}
          </p>
        ) : null}

        <p className="mt-3 text-sm leading-relaxed text-iron-600">
          {project.description}
        </p>

        {project.beforeAfter && project.beforeAfter.length > 0 ? (
          <p className="mt-4 inline-flex w-fit items-center gap-2 bg-concrete-100 px-2.5 py-1 text-[0.68rem] font-semibold tracking-[0.12em] text-iron-600 uppercase">
            Before &amp; after
          </p>
        ) : null}
      </div>
    </article>
  );
}
