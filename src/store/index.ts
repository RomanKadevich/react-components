import { configureStore } from "@reduxjs/toolkit";
import listReducer from "./slices/listSlice";

const store = configureStore({
    reducer:{
        list:listReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;

export default store;