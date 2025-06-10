import cls from "./HomePage.module.css";
import Pagination from "../../components/Pagination/Pagination";
import { Loader } from "../../components/Loader";
import { Filters } from "../../components/Filters/Filters";
import { MovieCardList } from "../../components/MovieCardList";
import { SearchInput } from "../../components/SearchInput/SearchInput";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiltersProps } from "../../utils/buildFiltersParams";
import { MovieService } from "../../Axios/MovieService";
import { useFetch } from "../../helpers/useFetch";
import { toast } from "react-toastify";


interface Movie {
  id: number;
  title: string;
}

interface MoviesData {
  results: Movie[];
  total_pages: number;
}

const TOAST_ID = "no-movies-toast";

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const [filters, setFilters] = useState<FiltersProps>({});
  const [searchValue, setSearchValue] = useState("");
  const [moviesData, setMoviesData] = useState<MoviesData | null>(null);

  const [fetchMovies, isLoading, error] = useFetch<{query: string; filters: FiltersProps; page: number},
  MoviesData
  >(async ({query, filters, page}) => {
    return await MovieService.getSearchMovie(query, filters, page);
  })

  const controlsContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchMovies({query: searchValue, filters, page: currentPage}).then((data) => {
        if (data) 
          setMoviesData(data);
      });
    }, 400);
    return () => clearTimeout(debounce);
  }, [searchValue, filters, currentPage]);

useEffect(() => {
  if (moviesData && searchValue.trim() !== "" && moviesData.results.length === 0 && !toast.isActive(TOAST_ID)) {
    toast.info("No movies found", { toastId: TOAST_ID });
  }
}, [moviesData, searchValue]);


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
