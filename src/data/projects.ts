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

export const projects: Project[] = [
  {
    slug: "pool-surround-tiling",
    title: "Pool surround tiling and coping",
    category: "tiling",
    location: "Kingston area",
    description:
      "Complete pool surrounds with blue mosaic tile borders, concrete paving, and decorative tiled coping. Careful level-setting and grout finishing for water safety.",
    images: [
      {
        src: "/media/projects/pool-1-after.jpg",
        alt: "Completed pool with blue mosaic tile border and light concrete surround",
        width: 1200,
        height: 900,
      },
      {
        src: "/media/projects/pool-2-spa.jpg",
        alt: "Luxury spa pool with curved tiling and white marble coping",
        width: 1200,
        height: 900,
      },
      {
        src: "/media/projects/pool-3-steps.jpg",
        alt: "Pool steps with geometric blue tile pattern and slip-resistant finish",
        width: 1200,
        height: 900,
      },
    ],
    videos: [],
    beforeAfter: [],
    date: "2025-12-15",
    featured: true,
  },
  {
    slug: "bathroom-shower-enclosure",
    title: "Bathroom renovation with marble tiling",
    category: "tiling",
    location: "Kingston",
    description:
      "Full bathroom renovation including marble wall tiling, new shower enclosure with glass partition, level floor tiling, and modern fixtures.",
    images: [
      {
        src: "/media/projects/bathroom-marble-shower.jpg",
        alt: "Modern bathroom with marble-look wall tiles and frameless glass shower enclosure",
        width: 1200,
        height: 1000,
      },
      {
        src: "/media/projects/bathroom-floor.jpg",
        alt: "Light-colored tile flooring with even grout lines and proper fall for drainage",
        width: 1200,
        height: 900,
      },
    ],
    videos: [],
    beforeAfter: [],
    date: "2025-11-20",
    featured: true,
  },
  {
    slug: "decorative-paving",
    title: "Decorative slate and stone paving",
    category: "tiling",
    location: "St. Andrew",
    description:
      "Multi-level patio with natural slate paving, geometric stone inlays, and curved steps. Each stone set level with tight, clean joints.",
    images: [
      {
        src: "/media/projects/paving-stairs.jpg",
        alt: "Multi-colored slate paving in geometric pattern with curved corner steps",
        width: 1200,
        height: 900,
      },
    ],
    videos: [],
    beforeAfter: [],
    date: "2025-10-18",
    featured: false,
  },
  {
    slug: "masonry-brick-facade",
    title: "Brick masonry facade and renovation",
    category: "masonry",
    location: "Kingston",
    description:
      "Complete brick facade with stacked-bond pattern, proper mortar joints, and professionally finished edges. Designed for durability and clean lines.",
    images: [
      {
        src: "/media/projects/masonry-facade.jpg",
        alt: "Modern brick facade with horizontal coursing and clean mortar lines",
        width: 1200,
        height: 900,
      },
      {
        src: "/media/projects/masonry-detail.jpg",
        alt: "Detailed view of brick bond pattern and mortar finish",
        width: 1200,
        height: 900,
      },
    ],
    videos: [],
    beforeAfter: [],
    date: "2025-09-10",
    featured: false,
  },
  {
    slug: "construction-expansion",
    title: "Home expansion with masonry and electrical",
    category: "general-construction",
    location: "St. Catherine",
    description:
      "Major home expansion including new brick rooms, structural support columns, concrete foundation, rough electrical work, and preparation for finishes.",
    images: [
      {
        src: "/media/projects/construction-frame.jpg",
        alt: "Brick-built room addition with concrete pillar supports and roof framing",
        width: 1200,
        height: 900,
      },
      {
        src: "/media/projects/construction-columns.jpg",
        alt: "Detailed view of concrete columns and brick masonry supporting structure",
        width: 1200,
        height: 900,
      },
    ],
    videos: [],
    beforeAfter: [],
    date: "2025-08-05",
    featured: false,
  },
];

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
