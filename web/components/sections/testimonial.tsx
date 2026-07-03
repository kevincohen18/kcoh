"use client";

import Image from "next/image";
import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { projects } from "@/content/projects";
import { founder } from "@/content/founder";
import { useLocale } from "@/lib/i18n/locale";

const LOGO_WALL_SLUGS = [
  "concordia-connect",
  "drafterie",
  "skyroa",
  "automedic",
  "frostynow",
];

export function Testimonial() {
  const { locale } = useLocale();
  const f = founder[locale];
  const logoWall = LOGO_WALL_SLUGS.map((slug) =>
    projects.find((p) => p.slug === slug)
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <section>
      <Container className="grid items-center gap-12 py-20 md:py-28 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <span
            className="font-serif text-6xl leading-none text-brand/40"
            aria-hidden
          >
            &ldquo;
          </span>
          <blockquote className="mt-2 font-serif text-[clamp(26px,3.4vw,40px)] font-medium leading-[1.12] tracking-[-0.015em] text-fg">
            {f.quote.lead}
            <br />
            <span className="text-brand">{f.quote.emphasis}</span>
          </blockquote>
          <p className="mt-6 max-w-md text-base leading-relaxed text-fg-muted">
            {f.quote.body}
          </p>
        </Reveal>

        <ul className="flex flex-col gap-5 lg:col-span-5 lg:pl-8">
          {logoWall.map((p, i) => (
            <li key={p.slug}>
              <Reveal
                delay={i * 0.05}
                className="flex items-center gap-3"
              >
                <Image
                  src={p.logo}
                  alt=""
                  width={22}
                  height={22}
                  className="size-5 shrink-0 object-contain"
                />
                <span className="text-sm uppercase tracking-[0.14em] text-fg-muted">
                  {p.name}
                </span>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
