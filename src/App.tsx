import React, { useContext, useEffect, useRef } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { HomePageLazy } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { MoviePageLazy } from "./pages/MoviePage";
import { FavoritesMovieLazy } from "./pages/FavoritesMovie";
import { ThemeProvider } from "./theme/ThemeProvider";
import { ForbiddenPage } from "./pages/ForbiddenPage";
import { AuthProvider } from "./Auth";
import { Loader } from "./components/Loader";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "./hooks/useAuth";

const ProtectedRoutes = () => {
  const {isAuth, loading} = useAuth();
  const location = useLocation();

  const TOAST_LOG_OUT_ID = "toast-logged-out-id";
  const TOAST_LOG_IN_ID = "toast-logged-in-id";
  const prevAuthRef = useRef<boolean | null>(null);

  useEffect(() => {
    if (!loading) {
      if (prevAuthRef.current === null) {
        prevAuthRef.current = isAuth;
        return;
      }

      if (isAuth && !toast.isActive(TOAST_LOG_IN_ID)) {
        toast.success("You are logged in!", { toastId: TOAST_LOG_IN_ID });
      }
      
      if (prevAuthRef.current !== isAuth) {
        if (!isAuth && !toast.isActive(TOAST_LOG_OUT_ID)) {
          toast.error("You are logged out!", { toastId: TOAST_LOG_OUT_ID });
        }
        prevAuthRef.current = isAuth;
      }
    }
  }, [loading, isAuth])

  return loading 
   ? <Loader/>
   : isAuth 
   ? <Outlet/> 
   : <Navigate to="/forbidden"  state={{from: location.pathname}} replace />
   }

const App: React.FC = () => {
  return (
    <>
    <ThemeProvider>
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<MoviePageLazy/>} />
            <Route path="/movie/:id" element={<MoviePageLazy />} />
            <Route path="/forbidden" element={<ForbiddenPage/>} />
            <Route path="/search" element={<HomePageLazy />} />
            <Route path="/movie/:movieType?" element={<HomePageLazy />} />

            <Route element={<ProtectedRoutes/>}>
              <Route path="/favorites" element={<FavoritesMovieLazy />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      </AuthProvider>
    </ThemeProvider>
    </>
  );
};

export default App;
