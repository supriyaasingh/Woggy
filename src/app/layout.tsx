import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { MotionProvider } from "@/components/layout/motion-provider";
import "./globals.css";
import { BookingProvider } from "@/components/booking/booking-context";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { QuickContact } from "@/components/layout/quick-contact";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Doggy Woggy — Vet Clinic, Grooming & Pet Store in Bhandup West, Mumbai",
    template: "%s · Doggy Woggy",
  },
  description:
    "Expert veterinary care, professional grooming with pet pickup & drop, and everyday pet essentials — everything your furry family needs, all under one roof in Bhandup West, Mumbai.",
};

export const viewport: Viewport = {
  themeColor: "#123F3A",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body className="antialiased">
        <MotionProvider>
          <BookingProvider>
            <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-teal focus:px-5 focus:py-3 focus:text-cream">
              Skip to content
            </a>
            <AnnouncementBar />
            <Navbar />
            <main id="main">{children}</main>
            <Footer />
            <QuickContact />
          </BookingProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
