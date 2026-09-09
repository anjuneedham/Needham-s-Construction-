import { cn } from "@/lib/utils";

/** A short amber hatch rule — the recurring construction motif. */
export function Rule({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "hatch block h-3 w-16",
        tone === "dark" ? "text-amber-400" : "text-amber-600",
        className,
      )}
    />
  );
}
