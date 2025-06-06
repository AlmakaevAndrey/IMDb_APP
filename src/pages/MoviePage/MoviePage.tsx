import cls from "./MoviePage.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { delayFn } from "../../helpers/delayFn";
import { Loader } from "../../components/Loader";
import { Button } from "../../components/Button";
import { MovieService } from "../../Axios/MovieService";
import { useFetch } from "../../helpers/useFetch";

interface Genre {
  id: number;
  name: string;
}

interface MovieProps {
  id: number;
  title: string;
  original_title: string;
  poster_path?: string;
  release_date: string;
  vote_average?: number;
  genres?: Genre[];
  overview: string;
}

export const MoviePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieProps | null>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

    const [fetchMoviesById, isLoading, error] = useFetch< string, MovieProps>(
      async (movieId) => await MovieService.getMovieById(movieId)
    );

      useEffect(() => {
        if (!id) return;
        fetchMoviesById(id).then((data) => {
          if (data) setMovie(data);
        })
      }, [id]);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
          const trailerKey = await MovieService.getMovieTrailer(id!);
          setTrailerKey(trailerKey);
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

  if (isLoading) {
    return <Loader />;
  }

  if (!movie) return null;

  const posterUrl: string = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  const handleToAddMovie = () => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    const exists = stored.some((item: { id: number; }) => item.id === movie.id);

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
        <img loading="lazy" src={posterUrl} alt={movie?.title} className={cls.moviePoster} />
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

export default MoviePage;
