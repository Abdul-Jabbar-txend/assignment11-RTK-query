import { createSlice } from "@reduxjs/toolkit";

export const whiteBlackListSlice = createSlice({
  name: "whiteBlackList",
  initialState: {
    whiteList: [],
    blackList: [],
  },
  reducers: {
    addToWhiteList: (state, action) => {
      state.whiteList.push(action.payload);
    },
    removeFromWhiteList: (state, action) => {
      state.whiteList = state.whiteList.filter(
        (item) => item !== action.payload
      );
    },
    addToBlackList: (state, action) => {
      state.blackList.push(action.payload);
    },
    removeFromBlackList: (state, action) => {
      state.blackList = state.blackList.filter(
        (item) => item !== action.payload
      );
    },
  },
});

export const {
  addToWhiteList,
  removeFromWhiteList,
  addToBlackList,
  removeFromBlackList,
} = whiteBlackListSlice.actions;

export default whiteBlackListSlice.reducer;
