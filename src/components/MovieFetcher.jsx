/* eslint-disable no-undef */
import { useGetMoviesQuery } from "../redux/rtkQuery/moviesApi";
import MovieList from "./MovieList";
import "./MovieFetcher.css";

const MovieFetcher = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, error, isLoading } = useGetMoviesQuery(searchTerm);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="movie-fetcher">
      <h1>Search Your Favorite Movies From Api</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      {isLoading && <p className="status-message">Loading...</p>}
      {error && (
        <p className="status-message error">
          Error fetching movies: {error.message}
        </p>
      )}
      <div className="movie-grid">
        {data?.results ? (
          <MovieList movies={data.results} />
        ) : (
          <p className="status-message">No movies found. Please try again.</p>
        )}
      </div>
    </div>
  );
};

export default MovieFetcher;
