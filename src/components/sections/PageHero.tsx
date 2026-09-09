import Link from "next/link";
import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon, PhoneIcon, ServiceGlyph } from "@/components/ui/Icons";
import { MediaFrame } from "@/components/media/MediaFrame";
import { SmartImage } from "@/components/media/SmartImage";
import { hasPhone, phoneDisplay, telHref } from "@/lib/contact";
import type { ImageAsset, ServiceIcon } from "@/types/content";

export interface Crumb {
  name: string;
  href: string;
}

/** Shared hero for every page other than the home page. */
export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  icon,
  image,
  mediaLabel,
  primaryCta,
  secondaryCta,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
  icon?: ServiceIcon;
  image?: ImageAsset | null;
  /** Label for the placeholder frame. Omit to hide the media column. */
  mediaLabel?: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  children?: ReactNode;
}) {
  const hasMedia = Boolean(mediaLabel || image);

  return (
    <section className="relative overflow-hidden bg-iron-950 text-white">
      <span aria-hidden className="blueprint-grid absolute inset-0 text-white/20" />

      <Container size="wide" className="relative py-12 sm:py-16 lg:py-20">
        {crumbs && crumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-concrete-400">
              {crumbs.map((crumb, index) => (
                <li key={crumb.href} className="flex items-center gap-2">
                  {index > 0 ? (
                    <span aria-hidden className="text-concrete-600">
                      /
                    </span>
                  ) : null}
                  {index === crumbs.length - 1 ? (
                    <span aria-current="page" className="text-concrete-200">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-amber-400"
                    >
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <div
          className={
            hasMedia
              ? "grid items-center gap-10 lg:grid-cols-12 lg:gap-14"
              : "max-w-3xl"
          }
        >
          <div className={hasMedia ? "lg:col-span-7" : undefined}>
            {icon ? (
              <span className="mb-6 inline-flex h-12 w-12 items-center justify-center bg-amber-500 text-iron-950">
                <ServiceGlyph icon={icon} className="h-6 w-6" />
              </span>
            ) : null}

            {eyebrow ? <Eyebrow tone="dark">{eyebrow}</Eyebrow> : null}

            <h1 className="mt-5 text-3xl leading-[1.08] font-extrabold text-balance sm:text-4xl lg:text-5xl">
              {title}
            </h1>

            {description ? (
              <p className="mt-6 max-w-xl text-base leading-relaxed text-concrete-300 sm:text-lg">
                {description}
              </p>
            ) : null}

            {primaryCta || secondaryCta ? (
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {primaryCta ? (
                  <ButtonLink href={primaryCta.href} size="lg" variant="primary">
                    {primaryCta.label}
                    <ArrowRightIcon className="h-5 w-5" />
                  </ButtonLink>
                ) : null}
                {secondaryCta ? (
                  <ButtonLink href={secondaryCta.href} size="lg" variant="onDark">
                    {secondaryCta.label}
                  </ButtonLink>
                ) : null}
                {hasPhone ? (
                  <ButtonLink href={telHref()} size="lg" variant="onDark">
                    <PhoneIcon className="h-5 w-5" />
                    {phoneDisplay}
                  </ButtonLink>
                ) : null}
              </div>
            ) : null}

            {children}
          </div>

          {hasMedia ? (
            <div className="lg:col-span-5">
              {image ? (
                <SmartImage
                  image={image}
                  fallbackLabel={mediaLabel ?? title}
                  ratio="4/3"
                  tone="dark"
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              ) : (
                <MediaFrame
                  label={mediaLabel ?? title}
                  ratio="4/3"
                  tone="dark"
                />
              )}
            </div>
          ) : null}
        </div>
      </Container>

      <span aria-hidden className="hatch block h-1 w-full text-amber-500/40" />
    </section>
  );
}
