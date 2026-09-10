/**
 * COMPANY PROFILE — edit this file to change company copy site-wide.
 *
 * Fields left blank are deliberately blank: nothing here is invented.
 * Fill them in as the information becomes available and the site will
 * start using them automatically (including the structured data that
 * Google reads for local search).
 */

import type { CompanyStat } from "@/types/content";

export const company = {
  name: "Needham's Construction",
  /** Registered/legal name, if it differs from the trading name. */
  legalName: "Needham's Construction",
  shortName: "Needham's",

  tagline: "Quality Construction. Reliable Workmanship.",

  /** One-sentence description used in the footer, meta tags and social profiles. */
  positioning:
    "Professional construction and home-improvement services across Jamaica — tiling, plumbing, masonry and general construction.",

  /** Short description for the footer and cards. */
  blurb:
    "A Jamaican construction and home-services company handling tiling, plumbing, masonry and general construction work.",

  /** About page / home about section. One string per paragraph. */
  about: [
    "Needham's Construction is a Jamaican construction and home-services company. We take on tiling, plumbing, masonry and general construction work for homeowners, businesses and property owners across the island.",
    "Our approach is straightforward. We look at the job properly before we quote, explain clearly what the work involves, and agree the scope before anything starts. On site we work carefully, keep the area clean, and finish what we start.",
    "Whether it's a single bathroom re-tile, new plumbing for a kitchen, block work on an extension, or a full renovation managed end to end, the standard is the same: solid preparation, careful workmanship, and a finish we're happy to put our name on.",
  ],

  /**
   * What the company stands for. These describe how we work — they are not
   * claims about awards, certifications or history.
   */
  values: [
    {
      title: "Quality Workmanship",
      description:
        "Proper preparation, the right materials for the job, and a finish that holds up. We would rather take the time to do it once and do it right.",
    },
    {
      title: "Reliable Service",
      description:
        "We turn up when we say we will, keep you updated as the work moves, and tell you straight away if anything changes.",
    },
    {
      title: "Professional Approach",
      description:
        "Clear scope, clear pricing and clear communication from the first conversation through to hand-over. No surprises at the end of a job.",
    },
    {
      title: "Attention to Detail",
      description:
        "Level lines, clean joints, tidy finishes and a site left clean at the end of the day. The details are what separate a good job from an average one.",
    },
  ],

  /**
   * OPTIONAL — leave empty until you have real, verifiable numbers.
   * Example once you do: [{ value: "120+", label: "Projects completed" }]
   */
  stats: [] as CompanyStat[],

  /** OPTIONAL — e.g. "2015". Leave blank if you'd rather not publish it. */
  foundedYear: "",

  /** OPTIONAL — company/business registration number. */
  registrationNumber: "",

  /** OPTIONAL — e.g. ["Insured", "NCTVET certified"]. Only add what you hold. */
  certifications: [] as string[],

  /** OPTIONAL — path to a logo file you drop into /public, e.g. "/media/company/logo.svg". */
  logo: "",
};

export type Company = typeof company;
