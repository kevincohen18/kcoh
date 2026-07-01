import { ThemeToggle } from "@/components/site/theme-toggle";

export default function Home() {
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-[1240px] space-y-10 px-6 py-24 md:px-10">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-brand">
            Software that runs businesses
          </span>
          <ThemeToggle />
        </div>

        <h1 className="max-w-4xl font-serif text-[clamp(48px,6vw,84px)] font-medium leading-[1.03] tracking-[-0.01em]">
          We build and operate{" "}
          <em className="text-brand">the systems that scale real companies.</em>
        </h1>

        <p className="max-w-xl text-lg text-fg-muted md:text-xl">
          Automation, financial clarity, and operational leverage. Built by
          someone who scaled a 7-figure platform from the inside.
        </p>

        <div className="flex flex-wrap gap-4 pt-2">
          <div className="rounded-[18px] border border-border bg-card p-6 text-sm text-fg-muted">
            Card token check · bg-card · border-border · radius 18px
          </div>
          <div className="rounded-[18px] border border-border bg-section-alt p-6 text-sm text-fg-subtle">
            Section-alt token · fg-subtle
          </div>
        </div>
      </div>
    </main>
  );
}
