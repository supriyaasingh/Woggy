import type { ServiceOption } from "./site";

export const vetServices = [
  "General consultations",
  "Health check-ups",
  "Blood tests",
  "CBC, liver and kidney panels",
  "Vaccinations",
  "IV fluid therapy",
  "Dental care",
  "Minor surgeries",
  "Spaying and neutering",
];

export const groomingServices = [
  "Bathing",
  "Haircuts",
  "Nail clipping",
  "Ear and eye cleaning",
  "Brushing",
  "Medicated baths",
  "Organic baths",
  "Deshedding",
  "Dematting",
];

export const storeCategories = [
  "Pet food",
  "Treats",
  "Toys",
  "Collars",
  "Leashes",
  "Accessories",
  "Seasonal essentials",
];

export type ServiceCard = {
  key: "vet" | "groom" | "store";
  label: string;
  title: string;
  description: string;
  items: string[];
  cta: string;
  href: string;
  image: string;
  imageAlt: string;
  booking: ServiceOption;
};

export const serviceCards: ServiceCard[] = [
  {
    key: "vet",
    label: "Your Pet's Doctor",
    title: "Expert Veterinary Care",
    description:
      "From routine health check-ups to diagnostics and treatment, we care for your pet's health at every stage.",
    items: vetServices,
    cta: "Explore Veterinary Care",
    href: "/veterinary",
    image: "/images/vet-cat.jpg",
    imageAlt: "A veterinarian gently examining a tabby cat",
    booking: "Veterinary consultation",
  },
  {
    key: "groom",
    label: "Your Pet's Salon",
    title: "Pamper. Groom. Repeat.",
    description: "Give your furry friend the care and comfort they deserve with professional grooming services.",
    items: groomingServices,
    cta: "Explore Grooming",
    href: "/grooming",
    image: "/images/groom-shihtzu.jpg",
    imageAlt: "A freshly groomed Shih Tzu with a bow, smiling",
    booking: "Grooming",
  },
  {
    key: "store",
    label: "Your Pet's Supermarket",
    title: "Everything Your Pet Loves.",
    description: "Discover everyday essentials and little surprises for your furry companion.",
    items: storeCategories,
    cta: "Explore Pet Store",
    href: "/store",
    image: "/images/store-toydog.jpg",
    imageAlt: "A golden dog proudly holding a soft toy",
    booking: "Other",
  },
];
