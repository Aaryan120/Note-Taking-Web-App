import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getUserNote } from '../../services/operations/noteAPI';
import toast from 'react-hot-toast';
import NoteCard from "./NoteCard"
import { useNavigate } from 'react-router-dom';
const NoteList = ({onFavorite}) => {
  const [notes,setNotes] = useState([]);
  const {token} = useSelector((state) => state.auth)
  const {sortOrder,searchNote} = useSelector((state) => state.note);
  // const [selectedNotes,setSelectedNotes] = useState(null);
  const navigate = useNavigate()
  useEffect(() =>{
    const fetchNotes = async () =>{
      const response = await getUserNote(token,navigate);
      if(!response){
        toast.error("Could not get notes");
      }
      console.log(response);
      setNotes(response.notes)
    }
    fetchNotes()
  },[token])

  let filteredNotes = searchNote ? notes.filter((note) => 
    note.description.toLowerCase().includes(searchNote.toLowerCase()) ||
    note.title.toLowerCase().includes(searchNote.toLowerCase())) : notes;
  if(filteredNotes && onFavorite){
    filteredNotes = filteredNotes.filter((note) => note.isFavorite === true);
  }
  if(filteredNotes && sortOrder){
    filteredNotes = sortOrder === "asc" ?
    filteredNotes.sort((a,b) => new Date(a.noteCreatedAt) - new Date(b.noteCreatedAt)) :
    filteredNotes.sort((a,b) => new Date(b.noteCreatedAt) - new Date(a.noteCreatedAt));
  }
  // console.log(filteredNotes);
  console.log("PRINTING SORT ORDER: ",sortOrder);
  return (
    <div className='p-5'>
      <div className='mb-14'>
        <p className='text-3xl font-bold'>
          {
            onFavorite ? "Your Favorite Notes" : "Your Notes"
          }
        </p>
      </div>
      <div className='grid grid-cols-3 lg:grid-cols-4 gap-3 w-full overflox-y-auto'>
        {
          filteredNotes.map((note)=>{
            return (
              <NoteCard note={note} key={note._id}/>
            )
          })
        }
      </div>
    </div>
  )
}

export default NoteList 