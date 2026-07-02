"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { motion } from "motion/react";
import { navLinks } from "@/content/nav";
import { isActiveRoute } from "@/lib/active-route";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { useLocale } from "@/lib/i18n/locale";
import { unlocalizedPath } from "@/lib/i18n/routing";
import { useT } from "@/content/i18n/messages";
import { Container } from "./container";
import { ThemeToggle } from "./theme-toggle";
import { LocaleToggle } from "./locale-toggle";
import { LocaleLink } from "./locale-link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const { locale } = useLocale();
  const t = useT();
  const links = navLinks[locale];

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
        <LocaleLink href="/" className="leading-none" aria-label="KCOH Software Inc.">
          <div className="text-lg font-bold tracking-tight text-fg">KCOH</div>
          <div className="text-[10px] font-medium uppercase tracking-[0.24em] text-fg-subtle">
            Software Inc.
          </div>
        </LocaleLink>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => {
            const active = isActiveRoute(l.href, unlocalizedPath(pathname));
            return (
              <LocaleLink
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative py-1 text-sm transition-colors hover:text-fg",
                  active ? "text-fg" : "text-fg-muted",
                )}
              >
                {l.label}
                {active ? (
                  <motion.span
                    aria-hidden
                    layoutId={reduced ? undefined : "nav-active"}
                    className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-brand"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                ) : null}
              </LocaleLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleToggle />
          <ThemeToggle />
          <Button asChild className="hidden rounded-full sm:inline-flex">
            <LocaleLink href="/contact/">{t.nav.letsTalk}</LocaleLink>
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
                {links.map((l) => {
                  const active = isActiveRoute(l.href, unlocalizedPath(pathname));
                  return (
                    <SheetClose asChild key={l.href}>
                      <LocaleLink
                        href={l.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "text-base",
                          active ? "font-medium text-brand-text" : "text-fg",
                        )}
                      >
                        {l.label}
                      </LocaleLink>
                    </SheetClose>
                  );
                })}
                <LocaleToggle />
                <SheetClose asChild>
                  <LocaleLink
                    href="/contact/"
                    className="mt-2 rounded-full bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground"
                  >
                    {t.nav.letsTalk}
                  </LocaleLink>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
