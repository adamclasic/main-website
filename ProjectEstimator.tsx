import React, { useState, useEffect, useRef } from "react";
import { Terminal, Play, RotateCcw, Cpu, Calendar, CreditCard, Layers, Settings, ShieldCheck, Database, Layout } from "lucide-react";
import { ConsolePreset } from "../types";
import { motion, AnimatePresence } from "motion/react";

export default function ConsolePlayground() {
  const presets: ConsolePreset[] = [
    {
      id: "saas",
      name: "SaaS Web Platform",
      tagline: "High-throughput cloud-native platform with rich dashboards",
      techStack: ["React 19 / Vite", "Node.js Express", "PostgreSQL", "Redis Cache", "Docker / Cloud Run"],
      timeline: "6 - 10 Weeks",
      basePrice: "$18,000 - $32,000",
      architectureDescription: "Highly scalable React client-side SPA containerized with Express backend. Features automatic horizontal scaling, redundant security rule verification, full database migration tracking, Stripe customer portal, and comprehensive admin analytics workspaces.",
      consoleLogs: [
        "Establishing Secure SSH connection to build server...",
        "Resolving project structure and importing package configuration...",
        "Compiling static React components with Vite in /dist...",
        "Setting up Express middleware stack and CORS headers...",
        "Connecting to cloud-hosted PostgreSQL database cluster...",
        "Generating database migrations and seeding test schemas...",
        "Verifying SSL certification and API router endpoints...",
        "Success! Sandbox application deployed live to internal test container."
      ]
    },
    {
      id: "ai-system",
      name: "AI-Powered System / Agent",
      tagline: "Custom intelligence application with advanced API integrations",
      techStack: ["Python / FastAPI", "Google GenAI SDK", "Vector DB (Pinecone)", "React Core", "LangChain"],
      timeline: "5 - 8 Weeks",
      basePrice: "$15,000 - $28,000",
      architectureDescription: "Custom AI engine integrated with semantic search pipelines and vector databases. Built using state-of-the-art server-side proxy layers to shield secret API keys. Includes prompt engineering analytics, model selection rules, streaming responses, and intelligent agent tool call callbacks.",
      consoleLogs: [
        "Spinning up FastAPI server on 0.0.0.0:8000...",
        "Verifying GEMINI_API_KEY from environment variables...",
        "Initializing Google GenAI client modules...",
        "Connecting to Pinecone Vector Index with cosine distance routing...",
        "Structuring RAG (Retrieval-Augmented Generation) document parsing pipeline...",
        "Testing model response speeds and parameter temperatures...",
        "Configuring low-latency WebSocket stream for live token output...",
        "Ready. Smart AI agent is active and listening for inference queries."
      ]
    },
    {
      id: "mobile-app",
      name: "Native iOS & Android App",
      tagline: "Fluid, high-performance cross-platform mobile experience",
      techStack: ["React Native / Expo", "Tailwind Native", "Firebase Auth", "SQLite Client", "Sentry Monitoring"],
      timeline: "8 - 12 Weeks",
      basePrice: "$24,000 - $40,000",
      architectureDescription: "Beautifully styled cross-platform native codebase offering offline-first visual support, fast biometrics integration, push notification campaigns, secure state caching, and unified app store deployments.",
      consoleLogs: [
        "Invoking Expo CLI bundler tools...",
        "Setting up Android package structures inside Manifest...",
        "Configuring iOS Xcode properties files...",
        "Initializing local SQLite SQLite DB tables for offline sync...",
        "Linking Google and Apple App Store credentials...",
        "Injecting Firebase Client auth listeners...",
        "Validating React Native performance hooks and memory limits...",
        "Compilation finished. Android APK and iOS IPA build packages generated."
      ]
    },
    {
      id: "enterprise-api",
      name: "High-Scale API & Middleware",
      tagline: "Robust microservices with real-time logging telemetry",
      techStack: ["Go (Golang)", "gRPC Protocols", "Apache Kafka", "Kubernetes", "Next.js Admin Dashboard"],
      timeline: "8 - 14 Weeks",
      basePrice: "$30,000 - $55,000",
      architectureDescription: "Super-fast Go-based API microservices utilizing real-time event brokers. Built with strict structural logging, Kubernetes orchestrations, Kafka queues, and custom web management control boards.",
      consoleLogs: [
        "Starting Go microservice module controller...",
        "Compiling protobuf structural files for gRPC server...",
        "Spawning Kafka cluster topic partitions...",
        "Deploying Kubernetes pods and active load balancers...",
        "Instantiating Prometheus telemetry scraping collectors...",
        "Assembling admin dashboard panel in Next.js...",
        "Testing high-concurrency request latency (Target: < 12ms)...",
        "Success! Microservice cluster is running healthy under load."
      ]
    }
  ];

  const [selectedId, setSelectedId] = useState<string>("saas");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentLogs, setCurrentLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [stepFinished, setStepFinished] = useState<boolean>(false);

  const logsEndRef = useRef<HTMLDivElement>(null);
  const selectedPreset = presets.find((p) => p.id === selectedId) || presets[0];

  useEffect(() => {
    // Reset compilation when preset changes
    setIsRunning(false);
    setCurrentLogs([]);
    setProgress(0);
    setStepFinished(false);
  }, [selectedId]);

  const runCompiler = () => {
    if (isRunning) return;
    setIsRunning(true);
    setCurrentLogs([]);
    setProgress(0);
    setStepFinished(false);

    let logIndex = 0;
    const logsToPrint = selectedPreset.consoleLogs;

    const interval = setInterval(() => {
      if (logIndex < logsToPrint.length) {
        setCurrentLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${logsToPrint[logIndex]}`]);
        logIndex++;
        setProgress((logIndex / logsToPrint.length) * 100);
      } else {
        clearInterval(interval);
        setStepFinished(true);
        setIsRunning(false);
      }
    }, 450);
  };

  // Auto-scroll logs
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentLogs]);

  return (
    <section id="console" className="py-20 bg-zinc-50 border-y border-zinc-100 relative">
      {/* Subtle red mesh in background */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-red/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-red/5 border border-brand-red/15 rounded-md mb-3">
            <Terminal className="w-3.5 h-3.5 text-brand-red" />
            <span className="font-mono text-xs text-brand-red font-medium tracking-wider uppercase">
              The Codebox Playground
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand-black tracking-tight">
            SIMULATE YOUR ARCHITECTURE
          </h2>
          <p className="mt-3 text-zinc-600 font-sans text-sm sm:text-base">
            Select a project architecture below and trigger our local compiler to run 
            live system simulation logs and preview our recommended stack and timelines.
          </p>
        </div>

        {/* Console Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Preset Selector Sidebar */}
          <div className="lg:col-span-4 space-y-3">
            <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest text-left pl-1">
              Select Architecture Spec:
            </p>
            <div className="space-y-2">
              {presets.map((preset) => (
                <button
                  key={preset.id}
                  id={`preset-btn-${preset.id}`}
                  onClick={() => setSelectedId(preset.id)}
                  disabled={isRunning}
                  className={`w-full text-left p-4 rounded-md border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                    selectedId === preset.id
                      ? "bg-white border-brand-red glow-border-red shadow-sm"
                      : "bg-white border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 shadow-sm"
                  } ${isRunning ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  <div className="space-y-1">
                    <p className={`font-mono text-xs uppercase tracking-wider font-bold ${
                      selectedId === preset.id ? "text-brand-red" : "text-zinc-800"
                    }`}>
                      {preset.name}
                    </p>
                    <p className="text-[11px] text-zinc-500 line-clamp-1 font-sans">
                      {preset.tagline}
                    </p>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    selectedId === preset.id ? "bg-brand-red animate-ping" : "bg-zinc-200"
                  }`}></div>
                </button>
              ))}
            </div>

            {/* Run Button */}
            <div className="pt-2">
              {!stepFinished ? (
                <button
                  id="console-compile-btn"
                  onClick={runCompiler}
                  disabled={isRunning}
                  className="w-full bg-brand-red hover:bg-brand-red-hover disabled:bg-zinc-100 disabled:text-zinc-400 text-white font-mono text-xs font-bold uppercase tracking-wider py-4 rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  {isRunning ? (
                    <>
                      <Cpu className="w-4 h-4 animate-spin text-white" />
                      Running Stack Compiler...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-white text-white" />
                      Run Developer Compiler
                    </>
                  )}
                </button>
              ) : (
                <button
                  id="console-reset-btn"
                  onClick={() => {
                    setCurrentLogs([]);
                    setProgress(0);
                    setStepFinished(false);
                  }}
                  className="w-full bg-white hover:bg-zinc-50 text-zinc-700 hover:text-brand-black font-mono text-xs font-bold uppercase tracking-wider py-4 rounded-md border border-zinc-200 hover:border-zinc-300 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset Compiler Logs
                </button>
              )}
            </div>
          </div>

          {/* Interactive Console Screen */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden shadow-xl shadow-zinc-100/50">
              {/* Console Window Header */}
              <div className="bg-zinc-50 px-4 py-3 border-b border-zinc-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-red"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-200"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-300"></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Settings className="w-3 h-3 text-zinc-400 animate-spin" />
                  <span className="font-mono text-[10px] text-zinc-500 tracking-wider">
                    COMPILER_PIPELINE.sh
                  </span>
                </div>
                <div className="w-12"></div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1 bg-zinc-100">
                <motion.div
                  className="h-full bg-brand-red"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeInOut" }}
                ></motion.div>
              </div>

              {/* Console logs screen */}
              <div className="p-5 font-mono text-[11px] sm:text-xs text-zinc-600 min-h-[220px] max-h-[300px] overflow-y-auto text-left space-y-2 bg-zinc-50/50">
                {currentLogs.length === 0 && (
                  <div className="text-zinc-400 flex flex-col items-center justify-center h-48 space-y-3">
                    <Terminal className="w-8 h-8 text-zinc-300" />
                    <p className="text-center text-xs">
                      Console Idle. Click 'Run Developer Compiler' to start build process visualization.
                    </p>
                  </div>
                )}
                {currentLogs.map((log, idx) => (
                  <div key={idx} className="transition-all duration-300">
                    {idx === currentLogs.length - 1 && isRunning ? (
                      <span className="text-brand-red mr-1">&gt;</span>
                    ) : idx === currentLogs.length - 1 && stepFinished ? (
                      <span className="text-emerald-600 mr-1">✓</span>
                    ) : (
                      <span className="text-zinc-400 mr-1">::</span>
                    )}
                    <span className={idx === currentLogs.length - 1 ? "text-brand-black font-semibold" : "text-zinc-500"}>
                      {log}
                    </span>
                  </div>
                ))}
                {isRunning && (
                  <div className="flex items-center gap-1.5 text-brand-red animate-pulse">
                    <span>&gt; compiling...</span>
                    <span className="w-1.5 h-3.5 bg-brand-red inline-block"></span>
                  </div>
                )}
                <div ref={logsEndRef} />
              </div>
            </div>

            {/* Results Panel */}
            <AnimatePresence>
              {stepFinished && (
                <motion.div
                  id="compiler-results"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="p-6 bg-white border border-zinc-200 rounded-lg text-left grid grid-cols-1 md:grid-cols-12 gap-6 relative shadow-md shadow-zinc-100/50"
                >
                  {/* Subtle success label */}
                  <div className="absolute -top-3 left-6 px-3 py-1 bg-zinc-50 border border-emerald-500/30 rounded text-[10px] text-emerald-600 font-mono uppercase tracking-wider flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    Architecture Verified
                  </div>

                  {/* Primary specifications */}
                  <div className="md:col-span-7 space-y-4 pt-1">
                    <div className="space-y-1">
                      <p className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest leading-none">
                        Project Class
                      </p>
                      <h4 className="font-display text-xl font-extrabold text-brand-black">
                        {selectedPreset.name}
                      </h4>
                    </div>

                    <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
                      {selectedPreset.architectureDescription}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="space-y-2">
                      <p className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                        Standard Technology Stack
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedPreset.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-zinc-50 border border-zinc-200 rounded font-mono text-[10px] text-zinc-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Stats & Timelines */}
                  <div className="md:col-span-5 flex flex-col justify-center gap-4 bg-zinc-50/50 p-4 rounded border border-zinc-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-brand-red/5 rounded border border-brand-red/10">
                        <Calendar className="w-4 h-4 text-brand-red" />
                      </div>
                      <div>
                        <span className="block font-mono text-[8px] text-zinc-400 uppercase tracking-widest leading-none">
                          Timeline Range
                        </span>
                        <span className="block font-display text-base font-bold text-brand-black mt-1">
                          {selectedPreset.timeline}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-brand-red/5 rounded border border-brand-red/10">
                        <CreditCard className="w-4 h-4 text-brand-red" />
                      </div>
                      <div>
                        <span className="block font-mono text-[8px] text-zinc-400 uppercase tracking-widest leading-none">
                          Budget Range
                        </span>
                        <span className="block font-display text-base font-bold text-brand-red mt-1">
                          {selectedPreset.basePrice}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="text-[10px] text-zinc-400 font-mono block leading-relaxed">
                        * Estimates may change based on integrations, third-party credentials, and database structures.
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
