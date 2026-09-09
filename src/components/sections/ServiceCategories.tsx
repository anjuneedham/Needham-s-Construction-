import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckIcon } from "@/components/ui/Icons";
import type { ServiceCategory } from "@/types/content";

export function ServiceCategories({
  categories,
  eyebrow,
  title,
  description,
  tone = "muted",
}: {
  categories: ServiceCategory[];
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: "light" | "muted";
}) {
  if (categories.length === 0) return null;

  return (
    <Section tone={tone} labelledBy="categories-heading">
      <SectionHeading
        id="categories-heading"
        eyebrow={eyebrow}
        title={title}
        description={description}
      />

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <li
            key={category.title}
            className="flex gap-4 bg-white p-6 ring-1 ring-concrete-300"
          >
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-700">
              <CheckIcon className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-base font-bold text-iron-900">
                {category.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-iron-600">
                {category.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
