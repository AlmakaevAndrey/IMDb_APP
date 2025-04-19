import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/MainLayout/MainLayout.jsx";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie" element={<div>movie</div>} />
          <Route path="/forbidden" element={<div>forbidden !!!</div>} />
          <Route path="/favorites" element={<div>favorites movies</div>} />
          <Route path="/search" element={<div>search movie</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
