import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Container } from "./Container";

type Tone = "light" | "muted" | "dark" | "none";

const toneClasses: Record<Tone, string> = {
  light: "bg-concrete-50 text-iron-800",
  muted: "bg-concrete-100 text-iron-800",
  dark: "bg-iron-900 text-concrete-100",
  none: "",
};

export function Section({
  children,
  id,
  tone = "light",
  className,
  containerSize = "default",
  as: Tag = "section",
  labelledBy,
}: {
  children: ReactNode;
  id?: string;
  tone?: Tone;
  className?: string;
  containerSize?: "default" | "narrow" | "wide";
  as?: ElementType;
  labelledBy?: string;
}) {
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "scroll-mt-24 py-16 sm:py-20 lg:py-24",
        toneClasses[tone],
        className,
      )}
    >
      <Container size={containerSize}>{children}</Container>
    </Tag>
  );
}
