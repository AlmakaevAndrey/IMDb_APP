import { API_REQUEST, API_KEY } from "../../API_KEY";
import { MovieCard } from "../../components/MovieCard/MovieCard";
import cls from "./HomePage.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

export const HomePage = () => {
  const [movies, setMovies] = useState([]);

  const getMovieCards = async () => {
    try {
      const response = await axios.get("https://api.themoviedb.org/3/movie/popular", {
        params: {
          api_key: API_KEY,
          language: "en-US",
          page: 1,
        },
      });
      setMovies(response.data.results);
      console.log("response", response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovieCards();
  }, []);

  return (
    <div className={cls.homeWrapper}>
      <h1>Popular Movies</h1>
      <div className={cls.moviesGrid}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} title={movie.title} poster={movie.poster_path} />
        ))}
      </div>
    </div>
  );
};
