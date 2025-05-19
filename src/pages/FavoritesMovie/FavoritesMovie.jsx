import { useEffect, useState, useCallback, useMemo } from "react";
import { Button } from "../../components/Button";
import cls from "./FavoritesMovie.module.css";
import { MovieCard } from "../../components/MovieCard";
import { delayFn } from "../../helpers/delayFn";
import { Loader } from "../../components/Loader";

const FavoritesMovie = () => {
  const [favoritesMovie, setFavorites] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMovieFavorites = async () => {
      try {
        setIsLoading(true);
        await delayFn(1000);
        const storedMovies = JSON.parse(localStorage.getItem("favorites") || "[]");
        setFavorites(storedMovies);
        setError(false);
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieFavorites();
  }, []);

  const handleRemove = useCallback((id) => {
    setFavorites((prev) => {
      const updated = prev.filter((movie) => movie.id !== id);
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const renderCardWithRemove = useCallback(
    (movie) => (
      <div className={cls.cardWrapper} key={movie.id}>
        <MovieCard id={movie.id} title={movie.title || movie.original_title} poster={movie.poster_path} />
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
