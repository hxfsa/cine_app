// import PropTypes from "prop-types";

import { useState } from "react";

function SearchBar({ fetchedMovie, addMovie, movieSearch, setMovieSearch }) {
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const movie = await fetchedMovie();
    addMovie(movie);
    setMovieSearch("");
  };

  return (
    <div>
      <form className="searchbar flex" onSubmit={handleFormSubmit}>
        <input
          value={movieSearch}
          required
          autoFocus
          onChange={(e) => setMovieSearch(e.target.value)}
          type="search"
          placeholder="Add a movie"
          className="input md:h-10 md:w-96 h-8 w-64 outline-none py-2 pl-9 pr-4 rounded-lg w-70 bg-slate-700 my-4 text-gray-800"
        />
      </form>
    </div>
  );
}

// SearchBar.propTypes = {
//   handleSearch: PropTypes.func.isRequired,
// };

export default SearchBar;
