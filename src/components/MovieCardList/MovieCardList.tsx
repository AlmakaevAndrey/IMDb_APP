import { memo } from "react";
import { MovieCard } from "../MovieCard";
import cls from "./MovieCardList.module.css";

type Movie = {
  id: number;
  title: string;
  poster_path?: string;
}

type MovieProps = {
  movies?: Movie[];
}

export const MovieCardList = memo(({ movies }: MovieProps) => {
  if (!movies || movies.length === 0) {
    console.log("Received movies:", movies);

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
