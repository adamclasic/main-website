import React from "react";
import { Search, Compass, HardDriveDownload, Rocket } from "lucide-react";
import { motion } from "motion/react";

export default function ProcessTimeline() {
  const steps = [
    {
      num: "01",
      title: "Discover & Scope Spec",
      subtitle: "Milestones & Requirements Definition",
      description: "We map out comprehensive database architectures, system connection endpoints, and detail exhaustive requirements in structured specs. No guessing, no architectural mistakes.",
      icon: Search,
      details: ["User flow mapping", "Database ERD schemas definition", "Third-party dependency checks", "Comprehensive API contracts"]
    },
    {
      num: "02",
      title: "UI/UX Design Wireframing",
      subtitle: "Aesthetic Typographic Grids",
      description: "We translate specifications into interactive, dark-canvas Figma designs and typography sheets, securing precise layouts, hover states, and smooth interface movements.",
      icon: Compass,
      details: ["High-fidelity Figma prototypes", "Responsive grids scaling", "Touch target optimizations", "Dynamic interactive states design"]
    },
    {
      num: "03",
      title: "Agile Engineering Sprints",
      subtitle: "Clean Code & Strict Compilation",
      description: "Codebox developers construct the product in biweekly modular iterations. We run daily lints and compiles to guarantee type-safety and ensure no memory leaks.",
      icon: HardDriveDownload,
      details: ["Surgical modular components", "Robust REST/gRPC backend routes", "Rigid security rules validation", "Comprehensive unit test audits"]
    },
    {
      num: "04",
      title: "CI/CD Auto-Scale Launch",
      subtitle: "Serverless Ingress Orchestration",
      description: "We configure robust deployment pipelines. Your app is containerized via Docker and pushed to serverless environments with automatic failovers and monitoring.",
      icon: Rocket,
      details: ["Docker production bundling", "Google Cloud Run load balancing", "Telemetry logger integration", "SSL/TLS cryptographic protection"]
    }
  ];

  return (
    <section id="process" className="py-20 bg-white border-t border-zinc-100 grid-bg-red relative">
      <div className="absolute top-10 left-10 w-80 h-80 bg-brand-red/5 rounded-full filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="font-mono text-xs text-brand-red uppercase tracking-widest mb-2">
            // System Lifecycle
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand-black tracking-tight">
            OUR DEPLOYMENT PROCESS
          </h2>
          <p className="mt-3 text-zinc-600 font-sans text-sm sm:text-base">
            We follow a meticulous engineering framework to go from raw ideas to 
            battle-tested production releases with extreme predictability.
          </p>
        </div>

        {/* Process Timeline Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Decorative Connecting Horizontal Line for large screens */}
          <div className="hidden lg:block absolute top-[52px] left-[8%] right-[8%] h-[1px] bg-gradient-to-r from-brand-red/10 via-brand-red/20 to-brand-red/10 z-0"></div>

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                id={`process-step-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border border-zinc-200 rounded-lg p-6 hover:border-brand-red/50 transition-all duration-300 flex flex-col justify-between relative z-10 shadow-sm hover:shadow-md"
              >
                {/* Number tag */}
                <div className="absolute top-4 right-4 font-mono text-xs text-brand-red font-bold">
                  {step.num} //
                </div>

                {/* Content */}
                <div className="space-y-4 text-left">
                  {/* Icon wrapper */}
                  <div className="w-12 h-12 bg-zinc-50 border border-zinc-200 rounded-full flex items-center justify-center text-brand-red relative z-10">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-display font-extrabold text-brand-black text-base">
                      {step.title}
                    </h3>
                    <p className="font-mono text-[9px] text-zinc-400 uppercase tracking-wider">
                      {step.subtitle}
                    </p>
                  </div>

                  <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Specs bullets inside card */}
                <div className="mt-6 pt-4 border-t border-zinc-100 space-y-1.5 text-left">
                  {step.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-500">
                      <span className="text-brand-red font-bold">&gt;</span>
                      <span className="truncate">{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
