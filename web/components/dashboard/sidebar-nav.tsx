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
import { cn } from "@/lib/utils";

const items = [
  { icon: LayoutGrid, label: "Overview", active: true },
  { icon: FolderKanban, label: "Projects" },
  { icon: Users, label: "Clients" },
  { icon: FileText, label: "Invoices" },
  { icon: Calendar, label: "Calendar" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Settings, label: "Settings" },
];

export function SidebarNav() {
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

      <nav className="flex flex-1 flex-col gap-1">
        {items.map((it) => (
          <div
            key={it.label}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              it.active
                ? "bg-brand/10 font-medium text-fg"
                : "text-fg-muted hover:text-fg",
            )}
          >
            <it.icon size={16} className={it.active ? "text-brand" : ""} />
            <span className="flex-1">{it.label}</span>
            {it.active ? <ChevronRight size={14} className="text-brand" /> : null}
          </div>
        ))}
      </nav>

      <div className="flex items-center gap-3 border-t border-border px-3 pt-3 text-sm text-fg-muted">
        <LogOut size={16} /> Log out
      </div>
    </div>
  );
}
