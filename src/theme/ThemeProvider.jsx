import { createContext, useLayoutEffect, useState } from "react";
import { THEME_STORAGE } from "../constants";

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const savedTheme = localStorage.getItem(THEME_STORAGE) || "light";
  const [theme, setTheme] = useState(savedTheme);

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

    const handleChange = (e) => {
      if (!localStorage.getItem(THEME_STORAGE)) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
