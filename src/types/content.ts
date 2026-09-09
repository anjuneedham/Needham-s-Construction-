/**
 * Content model for the Needham's Construction website.
 *
 * Everything the site renders is described by these types and supplied from
 * `src/data/*`. Adding a service, project, photo, video or testimonial is a
 * data change — no component or page needs to be rewritten.
 *
 * When a CMS or database (Supabase, Sanity, Contentful…) is connected later,
 * map its records onto these same shapes and the UI keeps working unchanged.
 */

/* ------------------------------------------------------------------ media */

export interface ImageAsset {
  /** Path under /public (e.g. "/media/projects/kitchen-01.jpg") or an absolute URL. */
  src: string;
  /** Required. Describe the photo for screen readers and search engines. */
  alt: string;
  width?: number;
  height?: number;
  /** Optional short line shown under the image. */
  caption?: string;
}

export type VideoProvider = "file" | "youtube" | "tiktok" | "instagram" | "facebook";

export interface VideoAsset {
  provider: VideoProvider;
  /**
   * - `file`      → path under /public, e.g. "/media/projects/walkthrough.mp4"
   * - `youtube`   → the 11-character video id, or a full YouTube URL
   * - `tiktok` / `instagram` / `facebook` → the public post permalink
   */
  src: string;
  title: string;
  description?: string;
  /** Thumbnail. Omit and a designed placeholder frame is shown instead. */
  poster?: ImageAsset;
  /** Optional duration label, e.g. "2:14". */
  duration?: string;
}

export interface BeforeAfterPair {
  label?: string;
  before: ImageAsset;
  after: ImageAsset;
}

/** Describes a media area that has no real asset yet. */
export interface MediaSlot {
  /** Short label shown inside the placeholder, e.g. "Bathroom tiling". */
  label: string;
  /** Aspect ratio of the reserved area. */
  ratio?: "16/9" | "4/3" | "3/2" | "1/1" | "3/4";
  kind?: "image" | "video";
}

/* --------------------------------------------------------------- services */

export interface ServiceCategory {
  title: string;
  description: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export type ServiceIcon =
  | "tiling"
  | "plumbing"
  | "masonry"
  | "electrical"
  | "construction";

export interface Service {
  /** URL segment: /services/<slug> */
  slug: string;
  name: string;
  /** Used in tight spaces such as the nav dropdown. */
  shortName?: string;
  icon: ServiceIcon;
  /** One line for cards and the services grid. */
  summary: string;
  /** Hero headline on the service page. */
  heroHeadline: string;
  /** Hero supporting paragraph on the service page. */
  heroSubline: string;
  /** "What we do" body copy — one paragraph per array entry. */
  overview: string[];
  /** The kinds of work offered. Edit freely; nothing here is fixed. */
  categories: ServiceCategory[];
  /** How a job runs from first call to hand-over. */
  process: ProcessStep[];
  /** Optional extra panel, e.g. safety notes on the electrical page. */
  notes?: {
    title: string;
    intro?: string;
    points: string[];
  };
  /** Real photography for this service. Empty = designed placeholders. */
  images: ImageAsset[];
  /** Service-specific video. Empty = designed placeholder. */
  videos: VideoAsset[];
  /** Labels for the placeholder frames shown until real media arrives. */
  mediaSlots: MediaSlot[];
  seo: {
    title: string;
    description: string;
  };
}

/* --------------------------------------------------------------- projects */

export interface Project {
  slug: string;
  title: string;
  /** Should match a Service `slug` so the project shows on that service page. */
  category: string;
  /** e.g. "Kingston" or "St. Andrew". */
  location: string;
  description: string;
  images: ImageAsset[];
  videos: VideoAsset[];
  beforeAfter?: BeforeAfterPair[];
  /** ISO date, e.g. "2026-03-14". Used for ordering and display. */
  date?: string;
  /** Featured projects appear on the home page. */
  featured?: boolean;
}

/* ----------------------------------------------------------- testimonials */

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location?: string;
  /** Service slug this relates to. */
  service?: string;
  date?: string;
  /** Where the review came from, e.g. "Google", "Facebook". */
  source?: string;
}

/* ---------------------------------------------------------------- company */

export interface BusinessHours {
  /** "Monday", "Saturday", … */
  day: string;
  /** 24-hour "HH:MM". Leave both blank and the day reads as Closed. */
  opens: string;
  closes: string;
}

export interface CompanyStat {
  value: string;
  label: string;
}

/* ----------------------------------------------------------------- social */

export type SocialPlatform = "facebook" | "instagram" | "tiktok";

export interface SocialProfile {
  platform: SocialPlatform;
  label: string;
  /** Empty string = not published yet; the site renders a quiet pending state. */
  url: string;
  /** Handle without the @, e.g. "needhamsconstruction". */
  handle?: string;
}
