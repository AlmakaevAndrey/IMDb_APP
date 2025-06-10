import { createContext, ReactNode, useContext, useEffect } from 'react';
import { AUTH_STORAGE } from '../constants';
import { useState } from 'react';

type AuthContextType = {
    isAuth: boolean ;
    setIsAuth: (value: boolean) => void;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() =>  {
        const storedAuth = localStorage.getItem(AUTH_STORAGE);
        setIsAuth(storedAuth === "true");
        setLoading(false);
    }, [])

    
    return <AuthContext.Provider value={{isAuth, loading, setIsAuth}}>{children}</AuthContext.Provider>
}