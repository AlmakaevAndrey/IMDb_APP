import { API_KEY } from "../../API_KEY";
import { Loader } from "../../components/Loader";
import { MovieCardList } from "../../components/MovieCardList";
import cls from "./HomePage.module.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useFetch } from "../../hooks/useFetch";

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
      <input type="text" value={searchValue} onChange={onSearchChangeHandler} />
      <h1>Popular Movies</h1>
      {isLoading && <Loader />}
      {error && <div>{error}</div>}
      <MovieCardList movies={movies || []} />
    </div>
  );
};
