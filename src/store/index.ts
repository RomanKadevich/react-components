import { configureStore } from "@reduxjs/toolkit";
import { animalsApi } from "./api/animals";
import { createWrapper } from "next-redux-wrapper";

export const makeStore = () =>
  configureStore({
    reducer: {
      [animalsApi.reducerPath]: animalsApi.reducer,
    },
    middleware: (gDM) => gDM().concat(animalsApi.middleware),
  });

  export type AppStore = ReturnType<typeof makeStore>;
  export type RootState = ReturnType<AppStore["getState"]>;
  export type AppDispatch = AppStore["dispatch"];
    export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
