import React from 'react'
import Note from '../Note/Note.js';
import './NoteContainer.css';

export default function NoteContainer(props) {
  return (
    <div className='note-container'>
      <h2>Notes</h2>
      <div className='note-container_notes custom-scroll'>
        {
          props.notes.length>0 ? props.notes.map((item)=> <Note key={item.id} note={item} deleteNote={props.deleteNote} updateText={props.updateText}/>) : <h3 className='message'>No Notes Present</h3>
        }
      </div>
    </div>
  )
}
