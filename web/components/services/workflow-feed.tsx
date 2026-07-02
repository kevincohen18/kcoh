"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, CircleDashed, CircleDot } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { advanceWorkflow, type WorkflowStep, type WorkflowStepStatus } from "@/lib/workflow-feed";
import { workflowFeedCopy, workflowFeedSteps } from "@/content/service-details";
import { useLocale } from "@/lib/i18n/locale";

const TICK_MS = 2200;

const statusTint: Record<WorkflowStepStatus, string> = {
  done: "text-pos",
  running: "text-brand-text", // 12px status text — AA token from Task 7 (raw --brand is 4.12:1 on white)
  queued: "text-fg-subtle",
};

function StatusIcon({ status }: { status: WorkflowStepStatus }) {
  if (status === "done") {
    return <CheckCircle2 size={16} className="shrink-0 text-pos" />;
  }
  if (status === "running") {
    return <CircleDot size={16} className="shrink-0 text-brand" />;
  }
  return <CircleDashed size={16} className="shrink-0 text-fg-subtle" />;
}

export function WorkflowFeed({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const { locale } = useLocale();
  const copy = workflowFeedCopy[locale];
  // `steps` is local component state seeded from `workflowFeedSteps[locale]`
  // and then advanced on a timer — it can't just re-derive `data[locale]`
  // on every render like the reference slice does. The caller remounts this
  // component with `key={locale}` (see `services-page-content.tsx`) so a
  // locale switch resets the simulated run via a fresh initial state,
  // instead of a setState-in-effect (blocked by this repo's
  // `react-hooks/set-state-in-effect` ESLint rule — see PATTERN.md).
  const [steps, setSteps] = useState<WorkflowStep[]>(workflowFeedSteps[locale]);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setSteps((prev) => advanceWorkflow(prev));
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <div className={cn("rounded-2xl border border-border bg-card p-4", className)}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-fg">{copy.title}</h3>
        <span className="flex items-center gap-1.5 text-[11px] text-fg-muted">
          <span className="size-1.5 rounded-full bg-pos" /> {copy.live}
        </span>
      </div>
      <ul className="space-y-3.5">
        {steps.map((s, i) => (
          <li key={i} className="flex items-center gap-3 text-sm">
            <StatusIcon status={s.status} />
            <span
              className={cn(
                "flex-1 transition-colors duration-300",
                s.status === "queued" ? "text-fg-muted" : "text-fg",
              )}
            >
              {s.label}
            </span>
            <span className="hidden text-xs text-fg-subtle sm:inline">{s.detail}</span>
            <span
              className={cn(
                "w-14 text-right text-xs font-medium capitalize transition-colors duration-300",
                statusTint[s.status],
              )}
            >
              {copy.statusLabels[s.status]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
