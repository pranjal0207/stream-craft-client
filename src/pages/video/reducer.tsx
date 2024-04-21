import { createSlice } from "@reduxjs/toolkit";
import { VideoInterface } from "../../Interface/VideoInterface";

interface VideoState {
  currentVideo: VideoInterface;
  loading: boolean,
  error: boolean,
}

const initialState : VideoState = {
  currentVideo: {
    message: {
      video_id: "",
      title: "",
      description: "",
      uploadDate: "",
      uploaderId: "",
      views: 0,
      likes: 0,
      dislikes: 0,
      comments: [],
      coordinates: [],
      moderated: false
    },
    videoUrl:""
  },
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
      console.log({"state" : action.payload})
      state.loading = false;
      state.currentVideo = action.payload;
      console.log({"state2" : state.currentVideo});
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    like: (state, action) => {
      state.currentVideo = action.payload;
    },
    dislike: (state, action) => {
      state.currentVideo = action.payload;
    },
    moderate: (state, action) => {
      state.currentVideo.message.moderated = action.payload;
    },
    addComment: (state, action) => {
      state.currentVideo.message.comments.push(action.payload);
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure, like, dislike, moderate, addComment } =
  videoSlice.actions;

export default videoSlice.reducer;