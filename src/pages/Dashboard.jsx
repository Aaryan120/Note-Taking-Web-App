import React from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux'
import Sidebar from '../components/Dashboard/Sidebar';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Dashboard/Navbar';

const Dashboard = () => {

    const {loading:userLoading} = useSelector((state) => state.auth);

    if(userLoading){
        return toast.loading("Loading...")
    }

  return (
    <div className='relative flex h-screen'>
        <Sidebar/>
        <div className='flex-1 overflow-auto'>
            <div>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard