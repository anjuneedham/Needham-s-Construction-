import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { company } from "@/data/company";

/**
 * The mark: an "N" built from two upright bars and a diagonal beam, with a
 * spirit-level vial and bubble set into the diagonal. It's a nod to "level
 * lines" — the standard the company holds its own work to (see
 * src/data/company.ts values) — not just a letterform.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden
      focusable={false}
      className={className}
    >
      <rect width="40" height="40" fill="var(--color-amber-500)" />
      <rect x="7" y="7" width="6" height="26" fill="var(--color-iron-950)" />
      <rect x="27" y="7" width="6" height="26" fill="var(--color-iron-950)" />
      <polygon points="7,7 13,7 33,33 27,33" fill="var(--color-iron-950)" />
      <rect
        x="13"
        y="18"
        width="14"
        height="4"
        rx="2"
        transform="rotate(45 20 20)"
        fill="var(--color-amber-500)"
      />
      <circle cx="20" cy="20" r="1.6" fill="var(--color-iron-950)" />
    </svg>
  );
}

/**
 * Wordmark. Drop a logo file into /public and set `company.logo` in
 * src/data/company.ts and it is used instead — no code change needed.
 */
export function Logo({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const onDark = tone === "dark";

  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-3", className)}
      aria-label={`${company.name} — home`}
    >
      {company.logo ? (
        <Image
          src={company.logo}
          alt={company.name}
          width={600}
          height={600}
          priority
          className="h-11 w-11 shrink-0 rounded-md transition-transform duration-200 group-hover:scale-105 sm:h-12 sm:w-12"
        />
      ) : (
        <>
          <LogoMark className="h-9 w-9 shrink-0 transition-transform duration-200 group-hover:scale-105 sm:h-10 sm:w-10" />
          <span className="flex flex-col leading-none">
            <span
              className={cn(
                "font-display text-[1.05rem] font-extrabold tracking-tight sm:text-xl",
                onDark ? "text-white" : "text-iron-900",
              )}
            >
              NEEDHAM&rsquo;S
            </span>
            <span
              className={cn(
                "mt-0.5 text-[0.6rem] font-semibold tracking-[0.3em] sm:text-[0.65rem]",
                onDark ? "text-amber-400" : "text-amber-700",
              )}
            >
              CONSTRUCTION
            </span>
          </span>
        </>
      )}
    </Link>
  );
}
