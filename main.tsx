import React, { useState } from "react";
import { Calculator, ArrowRight, Sparkles, Send, CheckSquare, Square, Mail, User, Clock, Terminal, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ProjectEstimator() {
  // Estimator States
  const [platform, setPlatform] = useState<string>("web-saas");
  const [design, setDesign] = useState<string>("clean");
  const [database, setDatabase] = useState<string>("sql");
  const [screens, setScreens] = useState<number>(8); // Slider: 1 to 25
  const [integrations, setIntegrations] = useState<{ [key: string]: boolean }>({
    billing: false,
    auth: true,
    realtime: false,
    admin: false
  });

  // Client Details Form
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  // Constants for Budget Calculation
  const BASE_PRICE = 4500;
  
  const platformMultipliers: { [key: string]: { mult: number; text: string } } = {
    "web-saas": { mult: 1.0, text: "Web SaaS Platform" },
    "mobile-native": { mult: 1.3, text: "iOS & Android Native" },
    "ai-core": { mult: 1.4, text: "AI & LLM Intelligent Pipeline" },
    "full-suite": { mult: 1.9, text: "Multiplatform Full-Stack Suite" }
  };

  const designMultipliers: { [key: string]: { mult: number; text: string } } = {
    "clean": { mult: 1.0, text: "Standard Corporate Craft" },
    "premium-motion": { mult: 1.25, text: "High-End Custom Motion" },
    "immersive-console": { mult: 1.45, text: "Futuristic Console / Custom WebGL" }
  };

  const dbMultipliers: { [key: string]: { mult: number; text: string } } = {
    "none": { mult: 0.8, text: "Stateless Local Client" },
    "sql": { mult: 1.15, text: "Relational SQL (PostgreSQL)" },
    "realtime": { mult: 1.4, text: "High-Frequency Real-time broker" }
  };

  const getIntegrationsCost = () => {
    let cost = 0;
    if (integrations.billing) cost += 1800;
    if (integrations.auth) cost += 1000;
    if (integrations.realtime) cost += 2400;
    if (integrations.admin) cost += 3000;
    return cost;
  };

  // Perform live estimations
  const calculateEstimate = () => {
    const pMult = platformMultipliers[platform]?.mult || 1.0;
    const dMult = designMultipliers[design]?.mult || 1.0;
    const dbMult = dbMultipliers[database]?.mult || 1.0;
    
    // Multipliers combined + screen rate
    const screenRate = 450;
    const baseCalculated = (BASE_PRICE + screens * screenRate) * pMult * dMult * dbMult;
    const totalCost = baseCalculated + getIntegrationsCost();
    
    // Ranges
    const lowCost = Math.round(totalCost * 0.9);
    const highCost = Math.round(totalCost * 1.15);
    
    // Timeline calculation based on screens and multipliers
    const baseWeeks = 4;
    const calculatedWeeks = baseWeeks + (screens * 0.4) * (pMult + dMult) / 2;
    const lowWeeks = Math.max(4, Math.round(calculatedWeeks * 0.95));
    const highWeeks = Math.max(5, Math.round(calculatedWeeks * 1.2));

    return {
      lowCost: lowCost.toLocaleString(),
      highCost: highCost.toLocaleString(),
      lowWeeks,
      highWeeks
    };
  };

  const toggleIntegration = (key: string) => {
    setIntegrations((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleEstimateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 1200);
  };

  const currentEst = calculateEstimate();

  return (
    <section id="estimator" className="py-20 bg-white border-t border-zinc-100 relative">
      {/* Visual glowing meshes */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-brand-red/5 rounded-full filter blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-red/5 border border-brand-red/10 rounded-md mb-3">
            <Calculator className="w-3.5 h-3.5 text-brand-red" />
            <span className="font-mono text-xs text-brand-red font-medium tracking-wider uppercase">
              Project Calculator
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand-black tracking-tight">
            INSTANT SCOPE ESTIMATOR
          </h2>
          <p className="mt-3 text-zinc-600 font-sans text-sm sm:text-base">
            Adjust the sliders and criteria to compile a highly accurate budgetary 
            and timing projection matching your technical project specifications.
          </p>
        </div>

        {/* Calculator layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Sheet (Left 7 Columns) */}
          <div className="lg:col-span-7 bg-white border border-zinc-200 rounded-lg p-6 sm:p-8 text-left space-y-6 shadow-sm">
            {/* 1. Platform selection */}
            <div className="space-y-3">
              <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
                01. Core Platform & Engine
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.keys(platformMultipliers).map((key) => (
                  <button
                    key={key}
                    id={`platform-selector-${key}`}
                    onClick={() => setPlatform(key)}
                    className={`p-4 rounded border text-left transition-all duration-200 cursor-pointer ${
                      platform === key
                        ? "bg-zinc-50 border-brand-red"
                        : "bg-white border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    <span className={`block font-mono text-xs font-bold uppercase tracking-wider ${
                      platform === key ? "text-brand-red" : "text-zinc-500"
                    }`}>
                      {platformMultipliers[key].text}
                    </span>
                    <span className="block text-[10px] text-zinc-400 mt-1 font-sans">
                      {key === "web-saas" && "Responsive user dashboards and Express API middleware."}
                      {key === "mobile-native" && "React Native iOS and Android device applications."}
                      {key === "ai-core" && "Gemini API prompting model integrations and vector caching."}
                      {key === "full-suite" && "Unified deployment for web systems and companion mobile app stores."}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Page Screens Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
                  02. Custom Screens / Views Count
                </p>
                <span className="font-mono text-xs text-brand-red font-bold px-2 py-0.5 bg-brand-red/5 border border-brand-red/10 rounded">
                  {screens} VIEWS
                </span>
              </div>
              <div className="py-2 flex items-center gap-4">
                <span className="font-mono text-[10px] text-zinc-400">1</span>
                <input
                  type="range"
                  min="1"
                  max="25"
                  value={screens}
                  onChange={(e) => setScreens(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-brand-red"
                />
                <span className="font-mono text-[10px] text-zinc-400">25</span>
              </div>
              <p className="text-[10px] text-zinc-400 font-sans leading-relaxed">
                Includes primary application landing pages, user registration/login boxes, custom workspace pages, settings overlays, and responsive mobile viewport conversions.
              </p>
            </div>

            {/* 3. Design Depth */}
            <div className="space-y-3">
              <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
                03. Interface Styling Complexity
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {Object.keys(designMultipliers).map((key) => (
                  <button
                    key={key}
                    id={`design-selector-${key}`}
                    onClick={() => setDesign(key)}
                    className={`p-3.5 rounded border text-center transition-all duration-200 cursor-pointer ${
                      design === key
                        ? "bg-zinc-50 border-brand-red"
                        : "bg-white border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    <span className={`block font-mono text-[11px] font-bold uppercase tracking-wider ${
                      design === key ? "text-brand-red" : "text-zinc-500"
                    }`}>
                      {key === "clean" ? "Corporate Craft" : key === "premium-motion" ? "Fluid Motion" : "Futuristic UI"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Databases */}
            <div className="space-y-3">
              <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
                04. Database & Storage Architecture
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {Object.keys(dbMultipliers).map((key) => (
                  <button
                    key={key}
                    id={`db-selector-${key}`}
                    onClick={() => setDatabase(key)}
                    className={`p-3.5 rounded border text-center transition-all duration-200 cursor-pointer ${
                      database === key
                        ? "bg-zinc-50 border-brand-red"
                        : "bg-white border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    <span className={`block font-mono text-[11px] font-bold uppercase tracking-wider ${
                      database === key ? "text-brand-red" : "text-zinc-500"
                    }`}>
                      {key === "none" ? "Stateless Cache" : key === "sql" ? "PostgreSQL SQL" : "Event Streams"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Checkboxes */}
            <div className="space-y-3">
              <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
                05. Additional Structural Integrations
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Stripe */}
                <button
                  type="button"
                  id="chk-integration-billing"
                  onClick={() => toggleIntegration("billing")}
                  className={`p-3.5 rounded border text-left transition-all duration-200 flex items-center justify-between cursor-pointer ${
                    integrations.billing
                      ? "bg-zinc-50 border-brand-red/50"
                      : "bg-white border-zinc-200 hover:border-zinc-300"
                  }`}
                >
                  <span className="font-mono text-[11px] font-medium text-zinc-600">
                    Stripe Subscription Billing
                  </span>
                  {integrations.billing ? (
                    <span className="text-brand-red font-mono text-[10px] font-bold">[ON]</span>
                  ) : (
                    <span className="text-zinc-400 font-mono text-[10px]">[OFF]</span>
                  )}
                </button>

                {/* Auth */}
                <button
                  type="button"
                  id="chk-integration-auth"
                  onClick={() => toggleIntegration("auth")}
                  className={`p-3.5 rounded border text-left transition-all duration-200 flex items-center justify-between cursor-pointer ${
                    integrations.auth
                      ? "bg-zinc-50 border-brand-red/50"
                      : "bg-white border-zinc-200 hover:border-zinc-300"
                  }`}
                >
                  <span className="font-mono text-[11px] font-medium text-zinc-600">
                    Secure JWT / Firebase Auth
                  </span>
                  {integrations.auth ? (
                    <span className="text-brand-red font-mono text-[10px] font-bold">[ON]</span>
                  ) : (
                    <span className="text-zinc-400 font-mono text-[10px]">[OFF]</span>
                  )}
                </button>

                {/* Real-time */}
                <button
                  type="button"
                  id="chk-integration-realtime"
                  onClick={() => toggleIntegration("realtime")}
                  className={`p-3.5 rounded border text-left transition-all duration-200 flex items-center justify-between cursor-pointer ${
                    integrations.realtime
                      ? "bg-zinc-50 border-brand-red/50"
                      : "bg-white border-zinc-200 hover:border-zinc-300"
                  }`}
                >
                  <span className="font-mono text-[11px] font-medium text-zinc-600">
                    Real-time WebSocket Chat
                  </span>
                  {integrations.realtime ? (
                    <span className="text-brand-red font-mono text-[10px] font-bold">[ON]</span>
                  ) : (
                    <span className="text-zinc-400 font-mono text-[10px]">[OFF]</span>
                  )}
                </button>

                {/* Admin */}
                <button
                  type="button"
                  id="chk-integration-admin"
                  onClick={() => toggleIntegration("admin")}
                  className={`p-3.5 rounded border text-left transition-all duration-200 flex items-center justify-between cursor-pointer ${
                    integrations.admin
                      ? "bg-zinc-50 border-brand-red/50"
                      : "bg-white border-zinc-200 hover:border-zinc-300"
                  }`}
                >
                  <span className="font-mono text-[11px] font-medium text-zinc-600">
                    Custom Admin Dashboard
                  </span>
                  {integrations.admin ? (
                    <span className="text-brand-red font-mono text-[10px] font-bold">[ON]</span>
                  ) : (
                    <span className="text-zinc-400 font-mono text-[10px]">[OFF]</span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Estimates Display Panel (Right 5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Visual Projection Card */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-6 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-red/5 rounded-full filter blur-xl pointer-events-none"></div>

              <span className="font-mono text-[10px] text-brand-red uppercase tracking-wider block border-b border-zinc-200 pb-3">
                &gt; COMPILED PROJECTIONS
              </span>

              {/* Cost Range */}
              <div className="py-6 space-y-1">
                <span className="text-zinc-400 font-mono text-[10px] uppercase tracking-widest leading-none">
                  Estimated Project Investment
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-display font-black text-4xl sm:text-5xl text-brand-black tracking-tight">
                    ${currentEst.lowCost}
                  </span>
                  <span className="text-zinc-400 font-display font-medium text-xl">-</span>
                  <span className="font-display font-black text-3xl sm:text-4xl text-brand-black tracking-tight">
                    ${currentEst.highCost}
                  </span>
                </div>
              </div>

              {/* Stats Block */}
              <div className="grid grid-cols-2 gap-4 border-t border-zinc-200 pt-6">
                <div className="space-y-1">
                  <span className="flex items-center gap-1.5 font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                    <Clock className="w-3.5 h-3.5 text-brand-red" />
                    Timeline Build
                  </span>
                  <span className="font-display font-bold text-brand-black text-base block mt-1">
                    {currentEst.lowWeeks} - {currentEst.highWeeks} Weeks
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="flex items-center gap-1.5 font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                    <Sparkles className="w-3.5 h-3.5 text-brand-red animate-pulse" />
                    SLA Tier
                  </span>
                  <span className="font-display font-bold text-brand-black text-base block mt-1">
                    Senior Architect Led
                  </span>
                </div>
              </div>

              {/* Summary line */}
              <div className="mt-6 p-3 bg-white rounded border border-zinc-200 font-mono text-[10px] text-zinc-500 leading-relaxed">
                <span className="text-emerald-600">✓ Stack Suggestion:</span> Based on your selection, we recommend a <b>{platformMultipliers[platform].text}</b> utilizing <b>{dbMultipliers[database].text}</b> with {designMultipliers[design].text}.
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="bg-white border border-zinc-200 rounded-lg p-6 text-left shadow-sm">
              <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-4">
                Submit Spec Config sheet
              </p>
              
              <form onSubmit={handleEstimateSubmit} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-3.5 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    required
                    id="client-name"
                    placeholder="Your Name / Organization"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 hover:border-zinc-300 focus:border-brand-red focus:bg-white focus:outline-none rounded p-3 pl-10 font-sans text-xs sm:text-sm text-brand-black"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-4 h-4 text-zinc-400" />
                  <input
                    type="email"
                    required
                    id="client-email"
                    placeholder="Work Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 hover:border-zinc-300 focus:border-brand-red focus:bg-white focus:outline-none rounded p-3 pl-10 font-sans text-xs sm:text-sm text-brand-black"
                  />
                </div>

                <div>
                  <textarea
                    id="client-notes"
                    placeholder="Additional custom configurations or specific requirements..."
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 hover:border-zinc-300 focus:border-brand-red focus:bg-white focus:outline-none rounded p-3 font-sans text-xs sm:text-sm text-brand-black"
                  />
                </div>

                <button
                  type="submit"
                  id="submit-estimator-form"
                  disabled={isSubmitting}
                  className="w-full bg-brand-red hover:bg-brand-red-hover disabled:bg-zinc-100 disabled:text-zinc-400 text-white font-mono text-xs font-bold uppercase tracking-wider py-3.5 rounded transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow"
                >
                  {isSubmitting ? (
                    <span>Submitting Configuration...</span>
                  ) : (
                    <>
                      <span>Submit Configuration</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Success Submission Modal */}
      <AnimatePresence>
        {showSuccess && (
          <div
            id="estimator-success-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-zinc-200 rounded-lg max-w-md w-full p-6 text-center shadow-2xl relative"
            >
              <div className="absolute inset-0 bg-brand-red/5 filter blur-3xl pointer-events-none rounded-lg"></div>

              <div className="w-14 h-14 bg-brand-red/5 border border-brand-red/20 rounded-full flex items-center justify-center mx-auto mb-5 text-brand-red">
                <ShieldCheck className="w-7 h-7" />
              </div>

              <h3 className="font-display text-xl font-black text-brand-black tracking-tight uppercase">
                ESTIMATE SUBMITTED SUCCESSFULLY
              </h3>
              
              <p className="mt-3 text-zinc-600 text-xs sm:text-sm font-sans leading-relaxed">
                Hi, <b>{name}</b>. We have successfully received your compiled project parameters sheet. 
                Our senior software architect has been alerted.
              </p>

              <div className="my-5 p-4 bg-zinc-50 rounded border border-zinc-200 font-mono text-[10px] text-zinc-500 text-left space-y-1">
                <p>&gt; CLIENT: {name}</p>
                <p>&gt; ESTIMATE: ${currentEst.lowCost} - ${currentEst.highCost}</p>
                <p>&gt; TIMELINE: {currentEst.lowWeeks} - {currentEst.highWeeks} WEEKS</p>
                <p>&gt; HANDSHAKE ID: CB-LS-{Math.floor(Math.random() * 90000) + 10000}</p>
              </div>

              <p className="text-zinc-500 text-xs font-sans leading-relaxed">
                A formal architectural design proposal and scheduling calendar will be delivered to <b>{email}</b> within 12 business hours.
              </p>

              <button
                id="close-success-btn"
                onClick={() => {
                  setShowSuccess(false);
                  setName("");
                  setEmail("");
                  setNotes("");
                }}
                className="mt-6 w-full bg-brand-red hover:bg-brand-red-hover text-white py-3 rounded font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Close Connection
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
