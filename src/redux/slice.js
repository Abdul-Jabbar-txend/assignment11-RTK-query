import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [], // The list of movies
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovie: (state, action) => {
      const newMovie = {
        id: state.movies.length
          ? state.movies[state.movies.length - 1]?.id + 1
          : 1,
        name: action.payload.name,
      };
      state.movies.push(newMovie);
    },
    removeMovie: (state, action) => {
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload
      );
    },
    editMovie: (state, action) => {
      const movie = state.movies.find(
        (movie) => movie.id === action.payload.id
      );
      if (movie) {
        movie.name = action.payload.name;
      }
    },
  },
});

export const { addMovie, removeMovie, editMovie } = movieSlice.actions;
export default movieSlice.reducer;
