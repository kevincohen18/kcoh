import { describe, it, expect } from "vitest";
import {
  caseStudies,
  getCaseStudy,
  nextCaseStudy,
} from "@/content/case-studies";

describe("caseStudies", () => {
  it("contains exactly the four case slugs in site order", () => {
    expect(caseStudies.map((c) => c.slug)).toEqual([
      "concordia-connect",
      "drafterie",
      "skyroa",
      "automedic",
    ]);
  });

  it("gives every study three fact chips and at least three outcomes", () => {
    for (const c of caseStudies) {
      expect(c.factChips).toHaveLength(3);
      expect(c.outcomes.length).toBeGreaterThanOrEqual(3);
      expect(c.problem.length).toBeGreaterThanOrEqual(2);
      expect(c.system.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("points every logoSrc at the copied /work/ assets", () => {
    for (const c of caseStudies) {
      expect(c.logoSrc).toBe(`/work/${c.slug}.png`);
    }
  });

  it("uses the real brand accent hex per project", () => {
    expect(getCaseStudy("concordia-connect").accent).toBe("#8b1d3f");
    expect(getCaseStudy("drafterie").accent).toBe("#6e63ff");
    expect(getCaseStudy("skyroa").accent).toBe("#4f46e5");
    expect(getCaseStudy("automedic").accent).toBe("#16a34a");
  });

  it("never misspells Drafterie", () => {
    const json = JSON.stringify(caseStudies);
    expect(json).not.toContain("Draftery");
    expect(json).not.toContain("Draftory");
    expect(getCaseStudy("drafterie").name).toBe("Drafterie");
  });
});

describe("getCaseStudy", () => {
  it("returns the entry whose slug matches", () => {
    expect(getCaseStudy("skyroa").name).toBe("Skyroa");
  });
});

describe("nextCaseStudy", () => {
  it("returns the following study in site order", () => {
    expect(nextCaseStudy("concordia-connect").slug).toBe("drafterie");
    expect(nextCaseStudy("drafterie").slug).toBe("skyroa");
  });

  it("wraps from the last study back to the first", () => {
    expect(nextCaseStudy("automedic").slug).toBe("concordia-connect");
  });
});
