/**
 * Quote request — shared shape and validation.
 *
 * Used by both the browser form and the API route, so the rules can't drift
 * apart. No third-party form library, no runtime dependency.
 */

import { services } from "@/data/services";

export const contactMethods = ["Phone call", "WhatsApp", "Email"] as const;
export type ContactMethod = (typeof contactMethods)[number];

export interface QuoteRequest {
  name: string;
  phone: string;
  email: string;
  service: string;
  location: string;
  details: string;
  preferredContact: ContactMethod | "";
  /** Anti-spam honeypot — must stay empty. Never shown to real visitors. */
  company?: string;
}

export const emptyQuoteRequest: QuoteRequest = {
  name: "",
  phone: "",
  email: "",
  service: "",
  location: "",
  details: "",
  preferredContact: "",
  company: "",
};

export type QuoteErrors = Partial<Record<keyof QuoteRequest, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Accepts local and international formats: 7–15 digits, common separators. */
const phonePattern = /^\+?[\d\s().-]{7,20}$/;

export const serviceOptions = [
  ...services.map((service) => service.name),
  "Something else",
];

export function validateQuoteRequest(values: QuoteRequest): QuoteErrors {
  const errors: QuoteErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }

  const phone = values.phone.trim();
  if (!phone) {
    errors.phone = "Please enter a phone number we can reach you on.";
  } else if (!phonePattern.test(phone) || phone.replace(/\D/g, "").length < 7) {
    errors.phone = "Please enter a valid phone number.";
  }

  const email = values.email.trim();
  if (email && !emailPattern.test(email)) {
    errors.email = "Please enter a valid email address, or leave it blank.";
  }

  if (!values.service) {
    errors.service = "Please choose the service you need.";
  }

  if (values.location.trim().length < 2) {
    errors.location = "Please tell us where the work is (town or parish).";
  }

  if (values.details.trim().length < 15) {
    errors.details =
      "Please give us a little more detail — at least a sentence about the job.";
  }

  if (!values.preferredContact) {
    errors.preferredContact = "Please choose how you'd like us to reply.";
  }

  if (values.preferredContact === "Email" && !email) {
    errors.email = "Add an email address so we can reply that way.";
  }

  return errors;
}

/** Plain-text version of a request, used for email and WhatsApp hand-off. */
export function formatQuoteRequest(values: QuoteRequest): string {
  return [
    `Name: ${values.name.trim()}`,
    `Phone: ${values.phone.trim()}`,
    values.email.trim() ? `Email: ${values.email.trim()}` : null,
    `Service: ${values.service}`,
    `Location: ${values.location.trim()}`,
    `Preferred contact: ${values.preferredContact}`,
    "",
    "Project details:",
    values.details.trim(),
  ]
    .filter((line) => line !== null)
    .join("\n");
}
