import { configureStore } from "@reduxjs/toolkit";
import searchValueSlice from "./slices/searchValueSlice";

const store = configureStore({
  reducer: {
    value: searchValueSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
