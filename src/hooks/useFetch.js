import { useState } from "react";
import { delayFn } from "../helpers/delayFn";

export const useFetch = (callback) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchFn = async (...args) => {
    try {
      setIsLoading(true);
      setError("");
      await delayFn();

      const result = await callback(args);
      setData(result);
      return result;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { data, fetchFn, isLoading, error };
};
