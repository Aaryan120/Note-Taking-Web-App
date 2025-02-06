import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineFullscreenExit } from 'react-icons/ai';
import { BsArrowsFullscreen } from 'react-icons/bs';
import { FaEdit, FaRegCopy } from 'react-icons/fa';
import { RxCross1 } from 'react-icons/rx';
import { updateNote } from '../../services/operations/noteAPI';
import { useSelector } from 'react-redux';
import { CiStar } from 'react-icons/ci';
import NoteModal from './NoteModal';

const ViewNoteModal = ({note,setOpenModalData}) => {
    const [modalData,setModalData] = useState(false);
    const [screenSize,setScreenSize] = useState(false);
    const [copied,setCopied] = useState(false);

    const {token} = useSelector((state) => state.auth);


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
    <div>
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className={`flex flex-col justify-between w-full  ${screenSize ? "w-11/12 max-w-maxContent  mx-auto h-[90%]" : "h-[500px] max-w-[650px] overflow-y-scroll"} rounded-lg border border-zinc-600 bg-white p-6`}>
                <div>
                    <div className='flex justify-between p-2 items-center'>
                        <button
                        className='rounded-md border border-gray-300 p-2'
                        onClick={() =>
                            setScreenSize(!screenSize)
                        }>
                            {
                                screenSize ? 
                                <BsArrowsFullscreen /> : <AiOutlineFullscreenExit/>
                            }
                        </button>
                        <div className='flex gap-4'>
                            <button
                            className={`rounded-full border p-2 ${note.isFavorite === true ? "bg-purple-300" : "bg-gray-200"}`}
                            onClick={() =>{
                            updateNote({noteId:note._id,isFavorite:!note.isFavorite},token);
                            window.location.reload(false)
                            }}>
                                <CiStar/>
                            </button>
                            <button
                            onClick={() =>{
                                copyNoteToClipboard()
                            }}>
                                <FaRegCopy />
                            </button>
                            <button onClick={() =>{
                                setOpenModalData(false);
                            }}>
                                <RxCross1/>
                            </button>
                        </div>
                    </div>
                    <div className='mt-6 space-y-2'>
                        <div className='flex items-center gap-2'>
                            <p className='text-3xl font-semibold'>
                                {
                                    note.title
                                }
                            </p>
                        
                        </div>
                        <p className='text-gray-400'>
                        Created At: {note.noteCreatedAt.split('T')[0]}
                        </p>
                        {/* audio player here */}
                        {note.audioUrl && (
                                <div className="mt-4">
                                    <p className='text-lg font-medium'>Audio Note:</p>
                                    <audio controls className="w-full">
                                        <source src={note.audioUrl} type="audio/mp3" />
                                        Your browser does not support the audio element.
                                    </audio>
                                </div>
                            )}
                        <div>
                            <p className='text-gray-600 mt-4 mb-1'>
                                Description: 
                            </p>
                            <p className='text-xl'>
                                {
                                    note.description
                                }
                            </p>
                        </div>
                        <div className={`${screenSize ? "grid-cols-5" : "grid-cols-3"} gap-3 grid w-full`}>
                            {note?.noteImages && note.noteImages.map((imgObj, index) => (
                                <div key={index} className="relative">
                                    <img
                                    src={imgObj}
                                    alt={`Upload Preview ${index}`}
                                    className="w-40 h-40 object-contain rounded-md border"
                                    />
                                </div>
                            ))}
                        </div>
                        
                    </div>
                </div>
                
                <div className='flex justify-end'>
                    <button
                    className='flex items-center gap-2 rounded-md px-[12px] py-[8px] text-white border bg-purple-500 '
                    onClick={() =>{
                    setModalData(true);
                    }}>
                    <FaEdit/>
                    <p>Edit Note</p>
                    </button>
                </div>
                
            </div>
        </div>
        {
            modalData && <NoteModal editForm={note} setModalData={setModalData}/>
        }
    </div>
  )
}

export default ViewNoteModal