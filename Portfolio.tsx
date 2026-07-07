import React, { useState, useEffect } from "react";
import { Terminal, Menu, X, ArrowRight, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  onNavClick: (sectionId: string) => void;
  activeSection: string;
}

export default function Header({ onNavClick, activeSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Console", id: "console" },
    { label: "Services", id: "services" },
    { label: "Portfolio", id: "portfolio" },
    { label: "About Us", id: "about" },
    { label: "Contact Us", id: "contact" },
    { label: "Our Process", id: "process" },
    { label: "Estimator", id: "estimator" },
    { label: "FAQ", id: "faq" },
  ];

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-zinc-100 py-3 shadow-sm shadow-zinc-100/50"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            id="header-logo"
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => onNavClick("hero")}
          >
            <div className="relative w-9 h-9 flex items-center justify-center bg-white border border-brand-red rounded-md glow-border-red transition-all duration-300 group-hover:scale-105">
              <div className="absolute inset-0 bg-brand-red/5 rounded-md filter blur-sm group-hover:bg-brand-red/10"></div>
              {/* Box logo with red brackets or terminal look */}
              <span className="font-mono text-xs font-bold text-brand-red flex items-center">
                &lt;<span className="text-brand-black group-hover:text-brand-red transition-colors duration-300">cb</span>/&gt;
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold tracking-tight text-brand-black flex items-center gap-1">
                CODEBOX<span className="text-brand-red">LABS</span>
              </span>
              <span className="font-mono text-[9px] tracking-widest text-zinc-400 uppercase leading-none">
                Software Engineering
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => onNavClick(item.id)}
                className={`font-mono text-xs tracking-wider uppercase transition-colors duration-200 relative py-1 cursor-pointer ${
                  activeSection === item.id
                    ? "text-brand-red font-semibold"
                    : "text-zinc-600 hover:text-brand-black"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-red"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* CTA Trigger */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              id="header-cta"
              onClick={() => onNavClick("estimator")}
              className="bg-brand-red hover:bg-brand-red-hover text-white px-4 py-2 rounded font-mono text-xs font-bold tracking-wider uppercase transition-all duration-200 hover:shadow-lg hover:shadow-brand-red/10 flex items-center gap-1 cursor-pointer"
            >
              Get Estimate
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              id="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-zinc-600 hover:text-brand-black focus:outline-none cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-zinc-100"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`mobile-nav-link-${item.id}`}
                  onClick={() => {
                    onNavClick(item.id);
                    setIsOpen(false);
                  }}
                  className={`block w-full text-left font-mono text-sm tracking-widest uppercase py-2 border-b border-zinc-50 ${
                    activeSection === item.id
                      ? "text-brand-red font-bold"
                      : "text-zinc-600"
                  }`}
                >
                  &gt; {item.label}
                </button>
              ))}
              <div className="pt-2">
                <button
                  id="mobile-nav-cta"
                  onClick={() => {
                    onNavClick("estimator");
                    setIsOpen(false);
                  }}
                  className="w-full text-center bg-brand-red hover:bg-brand-red-hover text-white py-3 rounded font-mono text-xs font-bold tracking-wider uppercase transition-colors"
                >
                  Launch Project Estimator
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
