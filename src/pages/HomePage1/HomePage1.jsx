import { useState, useEffect } from "react";
import axios from "axios";
import { MovieCard } from "../../components/MovieCard/MovieCard";
import cls from "./HomePage.module1.css";
import { API_KEY } from "../../API_KEY";
import { Button } from "../../components/Button/Button";
import { useNavigate, useParams } from "react-router-dom";

export const HomePage = () => {
  const { page } = useParams();
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [totalPages, setTotalPages] = useState(1);

  const currentPage = Math.max(parseInt(page) || 1, 1);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get("https://api.themoviedb.org/3/movie/popular", {
          params: {
            api_key: API_KEY,
            language: "en-US",
            page: currentPage,
          },
        });

        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (err) {
        setError(err.message);
        navigate(`/movie/page=1`);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, [currentPage, navigate]);

  const handlePageChange = (newPage) => {
    const validatedPage = Math.min(Math.max(newPage, 1), totalPages);
    navigate(`/movie/page=${validatedPage}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={cls.homeWrapper}>
      <div className={cls.titleWrapper}>
        <h1 className={cls.title}>Popular Movies</h1>
        <h2 className={cls.text}>Page {currentPage}</h2>
      </div>
      <div className={cls.movies}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movieId={movie.id} />
        ))}
      </div>
      <div className={cls.btnWrapper}>
        <Button className={cls.btnPrev} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>
          Prev
        </Button>

        <span className={cls.pageNumber}>
          {currentPage} / {totalPages}
        </span>

        <Button className={cls.btnNext} onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
};
