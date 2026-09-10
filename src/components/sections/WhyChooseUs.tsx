import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { company } from "@/data/company";

export function WhyChooseUs() {
  return (
    <Section tone="muted" labelledBy="why-heading">
      <SectionHeading
        id="why-heading"
        eyebrow="Why choose us"
        title="How we work on every job"
        description="Four things you can expect from Needham's Construction, whether the job is a single bathroom or a full renovation."
      />

      <ul className="mt-14 grid gap-px overflow-hidden bg-concrete-300 sm:grid-cols-2 lg:grid-cols-4">
        {company.values.map((value, index) => (
          <li key={value.title} className="bg-concrete-50 p-7 lg:p-8">
            <span
              aria-hidden
              className="font-display text-sm font-bold tracking-[0.2em] text-amber-600"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 text-lg font-bold text-iron-900">
              {value.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-iron-600">
              {value.description}
            </p>
          </li>
        ))}
      </ul>

      {company.stats.length > 0 ? (
        <dl className="mt-12 grid gap-8 border-t border-concrete-300 pt-10 sm:grid-cols-3">
          {company.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-4xl font-extrabold text-iron-900">
                {stat.value}
              </dd>
              <p className="mt-1 text-sm text-iron-600">{stat.label}</p>
            </div>
          ))}
        </dl>
      ) : null}
    </Section>
  );
}
