@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Space Grotesk", sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
  
  --color-brand-red: #E31E24;
  --color-brand-red-hover: #c11318;
  --color-brand-red-dark: #8c0a11;
  --color-brand-black: #0A0A0A;
  --color-brand-dark-gray: #1A1A1A;
}

@layer base {
  body {
    background-color: #ffffff;
    color: #0A0A0A;
    font-family: var(--font-sans);
    overflow-x: hidden;
  }
  
  /* Scrollbar Customization for light minimal theme */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #ffffff;
  }
  ::-webkit-scrollbar-thumb {
    background: #e4e4e7;
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #E31E24;
  }
}

@layer utilities {
  .glow-red {
    text-shadow: 0 0 8px rgba(227, 30, 36, 0.15);
  }
  
  .glow-border-red {
    box-shadow: 0 0 10px rgba(227, 30, 36, 0.08);
  }
  
  .glow-border-red-focus {
    box-shadow: 0 0 15px rgba(227, 30, 36, 0.2);
  }

  .grid-bg {
    background-image: linear-gradient(rgba(0, 0, 0, 0.012) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(0, 0, 0, 0.012) 1px, transparent 1px);
    background-size: 40px 40px;
    background-position: center center;
  }
  
  .grid-bg-red {
    background-image: linear-gradient(rgba(227, 30, 36, 0.012) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(227, 30, 36, 0.012) 1px, transparent 1px);
    background-size: 50px 50px;
    background-position: center center;
  }
}
