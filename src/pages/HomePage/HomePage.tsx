import cls from "./HomePage.module.css";
import axios from "axios";
import Pagination from "../../components/Pagination/Pagination";
import { Loader } from "../../components/Loader";
import { Filters } from "../../components/Filters/Filters";
import { MovieCardList } from "../../components/MovieCardList";
import { SearchInput } from "../../components/SearchInput/SearchInput";
import { API_KEY } from "../../API_KEY";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { buildFiltersParams, FiltersProps } from "../../utils/buildFiltersParams";
import { delayFn } from "../../helpers/delayFn";


interface Movie {
  id: number;
  title: string;
}

interface MoviesData {
  results: Movie[];
  total_pages: number;
}


const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const [filters, setFilters] = useState<FiltersProps>({});
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [moviesData, setMoviesData] = useState<MoviesData | null>(null);

  const debounceRef = useRef<number | null>(null);
  const controlsContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      const fetchMovies = async () => {
        setIsLoading(true);
        setError(null);
        await delayFn(1000);

        const baseURL = searchValue.trim()
          ? "https://api.themoviedb.org/3/search/movie"
          : "https://api.themoviedb.org/3/discover/movie";

        const params: Record<string, any> = {
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
          setError(err instanceof Error ? err.message : "Error");
        } finally {
          setIsLoading(false);
        }
      };

      fetchMovies();
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);}
  }, [searchValue, filters, currentPage]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      setSearchParams({ page: newPage.toString() });
    },
    [setSearchParams],
  );

  const totalPages = useMemo(() => Math.min(moviesData?.total_pages || 1, 10), [moviesData]);

  return (
    <div className={cls.homeWrapper}>
      <h1>Movies on TMDB</h1>
      <div className={cls.controlsContainer} ref={controlsContainerRef}>
        <div className={cls.searchMovieWrapper}>
          <SearchInput value={searchValue} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)} />
          <Filters onFilterChange={setFilters} className={cls.MovieFilters} />
        </div>
      </div>

      {isLoading && <Loader />}
      {error && <div className={cls.error}>{error}</div>}

      <MovieCardList movies={moviesData?.results || []} />
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageHandlerChange={handlePageChange} />
    </div>
  );
};

export default HomePage;
