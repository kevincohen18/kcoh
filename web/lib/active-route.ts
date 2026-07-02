/**
 * Whether a nav link href should be highlighted for the current pathname.
 * Trailing-slash tolerant (the site exports with trailingSlash: true);
 * parent routes stay active on child pages (/work/ on /work/drafterie/);
 * hash links are never active.
 */
export function isActiveRoute(href: string, pathname: string): boolean {
  if (href.includes("#")) return false;
  const normalize = (p: string) => {
    const trimmed = p.replace(/\/+$/, "");
    return trimmed === "" ? "/" : trimmed;
  };
  const h = normalize(href);
  const p = normalize(pathname);
  if (h === "/") return p === "/";
  return p === h || p.startsWith(`${h}/`);
}
