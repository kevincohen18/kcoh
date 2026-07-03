"use client";

import { Container } from "./container";
import { LocaleLink } from "./locale-link";
import { navLinks, CAL_URL, CONTACT_EMAIL, LINKEDIN_URL } from "@/content/nav";
import { featuredProjects } from "@/content/projects";
import { useLocale } from "@/lib/i18n/locale";
import { useT } from "@/content/i18n/messages";

const footerLink =
  "text-sm text-fg-muted transition-colors hover:text-fg";
const columnHeading =
  "text-xs font-medium uppercase tracking-[0.2em] text-fg-subtle";

export function Footer() {
  const { locale } = useLocale();
  const t = useT();
  const links = navLinks[locale];

  return (
    <footer className="border-t border-border">
      <Container className="py-14 md:py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-5">
            <div className="text-lg font-bold tracking-tight text-fg">KCOH</div>
            <div className="text-[10px] font-medium uppercase tracking-[0.24em] text-fg-subtle">
              Software Inc.
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-fg-muted">
              {t.footer.tagline}
            </p>
          </div>

          <nav aria-label={t.footer.siteHeading} className="lg:col-span-2">
            <h3 className={columnHeading}>{t.footer.siteHeading}</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {links.map((l) => (
                <li key={l.href}>
                  <LocaleLink href={l.href} className={footerLink}>
                    {l.label}
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t.footer.workHeading} className="lg:col-span-3">
            <h3 className={columnHeading}>{t.footer.workHeading}</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {featuredProjects.map((p) => (
                <li key={p.slug}>
                  <LocaleLink href={`/work/${p.slug}/`} className={footerLink}>
                    {p.name}
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h3 className={columnHeading}>{t.footer.connectHeading}</h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={footerLink}
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className={footerLink}>
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={CAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={footerLink}
                >
                  {t.footer.bookCall}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-xs text-fg-subtle">
          {t.footer.rights}
        </div>
      </Container>
    </footer>
  );
}
