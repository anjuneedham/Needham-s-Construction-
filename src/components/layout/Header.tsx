"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { primaryNav } from "@/data/navigation";
import { hasPhone, phoneDisplay, telHref } from "@/lib/contact";
import {
  ChevronDownIcon,
  CloseIcon,
  MenuIcon,
  PhoneIcon,
} from "@/components/ui/Icons";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-iron-950">
      <Container size="wide">
        <div className="flex h-16 items-center justify-between gap-4 lg:h-20">
          <Logo />

          {/* ------------------------------------------------ desktop nav */}
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) =>
                item.children ? (
                  <ServicesMenu
                    key={item.href}
                    item={item}
                    pathname={pathname}
                  />
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(pathname, item.href) ? "page" : undefined}
                      className={cn(
                        "inline-flex h-10 items-center rounded-sm px-3.5 text-sm font-semibold transition-colors",
                        isActive(pathname, item.href)
                          ? "text-amber-400"
                          : "text-concrete-200 hover:text-white",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          {/* --------------------------------------------- desktop actions */}
          <div className="hidden items-center gap-3 lg:flex">
            {hasPhone ? (
              <a
                href={telHref()}
                className="inline-flex h-11 items-center gap-2 rounded-sm px-3 text-sm font-semibold text-concrete-100 transition-colors hover:text-amber-400"
              >
                <PhoneIcon className="h-4 w-4" />
                <span>{phoneDisplay}</span>
              </a>
            ) : null}
            <Link
              href="/contact#quote"
              className="inline-flex h-11 items-center rounded-sm bg-amber-500 px-5 text-sm font-semibold text-iron-950 transition-colors hover:bg-amber-400"
            >
              Request a Quote
            </Link>
          </div>

          {/* ----------------------------------------------- mobile toggle */}
          <div className="flex items-center gap-1 lg:hidden">
            {hasPhone ? (
              <a
                href={telHref()}
                aria-label={`Call ${phoneDisplay}`}
                className="flex h-11 w-11 items-center justify-center rounded-sm text-concrete-100 transition-colors hover:text-amber-400"
              >
                <PhoneIcon className="h-5 w-5" />
              </a>
            ) : null}
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="flex h-11 w-11 items-center justify-center rounded-sm text-white transition-colors hover:text-amber-400"
            >
              <span className="sr-only">
                {mobileOpen ? "Close menu" : "Open menu"}
              </span>
              {mobileOpen ? (
                <CloseIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </Container>

      <MobileMenu open={mobileOpen} pathname={pathname} />
      <span aria-hidden className="hatch block h-1 w-full text-amber-500/60" />
    </header>
  );
}

/* ---------------------------------------------------------- desktop menu */

function ServicesMenu({
  item,
  pathname,
}: {
  item: (typeof primaryNav)[number];
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const wrapperRef = useRef<HTMLLIElement>(null);
  const active = isActive(pathname, item.href);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <li
      ref={wrapperRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setOpen(false);
        }
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex h-10 items-center gap-1.5 rounded-sm px-3.5 text-sm font-semibold transition-colors",
          active ? "text-amber-400" : "text-concrete-200 hover:text-white",
        )}
      >
        {item.label}
        <ChevronDownIcon
          className={cn(
            "h-4 w-4 transition-transform duration-150",
            open && "rotate-180",
          )}
        />
      </button>

      <div
        id={menuId}
        hidden={!open}
        className="absolute top-full left-0 w-72 border border-white/10 bg-iron-900 p-2 shadow-2xl"
      >
        <ul>
          <li>
            <Link
              href={item.href}
              className="block rounded-sm px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/5 hover:text-amber-400"
            >
              All Services
            </Link>
          </li>
          <li aria-hidden className="my-1 border-t border-white/10" />
          {item.children?.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                aria-current={pathname === child.href ? "page" : undefined}
                className={cn(
                  "block rounded-sm px-3 py-2.5 text-sm transition-colors hover:bg-white/5 hover:text-amber-400",
                  pathname === child.href
                    ? "text-amber-400"
                    : "text-concrete-300",
                )}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

/* ----------------------------------------------------------- mobile menu */

function MobileMenu({ open, pathname }: { open: boolean; pathname: string }) {
  return (
    <div
      id="mobile-menu"
      hidden={!open}
      className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-white/10 bg-iron-950 lg:hidden"
    >
      <nav aria-label="Mobile" className="px-5 pt-6 pb-28 sm:px-8">
        <ul className="space-y-1">
          {primaryNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                className={cn(
                  "block border-b border-white/5 py-4 font-display text-xl font-bold transition-colors",
                  isActive(pathname, item.href)
                    ? "text-amber-400"
                    : "text-white hover:text-amber-400",
                )}
              >
                {item.label}
              </Link>

              {item.children ? (
                <ul className="mt-1 mb-2 space-y-1 pl-4">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        aria-current={pathname === child.href ? "page" : undefined}
                        className={cn(
                          "block py-2.5 text-base transition-colors",
                          pathname === child.href
                            ? "text-amber-400"
                            : "text-concrete-300 hover:text-white",
                        )}
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>

        <Link
          href="/contact#quote"
          className="mt-8 flex h-14 w-full items-center justify-center rounded-sm bg-amber-500 font-semibold text-iron-950 transition-colors hover:bg-amber-400"
        >
          Request a Quote
        </Link>
      </nav>
    </div>
  );
}
