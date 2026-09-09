"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { PlayIcon, ArrowRightIcon } from "@/components/ui/Icons";
import type { VideoAsset } from "@/types/content";
import { MediaFrame, ratioClasses, type MediaRatio } from "./MediaFrame";

/** Accepts a bare YouTube id or any common YouTube URL. */
function youTubeId(src: string): string {
  const trimmed = src.trim();
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;
  const match = trimmed.match(
    /(?:youtu\.be\/|v=|\/embed\/|\/shorts\/)([\w-]{11})/,
  );
  return match?.[1] ?? trimmed;
}

/**
 * A single video.
 *
 * Nothing heavy loads on page view: file videos use `preload="none"`, and
 * YouTube renders a lightweight poster that only swaps in the iframe once
 * the visitor presses play. TikTok, Instagram and Facebook posts render as
 * a card that opens the original post — no third-party scripts are loaded.
 */
export function VideoCard({
  video,
  ratio = "16/9",
  tone = "light",
  className,
}: {
  video: VideoAsset;
  ratio?: MediaRatio;
  tone?: "light" | "dark";
  className?: string;
}) {
  const [active, setActive] = useState(false);
  const dark = tone === "dark";

  const poster = video.poster?.src ? (
    <Image
      src={video.poster.src}
      alt={video.poster.alt}
      fill
      sizes="(min-width: 1024px) 50vw, 100vw"
      className="object-cover"
    />
  ) : (
    <MediaFrame
      label={video.title}
      kind="video"
      ratio={ratio}
      tone={tone}
      note="Press play to watch"
      className="absolute inset-0 h-full w-full"
    />
  );

  const frame = cn(
    "group relative block w-full overflow-hidden",
    ratioClasses[ratio],
    dark ? "bg-iron-850" : "bg-concrete-100",
  );

  /* -------------------------------------------------- self-hosted file */
  if (video.provider === "file") {
    return (
      <figure className={className}>
        <div className={cn(frame, "flex")}>
          <video
            controls
            preload="none"
            playsInline
            poster={video.poster?.src}
            className="h-full w-full object-cover"
          >
            <source src={video.src} />
            Your browser does not support embedded video.{" "}
            <a href={video.src}>Download the video</a> instead.
          </video>
        </div>
        <VideoCaption video={video} tone={tone} />
      </figure>
    );
  }

  /* -------------------------------------------------------- youtube */
  if (video.provider === "youtube") {
    const id = youTubeId(video.src);
    return (
      <figure className={className}>
        <div className={frame}>
          {active ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 h-full w-full border-0"
            />
          ) : (
            <button
              type="button"
              onClick={() => setActive(true)}
              className="absolute inset-0 h-full w-full cursor-pointer"
            >
              <span className="sr-only">Play video: {video.title}</span>
              {poster}
              <PlayBadge />
            </button>
          )}
        </div>
        <VideoCaption video={video} tone={tone} />
      </figure>
    );
  }

  /* ------------------------------- tiktok / instagram / facebook link */
  const platformLabel =
    video.provider === "tiktok"
      ? "TikTok"
      : video.provider === "instagram"
        ? "Instagram"
        : "Facebook";

  return (
    <figure className={className}>
      <a
        href={video.src}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(frame, "focus-visible:outline-none")}
      >
        {poster}
        <PlayBadge />
        <span
          className={cn(
            "absolute top-3 left-3 rounded-sm px-2.5 py-1 text-[0.68rem] font-semibold tracking-[0.14em] uppercase",
            "bg-iron-950/80 text-concrete-100 backdrop-blur-sm",
          )}
        >
          {platformLabel}
        </span>
        <span className="sr-only">
          Watch “{video.title}” on {platformLabel} (opens in a new tab)
        </span>
      </a>
      <VideoCaption video={video} tone={tone}>
        <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700">
          Watch on {platformLabel}
          <ArrowRightIcon className="h-4 w-4" />
        </span>
      </VideoCaption>
    </figure>
  );
}

function PlayBadge() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500 text-iron-950 shadow-lg transition-transform duration-200 group-hover:scale-105">
        <PlayIcon className="ml-0.5 h-6 w-6" />
      </span>
    </span>
  );
}

function VideoCaption({
  video,
  tone,
  children,
}: {
  video: VideoAsset;
  tone: "light" | "dark";
  children?: React.ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <figcaption className="mt-4">
      <p
        className={cn(
          "font-display font-semibold",
          dark ? "text-white" : "text-iron-900",
        )}
      >
        {video.title}
        {video.duration ? (
          <span className={cn("ml-2 text-sm font-normal", dark ? "text-concrete-400" : "text-iron-500")}>
            {video.duration}
          </span>
        ) : null}
      </p>
      {video.description ? (
        <p
          className={cn(
            "mt-1 text-sm leading-relaxed",
            dark ? "text-concrete-400" : "text-iron-600",
          )}
        >
          {video.description}
        </p>
      ) : null}
      {children}
    </figcaption>
  );
}
