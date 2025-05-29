import cls from "./MovieCard.module.css";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import React from "react";

type MovieComponentsProps = {
  id: number;
  title: string;
  poster?: string | null;

}

export const MovieCard = React.memo(({ id, title, poster }: MovieComponentsProps) => {
  const navigate = useNavigate();
  const posterUrl = poster ? `https://image.tmdb.org/t/p/w500${poster}` : "https://via.placeholder.com/500x750?text=No+Poster";

  const handleViewClick = useCallback(() => {
    navigate(`/movie/${id}`);
  }, [navigate, id]);

  return (
    <div className={cls.card}>
      <div className={cls.cardWrapper}>
        <img loading="lazy" className={cls.posterMovies} src={posterUrl} alt={title} />
        <div className={cls.cardContext}>
          <p className={cls.cardNameMovie}>{title || "No title"}</p>
          <Button className={cls.cardBtn} onClick={handleViewClick}>
            View
          </Button>
        </div>
      </div>
    </div>
  );
});
