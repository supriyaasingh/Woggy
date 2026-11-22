"use client";

import { Bath, Brush, Ear, Leaf, Pill, Scissors, Sparkles, Wind, PawPrint } from "lucide-react";
import { PageHero } from "@/components/pages/page-hero";
import { ServiceList } from "@/components/pages/service-list";
import { Grooming } from "@/components/home/grooming";
import { Pickup } from "@/components/home/pickup";
import { FinalCta } from "@/components/home/final-cta";
import { BookButton } from "@/components/booking/book-button";
import { LinkButton } from "@/components/ui/primitives";

const items = [
  { icon: Bath, title: "Bathing", text: "A relaxing wash with gentle products, followed by a fluffy blow-dry." },
  { icon: Scissors, title: "Haircuts", text: "Neat trims and styles that keep your pet comfortable and looking sharp." },
  { icon: PawPrint, title: "Nail clipping", text: "Careful, calm nail trims for comfortable paws and happier walks." },
  { icon: Ear, title: "Ear & eye cleaning", text: "Gentle hygiene care for sensitive areas that are easy to miss at home." },
  { icon: Brush, title: "Brushing", text: "A thorough brush-out for a soft, shiny, tangle-free coat." },
  { icon: Pill, title: "Medicated baths", text: "Therapeutic baths for pets with sensitive or irritated skin." },
  { icon: Leaf, title: "Organic baths", text: "A gentler bath option using organic products." },
  { icon: Wind, title: "Deshedding", text: "Removes loose undercoat so there's less fur around your home." },
  { icon: Sparkles, title: "Dematting", text: "Patient detangling of mats and knots, prioritising your pet's comfort." },
];

export function GroomingContent() {
  return (
    <>
      <PageHero
        tone="sage"
        eyebrow="Your pet's salon"
        crumb="Grooming & Spa"
        title={<>Pamper. Groom. <span className="italic text-coral-700 font-display-wonk">Repeat.</span></>}
        intro="Give your furry friend the care and comfort they deserve with professional grooming services — plus pet-safe pickup and drop across Bhandup, Mulund, Nahur and Kanjurmarg."
        image="/images/groom-dryer.jpg"
        imageAlt="A groomer blow-drying a fluffy dog"
        actions={
          <>
            <BookButton service="Grooming">Book Grooming</BookButton>
            <LinkButton href="#pickup" variant="ghost">About Pickup &amp; Drop</LinkButton>
          </>
        }
      />
      <ServiceList
        eyebrow="Grooming menu"
        title={<>Spa days, <span className="italic text-coral-600 font-display-wonk">the pet way.</span></>}
        intro="Tell us about your pet's coat, temperament and preferences — we'll tailor each session to them."
        items={items}
      />
      <Grooming />
      <Pickup />
      <FinalCta />
    </>
  );
}
