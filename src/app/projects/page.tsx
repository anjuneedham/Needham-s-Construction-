import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { VideoSection } from "@/components/media/VideoSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { allProjects } from "@/data/projects";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import type { VideoAsset } from "@/types/content";

export const metadata: Metadata = pageMetadata({
  title: "Our Projects",
  description:
    "Completed construction, tiling, plumbing and masonry projects by Needham's Construction in Jamaica. Photographs and video from real jobs.",
  path: "/projects",
});

export default function ProjectsPage() {
  const projectVideos: VideoAsset[] = allProjects.flatMap(
    (project) => project.videos,
  );

  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="Projects"
        description="Real Needham's Construction jobs — photographed and filmed as they're completed. No stock photography, and nothing here that isn't our own work."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Projects", href: "/projects" },
        ]}
        primaryCta={{ href: "/contact#quote", label: "Request a Quote" }}
        mediaLabel="Featured project"
      />

      <Section tone="light" labelledBy="projects-heading">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="projects-heading"
            eyebrow={
              allProjects.length > 0
                ? `${allProjects.length} project${allProjects.length > 1 ? "s" : ""}`
                : "Portfolio"
            }
            title={
              allProjects.length > 0 ? "Completed work" : "Building the portfolio"
            }
            description={
              allProjects.length > 0
                ? "Browse work by service, or get in touch about something similar."
                : "We're photographing and filming jobs as they're completed. In the meantime, each service page explains exactly what that work involves and how we approach it."
            }
          />

          <nav aria-label="Browse by service" className="shrink-0">
            <ul className="flex flex-wrap gap-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}#gallery`}
                    className="inline-flex items-center rounded-sm border border-concrete-300 bg-white px-3.5 py-2 text-sm font-medium text-iron-700 transition-colors hover:border-iron-900 hover:text-iron-900"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12">
          <ProjectGrid
            projects={allProjects}
            emptyHeading="Our latest projects will be showcased here"
            emptyMessage="Each completed job is photographed and, where it makes sense, filmed. Those projects will appear here with the location, the service involved and before-and-after images."
            emptyLabels={[
              "Completed project",
              "Before and after",
              "Project walkthrough",
            ]}
          />
        </div>
      </Section>

      <VideoSection
        eyebrow="On video"
        title="Project walkthroughs"
        description="Video from finished jobs and work in progress."
        videos={projectVideos}
        emptyLabel="Project walkthrough"
        emptyMessage="Project videos will be published here as they're filmed."
      />

      <ContactCTA
        heading="Want work like this on your property?"
        message="Tell us what you're planning. We'll look at the job, talk through the options and put a written quote together."
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />
    </>
  );
}
