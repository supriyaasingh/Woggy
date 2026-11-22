"use client";

import { PageHero } from "@/components/pages/page-hero";
import { Store } from "@/components/home/store";
import { Contact } from "@/components/home/contact";
import { FinalCta } from "@/components/home/final-cta";
import { Marquee } from "@/components/home/marquee";
import { BookButton } from "@/components/booking/book-button";
import { LinkButton } from "@/components/ui/primitives";
import { directionsUrl, site } from "@/lib/site";

export function StoreContent() {
  const store = site.locations.find((l) => l.id === "store")!;
  return (
    <>
      <PageHero
        tone="gold"
        eyebrow="Your pet's supermarket"
        crumb="Pet Store"
        title={<>Everything Your Pet <span className="italic text-coral-600 font-display-wonk">Loves.</span></>}
        intro="Discover everyday essentials and little surprises for your furry companion — food, treats, toys, collars, leashes, accessories and seasonal essentials at our store on L.B.S. Marg, Bhandup West."
        image="/images/store-bed.jpg"
        imageAlt="A happy dog relaxing in a cosy pet bed"
        actions={
          <>
            <LinkButton href={directionsUrl(store.directionsQuery)} external arrow>Visit Our Store</LinkButton>
            <BookButton service="Other" variant="ghost" arrow={false}>Ask About a Product</BookButton>
          </>
        }
      />
      <Store />
      <Marquee tone="teal" tilt={false} />
      <Contact />
      <FinalCta />
    </>
  );
}
