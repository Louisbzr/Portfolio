import React, { createContext, useContext, useLayoutEffect, useState } from "react";

const ThemeContext = createContext({ isDark: true, toggleTheme: () => {} });

// Theme color tokens
export const T = {
  dark: {
    bgMain:    "#0d0d0d",
    bgAlt:     "#0a0a0a",
    bgFoot:    "#080808",
    surface:   "#111111",
    accent:    "#00ff88",
    text:      "#ffffff",
    textSub:   "#888888",
    textMuted: "#666666",
    dim:       "#444444",
    border:    "#1e1e1e",
    border2:   "#333333",
    track:     "#1a1a1a",
  },
  light: {
    bgMain:    "#f5f4ef",
    bgAlt:     "#edecea",
    bgFoot:    "#e5e3dc",
    surface:   "#ffffff",
    accent:    "#008844",
    text:      "#1a1a1a",
    textSub:   "#555555",
    textMuted: "#444444",
    dim:       "#888888",
    border:    "#dddbd4",
    border2:   "#cccccc",
    track:     "#e0ddd6",
  },
};

const LIGHT_CSS = `
/* ── Light Mode Overrides (data-theme="light") ── */
[data-theme="light"] [class*="text-white"]    { color: #1a1a1a !important; }
[data-theme="light"] [class*="text-[#888"]    { color: #555555 !important; }
[data-theme="light"] [class*="text-[#666"]    { color: #444444 !important; }
[data-theme="light"] [class*="text-[#555"]    { color: #666666 !important; }
[data-theme="light"] [class*="text-[#444"]    { color: #888888 !important; }
[data-theme="light"] [class*="text-[#333"]    { color: #aaaaaa !important; }
[data-theme="light"] [class*="text-[#cccc"]   { color: #333333 !important; }
[data-theme="light"] [class*="text-[#00ff88"] { color: #008844 !important; }
[data-theme="light"] [class*="text-[#0d0d0d"] { color: #ffffff !important; }

[data-theme="light"] [class*="border-[#1e1e1e"] { border-color: #dddbd4 !important; }
[data-theme="light"] [class*="border-[#333"]    { border-color: #cccccc !important; }
[data-theme="light"] [class*="border-[#222"]    { border-color: #e0ddd6 !important; }
[data-theme="light"] [class*="border-[#2a2"]    { border-color: #cccccc !important; }
[data-theme="light"] [class*="border-[#1a1"]    { border-color: #e0ddd6 !important; }
[data-theme="light"] [class*="border-[#00ff88"] { border-color: #008844 !important; }

[data-theme="light"] [class*="bg-[#1a1a1a]"]   { background-color: #e0ddd6 !important; }
[data-theme="light"] [class*="bg-[#111]"]       { background-color: #ffffff !important; }
[data-theme="light"] [class*="bg-[#0a0a0a]"]   { background-color: #edecea !important; }
[data-theme="light"] [class*="bg-[#00ff88]"] .text-\\[\\#0d0d0d\\] { color: #fff !important; }

[data-theme="light"] [class*="hover:text-[#00ff88]"]:hover   { color: #008844 !important; }
[data-theme="light"] [class*="hover:border-[#00ff88]"]:hover { border-color: #008844 !important; }
[data-theme="light"] [class*="hover:bg-[#00ff88]"]:hover     { background-color: #008844 !important; }
[data-theme="light"] [class*="focus:border-[#00ff88]"]:focus { border-color: #008844 !important; }

[data-theme="light"] [class*="bg-[#00ff88]/"]  { background-color: rgba(0,136,68,0.07) !important; }
[data-theme="light"] [class*="bg-[#00ff88]"]   { background-color: #008844 !important; }

[data-theme="light"] input, [data-theme="light"] textarea {
  background-color: #ffffff !important;
  color: #1a1a1a !important;
}
[data-theme="light"] input::placeholder,
[data-theme="light"] textarea::placeholder { color: #aaaaaa !important; }

[data-theme="light"] ::selection { background:#008844; color:#fff; }
[data-theme="light"] ::-webkit-scrollbar-track { background:#f5f4ef; }
[data-theme="light"] ::-webkit-scrollbar-thumb { background:#cccccc; }
[data-theme="light"] ::-webkit-scrollbar-thumb:hover { background:#008844; }

[data-theme="light"] * {
  transition-property: background-color, color, border-color, box-shadow;
  transition-duration: 0.25s;
  transition-timing-function: ease;
}
[data-theme="light"] .animate-bounce,
[data-theme="light"] .animate-ping,
[data-theme="light"] .animate-spin,
[data-theme="light"] .animate-pulse { transition: none !important; }

/* ── Éléments sur fond vert au hover (ex: project cards) ── */
/* Ces règles sont APRÈS toutes les autres → elles gagnent à spécificité égale */
[data-theme="light"] [data-ongreen="true"] [class*="text-"],
[data-theme="light"] [data-ongreen="true"] [class*="text-white"],
[data-theme="light"] [data-ongreen="true"] {
  color: #ffffff !important;
  transition: none !important;
}
`;

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    try {
      const s = localStorage.getItem("portfolio-theme");
      return s ? s === "dark" : true;
    } catch { return true; }
  });

  useLayoutEffect(() => {
    // Inject / remove the light-mode style tag
    let el = document.getElementById("ptf-light-css");
    if (!isDark) {
      if (!el) {
        el = document.createElement("style");
        el.id = "ptf-light-css";
        document.head.appendChild(el);
      }
      el.textContent = LIGHT_CSS;
    } else {
      el?.remove();
    }
    localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => setIsDark(p => !p);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, T }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() { return useContext(ThemeContext); }