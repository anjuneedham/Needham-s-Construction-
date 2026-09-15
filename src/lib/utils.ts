import type { VideoAsset } from "@/types/content";

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * True when any video in the list has a poster taller than it is wide — i.e.
 * phone footage shot in portrait. Used to pick a display ratio that doesn't
 * crop the video down to a thin horizontal sliver inside a 16:9 box.
 *
 * Checks the whole list, not just the first entry: a link-out card (TikTok,
 * Instagram, Facebook) has no poster dimensions of its own, so if it happens
 * to lead the array it must not silently mask a real portrait video sitting
 * right behind it.
 */
export function isPortraitVideo(videos: VideoAsset[]): boolean {
  return videos.some((video) => {
    const poster = video.poster;
    return Boolean(poster?.width && poster?.height && poster.height > poster.width);
  });
}

/** "2026-04-18" → "18 April 2026". Returns the raw value if it isn't a date. */
export function formatDate(value?: string): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/** "a" or "an", chosen by the first sound of the word. */
export function article(word: string): string {
  return /^[aeiou]/i.test(word.trim()) ? "an" : "a";
}
