import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'; // uses localStorage under the hood
import { persistStore, persistReducer } from 'redux-persist';
import authReducer, { UserState } from '../pages/SignIn/reducer'; // Ensure the correct path

export interface StreamCraftState {
    authReducer: UserState; // Ensure UserState is imported correctly
}

const rootReducer = combineReducers({
    authReducer // Combine reducers here
});

const persistConfig = {
    key: 'root', // The key for the persist
    storage, // The storage method (localStorage)
    whitelist: ['authReducer'] // Names of reducers you want to persist
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