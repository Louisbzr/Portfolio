import React, { useState } from "react";
import { Code2, Server, Database, Wrench, ChevronRight } from "lucide-react";
import { useTheme, T } from "../context/ThemeContext";
import { portfolioData } from "../mock";
import { useScrollAnimation, animClass } from "../hooks/useScrollAnimation";

const { skills } = portfolioData;

const categories = [
  { key: "frontend", label: "Frontend", icon: Code2, items: skills.frontend },
  { key: "backend", label: "Backend", icon: Server, items: skills.backend },
  { key: "database", label: "Base de données", icon: Database, items: skills.database },
  { key: "tools", label: "Outils", icon: Wrench, items: skills.tools },
];

function SkillBar({ name, level, visible, delay = 0 }) {
  return (
    <div className={`space-y-1.5 ${animClass.fadeUp(visible, delay)}`}>
      <div className="flex justify-between items-center">
        <span className="font-mono text-sm text-[#cccccc]">{name}</span>
        <span className="font-mono text-xs text-[#00ff88]">{level}</span>
      </div>
      <div className="h-1 bg-[#1a1a1a] w-full overflow-hidden">
        <div
          className="h-full bg-[#00ff88] transition-all duration-1000 ease-out"
          style={{
            width: visible ? `${level}%` : "0%",
            transitionDelay: `${delay + 200}ms`,
            boxShadow: visible ? "0 0 8px rgba(0,255,136,0.4)" : "none",
          }}
        />
      </div>
    </div>
  );
}

function CategoryCard({ cat, activeTab, setActiveTab, baseDelay, isDark }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const Icon = cat.icon;
  const isActive = activeTab === cat.key;

  // Style inline pour forcer le blanc sur fond vert en light mode
  // (contourne les !important globaux de App.css / ThemeContext)
  const activeTextStyle = isActive && !isDark ? { color: "#ffffff" } : undefined;

  return (
    <div
      ref={ref}
      onClick={() => setActiveTab(cat.key)}
      className={`border p-4 cursor-pointer transition-colors duration-200 ${
        isActive
          ? "border-[#00ff88] bg-[#00ff88]/5"
          : "border-[#1e1e1e] hover:border-[#333]"
      } ${animClass.scaleIn(isVisible, baseDelay)}`}
    >
      <Icon
        size={18}
        style={activeTextStyle}
        className={isActive ? (isDark ? "text-[#00ff88]" : "") : "text-[#444]"}
      />
      <p
        style={activeTextStyle}
        className={`font-mono text-sm font-bold mt-2 ${
          isActive ? (isDark ? "text-[#00ff88]" : "") : "text-[#555]"
        }`}
      >
        {cat.label}
      </p>
      <p
        style={activeTextStyle}
        className="font-mono text-xs text-[#333] mt-1"
      >
        {cat.items.length} skills
      </p>
    </div>
  );
}

export default function Skills() {
  const { isDark } = useTheme();
  const theme = isDark ? T.dark : T.light;
  const [activeTab, setActiveTab] = useState("frontend");
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const activeCategory = categories.find((c) => c.key === activeTab);

  return (
    <section
      id="skills"
      className="py-28 bg-[#0a0a0a] relative"
      style={{ backgroundColor: theme.bgAlt, transition: "background-color 0.3s ease" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e1e1e] to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <div
          ref={titleRef}
          className={`flex items-center gap-4 mb-16 ${animClass.fadeUp(titleVisible)}`}
        >
          <span className="font-mono text-[#00ff88] text-sm">03.</span>
          <h2 className="font-mono text-3xl font-bold text-white">Compétences</h2>
          <div className="flex-1 h-px bg-[#1e1e1e] max-w-xs" />
        </div>

        <div ref={sectionRef} className="grid md:grid-cols-5 gap-8">
          {/* Sidebar Tabs */}
          <div
            className={`md:col-span-1 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 ${animClass.fadeLeft(isVisible)}`}
          >
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeTab === cat.key;
              const activeTextStyle = isActive && !isDark ? { color: "#ffffff" } : undefined;

              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveTab(cat.key)}
                  style={activeTextStyle}
                  className={`flex items-center gap-2 px-3 py-2.5 font-mono text-sm whitespace-nowrap transition-colors duration-200 border-l-2 ${
                    isActive
                      ? `border-[#00ff88] bg-[#00ff88]/5 ${isDark ? "text-[#00ff88]" : ""}`
                      : "border-transparent text-[#555] hover:text-[#cccccc] hover:border-[#333]"
                  }`}
                >
                  <Icon size={14} />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Main Content */}
          <div className={`md:col-span-4 ${animClass.fadeRight(isVisible, 100)}`}>
            <div className="border border-[#1e1e1e] p-8">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#1e1e1e]">
                <ChevronRight size={14} className="text-[#00ff88]" />
                <span className="font-mono text-[#444] text-xs">
                  skills/{activeCategory.label.toLowerCase().replace(/ /g, "-")}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {activeCategory.items.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    visible={isVisible}
                    delay={i * 80}
                  />
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-[#1e1e1e]">
                <p className="font-mono text-[#444] text-xs mb-4">&gt; Technologies utilisées</p>
                <div className="flex flex-wrap gap-2">
                  {activeCategory.items.map((skill, i) => (
                    <span
                      key={skill.name}
                      className={`px-3 py-1.5 bg-[#111] border border-[#1e1e1e] font-mono text-xs text-[#888] hover:border-[#00ff88] hover:text-[#00ff88] transition-colors duration-200 cursor-default ${animClass.scaleIn(isVisible, i * 60)}`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overview cards */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <CategoryCard
              key={cat.key}
              cat={cat}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              baseDelay={i * 100}
              isDark={isDark}
            />
          ))}
        </div>
      </div>
    </section>
  );
}