import { createContext, ReactNode, useLayoutEffect, useState } from "react";
import { THEME_STORAGE } from "../constants";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: Props) => {
  const savedTheme = (localStorage.getItem(THEME_STORAGE) as Theme) || "light";
  const [theme, setTheme] = useState<Theme>(savedTheme);

  useLayoutEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("darkLayout");
    } else {
      document.body.classList.remove("darkLayout");
    }
    localStorage.setItem(THEME_STORAGE, theme);
  }, [theme]);

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    if (!localStorage.getItem(THEME_STORAGE)) {
      const isDark = mediaQuery.matches;
      setTheme(isDark ? "dark" : "light");
    }

    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(THEME_STORAGE)) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
