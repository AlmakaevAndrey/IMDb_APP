import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import cls from "./FavoritesMovie.module.css";
import { MovieCard } from "../../components/MovieCard";
import { delayFn } from "../../helpers/delayFn";
import { Loader } from "../../components/Loader";

export const FavoritesMovie = () => {
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
        console.error("Failed fetch:", error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieFavorites();
  }, []);

  const handleRemove = (id) => {
    const updatedMovie = favoritesMovie.filter((movie) => movie.id !== id);
    setFavorites(updatedMovie);
    localStorage.setItem("favorites", JSON.stringify(updatedMovie));
  };

  const renderCardWithRemove = (movie) => (
    <div className={cls.cardWrapper} key={movie.id}>
      <MovieCard id={movie.id} title={movie.title || movie.original_title} poster={movie.poster_path} />
      <Button className={cls.removeBtn} onClick={() => handleRemove(movie.id)}>
        Delete
      </Button>
    </div>
  );

  return (
    <div className={cls.container}>
      <h2 className={cls.title}>Favorites movie</h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p>Failed to load favorites.</p>
      ) : favoritesMovie.length === 0 ? (
        <p className={cls.empty}>Don`t have any favorites movie</p>
      ) : (
        <div className={cls.cardList}>{favoritesMovie.map(renderCardWithRemove)}</div>
      )}
    </div>
  );
};

export default FavoritesMovie;
