import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "onDark";
export type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-amber-500 text-iron-950 hover:bg-amber-400 active:bg-amber-600 shadow-sm",
  secondary:
    "bg-iron-900 text-white hover:bg-iron-800 active:bg-iron-950 shadow-sm",
  outline:
    "border border-concrete-300 bg-white text-iron-900 hover:border-iron-900 hover:bg-concrete-100",
  ghost: "text-iron-900 hover:bg-concrete-200",
  onDark:
    "border border-white/25 bg-white/5 text-white hover:border-white/60 hover:bg-white/10",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-14 px-7 text-base",
};

const baseClasses =
  "group inline-flex items-center justify-center gap-2.5 rounded-sm font-semibold tracking-tight transition-all duration-150 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

function classesFor(variant: ButtonVariant, size: ButtonSize, className?: string) {
  return cn(baseClasses, variantClasses[variant], sizeClasses[size], className);
}

interface SharedProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

type ButtonProps = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={classesFor(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}

type ButtonLinkProps = SharedProps & {
  href: string;
  /** Set for external links; adds target and rel automatically. */
  external?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href">;

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  external,
  ...rest
}: ButtonLinkProps) {
  const classes = classesFor(variant, size, className);
  const isExternal =
    external ??
    (href.startsWith("http") ||
      href.startsWith("tel:") ||
      href.startsWith("mailto:"));

  if (isExternal) {
    const isProtocolLink = href.startsWith("tel:") || href.startsWith("mailto:");
    return (
      <a
        href={href}
        className={classes}
        {...(isProtocolLink
          ? {}
          : { target: "_blank", rel: "noopener noreferrer" })}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
