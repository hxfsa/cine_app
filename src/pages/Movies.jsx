import SearchBar from "../components/SearchBar";
import Movie from "../components/Movie";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [movieSearch, setMovieSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5500/movies/").then((res) => {
      const movies = res.data;
      setMovies(movies);
    });
  }, []);

  useEffect(() => {
    console.log(movies);
  }, [movies]);

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${
    import.meta.env.VITE_API_KEY
  }&query=${movieSearch}`;

  const fetchedMovie = async () => {
    try {
      const response = await axios.get(url);
      const data = response.data.results[0];
      if (data) {
        return data;
      } else {
        toast.error("Movie not found.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addMovie = (fetchedMovie) => {
    const isMovieAlreadyAdded = movies.some((movie) => {
      return movie.movie_database_id === fetchedMovie.id;
    });
    if (!isMovieAlreadyAdded) {
      axios
        .post("http://localhost:5500/movies/", {
          movie_database_id: fetchedMovie.id,
          title: fetchedMovie.title,
          date: new Date(fetchedMovie.release_date).getFullYear(),
          note: fetchedMovie.vote_average,
          overview: fetchedMovie.overview,
          image: fetchedMovie.poster_path,
          bg: fetchedMovie.backdrop_path,
        })
        .then((res) => {
          const newMovie = res.data.movie;
          setMovies([...movies, newMovie]);
        });

      console.log("image de fetchedmovie", fetchedMovie);
      console.log("tous mes films react", movies);
    } else {
      toast.error("Movie already added.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const deleteMovie = (id) => {
    axios.delete(`http://localhost:5500/movies/${id}`);
    setMovies(movies.filter((movie) => movie.id !== id));
  };
  return (
    <div className="">
      <div className="flex justify-center mt-8">
        <SearchBar
          fetchedMovie={fetchedMovie}
          addMovie={addMovie}
          movieSearch={movieSearch}
          setMovieSearch={setMovieSearch}
        />
      </div>

      <div className="movies flex flex-wrap gap-8 justify-center mt-16 pb-20">
        {movies.map((movie) => (
          <li key={movie.movie_database_id} className="relative pt-2">
            <button
              onClick={() => deleteMovie(movie.id)}
              className="text-white absolute -top-6 right-0 mt-2 mr-2 hover:text-red-400 px-2"
            >
              X
            </button>
            <Link to={`/${movie.id}`}>
              <Movie movie={movie} />
            </Link>
          </li>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}
