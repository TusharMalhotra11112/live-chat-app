import React, { useEffect } from 'react'
import welcome from './Images/Welcome.png'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Welcome() {
  const lightMode = useSelector((state)=>state.themeKey)

  const userData = JSON.parse(localStorage.getItem("userData"));

  const nav = useNavigate();
  useEffect(()=>{
    if (!userData) {
      nav("/");
      console.log("User not Authenticated");
    }
  })
  
  return (
    <div className={"welcome " + (lightMode?"":"dark")}>
        <img src={welcome} alt="Live" className='welcomeImg'/>
        <p>Welcome {userData.data.name}</p>
    </div>
  )
}
