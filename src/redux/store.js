import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Local storage for persistence
import { combineReducers } from "redux";
import { whiteBlackListSlice } from "../redux/slices/whiteBlackListSlice";
import { weatherApi } from "../redux/weatherApi";

// Redux Persist Configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["whiteBlackList"], // Only persist the whiteBlackList slice
};

const rootReducer = combineReducers({
  whiteBlackList: whiteBlackListSlice.reducer,
  [weatherApi.reducerPath]: weatherApi.reducer, // Add RTK Query reducer here
});

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store Configuration
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware), // Add RTK Query middleware
});

export const persistor = persistStore(store);
