import './MyStyle.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../Features/themeslice';
import { useContext, useEffect, useState } from 'react';
import { myContext } from './MainContainer'
import axios from 'axios'
export default function SideBar({refs,setRefs}) {
  
  const dispatch = useDispatch()
  
  const lightMode = useSelector((state)=>(state.themeKey))
  const {refresh,setRefresh} = useContext(myContext)
  const [conversations, setConversations] = useState([]);
  
  const Navigate = useNavigate()
  const userData = JSON.parse(localStorage.getItem("userData"));
  if(!userData){
    console.log("use not authanticated")
    Navigate("/")
  }
  const user = userData.data;
  
  useEffect(()=>{

    const config = {
        headers:{
          Authorization: `Bearer ${user.token}`,
        },
    }
    axios.get("https://weak-ruby-earthworm-tux.cyclic.cloud/chat/",config)
    .then((result)=>{
      setConversations(result.data)
    })
  },[refresh,user])


  return (
    <div className={"sideBar" + (lightMode?"":" dark")}>
      <div className={"sb-header " + (lightMode?"":"dark")}>
        <div className="sb-first-header">
        <IconButton onClick={()=>{ Navigate("welcome")} }>
          <AccountCircleIcon className={'icon'+ (lightMode?"":" dark")}/>
        </IconButton>
        </div>
        <div className="sb-second-header">
          <IconButton onClick={()=>{ Navigate("users")} }>
            <PersonAddIcon className={'icon'+ (lightMode?"":" dark")}/>
          </IconButton>
          <IconButton onClick={()=>{Navigate("groups")}}>
            <GroupAddIcon className={'icon'+ (lightMode?"":" dark")}/>
          </IconButton>
          <IconButton onClick={()=>{Navigate("create-group")}}>
            <AddCircleIcon className={'icon'+ (lightMode?"":" dark")}/>
          </IconButton>
          <IconButton onClick={()=>{dispatch(toggleTheme())}}>
            {lightMode?<NightlightIcon className={'icon'+ (lightMode?"":" dark")}/>:<LightModeIcon className={'icon'+ (lightMode?"":" dark")}/>}
          </IconButton>
        </div>
      </div>
      <div className={"sb-search " + (lightMode?"":"dark")}>
        <IconButton> 
          <SearchIcon className={'icon'+ (lightMode?"":" dark")}/>
        </IconButton>
        <input placeholder='Search' className={'searchbox' + (lightMode?"":" dark")}/>
      </div>


      <div className={"sb-conversations " + (lightMode?"":"dark")}>

        {conversations.map((conversation,index)=>{

          const num = (conversation.users[0]._id === user._id)?1:0
          
          if(conversation.users.length === 1){
            return <div key = {index}></div>
          }

          if(conversation.latestMessage === undefined){
            if(conversation.isGroupChat){
              return(
                <div key = {index} onClick = {()=>{setRefresh(!refresh)}}>
                  <div className={"conversation-container " + (lightMode?"":"dark")} onClick={()=>{Navigate(`chat/${conversation._id}&${conversation.chatname}`)}}>
                    <p className={"con-icon " + (lightMode?"":"dark")}>{conversation.chatname[0].toUpperCase()}</p>
                    <p className='con-title'>{conversation.chatname}</p> 
                    <p className='con-lastMessage'>No previous Messages, click here to start a new chat</p>
                  </div>
                </div>
              )
            }
            else{
              return(
                <div key = {index} onClick = {()=>{setRefresh(!refresh)}}>
                  <div className={"conversation-container " + (lightMode?"":"dark")} onClick={()=>{Navigate(`chat/${conversation._id}&${conversation.users[num].name}`)}}>
                    <p className={"con-icon " + (lightMode?"":"dark")}>{conversation.users[num].name[0].toUpperCase()}</p>
                    <p className='con-title'>{conversation.users[num].name}</p> 
                    <p className='con-lastMessage'>No previous Messages, click here to start a new chat</p>
                  </div>
                </div>
              )
            }
          }
          
          else{
            if(conversation.isGroupChat){
              console.log("group")
              console.log(conversation.chatname)
              return(
                <div key = {index} onClick = {()=>{setRefresh(!refresh)}}>
                  <div className={"conversation-container " + (lightMode?"":"dark")} onClick={()=>{Navigate(`chat/${conversation._id}&${conversation.chatname}`)}}>
                    <p className={"con-icon " + (lightMode?"":"dark")}>{conversation.chatname[0].toUpperCase()}</p>
                    <p className='con-title'>{conversation.chatname}</p> 
                    <p className='con-lastMessage'>{conversation.latestMessage.content}</p>
                  </div>
                </div>
              )
            }
            else{
            return(
              <div key = {index} onClick = {()=>{setRefresh(!refresh)}}>
              <div className={"conversation-container " + (lightMode?"":"dark")} onClick={()=>{Navigate(`chat/${conversation._id}&${conversation.users[num].name}`)}}>
                <p className={"con-icon " + (lightMode?"":"dark")}>{conversation.users[num].name[0].toUpperCase()}</p>
                <p className='con-title'>{conversation.users[num].name}</p> 
                <p className='con-lastMessage'>{conversation.latestMessage.content}</p>
              </div>
            </div>
          )
          }
          }

        })}
      </div>


    </div>
  )
}