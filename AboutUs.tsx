import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { FAQItem } from "../types";
import { motion, AnimatePresence } from "motion/react";

export default function FAQ() {
  const faqItems: FAQItem[] = [
    {
      question: "What is your typical development timeline?",
      answer: "Most custom web platforms and mobile applications are completed within 6 to 12 weeks. Simple MVP builds can take as little as 4 weeks, while complex enterprise systems with extensive integrations might require 14+ weeks. We define clear biweekly milestones during the scoping phase so you always know what is being delivered."
    },
    {
      question: "Who owns the intellectual property (IP) and codebase?",
      answer: "You do—100%. Upon completion of any milestone and payment, all IP, custom designs, Figma files, and software code are transferred entirely to your organization. We host our source code in private GitHub repositories and hand over full owner permissions upon product delivery."
    },
    {
      question: "Can Codebox Labs integrate with our existing engineering team?",
      answer: "Yes. We frequently act as an elite modular team that slots into larger tech organizations to accelerate the deployment of specific features, such as building out specialized AI pipelines, executing major frontend rewrites, or containerizing legacy backend APIs."
    },
    {
      question: "What technologies does Codebox Labs specialize in?",
      answer: "Our primary core stack centers on high-efficiency TypeScript, React, Next.js, and Node.js (Express) on the client/web tier. For AI/ML and intelligence pipelines we use Python, FastAPI, and the Google GenAI SDK. For mobile, we build using React Native and Expo. For data, we implement PostgreSQL, Redis, and Kafka."
    },
    {
      question: "Do you provide post-launch support and hosting maintenance?",
      answer: "Yes, we offer monthly retainer packages that cover complete system maintenance, server uptime monitoring, continuous security rule updates, database snapshot backups, and high-priority bug fixes. We ensure your production app continues to scale without downtime."
    }
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (idx: number) => {
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-white border-t border-zinc-100 grid-bg relative">
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-brand-red/5 rounded-full filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-red/5 border border-brand-red/10 rounded-md mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-brand-red" />
            <span className="font-mono text-xs text-brand-red font-medium tracking-wider uppercase">
              Frequent Questions
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand-black tracking-tight">
            SYSTEM INQUIRIES & FAQS
          </h2>
          <p className="mt-3 text-zinc-600 font-sans text-sm sm:text-base">
            Everything you need to know about partnering with Codebox Labs to launch 
            your next-generation software platforms.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4 text-left">
          {faqItems.map((item, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div
                key={idx}
                id={`faq-item-${idx}`}
                className="bg-white border border-zinc-200 rounded-lg overflow-hidden transition-all duration-300 hover:border-brand-red/40 shadow-sm hover:shadow"
              >
                <button
                  id={`faq-toggle-${idx}`}
                  onClick={() => toggleIndex(idx)}
                  className="w-full p-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                >
                  <span className="font-display font-bold text-brand-black text-sm sm:text-base pr-4">
                    {item.question}
                  </span>
                  <div className="p-1.5 bg-zinc-50 rounded border border-zinc-200 text-zinc-500">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-brand-red" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-content-${idx}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 pt-0 text-zinc-600 text-xs sm:text-sm leading-relaxed border-t border-zinc-100 font-sans">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
