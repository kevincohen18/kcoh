export type WorkflowStepStatus = "done" | "running" | "queued";

export type WorkflowStep = {
  label: string;
  detail: string;
  status: WorkflowStepStatus;
};

/**
 * One tick of the simulated workflow: the running step completes and the
 * first queued step starts. When every step is done, the run resets with
 * the first step running again.
 */
export function advanceWorkflow(steps: WorkflowStep[]): WorkflowStep[] {
  if (steps.length === 0) return [];

  const allDone = steps.every((s) => s.status === "done");
  if (allDone) {
    return steps.map((s, i) => ({
      ...s,
      status: i === 0 ? ("running" as const) : ("queued" as const),
    }));
  }

  const runningIndex = steps.findIndex((s) => s.status === "running");
  const queuedIndex = steps.findIndex((s) => s.status === "queued");

  return steps.map((s, i) => {
    if (i === runningIndex) return { ...s, status: "done" as const };
    if (i === queuedIndex) return { ...s, status: "running" as const };
    return s;
  });
}
