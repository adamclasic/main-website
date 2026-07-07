export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string; // Lucide icon identifier
  details: string[];
  techStack: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: string;
  description: string;
  longDescription?: string;
  stats?: { label: string; value: string }[];
  techStack: string[];
  imagePrompt?: string; // Guidance for what visual style it represents
  accentColor?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ConsolePreset {
  id: string;
  name: string;
  tagline: string;
  techStack: string[];
  timeline: string;
  basePrice: string;
  architectureDescription: string;
  consoleLogs: string[];
}
