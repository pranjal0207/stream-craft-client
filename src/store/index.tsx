import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../pages/SignIn/reducer';
import { UserState } from "../pages/SignIn/reducer";

export interface StreamCraftState {
	authReducer: UserState;
}

const store = configureStore({
	reducer: {
		authReducer
	}
});

export default store;