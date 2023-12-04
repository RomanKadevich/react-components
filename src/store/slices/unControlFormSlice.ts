import { createSlice } from "@reduxjs/toolkit";
import { IData } from "../../types/constants";

interface IState {
  value: IData[];
}

const initialState: IState = {
  value: [],
};

const unControlFormSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    updateValueOfUncontr(state, action) {
      state.value.push(action.payload);
    },
  },
});

export const { updateValueOfUncontr } = unControlFormSlice.actions;

export default unControlFormSlice.reducer;
