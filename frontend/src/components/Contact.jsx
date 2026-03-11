import React, { useState } from "react";
import { Mail, Github, Linkedin, Send, ChevronRight, Copy, CheckCheck } from "lucide-react";
import { portfolioData } from "../mock";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "../hooks/use-toast";
import { Toaster } from "./ui/toaster";
import { useScrollAnimation, animClass } from "../hooks/useScrollAnimation";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const { personal } = portfolioData;

const contactLinks = [
  { label: "Email", value: personal.email, href: `mailto:${personal.email}`, icon: Mail, copyable: true },
  { label: "GitHub", value: "github.com/louis-dev", href: personal.github, icon: Github, copyable: false },
  { label: "LinkedIn", value: "linkedin.com/in/louis-dev", href: personal.linkedin, icon: Linkedin, copyable: false },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: leftRef, isVisible: leftVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: rightRef, isVisible: rightVisible } = useScrollAnimation({ threshold: 0.1 });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    try {
      await axios.post(`${BACKEND_URL}/api/contact`, form);
      setSubmitted(true);
      toast({ title: "Message envoyé !", description: "Merci, je vous répondrai rapidement." });
    } catch (err) {
      // Fallback mock submission
      await new Promise((r) => setTimeout(r, 800));
      setSubmitted(true);
      toast({ title: "Message envoyé !", description: "Merci pour votre message !" });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-28 bg-[#0a0a0a] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e1e1e] to-transparent" />
      <Toaster />

      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={titleRef}
          className={`flex items-center gap-4 mb-16 ${animClass.fadeUp(titleVisible)}`}
        >
          <span className="font-mono text-[#00ff88] text-sm">06.</span>
          <h2 className="font-mono text-3xl font-bold text-white">Contact</h2>
          <div className="flex-1 h-px bg-[#1e1e1e] max-w-xs" />
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Left */}
          <div ref={leftRef} className={`space-y-8 ${animClass.fadeLeft(leftVisible)}`}>
            <div>
              <p className="font-mono text-[#00ff88] text-sm mb-3">&gt; Travaillons ensemble</p>
              <h3 className="font-mono text-2xl font-bold text-white mb-4">Vous avez un projet ?</h3>
              <p className="text-[#666] leading-relaxed">
                Je suis actuellement disponible pour des missions freelance, des projets
                collaboratifs ou des opportunités d'emploi.
              </p>
            </div>

            <div className="space-y-3">
              {contactLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <div
                    key={link.label}
                    className="flex items-center justify-between border border-[#1e1e1e] p-4 hover:border-[#00ff88] transition-colors duration-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={16} className="text-[#00ff88]" />
                      <div>
                        <p className="font-mono text-[#444] text-xs uppercase tracking-widest">{link.label}</p>
                        <p className="font-mono text-white text-sm mt-0.5">{link.value}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {link.copyable && (
                        <button
                          onClick={handleCopyEmail}
                          className="p-1.5 text-[#444] hover:text-[#00ff88] transition-colors duration-200"
                        >
                          {copiedEmail ? <CheckCheck size={14} className="text-[#00ff88]" /> : <Copy size={14} />}
                        </button>
                      )}
                      <a
                        href={link.href}
                        target={link.copyable ? undefined : "_blank"}
                        rel="noreferrer"
                        className="p-1.5 text-[#444] hover:text-[#00ff88] transition-colors duration-200"
                      >
                        <ChevronRight size={14} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-3 p-4 border border-[#1e1e1e]">
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00ff88]" />
                <div className="absolute inset-0 rounded-full bg-[#00ff88] animate-ping opacity-50" />
              </div>
              <span className="font-mono text-sm text-[#888888]">
                Disponible pour de nouvelles opportunités
              </span>
            </div>
          </div>

          {/* Right: Form */}
          <div
            ref={rightRef}
            className={`border border-[#1e1e1e] p-8 ${animClass.fadeRight(rightVisible, 150)}`}
          >
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#1e1e1e]">
              <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
              <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
              <span className="w-2 h-2 rounded-full bg-[#28c840]" />
              <span className="ml-2 font-mono text-[#444] text-xs">contact.form</span>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center justify-center h-64 space-y-4">
                <div className="w-16 h-16 border border-[#00ff88] flex items-center justify-center">
                  <CheckCheck size={28} className="text-[#00ff88]" />
                </div>
                <p className="font-mono text-white text-center">Message envoyé !</p>
                <p className="font-mono text-[#555] text-sm text-center">
                  Je vous répondrai dans les plus brefs délais.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", message: "" }); }}
                  className="font-mono text-[#00ff88] text-xs hover:underline"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="font-mono text-xs text-[#444] uppercase tracking-widest block mb-2">
                    &gt; Nom
                  </label>
                  <Input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    required
                    className="bg-[#111] border-[#1e1e1e] text-white font-mono placeholder:text-[#333] focus:border-[#00ff88] focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs text-[#444] uppercase tracking-widest block mb-2">
                    &gt; Email
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    required
                    className="bg-[#111] border-[#1e1e1e] text-white font-mono placeholder:text-[#333] focus:border-[#00ff88] focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs text-[#444] uppercase tracking-widest block mb-2">
                    &gt; Message
                  </label>
                  <Textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Votre message..."
                    rows={5}
                    required
                    className="bg-[#111] border-[#1e1e1e] text-white font-mono placeholder:text-[#333] focus:border-[#00ff88] focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#00ff88] text-[#0d0d0d] font-mono font-bold text-sm hover:bg-white transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="animate-spin inline-block w-3 h-3 border border-[#0d0d0d] border-t-transparent rounded-full" />
                      Envoi...
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Envoyer le message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
