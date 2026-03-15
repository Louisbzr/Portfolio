import React from "react";
import { Terminal, Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { useTheme, T } from "../context/ThemeContext";
import { portfolioData } from "../mock";

const { personal } = portfolioData;

const navLinks = [
  { label: "Accueil", href: "#hero" },
  { label: "À propos", href: "#about" },
  { label: "Compétences", href: "#skills" },
  { label: "Parcours", href: "#parcours" },
  { label: "Projets", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const { isDark } = useTheme();
  const theme = isDark ? T.dark : T.light;
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#080808] border-t border-[#1e1e1e] py-12"
      style={{ backgroundColor: theme.bgFoot, transition: "background-color 0.3s ease" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-[#00ff88] flex items-center justify-center">
                <Terminal size={14} className="text-[#0d0d0d]" />
              </div>
              <span className="font-mono text-white font-bold">
                louis<span className="text-[#00ff88]">.</span>brazeau
              </span>
            </div>
            <p className="font-mono text-[#444] text-xs leading-relaxed max-w-[220px]">
              Développeur web full stack passionné par la création d'expériences numériques modernes.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="font-mono text-[#444] text-xs uppercase tracking-widest mb-4">
              Navigation
            </p>
            <nav className="space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block font-mono text-sm text-[#555] hover:text-[#00ff88] transition-colors duration-200"
                >
                  <span className="text-[#00ff88] mr-1">&gt;</span> {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <p className="font-mono text-[#444] text-xs uppercase tracking-widest mb-4">
              Contact
            </p>
            <div className="space-y-3">
              <a
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 font-mono text-sm text-[#555] hover:text-[#00ff88] transition-colors duration-200"
              >
                <Github size={14} />
                GitHub
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 font-mono text-sm text-[#555] hover:text-[#00ff88] transition-colors duration-200"
              >
                <Linkedin size={14} />
                LinkedIn
              </a>
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-2 font-mono text-sm text-[#555] hover:text-[#00ff88] transition-colors duration-200"
              >
                <Mail size={14} />
                {personal.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between pt-8 border-t border-[#1a1a1a]">
          <p className="font-mono text-[#333] text-xs">
            &copy; {new Date().getFullYear()} Louis Brazeau— Tous droits réservés
          </p>
          <div className="flex items-center gap-6">
            <p className="font-mono text-[#333] text-xs hidden sm:block">
              
            </p>
            <button
              onClick={scrollTop}
              className="w-8 h-8 border border-[#222] flex items-center justify-center text-[#444] hover:border-[#00ff88] hover:text-[#00ff88] transition-colors duration-200"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
