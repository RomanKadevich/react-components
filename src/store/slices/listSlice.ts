import { createSlice } from "@reduxjs/toolkit";
import { IAppState } from "../../types/types";



const initialState:Pick<IAppState, "data"> ={
    data:[]
}


 const listSlice=createSlice({
    name: 'list',
    initialState,
    reducers:{
        updateList(state, action){
                state.data = action.payload.list
        }
    }
})


export const {updateList} = listSlice.actions;


export default listSlice.reducer


