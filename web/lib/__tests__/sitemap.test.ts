import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";

describe("sitemap", () => {
  const entries = sitemap();
  const urls = entries.map((entry) => entry.url);

  it("lists all ten routes", () => {
    expect(urls).toHaveLength(10);
  });

  it("includes every static route", () => {
    for (const path of [
      "/",
      "/services/",
      "/work/",
      "/about/",
      "/contact/",
      "/dashboard/",
    ]) {
      expect(urls).toContain(`https://kcoh.ca${path}`);
    }
  });

  it("includes all four case-study routes", () => {
    for (const slug of [
      "concordia-connect",
      "drafterie",
      "skyroa",
      "automedic",
    ]) {
      expect(urls).toContain(`https://kcoh.ca/work/${slug}/`);
    }
  });

  it("gives the homepage top priority", () => {
    const home = entries.find((e) => e.url === "https://kcoh.ca/");
    expect(home?.priority).toBe(1);
  });

  it("never emits a URL without a trailing slash (trailingSlash: true)", () => {
    for (const url of urls) {
      expect(url.endsWith("/")).toBe(true);
    }
  });
});
