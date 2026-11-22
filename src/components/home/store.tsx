"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, Bone, Gift, Heart, Shirt, UtensilsCrossed, Link2 } from "lucide-react";
import { Container, LinkButton, SectionHeading } from "@/components/ui/primitives";
import { directionsUrl, site } from "@/lib/site";
import { cn, ease } from "@/lib/utils";

const tiles = [
  { title: "Food", note: "Everyday nutrition for dogs & cats", icon: UtensilsCrossed, img: "/images/store-food.jpg", alt: "A bowl of dry pet food on a wooden floor", span: "sm:col-span-2", tone: "bg-cream-200" },
  { title: "Treats", note: "Little rewards, big tail wags", icon: Bone, img: "/images/store-treats.jpg", alt: "Bone-shaped biscuits on a pink background", span: "", tone: "bg-[#f9dcd6]" },
  { title: "Toys", note: "Chew, fetch & play", icon: Heart, img: "/images/store-toy.jpg", alt: "A red rubber bone toy on a blue background", span: "", tone: "bg-[#cfe9ee]" },
  { title: "Collars & Leashes", note: "For every walk and adventure", icon: Link2, img: "/images/store-leash.jpg", alt: "Dogs on leashes enjoying a walk together", span: "sm:col-span-2 lg:col-span-1", tone: "bg-sage" },
  { title: "Accessories", note: "Beds, wear & cosy extras", icon: Shirt, img: "/images/store-hoodie.jpg", alt: "A French bulldog wearing a yellow hoodie", span: "sm:col-span-4 lg:col-span-1", tone: "bg-[#cfe3f2]" },
];

export function Store() {
  const store = site.locations.find((l) => l.id === "store")!;
  return (
    <section id="store" className="relative py-24 sm:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="The pet store"
            title={<>Little Things. <span className="italic text-coral-600 font-display-wonk">Big Tail Wags.</span></>}
            intro="From daily meals to the squeakiest toy on the shelf — pick up your pet's favourites at our store on L.B.S. Marg."
          />
          <LinkButton href={directionsUrl(store.directionsQuery)} external variant="teal" arrow>
            Visit Our Store
          </LinkButton>
        </div>

        <div className="mt-14 grid auto-rows-[15rem] gap-4 sm:grid-cols-4 sm:auto-rows-[14rem] lg:grid-cols-4 lg:auto-rows-[15.5rem]">
          {tiles.map(({ icon: Icon, ...t }, i) => (
            <motion.a
              key={t.title}
              href={directionsUrl(store.directionsQuery)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.title} — get directions to the Doggy Woggy pet store`}
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.8, ease, delay: i * 0.07 }}
              className={cn("group relative overflow-hidden rounded-[1.75rem]", t.tone, t.span, i === 0 && "row-span-2")}
            >
              <Image
                src={t.img}
                alt={t.alt}
                fill
                sizes={i === 0 ? "(min-width:640px) 50vw, 100vw" : "(min-width:1024px) 25vw, 50vw"}
                className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-800/70 via-transparent to-transparent opacity-90" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-cream sm:p-6">
                <div>
                  <span className="mb-3 inline-grid size-10 place-items-center rounded-xl bg-cream/95 text-teal transition-transform duration-500 group-hover:-rotate-12">
                    <Icon className="size-5" />
                  </span>
                  <h3 className={cn("font-display leading-none", i === 0 ? "text-4xl sm:text-5xl" : "text-[1.75rem]")}>{t.title}</h3>
                  <p className="mt-1.5 text-sm text-cream/85">{t.note}</p>
                </div>
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-coral text-teal-800 transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight className="size-5" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        <p className="mt-6 flex items-center gap-2 text-sm text-ink-soft">
          <Gift className="size-4 text-coral-600" />
          Seasonal essentials arrive through the year. Images are illustrative — visit or call the store for what&apos;s in stock today.
        </p>
      </Container>
    </section>
  );
}
