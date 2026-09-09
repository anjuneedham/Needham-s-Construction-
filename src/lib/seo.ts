import type { Metadata } from "next";

import { site, siteUrl } from "@/data/site";
import { company } from "@/data/company";

interface PageMetaInput {
  title: string;
  description: string;
  /** Path with a leading slash, e.g. "/services/tiling". */
  path: string;
  /** Set false on pages that should not be indexed. */
  index?: boolean;
}

/**
 * Builds a complete, consistent metadata block for a page: canonical URL,
 * Open Graph and Twitter cards included.
 */
export function pageMetadata({
  title,
  description,
  path,
  index = true,
}: PageMetaInput): Metadata {
  const url = `${siteUrl}${path === "/" ? "" : path}`;
  const fullTitle =
    path === "/" ? site.defaultTitle : site.titleTemplate.replace("%s", title);

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      type: "website",
      url,
      siteName: company.name,
      title: fullTitle,
      description,
      locale: site.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
