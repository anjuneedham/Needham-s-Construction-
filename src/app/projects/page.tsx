import type { Metadata } from "next";

import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FilterableProjects } from "@/components/projects/FilterableProjects";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { VideoSection } from "@/components/media/VideoSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { allProjects, getFeaturedProjects } from "@/data/projects";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { isPortraitVideo } from "@/lib/utils";
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
  const heroProject = getFeaturedProjects(1)[0];

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
        image={heroProject?.images[0] ?? null}
        mediaLabel="Featured project"
      />

      <Section tone="light" labelledBy="projects-heading">
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
              ? "Filter by service, or tap any project to open the photos full screen."
              : "We're photographing and filming jobs as they're completed. In the meantime, each service page explains exactly what that work involves and how we approach it."
          }
        />

        <div className="mt-12">
          <FilterableProjects
            projects={allProjects}
            filters={services.map((service) => ({
              slug: service.slug,
              label: service.name,
            }))}
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
        ratio={isPortraitVideo(projectVideos) ? "9/16" : "16/9"}
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
