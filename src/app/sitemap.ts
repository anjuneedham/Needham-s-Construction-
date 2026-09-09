import type { MetadataRoute } from "next";

import { siteUrl } from "@/data/site";
import { services } from "@/data/services";
import { projects } from "@/data/projects";

/**
 * Generated from the content files, so a new service or project is listed
 * automatically. Served at /sitemap.xml.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${siteUrl}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.9 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const lastProjectUpdate = projects
    .map((project) => project.date)
    .filter(Boolean)
    .sort()
    .at(-1);

  if (lastProjectUpdate) {
    const projectsEntry = staticRoutes.find(
      (entry) => entry.url === `${siteUrl}/projects`,
    );
    if (projectsEntry) projectsEntry.lastModified = new Date(lastProjectUpdate);
  }

  return [...staticRoutes, ...serviceRoutes];
}
