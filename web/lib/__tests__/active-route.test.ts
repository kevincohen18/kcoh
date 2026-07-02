import { describe, it, expect } from "vitest";
import { isActiveRoute } from "@/lib/active-route";

describe("isActiveRoute", () => {
  it("matches the homepage only exactly", () => {
    expect(isActiveRoute("/", "/")).toBe(true);
    expect(isActiveRoute("/", "/work/")).toBe(false);
  });

  it("matches a route regardless of trailing slashes", () => {
    expect(isActiveRoute("/work/", "/work/")).toBe(true);
    expect(isActiveRoute("/work/", "/work")).toBe(true);
    expect(isActiveRoute("/services", "/services/")).toBe(true);
  });

  it("marks parent routes active on child pages", () => {
    expect(isActiveRoute("/work/", "/work/drafterie/")).toBe(true);
  });

  it("does not match sibling routes sharing a prefix", () => {
    expect(isActiveRoute("/services/", "/service-status/")).toBe(false);
  });

  it("never marks hash links active", () => {
    expect(isActiveRoute("/#services", "/")).toBe(false);
  });
});
