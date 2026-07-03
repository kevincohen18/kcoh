import { notFound } from "next/navigation";

import { ScaledPreview } from "@/components/site/scaled-preview";
import { StackMap } from "@/components/diagram/showcase/stack-map";

const STEPS = [
  ["Map the System", "We audit your workflows, data flows, and bottlenecks before writing any code."],
  ["Find the Leverage", "We identify the automations and systems with the highest operational ROI."],
  ["Build and Ship", "Clean architecture, proper testing, integrated with your existing tools."],
  ["Support and Iterate", "We monitor performance, train your team, and iterate on real usage."],
];

export default function HowWeWorkLabPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <div className="min-h-screen w-full bg-[#fafafb] p-10">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-14">
        <p className="font-mono text-sm tracking-widest text-neutral-600">── COMPOSE-YOUR-STACK MAP ──</p>

        {/* in-context: steps row on top, full-width map below */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-10">
          <p className="font-mono text-[11px] tracking-[0.2em] text-indigo-500">HOW WE WORK</p>
          <h2 className="mt-3 font-serif text-[40px] font-medium leading-[1.08] tracking-[-0.015em] text-neutral-900">
            Four steps. No mystery.
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-neutral-500">
            Every layer is a choice. We bring an opinion and wire up whatever fits — your language, your database, your tools.
          </p>
          <ol className="mt-9 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(([title, body], i) => (
              <li key={title} className="flex gap-3.5">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-300 text-[13px] font-semibold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold text-neutral-900">{title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-neutral-500">{body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <ScaledPreview designWidth={1280}>
              <StackMap theme="light" />
            </ScaledPreview>
          </div>
        </div>

        <p className="mt-6 font-mono text-sm tracking-widest text-neutral-600">── FULL DETAIL · light + dark ──</p>
        <div><p className="mb-4 font-mono text-xs tracking-widest text-neutral-500">STACK · LIGHT</p><StackMap theme="light" /></div>
        <div className="rounded-2xl bg-[#05070b] p-8"><p className="mb-4 font-mono text-xs tracking-widest text-neutral-400">STACK · DARK</p><StackMap theme="dark" /></div>
      </div>
    </div>
  );
}
