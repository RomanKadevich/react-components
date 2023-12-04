import { createSlice } from "@reduxjs/toolkit";
import { IData } from "../../types/constants";

interface IState {
  value: IData[];
}

const initialState: IState = {
  value: [],
};

const controlFormSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    updateValueOfCont(state, action) {
      state.value.push(action.payload);
    },
  },
});

export const { updateValueOfCont } = controlFormSlice.actions;

export default controlFormSlice.reducer;
