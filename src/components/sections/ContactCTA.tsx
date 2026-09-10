import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Rule } from "@/components/ui/Rule";
import { PhoneIcon, WhatsAppIcon, ArrowRightIcon } from "@/components/ui/Icons";
import {
  hasPhone,
  hasWhatsApp,
  phoneDisplay,
  serviceAreaLabel,
  telHref,
  whatsappHref,
} from "@/lib/contact";

/**
 * The closing call to action, reused at the bottom of every page.
 * Call and WhatsApp buttons appear automatically once those numbers are
 * added in src/data/contact.ts.
 */
export function ContactCTA({
  heading = "Ready to Start Your Project?",
  message = "Tell us what you need done and we'll come and look at it properly. You'll get a clear scope and a written quote before any work begins.",
  quoteLabel = "Request a Quote",
  quoteMessage,
}: {
  heading?: string;
  message?: string;
  quoteLabel?: string;
  /** Optional pre-filled WhatsApp message, e.g. mentioning a service. */
  quoteMessage?: string;
}) {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative overflow-hidden bg-iron-900 py-16 text-white sm:py-20"
    >
      <span aria-hidden className="blueprint-grid absolute inset-0 text-white/25" />

      <Container size="wide" className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Rule tone="dark" />
            <h2
              id="cta-heading"
              className="mt-6 text-3xl leading-tight font-extrabold text-balance sm:text-4xl lg:text-[2.75rem]"
            >
              {heading}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-concrete-300 sm:text-lg">
              {message}
            </p>
            <p className="mt-5 text-sm text-concrete-400">{serviceAreaLabel()}.</p>
          </div>

          <div className="lg:col-span-5">
            <div className="flex flex-col gap-3">
              {hasPhone ? (
                <ButtonLink href={telHref()} size="lg" variant="primary" className="w-full">
                  <PhoneIcon className="h-5 w-5" />
                  Call Now — {phoneDisplay}
                </ButtonLink>
              ) : null}

              {hasWhatsApp ? (
                <ButtonLink
                  href={whatsappHref(quoteMessage)}
                  size="lg"
                  variant={hasPhone ? "onDark" : "primary"}
                  className="w-full"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  WhatsApp Us
                </ButtonLink>
              ) : null}

              <ButtonLink
                href="/contact#quote"
                size="lg"
                variant={hasPhone || hasWhatsApp ? "onDark" : "primary"}
                className="w-full"
              >
                {quoteLabel}
                <ArrowRightIcon className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </ButtonLink>
            </div>

            {!hasPhone && !hasWhatsApp ? (
              <p className="mt-4 text-center text-xs leading-relaxed text-concrete-500">
                Send the quote form and we&rsquo;ll get back to you with next
                steps.
              </p>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
