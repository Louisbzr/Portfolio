import React from "react";
import { GraduationCap, Briefcase, Code2, Trophy, BookOpen } from "lucide-react";
import { useTheme, T } from "../context/ThemeContext";
import { portfolioData } from "../mock";
import { useScrollAnimation, animClass } from "../hooks/useScrollAnimation";

const { parcours } = portfolioData;

const typeConfig = {
  education: { icon: GraduationCap, color: "#00ff88", label: "Formation" },
  experience: { icon: Briefcase, color: "#00cc6a", label: "Expérience" },
  project: { icon: Code2, color: "#00aa55", label: "Projet" },
  achievement: { icon: Trophy, color: "#febc2e", label: "Achievement" },
  learning: { icon: BookOpen, color: "#888", label: "Apprentissage" },
};

function TimelineItem({ item, index }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const isLeft = index % 2 === 0;
  const config = typeConfig[item.type] || typeConfig.education;
  const Icon = config.icon;

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-0 md:gap-8 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } flex-row`}
    >
      {/* Content card - desktop left/right, mobile always right */}
      <div
        className={`flex-1 md:max-w-[calc(50%-2rem)] ${
          animClass.fadeLeft(isVisible, index * 80)
        } ${isLeft ? "md:text-right" : ""} pl-8 md:pl-0`}
      >
        <div
          className={`border border-[#1e1e1e] p-5 hover:border-[#00ff88] transition-colors duration-300 group relative ${
            isLeft ? "md:ml-0" : ""
          }`}
        >
          {/* Year badge */}
          <div
            className={`flex items-center gap-2 mb-3 ${
              isLeft ? "md:justify-end" : "justify-start"
            }`}
          >
            <span
              className="font-mono text-xs px-2 py-0.5 border"
              style={{ borderColor: config.color, color: config.color }}
            >
              {item.year}
            </span>
            <span className="font-mono text-[#444] text-xs uppercase tracking-widest">
              {config.label}
            </span>
          </div>

          <h3 className="font-mono text-white font-bold text-base mb-1 group-hover:text-[#00ff88] transition-colors duration-200">
            {item.title}
          </h3>
          <p className="font-mono text-[#00ff88] text-sm mb-2">{item.organization}</p>
          <p className="text-[#666] text-sm leading-relaxed">{item.description}</p>

          {/* Tags */}
          {item.tags && (
            <div
              className={`flex flex-wrap gap-1.5 mt-3 ${
                isLeft ? "md:justify-end" : "justify-start"
              }`}
            >
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-[#0a0a0a] border border-[#1e1e1e] font-mono text-[10px] text-[#555]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Center dot + line — desktop only */}
      <div className="hidden md:flex flex-col items-center shrink-0 w-16">
        <div
          className={`w-5 h-5 border-2 flex items-center justify-center z-10 transition-colors duration-300 ${
            isVisible ? "bg-[#0d0d0d]" : "bg-[#0a0a0a]"
          }`}
          style={{ borderColor: isVisible ? config.color : "#1e1e1e" }}
        >
          <Icon size={10} style={{ color: isVisible ? config.color : "#333" }} />
        </div>
      </div>

      {/* Mobile dot — left side */}
      <div className="absolute left-0 top-6 md:hidden flex flex-col items-center">
        <div
          className="w-4 h-4 border-2 flex items-center justify-center z-10"
          style={{ borderColor: isVisible ? config.color : "#333", background: "#0d0d0d" }}
        >
          <Icon size={8} style={{ color: isVisible ? config.color : "#444" }} />
        </div>
      </div>

      {/* Empty space for opposite side — desktop */}
      <div className="hidden md:block flex-1" />
    </div>
  );
}

export default function Parcours() {
  const { isDark } = useTheme();
  const theme = isDark ? T.dark : T.light;
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section id="parcours" className="py-28 bg-[#0d0d0d] relative"
      style={{ backgroundColor: theme.bgMain, transition: "background-color 0.3s ease" }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e1e1e] to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div
          ref={titleRef}
          className={`flex items-center gap-4 mb-16 ${animClass.fadeUp(titleVisible)}`}
        >
          <span className="font-mono text-[#00ff88] text-sm">04.</span>
          <h2 className="font-mono text-3xl font-bold text-white">Parcours</h2>
          <div className="flex-1 h-px bg-[#1e1e1e] max-w-xs" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central vertical line — desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[#1a1a1a] -translate-x-1/2" />
          {/* Left vertical line — mobile */}
          <div className="md:hidden absolute left-2 top-0 bottom-0 w-px bg-[#1a1a1a]" />

          <div className="flex flex-col gap-10">
            {parcours.map((item, i) => (
              <TimelineItem key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
