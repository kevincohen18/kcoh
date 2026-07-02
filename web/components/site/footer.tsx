import Link from "next/link";
import { Container } from "./container";
import { navLinks, CAL_URL, CONTACT_EMAIL, LINKEDIN_URL } from "@/content/nav";
import { featuredProjects } from "@/content/projects";

const footerLink =
  "text-sm text-fg-muted transition-colors hover:text-fg";
const columnHeading =
  "text-xs font-medium uppercase tracking-[0.2em] text-fg-subtle";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg">
      <Container className="py-14 md:py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-5">
            <div className="text-lg font-bold tracking-tight text-fg">KCOH</div>
            <div className="text-[10px] font-medium uppercase tracking-[0.24em] text-fg-subtle">
              Software Inc.
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-fg-muted">
              Software systems that automate operations and add financial
              clarity. Led by an operator who built and scaled a 7 figure
              platform.
            </p>
          </div>

          <nav aria-label="Site" className="lg:col-span-2">
            <h3 className={columnHeading}>Site</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={footerLink}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Work" className="lg:col-span-3">
            <h3 className={columnHeading}>Work</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {featuredProjects.map((p) => (
                <li key={p.slug}>
                  <Link href={`/work/${p.slug}/`} className={footerLink}>
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h3 className={columnHeading}>Connect</h3>
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
                  Book a Conversation
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-xs text-fg-subtle">
          © 2026 KCOH Software Inc. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
