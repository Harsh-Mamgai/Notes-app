import React from 'react'
import './Note.css';
import deleteIcon from '../../assets/delete.png';//in react do not add image directly in src first import it
let timer = 500;//debounce delay
let timeout;

export default function Note(props) {

  const formatDate = (value)=>{
    if(!value) return "";
    const date = new Date(value);
    const monthNames = [
      'Jan', 'Feb', 'March', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ];
    let hrs = date.getHours();//24 hours format
    let ampm= hrs>12 ? "PM" : "AM";
    hrs = hrs ? hrs : "12";//to handle 0. in js 0 is false so if hrs=0 false 12 ayega agar hrs!=0 true no change
    hrs= hrs>12 ? hrs%12 : hrs;//gives date in 12 hour format

    let min = date.getMinutes();
    min = min<10 ? "0"+min : min;
    let day = date.getDate();
    const month = monthNames[date.getMonth()];//getMonth() function returns index number of month

    return `${hrs}:${min} ${ampm} ${day} ${month}`
  }
  const debounce=(func)=>{//takes a single argument func, which is the function you want to debounce.
    clearTimeout(timeout);//reset the debounce timer if the debounced function is called again before the previous timer has completed.
    timeout = setTimeout(func, timer);//the execution of provided func after the specified timer duration is set
  }
  const updateText = (text, id)=>{
    debounce(()=>props.updateText(text, id));//updateText() function of App.js is debounced. mtlb timer complete hone tak changes nahi hue tabhi yeh function call hoga. agar timer complete hone se pehle hi changes hue toh duabara se timer 0 pe reset hojaega or wait karega same chiz ka ki timer complete ho or changes na ho  
  }
  return (
    <div className='note' style={{backgroundColor:props.note.color}}> {/*inline css*/}
        <textarea 
          className='note_text' 
          defaultValue={props.note.text} 
          onChange={(event)=> updateText(event.target.value, props.note.id)}
        />

        <div className='note_footer'>
          <p>{formatDate(props.note.time)}</p>
          <img src={deleteIcon} alt="" onClick={()=>props.deleteNote(props.note.id)}/>
        </div>
    </div>
  )
}
