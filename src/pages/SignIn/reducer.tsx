import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ConsumerUser } from "../../Interface/ConsumerUserInterface";
import { UploaderUser } from "../../Interface/UploaderUserInterface";
import { ModeratorUser } from "../../Interface/ModeratorUserInterface";

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

interface ModeratorState {
  type: "moderator";
  user: ModeratorUser;
  token: string;
}

export type UserState = ConsumerState | UploaderState | ModeratorState;

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
    },
    setSubscribe:(state : any, action: PayloadAction<any>) => {
      if (action.payload.user) state.user = action.payload.user;
      if (action.payload.token) state.token = action.payload.token;
      if (action.payload.type) state.type = action.payload.type;
    }
  },
});

export const { setLogin, setLogout, setSubscribe } = authSlice.actions;
export default authSlice.reducer;
