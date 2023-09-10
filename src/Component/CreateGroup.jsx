import React, { useState } from 'react'
import CheckIcon from '@mui/icons-material/Check';
import { IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom' 
import axios from 'axios'

export default function CreateGroup() {
  const lightMode = useSelector((state)=>state.themeKey)

  const Navigate = useNavigate()
  const userData = JSON.parse(localStorage.getItem("userData"));
  if(!userData){
    console.log("use not authanticated")
    Navigate("/")
  }

  const user = userData.data
  const [groupName,setGroupName] = useState("")
  const [open,setOpen] = useState(false)

   const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const createNewGrouop = ()=>{
    const config = {
      headers:{
        Authorization: `Bearer ${user.token}`,
      },
    }
    axios.post("https://weak-ruby-earthworm-tux.cyclic.cloud/chat/createGroup",{
      name:groupName,
      users:["64e8a0111bbe17a36ff2bffe","64e8a03f1bbe17a36ff2c048"],
    },config)
    .then()
    .catch((err)=>{
      console.log("error here")
      throw new Error(err.message)
    })
    Navigate("/app/groups")
  }


  return (
    <div className={'createGroup '+ (lightMode?"":" dark")}>
        <input type="text" className={"createGroupName"+ (lightMode?"":" dark")} placeholder='Enter Group Name'
        onChange={(e)=>{
          setGroupName(e.target.value)
        }}
        />
        <IconButton
        onClick={()=>{
          createNewGrouop()
        }}
        >  
            <CheckIcon className={'icon'+ (lightMode?"":" dark")}/>
        </IconButton>
    </div>
  )
}
