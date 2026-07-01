"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { navLinks, CAL_URL } from "@/content/nav";
import { Container } from "./container";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-border bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="leading-none" aria-label="KCOH Software Inc.">
          <div className="text-lg font-bold tracking-tight text-fg">KCOH</div>
          <div className="text-[10px] font-medium uppercase tracking-[0.24em] text-fg-subtle">
            Software Inc.
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-fg-muted transition-colors hover:text-fg"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild className="hidden rounded-full sm:inline-flex">
            <a href={CAL_URL} target="_blank" rel="noopener noreferrer">
              Let&apos;s Talk
            </a>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="grid size-9 place-items-center rounded-full border border-border text-fg-muted md:hidden"
                aria-label="Open menu"
              >
                <Menu size={18} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="border-border bg-section">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="mt-10 flex flex-col gap-5 px-5">
                {navLinks.map((l) => (
                  <a key={l.label} href={l.href} className="text-base text-fg">
                    {l.label}
                  </a>
                ))}
                <a
                  href={CAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 rounded-full bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground"
                >
                  Let&apos;s Talk
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
