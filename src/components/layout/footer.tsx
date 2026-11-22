import Link from "next/link";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { directionsUrl, navLinks, site, whatsappUrl } from "@/lib/site";
import { Container, Logo, Paw } from "@/components/ui/primitives";

const cols = [
  {
    title: "Veterinary Care",
    href: "/veterinary",
    items: ["Consultations", "Health check-ups", "Blood tests & panels", "Vaccinations", "Dental care", "Minor surgeries"],
  },
  {
    title: "Grooming & Spa",
    href: "/grooming",
    items: ["Bathing", "Haircuts", "Nail clipping", "Deshedding", "Dematting", "Pickup & drop"],
  },
  {
    title: "Pet Store",
    href: "/store",
    items: ["Food", "Treats", "Toys", "Collars & leashes", "Accessories"],
  },
];

export function Footer() {
  const wa = whatsappUrl();
  return (
    <footer className="relative overflow-hidden bg-teal-800 text-sage/80">
      {/* giant wordmark */}
      <div aria-hidden className="pointer-events-none absolute -bottom-[0.18em] left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[22vw] font-semibold leading-none text-teal/70">
        doggy woggy
      </div>
      <Container className="relative pb-40 pt-20 sm:pb-56">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div className="max-w-sm">
            <Link href="/" className="group inline-block" aria-label="Doggy Woggy home">
              <Logo light />
            </Link>
            <p className="mt-6 leading-relaxed">
              An all-in-one pet care destination in Bhandup West — veterinary care, grooming and everyday essentials for dogs and cats, all under one roof.
            </p>
            <div className="mt-6 flex gap-3">
              <SocialLink href={site.instagram} label="Instagram"><InstagramGlyph /></SocialLink>
              <SocialLink href={wa} label="WhatsApp"><MessageCircle className="size-5" /></SocialLink>
              <SocialLink href={site.phone ? `tel:${site.phone.replace(/\s/g, "")}` : null} label="Call"><Phone className="size-5" /></SocialLink>
            </div>
            {(!site.instagram || !wa || !site.phone) && (
              <p className="mt-3 text-xs text-sage/45">Social & contact links activate once verified details are added.</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Explore</h3>
              <ul className="mt-5 space-y-3 text-sm">
                {navLinks.map((l) => (
                  <li key={l.href}><Link href={l.href} className="transition hover:text-cream">{l.label}</Link></li>
                ))}
              </ul>
            </div>
            {cols.map((c) => (
              <div key={c.title}>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
                  <Link href={c.href} className="hover:text-cream">{c.title}</Link>
                </h3>
                <ul className="mt-5 space-y-3 text-sm">
                  {c.items.map((i) => (
                    <li key={i}><Link href={c.href} className="transition hover:text-cream">{i}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-4 border-t border-cream/10 pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {site.locations.map((l) => (
            <a key={l.id} href={directionsUrl(l.directionsQuery)} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 text-sm">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-teal text-gold transition group-hover:bg-coral group-hover:text-teal-800">
                <MapPin className="size-4" />
              </span>
              <span>
                <span className="block font-semibold text-cream">{l.label}</span>
                {l.place}, {l.area}
              </span>
            </a>
          ))}
          <div className="flex items-start gap-3 text-sm">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-teal text-gold"><Phone className="size-4" /></span>
            <span>
              <span className="block font-semibold text-cream">Call us</span>
              {site.phone ?? <span className="italic text-sage/50">Phone number to be added</span>}
            </span>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 text-xs text-sage/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Doggy Woggy, Bhandup West, Mumbai. All rights reserved.</p>
          <p className="flex items-center gap-1.5">Made with <Paw className="size-3.5 text-coral" /> for happy tails · Photos are illustrative</p>
        </div>
      </Container>
    </footer>
  );
}

function SocialLink({ href, label, children }: { href: string | null; label: string; children: React.ReactNode }) {
  const cls = "grid size-11 place-items-center rounded-full ring-1 ring-cream/15 transition";
  if (!href)
    return (
      <span className={`${cls} cursor-not-allowed opacity-45`} title={`${label} link coming soon`} aria-label={`${label} (coming soon)`}>
        {children}
      </span>
    );
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={`${cls} hover:bg-coral hover:text-teal-800 hover:ring-coral`}>
      {children}
    </a>
  );
}

function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-5" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
