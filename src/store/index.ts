import { configureStore } from "@reduxjs/toolkit";
import controlFormSlice from "./slices/controlFormSlice";

import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import unControlFormSlice from "./slices/unControlFormSlice";



const store = configureStore({
  reducer: {
    unControlFormData: controlFormSlice,
    ControlFormData: unControlFormSlice,
  },})

  export type RootState = ReturnType<typeof store.getState>
  export type AppDispatch = typeof store.dispatch
  export const useAppDispatch: () => AppDispatch = useDispatch
  export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default store;
