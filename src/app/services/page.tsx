import type { Metadata } from "next";

import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "Construction Services",
  description:
    "Tiling, plumbing, masonry and general construction services across Jamaica. See what Needham's Construction can take on and request a quote.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Construction and home services across Jamaica"
        description="Four trades under one roof. Take on a single job, or hand over a whole renovation and let us coordinate it."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ]}
        primaryCta={{ href: "/contact#quote", label: "Request a Quote" }}
        mediaLabel="Work in progress"
      />

      <Section tone="light" labelledBy="all-services-heading">
        <SectionHeading
          id="all-services-heading"
          eyebrow="What we do"
          title="Choose a service"
          description="Each page sets out the kinds of work involved, how a job runs from first call to hand-over, and the gallery where that service's completed work is shown."
        />
        <ServicesGrid services={services} className="mt-14" />
      </Section>

      <ContactCTA
        heading="Not sure which one you need?"
        message="Describe the job and we'll tell you what's involved. Most projects touch more than one trade, and we handle them together."
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
    </>
  );
}
