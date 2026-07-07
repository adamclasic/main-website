import React from "react";
import { Terminal, Mail, MapPin, Globe, ArrowUp } from "lucide-react";

interface FooterProps {
  onNavClick: (sectionId: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-zinc-200 pt-16 pb-8 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-red/5 rounded-full filter blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-zinc-100 pb-12">
          {/* Logo Brand Info Column */}
          <div className="md:col-span-5 space-y-4 text-left">
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onNavClick("hero")}>
              <div className="w-8 h-8 flex items-center justify-center bg-white border border-brand-red rounded">
                <span className="font-mono text-xs font-bold text-brand-red">
                  &lt;cb/&gt;
                </span>
              </div>
              <span className="font-display text-base font-extrabold tracking-tight text-brand-black">
                CODEBOX<span className="text-brand-red">LABS</span>
              </span>
            </div>
            
            <p className="text-zinc-500 text-xs sm:text-sm max-w-sm font-sans leading-relaxed">
              Codebox Labs is a premier custom software studio. We design, compile, 
              and scale high-performance digital products that drive true enterprise value.
            </p>

            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
                <Mail className="w-4 h-4 text-brand-red" />
                <span className="hover:text-brand-black cursor-pointer">hello@codeboxlabs.com</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
                <MapPin className="w-4 h-4 text-brand-red" />
                <span>Houston, TX &amp; Vancouver, BC</span>
              </div>
            </div>
          </div>

          {/* Quick Anchor Links Column */}
          <div className="md:col-span-3 text-left">
            <h4 className="font-mono text-xs text-zinc-600 uppercase tracking-widest border-b border-zinc-100 pb-2 mb-4">
              // Navigation
            </h4>
            <ul className="space-y-2.5 font-mono text-xs text-zinc-500">
              <li>
                <button onClick={() => onNavClick("console")} className="hover:text-brand-red cursor-pointer">
                  &gt; Developer Console
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick("services")} className="hover:text-brand-red cursor-pointer">
                  &gt; Capabilities &amp; Stack
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick("portfolio")} className="hover:text-brand-red cursor-pointer">
                  &gt; Selected Works
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick("about")} className="hover:text-brand-red cursor-pointer">
                  &gt; About Codebox Studio
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick("contact")} className="hover:text-brand-red cursor-pointer">
                  &gt; Connect With Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick("process")} className="hover:text-brand-red cursor-pointer">
                  &gt; Deployment Process
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick("estimator")} className="hover:text-brand-red cursor-pointer">
                  &gt; Project Estimator
                </button>
              </li>
            </ul>
          </div>

          {/* Capabilities Slogans */}
          <div className="md:col-span-4 text-left">
            <h4 className="font-mono text-xs text-zinc-600 uppercase tracking-widest border-b border-zinc-100 pb-2 mb-4">
              // Engineering Slogans
            </h4>
            <div className="bg-zinc-50 border border-zinc-200 rounded p-4 font-mono text-[10px] text-zinc-500 leading-relaxed">
              <p className="text-zinc-700 font-bold mb-1">&gt; tail -n 2 logs.txt</p>
              <p>● SYSTEM: Compiling complete. 0 warnings. 0 errors.</p>
              <p>● SCALE: Horizontal container nodes ready to serve requests.</p>
              <p className="text-brand-red mt-2">&gt; Built with cryptographic standards and pixel-perfect design.</p>
            </div>
          </div>
        </div>

        {/* Copyright strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-zinc-400">
          <p>© {currentYear} Codebox Labs Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-brand-black cursor-pointer">TERMS_OF_SERVICE</span>
            <span className="hover:text-brand-black cursor-pointer">PRIVACY_POLICY</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-1 hover:text-brand-black cursor-pointer"
            >
              TOP <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
