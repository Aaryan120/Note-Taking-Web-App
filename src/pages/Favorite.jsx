import React from 'react'
import Navbar from '../components/Dashboard/Navbar'
import NoteList from '../components/Note/NoteList'


const Favorite = () => {
  return (
    <div>
        <Navbar/>
        <NoteList onFavorite={true}/>
    </div>
  )
}

export default Favorite