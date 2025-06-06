import { buildFiltersParams } from '../utils/buildFiltersParams';
import { API_KEY } from './../API_KEY';
import API from "./Axios.config";


type MovieTrailerType = {
    video: string;
    type: string;
    site: string;
}


export class MovieService {
static fetchMovies: any;
static async getMovieById(id: string) {
    const response = await API.get(`/movie/${id}`, {
        params: {
            api_key: API_KEY,
            language: "en-US",
        }
    })
    return response.data;
}

static async getMovieTrailer(id: string) {
    const response = await API.get(`/movie/${id}/videos`, {
        params: {
            api_key: API_KEY,
            language: "en-US",
        }
    })
    
    const trailer  = response.data.results.find(
        (video: MovieTrailerType) => video.type === "Trailer" && video.site === "YouTube"
    );
    return trailer?.key || null;
}

static async getSearchMovie(
    searchValue: string,
    filters: any,
    currentPage: number
) {
    const isSearch = searchValue.trim().length > 0;
    const baseURL = isSearch ? "/search/movie" : "/discover/movie";

    const params: Record<string, any> = {
        api_key: API_KEY,
        language: "en-US",
        page: currentPage,
    };

    if (isSearch) {
        params.query = searchValue.trim();
    } else {
        Object.assign(params, buildFiltersParams(filters));
    }
    const response = await API.get(baseURL, {params});
    return response.data;
}
}