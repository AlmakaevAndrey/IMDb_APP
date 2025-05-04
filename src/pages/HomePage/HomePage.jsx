import { API_KEY } from "../../API_KEY";
import { Loader } from "../../components/Loader";
import { MovieCardList } from "../../components/MovieCardList";
import cls from "./HomePage.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { SearchInput } from "../../components/SearchInput/SearchInput";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/Button/Button";

const MOVIE_TYPES = {
  popular: "Popular Movies",
  top_rated: "Top Rated Movies",
  upcoming: "Upcoming Movies",
};

export const HomePage = () => {
  const [searchValue, setSearchValue] = useState("");
  const { movieType } = useParams();
  const navigate = useNavigate();

  const currentMovieType = movieType || "popular";

  const {
    data: moviesData,
    fetchFn,
    isLoading,
    error,
  } = useFetch(async (type) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${type}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: 1,
      },
    });
    return response.data;
  });

  useEffect(() => {
    fetchFn(currentMovieType);
  }, [currentMovieType]);

  const handleCategoryChange = (newType) => {
    navigate(`/${newType}`);
  };

  const filterMovie =
    moviesData?.results?.filter((movie) => movie.title.toLowerCase().includes(searchValue.trim().toLowerCase())) || [];

  return (
    <div className={cls.homeWrapper}>
      <h1>{MOVIE_TYPES[currentMovieType]}</h1>
      <div className={cls.controlsContainer}>
        <SearchInput value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
      </div>

      <div className={cls.navButtons}>
        <Button
          onClick={() => handleCategoryChange("popular")}
          className={currentMovieType === "popular"}
          isActive={currentMovieType === "popular"}
        >
          Popular
        </Button>
        <Button
          onClick={() => handleCategoryChange("top_rated")}
          className={currentMovieType === "top_rated"}
          isActive={currentMovieType === "top_rated"}
        >
          Top Rated
        </Button>
        <Button
          onClick={() => handleCategoryChange("upcoming")}
          className={currentMovieType === "upcoming"}
          isActive={currentMovieType === "upcoming"}
        >
          Upcoming
        </Button>
      </div>

      {isLoading && <Loader />}

      {error && <div className={cls.error}>{error}</div>}

      <MovieCardList movies={filterMovie} />
    </div>
  );
};
