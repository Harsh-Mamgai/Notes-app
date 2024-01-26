import React, { useEffect, useState } from 'react';
import './App.css';
import NoteContainer from './Components/NoteContainer/NoteContainer.js';
import Sidebar from './Components/Sidebar/Sidebar.js'

function App() {
  //initially no data in local storage then notes array is empty. when there are changes made in notes array changed array stores in localStorage and then localStorage mein jo json string hogi usse notes-app key ki value leke object mein convert karenge parse method se then notes ko array denge localStorage se uthake jo saved tha localStorage mein. so refresh karne par notes saved rahenge as woh localStorage mein save ho gaye honge.
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes-app")) || []);
  const addNote = (color)=>{
    //creates copy of array notes in tempNotes original notes array will not get affected when changing the tempNotes array as it is copy. we did not did tempNotes = notes because array in js is referential so tempNotes will have address of notes it will point to notes array and if we do changes in tempNotes then that changes will also be reflected in notes array as in that case address will be used. 
    const tempNotes = [...notes];//copy of array
    tempNotes.unshift({
      id: Date.now() + "" + Math.floor(Math.random()*78),
      text: "",
      time: Date.now(),
      color: color
    });
    setNotes(tempNotes);
  }
  const deleteNote = (id)=>{
    const tempNotes = [...notes];//making copy of array
    const index = tempNotes.findIndex(item=> item.id === id);//returns the index of array which satisfies condition
    if(index < 0)return;
    tempNotes.splice(index, 1);//deletes in array from a specified index and 2nd argument tells how many elements to delete
    setNotes(tempNotes);
  }
  const updateText = (text, id)=>{
    const tempNotes = [...notes];
    const index = tempNotes.findIndex(item=> item.id === id);
    if(index < 0)return;
    tempNotes[index].text = text;
    setNotes(tempNotes);
  }
  useEffect(()=>{
    //notes array json string mein convert hoga stringify se with key notes-app. phir localStorage mein save hoga local storage mein chize store sirf json string mein hi save hoti hai
    localStorage.setItem("notes-app", JSON.stringify(notes));
  }, [notes]);//when there are changes in notes array this function runs. ie. insertion or deletion in array 
  return (
    <div className="App">
      <Sidebar addNote={addNote} />
      <NoteContainer notes = {notes} deleteNote={deleteNote} updateText={updateText} />
    </div>
  );
}

export default App;
