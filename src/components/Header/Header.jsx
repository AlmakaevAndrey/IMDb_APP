import cls from "./Header.module.css";
import TMDbLogo from "../../assets/TMDB.svg";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <header className={cls.header}>
      <p onClick={() => navigate("/movie")}>
        <img src={TMDbLogo} alt="tmdb logo" className={cls.IMDbLogo} />
        <span className={cls.spanIMDb}>TMDB APP</span>
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
