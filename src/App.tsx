import React, { useContext } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { HomePageLazy } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { MoviePageLazy } from "./pages/MoviePage";
import { FavoritesMovieLazy } from "./pages/FavoritesMovie";
import { ThemeProvider } from "./theme/ThemeProvider";
import { ForbiddenPage } from "./pages/ForbiddenPage";
import { useAuth } from "./hooks/useAuth";
import { AuthProvider } from "./Auth";
import { AuthContext } from "./Auth/AuthProvider";
import { Loader } from "./components/Loader";

const ProtectedRoutes = () => {
  const location = useLocation();
  const {isAuth, loading} = useContext(AuthContext) || {};

  return loading
   ? <Loader/>
   : isAuth
   ? <Outlet/> 
   : <Navigate to="/forbidden" state={{from: location.pathname}} replace/>
   }

const App: React.FC = () => {
  return (
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
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
