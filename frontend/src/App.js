import React from "react";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Parcours from "./components/Parcours";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { ThemeProvider, useTheme, T } from "./context/ThemeContext";

function AppContent() {
  const { isDark } = useTheme();
  const theme = isDark ? T.dark : T.light;

  return (
    <div
      data-theme={isDark ? "dark" : "light"}
      className="portfolio-root min-h-screen"
      style={{ backgroundColor: theme.bgMain, color: theme.text, transition: "background-color 0.3s ease, color 0.25s ease" }}
    >
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Parcours />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
