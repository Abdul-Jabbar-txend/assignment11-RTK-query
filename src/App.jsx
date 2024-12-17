import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetWeatherQuery } from "./redux/weatherApi";
import {
  addToWhiteList,
  removeFromWhiteList,
  addToBlackList,
  removeFromBlackList,
} from "./redux/slices/whiteBlackListSlice";

function App() {
  const dispatch = useDispatch();
  const [city, setCity] = useState("");
  const { whiteList, blackList } = useSelector((state) => state.whiteBlackList);

  // Fetch weather data using RTK Query
  const {
    data: weather,
    isLoading,
    isError,
  } = useGetWeatherQuery(city, {
    skip: !city, // Skip the query if the city is empty
  });

  const handleAddToWhiteList = (user) => dispatch(addToWhiteList(user));
  const handleRemoveFromWhiteList = (user) =>
    dispatch(removeFromWhiteList(user));
  const handleAddToBlackList = (user) => dispatch(addToBlackList(user));
  const handleRemoveFromBlackList = (user) =>
    dispatch(removeFromBlackList(user));

  return (
    <div>
      <h1>Weather and List Management</h1>

      {/* Weather Search */}
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={() => setCity(city)}>Get Weather</button>

      {isLoading && <p>Loading weather data...</p>}
      {isError && <p>Error fetching weather data.</p>}
      {weather && (
        <div>
          <h2>Weather in {weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}

      {/* White List */}
      <h2>White List</h2>
      <ul>
        {whiteList.map((user) => (
          <li key={user}>
            {user}
            <button onClick={() => handleRemoveFromWhiteList(user)}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      {/* Black List */}
      <h2>Black List</h2>
      <ul>
        {blackList.map((user) => (
          <li key={user}>
            {user}
            <button onClick={() => handleRemoveFromBlackList(user)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
