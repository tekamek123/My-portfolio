"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface ThemeContextType {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

// Default value to prevent errors during SSR
const defaultTheme: ThemeContextType = {
  isDarkTheme: true,
  toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultTheme);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    setMounted(true);
    try {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        setIsDarkTheme(savedTheme === "dark");
      } else {
        // Check system preference
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setIsDarkTheme(prefersDark);
      }
    } catch (error) {
      // localStorage might not be available in some environments
      console.warn("Failed to access localStorage:", error);
    }
  }, []);

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
        // Update document class for CSS variables if needed
        if (typeof document !== "undefined") {
          document.documentElement.classList.toggle("dark", isDarkTheme);
        }
      } catch (error) {
        console.warn("Failed to save theme to localStorage:", error);
      }
    }
  }, [isDarkTheme, mounted]);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  // Always provide the context value, even before mounting
  // This prevents "useTheme must be used within a ThemeProvider" errors
  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  // Context will always have a value (defaultTheme) so this check is not needed
  // but kept for safety
  return context;
}

