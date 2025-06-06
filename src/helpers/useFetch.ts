import { error } from 'console';
import { useState } from "react"
import { delayFn } from './delayFn';

export const  useFetch = <T = any, R = any> (callback: (arg: T) => Promise<R>) : [(arg: T) => Promise<R | undefined>, boolean, string] => {
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchFn = async (arg: T) => {
        try {
            setIsLoading(true);
            setError("");
            await delayFn(2000);

            const response = await callback(arg);

            return response;
        } catch (err) {
            const message = err instanceof Error ? err.message : "Not worked!"
            setError(message)
        } finally {
            setIsLoading(false);
        }
    }

    return [fetchFn, isLoading, error];
}