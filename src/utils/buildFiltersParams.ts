export type FiltersProps = {
  genre?: string | number;
  rating?: number;
  year?: number;
};

type FilterParams = {
  with_genres?: string | number;
  "vote_average.gte"?: number;
  "release_date.gte"?: string;
  "release_date.lte"?: string;
}

export const buildFiltersParams = (filters: FiltersProps): FilterParams => {
  const params: FilterParams = {};

  if (filters.genre) {
    params.with_genres = filters.genre;
  }

  if (filters.rating) {
    params["vote_average.gte"] = filters.rating;
  }

  if (filters.year) {
    params["release_date.gte"] = `${filters.year}-01-01`;
    params["release_date.lte"] = `${filters.year}-12-31`;
  }

  return params;
};
