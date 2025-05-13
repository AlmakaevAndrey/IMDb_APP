import cls from "./MovieCard.module.css";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";

export const MovieCard = ({ id, title, poster }) => {
  const navigate = useNavigate();
  const posterUrl = poster ? `https://image.tmdb.org/t/p/w500${poster}` : "https://via.placeholder.com/500x750?text=No+Poster";

  const handleViewClick = () => {
    navigate(`/movie/${id}`);
  };
  return (
    <div className={cls.card}>
      <div className={cls.cardWrapper}>
        <img className={cls.posterMovies} src={posterUrl} alt={title} />
        <div className={cls.cardContext}>
          <p className={cls.cardNameMovie}>{title}</p>
          <Button className={cls.cardBtn} onClick={handleViewClick}>
            View
          </Button>
        </div>
      </div>
    </div>
  );
};
