"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "dark",
  toggle: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

const LIGHT_STYLE = `
  /* Page backgrounds (hex arbitrary values) */
  .min-h-screen { background-color: #f1f5f9 !important; }
  nav.sticky { background-color: rgba(241,245,249,0.92) !important; }

  /* Dark card panels */
  .bg-card-dark { background-color: #ffffff !important; }
`;

function applyTheme(t: Theme) {
  const root = document.documentElement;
  root.classList.toggle("light", t === "light");

  let style = document.getElementById("theme-dynamic") as HTMLStyleElement | null;
  if (t === "light") {
    if (!style) {
      style = document.createElement("style");
      style.id = "theme-dynamic";
      document.head.appendChild(style);
    }
    style.textContent = LIGHT_STYLE;
  } else {
    style?.remove();
  }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = (localStorage.getItem("theme") as Theme | null) ?? "dark";
    setTheme(stored);
    applyTheme(stored);
  }, []);

  const toggle = () => {
    setTheme(prev => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      localStorage.setItem("theme", next);
      applyTheme(next);
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
