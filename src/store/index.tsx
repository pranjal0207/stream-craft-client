import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../pages/login/reducer';
import { UserState } from "../pages/login/reducer";
import videoReducer from '../pages/video/reducer';

export interface StreamCraftState {
	authReducer: {
		user : any,
		token : string,
		type : String
	};
	videoReducer: {
		currentVideo: any,
		loading: boolean,
		error: boolean
	}
}

const store = configureStore({
	reducer: {
		authReducer,
		videoReducer
	}
});

export default store;