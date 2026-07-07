import React from "react";
import { Layers, Cpu, Smartphone, Server, Paintbrush, ShieldCheck } from "lucide-react";
import { Service } from "../types";
import { motion } from "motion/react";

export default function Services() {
  const services: Service[] = [
    {
      id: "web-saas",
      title: "Web Platforms & SaaS",
      description: "Scalable, high-performance web applications built on modern React, Next.js, and Express systems.",
      iconName: "Layers",
      details: ["State manager optimization", "Stripe billing integrations", "Dynamic workspace administration", "CORS & CSRF shielded APIs"],
      techStack: ["React", "Express", "Vite", "PostgreSQL"]
    },
    {
      id: "ai-systems",
      title: "AI & Intelligent Systems",
      description: "State-of-the-art LLM pipeline orchestrations, semantic vector indexing, and automated task agents.",
      iconName: "Cpu",
      details: ["Gemini API integration", "Vector DB (Pinecone/Chroma)", "Streaming response parsing", "Prompt telemetry dashboards"],
      techStack: ["FastAPI", "Google GenAI", "Python", "LangChain"]
    },
    {
      id: "mobile-apps",
      title: "Native Mobile Engineering",
      description: "Cross-platform iOS and Android apps optimized for rapid play store launches and hardware performance.",
      iconName: "Smartphone",
      details: ["Offline-first data caching", "Biometric face/fingerprint login", "Push notification pipelines", "Persistent background synchronization"],
      techStack: ["React Native", "Expo", "SQLite", "Native APIs"]
    },
    {
      id: "cloud-scale",
      title: "Cloud Devops & Security",
      description: "Bulletproof infrastructure designs featuring automated Docker orchestration and redundant firewalls.",
      iconName: "Server",
      details: ["Automated GitHub CI/CD", "Docker containerization", "Kubernetes cluster setups", "Secure database backup rotations"],
      techStack: ["Docker", "Google Cloud", "Kubernetes", "IAM Rules"]
    },
    {
      id: "uiux-design",
      title: "Aesthetic UI/UX Prototyping",
      description: "Figma wireframing and user experience maps focused heavily on clear visual hierarchies and conversion rates.",
      iconName: "Paintbrush",
      details: ["Interactive pixel-perfect flows", "Tailwind typography standards", "Accessible color contrasts", "Motion layout blueprints"],
      techStack: ["Figma", "Tailwind CSS", "Motion", "CSS Gradients"]
    },
    {
      id: "api-integrations",
      title: "Secure API Middlewares",
      description: "Custom gRPC/REST APIs, payment systems, and secure authentication pipelines that prevent leakages.",
      iconName: "ShieldCheck",
      details: ["Robust OAuth2 logic", "Queue system configurations", "Third-party SDK bridges", "Webhook safety validation"],
      techStack: ["Stripe", "OAuth", "Kafka", "REST / gRPC"]
    }
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case "Layers":
        return <Layers className="w-5 h-5" />;
      case "Cpu":
        return <Cpu className="w-5 h-5" />;
      case "Smartphone":
        return <Smartphone className="w-5 h-5" />;
      case "Server":
        return <Server className="w-5 h-5" />;
      case "Paintbrush":
        return <Paintbrush className="w-5 h-5" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5" />;
      default:
        return <Layers className="w-5 h-5" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-white border-t border-zinc-100 grid-bg relative">
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-brand-red/5 rounded-full filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-16">
          <p className="font-mono text-xs text-brand-red uppercase tracking-widest mb-2">
            // Core Competencies
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand-black tracking-tight">
            ENGINEERED TO PERFECTION.<br />
            <span className="text-zinc-400 font-sans font-medium">DESIGNED FOR UNLIMITED SCALE.</span>
          </h2>
          <p className="mt-4 text-zinc-600 text-sm sm:text-base leading-relaxed">
            At Codebox Labs, we do not cut corners. We treat coding as a fine craft. 
            Our capabilities cover the entire modern stack, allowing us to build 
            everything from lean product prototypes to enterprise infrastructures.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              id={`service-card-${service.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group bg-white border border-zinc-200 rounded-lg p-6 hover:border-brand-red/50 hover:bg-zinc-50/50 transition-all duration-300 flex flex-col justify-between relative overflow-hidden shadow-sm hover:shadow-md"
            >
              {/* Top border red line hover state */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-brand-red scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

              <div>
                {/* Icon wrapper */}
                <div className="w-10 h-10 rounded-md bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-500 group-hover:text-brand-red group-hover:border-brand-red/30 group-hover:bg-brand-red/5 transition-all duration-300 mb-6">
                  {getIcon(service.iconName)}
                </div>

                {/* Service Title */}
                <h3 className="font-display text-lg font-bold text-brand-black group-hover:text-brand-red transition-colors duration-200">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="mt-2.5 text-zinc-600 text-xs sm:text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Sub-details list */}
                <ul className="mt-5 space-y-2">
                  {service.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-zinc-500">
                      <span className="w-1 h-1 bg-brand-red rounded-full"></span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Tech Badge tags */}
              <div className="mt-6 pt-4 border-t border-zinc-100 flex flex-wrap gap-1.5">
                {service.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-zinc-50 border border-zinc-200 rounded font-mono text-[9px] text-zinc-500 uppercase tracking-wider"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
