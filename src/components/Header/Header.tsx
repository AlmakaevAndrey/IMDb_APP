import cls from "./Header.module.css";
import TMDbLogo from "../../assets/TMDB.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeToggler } from "../../features/ThemeToggler/ThemeToggler";
import { memo, useCallback } from "react";
import { useAuth } from "../../hooks/useAuth";
import { AUTH_STORAGE } from "../../constants";
import { Button } from "../Button";

export const Header = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuth, setIsAuth} = useAuth();

  const loginHandler = () => {
    const newAuth = !isAuth;
    localStorage.setItem(AUTH_STORAGE, String(newAuth));
    setIsAuth(newAuth);

    if (newAuth && location.pathname !== "/favorites") {
      navigate("/favorites");
    }
  }

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

        {isAuth && (
        <li onClick={goToFavorites} className={cls.name}>
          favorites
        </li>
        )}

        <li onClick={goToSearch} className={cls.name}>
          search
        </li>
        <ThemeToggler />

         <li>
        <Button className={cls.Button} onClick={loginHandler} isActive={!isAuth}>
          {isAuth ? "Logout" : "Login"}
        </Button>
         </li>
      </ul>
    </header>
  );
});
