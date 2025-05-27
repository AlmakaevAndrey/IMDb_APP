import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { HomePageLazy } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { MoviePageLazy } from "./pages/MoviePage";
import { FavoritesMovieLazy } from "./pages/FavoritesMovie";
import { ThemeProvider } from "./theme/ThemeProvider";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/?page=1" replace />} />
            <Route path="/movie/:id" element={<MoviePageLazy />} />
            <Route path="/:movieType?" element={<HomePageLazy />} />
            <Route path="/favorites" element={<FavoritesMovieLazy />} />
            <Route path="/search" element={<HomePageLazy />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
