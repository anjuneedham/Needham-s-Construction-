import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ArrowRightIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { MediaFrame } from "@/components/media/MediaFrame";
import { SmartImage } from "@/components/media/SmartImage";
import { VideoCard } from "@/components/media/VideoCard";
import { company } from "@/data/company";
import { services } from "@/data/services";
import {
  hasPhone,
  hasWhatsApp,
  phoneDisplay,
  serviceAreaLabel,
  telHref,
  whatsappHref,
} from "@/lib/contact";
import type { ImageAsset, VideoAsset } from "@/types/content";

/**
 * Home page hero.
 *
 * The media panel takes a real hero video or photograph as soon as one is
 * supplied — set `heroVideo` or `heroImage` in src/app/page.tsx. Until then
 * it holds the exact space with a designed frame.
 */
export function Hero({
  heroImage,
  heroVideo,
}: {
  heroImage?: ImageAsset | null;
  heroVideo?: VideoAsset | null;
}) {
  return (
    <section className="relative overflow-hidden bg-iron-950 text-white">
      {/* Structural background detail */}
      <span
        aria-hidden
        className="blueprint-grid absolute inset-0 text-white/25"
      />
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-amber-500/50 to-transparent"
      />

      <Container size="wide" className="relative py-16 sm:py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* ------------------------------------------------------ copy */}
          <div className="lg:col-span-6">
            <Eyebrow tone="dark">Construction &amp; Home Services</Eyebrow>

            <h1 className="mt-6 text-4xl leading-[1.05] font-extrabold text-balance sm:text-5xl lg:text-6xl">
              Quality Construction.
              <span className="block text-amber-400">Reliable Workmanship.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-concrete-300 sm:text-lg">
              {company.name} provides professional construction and
              home-improvement services across Jamaica — tiling, plumbing,
              masonry, electrical and general construction, handled by one team
              from first quote to final clean-up.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href="/contact#quote" size="lg" variant="primary">
                Request a Quote
                <ArrowRightIcon className="h-5 w-5" />
              </ButtonLink>
              <ButtonLink href="/services" size="lg" variant="onDark">
                View Our Services
              </ButtonLink>
            </div>

            {/* --------------------------------------- direct contact CTA */}
            <div className="mt-9 border-t border-white/10 pt-7">
              {hasPhone ? (
                <a
                  href={telHref()}
                  className="group inline-flex items-center gap-4"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-500 text-iron-950 transition-transform duration-200 group-hover:scale-105">
                    <PhoneIcon className="h-5 w-5" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-[0.7rem] font-semibold tracking-[0.16em] text-concrete-400 uppercase">
                      Call us directly
                    </span>
                    <span className="font-display text-xl font-bold text-white transition-colors group-hover:text-amber-400 sm:text-2xl">
                      {phoneDisplay}
                    </span>
                  </span>
                </a>
              ) : hasWhatsApp ? (
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-4"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-500 text-iron-950 transition-transform duration-200 group-hover:scale-105">
                    <WhatsAppIcon className="h-5 w-5" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-[0.7rem] font-semibold tracking-[0.16em] text-concrete-400 uppercase">
                      Message us
                    </span>
                    <span className="font-display text-xl font-bold text-white transition-colors group-hover:text-amber-400 sm:text-2xl">
                      WhatsApp Us
                    </span>
                  </span>
                </a>
              ) : (
                <Link href="/contact" className="group inline-flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-500 text-iron-950 transition-transform duration-200 group-hover:scale-105">
                    <PhoneIcon className="h-5 w-5" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-[0.7rem] font-semibold tracking-[0.16em] text-concrete-400 uppercase">
                      Talk to us about your project
                    </span>
                    <span className="font-display text-xl font-bold text-white transition-colors group-hover:text-amber-400 sm:text-2xl">
                      See contact options
                    </span>
                  </span>
                </Link>
              )}
            </div>

            {/* ------------------------------------------- service chips */}
            <ul className="mt-8 flex flex-wrap gap-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center rounded-sm border border-white/15 px-3 py-1.5 text-xs font-semibold tracking-wide text-concrete-300 transition-colors hover:border-amber-400 hover:text-amber-400"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ----------------------------------------------------- media */}
          <div className="lg:col-span-6">
            <div className="relative">
              <span
                aria-hidden
                className="absolute -top-3 -right-3 hidden h-24 w-24 border-t-2 border-r-2 border-amber-500/60 sm:block"
              />
              {heroVideo ? (
                <VideoCard video={heroVideo} tone="dark" ratio="16/9" />
              ) : heroImage ? (
                <SmartImage
                  image={heroImage}
                  fallbackLabel="Needham's Construction"
                  ratio="4/3"
                  tone="dark"
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              ) : (
                <>
                  <MediaFrame
                    label="Company video or featured project"
                    kind="video"
                    ratio="4/3"
                    tone="dark"
                    note="Hero media — to be added"
                  />
                  <p className="mt-4 text-sm leading-relaxed text-concrete-400">
                    This space is reserved for a Needham&rsquo;s Construction
                    video or photograph of completed work. We don&rsquo;t use
                    stock images of other people&rsquo;s jobs.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        <p className="mt-14 border-t border-white/10 pt-6 text-sm text-concrete-400">
          {serviceAreaLabel()}.
        </p>
      </Container>
    </section>
  );
}
