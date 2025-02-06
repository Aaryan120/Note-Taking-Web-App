import { profileEndPoints } from "../apis"
import { apiconnector } from "../apiconnector"
import toast from "react-hot-toast";

const {
    GET_USER_DETAILS_API,
} = profileEndPoints;


export const getUserDetails = async (token) =>{
    let result = null;
    try {
        const response = await apiconnector("GET",GET_USER_DETAILS_API,null,{
            Authorization:`Bearer ${token}`
        })
        

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        toast.success("User Details Fetched Successfully");
        result = response.data.data;
    } catch (error) {
        console.log("GET USER DETAILS API ERROR",error);
        toast.error(error.response.data.message);
    }
    return result;
}