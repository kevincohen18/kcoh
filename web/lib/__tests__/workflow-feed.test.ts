import { describe, it, expect } from "vitest";
import {
  advanceWorkflow,
  type WorkflowStep,
  type WorkflowStepStatus,
} from "@/lib/workflow-feed";

const make = (statuses: WorkflowStepStatus[]): WorkflowStep[] =>
  statuses.map((status, i) => ({
    label: `Step ${i}`,
    detail: `Detail ${i}`,
    status,
  }));

describe("advanceWorkflow", () => {
  it("marks the running step done and starts the next queued step", () => {
    const next = advanceWorkflow(make(["done", "running", "queued", "queued"]));
    expect(next.map((s) => s.status)).toEqual([
      "done",
      "done",
      "running",
      "queued",
    ]);
  });

  it("starts the first queued step when nothing is running", () => {
    const next = advanceWorkflow(make(["done", "queued", "queued"]));
    expect(next.map((s) => s.status)).toEqual(["done", "running", "queued"]);
  });

  it("marks the last running step done when nothing is queued", () => {
    const next = advanceWorkflow(make(["done", "done", "running"]));
    expect(next.map((s) => s.status)).toEqual(["done", "done", "done"]);
  });

  it("resets to the first step running when every step is done", () => {
    const next = advanceWorkflow(make(["done", "done", "done"]));
    expect(next.map((s) => s.status)).toEqual(["running", "queued", "queued"]);
  });

  it("returns an empty array for empty input", () => {
    expect(advanceWorkflow([])).toEqual([]);
  });

  it("does not mutate its input", () => {
    const input = make(["running", "queued"]);
    advanceWorkflow(input);
    expect(input.map((s) => s.status)).toEqual(["running", "queued"]);
  });
});
