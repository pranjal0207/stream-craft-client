import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'; // uses localStorage under the hood
import { persistStore, persistReducer } from 'redux-persist';

import authReducer, { UserState } from '../pages/SignIn/reducer';
import videoReducer from '../pages/video/reducer';

export interface StreamCraftState {
    authReducer: UserState;
    videoReducer: {
		currentVideo: any,
		loading: boolean,
		error: boolean
	};
}

const rootReducer = combineReducers({
    authReducer,
    videoReducer 
});

const persistConfig = {
    key: 'root',
    storage, 
    whitelist: ['authReducer'] 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({ 
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PAUSE', 'persist/PERSIST', 'persist/PURGE', 'persist/REGISTER'],
            },
        }),
});

export const persistor = persistStore(store);

export default store;