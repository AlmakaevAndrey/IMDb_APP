import cls from "./Button.module.css";
import React from "react";

export const Button = React.memo(({ onClick, isDisabled, isActive = false, className = "", children }) => {
  return (
    <button className={`${cls.btn} ${isActive ? cls.active : ""} ${className}`} onClick={onClick} disabled={isDisabled}>
      {children}
    </button>
  );
});
