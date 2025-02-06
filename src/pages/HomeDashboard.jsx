import React from 'react'
import Navbar from '../components/Dashboard/Navbar'
import NoteList from '../components/Note/NoteList'

const HomeDashboard = () => {
  return (
    <div>
        <Navbar/>
        <NoteList onFavorite={false}/>
    </div>
  )
}

export default HomeDashboard