import { cn } from "@/lib/utils";

type SectionBg = "bg" | "section" | "section-alt";

const bgMap: Record<SectionBg, string> = {
  bg: "bg-transparent",
  section: "bg-transparent",
  "section-alt": "bg-transparent",
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
