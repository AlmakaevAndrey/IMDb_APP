import { Button } from "../Button/Button";
import cls from "./MovieCard.module.css";

export const MovieCard = () => {
  return (
    <div className={cls.card}>
      <div className={cls.cardWrapper}>
        <div className={cls.bestMovies}>List Movies</div>
        <div className={cls.nameMovie}>Name movie</div>
      </div>
      <Button onClick={() => {}}>View</Button>
    </div>
  );
};
