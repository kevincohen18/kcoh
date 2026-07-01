import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Fraunces } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

export const fontVariables = `${GeistSans.variable} ${GeistMono.variable} ${fraunces.variable}`;
