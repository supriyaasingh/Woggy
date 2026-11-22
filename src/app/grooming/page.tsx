import type { Metadata } from "next";
import { GroomingContent } from "@/components/pages/grooming-content";

export const metadata: Metadata = {
  title: "Grooming & Spa",
  description:
    "Bathing, haircuts, nail clipping, deshedding, dematting and spa care for dogs and cats — with ventilated, CCTV-equipped pickup & drop across Bhandup, Mulund, Nahur and Kanjurmarg.",
};

export default function Page() {
  return <GroomingContent />;
}
