import { Routes, Route } from "react-router-dom";
import MovieDetails from "./pages/MovieDetails";
import Movies from "./pages/Movies";
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"


function App() {
  return (
    <div className="app ">
        <NavBar />
      <main className="">
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/:id" element={<MovieDetails />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
