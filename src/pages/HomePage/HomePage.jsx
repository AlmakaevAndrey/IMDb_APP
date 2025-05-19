import cls from "./HomePage.module.css";
import axios from "axios";
import { Pagination } from "../../components/Pagination/Pagination";
import { Loader } from "../../components/Loader";
import { Filters } from "../../components/Filters/Filters";
import { MovieCardList } from "../../components/MovieCardList";
import { SearchInput } from "../../components/SearchInput/SearchInput";
import { API_KEY } from "../../API_KEY";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { buildFiltersParams } from "../../utils/buildFiltersParams";
import { delayFn } from "../../helpers/delayFn";

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const [filters, setFilters] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [moviesData, setMoviesData] = useState(null);

  const debounceRef = useRef(null);
  const controlsContainerRef = useRef();

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const fetchMovies = async () => {
        setIsLoading(true);
        await delayFn(1000);
        setError(null);

        const baseURL = searchValue.trim()
          ? "https://api.themoviedb.org/3/search/movie"
          : "https://api.themoviedb.org/3/discover/movie";

        const params = {
          api_key: API_KEY,
          language: "en-US",
          page: currentPage,
        };

        if (searchValue.trim()) {
          params.query = searchValue.trim();
        } else {
          Object.assign(params, buildFiltersParams(filters));
        }

        try {
          const response = await axios.get(baseURL, { params });
          setMoviesData(response.data);
        } catch (err) {
          setError("");
        } finally {
          setIsLoading(false);
        }
      };

      fetchMovies();
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [searchValue, filters, currentPage]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  return (
    <div className={cls.homeWrapper}>
      <h1>Movies on TMDB</h1>
      <div className={cls.controlsContainer} ref={controlsContainerRef}>
        <div className={cls.searchMovieWrapper}>
          <SearchInput value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
          <Filters onFilterChange={setFilters} className={cls.MovieFilters} />
        </div>
      </div>

      {isLoading && <Loader />}
      {error && <div className={cls.error}>{error}</div>}

      <MovieCardList movies={moviesData?.results || []} />
      <Pagination
        totalPages={Math.min(moviesData?.total_pages || 1, 10)}
        currentPage={currentPage}
        onPageHandlerChange={handlePageChange}
      />
    </div>
  );
};

export default HomePage;
