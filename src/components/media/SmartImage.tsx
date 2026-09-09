import Image from "next/image";

import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types/content";
import { MediaFrame, ratioClasses, type MediaRatio } from "./MediaFrame";

/**
 * Renders a real photograph when one exists, and the designed placeholder
 * frame when it does not. Every page uses this, so adding photography is
 * purely a data change.
 */
export function SmartImage({
  image,
  fallbackLabel,
  ratio = "4/3",
  tone = "light",
  className,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  priority,
}: {
  image?: ImageAsset | null;
  /** Shown inside the placeholder when `image` is missing. */
  fallbackLabel: string;
  ratio?: MediaRatio;
  tone?: "light" | "dark";
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (!image?.src) {
    return (
      <MediaFrame
        label={fallbackLabel}
        ratio={ratio}
        tone={tone}
        className={className}
      />
    );
  }

  return (
    <figure className={cn("relative overflow-hidden", className)}>
      <div className={cn("relative", ratioClasses[ratio])}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
      {image.caption ? (
        <figcaption className="mt-2 text-sm text-iron-500">
          {image.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
