import React, { useState } from "react";
import { FolderGit2, ArrowUpRight, CheckCircle2, Cpu, Smartphone, Database, X } from "lucide-react";
import { CaseStudy } from "../types";
import { motion, AnimatePresence } from "motion/react";

export default function Portfolio() {
  const caseStudies: CaseStudy[] = [
    {
      id: "aura-ai",
      title: "Real-time Voice & NLP Platform",
      client: "Aura Systems Inc.",
      category: "AI Engineering & Pipelines",
      description: "Low-latency voice analytics proxy handling real-time audio parsing, semantic classification, and intelligent summarizations.",
      longDescription: "Aura Systems required an enterprise-grade NLP pipeline capable of handling high-concurrency telephone networks. We designed and built a server-side gRPC proxy layer that ingests raw audio buffers, handles token streaming, translates with sub-350ms latency, and injects context-specific vectors into real-time caches. The summaries are classified using fine-tuned Gemini agent structures.",
      stats: [
        { label: "Inference Latency", value: "320ms" },
        { label: "Transcription Accuracy", value: "99.4%" },
        { label: "Concurrent Streams", value: "250K+" }
      ],
      techStack: ["Python / FastAPI", "Google GenAI API", "Redis Cache", "Kubernetes", "gRPC Hooks"],
      accentColor: "#ff1f2e"
    },
    {
      id: "apex-fintech",
      title: "Apex High-Frequency Trading Ledger",
      client: "Apex Capital Group",
      category: "Web Platforms & SaaS",
      description: "A high-performance crypto and fiat exchange board providing real-time data sync and canvas-driven price charts.",
      longDescription: "Apex Capital needed a trading terminal capable of rendering high-frequency transactions with zero layout layout flickering. We engineered a canvas-level renderer that reads direct socket streams of crypto events. The system bypasses normal state overhead by committing ledger logs to optimized server pools, delivering sub-15ms client frame render speeds.",
      stats: [
        { label: "Frame Refresh Speed", value: "12ms" },
        { label: "Transactions per Sec", value: "85,000" },
        { label: "Uptime SLA", value: "99.999%" }
      ],
      techStack: ["React / Vite", "Node.js Express", "Apache Kafka", "PostgreSQL", "HTML5 Canvas"],
      accentColor: "#dc2626"
    },
    {
      id: "veloce-logistics",
      title: "Veloce Smart Geofence Mobile App",
      client: "Veloce Global Cargo",
      category: "Native Mobile Engineering",
      description: "An offline-first container dispatch tracking solution utilizing native biometrics, geofences, and hardware modules.",
      longDescription: "Tracking maritime container temperature, humidity, and location coordinates requires solid offline data storage. We crafted a custom SQLite schema on top of React Native Expo. When drivers traverse remote locations, telemetry is persisted locally on the device, queue-validated, and securely synced upon internet connection re-establishment.",
      stats: [
        { label: "Offline Integrity", value: "100%" },
        { label: "Active Mobile Units", value: "45,000" },
        { label: "Dispatcher Uptime", value: "100%" }
      ],
      techStack: ["React Native / Expo", "SQLite", "Native Geofence API", "Google Maps Platform", "Sentry"],
      accentColor: "#991b1b"
    }
  ];

  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  return (
    <section id="portfolio" className="py-20 bg-white border-t border-zinc-100 relative">
      {/* Decorative ambient background orb */}
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-red/5 rounded-full filter blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="text-left max-w-2xl">
            <p className="font-mono text-xs text-brand-red uppercase tracking-widest mb-2">
              // Selected Deployments
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand-black tracking-tight">
              PRODUCTS SHIPPED TO PRODUCTION
            </h2>
            <p className="mt-3 text-zinc-600 font-sans text-sm sm:text-base">
              A curated catalog of elite applications designed, engineered, and scaled 
              by Codebox Labs. We build for performance under extreme stress.
            </p>
          </div>
          <div>
            <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider flex items-center gap-2 border border-zinc-200 px-4 py-2 bg-zinc-50 rounded">
              <FolderGit2 className="w-4 h-4 text-brand-red" />
              PROD_READY_BUILDS: ok
            </span>
          </div>
        </div>

        {/* Portfolio Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              id={`portfolio-card-${study.id}`}
              className="bg-white border border-zinc-200 rounded-lg overflow-hidden group hover:border-brand-red/50 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md"
            >
              {/* Card visual showcase slot */}
              <div className="p-6 pb-0 relative bg-zinc-50/50">
                {/* Simulated visual wireframe graphic representive of product */}
                <div className="h-44 w-full bg-white border border-zinc-200 rounded-md relative overflow-hidden flex flex-col justify-between p-4 font-mono text-[9px] text-zinc-400">
                  {/* Grid background inside mock screen */}
                  <div className="absolute inset-0 grid-bg opacity-40"></div>
                  
                  {/* Mock topbar */}
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-2 relative z-10">
                    <span className="text-zinc-500 text-[10px]">&lt; {study.client} /&gt;</span>
                    <span className="px-1.5 py-0.5 bg-brand-red/10 text-brand-red rounded border border-brand-red/20 font-bold uppercase tracking-widest text-[8px]">
                      LIVE
                    </span>
                  </div>

                  {/* Mock center visual depending on product */}
                  <div className="flex-1 flex items-center justify-center relative z-10 py-2">
                    {study.id === "aura-ai" && (
                      <div className="w-full space-y-2 flex flex-col items-center">
                        <div className="flex items-center gap-1 w-2/3 h-5 justify-center">
                          <span className="w-1 h-3 bg-brand-red animate-pulse rounded-full"></span>
                          <span className="w-1 h-5 bg-brand-red animate-pulse rounded-full delay-75"></span>
                          <span className="w-1 h-2 bg-brand-red animate-pulse rounded-full delay-100"></span>
                          <span className="w-1 h-4 bg-brand-red animate-pulse rounded-full delay-150"></span>
                          <span className="w-1 h-3 bg-brand-red animate-pulse rounded-full delay-200"></span>
                        </div>
                        <span className="text-[8px] text-zinc-500">AUDIO_STREAM_PIPE: INGESTING</span>
                      </div>
                    )}
                    {study.id === "apex-fintech" && (
                      <div className="w-full px-2 space-y-1.5 text-left">
                        <div className="flex justify-between items-center text-zinc-500 text-[8px]">
                          <span>Ledger BTC/USD</span>
                          <span className="text-brand-red">▲ +4.82%</span>
                        </div>
                        <div className="w-full h-8 bg-zinc-50 border border-zinc-100 rounded flex items-end p-1 overflow-hidden relative">
                          <div className="absolute bottom-2 left-0 right-0 h-[1px] bg-zinc-100"></div>
                          {/* Mock upward bar chart */}
                          <div className="w-full h-full flex items-end justify-between gap-1">
                            <span className="w-full bg-zinc-200 h-[20%]"></span>
                            <span className="w-full bg-zinc-200 h-[35%]"></span>
                            <span className="w-full bg-zinc-200 h-[30%]"></span>
                            <span className="w-full bg-zinc-200 h-[50%]"></span>
                            <span className="w-full bg-zinc-200 h-[45%]"></span>
                            <span className="w-full bg-brand-red/80 h-[80%]"></span>
                          </div>
                        </div>
                      </div>
                    )}
                    {study.id === "veloce-logistics" && (
                      <div className="w-full space-y-1">
                        <div className="flex items-center gap-1 text-[8px] text-zinc-500 justify-center">
                          <Database className="w-2.5 h-2.5 text-brand-red" />
                          <span>SQLITE_LOCAL_DB_STORE_ESTABLISHED</span>
                        </div>
                        <div className="flex items-center justify-center gap-4">
                          <span className="text-[10px] text-zinc-600">SYNC STATUS:</span>
                          <span className="text-[10px] px-1.5 py-0.5 bg-white rounded text-emerald-600 border border-emerald-500/20">
                            100% OK
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Mock bottombar */}
                  <div className="flex justify-between items-center text-[7px] text-zinc-400 border-t border-zinc-100 pt-1.5 relative z-10">
                    <span>TIMESCALE: {study.stats?.[0].value || "SECURE"}</span>
                    <span>FRAME_V: v1.0.4</span>
                  </div>
                </div>
              </div>

              {/* Text and interaction content */}
              <div className="p-6 space-y-4 text-left flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-zinc-400 font-mono text-[10px] uppercase tracking-wider block">
                    {study.category}
                  </span>
                  <h3 className="font-display text-lg font-bold text-brand-black group-hover:text-brand-red transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {study.description}
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  {/* Highlight stats */}
                  <div className="grid grid-cols-3 gap-2 border-y border-zinc-100 py-3">
                    {study.stats?.map((stat, idx) => (
                      <div key={idx} className="text-left">
                        <p className="font-mono text-[9px] text-zinc-400 uppercase tracking-wider truncate">
                          {stat.label}
                        </p>
                        <p className="font-display font-bold text-brand-black text-xs sm:text-sm mt-0.5">
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-1">
                    {study.techStack.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-zinc-50 border border-zinc-200 rounded font-mono text-[9px] text-zinc-500"
                      >
                        {tech}
                      </span>
                    ))}
                    {study.techStack.length > 3 && (
                      <span className="px-2 py-0.5 bg-zinc-50 border border-zinc-100 rounded font-mono text-[9px] text-zinc-400">
                        +{study.techStack.length - 3}
                      </span>
                    )}
                  </div>

                  {/* CTA */}
                  <button
                    id={`view-study-btn-${study.id}`}
                    onClick={() => setSelectedCase(study)}
                    className="w-full py-2.5 bg-white hover:bg-brand-red hover:text-white border border-zinc-200 hover:border-brand-red rounded font-mono text-xs text-zinc-700 transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    View System Specs
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Detail Modal */}
      <AnimatePresence>
        {selectedCase && (
          <div
            id="case-study-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-zinc-200 rounded-lg max-w-2xl w-full overflow-hidden shadow-2xl relative"
            >
              {/* Modal Top decoration */}
              <div className="bg-zinc-50 px-6 py-4 border-b border-zinc-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-red"></div>
                  <span className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase">
                    Case Study Spec Analysis
                  </span>
                </div>
                <button
                  id="close-modal-btn"
                  onClick={() => setSelectedCase(null)}
                  className="p-1 hover:bg-zinc-100 rounded text-zinc-400 hover:text-brand-black transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6 overflow-y-auto max-h-[80vh] text-left">
                {/* Client and Title */}
                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-brand-red uppercase tracking-wider block">
                    {selectedCase.client}
                  </span>
                  <h3 className="font-display text-2xl font-extrabold text-brand-black tracking-tight">
                    {selectedCase.title}
                  </h3>
                </div>

                {/* Main statistics banner */}
                <div className="grid grid-cols-3 gap-4 bg-zinc-50 p-4 border border-zinc-200 rounded">
                  {selectedCase.stats?.map((stat, idx) => (
                    <div key={idx}>
                      <span className="block font-mono text-[9px] text-zinc-400 uppercase tracking-widest leading-none">
                        {stat.label}
                      </span>
                      <span className="block font-display text-base sm:text-xl font-bold text-brand-black mt-1.5">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Core description block */}
                <div className="space-y-2">
                  <h4 className="font-mono text-xs text-zinc-400 uppercase tracking-wider border-b border-zinc-100 pb-2">
                    // System Requirement & Solution
                  </h4>
                  <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
                    {selectedCase.longDescription}
                  </p>
                </div>

                {/* Tech stack complete specification list */}
                <div className="space-y-3">
                  <h4 className="font-mono text-xs text-zinc-400 uppercase tracking-wider border-b border-zinc-100 pb-2">
                    // Complete Technology Specification
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCase.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-zinc-50 border border-zinc-200 rounded font-mono text-xs text-zinc-600 flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-red" />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer confirmation */}
                <div className="pt-4 border-t border-zinc-100 flex justify-end">
                  <button
                    id="modal-ok-btn"
                    onClick={() => setSelectedCase(null)}
                    className="bg-brand-red hover:bg-brand-red-hover text-white px-5 py-2 rounded font-mono text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer"
                  >
                    Close Specs Screen
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
