import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentVideo: null,
  loading: false,
  error: false,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.currentVideo = action.payload;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    like: (state, action) => {
      state.currentVideo.message = action.payload;
    },
    dislike: (state, action) => {
      state.currentVideo.message = action.payload;
    },
    moderate: (state, action) => {
      state.currentVideo.message.moderate = action.payload;
    },
    addComment: (state, action) => {
      state.currentVideo.message.comments.push(action.payload);
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure, like, dislike, moderate, addComment } =
  videoSlice.actions;

export default videoSlice.reducer;