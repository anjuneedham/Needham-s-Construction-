import { cn } from "@/lib/utils";
import { ImageIcon, VideoIcon } from "@/components/ui/Icons";

export type MediaRatio = "16/9" | "4/3" | "3/2" | "1/1" | "3/4" | "9/16";

export const ratioClasses: Record<MediaRatio, string> = {
  "16/9": "aspect-video",
  "4/3": "aspect-4/3",
  "3/2": "aspect-3/2",
  "1/1": "aspect-square",
  "3/4": "aspect-3/4",
  "9/16": "aspect-9/16",
};

/**
 * The designed stand-in shown wherever a real photo or video has not been
 * added yet. It reserves the exact space the final media will occupy, so
 * dropping a file into `src/data/*` swaps it in without the layout moving.
 */
export function MediaFrame({
  label,
  kind = "image",
  ratio = "4/3",
  tone = "light",
  className,
  note,
}: {
  label: string;
  kind?: "image" | "video";
  ratio?: MediaRatio;
  tone?: "light" | "dark";
  className?: string;
  /** Optional second line, e.g. "Hero video". */
  note?: string;
}) {
  const Glyph = kind === "video" ? VideoIcon : ImageIcon;
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden",
        ratioClasses[ratio],
        dark
          ? "bg-iron-850 ring-1 ring-white/10"
          : "bg-concrete-100 ring-1 ring-concrete-300",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "blueprint-grid absolute inset-0",
          dark ? "text-white/45" : "text-iron-500/50",
        )}
      />

      {/* Registration marks — the surveyor's corner ticks */}
      <span aria-hidden className="pointer-events-none absolute inset-3 sm:inset-4">
        {(
          [
            "left-0 top-0 border-l-2 border-t-2",
            "right-0 top-0 border-r-2 border-t-2",
            "left-0 bottom-0 border-l-2 border-b-2",
            "right-0 bottom-0 border-r-2 border-b-2",
          ] as const
        ).map((position) => (
          <span
            key={position}
            className={cn(
              "absolute h-5 w-5 sm:h-6 sm:w-6",
              dark ? "border-amber-400/70" : "border-amber-600/60",
              position,
            )}
          />
        ))}
      </span>

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
        <span
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-full",
            dark
              ? "bg-white/10 text-amber-300"
              : "bg-white text-amber-700 ring-1 ring-concrete-300",
          )}
        >
          <Glyph className="h-5 w-5" />
        </span>
        <span
          className={cn(
            "font-display text-sm font-semibold tracking-tight sm:text-base",
            dark ? "text-concrete-100" : "text-iron-800",
          )}
        >
          {label}
        </span>
        <span
          className={cn(
            "text-[0.68rem] font-medium tracking-[0.16em] uppercase",
            dark ? "text-concrete-400" : "text-concrete-600",
          )}
        >
          {note ?? (kind === "video" ? "Video to be added" : "Photography to be added")}
        </span>
      </div>
    </div>
  );
}
