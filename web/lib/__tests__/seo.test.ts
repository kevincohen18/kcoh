import { describe, it, expect } from "vitest";
import { pageMetadata } from "@/lib/seo";

describe("pageMetadata", () => {
  const meta = pageMetadata({
    title: "Services",
    description: "Six services, in depth.",
    path: "/services/",
  });
  const og = meta.openGraph as {
    title?: string;
    url?: string;
    siteName?: string;
    images?: unknown;
  };
  const tw = meta.twitter as {
    card?: string;
    title?: string;
    images?: unknown;
  };

  it("sets the canonical to the given path", () => {
    expect(meta.alternates?.canonical).toBe("/services/");
  });

  it("passes title and description through for the <title> template", () => {
    expect(meta.title).toBe("Services");
    expect(meta.description).toBe("Six services, in depth.");
  });

  it("applies the site template to the OG and twitter titles", () => {
    expect(og.title).toBe("Services · KCOH Software Inc.");
    expect(tw.title).toBe("Services · KCOH Software Inc.");
  });

  it("points OG at the page path and the branded 1200x630 card", () => {
    expect(og.url).toBe("/services/");
    expect(og.siteName).toBe("KCOH Software Inc.");
    expect(og.images).toEqual([
      expect.objectContaining({ url: "/og.png", width: 1200, height: 630 }),
    ]);
  });

  it("uses a summary_large_image twitter card with the same asset", () => {
    expect(tw.card).toBe("summary_large_image");
    expect(tw.images).toEqual(["/og.png"]);
  });

  it("rejects paths without a leading slash", () => {
    expect(() =>
      pageMetadata({ title: "X", description: "Y", path: "services/" }),
    ).toThrow(/must start and end/);
  });

  it("rejects paths without a trailing slash (trailingSlash: true)", () => {
    expect(() =>
      pageMetadata({ title: "X", description: "Y", path: "/services" }),
    ).toThrow(/must start and end/);
  });
});
