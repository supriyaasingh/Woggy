import type { Metadata } from "next";
import { VeterinaryContent } from "@/components/pages/veterinary-content";

export const metadata: Metadata = {
  title: "Veterinary Clinic",
  description:
    "Consultations, health check-ups, blood tests, vaccinations, dental care and minor surgeries for dogs and cats at Doggy Woggy, Mayuresh Shristi, Bhandup West.",
};

export default function Page() {
  return <VeterinaryContent />;
}
