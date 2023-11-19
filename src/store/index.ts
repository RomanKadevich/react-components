import { configureStore } from "@reduxjs/toolkit";
import searchValueSlice from "./slices/searchValueSlice";
import { animalsApi } from "./api/animals";

const store = configureStore({
  reducer: {
    [animalsApi.reducerPath]: animalsApi.reducer,
    value: searchValueSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(animalsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
