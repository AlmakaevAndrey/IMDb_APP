import { useEffect, useState, useCallback, useMemo } from "react";
import { Button } from "../../components/Button";
import cls from "./FavoritesMovie.module.css";
import { MovieCard } from "../../components/MovieCard";
import { delayFn } from "../../helpers/delayFn";
import { Loader } from "../../components/Loader";
import { useFetch } from "../../helpers/useFetch";

interface MoviePropsType {
  id: number;
  title?: string;
  original_title?: string;
  poster_path?: string;
}

const FavoritesMovie = () => {
  const [favoritesMovie, setFavorites] = useState<MoviePropsType[]>([]);

  const [fetchMovieFavorites, isLoading, error] = useFetch<null, MoviePropsType[]>(
    async () => {
      await delayFn(1000);
      return JSON.parse(localStorage.getItem("favorites") || "[]");
    }
  )

  useEffect(() => {
    fetchMovieFavorites(null).then((data) => {
      if (data) setFavorites(data);
    })
  }, [])

  const handleRemove = useCallback((id: number) => {
    setFavorites((prev) => {
      const updated = prev.filter((movie) => movie.id !== id);
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const renderCardWithRemove = useCallback(
    (movie: MoviePropsType) => (
      <div className={cls.cardWrapper} key={movie.id}>
        <MovieCard id={movie.id} title={movie.title || movie.original_title || ""} poster={movie.poster_path} />
        <Button className={cls.removeBtn} onClick={() => handleRemove(movie.id)}>
          Delete
        </Button>
      </div>
    ),
    [handleRemove],
  );

  const content = useMemo(() => {
    if (isLoading) return <Loader />;
    if (error) return <p>Failed to load favorites.</p>;
    if (favoritesMovie.length === 0) return <p className={cls.empty}>Don't have any favorite movies</p>;

    return <div className={cls.cardList}>{favoritesMovie.map(renderCardWithRemove)}</div>;
  }, [isLoading, error, favoritesMovie, renderCardWithRemove]);

  return (
    <div className={cls.container}>
      <h2 className={cls.title}>Favorites movie</h2>
      {content}
    </div>
  );
};

export default FavoritesMovie;
