import { FC, memo } from "react";
import { MovieCard } from "../MovieCard";
import cls from "./MovieCardList.module.css";

interface Movie {
  id: number;
  title: string;
  poster_path?: string;
}

type MovieProps = {
  movies: Movie[];
};

export const MovieCardList: FC<MovieProps> = memo(({ movies }) => {
  if (!movies || movies.length === 0) {
    return <div>No movies found</div>;
  }

  return (
    <div className={cls.cardList}>
      {movies.map((movie: Movie) => (
        <MovieCard key={movie.id} id={movie.id} title={movie.title} poster={movie.poster_path ?? ""} />
      ))}
    </div>
  );
});
