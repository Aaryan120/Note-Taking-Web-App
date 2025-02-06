import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSignUpData } from '../../slices/authSlice';
import { sendOtp } from '../../services/operations/authAPI';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const SignUpForm = () => {
    const [formData,setFormData] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        confirmPassword:'',
    });
    const [showPassword,setShowPassword] = useState(false)
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const changeHandler = (event) =>{
        setFormData((prev) => ({
            ...prev,
            [event.target.name] :event.target.value,
        }))
    }
    const submitHandler =(event) =>{
        
        event.preventDefault();
        if(formData.password !== formData.confirmPassword){
            toast.error("Password and Confirm password do not match");
            return;
        }
        
        dispatch(setSignUpData(formData));
        
        dispatch(sendOtp(formData.email,navigate));


        setFormData({
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            confirmPassword:'',
        })
    }
  return (
    <div >
        <form onSubmit={(event) => submitHandler(event)} className='mt-2'>
            <div className='space-y-1'>
                 <label>
                    <p className=''>First Name <sup className='text-pink-500'>*</sup></p>
                    <input 
                    required
                    type="text" 
                    name='firstName' 
                    value={formData.firstName} 
                    className='focus:outline-none border border-zinc-200 rounded-md p-2 '
                    onChange={(event) => changeHandler(event)}/>   
                </label>
                <label>
                    <p>Last Name <sup className='text-pink-500'>*</sup></p>
                    <input 
                    required
                    type="text" 
                    name='lastName' 
                    value={formData.lastName} 
                    className='focus:outline-none border border-zinc-200 rounded-md p-2 '
                    onChange={(event) => changeHandler(event)}/>   
                </label>
            </div>
            <div>
                <label className='mt-1'>
                    <p>Email <sup className='text-pink-500'>*</sup></p>
                    <input 
                    required
                    type="text" 
                    name='email' 
                    className='focus:outline-none border border-zinc-200 rounded-md p-2 '
                    value={formData.email} 
                    onChange={(event) => changeHandler(event)}/>   
                    
                    
                </label>
            </div>
            <div>
                <label className='relative mt-1'>
                    <p>Password <sup className='text-pink-500'>*</sup></p>
                    <input 
                    required
                    type={showPassword ? "text" : "password"}
                    name='password' 
                    className='focus:outline-none border border-zinc-200 rounded-md p-2 '
                    value={formData.password} 
                    onChange={(event) => changeHandler(event)}/>   
                    <p
                    className='absolute top-[65%] right-2 cursor-pointer'
                    onClick={() =>setShowPassword(!showPassword)}>
                        {
                            showPassword ? <FaEye/> : <FaEyeSlash/>
                        }
                    </p>
                </label>
                <label className='relative mt-1'>
                    <p>Confirm Password <sup className='text-pink-500'>*</sup></p>
                    <input 
                    required
                    type={showConfirmPassword ? "text" : "password"}
                    name='confirmPassword' 
                    value={formData.confirmPassword} 
                    className='focus:outline-none border border-zinc-200 rounded-md p-2 '
                    onChange={(event) => changeHandler(event)}/>   
                    <p
                    className='absolute top-[80%] right-2 cursor-pointer'
                    onClick={() =>setShowConfirmPassword(!showConfirmPassword)}>
                        {
                            showConfirmPassword ? <FaEye/> : <FaEyeSlash/>
                        }
                    </p>
                </label>
            </div>
            <button type='submit'
            className='place-items-center w-full border border-purple-500 mt-2  rounded-md px-[12px] py-[8px] hover:bg-purple-300'>
                Sign Up
            </button>
           
        </form>
    </div>
  )
}

export default SignUpForm