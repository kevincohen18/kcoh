"use client";

import dynamic from "next/dynamic";

const DashboardDemo = dynamic(
  () => import("./dashboard-demo").then((m) => m.DashboardDemo),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden
        className="min-h-[640px] rounded-[18px] border border-border bg-section motion-safe:animate-pulse"
      />
    ),
  },
);

/** Client boundary that lazy-loads the demo. The /dashboard page (server
 *  component, keeps its metadata export) renders this, so zero demo code
 *  ships with any other route and none of it is server-rendered. */
export function DashboardDemoLoader() {
  return <DashboardDemo />;
}
