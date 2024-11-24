"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState, ReactNode } from "react";

function Providers(props: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  const customDefaultTheme = () => {
    if (typeof window !== "undefined" && window.matchMedia) {
      const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return isDarkMode ? "dracula" : "emerald";
    }
    return "emerald";
  };

 

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <ThemeProvider attribute="data-theme" enableSystem={true} >
      {props.children}
    </ThemeProvider>
  );
}

export default Providers;