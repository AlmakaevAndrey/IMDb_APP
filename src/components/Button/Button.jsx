import cls from "./Button.module.css";

export const Button = ({ onClick, isDisabled, isActive = false, className = "", children }) => {
  return (
    <button className={`${cls.btn} ${isActive ? cls.active : ""} ${className}`} onClick={onClick} disabled={isDisabled}>
      {children}
    </button>
  );
};
