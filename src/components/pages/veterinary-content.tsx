"use client";

import { Activity, Bone, Droplets, FlaskConical, HeartPulse, Scissors, ShieldPlus, Stethoscope, Syringe } from "lucide-react";
import { PageHero } from "@/components/pages/page-hero";
import { ServiceList } from "@/components/pages/service-list";
import { VetFeature } from "@/components/home/vet-feature";
import { Contact } from "@/components/home/contact";
import { FinalCta } from "@/components/home/final-cta";
import { Marquee } from "@/components/home/marquee";
import { BookButton } from "@/components/booking/book-button";
import { LinkButton } from "@/components/ui/primitives";

const items = [
  { icon: Stethoscope, title: "General consultations", text: "A thorough, unhurried examination and honest advice on what your pet needs." },
  { icon: HeartPulse, title: "Health check-ups", text: "Routine wellness checks to keep an eye on weight, coat, teeth and overall health." },
  { icon: FlaskConical, title: "Blood tests", text: "Diagnostic blood work to understand what's happening on the inside." },
  { icon: Activity, title: "CBC, liver & kidney panels", text: "Detailed panels that support early detection and informed treatment." },
  { icon: Syringe, title: "Vaccinations", text: "Protection for puppies, kittens and adult pets, on a schedule we'll help you track." },
  { icon: Droplets, title: "IV fluid therapy", text: "Supportive fluid therapy for pets who need help with hydration and recovery." },
  { icon: Bone, title: "Dental care", text: "Because healthy teeth and gums mean a happier, more comfortable pet." },
  { icon: ShieldPlus, title: "Minor surgeries", text: "Carefully performed minor procedures with gentle aftercare guidance." },
  { icon: Scissors, title: "Spaying & neutering", text: "Responsible, routine procedures with clear pre- and post-op advice." },
];

export function VeterinaryContent() {
  return (
    <>
      <PageHero
        eyebrow="Your pet's doctor"
        crumb="Veterinary Clinic"
        title={<>Expert <span className="italic text-coral-600 font-display-wonk">Veterinary</span> Care</>}
        intro="From routine health check-ups to diagnostics and treatment, we care for your pet's health at every stage — at our clinic in Mayuresh Shristi, Bhandup West."
        image="/images/vet-cat.jpg"
        imageAlt="A veterinarian examining a tabby cat"
        actions={
          <>
            <BookButton service="Veterinary consultation">Book a Veterinary Visit</BookButton>
            <LinkButton href="#contact" variant="ghost">Find the Clinic</LinkButton>
          </>
        }
      />
      <ServiceList
        eyebrow="Clinic services"
        title={<>Everything they need to <span className="italic text-coral-600 font-display-wonk">feel their best.</span></>}
        intro="Every pet is different. We take time to understand yours — and to explain every step to you clearly."
        items={items}
      />
      <Marquee />
      <VetFeature />
      <Contact />
      <FinalCta />
    </>
  );
}
