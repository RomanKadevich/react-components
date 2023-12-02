import { createSlice } from "@reduxjs/toolkit";
import { IData } from "../../comonents/Form";

interface IState{
  value:IData;
}

const initialState:IState = {
  value: { Name: "",
    Age: 0,
    Email: "",
    Password: "",
    AnotherPassword:"",
    Gender: "",
    checkbox: false,},
};

const controlFormSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    updateValue(state, action) {
      state.value = action.payload
    },
  },
});

export const { updateValue } = controlFormSlice.actions;

export default controlFormSlice.reducer;
