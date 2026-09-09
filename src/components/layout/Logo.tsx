import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { company } from "@/data/company";

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
          width={160}
          height={40}
          priority
          className="h-9 w-auto sm:h-10"
        />
      ) : (
        <>
          <span
            aria-hidden
            className="flex h-9 w-9 shrink-0 items-center justify-center bg-amber-500 sm:h-10 sm:w-10"
          >
            <span className="font-display text-lg leading-none font-extrabold text-iron-950 sm:text-xl">
              N
            </span>
          </span>
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
