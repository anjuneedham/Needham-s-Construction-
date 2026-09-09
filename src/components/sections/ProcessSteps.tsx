import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ProcessStep } from "@/types/content";

export function ProcessSteps({
  steps,
  eyebrow = "Our process",
  title = "How a job runs",
  description,
  tone = "dark",
}: {
  steps: ProcessStep[];
  eyebrow?: string;
  title?: string;
  description?: string;
  tone?: "dark" | "muted";
}) {
  if (steps.length === 0) return null;
  const dark = tone === "dark";

  return (
    <Section tone={tone} labelledBy="process-heading">
      <SectionHeading
        id="process-heading"
        eyebrow={eyebrow}
        title={title}
        description={description}
        tone={dark ? "dark" : "light"}
      />

      <ol className="mt-14 grid gap-px overflow-hidden bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className={dark ? "bg-iron-900 p-7" : "bg-concrete-50 p-7"}
          >
            <span
              aria-hidden
              className={`font-display text-sm font-bold tracking-[0.2em] ${
                dark ? "text-amber-400" : "text-amber-600"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3
              className={`mt-4 text-lg font-bold ${
                dark ? "text-white" : "text-iron-900"
              }`}
            >
              {step.title}
            </h3>
            <p
              className={`mt-3 text-sm leading-relaxed ${
                dark ? "text-concrete-400" : "text-iron-600"
              }`}
            >
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
