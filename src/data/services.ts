/**
 * SERVICES — the five service pages are generated from this array.
 *
 * TO ADD A NEW SERVICE: copy any block below, change the `slug`, `name` and
 * copy, and it appears in the nav dropdown, the home page grid, the services
 * index, the sitemap and its own page at /services/<slug>. No other file
 * needs to be touched.
 *
 * Everything here is editable copy, not a fixed claim. Trim any category that
 * the company does not offer, and add ones that are missing.
 */

import type { Service } from "@/types/content";

export const services: Service[] = [
  /* ------------------------------------------------------------- tiling */
  {
    slug: "tiling",
    name: "Tiling",
    icon: "tiling",
    summary:
      "Floor and wall tiling for kitchens, bathrooms, patios and full renovations — set level, cut clean and grouted properly.",
    heroHeadline: "Tiling done straight, level and clean",
    heroSubline:
      "Floor and wall tiling for homes and businesses across Jamaica. Careful setting out, solid preparation and a finish that still looks right years later.",
    overview: [
      "Good tiling is decided before the first tile goes down. We check that the substrate is sound and level, set out the room so cuts fall where they should, and use the right adhesive and trims for the surface we're working on.",
      "We handle everything from a single bathroom to the floors of a whole house — ceramic, porcelain and natural stone, on floors, walls and outdoor surfaces. Where an existing floor needs lifting or a previous job needs putting right, we take care of that too.",
    ],
    categories: [
      {
        title: "Floor tiling",
        description:
          "Living areas, bedrooms, hallways and open-plan spaces, set level with even joints and clean edges.",
      },
      {
        title: "Wall tiling",
        description:
          "Feature walls, splashbacks and full-height wall finishes, set out so the pattern reads properly across the room.",
      },
      {
        title: "Bathroom tiling",
        description:
          "Floors, walls and shower areas, with attention to falls, waterproofing detail and sealed junctions.",
      },
      {
        title: "Kitchen tiling",
        description:
          "Floors and splashbacks cut neatly around counters, sockets and appliances.",
      },
      {
        title: "Outdoor tiling",
        description:
          "Patios, verandahs, steps and pool surrounds using materials suited to sun, rain and foot traffic.",
      },
      {
        title: "Renovation & repair",
        description:
          "Lifting old tiles, replacing cracked or loose sections, re-grouting and re-sealing tired surfaces.",
      },
    ],
    process: [
      {
        title: "Site visit and measure",
        description:
          "We look at the space, check the surface, measure up and talk through materials, layout and finishes.",
      },
      {
        title: "Quote and scope",
        description:
          "You get a written quote setting out the work, the materials and what's included, before anything is committed.",
      },
      {
        title: "Preparation",
        description:
          "Surfaces are cleaned, levelled and made sound. Setting out is marked so cuts and joints land where they should.",
      },
      {
        title: "Tiling and grouting",
        description:
          "Tiles are set, spaced and levelled, then grouted, sealed where needed and finished with the right trims.",
      },
      {
        title: "Clean-up and hand-over",
        description:
          "Tiles are cleaned down, the area is cleared, and we walk the finished work with you before we leave.",
      },
    ],
    images: [
      {
        src: "/media/projects/pool-wide-view.jpg",
        alt: "Pool and attached round spa finished with mosaic tile and travertine coping",
        width: 1600,
        height: 1200,
      },
      {
        src: "/media/projects/bathroom-marble-shower.jpg",
        alt: "Marble-look tiled shower enclosure with frameless sliding glass door",
        width: 1200,
        height: 1600,
      },
      {
        src: "/media/projects/pool-spa-overhead.jpg",
        alt: "Overhead view of a round spa with mosaic tile walls and travertine coping",
        width: 1200,
        height: 1600,
      },
      {
        src: "/media/projects/paving-curved-steps.jpg",
        alt: "Curved entrance steps finished in multi-tone stone-effect tile",
        width: 1600,
        height: 1200,
      },
      {
        src: "/media/projects/pool-steps-tile-detail.jpg",
        alt: "Mosaic tile pool steps with a stainless handrail",
        width: 1600,
        height: 1200,
      },
      {
        src: "/media/projects/pool-kidney-brick.jpg",
        alt: "Kidney-shaped pool with dark mosaic waterline and red brick coping",
        width: 1200,
        height: 1600,
      },
      {
        src: "/media/projects/pool-custom-mosaic-lettering.jpg",
        alt: "Custom mosaic tile lettering set into a poolside concrete deck",
        width: 1200,
        height: 1600,
      },
      {
        src: "/media/projects/bathroom-gray-shower.jpg",
        alt: "Renovated bathroom with a tiled shower enclosure and new vanity",
        width: 899,
        height: 1599,
      },
    ],
    videos: [],
    mediaSlots: [
      { label: "Completed floor tiling", ratio: "4/3" },
      { label: "Bathroom or shower tiling", ratio: "4/3" },
      { label: "Kitchen splashback detail", ratio: "4/3" },
    ],
    seo: {
      title: "Tiling Services in Jamaica",
      description:
        "Floor, wall, bathroom, kitchen and outdoor tiling across Jamaica. Careful preparation, clean cuts and a properly finished job from Needham's Construction.",
    },
  },

  /* ----------------------------------------------------------- plumbing */
  {
    slug: "plumbing",
    name: "Plumbing",
    icon: "plumbing",
    summary:
      "Installation, repairs and fixtures for kitchens, bathrooms and water systems — tested and left working properly.",
    heroHeadline: "Plumbing that's installed right and tested",
    heroSubline:
      "Installations, repairs and fixture work for homes and businesses in Jamaica — pipework run properly, connections tested, and the area left clean.",
    overview: [
      "Plumbing problems are rarely just about the leak you can see. We trace the cause, explain what's actually going on, and fix it properly rather than patching it and leaving you to call again in a month.",
      "On new work we plan the runs before we cut anything, use fittings suited to the pressure and the water supply, and pressure-test before we close anything up.",
    ],
    categories: [
      {
        title: "Plumbing installation",
        description:
          "New pipework and connections for renovations, extensions and new-build work.",
      },
      {
        title: "Repairs",
        description:
          "Leaks, blockages, failing joints, poor pressure and pipework that has been patched one time too many.",
      },
      {
        title: "Fixtures",
        description:
          "Sinks, basins, toilets, showers, taps, water heaters and outdoor fittings supplied and fitted.",
      },
      {
        title: "Bathroom plumbing",
        description:
          "Full bathroom installs and re-fits, including moving fittings when the layout changes.",
      },
      {
        title: "Kitchen plumbing",
        description:
          "Sink and appliance connections, waste runs and supply work for new or refitted kitchens.",
      },
      {
        title: "Water systems",
        description:
          "Tanks, pumps and supply lines — installed, replaced or reworked to give steady pressure.",
      },
    ],
    process: [
      {
        title: "Assess the job",
        description:
          "We look at the system, find the actual cause, and tell you what needs doing and what can wait.",
      },
      {
        title: "Quote and scope",
        description:
          "A written quote covering labour, materials and fixtures, so you know the cost before work starts.",
      },
      {
        title: "Install or repair",
        description:
          "Pipework is run and connected properly, with the area protected while we work.",
      },
      {
        title: "Test",
        description:
          "Connections are pressure-checked and fixtures are run before anything is boxed in or closed up.",
      },
      {
        title: "Clean-up and hand-over",
        description:
          "We clear up, show you what was done and how it works, and confirm you're happy with it.",
      },
    ],
    images: [],
    videos: [],
    mediaSlots: [
      { label: "Bathroom plumbing installation", ratio: "4/3" },
      { label: "Kitchen supply and waste work", ratio: "4/3" },
      { label: "Water tank or pump installation", ratio: "4/3" },
    ],
    seo: {
      title: "Plumbing Services in Jamaica",
      description:
        "Plumbing installation, repairs, fixtures and water systems across Jamaica. Bathroom and kitchen plumbing done properly and tested by Needham's Construction.",
    },
  },

  /* ------------------------------------------------------------ masonry */
  {
    slug: "masonry",
    name: "Masonry",
    icon: "masonry",
    summary:
      "Block work, concrete, walls and foundations — set out square, built plumb and finished to take a proper render.",
    heroHeadline: "Block and concrete work built to last",
    heroSubline:
      "Foundations, block work, walls and concrete for extensions, new builds and repairs across Jamaica.",
    overview: [
      "Masonry is the part of a build everything else depends on. If the foundation and the block work are square, plumb and properly tied, every trade that follows has an easier job and a better finish.",
      "We handle foundations, block walls, columns, slabs, boundary walls and concrete work, along with repairs to existing structures — cracked walls, failing sections and work that needs putting right.",
    ],
    categories: [
      {
        title: "Block work",
        description:
          "Internal and external block walls laid plumb, level and properly bonded.",
      },
      {
        title: "Concrete work",
        description:
          "Slabs, footings, columns, beams and steps, formed and poured to the required finish.",
      },
      {
        title: "Walls",
        description:
          "Boundary walls, retaining walls, partition walls and feature walls.",
      },
      {
        title: "Foundations",
        description:
          "Excavation, footings and foundation work for extensions and new structures.",
      },
      {
        title: "Repairs",
        description:
          "Cracked or damaged walls, failing render, patch work and structural repairs to existing masonry.",
      },
      {
        title: "General masonry",
        description:
          "Plastering and rendering, steps, kerbs, planters and the smaller pieces that finish a property off.",
      },
    ],
    process: [
      {
        title: "Site visit and assessment",
        description:
          "We look at the ground, the existing structure and access, and talk through what you want built.",
      },
      {
        title: "Quote and scope",
        description:
          "A written quote setting out materials, labour and stages, so the cost is clear up front.",
      },
      {
        title: "Set out and prepare",
        description:
          "The work is set out square and to level, with excavation and formwork prepared before anything is poured or laid.",
      },
      {
        title: "Build",
        description:
          "Block, concrete and reinforcement work carried out in sequence, with each stage checked before the next.",
      },
      {
        title: "Finish and clear the site",
        description:
          "Surfaces are finished as agreed, waste is cleared and the site is left tidy.",
      },
    ],
    images: [
      {
        src: "/media/projects/masonry-facade-construction.jpg",
        alt: "Stone-veneer facade partway through installation on a gable-end addition",
        width: 1600,
        height: 1200,
      },
      {
        src: "/media/projects/masonry-column-detail.jpg",
        alt: "Stone-veneer support column finished with clean mitred corners",
        width: 1200,
        height: 1600,
      },
      {
        src: "/media/projects/masonry-facade-detail.jpg",
        alt: "Finished stone-veneer facade with even coursing under the roofline",
        width: 1600,
        height: 1200,
      },
    ],
    videos: [],
    mediaSlots: [
      { label: "Block work in progress", ratio: "4/3" },
      { label: "Foundation or slab work", ratio: "4/3" },
      { label: "Completed wall", ratio: "4/3" },
    ],
    seo: {
      title: "Masonry & Block Work in Jamaica",
      description:
        "Block work, concrete, foundations, walls and masonry repairs across Jamaica. Set out square and built properly by Needham's Construction.",
    },
  },

  /* ------------------------------------------------- general construction */
  {
    slug: "general-construction",
    name: "General Construction",
    shortName: "General Construction",
    icon: "construction",
    summary:
      "Renovations, extensions, additions and repairs — one team coordinating the trades from start to hand-over.",
    heroHeadline: "Renovation and construction, managed end to end",
    heroSubline:
      "Extensions, renovations, additions and repairs across Jamaica, with the trades coordinated so the job moves in the right order.",
    overview: [
      "Larger jobs go wrong when the trades don't line up. Tiling starts before the plumbing is tested, or masonry gets left unfinished after the walls are closed up. We keep the sequence right, so each stage is ready for the next.",
      "Because we cover tiling, plumbing and masonry ourselves, a renovation can run through one point of contact instead of you coordinating separate contractors and chasing each of them.",
      "This page covers the broader work. If what you need isn't listed, ask — it's likely something we handle or can bring in.",
    ],
    categories: [
      {
        title: "Home renovations",
        description:
          "Kitchens, bathrooms, single rooms or a whole property brought up to standard.",
      },
      {
        title: "Extensions and additions",
        description:
          "Adding rooms, verandahs, outbuildings and additional floors to existing structures.",
      },
      {
        title: "Repairs and maintenance",
        description:
          "Roof, wall, floor and structural repairs, plus ongoing maintenance for property owners.",
      },
      {
        title: "Finishing work",
        description:
          "Plastering, rendering, painting, doors, windows and the trim that completes a build.",
      },
      {
        title: "Commercial fit-out",
        description:
          "Shops, offices and small commercial spaces adapted and finished for use.",
      },
      {
        title: "Project coordination",
        description:
          "Scheduling the trades, ordering materials and keeping the work moving in the right order.",
      },
    ],
    process: [
      {
        title: "Consultation",
        description:
          "We visit the property, talk through what you want to achieve and flag anything that will affect cost or sequence.",
      },
      {
        title: "Scope and quote",
        description:
          "A written scope and quote broken into stages, so you can see what happens when and what it costs.",
      },
      {
        title: "Schedule",
        description:
          "Trades and materials are sequenced before work starts, so nothing is waiting on something else.",
      },
      {
        title: "Build",
        description:
          "Work is carried out stage by stage with regular updates, and each stage checked before the next begins.",
      },
      {
        title: "Hand-over",
        description:
          "We complete the snagging, clear the site and walk the finished work with you.",
      },
    ],
    images: [
      {
        src: "/media/projects/pool-construction-shell.jpg",
        alt: "Poured concrete pool structure under construction before finishing",
        width: 1599,
        height: 899,
      },
      {
        src: "/media/projects/pool-tiling-progress.jpg",
        alt: "Mosaic tiling being installed on a pool mid-build",
        width: 1280,
        height: 720,
      },
    ],
    videos: [],
    mediaSlots: [
      { label: "Renovation in progress", ratio: "4/3" },
      { label: "Completed extension or addition", ratio: "4/3" },
      { label: "Finished interior", ratio: "4/3" },
    ],
    seo: {
      title: "General Construction & Renovation in Jamaica",
      description:
        "Renovations, extensions, additions, repairs and finishing work across Jamaica, coordinated end to end by Needham's Construction.",
    },
  },
];

/** Look a service up by its URL slug. */
export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export const serviceSlugs = services.map((service) => service.slug);
