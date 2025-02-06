import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BiSolidHomeAlt2 } from "react-icons/bi";
import { CiLogout, CiStar } from "react-icons/ci";
import { FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowDown } from 'react-icons/io';
import { logout } from '../../services/operations/authAPI';


const Sidebar = () => {
    const location = useLocation();
    const pathName = location.pathname.split('/')[2];
    // console.log(pathName);
    const {user} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [dropDown,setDropDown] = useState(false);

  return (
    <div className='h-screen overflow-hidden border-r'>
        <div className="w-64 bg-white shadow-md h-[100%]">
        <div className='flex flex-col justify-between h-full'>
            <div>
                <div className="p-4 border-b">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">AI</span>
                        </div>
                        <h1 className="text-xl font-semibold">AI Notes</h1>
                    </div>
                </div>
                <nav className="p-4">
                    <Link
                        to="/dashboard/home"
                        className={`flex items-center space-x-2 p-2 rounded-lg ${pathName === "home" ? "bg-purple-200 text-purple-500" : "bg-white"} text-gray-700 mb-2`}
                    >
                        <BiSolidHomeAlt2 className="w-5 h-5" />
                        <span>Home</span>
                    </Link>
                    <Link
                        to="/dashboard/favorite"
                        className={`flex items-center space-x-2 p-2 rounded-lg ${pathName === "favorite" ? "bg-purple-200 text-purple-500" : "bg-white"} text-gray-700 mb-2`}
                    >
                        <FaStar className="w-5 h-5" />
                        <span>Favourites</span>
                    </Link>
                </nav>
            </div>  
            
            <div className='flex justify-evenly items-center mb-5 p-2 mx-2 border border-zinc-600/40 rounded-lg'>
                <div>
                    <img src={`${user.imageUrl}`} alt="userImage" className='h-[30px] w-[30px] rounded-full aspect-square object-contain'/>
                </div>
                <p>
                    {user.firstName}{" "}{user.lastName}
                </p>
                <div className="relative transition-all ease-linear duration-200"
                onClick={() => setDropDown(!dropDown)}>
                    <IoIosArrowDown className={`cursor-pointer ${dropDown ? "rotate-180" : "rotate-0"}`}/>
                    {
                        dropDown ? 
                        (
                            <div className='absolute border border-black/40 bg-white rounded-xl z-[1500] -top-[70px] w-fit text-nowrap px-5 py-3 -right-5 transition-all duration-200 ease-linear'>
                                <div className='absolute h-6 w-6 top-[38px] right-4 rotate-45 border-r border-b border-black/40 bg-white z-[1000] '></div>
                                <button onClick={() => dispatch(logout(navigate))}
                                    className='flex items-center gap-x-2'>
                                    <CiLogout />
                                    <p>Log Out</p>
                                </button>
                                
                            </div>
                        ) :
                        (
                            null
                        )
                    }
                </div>
            </div>
            
        </div>
        
      </div>
    </div>
  )
}

export default Sidebar