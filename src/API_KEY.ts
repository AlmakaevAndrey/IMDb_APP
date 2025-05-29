const apiKey = import.meta.env.VITE_API_KEY;

type APIRequestType = {
  popular: string;
  movieDetails: (id: number) => string;
}

export const API_REQUEST: APIRequestType = {
  popular: `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`,
  movieDetails: (id:number) => `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`,
};

export const API_KEY = apiKey || "none";
console.log("VITE_API_KEY from import.meta.env: ", apiKey);
