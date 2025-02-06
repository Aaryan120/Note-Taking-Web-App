import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchNote, setSortOrder } from '../../slices/noteSlice';
import { FaSortAlphaDown, FaSortAlphaDownAlt } from 'react-icons/fa';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { FaPlus } from 'react-icons/fa6';
import NoteModal from '../Note/NoteModal';

const Navbar = () => {
    const {searchNote,sortOrder} = useSelector((state) => state.note);
    const dispatch = useDispatch();
    const [modalData,setModalData] = useState(false);
    return(
        <div className='p-3 border-b-2 border-zinc-400/20 '>
            <div className='flex  justify-between'>
                <div className='flex gap-2 items-center text-zinc-400/70 w-[40%] border border-zinc-400/70 rounded-s-full rounded-e-full focus:outline-none px-[12px] py-[8px]'>
                    <p><HiMagnifyingGlass /></p>
                    <input
                    type='text'
                    value={searchNote}
                    onChange={(event) =>{
                        dispatch(setSearchNote(event.target.value));
                    }}
                    placeholder='Search Note . . .'
                    className=' w-full focus:outline-none text-black'
                    >
                    </input>
                </div>
                <div className='flex gap-2 '>
                    <button className='flex gap-2 items-center justify-center border rounded-s-full rounded-e-full px-[12px] py-[8px] bg-zinc-400/30'
                        onClick={() =>{
                            dispatch(setSortOrder(sortOrder === "asc" ? "desc" : "asc"))
                        }}>

                            <p>sort</p>
                            {
                                sortOrder === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaDownAlt/>
                            }
                    </button>
                    <button 
                    onClick={() =>{
                        setModalData(true);
                    }}
                    className='flex items-center gap-2 border rounded-md bg-purple-600 border-purple-900 text-white px-[12px] py-[8px]'>
                        <FaPlus/>
                        <p>Create Note </p>
                    </button>
                </div>
            </div>
            {
                modalData && <NoteModal  editForm={null} setModalData={setModalData}/>
            }
        </div>
    )
    
}

export default Navbar