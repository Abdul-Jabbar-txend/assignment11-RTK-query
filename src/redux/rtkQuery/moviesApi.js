import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = "9976f821cd12f1aee31619a6cf74f334";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: async (args, api, extraOptions) => {
    try {
      const result = await fetchBaseQuery({
        baseUrl: "https://api.themoviedb.org/3/",
      })(args, api, extraOptions);

      return result;
    } catch (error) {
      console.error("Error fetching data from TMDB API:", error);
      return {
        error: { message: error.message, status: error.status || 500 },
      };
    }
  },
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: (searchTerm) => ({
        url: "search/movie",
        params: {
          query: searchTerm,
          api_key: apiKey,
        },
      }),
    }),
  }),
});

export const { useGetMoviesQuery } = moviesApi;
