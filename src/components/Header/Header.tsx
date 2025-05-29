import cls from "./Header.module.css";
import TMDbLogo from "../../assets/TMDB.svg";
import { useNavigate } from "react-router-dom";
import { ThemeToggler } from "../../features/ThemeToggler/ThemeToggler";
import { memo, useCallback } from "react";

export const Header = memo(() => {
  const navigate = useNavigate();

  const goToMovie = useCallback(() => navigate("/movie"), [navigate]);
  const goToFavorites = useCallback(() => navigate("/favorites"), [navigate]);
  const goToSearch = useCallback(() => navigate("/search"), [navigate]);

  return (
    <header className={cls.header}>
      <p onClick={goToMovie}>
        <img src={TMDbLogo} alt="TMDB logo" className={cls.IMDbLogo} />
        <span className={cls.spanIMDb}>TMDB APP</span>
      </p>
      <ul className={cls.nameWrapper}>
        <li onClick={goToMovie} className={cls.name}>
          movie
        </li>
        <li onClick={goToFavorites} className={cls.name}>
          favorites
        </li>
        <li onClick={goToSearch} className={cls.name}>
          search
        </li>
        <ThemeToggler />
      </ul>
    </header>
  );
});
