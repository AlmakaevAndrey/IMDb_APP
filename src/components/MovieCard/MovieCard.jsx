import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "../Button/Button";
import { API_KEY } from "../../API_KEY";
import cls from "./MovieCard.module.css";

export const MovieCard = ({ movieId }) => {
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) {
      setError("Movie ID is required");
      setLoading(false);
      return;
    }

    const fetchMovie = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          params: {
            api_key: API_KEY,
            language: "en-US",
          },
        });
        setMovieData(response.data);
      } catch (err) {
        console.error("Ошибка запроса:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (loading) return <div className={cls.card}>Loading...</div>;
  if (error) return <div className={cls.card}>Error: {error}</div>;
  if (!movieData) return <div className={cls.card}>No data found</div>;

  return (
    <div className={cls.card}>
      <div className={cls.cardWrapper}>
        <div className={cls.nameMovie}>{movieData.title}</div>
        <div className={cls.ratingMovies}>Rating: {movieData.vote_average.toFixed(1)}/10</div>
        {movieData.poster_path && (
          <img
            className={cls.posterMovies}
            src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
            alt={movieData.title}
          />
        )}
      </div>
      <Button onClick={() => window.open(`https://www.imdb.com/title/${movieData.imdb_id}`)}>View on IMDb</Button>
    </div>
  );
};
