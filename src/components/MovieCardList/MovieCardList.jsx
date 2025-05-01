import { memo } from "react";
import { MovieCard } from "../MovieCard/MovieCard";
import cls from "./MovieCardList.module.css";

export const MovieCardList = memo(({ movies }) => {
  return (
    <div className={cls.cardList}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} title={movie.title} poster={movie.poster_path} />
      ))}
    </div>
  );
});
