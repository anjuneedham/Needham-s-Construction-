import type { Metadata } from "next";
import { Suspense } from "react";

import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactChannels } from "@/components/contact/ContactChannels";
import { QuoteForm } from "@/components/contact/QuoteForm";
import { Faq } from "@/components/sections/Faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { contact } from "@/data/contact";
import { company } from "@/data/company";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "Contact & Request a Quote",
  description:
    "Get in touch with Needham's Construction for tiling, plumbing, masonry or general construction work in Jamaica. Request a quote online.",
  path: "/contact",
});

export default function ContactPage() {
  const faqData = faqSchema();

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us about your project"
        description="Send the details and we'll come and look at the job properly. You'll get a clear scope and a written quote before any work starts."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />

      <Section tone="light" id="quote" labelledBy="quote-heading">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* ------------------------------------------------------ form */}
          <div className="min-w-0 lg:col-span-7">
            <SectionHeading
              id="quote-heading"
              eyebrow="Request a quote"
              title="Send us the details"
              description="The more you can tell us about the job, the more accurate the quote. Fields marked with an asterisk are required."
            />
            <div className="mt-10">
              <Suspense fallback={null}>
                <QuoteForm />
              </Suspense>
            </div>
          </div>

          {/* -------------------------------------------------- channels */}
          <aside
            aria-labelledby="channels-heading"
            className="min-w-0 lg:col-span-5"
          >
            <h2
              id="channels-heading"
              className="text-2xl font-bold text-iron-900"
            >
              Other ways to reach us
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-iron-600">
              Prefer to talk it through? Use whichever suits you — we&rsquo;ll
              pick it up either way.
            </p>
            <div className="mt-8">
              <ContactChannels />
            </div>
          </aside>
        </div>
      </Section>

      {/* ---------------------------------------------------------- faq */}
      <Section tone="muted" labelledBy="faq-heading">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="min-w-0 lg:col-span-4">
            <SectionHeading
              id="faq-heading"
              eyebrow="Common questions"
              title="Before you get in touch"
              description="If your question isn't here, ask us directly — we'll give you a straight answer."
            />
          </div>
          <div className="min-w-0 lg:col-span-8">
            <Faq />
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------- map */}
      {contact.mapEmbedUrl ? (
        <Section tone="muted" labelledBy="map-heading">
          <SectionHeading
            id="map-heading"
            eyebrow="Find us"
            title="Where we're based"
          />
          <div className="mt-10 aspect-video w-full overflow-hidden ring-1 ring-concrete-300">
            <iframe
              src={contact.mapEmbedUrl}
              title={`Map showing the location of ${company.name}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0"
            />
          </div>
        </Section>
      ) : null}

      {faqData ? <JsonLd data={faqData} /> : null}

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
    </>
  );
}
