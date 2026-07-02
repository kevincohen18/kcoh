import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { Providers } from "./providers";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { organizationJsonLd } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kcoh.ca"),
  title: {
    default: "KCOH Software Inc.",
    template: "%s · KCOH Software Inc.",
  },
  description:
    "We build and operate the systems that scale real companies. Automation, financial clarity, and operational leverage.",
  openGraph: {
    title: "KCOH Software Inc.",
    description: "We build and operate the systems that scale real companies.",
    url: "https://kcoh.ca",
    siteName: "KCOH Software Inc.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "KCOH Software Inc. — we build and operate the systems that scale real companies.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KCOH Software Inc.",
    description: "We build and operate the systems that scale real companies.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <Providers>
          <Nav />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
