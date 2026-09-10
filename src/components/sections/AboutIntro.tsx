import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { MediaFrame } from "@/components/media/MediaFrame";
import { SmartImage } from "@/components/media/SmartImage";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/Icons";
import { company } from "@/data/company";
import { services } from "@/data/services";
import type { ImageAsset } from "@/types/content";

/**
 * Short company introduction for the home page. All copy comes from
 * src/data/company.ts, so it can be rewritten without touching this file.
 */
export function AboutIntro({
  image,
  showCta = true,
  paragraphs = company.about.slice(0, 2),
}: {
  image?: ImageAsset | null;
  showCta?: boolean;
  paragraphs?: readonly string[];
}) {
  return (
    <Section tone="light" labelledBy="about-heading">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          {image ? (
            <SmartImage
              image={image}
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

        <div className="lg:col-span-7">
          <SectionHeading
            id="about-heading"
            eyebrow="About us"
            title="A Jamaican construction and home-services company"
          />

          <div className="mt-6 space-y-5 text-base leading-relaxed text-iron-600 sm:text-lg">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {services.map((service) => (
              <li
                key={service.slug}
                className="flex items-center gap-3 text-sm font-medium text-iron-800"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-700">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                {service.name}
              </li>
            ))}
          </ul>

          {showCta ? (
            <ButtonLink href="/about" variant="outline" className="mt-9">
              More about Needham&rsquo;s
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </ButtonLink>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
