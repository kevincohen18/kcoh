import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { Providers } from "./providers";
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
