import react from "react";
// import { RxCrossCircled } from "react-icons/rx";
// import { RxCheckCircled } from "react-icons/rx";
import { useState } from "react";
import { resetPassword } from "../services/operations/authAPI";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {IoEyeSharp,IoEyeOffSharp} from "react-icons/io5"
import { useDispatch } from "react-redux";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";



const UpdatePassword = () =>{
    const [formData,setFormData] = useState({
        newPassword:"",
        confirmPassword:"",
    });
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);
    const {loading} = useSelector((state) => state.auth)
    const location = useLocation();
    const dispatch = useDispatch()
    function changeHandler(event){
        setFormData((prevData) =>({
            ...prevData,
            [event.target.name] : event.target.value,
        }))
    }
    const {newPassword,confirmPassword} = formData;
    const handleOnSubmit = (event)=>{
        event.preventDefault();
        if(newPassword !== confirmPassword){
            toast.error("The passwords must match");
            return;
        }
        const token = location.pathname.split('/').at(-1);

        dispatch(resetPassword(newPassword,confirmPassword,token))
    }
    return (
        <div className="flex flex-col h-screen bg-gradient-to-t from-purple-200 justify-center items-center max-w-maxContent text-richblack-300 mx-auto my-auto">
            {
                loading ? 
                (null) :
                (
                    <div className="w-[350px] border  border-zinc-400 bg-white rounded-md p-5 shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)]">
                        <h1 className="text-richblack-5 text-3xl font-semibold mb-3">Choose new password</h1>
                        <p className="mt-2 font-medium text-md">Almost done. Enter your new password and you're all set</p>
        
                        <form className="flex flex-col gap-y-4 mt-6" onSubmit={handleOnSubmit}>
                            <label className="w-full relative">
                                <p className="text-richblack-5 text-sm mb-2">New password <sup className="text-pink-200">*</sup></p>
                                <input 
                                type= {showPassword ?
                                    ("text") :
                                    ("password")}
                                value={newPassword}
                                placeholder="Enter new password"
                                name="newPassword"
                                onChange={changeHandler}
                                className="bg-richblack-800 rounded-md text-richblack-300 w-full p-2 shadow-[0px_2px] shadow-richblack-600"
                                />
                                <span className="absolute top-10 right-3"onClick={() => setShowPassword(!showPassword)}>{showPassword ? <IoEyeSharp/> : <IoEyeOffSharp/>}</span>
                            </label>
                            <label className="w-full relative">
                                <p className="text-richblack-5 text-sm mb-2">Confirm new password <sup className="text-pink-200">*</sup></p>
                                <input 
                                type={showConfirmPassword ?
                                    ("text") :
                                    ("password")}
                                value={confirmPassword}
                                placeholder="Enter confirm password"
                                name="confirmPassword"
                                onChange={changeHandler}
                                className="bg-richblack-800 rounded-md text-richblack-300 w-full p-2 shadow-[0px_2px] shadow-richblack-600"
                                />
                                <span className="absolute top-10 right-3"onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <IoEyeSharp/> : <IoEyeOffSharp/>}</span>
                            </label>
                            {/* <div className="grid-cols-2">
        
                            </div> */}
        
                            <button className="bg-purple-300 text-center text-base font-medium rounded-md text-richblack-900 p-2 my-2" type="submit">
                                Reset Password  
                            </button>
                            <Link to={"/login"}>
                                <div className="flex flex-row items-center gap-2 text-richblack-5 text-sm mt-2 px-2">
                                    <FaArrowLeftLong/>
                                    Back to login
                                </div> 
                            </Link>
                        </form>
                    </div>
                )
            }
            
        </div>
    )
}

export default UpdatePassword;