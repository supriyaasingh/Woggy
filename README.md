# Doggy Woggy — Premium Pet Care Website (Client Demo)

A design demo for **Doggy Woggy**, an all-in-one pet care business in Bhandup West, Mumbai: veterinary clinic, grooming & spa, and pet store.

> ⚠️ **Demo only.** Not deployed or published. No live booking backend, payments or analytics are connected.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production check
```

## Stack
Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Motion for React (`motion/react`) · Lucide icons · Fraunces + Plus Jakarta Sans (via `next/font`).

## Pages
- `/` — Home: hero, intro, services, vet feature, grooming experience, pickup & drop, store, why us, gallery, testimonials (demo), contact, final CTA
- `/veterinary`, `/grooming`, `/store` — dedicated service pages

## Before going live — fill in `src/lib/site.ts`
Everything unverified is `null` and renders as a clearly marked placeholder:

| Field | Effect when set |
|---|---|
| `phone` | Shows click-to-call number in contact cards & footer |
| `whatsapp` | Booking form opens WhatsApp with a pre-filled enquiry; floating button becomes "WhatsApp us" |
| `instagram` | Activates the footer Instagram link |
| `hours` | Shows opening hours on location cards |
| `locations[].mapEmbedUrl` | Replaces the illustrated map with a real Google Maps embed |

Also:
- **Testimonials** (`src/components/home/testimonials.tsx`) are labelled *sample reviews*. Replace them with genuine customer reviews.
- **Photography** in `public/images` is illustrative stock (Unsplash) and is labelled as such on the site. Swap in real Doggy Woggy photos when available.

## Design system
| Token | Hex | Use |
|---|---|---|
| Deep Teal | `#123F3A` | Navigation, headings, key sections, footer |
| Warm Cream | `#FFF8ED` | Primary background |
| Sage | `#D8E8D6` | Wellness & grooming surfaces |
| Coral | `#F28B62` | Booking / appointment CTAs |
| Golden Yellow | `#F5C66A` | Small decorative accents |
| Dark Text | `#242D29` | Body copy |

Animations respect `prefers-reduced-motion` (global `MotionConfig reducedMotion="user"` plus per-component checks).
