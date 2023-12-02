import { createSlice } from "@reduxjs/toolkit";
interface IData {
  Name: string;
  Age: number;
  Email: string;
  Password: string;
  Gender: string;
  checkbox: boolean;
}
interface IState{
  value:IData;
}

const initialState:IState = {
  value: { Name: "",
    Age: 0,
    Email: "",
    Password: "",
    Gender: "",
    checkbox: false,},
};

const unControlFormSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    updateValue(state, action) {
      state.value = action.payload
    },
  },
});

export const { updateValue } = unControlFormSlice.actions;

export default unControlFormSlice.reducer;
