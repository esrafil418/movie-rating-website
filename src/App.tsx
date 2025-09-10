import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import "./App.css";
import { Auth } from "./pages/auth";
import { Home } from "./pages/home";
import { TvShow } from "./pages/tvshow";
import { Movie } from "./pages/movie";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/rated" element={<h1>Rated Page</h1>} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/tvshow/:id" element={<TvShow />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
