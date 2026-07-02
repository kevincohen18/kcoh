"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useLocale } from "@/lib/i18n/locale";
import { localizedPath } from "@/lib/i18n/routing";

type LocaleLinkProps = ComponentProps<typeof Link>;

/**
 * Drop-in replacement for `next/link` that rewrites string `href`s for the
 * active locale (`localizedPath`) — e.g. `/services/` becomes `/fr/services/`
 * when the current route is under `/fr`. Non-string hrefs (`UrlObject`) and
 * all other props pass through unchanged.
 */
export function LocaleLink({ href, ...props }: LocaleLinkProps) {
  const { locale } = useLocale();
  const resolvedHref =
    typeof href === "string" ? localizedPath(href, locale) : href;

  return <Link href={resolvedHref} {...props} />;
}
