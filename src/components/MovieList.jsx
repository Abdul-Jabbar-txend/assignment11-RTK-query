/* eslint-disable react/prop-types */
import "./MovieList.css";

const MovieList = ({ movies }) => {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <div className="movie-tile" key={movie.id}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="movie-thumbnail"
          />
          <h3>{movie.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
