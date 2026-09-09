import type { Metadata } from "next";

import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { SocialSection } from "@/components/sections/SocialSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { VideoSection } from "@/components/media/VideoSection";
import { services } from "@/data/services";
import { getFeaturedProjects } from "@/data/projects";
import { site, siteUrl } from "@/data/site";
import { aboutImage, heroImage, heroVideo, homeVideos } from "@/data/home";

export const metadata: Metadata = {
  title: {
    absolute: site.defaultTitle,
  },
  description: site.defaultDescription,
  alternates: { canonical: siteUrl },
};

/**
 * HOME PAGE
 *
 * The hero media, the About photograph and the "See Our Work" videos are all
 * supplied from src/data/home.ts. Fill any of them in there and the designed
 * placeholders on this page are replaced automatically.
 */
export default function HomePage() {
  const featured = getFeaturedProjects(3);

  return (
    <>
      <Hero heroImage={heroImage} heroVideo={heroVideo} />

      <Section id="services" tone="light" labelledBy="services-heading">
        <SectionHeading
          id="services-heading"
          eyebrow="What we do"
          title="Five services, one team"
          description="Tiling, plumbing, masonry, electrical and general construction — handled in-house, so a job that touches more than one trade doesn't need more than one contractor."
        />
        <ServicesGrid services={services} className="mt-14" />
      </Section>

      <WhyChooseUs />

      <ProjectsShowcase
        projects={featured}
        eyebrow="Our work"
        title="Recent projects"
        description="Photographs and video of completed Needham's Construction jobs — added as work is finished."
        emptyLabels={[
          "Recent project",
          "Before and after",
          "Project walkthrough",
        ]}
      />

      <VideoSection
        id="see-our-work"
        eyebrow="See our work"
        title="Video from the job site"
        description="Walkthroughs, before-and-after clips and work in progress. Videos are added here as they're filmed."
        videos={homeVideos}
        emptyLabel="Project walkthrough"
        emptyMessage="Our first project videos will appear here. We film work in progress and finished jobs rather than using stock footage."
        ctaHref="/projects"
        ctaLabel="View projects"
      />

      <AboutIntro image={aboutImage} />

      <Testimonials tone="muted" />

      <SocialSection />

      <ContactCTA />
    </>
  );
}
