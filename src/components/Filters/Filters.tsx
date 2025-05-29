import React, { useEffect, useState } from "react";
import cls from "./Filters.module.css";
import axios from "axios";
import { API_KEY } from "../../API_KEY";
import { FiltersProps } from "../../utils/buildFiltersParams";

type GenresMovie = {
  id: number;
  name: string;
}

type FiltersComponentsProps = {
  onFilterChange: (filters: FiltersProps) => void;
  className?: string;
}

const FiltersComponent: React.FC<FiltersComponentsProps> = ({ onFilterChange }) => {
  const [allGenres, setAllGenres] = useState<GenresMovie[]>([]);
  const [currantYear, setCurrantYear] = useState<string>("");
  const [currantGenre, setCurrantGenre] = useState<string>("");
  const [currantRating, setCurrantRating] = useState<string>("");

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`);
        setAllGenres(res.data.genres);
      } catch (err) {
        console.error("Failed to load genres!", err);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    onFilterChange({
      genre: currantGenre,
      year: currantYear ? Number(currantYear) : undefined,
      rating: currantRating ? Number(currantRating) : undefined,
    });
  }, [currantGenre, currantYear, currantRating, onFilterChange]);

  return (
    <div className={cls.filtersWrapper}>
      <select value={currantGenre} onChange={(e) => setCurrantGenre(e.target.value)}>
        <option value="">Genres</option>
        {allGenres.map((g) => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </select>

      <select value={currantYear} onChange={(e) => setCurrantYear(e.target.value)}>
        <option value="">Years</option>
        {Array.from({ length: 30 }, (_, i) => {
          const y = new Date().getFullYear() - i;
          return (
            <option key={y} value={y}>
              {y}
            </option>
          );
        })}
      </select>

      <select value={currantRating} onChange={(e) => setCurrantRating(e.target.value)}>
        <option value="">Rating</option>
        <option value="7">Rating +5</option>
        <option value="7">Rating +6</option>
        <option value="7">Rating +7</option>
        <option value="8">Rating +8</option>
        <option value="9">Rating +9</option>
      </select>
    </div>
  );
};

export const Filters = React.memo(FiltersComponent);
