import React from "react";
import { Terminal, Code2, Cpu, CheckCircle, ArrowRight, ShieldAlert, Zap } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onCtaClick: (sectionId: string) => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  const stats = [
    { label: "Elite Products Built", value: "60+", icon: Code2 },
    { label: "Client Retainer Rate", value: "98.4%", icon: CheckCircle },
    { label: "Engineering Lead Time", value: "2x Faster", icon: Zap },
    { label: "System Uptime Average", value: "99.99%", icon: Cpu },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden grid-bg-red"
    >
      {/* Visual Ambient Blur effects (Crimson Red / Clean Minimal Soft Accent) */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-red/5 rounded-full filter blur-[100px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[450px] h-[450px] bg-brand-red/5 rounded-full filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Tag / Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-brand-red/5 border border-brand-red/20 rounded-full"
            >
              <Terminal className="w-3.5 h-3.5 text-brand-red" />
              <span className="font-mono text-[10px] sm:text-xs text-brand-red font-semibold uppercase tracking-wider">
                &gt; SYSTEM STATE: SECURE & ACTIVE
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-black leading-none"
            >
              WE CONVERT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-black via-zinc-800 to-brand-red font-mono font-black italic">
                COMPLEXITY
              </span>{" "}
              INTO <br />
              <span className="relative inline-block">
                <span className="text-brand-black glow-red">HIGH-PERFORMANCE</span>
                <span className="absolute -bottom-1 left-0 right-0 h-1.5 bg-brand-red/80 glow-border-red rounded-full"></span>
              </span>{" "}
              CODE.
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-zinc-600 text-base sm:text-lg max-w-xl font-sans leading-relaxed"
            >
              Codebox Labs is a premier custom engineering studio. We design, craft, 
              and scale mission-critical web applications, native mobile apps, and 
              highly tailored AI agent pipelines with speed and cryptographic rigor.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <button
                id="hero-estimator-btn"
                onClick={() => onCtaClick("estimator")}
                className="bg-brand-red hover:bg-brand-red-hover text-white text-sm font-mono font-bold uppercase tracking-wider px-6 py-4 rounded transition-all duration-200 hover:shadow-lg hover:shadow-brand-red/20 hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
              >
                Launch App Estimator
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-console-btn"
                onClick={() => onCtaClick("console")}
                className="bg-transparent hover:bg-zinc-50 border border-zinc-200 hover:border-zinc-300 text-zinc-600 hover:text-brand-black text-sm font-mono font-medium uppercase tracking-wider px-6 py-4 rounded transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                &lt; Run Console Demo /&gt;
              </button>
            </motion.div>
          </div>

          {/* Hero Right Visual Column - Decorative Terminal Console Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-5 relative"
          >
            {/* Outer Box Container with light borders */}
            <div className="relative bg-white border border-zinc-200 rounded-lg overflow-hidden shadow-xl shadow-zinc-100/50">
              {/* Header Bar */}
              <div className="bg-zinc-50 px-4 py-3 border-b border-zinc-200 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-brand-red inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-zinc-200 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-zinc-300 inline-block"></span>
                </div>
                <span className="font-mono text-[10px] text-zinc-400 tracking-wider">
                  guest@codebox-labs:~
                </span>
                <span className="w-4"></span>
              </div>

              {/* Terminal Body content */}
              <div className="p-5 space-y-4 font-mono text-xs text-zinc-700 bg-zinc-50/50 min-h-[300px]">
                <div className="flex gap-2">
                  <span className="text-brand-red">guest@codebox:~$</span>
                  <span className="text-brand-black font-semibold">curl -s https://codeboxlabs.com/meta</span>
                </div>
                <div className="text-zinc-500 pl-4">
                  {"{"}
                  <br />
                  &nbsp;&nbsp;<span className="text-zinc-600">"status"</span>:{" "}
                  <span className="text-brand-red">"ESTABLISHED"</span>,<br />
                  &nbsp;&nbsp;<span className="text-zinc-600">"agency"</span>:{" "}
                  <span className="text-brand-red font-semibold">"Codebox Labs"</span>,<br />
                  &nbsp;&nbsp;<span className="text-zinc-600">"focus"</span>: [
                  <span className="text-zinc-700">"Scale"</span>,{" "}
                  <span className="text-zinc-700">"UI_Craft"</span>,{" "}
                  <span className="text-zinc-700">"AI"</span>],<br />
                  &nbsp;&nbsp;<span className="text-zinc-600">"sprintSpeed"</span>:{" "}
                  <span className="text-brand-black">"AGILE_MAX"</span>
                  <br />
                  {"}"}
                </div>
                <div className="flex gap-2 pt-2">
                  <span className="text-brand-red">guest@codebox:~$</span>
                  <span className="text-brand-black font-semibold">npx codebox --compile-stack</span>
                </div>
                <div className="pl-4 space-y-1 text-[11px]">
                  <p className="text-zinc-500">⚡ Initializing compiler pipeline...</p>
                  <p className="text-brand-red font-semibold">✓ React, NextJS & Vite modules verified.</p>
                  <p className="text-zinc-500">✓ AI Vector Store & Agent SDKs initialized.</p>
                  <p className="text-zinc-700 font-semibold">● Pipeline Active. Ready for custom requirements.</p>
                </div>
                <div className="pt-2 animate-pulse flex items-center gap-1">
                  <span className="text-brand-red">guest@codebox:~$</span>
                  <span className="w-2 h-4 bg-brand-red inline-block"></span>
                </div>
              </div>
            </div>

            {/* Small hovering overlay box detailing speed */}
            <div className="absolute -bottom-6 -left-6 bg-white border border-zinc-200 p-4 rounded-md shadow-xl hidden sm:flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-red/5 border border-brand-red/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-brand-red animate-bounce" />
              </div>
              <div className="text-left">
                <p className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest leading-none">
                  Delivery Index
                </p>
                <p className="font-display font-bold text-brand-black text-sm">
                  100% Production Ready
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Strip */}
        <div className="mt-16 sm:mt-24 pt-8 border-t border-zinc-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  id={`hero-stat-${idx}`}
                  className="flex items-start gap-3 text-left p-2 rounded hover:bg-zinc-50 transition-colors"
                >
                  <div className="p-2 bg-brand-red/5 rounded border border-brand-red/10 mt-1">
                    <Icon className="w-4 h-4 text-brand-red" />
                  </div>
                  <div>
                    <span className="block font-display text-2xl sm:text-3xl font-extrabold text-brand-black tracking-tight">
                      {stat.value}
                    </span>
                    <span className="block font-mono text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider mt-0.5">
                      {stat.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
