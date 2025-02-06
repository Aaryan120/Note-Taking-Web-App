import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";


const initialState = {
    notes: localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [],
    loading: false,
    searchNote:'',
    sortOrder:'desc',
}


const noteSlice = createSlice({
    name:"note",
    initialState,
    reducers:{
        setNotes:(state,action) =>{
            state.notes = action.payload;
            localStorage.setItem("notes",JSON.stringify(state.notes));
        },
        setSearchNote:(state,action) =>{
            state.searchNote = action.payload;
        },
        setSortOrder:(state,action) =>{
            toast.success(action.payload === "asc" ? "Sorted in Oldest First" : "Sorted in Newest First");
            state.sortOrder = action.payload;
        },

    }
})


export const {
    setNotes,
    setSearchNote,
    setSortOrder
} = noteSlice.actions;

export default noteSlice.reducer




