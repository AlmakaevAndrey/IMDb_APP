import { memo } from "react";
import cls from "./Loader.module.css";

export const Loader = memo(() => {
  return (
    <div className={cls.backdrop}>
      <span className={cls.loader}></span>
    </div>
  );
});
