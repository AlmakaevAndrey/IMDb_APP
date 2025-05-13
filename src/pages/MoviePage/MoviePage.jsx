import axios from "axios";
import cls from "./MoviePage.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_KEY } from "../../API_KEY";
import { delayFn } from "../../helpers/delayFn";
import { Loader } from "../../components/Loader";
import { Button } from "../../components/Button";

export const MoviePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setIsLoading(true);
        await delayFn(500);
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`);
        setMovie(res.data);
        setError(false);
      } catch (error) {
        console.error("Failed fetch:", error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`);
        const trailers = res.data.results;
        const youtubeTrailer = trailers.find((video) => video.type === "Trailer" && video.site === "YouTube");
        if (youtubeTrailer) {
          setTrailerKey(youtubeTrailer.key);
        }
      } catch (error) {
        console.error("Failed to fetch trailer", error);
      }
    };
    fetchTrailer();
  }, [id]);

  useEffect(() => {
    if (!isLoading && error) {
      navigate("/forbidden");
    }
  }, [isLoading, error, navigate]);

  if (isLoading) return <Loader />;

  if (!movie) return null;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  const handleToAddMovie = () => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    const exists = stored.some((item) => item.id === movie.id);

    if (exists) {
      alert("This movie has already been added!");
    } else {
      localStorage.setItem("favorites", JSON.stringify([...stored, movie]));
      alert("Film was added!");
    }
  };

  return (
    <div className={cls.container}>
      <div className={cls.moviePosterAndTrailer}>
        <img src={posterUrl} alt={movie?.title} className={cls.moviePoster} />
        {trailerKey && (
          <iframe
            className={cls.movieTrailer}
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="YouTube trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
      <div className={cls.formContainer}>
        <h1 className={cls.formTitle}>{movie.original_title}</h1>
        <div className={cls.formWrapper}>
          <h3 className={cls.movieReleaseDate}>Release: {movie.release_date}</h3>
          <h4 className={cls.movieVoteAverage}>Rating: {movie?.vote_average ? movie.vote_average.toFixed(1) : "No rating"}</h4>
          <h4 className={cls.movieGenreIds}>Genres: {movie?.genres?.map((genre) => genre.name).join(", ")}</h4>
        </div>
        <div className={cls.movieDownWrapper}>
          <p className={cls.movieOverview}>Overview: {movie.overview}</p>
          <Button className={cls.movieButton} onClick={handleToAddMovie}>
            Add to favorites
          </Button>
        </div>
      </div>
    </div>
  );
};
