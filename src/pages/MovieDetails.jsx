import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function MovieDetails() {
  const [movie, setMovie] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios.get("http://localhost:5500/movies/").then((res) => {
      console.log(res.data);
      const movies = res.data;
      const filteredMovie = movies.filter((movie) => movie.id == id);
      console.log(filteredMovie);
      setMovie(filteredMovie[0]);


    });
  }, []);

  useEffect(() => {
    console.log(movie);
  }, []);
  return (
    <div className="flex flex-col items-center mt-8">
      <div className="movieinfo text-center mb-4">
        <p className="text-3xl font-semibold text-white">{movie.title}</p>
        <div className="flex justify-center">
          <p className="text-gray-400 font-semibold">
            {movie.date}
            <span className="mx-1">|</span>
          </p>
          <span class="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
            ⭐ {`${((movie.note / 10) * 5).toFixed(1)}/5`}
          </span>
        </div>
      </div>
      <div className="movie mb-5 ">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.image}`}
          alt=""
          className="poster2 border-4"
        />
      </div>
      <div className="moviedescription pb-20 flex flex-col items-center">
        <p className="text-gray-300 text-2xl font-semibold my-2">Synopsis</p>
        <p className="description text-gray-300 mt-2 w-1/2 text-justify">
          {movie.overview}
        </p>
      </div>
    </div>
  );
}
