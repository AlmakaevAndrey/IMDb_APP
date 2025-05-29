import React from "react";
import { THEME_STORAGE } from "../../constants";
import { useTheme } from "../../hooks/useTheme";
import cls from "./ThemeToggler.module.css";

type ThemeContextType = {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

export const ThemeToggler: React.FC = () => {
  const { theme, setTheme } = useTheme() as unknown as ThemeContextType;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked === true;
    const updatedTheme = isChecked ? "dark" : "light";

    setTheme(updatedTheme);
    isChecked ? document.body.classList.add("darkLayout") : document.body.classList.remove("darkLayout");

    localStorage.setItem(THEME_STORAGE, updatedTheme);
  };

  return <input type="checkbox" onChange={onChangeHandler} checked={theme === "dark"} className={cls.theme_checkbox}></input>;
};
