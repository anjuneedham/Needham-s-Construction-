import Link from "next/link";
import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Rule } from "@/components/ui/Rule";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for could not be found.",
  robots: { index: false, follow: true },
  alternates: { canonical: undefined },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-iron-950 text-white">
      <span aria-hidden className="blueprint-grid absolute inset-0 text-white/20" />

      <Container size="wide" className="relative py-20 sm:py-28 lg:py-32">
        <div className="max-w-2xl">
          <Rule tone="dark" />
          <p className="mt-6 font-display text-6xl font-extrabold text-amber-400 sm:text-7xl">
            404
          </p>
          <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">
            We couldn&rsquo;t find that page
          </h1>
          <p className="mt-5 text-base leading-relaxed text-concrete-300 sm:text-lg">
            The page may have moved, or the address may be slightly off. Here
            are the places most people are looking for.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="/" size="lg" variant="primary">
              Back to home
              <ArrowRightIcon className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </ButtonLink>
            <ButtonLink href="/contact#quote" size="lg" variant="onDark">
              Request a Quote
            </ButtonLink>
          </div>

          <nav aria-label="Services" className="mt-12 border-t border-white/10 pt-8">
            <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-concrete-500 uppercase">
              Our services
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center rounded-sm border border-white/15 px-3.5 py-2 text-sm font-medium text-concrete-300 transition-colors hover:border-amber-400 hover:text-amber-400"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </section>
  );
}
