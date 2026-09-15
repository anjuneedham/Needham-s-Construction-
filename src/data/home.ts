/**
 * HOME PAGE MEDIA — the hero and the "See Our Work" video row.
 *
 * Everything here is null/empty in Version 1, so the page shows designed
 * placeholder frames. Fill any of these in and the placeholder is replaced —
 * no layout or component changes needed.
 */

import type { ImageAsset, VideoAsset } from "@/types/content";

/**
 * A single hero photograph. Ignored if `heroVideo` is set.
 * Example:
 *   { src: "/media/company/hero.jpg",
 *     alt: "Newly tiled open-plan living area completed by Needham's Construction",
 *     width: 1600, height: 1200 }
 */
export const heroImage: ImageAsset | null = {
  src: "/media/projects/pool-luxury-estate.jpg",
  alt: "Completed pool and round spa with mosaic tile detailing, built by Needham's Construction",
  width: 1600,
  height: 1200,
};

/**
 * A hero video. Takes priority over `heroImage`.
 * Example:
 *   { provider: "youtube", src: "VIDEO_ID", title: "Needham's Construction" }
 *   { provider: "file", src: "/media/company/intro.mp4", title: "Who we are" }
 */
export const heroVideo: VideoAsset | null = null;

/** Photograph for the About section on the home page and the About page. */
export const aboutImage: ImageAsset | null = {
  src: "/media/projects/masonry-facade-detail.jpg",
  alt: "Stone-veneer facade with even coursing and clean joints, installed by Needham's Construction",
  width: 1600,
  height: 1200,
};

/**
 * Videos for the "See Our Work" section. Add up to three for a tidy row.
 * Example:
 *   { provider: "youtube", src: "VIDEO_ID", title: "Bathroom re-tile walkthrough",
 *     description: "Kingston · March 2026", duration: "2:14" }
 */
export const homeVideos: VideoAsset[] = [
  {
    provider: "tiktok",
    src: "https://vt.tiktok.com/ZSq4neW3m/",
    title: "Needham's Construction on TikTok",
  },
  {
    provider: "file",
    src: "/media/projects/bathroom-marble-walkthrough.mp4",
    title: "Marble bathroom walkthrough",
    duration: "0:14",
    poster: {
      src: "/media/projects/bathroom-marble-walkthrough-poster.jpg",
      alt: "Finished marble-tile shower with glass enclosure under a vaulted wood ceiling",
      width: 478,
      height: 850,
    },
  },
  {
    provider: "file",
    src: "/media/projects/bathroom-mosaic-walkthrough.mp4",
    title: "Mosaic tile bathroom walkthrough",
    duration: "0:46",
    poster: {
      src: "/media/projects/bathroom-mosaic-walkthrough-poster.jpg",
      alt: "Finished mosaic-tile shower and vanity with matte black fixtures",
      width: 576,
      height: 1024,
    },
  },
];
