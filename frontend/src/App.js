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

function App() {
  return (
    <div className="bg-[#0d0d0d] min-h-screen">
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

export default App;
