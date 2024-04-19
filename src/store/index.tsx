import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../pages/login/reducer';
import { UserState } from "../pages/login/reducer";

export interface StreamCraftState {
	authReducer: {
		user : any,
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