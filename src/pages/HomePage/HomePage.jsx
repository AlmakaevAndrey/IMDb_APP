import { API_KEY } from "../../API_KEY";
import { Loader } from "../../components/Loader";
import { MovieCardList } from "../../components/MovieCardList";
import cls from "./HomePage.module.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { SearchInput } from "../../components/SearchInput/SearchInput";

export const HomePage = () => {
  const [searchValue, setSearchValue] = useState("");

  const {
    data: movies,
    fetchFn,
    isLoading,
    error,
  } = useFetch(async () => {
    const response = await axios.get("https://api.themoviedb.org/3/movie/popular", {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: 1,
      },
    });
    return response.data.results;
  });

  useEffect(() => {
    fetchFn();
  }, []);

  const onSearchChangeHandler = (e) => {
    console.log(e.target.value);
    setSearchValue(e.target.value);
  };

  return (
    <div className={cls.homeWrapper}>
      <h1>Popular Movies</h1>
      <div className={cls.controlsContainer}>
        <SearchInput value={searchValue} onChange={onSearchChangeHandler} />
      </div>
      {isLoading && <Loader />}
      {error && <div>{error}</div>}
      <MovieCardList movies={movies || []} />
    </div>
  );
};
