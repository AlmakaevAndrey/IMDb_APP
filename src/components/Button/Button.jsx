import cls from "./Button.module.css";

export const Button = ({ onClick, isDisabled, isActive, children }) => {
  return (
    <button className={`${cls.btn} ${isActive ? cls.primary : ""}`} onClick={onClick} disabled={isDisabled}>
      {children}111111
    </button>
  );
};
