import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { MediaFrame } from "@/components/media/MediaFrame";

/**
 * Shown wherever the portfolio is still being built. It is a designed state,
 * not a broken one: the layout reserves the space real projects will fill.
 */
export function ProjectsEmptyState({
  heading = "Our latest projects will be showcased here",
  message,
  labels = ["Recent project", "Recent project", "Recent project"],
  tone = "light",
  ctaHref = "/contact#quote",
  ctaLabel = "Request a Quote",
  className,
}: {
  heading?: string;
  message?: string;
  labels?: string[];
  tone?: "light" | "dark";
  ctaHref?: string;
  ctaLabel?: string;
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <div className={className}>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {labels.map((label, index) => (
          <MediaFrame
            key={`${label}-${index}`}
            label={label}
            ratio="4/3"
            tone={tone}
            className={cn(index === 2 && "sm:col-span-2 lg:col-span-1")}
          />
        ))}
      </div>

      <div
        className={cn(
          "mt-10 border-t pt-10 text-center",
          dark ? "border-white/10" : "border-concrete-300",
        )}
      >
        <h3
          className={cn(
            "text-xl font-bold sm:text-2xl",
            dark ? "text-white" : "text-iron-900",
          )}
        >
          {heading}
        </h3>
        <p
          className={cn(
            "mx-auto mt-3 max-w-xl text-sm leading-relaxed sm:text-base",
            dark ? "text-concrete-400" : "text-iron-600",
          )}
        >
          {message ??
            "We photograph and film our work as jobs are completed. This gallery fills in with real Needham's Construction projects — no stock photography."}
        </p>
        <ButtonLink
          href={ctaHref}
          variant={dark ? "primary" : "secondary"}
          className="mt-7"
        >
          {ctaLabel}
        </ButtonLink>
      </div>
    </div>
  );
}
