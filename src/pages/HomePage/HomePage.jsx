import { MovieCard } from "../../components/MovieCard/MovieCard";
import cls from "./HomePage.module.css";

export const HomePage = () => {
  return (
    <div>
      HomePage
      <MovieCard movieId={550} />
    </div>
  );
};
