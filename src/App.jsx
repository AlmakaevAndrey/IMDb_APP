import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { MoviePage } from "./pages/MoviePage";
import { FavoritesMovie } from "./pages/FavoritesMovie/FavoritesMovie";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/?page=1" replace />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/:movieType?" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesMovie />} />
          <Route path="/search" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
