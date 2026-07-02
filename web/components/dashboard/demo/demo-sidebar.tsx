"use client";

import {
  LayoutGrid,
  FolderKanban,
  Users,
  FileText,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoScreen } from "@/lib/demo/data";

/** The four playable screens, in sidebar order. Reused by the mobile tab row. */
export const demoNavScreens: { id: DemoScreen; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "projects", label: "Projects" },
  { id: "invoices", label: "Invoices" },
  { id: "analytics", label: "Analytics" },
];

const items: { icon: LucideIcon; label: string; screen?: DemoScreen }[] = [
  { icon: LayoutGrid, label: "Overview", screen: "overview" },
  { icon: FolderKanban, label: "Projects", screen: "projects" },
  { icon: Users, label: "Clients" },
  { icon: FileText, label: "Invoices", screen: "invoices" },
  { icon: Calendar, label: "Calendar" },
  { icon: BarChart3, label: "Analytics", screen: "analytics" },
  { icon: Settings, label: "Settings" },
];

/** Clickable variant of SidebarNav for the playable demo. Same visual
 *  language; Clients/Calendar/Settings stay display-only. */
export function DemoSidebar({
  screen,
  onSelect,
}: {
  screen: DemoScreen;
  onSelect: (screen: DemoScreen) => void;
}) {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center gap-3 rounded-xl border border-border p-3">
        <div className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-highlight text-xs font-semibold text-white">
          JS
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-medium text-fg">John Smith</div>
          <div className="truncate text-xs text-fg-subtle">john@kcoh.ca</div>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1" aria-label="Demo dashboard screens">
        {items.map((it) => {
          const target = it.screen;
          if (!target) {
            return (
              <div
                key={it.label}
                className="flex cursor-default items-center gap-3 rounded-lg px-3 py-2 text-sm text-fg-subtle"
              >
                <it.icon size={16} />
                <span className="flex-1">{it.label}</span>
              </div>
            );
          }
          const active = target === screen;
          return (
            <button
              key={it.label}
              type="button"
              onClick={() => onSelect(target)}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                active
                  ? "bg-brand/10 font-medium text-fg"
                  : "text-fg-muted hover:text-fg",
              )}
            >
              <it.icon size={16} className={active ? "text-brand" : ""} />
              <span className="flex-1">{it.label}</span>
              {active ? <ChevronRight size={14} className="text-brand" /> : null}
            </button>
          );
        })}
      </nav>

      <div className="flex items-center gap-3 border-t border-border px-3 pt-3 text-sm text-fg-muted">
        <LogOut size={16} /> Log out
      </div>
    </div>
  );
}
