import { configureStore } from "@reduxjs/toolkit";
import loginReducer from '../pages/login/reducer'

// export interface StreamCraftState {
//     loginreducer: {
//         user : any,
//         token : any
//     };
// }

const store = configureStore({
    reducer: {
        loginReducer
      }
});

export default store;