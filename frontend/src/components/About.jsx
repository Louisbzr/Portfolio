import React from "react";
import { Gamepad2, Globe, Cpu } from "lucide-react";
import { portfolioData } from "../mock";
import { useScrollAnimation, animClass } from "../hooks/useScrollAnimation";

const { about } = portfolioData;

export default function About() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: leftRef, isVisible: leftVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: rightRef, isVisible: rightVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="about" className="py-28 bg-[#0d0d0d] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e1e1e] to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div
          ref={titleRef}
          className={`flex items-center gap-4 mb-16 ${animClass.fadeUp(titleVisible)}`}
        >
          <span className="font-mono text-[#00ff88] text-sm">02.</span>
          <h2 className="font-mono text-3xl font-bold text-white">À propos</h2>
          <div className="flex-1 h-px bg-[#1e1e1e] max-w-xs" />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: Text */}
          <div ref={leftRef} className="space-y-5">
            {about.paragraphs.map((p, i) => (
              <p
                key={i}
                className={`text-[#888888] leading-relaxed text-base ${animClass.fadeLeft(leftVisible, i * 100)}`}
              >
                {p}
              </p>
            ))}

            {/* Tags */}
            <div className={`flex flex-wrap gap-2 pt-4 ${animClass.fadeUp(leftVisible, 300)}`}>
              {["JavaScript", "React", "Node.js", "PostgreSQL", "Open Source"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 border border-[#1e1e1e] text-[#00ff88] font-mono text-xs hover:border-[#00ff88] transition-colors duration-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Stats + interests */}
          <div ref={rightRef} className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {about.stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`border border-[#1e1e1e] p-4 hover:border-[#00ff88] transition-colors duration-200 group ${animClass.scaleIn(rightVisible, i * 120)}`}
                >
                  <div className="font-mono text-3xl font-black text-[#00ff88] group-hover:text-white transition-colors duration-200">
                    {stat.value}
                  </div>
                  <div className="font-mono text-[#555] text-xs mt-1 leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Interests */}
            <div className={`border border-[#1e1e1e] p-6 space-y-4 ${animClass.fadeRight(rightVisible, 360)}`}>
              <p className="font-mono text-[#444] text-xs uppercase tracking-widest">
                &gt; Centres d'intérêt
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Gamepad2 size={16} className="text-[#00ff88] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-white font-mono text-sm">Jeux Vidéo</p>
                    <p className="text-[#555] text-xs mt-0.5">
                      Passion qui nourrit ma créativité dans le développement
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe size={16} className="text-[#00ff88] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-white font-mono text-sm">Open Source</p>
                    <p className="text-[#555] text-xs mt-0.5">
                      Contribution à la communauté et partage de connaissances
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Cpu size={16} className="text-[#00ff88] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-white font-mono text-sm">Nouvelles Technologies</p>
                    <p className="text-[#555] text-xs mt-0.5">
                      Veille tech permanente et expérimentation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
