/**
 * ─────────────────────────────────────────────────────────────
 *  DOGGY WOGGY — SITE CONFIGURATION
 *  Replace every `null` below with verified business details.
 *  Anything left as `null` renders as a clearly-marked placeholder,
 *  so the demo never shows invented phone numbers, timings or addresses.
 * ─────────────────────────────────────────────────────────────
 */
export const site = {
  name: "Doggy Woggy",
  tagline: "Everything your furry family needs, all under one roof.",

  /** Display phone number, e.g. "+91 98XXX XXXXX". */
  phone: null as string | null,

  /**
   * WhatsApp number in international format WITHOUT "+" or spaces, e.g. "9198XXXXXXXX".
   * When set, the booking form opens WhatsApp with a pre-filled enquiry.
   */
  whatsapp: null as string | null,

  /** Instagram profile URL. */
  instagram: null as string | null,

  /** Opening hours — add once confirmed by the business. */
  hours: null as string | null,

  locations: [
    {
      id: "clinic",
      label: "Veterinary Clinic",
      place: "Mayuresh Shristi",
      area: "Bhandup West, Mumbai",
      /** Paste the Google Maps "Embed a map" iframe src here. */
      mapEmbedUrl: null as string | null,
      /** Search query used for the Directions button until an exact pin is supplied. */
      directionsQuery: "Mayuresh Shristi, Bhandup West, Mumbai",
    },
    {
      id: "store",
      label: "Pet Store",
      place: "L.B.S. Marg",
      area: "Bhandup West, Mumbai",
      mapEmbedUrl: null as string | null,
      directionsQuery: "L.B.S. Marg, Bhandup West, Mumbai",
    },
  ],

  pickupAreas: ["Bhandup", "Mulund", "Nahur", "Kanjurmarg"],
} as const;

export const directionsUrl = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export const whatsappUrl = (message?: string) =>
  site.whatsapp
    ? `https://wa.me/${site.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`
    : null;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Veterinary Clinic", href: "/veterinary" },
  { label: "Grooming & Spa", href: "/grooming" },
  { label: "Pet Store", href: "/store" },
  { label: "About Us", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;

export const serviceOptions = [
  "Veterinary consultation",
  "Vaccination",
  "Diagnostics",
  "Grooming",
  "Pickup and drop enquiry",
  "Other",
] as const;

export type ServiceOption = (typeof serviceOptions)[number];
