import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import "./App.css";
import { Auth } from "./pages/auth";
import { Home } from "./pages/home";
import { TvShow } from "./pages/tvshow";
import { Movie } from "./pages/movie";
import { Rated } from "./pages/rated";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/rated" element={<Rated />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/tvshow/:id" element={<TvShow />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
