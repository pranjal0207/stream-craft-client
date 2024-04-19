import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../pages/login/reducer';
import { UserState } from "../pages/login/reducer";

export interface StreamCraftState {
	authReducer: {
		user : UserState,
		token : string,
		type : String
	};
}

const store = configureStore({
	reducer: {
		authReducer
	}
});

export default store;