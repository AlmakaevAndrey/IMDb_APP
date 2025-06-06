import axios from "axios";
import { API_KEY } from "../API_KEY";

const BASE_URL = "https://api.themoviedb.org/3/"

const API = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
        language: "en-US",
    },
    timeout: 2000,
})

API.interceptors.request.use(config => {
    console.log("API request:", config.method, config.url);
    return config;
})

API.interceptors.response.use(
    response => response,
    error => {
        console.error("API error:", error.response?.status, error.message);
        return Promise.reject(error);
    }
);

export default API;