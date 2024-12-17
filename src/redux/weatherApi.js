import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Replace with your OpenWeatherMap API key
const API_KEY = "68cb604593msh9c52744b301434dp1156c2jsnfb32c68854db";

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.openweathermap.org/data/2.5/",
  }),
  endpoints: (builder) => ({
    getWeather: builder.query({
      query: (city) => `weather?q=${city}&appid=${API_KEY}&units=metric`, // Fetch weather for the city
    }),
  }),
});

export const { useGetWeatherQuery } = weatherApi;
