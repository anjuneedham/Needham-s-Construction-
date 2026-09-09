import { cn } from "@/lib/utils";
import { SocialGlyph } from "@/components/ui/Icons";
import { socials } from "@/data/social";

export const liveSocials = socials.filter((profile) => profile.url);
export const pendingSocials = socials.filter((profile) => !profile.url);

/**
 * Social icons.
 *
 * Profiles with a URL become links. Profiles without one render as a quiet,
 * non-interactive state — never a dead link and never an invented URL. Paste
 * a URL into src/data/social.ts and the icon becomes live everywhere at once.
 */
export function SocialLinks({
  tone = "dark",
  showPending = true,
  className,
  size = "md",
}: {
  tone?: "light" | "dark";
  showPending?: boolean;
  className?: string;
  size?: "sm" | "md";
}) {
  const dark = tone === "dark";
  const visible = showPending ? socials : liveSocials;
  if (visible.length === 0) return null;

  const box = size === "sm" ? "h-9 w-9" : "h-11 w-11";
  const glyph = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {visible.map((profile) => {
        const shared = cn(
          "flex items-center justify-center rounded-sm border transition-colors",
          box,
        );

        return (
          <li key={profile.platform}>
            {profile.url ? (
              <a
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  shared,
                  dark
                    ? "border-white/15 text-concrete-200 hover:border-amber-400 hover:text-amber-400"
                    : "border-concrete-300 text-iron-700 hover:border-amber-600 hover:text-amber-700",
                )}
              >
                <SocialGlyph platform={profile.platform} className={glyph} />
                <span className="sr-only">
                  {profile.label}
                  {profile.handle ? ` — @${profile.handle}` : ""} (opens in a new tab)
                </span>
              </a>
            ) : (
              <span
                aria-disabled="true"
                title={`${profile.label} profile coming soon`}
                className={cn(
                  shared,
                  "cursor-default",
                  dark
                    ? "border-white/10 text-white/25"
                    : "border-concrete-300 text-concrete-400",
                )}
              >
                <SocialGlyph platform={profile.platform} className={glyph} />
                <span className="sr-only">
                  {profile.label} — profile coming soon
                </span>
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
