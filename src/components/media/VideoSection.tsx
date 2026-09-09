import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import type { VideoAsset } from "@/types/content";
import { MediaFrame } from "./MediaFrame";
import { VideoCard } from "./VideoCard";

/**
 * A block of video content with a designed empty state.
 *
 * Pass videos in and it renders them; leave the array empty and it shows a
 * placeholder frame instead of disappearing, so the page reads as finished
 * either way.
 */
export function VideoSection({
  id,
  eyebrow,
  title,
  description,
  videos,
  emptyLabel,
  emptyMessage,
  tone = "dark",
  ctaHref,
  ctaLabel,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  videos: VideoAsset[];
  emptyLabel: string;
  emptyMessage?: string;
  tone?: "light" | "dark";
  ctaHref?: string;
  ctaLabel?: string;
}) {
  const dark = tone === "dark";
  const headingId = id ? `${id}-heading` : undefined;

  return (
    <Section id={id} tone={dark ? "dark" : "muted"} labelledBy={headingId}>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id={headingId}
          eyebrow={eyebrow}
          title={title}
          description={description}
          tone={dark ? "dark" : "light"}
        />
        {ctaHref && ctaLabel ? (
          <ButtonLink
            href={ctaHref}
            variant={dark ? "onDark" : "outline"}
            className="shrink-0 self-start lg:self-auto"
          >
            {ctaLabel}
          </ButtonLink>
        ) : null}
      </div>

      <div className="mt-12">
        {videos.length > 0 ? (
          <div
            className={cn(
              "grid gap-8",
              videos.length === 1
                ? "mx-auto max-w-4xl"
                : "sm:grid-cols-2 lg:grid-cols-3",
            )}
          >
            {videos.map((video) => (
              <VideoCard
                key={`${video.provider}-${video.src}`}
                video={video}
                tone={dark ? "dark" : "light"}
                ratio={videos.length === 1 ? "16/9" : "16/9"}
              />
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-4xl">
            <MediaFrame
              label={emptyLabel}
              kind="video"
              ratio="16/9"
              tone={dark ? "dark" : "light"}
            />
            {emptyMessage ? (
              <p
                className={cn(
                  "mt-5 text-center text-sm leading-relaxed sm:text-base",
                  dark ? "text-concrete-400" : "text-iron-600",
                )}
              >
                {emptyMessage}
              </p>
            ) : null}
          </div>
        )}
      </div>
    </Section>
  );
}

export type { VideoAsset };
