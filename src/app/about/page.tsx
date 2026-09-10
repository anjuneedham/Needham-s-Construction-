import type { Metadata } from "next";

import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { MediaFrame } from "@/components/media/MediaFrame";
import { SmartImage } from "@/components/media/SmartImage";
import { JsonLd } from "@/components/seo/JsonLd";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { aboutImage } from "@/data/home";
import { serviceAreaLabel } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "Needham's Construction is a Jamaican construction and home-services company handling tiling, plumbing, masonry and general construction work.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A Jamaican construction and home-services company"
        description={company.positioning}
        crumbs={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
        primaryCta={{ href: "/contact#quote", label: "Request a Quote" }}
        secondaryCta={{ href: "/services", label: "View Our Services" }}
      />

      <Section tone="light" labelledBy="story-heading">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <SectionHeading
              id="story-heading"
              eyebrow="Who we are"
              title="Straightforward work, done to a standard"
            />
            <div className="mt-6 space-y-5 text-base leading-relaxed text-iron-600 sm:text-lg">
              {company.about.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>

            <dl className="mt-10 grid gap-6 border-t border-concrete-300 pt-8 sm:grid-cols-2">
              <div>
                <dt className="text-[0.68rem] font-semibold tracking-[0.16em] text-iron-500 uppercase">
                  Where we work
                </dt>
                <dd className="mt-2 text-iron-800">{serviceAreaLabel()}</dd>
              </div>
              <div>
                <dt className="text-[0.68rem] font-semibold tracking-[0.16em] text-iron-500 uppercase">
                  What we cover
                </dt>
                <dd className="mt-2 text-iron-800">
                  {services.map((service) => service.name).join(", ")}
                </dd>
              </div>
              {company.foundedYear ? (
                <div>
                  <dt className="text-[0.68rem] font-semibold tracking-[0.16em] text-iron-500 uppercase">
                    Established
                  </dt>
                  <dd className="mt-2 text-iron-800">{company.foundedYear}</dd>
                </div>
              ) : null}
              {company.certifications.length > 0 ? (
                <div>
                  <dt className="text-[0.68rem] font-semibold tracking-[0.16em] text-iron-500 uppercase">
                    Credentials
                  </dt>
                  <dd className="mt-2 text-iron-800">
                    {company.certifications.join(", ")}
                  </dd>
                </div>
              ) : null}
            </dl>
          </div>

          <div className="lg:col-span-5">
            {aboutImage ? (
              <SmartImage
                image={aboutImage}
                fallbackLabel="Needham's Construction"
                ratio="3/4"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            ) : (
              <MediaFrame
                label="Team or company photograph"
                ratio="3/4"
                note="Photography to be added"
              />
            )}
          </div>
        </div>
      </Section>

      <WhyChooseUs />

      <Section tone="light" labelledBy="about-services-heading">
        <SectionHeading
          id="about-services-heading"
          eyebrow="What we do"
          title="The work we take on"
          description="Five services, handled in-house. A job that touches more than one trade stays with one team."
        />
        <ServicesGrid services={services} className="mt-14" />
      </Section>

      <Testimonials tone="muted" />

      <ContactCTA />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
    </>
  );
}
