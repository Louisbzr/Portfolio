import React, { useState } from "react";
import {
  ExternalLink,
  Github,
  ChevronRight,
  Star,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { useTheme, T } from "../context/ThemeContext";
import { portfolioData } from "../mock";
import { Badge } from "./ui/badge";
import { useScrollAnimation, animClass } from "../hooks/useScrollAnimation";

const { projects } = portfolioData;

function ProjectCard({ project, idx }) {
  const [hovered, setHovered] = useState(false);
  const { isDark } = useTheme();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const onGreen = hovered && !isDark;

  const col = (darkColor, lightColor) => ({
    color: onGreen ? "#ffffff" : isDark ? darkColor : lightColor,
  });

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderColor: hovered ? (isDark ? "#00ff88" : onGreen ? "#ffffff" : "#008844") : isDark ? "#1e1e1e" : "#dddbd4",
        backgroundColor: hovered ? (isDark ? "rgba(0,255,136,0.03)" : "rgba(0,136,68,1)") : "transparent",
        transition: "background-color 0.3s ease, border-color 0.3s ease",
      }}
      className={"border " + animClass.fadeUp(isVisible, idx * 100)}
    >
      <div
        style={{
          borderBottomColor: onGreen ? "rgba(255,255,255,0.3)" : isDark ? "#1e1e1e" : "#dddbd4",
          backgroundColor: onGreen ? "rgba(0,0,0,0.15)" : isDark ? "#111" : "#f0ede6",
          transition: "background-color 0.3s ease, border-color 0.3s ease",
        }}
        className="flex items-center justify-between px-4 md:px-6 py-3 border-b"
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2 h-2 rounded-full bg-[#ff5f57] shrink-0" />
          <span className="w-2 h-2 rounded-full bg-[#febc2e] shrink-0" />
          <span className="w-2 h-2 rounded-full bg-[#28c840] shrink-0" />
          <span
            style={col("#444444", "#999999")}
            className="ml-3 font-mono text-xs truncate max-w-[140px] sm:max-w-none"
          >
            {"~/projects/" + project.title.toLowerCase().replace(/ /g, "-")}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          {project.featured && (
            <div className="flex items-center gap-1">
              <Star size={12} className="text-[#febc2e]" />
              <span className="font-mono text-[#febc2e] text-xs">Projet phare</span>
            </div>
          )}
          <Badge
            variant="outline"
            style={{
              borderColor: onGreen ? "#ffffff" : "#28c840",
              color: onGreen ? "#ffffff" : "#28c840",
              backgroundColor: "transparent",
            }}
            className="font-mono text-xs px-2 py-0 rounded-none"
          >
            {project.status}
          </Badge>
        </div>
        <div className="flex sm:hidden items-center gap-2 shrink-0 ml-2">
          <Badge
            variant="outline"
            style={{
              borderColor: onGreen ? "#ffffff" : "#28c840",
              color: onGreen ? "#ffffff" : "#28c840",
              backgroundColor: "transparent",
            }}
            className="font-mono text-xs px-2 py-0 rounded-none"
          >
            {project.status}
          </Badge>
        </div>
      </div>

      <div className="p-4 md:p-8">
        <div className="grid md:grid-cols-3 gap-4 md:gap-8">
          <div className="md:col-span-2 space-y-5">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <ChevronRight
                  size={16}
                  style={{ color: onGreen ? "#ffffff" : isDark ? "#00ff88" : "#008844" }}
                />
                <h3
                  style={col("#ffffff", "#1a1a1a")}
                  className="font-mono text-xl md:text-2xl font-bold"
                >
                  {project.title}
                </h3>
              </div>
              <div className="flex items-center gap-2 ml-7 mb-4">
                <Calendar size={12} style={col("#444444", "#999999")} />
                <span style={col("#444444", "#999999")} className="font-mono text-xs">
                  {project.year}
                </span>
              </div>
              {project.featured && (
                <div className="flex sm:hidden items-center gap-1 ml-7 mb-2">
                  <Star size={12} className="text-[#febc2e]" />
                  <span className="font-mono text-[#febc2e] text-xs">Projet phare</span>
                </div>
              )}
            </div>

            <p style={col("#888888", "#555555")} className="leading-relaxed text-sm ml-7">
              {project.longDescription}
            </p>

            <div className="ml-7 space-y-2">
              <p
                style={col("#444444", "#999999")}
                className="font-mono text-xs uppercase tracking-widest mb-3"
              >
                {">"} Fonctionnalites
              </p>
              {project.features.map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <CheckCircle2
                    size={13}
                    style={{ color: onGreen ? "#ffffff" : isDark ? "#00ff88" : "#008844" }}
                    className="shrink-0"
                  />
                  <span style={col("#666666", "#444444")} className="text-sm">{f}</span>
                </div>
              ))}
            </div>

            <div className="ml-7 flex flex-wrap gap-2 pt-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  style={{
                    color: onGreen ? "#ffffff" : isDark ? "#00ff88" : "#008844",
                    backgroundColor: onGreen ? "rgba(255,255,255,0.15)" : isDark ? "#111" : "#f0ede6",
                    borderColor: onGreen ? "rgba(255,255,255,0.4)" : isDark ? "#1e1e1e" : "#dddbd4",
                  }}
                  className="px-2.5 py-1 border font-mono text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4">
            <div
              style={{
                borderColor: onGreen ? "rgba(255,255,255,0.3)" : isDark ? "#1e1e1e" : "#dddbd4",
                minHeight: "144px",
              }}
              className="border h-36 relative overflow-hidden"
            >
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={project.demoUrl || "https://pokemorpho.com"}
                target="_blank"
                rel="noreferrer"
                style={{
                  backgroundColor: onGreen ? "#ffffff" : isDark ? "#00ff88" : "#008844",
                  color: onGreen ? "#008844" : isDark ? "#0d0d0d" : "#ffffff",
                  borderColor: "transparent",
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 font-mono font-bold text-sm transition-colors duration-200 border"
              >
                <ExternalLink size={14} />
                Voir la demo
              </a>

              <a
                href={project.githubUrl || "https://github.com/Louisbzr"}
                target="_blank"
                rel="noreferrer"
                style={{
                  backgroundColor: onGreen ? "rgba(255,255,255,0.15)" : "transparent",
                  color: onGreen ? "#ffffff" : isDark ? "#888888" : "#555555",
                  borderColor: onGreen ? "rgba(255,255,255,0.4)" : isDark ? "#333333" : "#cccccc",
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 border font-mono text-sm transition-colors duration-200"
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
  const { isDark } = useTheme();
  const theme = isDark ? T.dark : T.light;
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section
      id="projects"
      className="py-28 relative"
      style={{ backgroundColor: theme.bgAlt, transition: "background-color 0.3s ease" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(to right, transparent, " + theme.border + ", transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={titleRef}
          className={"flex items-center gap-4 mb-16 " + animClass.fadeUp(titleVisible)}
        >
          <span
            className="font-mono text-sm"
            style={{ color: isDark ? "#00ff88" : "#008844" }}
          >
            05.
          </span>
          <h2
            className="font-mono text-3xl font-bold"
            style={{ color: theme.text }}
          >
            Projets
          </h2>
          <div
            className="flex-1 h-px max-w-xs"
            style={{ backgroundColor: theme.border }}
          />
        </div>

        <div className="space-y-8">
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} idx={idx} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="font-mono text-sm" style={{ color: theme.dim }}>
            {">"} Plus de projets sur{" "}
            <a
              href="https://github.com/Louisbzr"
              target="_blank"
              rel="noreferrer"
              style={{ color: isDark ? "#00ff88" : "#008844" }}
              className="hover:underline"
            >
              GitHub
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
