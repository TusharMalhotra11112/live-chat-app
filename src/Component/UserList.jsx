import React, { useContext, useEffect, useState } from 'react'
import Logo from './Images/Welcome.png'
import { IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from "@mui/icons-material/Refresh";
import { useDispatch, useSelector } from 'react-redux';
import { myContext } from './MainContainer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import refreshSideBar from '../Features/refreshSideBar';

export default function UserList() {
    const {refresh,setRefresh} = useContext(myContext)
    const [users, setUsers] = useState([]);
    const userData = JSON.parse(localStorage.getItem("userData"));
    const nav = useNavigate()
    const dispatch = useDispatch();

    if (!userData) {
        console.log("User not Authenticated");
        nav(-1);
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

    const lightMode = useSelector((state)=>state.themeKey)
  return (
    <div className={'onlineUsersTab' + (lightMode?"":" dark")}>
        <div className={"ou-Header" + (lightMode?"":" dark")}>
            <img src={Logo} alt="Logo" className='ou-HeaderImg' onClick={()=>{nav("../welcome")}}/>
            <p className="ou-HeaderText">Available Users</p>
            <IconButton
            className={"ou-SearchBox" + (lightMode?"":" dark")}
            onClick={() => {
              setRefresh(!refresh);
            }}>
                <RefreshIcon/>
          </IconButton>
        </div>
        <div className={"ou-SearchBox" + (lightMode?"":" dark")}>
            <IconButton> 
                <SearchIcon className={'icon'+ (lightMode?"":" dark")}/>
            </IconButton>
            <input placeholder='Search' className={'ou-SearchBar' + (lightMode?"":" dark")}/>
        </div>
        
        <div className={"ou-List" + (lightMode?"":" dark")}>
                {
                    users.map((user,index)=>{
                        return( 
                            <div className={"onlineUser"+ (lightMode?"":" dark" )} key={index} onClick={()=>{
                                const config ={
                                    headers:{
                                        Authorization:`Bearer ${userData.data.token}`,
                                    },
                                }
                                axios.post("https://chat-app-backed.onrender.com/chat", {userId:user._id,name:user.name,} ,config)
                                .then((val)=>{
                                    nav(`../chat/${val.data._id}&${user.name}`)
                                })
                                dispatch(refreshSideBar)
                            }}>
                                <div className={"ou-Icon"+ (lightMode?"":" dark")}>{user.name[0].toUpperCase()}</div>
                                <div className={"ou-Name"}>{user.name}</div>
                            </div>
                        )
                    })
                }
            
        </div>
    </div>
  )
}