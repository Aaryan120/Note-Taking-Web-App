import React, { useRef, useState } from 'react'
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import NoteModal from "./NoteModal"
import { FaEdit, FaRegCopy, FaRegEnvelopeOpen, FaStar } from 'react-icons/fa';
import { deleteNote, updateNote } from '../../services/operations/noteAPI';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { RiDeleteBin6Line } from 'react-icons/ri';
import ViewNoteModal from './ViewNoteModal';
import { CiStar } from 'react-icons/ci';

const NoteCard = ({note}) => {
  const [dropDown,setDropDown] = useState(false);
  const [modalData,setModalData] = useState(false);
  const [onDelete,setOnDelete] = useState(false) ;
  const ref = useRef();
  const [openModal,setOpenModal] = useState(false);
  useOnClickOutside(ref,() => setDropDown(false));
  const {token} = useSelector((state) => state.auth);
  const [copied,setCopied] = useState(false)
  const [openNoteModal,setOpenModalData] = useState(false);

  const copyNoteToClipboard = () => {
    const textToCopy = `Title: ${note.title}\nDescription: ${note.description}`;
    
    // Modern Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          setCopied(true);
          // Clear the feedback message after 2 seconds
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => {
          console.error('Failed to copy text: ', err);
        });
    } else {
      // Fallback for older browsers using a temporary textarea element
      const textarea = document.createElement('textarea');
      textarea.value = textToCopy;
      // Prevent scrolling to bottom
      textarea.style.top = "0";
      textarea.style.left = "0";
      textarea.style.position = "fixed";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Fallback: Unable to copy', err);
      }
      document.body.removeChild(textarea);
    }
    toast.success("Copied to Clipboard")
  };


  return (
    <div >
      <div className='border rounded-md p-5 flex flex-col justify-between w-[250px] h-[250px]'>
        <div>
          <div>
            <p>created at: {note.noteCreatedAt.split('T')[0]}</p>
            <p className='text-md font-bold'>
              {note.title}
            </p>
            <p>
              {
                note.description.length > 30 ? `${note.description.substring(0,100)}...` : `${note.description}`
              }
            </p>
            <div className='flex gap-2 '>
              {
                note?.noteImages && (
                  note.noteImages.map((image,index) =>{
                    return (
                      <img src={image} alt='noteImage' className='boder border-zinc-400 h-[50px] w-[50px] object-cover'>
                      </img>
                    )
                  })
                )
              }
            </div>
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <button
          className={`rounded-full border p-2 ${note.isFavorite === true ? "bg-purple-300" : "bg-gray-200"}`}
          onClick={() =>{
            updateNote({noteId:note._id,isFavorite:!note.isFavorite},token);
            window.location.reload(false)
          }}>
            <FaStar className={`${note.isFavorite === true ? "text-purple-600" : "text-gray-400"}`}/>
          </button>
          <div className='relative flex gap-2 justify-end items-center'>
            <button
            onClick={() =>{
              copyNoteToClipboard()
            }}>
            <FaRegCopy />
            </button>
            <div
            ref={ref}>
              <button
              onClick={() =>{
                setDropDown(!dropDown)
              }}
              >
                <HiOutlineDotsHorizontal />
              </button>
              {
                dropDown && (
                  <div className='border rounded-md absolute z-[1000] shadow-[0_3px_10px_rgb(0,0,0,0.2)] text-nowrap -right-14 top-7 bg-white'>
                    <div className='flex flex-col p-4 gap-2'>
                      <button
                      className='flex items-center gap-2 border-b border-zinc-300 pb-2'
                      onClick={() => {
                        setOpenModalData(true)
                        setDropDown(false)
                      }}>
                      <FaRegEnvelopeOpen />
                      <p>Open Note</p>
                      </button>
                      <button
                      className='flex items-center gap-2 border-b border-zinc-300 pb-2'
                      onClick={() =>{
                        setModalData(true);
                        setDropDown(false);
                      }}>
                        <FaEdit/>
                        <p>Edit Note</p>
                      </button>
                      <button
                      className='flex items-center gap-2'
                      onClick={() =>{
                        deleteNote({noteId:note._id},token);
                        window.location.reload(false)
                        setDropDown(false)
                      }}>
                        <RiDeleteBin6Line/>
                        <p>Delete Note</p>
                      </button>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
        
      </div>
      {
        modalData && <NoteModal editForm={note} setModalData={setModalData}/>
      }
      {
        openNoteModal && <ViewNoteModal note={note} setOpenModalData={setOpenModalData}/>
      }
    </div>
  )
}

export default NoteCard