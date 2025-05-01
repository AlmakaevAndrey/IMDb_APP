import cls from "./MovieCard.module.css";
import { Button } from "../Button/Button";

export const MovieCard = ({ title, rating, poster }) => {
  const posterUrl = poster ? `https://image.tmdb.org/t/p/w500${poster}` : "https://via.placeholder.com/500x750?text=No+Poster";

  return (
    <div className={cls.card}>
      <div className={cls.cardWrapper}>
        <img className={cls.posterMovies} src={posterUrl} alt={title} />
        <div className={cls.cardContext}>
          <p className={cls.cardNameMovie}>{title}</p>
          <Button className={cls.cardBtn} onClick={() => {}}>
            View iMDB
          </Button>
        </div>
      </div>
    </div>
  );
};
