import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { MailIcon, PhoneIcon, WhatsAppIcon, MapPinIcon } from "@/components/ui/Icons";
import { company } from "@/data/company";
import { contact } from "@/data/contact";
import { footerQuickLinks } from "@/data/navigation";
import { services } from "@/data/services";
import {
  hasEmail,
  hasPhone,
  hasWhatsApp,
  mailtoHref,
  phoneDisplay,
  serviceAreaLabel,
  telHref,
  whatsappHref,
} from "@/lib/contact";
import { liveSocials, SocialLinks } from "./SocialLinks";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-iron-950 text-concrete-300">
      <span aria-hidden className="hatch block h-1 w-full text-amber-500/50" />

      <Container size="wide" className="py-14 lg:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* --------------------------------------------------- brand */}
          <div className="lg:col-span-4">
            <p className="font-display text-2xl font-extrabold text-white">
              {company.name}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-concrete-400">
              {company.blurb}
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-concrete-400">
              <MapPinIcon className="h-4 w-4 shrink-0 text-amber-500" />
              {serviceAreaLabel()}
            </p>

            <div className="mt-7">
              <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-concrete-500 uppercase">
                Follow us
              </p>
              <SocialLinks tone="dark" className="mt-3" size="sm" />
            </div>
          </div>

          {/* ------------------------------------------------ services */}
          <nav aria-labelledby="footer-services" className="lg:col-span-3">
            <h2
              id="footer-services"
              className="text-[0.68rem] font-semibold tracking-[0.18em] text-concrete-500 uppercase"
            >
              Services
            </h2>
            <ul className="mt-4 space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-concrete-300 transition-colors hover:text-amber-400"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* --------------------------------------------- quick links */}
          <nav aria-labelledby="footer-links" className="lg:col-span-2">
            <h2
              id="footer-links"
              className="text-[0.68rem] font-semibold tracking-[0.18em] text-concrete-500 uppercase"
            >
              Quick Links
            </h2>
            <ul className="mt-4 space-y-3">
              {footerQuickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-concrete-300 transition-colors hover:text-amber-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ------------------------------------------------- contact */}
          <div className="lg:col-span-3">
            <h2 className="text-[0.68rem] font-semibold tracking-[0.18em] text-concrete-500 uppercase">
              Get in touch
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              {hasPhone ? (
                <li>
                  <a
                    href={telHref()}
                    className="inline-flex items-center gap-2.5 text-concrete-200 transition-colors hover:text-amber-400"
                  >
                    <PhoneIcon className="h-4 w-4 shrink-0 text-amber-500" />
                    {phoneDisplay}
                  </a>
                </li>
              ) : null}

              {hasWhatsApp ? (
                <li>
                  <a
                    href={whatsappHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-concrete-200 transition-colors hover:text-amber-400"
                  >
                    <WhatsAppIcon className="h-4 w-4 shrink-0 text-amber-500" />
                    WhatsApp
                  </a>
                </li>
              ) : null}

              {hasEmail ? (
                <li>
                  <a
                    href={mailtoHref()}
                    className="inline-flex items-center gap-2.5 break-all text-concrete-200 transition-colors hover:text-amber-400"
                  >
                    <MailIcon className="h-4 w-4 shrink-0 text-amber-500" />
                    {contact.email}
                  </a>
                </li>
              ) : null}

              {!hasPhone && !hasWhatsApp && !hasEmail ? (
                <li className="text-concrete-400">
                  Send us the details of your project and we&rsquo;ll come back
                  to you with next steps.
                </li>
              ) : null}

              <li>
                <Link
                  href="/contact#quote"
                  className="mt-2 inline-flex h-11 items-center justify-center rounded-sm bg-amber-500 px-5 font-semibold text-iron-950 transition-colors hover:bg-amber-400"
                >
                  Request a Quote
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container size="wide">
          <div className="flex flex-col gap-3 py-6 text-xs text-concrete-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {year} {company.name}. All rights reserved.
            </p>
            <p>
              {company.tagline}
              {liveSocials.length === 0 ? null : (
                <span className="sr-only"> Follow us on social media.</span>
              )}
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
