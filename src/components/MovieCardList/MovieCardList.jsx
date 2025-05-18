import { memo } from "react";
import { MovieCard } from "../MovieCard";
import cls from "./MovieCardList.module.css";

export const MovieCardList = memo(({ movies }) => {
  if (!movies || movies.length === 0) {
    return <div>No movies found</div>;
  }

  return (
    <div className={cls.cardList}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} id={movie.id} title={movie.title} poster={movie.poster_path} />
      ))}
    </div>
  );
});
