import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ConsumerUser } from "../../Interface/ConsumerUserInterface";
import { UploaderUser } from "../../Interface/UploaderUserInterface";

interface ConsumerState {
  type: "consumer";
  user: ConsumerUser;
  token: string;
}

interface UploaderState {
  type: "uploader";
  user: UploaderUser;
  token: string;
}

export type UserState = ConsumerState | UploaderState;

const initialState: UserState = {
  type: "consumer",
  user: {
    user_id : "",
    email: "",
    firstName: "",
    lastName: "",
    subscriptions: [],
    likedVideos : [],
    dislikedVideos :[],
    viewHistory : [],
    type:""
  },
  token : "" 
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state : UserState, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.type = action.payload.type;
      console.log({"state" : state.type});
    },
    setLogout: (state) => {
      state.user = {
        user_id : "",
        email: "",
        firstName: "",
        lastName: "",
        subscriptions: [],
        likedVideos : [],
        dislikedVideos :[],
        viewHistory : [],
        type:""
      };
      state.token = "" ;
      state.type = "consumer";
    }
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
