import { ChangeEventHandler, memo, useId } from "react";
import cls from "./SearchInput.module.css";
import { MovieIcon } from "../MovieIcon/icon";

type SearchInputProps = {
  value: string;
  onChange?: ChangeEventHandler | undefined;
}

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
  const inputID = useId();

  return (
    <div className={cls.inputContainer}>
      <label htmlFor={inputID}></label>
      <MovieIcon className={cls.movieIcon} />
      <input type="text" id={inputID} className={cls.input} placeholder=" search movie..." value={value} onChange={onChange} />
    </div>
  );
};

export default memo(SearchInput);
