"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { ExpandIcon } from "@/components/ui/Icons";
import { ratioClasses, type MediaRatio } from "./MediaFrame";
import { useLightbox } from "./Lightbox";
import type { ImageAsset } from "@/types/content";

/**
 * A grid of photographs where every tile opens the fullscreen viewer.
 * Used on the service pages and anywhere a set of photos is shown together.
 */
export function PhotoGallery({
  images,
  ratio = "4/3",
  columns = 3,
  className,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: {
  images: ImageAsset[];
  ratio?: MediaRatio;
  columns?: 2 | 3;
  className?: string;
  sizes?: string;
}) {
  const { open, element } = useLightbox(images);

  if (images.length === 0) return null;

  return (
    <>
      <ul
        className={cn(
          "grid gap-6",
          columns === 2
            ? "sm:grid-cols-2"
            : "sm:grid-cols-2 lg:grid-cols-3",
          className,
        )}
      >
        {images.map((image, i) => (
          <li key={image.src} className="reveal">
            <button
              type="button"
              onClick={() => open(i)}
              className="group relative block w-full overflow-hidden ring-1 ring-concrete-300 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
              <span className={cn("relative block", ratioClasses[ratio])}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={sizes}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-iron-950/0 transition-colors duration-200 group-hover:bg-iron-950/30"
                />
                <span
                  aria-hidden
                  className="absolute right-3 bottom-3 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-amber-500 text-iron-950 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  <ExpandIcon className="h-5 w-5" />
                </span>
              </span>
              <span className="sr-only">
                View larger: {image.alt}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {element}
    </>
  );
}
