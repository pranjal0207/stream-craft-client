import { configureStore } from "@reduxjs/toolkit";
import loginReducer from '../pages/login/reducer'
import { User } from "../Interface/UserInterface";

export interface StreamCraftState {
	loginReducer: {
		user : User,
		token : string
	};
}

const store = configureStore({
	reducer: {
		loginReducer
	}
});

export default store;