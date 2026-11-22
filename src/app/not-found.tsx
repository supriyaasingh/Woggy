import { LinkButton, Paw } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center px-4 text-center">
      <div>
        <Paw className="mx-auto size-16 text-coral" />
        <h1 className="font-display mt-6 text-5xl text-teal sm:text-6xl">This trail went cold.</h1>
        <p className="mt-4 text-lg text-ink-soft">We couldn&apos;t sniff out that page — let&apos;s head back home.</p>
        <div className="mt-8"><LinkButton href="/" arrow>Back to Home</LinkButton></div>
      </div>
    </section>
  );
}
