import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();
  return (
    <div className='bg-gradient-to-t h-screen from-purple-200 w-screen'>
        <div className='place-items-center pt-4'> 
            <h1 className='text-4xl font-bold'>
                Welcome to NoteMaster – Your Ultimate Smart Note-Taking Companion!
            </h1>
            <p className='text-2xl font-semibold mt-10'>
                🚀 Not just another note-taking app – it's a revolution in organization!
            </p>
            <p className='w-9/12 text-start mt-10 text-xl font-sans'>
            Say goodbye to boring, cluttered notes and hello to NoteMaster, the ultimate tool designed to make your note-taking smarter, faster, and more efficient than ever. Whether you're jotting down quick ideas, saving voice notes, organizing to-dos, or capturing images for reference, NoteMaster has got you covered!
            </p>
            <p className='mt-8 text-3xl font-semibold'>✨ Why settle for basic when you can have more?</p>
            <div className='text-lg font-medium mt-4 ml-16'>
                <p>✔ Text, Voice & Image Notes – Type, speak, or snap your thoughts into a note effortlessly.</p>
                <p>✔ Smart Search & Categorization – Find anything in seconds with AI-powered organization.</p>
                <p>✔ Cloud Sync – Access your notes anywhere, anytime, on any device.</p>
                <p>✔ Dark Mode & Custom Themes – Personalize your workspace to match your style.</p>
                <p>✔ Collaboration & Sharing – Work together with seamless note sharing and real-time updates.</p>
            </div>
            <p className='mt-10 font-semibold font-sans text-xl'>Your ideas deserve more than just a blank page. Upgrade your note-taking game with NoteMaster today! ✨💡</p>
            <div className='flex gap-16 mt-5 h-[100px]'>
                <button 
                onClick={() =>{
                    navigate("/login")
                }}
                className='text-2xl font-medium border rounded-md hover:text-2xl border-purple-700 px-[12px] py-[8px] hover:px-[20px] hover:py-[12px] transition-all duration-200 h-fit hover:bg-purple-500'>
                    Login
                </button>
                <button 
                onClick={() =>{
                    navigate("/signup")
                }}
                className='text-2xl font-medium border rounded-md hover:text-2xl border-purple-700 px-[12px] py-[8px] hover:px-[20px] hover:py-[12px] transition-all duration-200 h-fit hover:bg-purple-500'>
                    Sign Up
                </button>
            </div>
            

        </div>


    </div>
  )
}

export default Home