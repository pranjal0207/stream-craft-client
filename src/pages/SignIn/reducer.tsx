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

interface ModeratoState {
  type: "moderator";
  user: ModeratorUser;
  token: string;
}

export type UserState = ConsumerState | UploaderState | ModeratoState;

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
      console.log({"state" : state.user});
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
