import react from "react";
import { useSelector } from "react-redux";
import OTPInput from "react-otp-input";
import { useState } from "react";
import { FaArrowLeftLong, FaClockRotateLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signUp } from "../services/operations/authAPI";
import { useDispatch } from "react-redux";
import { useEffect } from "react";


const VerifyEmail = () =>{
    const navigate = useNavigate();
    const {signUpData,loading} = useSelector((state) =>state.auth);
    const [otp,setOtp] = useState()
    const dispatch = useDispatch();
    // console.log("PRINTING SIGNUP DATA",signUpData);
    useEffect(() =>{
        if(!signUpData){
            navigate("/signup");
        }
    },[])
    
    const handleOnSubmit = (event) =>{
        event.preventDefault();
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = signUpData;
        dispatch(signUp(firstName,lastName,email,password,confirmPassword,otp,navigate));
    }
    return(
        <div className="flex flex-col h-screen bg-gradient-to-t from-purple-200 justify-center items-center max-w-maxContent text-richblack-300 mx-auto my-auto">
            {
                loading ? 
                (<div className="spinner"></div>) :
                (
                    <div className="w-[350px] border  border-zinc-400 bg-white rounded-md p-5 shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)]">
                        <h1 className="text-richblack-5 text-3xl font-semibold mb-3">Verify email</h1>
                        <p className="mt-2 font-medium text-md">A verification code has been sent to you. Enter the code below</p>
                        <form className="flex flex-col gap-y-4 mt-6" onSubmit={handleOnSubmit}>
                            <OTPInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderInput={(props) => <input {...props} 
                                style={{
                                    width: '40px',
                                    height: '40px'

                                }}
                                placeholder="-"
                                className="bg-richblack-800 rounded-md text-richblack-300 w-full p-2 shadow-[0px_2px] shadow-richblack-600" />}
                            />

                            <button type="submit" className="bg-purple-300 text-center text-base font-medium rounded-md text-richblack-900 p-2 my-2">
                                Verify email
                            </button>
                        </form>
                        <div className="flex flex-row justify-between items-center px-2">
                            <Link to={"/signup"} className="flex flex-row items-center gap-2 text-richblack-5 text-sm mt-2">
                                <FaArrowLeftLong/>
                                Back to Signup
                            </Link>

                            <button onClick={() => dispatch(sendOtp(signUpData.email,navigate))} className="flex flex-row items-center gap-2 text-sm mt-2 text-blue-400">
                                <FaClockRotateLeft />
                                Resend it
                            </button>

                        </div>
                        
                    </div>
                )
            }
        </div>
    )
}

export default VerifyEmail;