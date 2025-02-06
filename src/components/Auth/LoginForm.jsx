import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../services/operations/authAPI';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
    const [formData,setFormData] = useState({
        email:'',
        password:'',
    })
    const [showPassword,setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = (event) =>{
        setFormData((prev) =>({
            ...prev,
            [event.target.name] : event.target.value,
        }))
    }
    const handleSubmit = (event) =>{
        event.preventDefault();
        dispatch(login({
            email:formData.email,
            password:formData.password
        },navigate))
    }
  return (
    <div>
        <form onSubmit={handleSubmit} className='mt-2'>
            <div>
                <label className='mt-2'>
                    <p>Email <sup className='text-pink-500'>*</sup></p>
                    <input 
                    required
                    type="text" 
                    name="email" 
                    value={formData.email} 
                    className='focus:outline-none border border-zinc-200 rounded-md p-2 '
                    onChange={(event) => handleChange(event)}/>
                </label>
                <label className='relative mt-2'>
                    <p>Password <sup className='text-pink-500'>*</sup></p>
                    <input 
                    required
                    type={`${showPassword ? "text" : "password"}`} 
                    name="password" 
                    value={formData.password} 
                    className='focus:outline-none border border-zinc-200 rounded-md p-2 '
                    onChange={(event) => handleChange(event)}/>
                    
                    <p onClick={() =>setShowPassword(!showPassword)}
                    className='transition duration-100 absolute top-[80%] right-3 cursor-pointer'>
                        {
                            showPassword ? <FaEye/> : <FaEyeSlash/>
                        }
                    </p>
                </label>
            </div>
            
            <button type='submit'
            className='place-items-center w-full border border-purple-500 mt-4  rounded-md px-[12px] py-[8px] hover:bg-purple-300'>
                Sign In
            </button>
        </form>
        <div className='text-blue-300 text-center mt-2 cursor-pointer'
        onClick={() =>{
            navigate("/forgot-password")
        }}>
            <p>Forgot password?</p>
        </div>
    </div>
  )
}

export default LoginForm