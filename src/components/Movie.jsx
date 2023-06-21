export default function Movie({ movie }) {
    const maxLength = 15;
    const shortenedTitle = movie.title.length > maxLength
      ? movie.title.substring(0, maxLength) + '...'
      : movie.title;
      // console.log(movie.title, movie.image)
    return (
      <div className="movie mb-5 ">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.image}`}
          alt=""
          className="poster border-4  "
        />
        <div className="movie-info">
          <h1 className="md:text-2xl text-white font-bold w-full hover:text-yellow-400">{shortenedTitle}</h1>
          <h2 className="md:text-xl text-white font-extralight ">{movie.date}</h2>
        </div>
      </div>
    );
  }
  