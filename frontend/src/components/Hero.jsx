import React, { useEffect, useState } from "react";
import { ArrowDown, Github, Linkedin, Mail, ChevronRight } from "lucide-react";
import { useTheme, T } from "../context/ThemeContext";
import { portfolioData } from "../mock";

const { personal } = portfolioData;

function TypewriterText({ texts, speed = 80, pause = 2000 }) {
  const [displayed, setDisplayed] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    let timeout;
    if (!deleting && charIndex <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex));
        setCharIndex((i) => i + 1);
      }, speed);
    } else if (!deleting && charIndex > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIndex >= 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex));
        setCharIndex((i) => i - 1);
      }, speed / 2);
    } else {
      setDeleting(false);
      setTextIndex((i) => (i + 1) % texts.length);
      setCharIndex(0);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, textIndex, texts, speed, pause]);

  return (
    <span className="text-[#00ff88]">
      {displayed}
      <span className="animate-pulse">_</span>
    </span>
  );
}

export default function Hero() {
  const { isDark } = useTheme();
  const theme = isDark ? T.dark : T.light;
  const handleScrollTo = (href) => {
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-start overflow-hidden bg-[#0d0d0d]"
    
      style={{ backgroundColor: theme.bgMain, transition: "background-color 0.3s ease" }}>
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#00ff88 1px, transparent 1px), linear-gradient(90deg, #00ff88 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Glow */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #00ff88 0%, transparent 70%)" }}
      />
      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,136,0.01) 2px, rgba(0,255,136,0.01) 4px)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-32 w-full">
        {/* Terminal dots */}
        <div className="flex items-center gap-2 mb-8">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-[#444] text-xs">~/portfolio — louis.brazeau@dev:~$</span>
        </div>

        <div className="space-y-6">
          <p className="font-mono text-[#00ff88] text-sm tracking-widest uppercase">
            &gt; Hello, World! Je suis
          </p>

          <h1 className="font-mono text-6xl md:text-8xl font-black text-white leading-none tracking-tight">
            {personal.name}
            <span className="text-[#00ff88]">.</span>
          </h1>

          <div className="font-mono text-xl md:text-2xl text-[#888888] min-h-[2rem]">
            <TypewriterText
              texts={[
                "Développeur Full Stack",
                "React Developer",
                "Node.js Engineer",
                "UI/UX Enthusiast",
              ]}
            />
          </div>

          <p className="max-w-xl text-[#666666] text-base leading-relaxed">
            {personal.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => handleScrollTo("#projects")}
              className="flex items-center gap-2 px-6 py-3 bg-[#00ff88] text-[#0d0d0d] font-mono font-bold text-sm hover:bg-white transition-colors duration-200"
            >
              <ChevronRight size={16} />
              Voir mes projets
            </button>
            <button
              onClick={() => handleScrollTo("#contact")}
              className="flex items-center gap-2 px-6 py-3 border border-[#333] text-[#888888] font-mono text-sm hover:border-[#00ff88] hover:text-[#00ff88] transition-colors duration-200"
            >
              Me contacter
            </button>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-5 pt-2">
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="text-[#444] hover:text-[#00ff88] transition-colors duration-200"
            >
              <Github size={20} />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-[#444] hover:text-[#00ff88] transition-colors duration-200"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="text-[#444] hover:text-[#00ff88] transition-colors duration-200"
            >
              <Mail size={20} />
            </a>
            <div className="h-px bg-[#222] w-16" />
            <span className="font-mono text-[#333] text-xs">@louis.brazeau.pro</span>
          </div>
        </div>
      </div>
    </section>
  );
}
