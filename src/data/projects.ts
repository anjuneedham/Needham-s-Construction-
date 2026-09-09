/**
 * PROJECTS — the portfolio.
 *
 * This ships empty on purpose: no stock photos, no invented jobs. The home
 * page and every service page already have the gallery components wired up,
 * and they show a designed empty state until real work is added here.
 *
 * TO ADD A PROJECT: uncomment the example, drop the photos into
 * /public/media/projects/ and fill in the fields. It will appear on the
 * projects page immediately, on the matching service page, and — if
 * `featured: true` — on the home page.
 *
 * Example:
 *
 *   {
 *     slug: "kingston-bathroom-retile",
 *     title: "Bathroom re-tile and re-fit",
 *     category: "tiling",                     // must match a service slug
 *     location: "Kingston",
 *     description:
 *       "Full strip-out and re-tile of a main bathroom, including new floor
 *        levelling, wall tiling to full height and re-set fixtures.",
 *     images: [
 *       {
 *         src: "/media/projects/kingston-bathroom-01.jpg",
 *         alt: "Fully tiled bathroom with large-format wall tiles and a walk-in shower",
 *         width: 1600,
 *         height: 1200,
 *       },
 *     ],
 *     videos: [
 *       {
 *         provider: "youtube",
 *         src: "dQw4w9WgXcQ",                 // the video id, or a full URL
 *         title: "Bathroom re-tile walkthrough",
 *       },
 *     ],
 *     beforeAfter: [
 *       {
 *         label: "Main bathroom",
 *         before: { src: "/media/projects/kb-before.jpg", alt: "Bathroom before work began" },
 *         after:  { src: "/media/projects/kb-after.jpg",  alt: "The same bathroom after re-tiling" },
 *       },
 *     ],
 *     date: "2026-04-18",
 *     featured: true,
 *   }
 */

import type { Project } from "@/types/content";

export const projects: Project[] = [];

/** Projects shown on the home page, newest first. */
export function getFeaturedProjects(limit = 3): Project[] {
  return sortByNewest(projects.filter((project) => project.featured)).slice(
    0,
    limit,
  );
}

/** Projects belonging to one service, newest first. */
export function getProjectsByCategory(category: string, limit?: number): Project[] {
  const matches = sortByNewest(
    projects.filter((project) => project.category === category),
  );
  return typeof limit === "number" ? matches.slice(0, limit) : matches;
}

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function sortByNewest(list: Project[]): Project[] {
  return [...list].sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

export const allProjects = sortByNewest(projects);
