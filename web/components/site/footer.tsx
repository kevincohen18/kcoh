import { Container } from "./container";
import { CONTACT_EMAIL } from "@/content/nav";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg">
      <Container className="py-10">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="text-sm font-medium text-fg">KCOH Software Inc.</div>
          <div className="flex items-center gap-6 text-sm text-fg-muted">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-fg"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="transition-colors hover:text-fg"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-xs text-fg-subtle">
          © 2026 KCOH Software Inc. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
