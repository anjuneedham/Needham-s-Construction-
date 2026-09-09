/**
 * SITE CONFIGURATION — domain, SEO defaults and future integrations.
 */

/**
 * The live domain. Set NEXT_PUBLIC_SITE_URL in your hosting environment
 * (Vercel → Settings → Environment Variables) once the domain is pointed.
 * It is used for canonical URLs, Open Graph tags, the sitemap and robots.txt.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://needhamsconstruction.com"
).replace(/\/$/, "");

export const site = {
  url: siteUrl,
  locale: "en_JM",
  language: "en-JM",
  /** Default title suffix, e.g. "Tiling | Needham's Construction". */
  titleTemplate: "%s | Needham's Construction",
  defaultTitle: "Needham's Construction | Construction & Home Services in Jamaica",
  defaultDescription:
    "Needham's Construction provides professional construction and home-improvement services across Jamaica — tiling, plumbing, masonry, electrical and general construction. Request a quote today.",
  /**
   * Broad keywords for the site. Individual pages carry their own,
   * more specific description. Keep this short — no keyword stuffing.
   */
  keywords: [
    "construction services Jamaica",
    "construction contractor Jamaica",
    "tiling Jamaica",
    "plumbing Jamaica",
    "masonry Jamaica",
    "electrical services Jamaica",
    "general construction Jamaica",
    "home improvement Jamaica",
  ],
} as const;

/**
 * ANALYTICS & PIXELS — all optional, all off by default.
 *
 * Set the matching environment variable and the tag loads automatically;
 * leave it unset and nothing is injected. No third-party scripts run in
 * Version 1.
 */
export const analytics = {
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "",
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
  tiktokPixelId: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID ?? "",
} as const;
