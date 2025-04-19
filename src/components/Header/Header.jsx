import cls from "./Header.module.css";
import IMDbLogo from "../../assets/imdb.svg";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <header className={cls.header}>
      <p onClick={() => navigate("/")}>
        <img src={IMDbLogo} alt="imdb logo" className={cls.IMDbLogo} />
        <span className={cls.spanIMDb}>IMDb APP</span>
      </p>
      <ul className={cls.nameWrapper}>
        <li onClick={() => navigate("/movie")} className={cls.name}>
          movie
        </li>
        <li onClick={() => navigate("/favorites")} className={cls.name}>
          favorites
        </li>
        <li onClick={() => navigate("/search")} className={cls.name}>
          search
        </li>
      </ul>
    </header>
  );
};
