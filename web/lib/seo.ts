import type { Metadata } from "next";

const SITE_NAME = "KCOH Software Inc.";

const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "KCOH Software Inc. — we build and operate the systems that scale real companies.",
};

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  if (!path.startsWith("/") || !path.endsWith("/")) {
    throw new Error(
      `pageMetadata: path must start and end with "/" (trailingSlash: true) — got "${path}"`,
    );
  }

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} · ${SITE_NAME}`,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${SITE_NAME}`,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
