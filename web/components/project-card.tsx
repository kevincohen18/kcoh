import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/content/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.href}
      className="group flex flex-col rounded-[18px] border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[0_24px_60px_-30px_rgba(110,99,255,0.55)]"
    >
      <div
        className="mb-5 grid size-12 place-items-center rounded-xl"
        style={{ background: `${project.color}1f` }}
      >
        <Image
          src={project.logo}
          alt=""
          width={30}
          height={30}
          className="size-7 object-contain"
        />
      </div>
      <h3 className="text-lg font-semibold text-fg">{project.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">
        {project.description}
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
        View Project
        <ArrowRight
          size={15}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </span>
    </a>
  );
}
