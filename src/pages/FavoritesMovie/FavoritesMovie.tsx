import { useEffect, useState, useCallback, useMemo } from "react";
import { Button } from "../../components/Button";
import cls from "./FavoritesMovie.module.css";
import { MovieCard } from "../../components/MovieCard";
import { delayFn } from "../../helpers/delayFn";
import { Loader } from "../../components/Loader";
import { useFetch } from "../../helpers/useFetch";
import { toast } from "react-toastify";

interface MoviePropsType {
  id: number;
  title?: string;
  original_title?: string;
  poster_path?: string;
}

const TOAST_ID = "you-don`t-have-any-favorites-movie";
const ERROR_TOAST_ID = "failed-to-load-favorites";

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

      if (!data?.length && !toast.isActive(TOAST_ID)) {
        toast.info("You don't have any favorite movies", { toastId: TOAST_ID})
      }
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
    if (error && toast.isActive(ERROR_TOAST_ID)) !toast.error("Failed to load favorites", {toastId: ERROR_TOAST_ID});
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
