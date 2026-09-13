import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCategories } from "@/components/sections/ServiceCategories";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { VideoSection } from "@/components/media/VideoSection";
import { MediaFrame } from "@/components/media/MediaFrame";
import { PhotoGallery } from "@/components/media/PhotoGallery";
import { SmartImage } from "@/components/media/SmartImage";
import { CheckIcon } from "@/components/ui/Icons";
import { JsonLd } from "@/components/seo/JsonLd";
import { getService, services } from "@/data/services";
import { getProjectsByCategory } from "@/data/projects";
import { article, isPortraitVideo } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-renders one static page per service in src/data/services.ts. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return pageMetadata({
      title: "Service not found",
      description: "This service page could not be found.",
      path: `/services/${slug}`,
      index: false,
    });
  }

  return pageMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const projects = getProjectsByCategory(service.slug);
  const galleryImages = service.images.slice(1);
  const slots = service.mediaSlots;
  const videoRatio = isPortraitVideo(service.videos) ? "9/16" : "16/9";

  return (
    <>
      <PageHero
        eyebrow={service.name}
        title={service.heroHeadline}
        description={service.heroSubline}
        icon={service.icon}
        image={service.images[0] ?? null}
        mediaLabel={`${service.name} — completed work`}
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.name, href: `/services/${service.slug}` },
        ]}
        primaryCta={{ href: "/contact#quote", label: "Request a Quote" }}
        secondaryCta={{ href: "#gallery", label: "See the work" }}
      />

      {/* ------------------------------------------------------ what we do */}
      <Section tone="light" labelledBy="what-we-do-heading">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <SectionHeading
              id="what-we-do-heading"
              eyebrow="What we do"
              title={`${service.name} work, done properly`}
            />
            <div className="mt-6 space-y-5 text-base leading-relaxed text-iron-600 sm:text-lg">
              {service.overview.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {service.categories.slice(0, 6).map((category) => (
                <li
                  key={category.title}
                  className="flex items-center gap-3 text-sm font-medium text-iron-800"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-700">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  {category.title}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            {service.images[1] ? (
              <SmartImage
                image={service.images[1]}
                fallbackLabel={slots[0]?.label ?? service.name}
                ratio="4/3"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            ) : (
              <MediaFrame
                label={slots[0]?.label ?? `${service.name} work`}
                ratio="4/3"
              />
            )}
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------- categories */}
      <ServiceCategories
        categories={service.categories}
        eyebrow={`Types of ${service.name.toLowerCase()}`}
        title={`The ${service.name.toLowerCase()} work we take on`}
        description="These are the jobs we're asked for most. If what you need isn't listed, ask — it's likely something we handle."
      />

      {/* --------------------------------------------------- safety notes */}
      {service.notes ? (
        <Section tone="light" labelledBy="notes-heading">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                id="notes-heading"
                eyebrow="Standards"
                title={service.notes.title}
                description={service.notes.intro}
              />
            </div>
            <ul className="space-y-4 lg:col-span-7">
              {service.notes.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-4 border-l-2 border-amber-500 bg-concrete-100 p-5"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-700">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  <p className="text-sm leading-relaxed text-iron-700">{point}</p>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      {/* ------------------------------------------------------- process */}
      <ProcessSteps
        steps={service.process}
        title={`How ${article(service.name)} ${service.name.toLowerCase()} job runs`}
        description="The same sequence every time, so you always know what happens next."
      />

      {/* ------------------------------------------------------- gallery */}
      <ProjectsShowcase
        id="gallery"
        projects={projects}
        eyebrow="Project gallery"
        title={`${service.name} projects`}
        description={`Completed ${service.name.toLowerCase()} work, photographed and filmed on site.`}
        emptyHeading={`Our ${service.name.toLowerCase()} projects will be showcased here`}
        emptyMessage="We photograph each job as it's completed. This gallery fills in with real Needham's Construction work — never stock photography."
        emptyLabels={slots.map((slot) => slot.label)}
        ctaHref="/projects"
        ctaLabel="View all projects"
      />

      {/* ----------------------------------------- additional photography */}
      {galleryImages.length > 0 ? (
        <Section tone="muted" labelledBy="photos-heading">
          <SectionHeading
            id="photos-heading"
            eyebrow="Photography"
            title={`More ${service.name.toLowerCase()} work`}
          />
          <PhotoGallery images={galleryImages} ratio="4/3" className="mt-12" />
        </Section>
      ) : null}

      {/* --------------------------------------------------------- video */}
      <VideoSection
        eyebrow="On video"
        title={`${service.name} on the job`}
        description="Walkthroughs and progress clips from completed work."
        videos={service.videos}
        emptyLabel={`${service.name} walkthrough`}
        emptyMessage={`Video of our ${service.name.toLowerCase()} work will be published here.`}
        ratio={videoRatio}
      />

      <ContactCTA
        heading={`Need ${service.name.toLowerCase()} work done?`}
        message="Tell us about the job and we'll come and look at it properly. You'll get a clear scope and a written quote before anything starts."
        quoteMessage={`Hi Needham's Construction, I'd like a quote for ${service.name.toLowerCase()} work.`}
      />

      <JsonLd data={serviceSchema(service.slug)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` },
        ])}
      />
    </>
  );
}
