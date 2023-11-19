import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

const searchValueSlice = createSlice({
  name: "searchValue",
  initialState,
  reducers: {
    updateValue(state, action) {
      state.value = action.payload.searchValue;
      console.log(state);
      console.log(action);
    },
  },
});

export const { updateValue } = searchValueSlice.actions;

export default searchValueSlice.reducer;
