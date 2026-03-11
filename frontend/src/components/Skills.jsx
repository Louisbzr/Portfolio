import React, { useState } from "react";
import {
  Code2,
  Server,
  Database,
  Wrench,
  ChevronRight,
} from "lucide-react";
import { portfolioData } from "../mock";

const { skills } = portfolioData;

const categories = [
  {
    key: "frontend",
    label: "Frontend",
    icon: Code2,
    color: "#00ff88",
    items: skills.frontend,
  },
  {
    key: "backend",
    label: "Backend",
    icon: Server,
    color: "#00cc6a",
    items: skills.backend,
  },
  {
    key: "database",
    label: "Base de données",
    icon: Database,
    color: "#00aa55",
    items: skills.database,
  },
  {
    key: "tools",
    label: "Outils",
    icon: Wrench,
    color: "#008844",
    items: skills.tools,
  },
];

// Tech badge icons mapping (text labels)
const techIcons = {
  HTML: "HTML",
  CSS: "CSS",
  JavaScript: "JS",
  React: "⚛",
  "Node.js": "Node",
  Express: "Exp",
  PostgreSQL: "PG",
  Prisma: "Prm",
  Supabase: "Sup",
  Git: "Git",
  GitHub: "GH",
  Vercel: "▲",
  Railway: "🚂",
};

function SkillBar({ name, level }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="font-mono text-sm text-[#cccccc]">{name}</span>
        <span className="font-mono text-xs text-[#00ff88]">{level}%</span>
      </div>
      <div className="h-1 bg-[#1a1a1a] w-full overflow-hidden">
        <div
          className="h-full bg-[#00ff88] origin-left"
          style={{
            width: `${level}%`,
            boxShadow: "0 0 8px rgba(0,255,136,0.4)",
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState("frontend");
  const activeCategory = categories.find((c) => c.key === activeTab);

  return (
    <section id="skills" className="py-28 bg-[#0a0a0a] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e1e1e] to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-[#00ff88] text-sm">03.</span>
          <h2 className="font-mono text-3xl font-bold text-white">Compétences</h2>
          <div className="flex-1 h-px bg-[#1e1e1e] max-w-xs" />
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Sidebar Tabs */}
          <div className="md:col-span-1 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveTab(cat.key)}
                  className={`flex items-center gap-2 px-3 py-2.5 font-mono text-sm whitespace-nowrap transition-colors duration-200 border-l-2 ${
                    activeTab === cat.key
                      ? "border-[#00ff88] text-[#00ff88] bg-[#00ff88]/5"
                      : "border-transparent text-[#555] hover:text-white hover:border-[#333]"
                  }`}
                >
                  <Icon size={14} />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Main Content */}
          <div className="md:col-span-4">
            <div className="border border-[#1e1e1e] p-8">
              {/* Terminal bar */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#1e1e1e]">
                <ChevronRight size={14} className="text-[#00ff88]" />
                <span className="font-mono text-[#444] text-xs">
                  skills/{activeCategory.label.toLowerCase().replace(/ /g, "-")}
                </span>
              </div>

              {/* Skills list */}
              <div className="grid md:grid-cols-2 gap-6">
                {activeCategory.items.map((skill) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                ))}
              </div>

              {/* Tech badges */}
              <div className="mt-8 pt-6 border-t border-[#1e1e1e]">
                <p className="font-mono text-[#444] text-xs mb-4">
                  &gt; Technologies utilisées
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeCategory.items.map((skill) => (
                    <span
                      key={skill.name}
                      className="px-3 py-1.5 bg-[#111] border border-[#1e1e1e] font-mono text-xs text-[#888] hover:border-[#00ff88] hover:text-[#00ff88] transition-colors duration-200 cursor-default"
                    >
                      {techIcons[skill.name] || skill.name} {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All skills overview */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                className={`border p-4 cursor-pointer transition-colors duration-200 ${
                  activeTab === cat.key
                    ? "border-[#00ff88] bg-[#00ff88]/5"
                    : "border-[#1e1e1e] hover:border-[#333]"
                }`}
              >
                <Icon
                  size={18}
                  className={activeTab === cat.key ? "text-[#00ff88]" : "text-[#444]"}
                />
                <p
                  className={`font-mono text-sm font-bold mt-2 ${
                    activeTab === cat.key ? "text-[#00ff88]" : "text-[#555]"
                  }`}
                >
                  {cat.label}
                </p>
                <p className="font-mono text-xs text-[#333] mt-1">
                  {cat.items.length} skills
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
