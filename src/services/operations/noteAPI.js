import { noteEndPoints } from "../apis";
import { apiconnector } from "../apiconnector";
import toast from "react-hot-toast";
import { setNotes } from "../../slices/noteSlice";


const {
    CREATE_NOTE_API,
    DELETE_NOTE_API,
    GET_USER_NOTE_API,
    UPDATE_NOTE_API,
} = noteEndPoints



export const createNote = async (data,token,dispatch) =>{
    console.log("PRINTING DATA FROM INSIDE OF CREATE NOTE API CALL: ",data);
    try {
        
        const response = await apiconnector("POST",CREATE_NOTE_API,data,{
            "Content-Type" : "multipart/form-data",
            Authorization: `Bearer ${token}`
        })

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        dispatch(setNotes(response.data.data))
        toast.success("Note Created Successfully");
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    }
    return;
}

export const updateNote = async (data,token) =>{
    let result = null;
    try {
        const response = await apiconnector("POST",UPDATE_NOTE_API,data,{
            "Content-Type" : "multipart/form-data",
            Authorization: `Bearer ${token}`
        })


        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("Note Updated Successfully");
        result = response.data.data;
    } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
    }
    return result;
}

export const deleteNote = async (data,token) =>{
    try {
        const response = await apiconnector("POST",DELETE_NOTE_API,data,{
            Authorization: `Bearer ${token}`
        })

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        toast.success("Note Deleted Successfully");
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    }
}


export const getUserNote = async (token,navigate) =>{
    let result = [];
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiconnector("GET",GET_USER_NOTE_API,null,{
            Authorization:`Bearer ${token}`
        })

        if(!response.data.success){
            if(response.data.message === "Token is invalid"){
                navigate("/login");
            }
            throw new Error(response.data.message);
        }

        toast.success("All notes fetched successfully");
        result = response.data.data
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result
}
