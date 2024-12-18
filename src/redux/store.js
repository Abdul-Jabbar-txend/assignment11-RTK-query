import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { moviesApi } from "./rtkQuery/moviesApi";
import movieReducer from "./slice";

// Persist configuration for redux-persis
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["movies"],
};

const persistedReducer = persistReducer(persistConfig, movieReducer);

// Create the store with both the persisted movie reducer and RTK Query API reducer
const store = configureStore({
  reducer: {
    movies: persistedReducer,
    [moviesApi.reducerPath]: moviesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware),
});

export const persistor = persistStore(store);

export default store;
