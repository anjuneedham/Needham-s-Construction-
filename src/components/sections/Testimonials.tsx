import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { QuoteMarkIcon } from "@/components/ui/Icons";
import { formatDate } from "@/lib/utils";
import { testimonials as allTestimonials } from "@/data/testimonials";
import { getService } from "@/data/services";
import type { Testimonial } from "@/types/content";

/**
 * Customer feedback.
 *
 * Renders nothing at all while `src/data/testimonials.ts` is empty — the site
 * never shows invented reviews or a "no reviews yet" apology. Add a real
 * testimonial and the section appears.
 */
export function Testimonials({
  testimonials = allTestimonials,
  limit = 3,
  tone = "light",
}: {
  testimonials?: Testimonial[];
  limit?: number;
  tone?: "light" | "muted";
}) {
  const items = testimonials.slice(0, limit);
  if (items.length === 0) return null;

  return (
    <Section tone={tone} labelledBy="testimonials-heading">
      <SectionHeading
        id="testimonials-heading"
        eyebrow="What our customers say"
        title="In their words"
      />

      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((testimonial) => {
          const service = testimonial.service
            ? getService(testimonial.service)
            : undefined;

          return (
            <li
              key={testimonial.id}
              className="flex flex-col bg-white p-7 ring-1 ring-concrete-300"
            >
              <QuoteMarkIcon className="h-7 w-7 text-amber-500" />
              <blockquote className="mt-5 flex-1 text-base leading-relaxed text-iron-700">
                {testimonial.quote}
              </blockquote>
              <footer className="mt-6 border-t border-concrete-200 pt-4">
                <p className="font-semibold text-iron-900">
                  {testimonial.author}
                </p>
                <p className="mt-1 text-sm text-iron-500">
                  {[
                    testimonial.location,
                    service?.name,
                    formatDate(testimonial.date),
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
                {testimonial.source ? (
                  <p className="mt-1 text-xs tracking-wide text-concrete-600 uppercase">
                    via {testimonial.source}
                  </p>
                ) : null}
              </footer>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
