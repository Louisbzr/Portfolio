import React, { useState } from "react";
import {
  ExternalLink,
  Github,
  ChevronRight,
  Star,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { portfolioData } from "../mock";
import { Badge } from "./ui/badge";
import { useScrollAnimation, animClass } from "../hooks/useScrollAnimation";

const { projects } = portfolioData;

function ProjectCard({ project, idx }) {
  const [hovered, setHovered] = useState(false);
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`border transition-colors duration-300 ${
        hovered ? "border-[#00ff88] bg-[#00ff88]/3" : "border-[#1e1e1e]"
      } ${animClass.fadeUp(isVisible, idx * 100)}`}
    >
      {/* Terminal header bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-[#1e1e1e] bg-[#111]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
          <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
          <span className="w-2 h-2 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-[#444] text-xs">
            ~/projects/{project.title.toLowerCase().replace(/ /g, "-")}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {project.featured && (
            <div className="flex items-center gap-1">
              <Star size={12} className="text-[#febc2e]" />
              <span className="font-mono text-[#febc2e] text-xs">Projet phare</span>
            </div>
          )}
          <Badge
            variant="outline"
            className="font-mono text-xs border-[#28c840] text-[#28c840] bg-transparent px-2 py-0 rounded-none"
          >
            {project.status}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-5">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <ChevronRight size={16} className="text-[#00ff88]" />
                <h3 className="font-mono text-2xl font-bold text-white">{project.title}</h3>
              </div>
              <div className="flex items-center gap-2 ml-7 mb-4">
                <Calendar size={12} className="text-[#444]" />
                <span className="font-mono text-[#444] text-xs">{project.year}</span>
              </div>
            </div>

            <p className="text-[#888] leading-relaxed text-sm ml-7">{project.longDescription}</p>

            <div className="ml-7 space-y-2">
              <p className="font-mono text-[#444] text-xs uppercase tracking-widest mb-3">
                &gt; Fonctionnalités
              </p>
              {project.features.map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[#00ff88] shrink-0" />
                  <span className="text-[#666] text-sm">{f}</span>
                </div>
              ))}
            </div>

            <div className="ml-7 flex flex-wrap gap-2 pt-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 bg-[#111] border border-[#1e1e1e] font-mono text-xs text-[#00ff88]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4">
            <div className="border border-[#1e1e1e] bg-[#0a0a0a] p-6 flex flex-col items-center justify-center h-36 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage:
                    "linear-gradient(#00ff88 1px, transparent 1px), linear-gradient(90deg, #00ff88 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
              <span className="font-mono text-5xl mb-2">⚡</span>
              <p className="font-mono text-[#444] text-xs">{project.title}</p>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-[#00ff88] text-[#0d0d0d] font-mono font-bold text-sm hover:bg-white transition-colors duration-200"
              >
                <ExternalLink size={14} />
                Voir la démo
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 border border-[#333] text-[#888] font-mono text-sm hover:border-[#00ff88] hover:text-[#00ff88] transition-colors duration-200"
              >
                <Github size={14} />
                Voir le GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section id="projects" className="py-28 bg-[#0a0a0a] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e1e1e] to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={titleRef}
          className={`flex items-center gap-4 mb-16 ${animClass.fadeUp(titleVisible)}`}
        >
          <span className="font-mono text-[#00ff88] text-sm">05.</span>
          <h2 className="font-mono text-3xl font-bold text-white">Projets</h2>
          <div className="flex-1 h-px bg-[#1e1e1e] max-w-xs" />
        </div>

        <div className="space-y-8">
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} idx={idx} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="font-mono text-[#333] text-sm">
            &gt; Plus de projets sur{" "}
            <a href="https://github.com/louis-dev" target="_blank" rel="noreferrer" className="text-[#00ff88] hover:underline">
              GitHub
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
