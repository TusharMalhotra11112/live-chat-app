import React, { useContext, useEffect, useState } from 'react'
import Logo from './Images/Welcome.png'
import CheckIcon from '@mui/icons-material/Check';
import { IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom' 
import axios from 'axios'
import { myContext } from './MainContainer'

export default function CreateGroup() {
  const {refresh,setRefresh} = useContext(myContext)
  const lightMode = useSelector((state)=>state.themeKey)
  const [users, setUsers] = useState([]);
  const Navigate = useNavigate()
  const userData = JSON.parse(localStorage.getItem("userData"));

  const [selectedUsers,setSelectedUsers] = useState([])


  const addSelectedUser = (selectedUser)=>{
    console.log(`added ${selectedUser}`)
    const updatedSelectedUser = [...selectedUsers]
    updatedSelectedUser.push(selectedUser)
    setSelectedUsers(updatedSelectedUser)

  }
  
  const removeSelecetedUser = (selectedUser)=>{
    console.log(`removed ${selectedUser}`)
    var updatedSelectedUser = [...selectedUsers]
    updatedSelectedUser = updatedSelectedUser.filter((val)=>{
      return val !== selectedUser
    })
    setSelectedUsers(updatedSelectedUser)

  }
  if(!userData){
    console.log("use not authanticated")
    Navigate("/")
  }

  useEffect(()=>{
        const config = {
            headers:{
                Authorization: `Bearer ${userData.data.token}`,
            },
        }
        axios.get("https://chat-app-backed.onrender.com/user/fetchUsers",config)
        .then((data)=>{
            // console.log("Data refreshed in user panel")
            setUsers(data.data)
        })
        
    },[refresh,userData.data.token])

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
    axios.post("https://chat-app-backed.onrender.com/chat/createGroup",{
      name:groupName,
      users:selectedUsers,
    },config)
    .then()
    .catch((err)=>{
      console.log("error here")
      throw new Error(err.message)
    })
    Navigate("/app/groups")
  }

  return (
    <div className={'createGroupTab'}>
      <div className={'createGroup '+ (lightMode?"":" dark")}>
        <img src={Logo} alt="Logo" className='ou-HeaderImg' onClick={()=>{Navigate("../welcome")}}/>
        <input type="text" className={"createGroupName"+ (lightMode?"":" dark")} placeholder='Enter Group Name' onChange={(e)=>{ setGroupName(e.target.value)}} />
        <IconButton onClick={()=>{
          if(selectedUsers.length < 1){
            window.alert("select atleast 1 user")
          }
          else if(groupName===""){
            window.alert("Give a name for the group")

          }
          else{
            createNewGrouop()
          }
        }}>  
            <CheckIcon className={'icon'+ (lightMode?"":" dark")}/>
        </IconButton>
      </div>
      <div className={"ou-List" + (lightMode?"":" dark")}>
        {
            users.map((user,index)=>{
                return( 
                    <div className={"onlineUser"+ (lightMode?"":" dark" )} key={index} onClick={()=>{
                      if (selectedUsers.includes(user._id)) {
                        removeSelecetedUser(user._id)
                      } else {
                        addSelectedUser(user._id)
                      }
                    }}>
                        <div className={"ou-Icon"+ (lightMode?"":" dark")}>{
                          selectedUsers.includes(user._id)?<CheckIcon></CheckIcon>:user.name[0].toUpperCase()
                        }</div>
                        <div className={"ou-Name"}>{user.name}</div>
                    </div>
                )
            })
        }
      </div>
    </div>
  )
}
