/**
 * Re-skins everything inside it in a project's brand palette by overriding
 * the design-system accent custom properties (--brand, and a derived
 * --highlight) via inline style. Charts, eyebrows, links, and Tailwind
 * brand utilities all resolve the new values; global UI outside the
 * wrapper stays on the default violet.
 *
 * The data-project-theme attribute re-triggers the globals.css
 * --brand-text declarations, so small text inside the wrapper gets an
 * AA-safe derived tone of the accent (raw accents like #8b1d3f fail
 * WCAG AA as small text) while charts keep the raw accent.
 */
export function ProjectTheme({
  accent,
  children,
  className,
}: {
  accent: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      data-project-theme
      className={className}
      style={
        {
          "--brand": accent,
          "--highlight": `color-mix(in srgb, ${accent} 55%, white)`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
