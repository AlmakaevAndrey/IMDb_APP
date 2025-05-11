import { API_KEY } from "../../API_KEY";
import { Loader } from "../../components/Loader";
import { MovieCardList } from "../../components/MovieCardList";
import cls from "./HomePage.module.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { SearchInput } from "../../components/SearchInput/SearchInput";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { Pagination } from "../../components/Pagination/Pagination";
import { delayFn } from "../../helpers/delayFn";

const MOVIE_TYPES = {
  popular: "Popular Movies",
  top_rated: "Top Rated Movies",
  upcoming: "Upcoming Movies",
};

export const HomePage = () => {
  const [searchValue, setSearchValue] = useState("");
  const { movieType } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const controlsContainerRef = useRef();

  const currentPage = Number(searchParams.get("page")) || 1;
  const currentMovieType = movieType || "popular";

  const {
    data: moviesData,
    fetchFn,
    isLoading,
    error,
  } = useFetch(async (type, page) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieType}?page=${currentPage}&api_key=${API_KEY}&language=en-US`,
      {
        params: {
          api_key: API_KEY,
          language: "en-US",
          page: page,
        },
      },
    );

    return response.data;
  });

  delayFn();

  useEffect(() => {
    fetchFn(currentMovieType, currentPage);
    controlsContainerRef.current.scrollIntoView({ behavior: "smooth" });
  }, [currentMovieType, currentPage]);

  const handleCategoryChange = (newType) => {
    navigate(`/${newType}?page=1`);
  };

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  const filterMovie =
    moviesData?.results?.filter((movie) => movie.title.toLowerCase().includes(searchValue.trim().toLowerCase())) || [];

  return (
    <div className={cls.homeWrapper}>
      <h1>{MOVIE_TYPES[currentMovieType]}</h1>
      <div className={cls.controlsContainer} ref={controlsContainerRef}>
        <SearchInput value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />

        <div className={cls.navButtons}>
          <Button onClick={() => handleCategoryChange("popular")} isActive={currentMovieType === "popular"}>
            Popular
          </Button>
          <Button onClick={() => handleCategoryChange("top_rated")} isActive={currentMovieType === "top_rated"}>
            Top Rated
          </Button>
          <Button onClick={() => handleCategoryChange("upcoming")} isActive={currentMovieType === "upcoming"}>
            Upcoming
          </Button>
        </div>
      </div>

      {isLoading && <Loader />}
      {error && <div className={cls.error}>{error}</div>}

      <MovieCardList movies={filterMovie} />

      <Pagination totalPages={moviesData?.total_pages || 1} currentPage={currentPage} onPageHandlerChange={handlePageChange} />
    </div>
  );
};
