"use client";

import { technologies } from "@/content/technologies";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

/**
 * Horizontal, left-to-right sliding tech row. The list is duplicated once so a
 * `translateX(-50%) -> 0` loop is seamless; each item carries its own trailing
 * space (pr-10) so the two halves tile identically with no seam jump. Edge fades
 * and pause-on-hover live in globals.css (`.tech-marquee`). Reduced-motion users
 * get the original static, wrapped row instead of any animation.
 */
export function TechMarquee() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <ul className="flex flex-wrap items-center gap-x-10 gap-y-4">
        {technologies.map((name) => (
          <li
            key={name}
            className="font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle"
          >
            {name}
          </li>
        ))}
      </ul>
    );
  }

  const loop = [...technologies, ...technologies];

  return (
    <div className="tech-marquee relative w-full min-w-0 overflow-hidden md:flex-1">
      <ul className="tech-marquee__track flex w-max items-center">
        {loop.map((name, i) => (
          <li
            key={`${name}-${i}`}
            aria-hidden={i >= technologies.length}
            className="whitespace-nowrap pr-10 font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle"
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
