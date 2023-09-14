import React, { useContext, useEffect, useState } from 'react'
import Logo from './Images/Welcome.png'
import { IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import {myContext} from './MainContainer'
import RefreshIcon from "@mui/icons-material/Refresh";
import axios from 'axios';
import refreshSideBar from '../Features/refreshSideBar';
import { useNavigate } from 'react-router-dom';

export default function GroupList() {
    const lightMode = useSelector((state)=>state.themeKey)
    const userData = JSON.parse(localStorage.getItem("userData"))
    const {refresh,setRefresh} = useContext(myContext)
    const [groups, SetGroups] = useState([]);
    const dispatch = useDispatch();
    const nav = useNavigate()
    useEffect(()=>{

        const config ={
            headers:{
                Authorization: `Bearer ${userData.data.token}`,
            },
        }
        axios.get("https://chat-app-backed.onrender.com/chat/fetchGroups",config)
        .then((result)=>{
            SetGroups(result.data)
        })
        .catch((err)=>{
            console.log("err here")
            throw new Error(err.message)
        })
    },[refresh,userData.data.token])

    return (
        <div className={'onlineUsersTab' + (lightMode?"":" dark")}>
        <div className={"ou-Header" + (lightMode?"":" dark")}>
            <img src={Logo} alt="Logo" className='ou-HeaderImg' onClick={()=>{nav("../welcome")}}/>
            <p className="ou-HeaderText">Available Groups</p>
            <IconButton
            className={"icon" + (lightMode ? "" : " dark")}
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
                    groups.map((group,index)=>{
                        return( 
                            <div className={"onlineUser"+ (lightMode?"":" dark" )} key={index} onClick={()=>{
                                console.log("Creating chat with ", group.name);
                                const config ={
                                    headers:{
                                        Authorization:`Bearer ${userData.data.token}`,
                                    },
                                }
                                axios.post("https://chat-app-backed.onrender.com/chat", {userId:group._id,name:group.chatname,} ,config)
                                dispatch(refreshSideBar)
                            }}>
                                <div className={"ou-Icon"+ (lightMode?"":" dark")}>{group.chatname[0].toUpperCase()}</div>
                                <div className={"ou-Name"}>{group.chatname}</div>
                            </div>
                        )
                    })
                }
            
        </div>
    </div>
    )
}
