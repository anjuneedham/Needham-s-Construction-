/**
 * NAVIGATION — header and footer link structure.
 *
 * The Services dropdown is built from `src/data/services.ts`, so adding a
 * service automatically adds it to the menu.
 */

import { services } from "./services";

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: services.map((service) => ({
      label: service.shortName ?? service.name,
      href: `/services/${service.slug}`,
    })),
  },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerQuickLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "All Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Request a Quote", href: "/contact#quote" },
];
