import { cn } from "@/lib/utils";
import { SidebarNav } from "./sidebar-nav";

export function DashboardFrame({
  children,
  className,
  showSidebar = true,
}: {
  children: React.ReactNode;
  className?: string;
  showSidebar?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex overflow-hidden rounded-[18px] border border-border bg-section shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)]",
        className,
      )}
    >
      {showSidebar ? (
        <aside className="hidden w-[208px] shrink-0 border-r border-border p-4 lg:block">
          <SidebarNav />
        </aside>
      ) : null}
      <div className="min-w-0 flex-1 p-4 md:p-5">{children}</div>
    </div>
  );
}
