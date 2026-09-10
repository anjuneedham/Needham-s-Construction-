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
    slug: "pool-spa-mosaic-surround",
    title: "Round spa and pool with mosaic surround",
    category: "tiling",
    location: "Jamaica",
    description:
      "A round spa pool and adjoining main pool finished with blue-and-white mosaic tile borders, travertine coping and a poured concrete deck.",
    images: [
      {
        src: "/media/projects/pool-spa-overhead.jpg",
        alt: "Overhead view of a round spa pool with mosaic tile walls and travertine coping",
        width: 1200,
        height: 1600,
      },
      {
        src: "/media/projects/pool-wide-view.jpg",
        alt: "Wide view of a pool with an attached round spa, both finished with mosaic tile",
        width: 1600,
        height: 1200,
      },
    ],
    videos: [],
    beforeAfter: [],
    date: "2025-12-15",
    featured: true,
  },
  {
    slug: "pool-luxury-estate-combo",
    title: "Estate pool and spa with custom mosaic inlay",
    category: "tiling",
    location: "Jamaica",
    description:
      "A pool and matching round spa finished together, with mosaic tile detailing including a custom mosaic fish inlay set into the pool floor.",
    images: [
      {
        src: "/media/projects/pool-luxury-estate.jpg",
        alt: "Estate pool and round spa with a custom mosaic fish inlay in the pool floor",
        width: 1600,
        height: 1200,
      },
    ],
    videos: [],
    beforeAfter: [],
    date: "2025-11-28",
    featured: true,
  },
  {
    slug: "pool-construction-and-tiling-process",
    title: "Pool build: shell to finished mosaic tiling",
    category: "tiling",
    location: "Jamaica",
    description:
      "Behind the scenes of a pool build — from the poured concrete shell, through mosaic tiling of the walls and steps, to a custom mosaic lettering detail set into the deck.",
    images: [
      {
        src: "/media/projects/pool-construction-shell.jpg",
        alt: "Bare poured-concrete pool shell before tiling begins",
        width: 1599,
        height: 899,
      },
      {
        src: "/media/projects/pool-tiling-progress.jpg",
        alt: "Blue mosaic tiling being applied to pool walls and steps mid-installation",
        width: 1280,
        height: 720,
      },
      {
        src: "/media/projects/pool-steps-tile-detail.jpg",
        alt: "Finished mosaic tile steps and handrail on a pool under construction",
        width: 1600,
        height: 1200,
      },
      {
        src: "/media/projects/pool-custom-mosaic-lettering.jpg",
        alt: "Custom mosaic tile lettering set into a poolside concrete deck",
        width: 1200,
        height: 1600,
      },
    ],
    videos: [],
    beforeAfter: [],
    date: "2025-11-05",
    featured: true,
  },
  {
    slug: "pool-kidney-red-coping",
    title: "Kidney-shaped pool with brick coping",
    category: "tiling",
    location: "Jamaica",
    description:
      "A kidney-shaped pool finished with a dark mosaic waterline and red brick coping to match the home's roof tiles.",
    images: [
      {
        src: "/media/projects/pool-kidney-brick.jpg",
        alt: "Kidney-shaped pool with dark mosaic tile waterline and red brick coping",
        width: 1200,
        height: 1600,
      },
    ],
    videos: [],
    beforeAfter: [],
    date: "2025-10-22",
    featured: false,
  },
  {
    slug: "pool-modern-rectangular",
    title: "Modern rectangular pool",
    category: "tiling",
    location: "Jamaica",
    description:
      "A clean-edged rectangular pool with a light stone deck and dark mosaic tile lining, finished with built-in entry steps.",
    images: [
      {
        src: "/media/projects/pool-modern-rectangular.jpg",
        alt: "Rectangular pool with dark mosaic tile lining and a light stone deck",
        width: 1200,
        height: 1600,
      },
    ],
    videos: [],
    beforeAfter: [],
    date: "2025-10-10",
    featured: false,
  },
  {
    slug: "pool-mountain-view-white",
    title: "Pool with mountain-view surround",
    category: "tiling",
    location: "Jamaica",
    description:
      "A pool finished with a light mosaic waterline and a paved stone deck, set against a mountain-view backdrop.",
    images: [
      {
        src: "/media/projects/pool-mountain-view.jpg",
        alt: "Pool with light mosaic tile waterline and a paved deck, mountains in the background",
        width: 1600,
        height: 1200,
      },
    ],
    videos: [],
    beforeAfter: [],
    date: "2025-09-18",
    featured: false,
  },
  {
    slug: "decorative-stone-steps",
    title: "Curved entrance steps in stone-effect tile",
    category: "tiling",
    location: "Jamaica",
    description:
      "Curved entrance steps finished in a multi-tone stone-effect tile, each course set to follow the radius cleanly with tight, even joints.",
    images: [
      {
        src: "/media/projects/paving-curved-steps.jpg",
        alt: "Curved entrance steps finished with multi-tone stone-effect tile",
        width: 1600,
        height: 1200,
      },
    ],
    videos: [],
    beforeAfter: [],
    date: "2025-09-05",
    featured: false,
  },
  {
    slug: "masonry-stone-veneer-facade",
    title: "Stone-veneer facade and support columns",
    category: "masonry",
    location: "Jamaica",
    description:
      "A stone-veneer facade and matching support columns installed on a gable-end addition, tied into the existing roofline.",
    images: [
      {
        src: "/media/projects/masonry-facade-construction.jpg",
        alt: "Stone-veneer facade partway through installation on a gable-end addition",
        width: 1600,
        height: 1200,
      },
      {
        src: "/media/projects/masonry-facade-detail.jpg",
        alt: "Close-up of finished stone-veneer facade tiling under the roofline",
        width: 1600,
        height: 1200,
      },
      {
        src: "/media/projects/masonry-column-detail.jpg",
        alt: "Stone-veneer support column finished with clean mitred corners",
        width: 1200,
        height: 1600,
      },
    ],
    videos: [],
    beforeAfter: [],
    date: "2025-08-20",
    featured: true,
  },
  {
    slug: "bathroom-marble-shower-enclosure",
    title: "Marble-tile shower enclosure",
    category: "tiling",
    location: "Jamaica",
    description:
      "A marble-look tiled shower enclosure with a frameless sliding glass door and matte black fittings.",
    images: [
      {
        src: "/media/projects/bathroom-marble-shower.jpg",
        alt: "Marble-look tiled shower enclosure with frameless sliding glass door and black fittings",
        width: 1200,
        height: 1600,
      },
    ],
    videos: [],
    beforeAfter: [],
    date: "2025-08-08",
    featured: false,
  },
  {
    slug: "bathroom-gray-tile-renovation",
    title: "Bathroom renovation with tiled shower",
    category: "tiling",
    location: "Jamaica",
    description:
      "A compact bathroom renovation with a tiled shower enclosure, new vanity, toilet and fittings.",
    images: [
      {
        src: "/media/projects/bathroom-gray-shower.jpg",
        alt: "Renovated bathroom with tiled shower enclosure, new vanity and toilet",
        width: 899,
        height: 1599,
      },
    ],
    videos: [],
    beforeAfter: [],
    date: "2025-07-25",
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
