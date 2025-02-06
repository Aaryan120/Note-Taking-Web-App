import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { getResetPasswordToken } from "../services/operations/authAPI";
import toast from "react-hot-toast";
const ForgotPassword = () =>{

    const {loading} = useSelector((state) =>state.auth);
    const [emailSent,setEmailSent] = useState(false);
    const [email,setEmail] = useState("");
    const dispatch = useDispatch()
    const handleOnSubmit = (event)=>{
        event.preventDefault();
        dispatch(getResetPasswordToken(email,setEmailSent))
    }
    
    return (
        <div className="flex flex-col h-screen bg-gradient-to-t from-purple-200 justify-center items-center max-w-maxContent text-richblack-300 mx-auto my-auto">
            {
                loading ?
                (null) :
                (
                    <div className="w-[350px] border  border-zinc-400 bg-white rounded-md p-5 shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)]">
                        <h1 className="text-richblack-5 text-3xl font-semibold mb-3">
                            {!emailSent ? "Reset your password" : "Check email"} 
                        </h1>

                        <p className="mt-2 font-medium text-md">
                            {!emailSent ? "Have no fear. We'll email you instructions to reset your password. if you dont have access to you account recovery" : `We have sent the reset email to ${email}`}
                        </p>

                        <form className="flex flex-col gap-y-4 mt-6" onSubmit={handleOnSubmit}>
                            {
                                !emailSent && (
                                    <label className="w-full">
                                        <p className="text-richblack-5 text-sm mb-2">Email Address<sup className="text-pink-200">*</sup></p>
                                        <input 
                                        placeholder="Enter Email Address"
                                        type="text"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="bg-richblack-800 rounded-md text-richblack-300 w-full p-2 shadow-[0px_2px] shadow-richblack-600"  />
                                    </label>
                                )
                            }
                            <button className="bg-purple-300 text-center text-base font-medium rounded-md text-richblack-900 p-2 my-2" type="submit">
                                    {!emailSent ? "Reset Password" : "Resend Email"}
                            </button>
                        </form>
                        <Link to={"/login"} className="w-[50%]">
                            <div className="flex flex-row w-fit items-center gap-2 px-2 text-richblack-5 text-sm mt-4">
                                <FaArrowLeftLong/>
                                Back to login
                            </div> 
                        </Link>
                        
                    </div>
                )

            }
        </div>
    )
}

export default ForgotPassword;