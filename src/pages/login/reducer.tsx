import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../Interface/UserInterface";

interface InitialState {
  user : User,
  token : string
}

const initialState : InitialState = {
  user: {
    user_id : "",
    username : "",
    email: "",
    firstName: "",
    lastName: "",
    subscriptions: [],
    likedVideos : [],
    dislikedVideos :[],
    viewHistory : []
  }, 
  token : "" 
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state : InitialState, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = {
        user_id : "",
        username : "",
        email: "",
        firstName: "",
        lastName: "",
        subscriptions: [],
        likedVideos : [],
        dislikedVideos :[],
        viewHistory : []
      };
      state.token = "" 
    }
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;