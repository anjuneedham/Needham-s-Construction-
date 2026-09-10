"use client";

import Image from "next/image";

import { cn, formatDate } from "@/lib/utils";
import { ExpandIcon, MapPinIcon, VideoIcon } from "@/components/ui/Icons";
import { MediaFrame, ratioClasses } from "@/components/media/MediaFrame";
import { useLightbox } from "@/components/media/Lightbox";
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
  const photoCount = project.images.length;
  const { open, element } = useLightbox(project.images);

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden bg-white ring-1 ring-concrete-300 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg",
        className,
      )}
    >
      <div className="relative">
        {cover ? (
          <button
            type="button"
            onClick={() => open(0)}
            className="relative block w-full overflow-hidden"
          >
            <span className={cn("relative block", ratioClasses["4/3"])}>
              <Image
                src={cover.src}
                alt={cover.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-iron-950/0 transition-colors duration-200 group-hover:bg-iron-950/25"
              />
              <span
                aria-hidden
                className="absolute right-3 bottom-3 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-amber-500 text-iron-950 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
              >
                <ExpandIcon className="h-5 w-5" />
              </span>
            </span>
            <span className="sr-only">
              View photos from {project.title}
            </span>
          </button>
        ) : (
          <MediaFrame label={project.title} ratio="4/3" />
        )}

        <div className="pointer-events-none absolute top-3 right-3 flex flex-col items-end gap-1.5">
          {photoCount > 1 ? (
            <span className="inline-flex items-center gap-1.5 bg-iron-950/85 px-2.5 py-1 text-[0.68rem] font-semibold tracking-[0.12em] text-concrete-100 uppercase backdrop-blur-sm">
              {photoCount} photos
            </span>
          ) : null}
          {videoCount > 0 ? (
            <span className="inline-flex items-center gap-1.5 bg-iron-950/85 px-2.5 py-1 text-[0.68rem] font-semibold tracking-[0.12em] text-concrete-100 uppercase backdrop-blur-sm">
              <VideoIcon className="h-3.5 w-3.5" />
              {videoCount} video{videoCount > 1 ? "s" : ""}
            </span>
          ) : null}
        </div>
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

        <p className="mt-3 flex-1 text-sm leading-relaxed text-iron-600">
          {project.description}
        </p>

        {photoCount > 0 ? (
          <button
            type="button"
            onClick={() => open(0)}
            className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-iron-900 transition-colors hover:text-amber-700"
          >
            <ExpandIcon className="h-4 w-4" />
            View {photoCount > 1 ? `all ${photoCount} photos` : "photo"}
          </button>
        ) : null}

        {project.beforeAfter && project.beforeAfter.length > 0 ? (
          <p className="mt-4 inline-flex w-fit items-center gap-2 bg-concrete-100 px-2.5 py-1 text-[0.68rem] font-semibold tracking-[0.12em] text-iron-600 uppercase">
            Before &amp; after
          </p>
        ) : null}
      </div>

      {element}
    </article>
  );
}
