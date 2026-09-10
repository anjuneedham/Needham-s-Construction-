/**
 * CONTACT DETAILS — the single source of truth for how people reach you.
 *
 * ▸ Add the phone number below and every "Call Now" button, tel: link,
 *   WhatsApp button, footer entry and the mobile contact bar switch on
 *   automatically. Nothing else needs to change.
 * ▸ Anything left blank is simply not shown — the site never displays a
 *   placeholder number or a dead link.
 */

import type { BusinessHours } from "@/types/content";

export const contact = {
  phone: {
    /** How the number is shown on screen, e.g. "(876) 555 0123". */
    display: "(876) 860-7659",
    /** Digits only, with country code, for tel: links, e.g. "18765550123". */
    e164: "18768607659",
  },

  whatsapp: {
    /** Digits only, with country code, e.g. "18765550123". Often the same number. */
    number: "18765630312",
    /** Pre-filled first message when someone taps "WhatsApp Us". */
    defaultMessage:
      "Hi Needham's Construction, I'd like to ask about a project.",
  },

  /** e.g. "info@needhamsconstruction.com" */
  email: "support@needhamsconstruction.online",

  /**
   * Where you work. Leave the array empty and the site says
   * "Serving clients across Jamaica".
   * Example: ["Kingston", "St. Andrew", "St. Catherine"]
   */
  serviceAreas: [
    "Kingston",
    "St. Andrew",
    "St. Catherine",
  ] as string[],

  /**
   * OPTIONAL — only fill in if you want a public address listed.
   * Needed for a Google Business Profile / LocalBusiness structured data.
   */
  address: {
    street: "",
    city: "",
    parish: "",
    postalCode: "",
    country: "Jamaica",
    countryCode: "JM",
  },

  /** OPTIONAL — decimal degrees, for map listings. */
  geo: {
    latitude: null as number | null,
    longitude: null as number | null,
  },

  /**
   * OPTIONAL — opening hours. Leave the array empty and no hours are shown.
   * Example: [{ day: "Monday", opens: "08:00", closes: "17:00" }, …]
   */
  hours: [] as BusinessHours[],

  /** OPTIONAL — a Google Maps "embed" iframe src, shown on the contact page. */
  mapEmbedUrl: "",
};

export type Contact = typeof contact;
