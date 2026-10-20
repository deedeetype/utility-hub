"use client";

import { useTheme } from "./ThemeProvider";

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
    </svg>
  );
}

function CoffeeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8h1a4 4 0 1 1 0 8h-1"/>
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/>
      <line x1="6" x2="6" y1="2" y2="4"/>
      <line x1="10" x2="10" y1="2" y2="4"/>
      <line x1="14" x2="14" y1="2" y2="4"/>
    </svg>
  );
}

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
      {/* Buy Me a Coffee */}
      <a
        href="https://buymeacoffee.com/labwyzeapps"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Buy me a coffee"
        className="flex items-center justify-center w-11 h-11 rounded-full shadow-lg border transition-all hover:scale-110
          bg-amber-500 border-amber-400 text-white hover:bg-amber-400"
      >
        <CoffeeIcon />
      </a>

      {/* Dark / Light toggle */}
      <button
        onClick={toggle}
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        className="flex items-center justify-center w-11 h-11 rounded-full shadow-lg border transition-all hover:scale-110
          dark-toggle bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700"
      >
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </button>
    </div>
  );
}
