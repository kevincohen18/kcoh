import Link from "next/link";
import { Container } from "@/components/site/container";
import { SectionLabel } from "@/components/site/section-label";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-bg">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--brand), transparent)",
        }}
      />
      <Container className="flex min-h-[70vh] flex-col items-start justify-center py-20 md:py-28">
        <SectionLabel>404 — Page not found</SectionLabel>
        <h1 className="mt-4 max-w-2xl font-serif text-[clamp(32px,4vw,52px)] font-medium leading-[1.05] tracking-[-0.015em] text-fg">
          There&apos;s no page here.
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-fg-muted">
          The address may be out of date — we rebuilt the site, and a few old
          links now live somewhere new. Everything current is one step away.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button asChild size="lg" className="rounded-full">
            <Link href="/">Back to the homepage</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <Link href="/work/">See the work</Link>
          </Button>
        </div>
        <p className="mt-6 text-sm text-fg-muted">
          Looking for something specific?{" "}
          <Link
            href="/contact/"
            className="font-medium text-brand-text underline-offset-4 hover:underline"
          >
            Get in touch
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
