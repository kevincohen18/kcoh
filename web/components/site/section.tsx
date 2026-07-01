import { cn } from "@/lib/utils";

type SectionBg = "bg" | "section" | "section-alt";

const bgMap: Record<SectionBg, string> = {
  bg: "bg-bg",
  section: "bg-section",
  "section-alt": "bg-section-alt",
};

export function Section({
  id,
  bg = "bg",
  className,
  children,
}: {
  id?: string;
  bg?: SectionBg;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 py-20 md:py-28 lg:py-32",
        bgMap[bg],
        className,
      )}
    >
      {children}
    </section>
  );
}
