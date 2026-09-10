import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialGlyph, ArrowRightIcon } from "@/components/ui/Icons";
import { socials } from "@/data/social";

/**
 * "Follow Our Work".
 *
 * Each platform gets a tile. A tile with a URL is a live link; one without
 * shows a quiet pending state rather than a fake profile. This section is
 * also where an embedded feed (Instagram, TikTok or Facebook) can be dropped
 * in later — the layout already reserves the room for it.
 */
export function SocialSection() {
  const liveCount = socials.filter((profile) => profile.url).length;

  return (
    <Section tone="light" labelledBy="social-heading">
      <SectionHeading
        id="social-heading"
        eyebrow="Follow our work"
        title="See jobs as they happen"
        description={
          liveCount > 0
            ? "We post photos and videos of work in progress and finished jobs. Follow along for the latest."
            : "We're setting up our social channels now. Photos and videos of completed work will be posted there as jobs are finished."
        }
      />

      <ul className="mt-12 grid gap-6 sm:grid-cols-3">
        {socials.map((profile) => {
          const live = Boolean(profile.url);

          const inner = (
            <>
              <span
                className={
                  live
                    ? "flex h-12 w-12 items-center justify-center rounded-sm bg-iron-900 text-white transition-colors group-hover:bg-amber-500 group-hover:text-iron-950"
                    : "flex h-12 w-12 items-center justify-center rounded-sm bg-concrete-200 text-concrete-600"
                }
              >
                <SocialGlyph platform={profile.platform} className="h-6 w-6" />
              </span>

              <span className="mt-5 block font-display text-lg font-bold text-iron-900">
                {profile.label}
              </span>

              <span
                className={
                  live
                    ? "mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700"
                    : "mt-2 block text-sm text-iron-500"
                }
              >
                {live ? (
                  <>
                    {profile.handle ? `@${profile.handle}` : "Visit profile"}
                    <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </>
                ) : (
                  "Profile launching soon"
                )}
              </span>
            </>
          );

          return (
            <li key={profile.platform}>
              {live ? (
                <a
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full bg-white p-7 ring-1 ring-concrete-300 transition-shadow hover:shadow-lg"
                >
                  {inner}
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : (
                <div className="h-full bg-concrete-100 p-7 ring-1 ring-concrete-300">
                  {inner}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
