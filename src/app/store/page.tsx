import type { Metadata } from "next";
import { StoreContent } from "@/components/pages/store-content";

export const metadata: Metadata = {
  title: "Pet Store",
  description: "Pet food, treats, toys, collars, leashes and accessories at the Doggy Woggy pet store on L.B.S. Marg, Bhandup West, Mumbai.",
};

export default function Page() {
  return <StoreContent />;
}
