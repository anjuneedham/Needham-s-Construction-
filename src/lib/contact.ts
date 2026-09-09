/**
 * Contact helpers.
 *
 * Every phone, WhatsApp and email link on the site is built here from
 * `src/data/contact.ts`. Nothing renders a hard-coded number, and nothing
 * renders a link at all until the matching detail has been filled in — so
 * the site can never show a dead or invented contact route.
 */

import { contact } from "@/data/contact";
import { company } from "@/data/company";

const digits = (value: string) => value.replace(/\D/g, "");

/* ------------------------------------------------------------------ phone */

export const hasPhone = Boolean(contact.phone.e164 && contact.phone.display);

/** "tel:+18765550123" — only call when `hasPhone` is true. */
export function telHref(): string {
  return `tel:+${digits(contact.phone.e164)}`;
}

export const phoneDisplay = contact.phone.display;

/* --------------------------------------------------------------- whatsapp */

export const hasWhatsApp = Boolean(contact.whatsapp.number);

/** Builds a wa.me link, optionally with a pre-filled message. */
export function whatsappHref(message?: string): string {
  const text = message ?? contact.whatsapp.defaultMessage;
  const query = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${digits(contact.whatsapp.number)}${query}`;
}

/* ------------------------------------------------------------------ email */

export const hasEmail = Boolean(contact.email);

export function mailtoHref(subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString();
  return `mailto:${contact.email}${query ? `?${query}` : ""}`;
}

/* ------------------------------------------------------------------ areas */

/** "Serving clients across Jamaica" until specific areas are listed. */
export function serviceAreaLabel(): string {
  const areas = contact.serviceAreas;
  if (areas.length === 0) return "Serving clients across Jamaica";
  if (areas.length === 1) return `Serving ${areas[0]} and the surrounding area`;
  const last = areas[areas.length - 1];
  return `Serving ${areas.slice(0, -1).join(", ")} and ${last}`;
}

/* ------------------------------------------------------- derived summary --*/

/** True when at least one direct channel is live. */
export const hasAnyDirectChannel = hasPhone || hasWhatsApp || hasEmail;

export const quoteEmailSubject = `Quote request — ${company.name}`;
