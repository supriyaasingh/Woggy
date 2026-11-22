import { Hero } from "@/components/home/hero";
import { Intro } from "@/components/home/intro";
import { Marquee } from "@/components/home/marquee";
import { Services } from "@/components/home/services";
import { VetFeature } from "@/components/home/vet-feature";
import { Grooming } from "@/components/home/grooming";
import { Pickup } from "@/components/home/pickup";
import { Store } from "@/components/home/store";
import { Why } from "@/components/home/why";
import { Gallery } from "@/components/home/gallery";
import { Testimonials } from "@/components/home/testimonials";
import { Contact } from "@/components/home/contact";
import { FinalCta } from "@/components/home/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Intro />
      <Services />
      <VetFeature />
      <Grooming />
      <Pickup />
      <Store />
      <Marquee tone="teal" tilt={false} />
      <Why />
      <Gallery />
      <Testimonials />
      <Contact />
      <FinalCta />
    </>
  );
}
