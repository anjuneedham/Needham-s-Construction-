import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-xs font-semibold tracking-[0.18em] uppercase",
        tone === "dark" ? "text-amber-400" : "text-amber-700",
        className,
      )}
    >
      <span aria-hidden className="hatch h-3 w-6 shrink-0 opacity-70" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  align = "left",
  tone = "light",
  level = 2,
  className,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  id?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  level?: 2 | 3;
  className?: string;
  children?: ReactNode;
}) {
  const Tag = (level === 2 ? "h2" : "h3") as "h2" | "h3";

  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Eyebrow
          tone={tone}
          className={align === "center" ? "justify-center" : undefined}
        >
          {eyebrow}
        </Eyebrow>
      ) : null}
      <Tag
        id={id}
        className={cn(
          "mt-4 text-3xl leading-[1.1] font-bold sm:text-4xl lg:text-[2.75rem]",
          tone === "dark" ? "text-white" : "text-iron-900",
        )}
      >
        {title}
      </Tag>
      {description ? (
        <div
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            tone === "dark" ? "text-concrete-300" : "text-iron-600",
          )}
        >
          {description}
        </div>
      ) : null}
      {children}
    </div>
  );
}
