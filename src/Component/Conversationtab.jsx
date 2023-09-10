import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Conversationtab({props}) {
  const Navigate = useNavigate()
  const lightMode = useSelector((state)=>state.themeKey)
  const userData = JSON.parse(localStorage.getItem("userData"));
  if(!userData){
    console.log("use not authanticated")
    Navigate("/")
  }
  return (
    <div className={"conversation-container " + (lightMode?"":"dark")} onClick={()=>{Navigate("chat")}}>
        <p className={"con-icon " + (lightMode?"":"dark")}>{props.name[0].toUpperCase()}</p>
        <p className='con-title'>{props.name}</p>
        <p className='con-lastMessage'>{props.lastMessage}</p>
        <p className='con-timestamp'>{props.timeStamp}</p>
    </div>
  )
}
