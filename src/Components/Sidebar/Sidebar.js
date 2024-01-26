import React from 'react'
import plusIcon from '../../assets/plus.png';
import './Sidebar.css';
import { useState } from 'react';

export default function Sidebar(props){
  const colors = ["#fe9b72", "#fec971", "#00d4fe", "#b693fd", "#e4ee91"];
  const [listOpen, setListOpen] = useState(false);
  return (
    <div className='sidebar'>
      <img src={plusIcon} alt="" onClick={()=> setListOpen(!listOpen)} />
      <ul className={listOpen ? "sidebar_list_active" : "sidebar_list"}>
        {
          colors.map((item, index)=>
            <li 
              key={index} 
              className='sidebar_list_item' 
              style={{ backgroundColor:item }}
              onClick={()=>props.addNote(item)}
            />
          )
        }
      </ul>
    </div>
  )
}
