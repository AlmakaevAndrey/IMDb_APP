export const buildFiltersParams = (filters) => {
  const params = {};

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
