import React from 'react'
import { useSelector } from 'react-redux'
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { useNavigate } from 'react-router-dom';
import {motion} from "framer-motion"
const Template = ({formType}) => {
    const {loading} = useSelector((state) => state.auth);
    const navigate = useNavigate();
  return (
    <div className='mx-auto max-w-maxContent place-items-center transition-all duration-200 overflow-x-hidden'>
            <motion.div
                key={formType} // Helps Framer Motion detect changes
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 1, x: -50 }}
                transition={{ duration: 0.5, ease: 'linear' }}
                className={`flex ${formType ==="login" ? "flex-row" : "flex-row-reverse"} shadow-[0_3px_10px_rgb(0,0,0,0.2)] items-center justify-items-center border border-zinc-400 rounded-md h-[500px] w-[800px] mt-20`}
            >
                {formType === "login" ? (
                    <>
                        <div className='flex w-[70%] flex-col h-[70%] justify-center place-items-center'>
                            <p className='text-xl font-normal'>Sign In</p>
                            <LoginForm />
                        </div>
                        <div className='place-items-center w-[100%] bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 h-[100%] '>
                            <div className='place-items-center flex flex-col justify-center h-[100%] gap-3 text-white'>
                                <p className='text-2xl font-semibold'>Welcome to login</p>
                                <p className='text-xl font-normal'>Don't have an account?</p>
                                <button
                                    onClick={() => navigate("/signup")}
                                    className='border-white border rounded-s-full rounded-e-full px-[12px] py-[8px] hover:bg-white hover:text-black transition-all duration-300'
                                >
                                    Sign up
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='flex w-[70%] flex-col h-[70%] justify-center place-items-center'>
                            <p className='text-xl font-normal'>Sign Up</p>
                            <SignUpForm />
                        </div>
                        <div className='place-items-center w-[100%] bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 h-[100%] '>
                            <div className='place-items-center flex flex-col justify-center h-[100%] gap-3 text-white'>
                                <p className='text-2xl font-semibold'>Welcome to Sign up</p>
                                <p className='text-xl font-normal'>Already have an account?</p>
                                <button
                                    onClick={() => navigate("/login")}
                                    className='border-white border rounded-s-full rounded-e-full px-[12px] py-[8px] hover:bg-white hover:text-black transition-all duration-300'
                                >
                                    Sign In
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </motion.div>
        </div>
  )
}

export default Template