import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import noteReducer from "../slices/noteSlice";
import userReducer from "../slices/userSlice"

const rootReducer = combineReducers({
    auth:authReducer,
    note:noteReducer,
    user:userReducer,
})

export default rootReducer