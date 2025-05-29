import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "../components/MainLayout/MainLayout";
import { HomePage } from "../pages/HomePage";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/forbidden" element={<div>forbidden !!!</div>} />
          <Route path="/favorites" element={<div>favorites movies</div>} />
          <Route path="/search" element={<div>search movie</div>} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
