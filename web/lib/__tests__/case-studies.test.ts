import { describe, it, expect } from "vitest";
import {
  caseStudies,
  getCaseStudy,
  nextCaseStudy,
} from "@/content/case-studies";

describe("caseStudies", () => {
  it("contains exactly the four case slugs in site order, per locale", () => {
    for (const locale of ["en", "fr"] as const) {
      expect(caseStudies[locale].map((c) => c.slug)).toEqual([
        "concordia-connect",
        "drafterie",
        "skyroa",
        "automedic",
      ]);
    }
  });

  it("gives every study three fact chips and at least three outcomes", () => {
    for (const locale of ["en", "fr"] as const) {
      for (const c of caseStudies[locale]) {
        expect(c.factChips).toHaveLength(3);
        expect(c.outcomes.length).toBeGreaterThanOrEqual(3);
        expect(c.problem.length).toBeGreaterThanOrEqual(2);
        expect(c.system.length).toBeGreaterThanOrEqual(3);
      }
    }
  });

  it("points every logoSrc at the copied /work/ assets", () => {
    for (const locale of ["en", "fr"] as const) {
      for (const c of caseStudies[locale]) {
        expect(c.logoSrc).toBe(`/work/${c.slug}.png`);
      }
    }
  });

  it("uses the real brand accent hex per project", () => {
    expect(getCaseStudy("en", "concordia-connect").accent).toBe("#8b1d3f");
    expect(getCaseStudy("en", "drafterie").accent).toBe("#6e63ff");
    expect(getCaseStudy("en", "skyroa").accent).toBe("#4f46e5");
    expect(getCaseStudy("en", "automedic").accent).toBe("#16a34a");
  });

  it("never misspells Drafterie", () => {
    const json = JSON.stringify(caseStudies);
    expect(json).not.toContain("Draftery");
    expect(json).not.toContain("Draftory");
    expect(getCaseStudy("en", "drafterie").name).toBe("Drafterie");
    expect(getCaseStudy("fr", "drafterie").name).toBe("Drafterie");
  });
});

describe("getCaseStudy", () => {
  it("returns the entry whose slug matches, per locale", () => {
    expect(getCaseStudy("en", "skyroa").name).toBe("Skyroa");
    expect(getCaseStudy("fr", "skyroa").name).toBe("Skyroa");
  });
});

describe("nextCaseStudy", () => {
  it("returns the following study in site order", () => {
    expect(nextCaseStudy("en", "concordia-connect").slug).toBe("drafterie");
    expect(nextCaseStudy("en", "drafterie").slug).toBe("skyroa");
  });

  it("wraps from the last study back to the first", () => {
    expect(nextCaseStudy("en", "automedic").slug).toBe("concordia-connect");
  });
});
