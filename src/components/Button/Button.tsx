import cls from "./Button.module.css";
import React from "react";
import type { ReactNode, MouseEventHandler } from "react";

type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
  isActive?: boolean;
  className?: string;
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = React.memo(({ onClick, isDisabled, isActive = false, className = "", children }) => {
  return (
    <button className={`${cls.btn} ${isActive ? cls.active : ""} ${className}`} onClick={onClick} disabled={isDisabled}>
      {children}
    </button>
  );
});
