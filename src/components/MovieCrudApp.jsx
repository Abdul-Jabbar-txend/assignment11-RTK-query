import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMovie, removeMovie, editMovie } from "../redux/slice";
import "./MovieCrudApp.css";

const MovieApp = () => {
  const movies = useSelector((state) => state.movies.movies);
  const dispatch = useDispatch();
  const [editingMovie, setEditingMovie] = useState(null);
  const [movieName, setMovieName] = useState("");

  const handleSubmit = () => {
    if (movieName.trim()) {
      if (editingMovie) {
        dispatch(editMovie({ id: editingMovie.id, name: movieName }));
        setEditingMovie(null);
      } else {
        dispatch(addMovie({ name: movieName }));
      }
      setMovieName("");
    }
  };

  useEffect(() => {
    if (editingMovie) {
      setMovieName(editingMovie.name);
    } else {
      setMovieName("");
    }
  }, [editingMovie]);

  const handleRemoveMovie = (id) => {
    dispatch(removeMovie(id));
  };

  return (
    <div className="movie-app">
      <h1>Add Your Favorite Movie List </h1>

      <div className="input-container">
        <input
          type="text"
          onChange={(e) => setMovieName(e.target.value)}
          value={movieName}
          placeholder={editingMovie ? "Edit movie name" : "Enter movie name"}
        />

        <button onClick={handleSubmit}>
          {editingMovie ? "Save Movie" : "Add Movie"}
        </button>
      </div>

      {/* Display movie list */}
      {movies.length === 0 ? (
        <p className="no-movies">No movies available.</p>
      ) : (
        <div className="movie-list">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-item">
              <span className="movie-name">{movie.name}</span>

              <div className="button-group">
                <button
                  className="edit-button"
                  onClick={() => setEditingMovie(movie)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleRemoveMovie(movie.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieApp;
