import React, { useState, useEffect } from "react";
import { Menu, Code2, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { Menu, X, Code2, Sun, Moon } from "lucide-react";

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
  const { isDark, toggleTheme } = useTheme();

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

  // Dynamic styles based on theme
  const headerBg = scrolled
    ? isDark
      ? "bg-[#0d0d0d]/95 backdrop-blur-md border-b border-[#1e1e1e]"
      : "backdrop-blur-md border-b"
    : "bg-transparent";

  const headerStyle = scrolled && !isDark
    ? { backgroundColor: "rgba(245,244,239,0.95)", borderBottomColor: "#dddbd4" }
    : {};

  const logoTextColor = isDark ? "text-white" : "text-[#1a1a1a]";
  const navTextBase = isDark ? "text-[#888888] hover:text-white" : "text-[#777777] hover:text-[#1a1a1a]";
  const accentColor = isDark ? "text-[#00ff88]" : "text-[#008844]";
  const accentBorder = isDark ? "border-[#00ff88]" : "border-[#008844]";
  const ctaClass = isDark
    ? "border-[#00ff88] text-[#00ff88] hover:bg-[#00ff88] hover:text-[#0d0d0d]"
    : "border-[#008844] text-[#008844] hover:bg-[#008844] hover:text-white";
  const mobileBg = isDark ? "bg-[#0d0d0d]" : "bg-[#f5f4ef]";
  const mobileBorder = isDark ? "border-[#1e1e1e]" : "border-[#dddbd4]";
  const mobileTextBase = isDark ? "text-[#888888]" : "text-[#777777]";
  const knobBg = isDark ? "bg-[#00ff88]" : "bg-[#008844]";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}
      style={headerStyle}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="flex items-center gap-2 group"
        >
          <img
            src="/logo.png"
            alt="Logo"
            className="w-8 h-8"
          />
          <span className={`font-mono font-bold text-lg tracking-tight transition-colors duration-200 ${logoTextColor} group-hover:${accentColor}`}>
            louis<span className={accentColor}>.</span>brazeau
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
                  ? accentColor
                  : navTextBase
              }`}
            >
              {link.label}
              {activeSection === link.href.replace("#", "") && (
                <span className={`absolute bottom-0 left-4 right-4 h-px ${isDark ? "bg-[#00ff88]" : "bg-[#008844]"}`} />
              )}
            </a>
          ))}
        </nav>

        {/* Right: toggle + CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle Pill */}
          <button
            onClick={toggleTheme}
            aria-label="Changer le thème"
            className={`relative w-14 h-7 flex items-center px-1 border transition-colors duration-300 ${
              isDark ? "border-[#333] bg-[#111]" : "border-[#cccccc] bg-white"
            }`}
          >
            <span className={`absolute left-1.5 transition-opacity duration-300 ${isDark ? "opacity-30" : "opacity-100"}`}>
              <Sun size={12} className="text-[#febc2e]" />
            </span>
            <span className={`absolute right-1.5 transition-opacity duration-300 ${isDark ? "opacity-100" : "opacity-30"}`}>
              <Moon size={12} className={isDark ? "text-[#aaaaaa]" : "text-[#888]"} />
            </span>
            <span
              className={`relative z-10 w-5 h-5 flex items-center justify-center transition-transform duration-300 ease-in-out ${knobBg} ${
                isDark ? "translate-x-7" : "translate-x-0"
              }`}
            >
              {isDark ? (
                <Moon size={10} className="text-[#0d0d0d]" />
              ) : (
                <Sun size={10} className="text-white" />
              )}
            </span>
          </button>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className={`flex items-center gap-2 px-4 py-2 border font-mono text-sm transition-colors duration-200 ${ctaClass}`}
          >
            <Code2 size={14} />
            Disponible
          </a>
        </div>

        {/* Mobile: toggle + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Changer le thème"
            className={`w-8 h-8 flex items-center justify-center border transition-colors duration-200 ${
              isDark
                ? "border-[#333] text-[#888888] hover:border-[#00ff88] hover:text-[#00ff88]"
                : "border-[#cccccc] text-[#555] hover:border-[#008844] hover:text-[#008844]"
            }`}
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button
            className={`transition-colors duration-200 ${isDark ? "text-[#888888] hover:text-white" : "text-[#777] hover:text-[#1a1a1a]"}`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } ${mobileBg} border-t ${mobileBorder}`}
      >
        <nav className="flex flex-col px-6 py-4 gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`px-2 py-3 font-mono text-sm border-b ${mobileBorder} last:border-0 transition-colors duration-200 ${
                activeSection === link.href.replace("#", "")
                  ? accentColor
                  : mobileTextBase
              }`}
            >
              <span className={accentColor}>$ </span>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
