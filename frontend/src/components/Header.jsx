import React, { useState, useEffect } from "react";
import { Menu, X, Terminal, Code2 } from "lucide-react";

const navLinks = [
  { label: "Accueil", href: "#hero" },
  { label: "À propos", href: "#about" },
  { label: "Compétences", href: "#skills" },
  { label: "Parcours", href: "#parcours" },
  { label: "Projets", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-[#0d0d0d]/95 backdrop-blur-md border-b border-[#1e1e1e]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 bg-[#00ff88] flex items-center justify-center">
            <Terminal size={16} className="text-[#0d0d0d]" />
          </div>
          <span className="font-mono text-white font-bold text-lg tracking-tight group-hover:text-[#00ff88] transition-colors duration-200">
            louis<span className="text-[#00ff88]">.</span>dev
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`px-4 py-2 font-mono text-sm transition-colors duration-200 relative ${
                activeSection === link.href.replace("#", "")
                  ? "text-[#00ff88]"
                  : "text-[#888888] hover:text-white"
              }`}
            >
              {link.label}
              {activeSection === link.href.replace("#", "") && (
                <span className="absolute bottom-0 left-4 right-4 h-px bg-[#00ff88]" />
              )}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, "#contact")}
          className="hidden md:flex items-center gap-2 px-4 py-2 border border-[#00ff88] text-[#00ff88] font-mono text-sm hover:bg-[#00ff88] hover:text-[#0d0d0d] transition-colors duration-200"
        >
          <Code2 size={14} />
          Disponible
        </a>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-[#888888] hover:text-white transition-colors duration-200"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        } bg-[#0d0d0d] border-t border-[#1e1e1e]`}
      >
        <nav className="flex flex-col px-6 py-4 gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`px-2 py-3 font-mono text-sm border-b border-[#1e1e1e] last:border-0 transition-colors duration-200 ${
                activeSection === link.href.replace("#", "")
                  ? "text-[#00ff88]"
                  : "text-[#888888]"
              }`}
            >
              <span className="text-[#00ff88]">$ </span>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
