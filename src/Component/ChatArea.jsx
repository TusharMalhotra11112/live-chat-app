import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import MessageSent from './MessageSent';
import MessageReceived from './MessageReceived';
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { myContext } from './MainContainer';
import axios from 'axios';

export default function ChatArea({refs,setRefs}) {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const lightMode = useSelector((state)=>state.themeKey)
    const dyParams = useParams()
    const [chat_id, chat_user] = dyParams._id.split("&")
    const [messageContent, setMessageContent] = useState("")
    const [allMessages, setAllMessages] = useState([])
    const {refresh,setRefresh} = useContext(myContext)
    const [loaded, setloaded] = useState(false)
    const user = userData.data

    const scrollToBottom = ()=>{
        try{
            var objDiv = document.getElementById("chatArea");
            objDiv.scrollTop = objDiv.scrollHeight;
        }
        catch(err){
            console.log(err.message)
        }
    }

    const sendMessage = ()=>{
        const config = {
            headers:{
                Authorization: `Bearer ${user.token}`,
            },
        }
        axios.post("https://chat-app-backed.onrender.com/message",{content:messageContent,chatId:chat_id,userId:user._id},config)
        .then(()=>{
            scrollToBottom()
        })
    }
    


    useEffect(()=>{
        const config = {
            headers:{
                Authorization: `Bearer ${user.token}`,
            },
        }
        axios.get("https://chat-app-backed.onrender.com/message/"+ chat_id ,config)
        .then(({data})=>{
            setAllMessages(data)
            setloaded(true)
            scrollToBottom()
        })


    },[refresh,user,chat_id,])

    const Navigate = useNavigate()
    if(!userData){
        console.log("use not authanticated")
        Navigate("/")
    }

    if(!loaded){
        return(
        <div className={'chatArea-Container'+ (lightMode?"":" dark")}>
        </div>)
    }
    else{
        return (
            <div className={'chatArea-Container'+ (lightMode?"":" dark")}>
                <div className={"chatHeader " + (lightMode?"":"dark")}>
                    <IconButton>
                        <ArrowBackIcon className={'icon'+ (lightMode?"":" dark")} onClick={()=>{Navigate("../welcome")}} />
                    </IconButton>
                    <p className={"chat-icon " + (lightMode?"":"dark")}>{chat_user[0].toUpperCase()}</p>
                    <div className="chat-Head">
                        <p className="chat-Title">{chat_user}</p>
                        {/* <p className="chat-Timestamp">{props.timeStamp}</p> */}
                    </div>
                </div>

                <div id='chatArea' className={"chatArea"+(lightMode?"":" dark")}>
                    {allMessages
                    .map((message,index)=>{
                        const sender = message.sender
                        const self_id = user._id
                        if(sender._id === self_id){
                            return <MessageSent props={message} key={index}/>
                        }
                        else{
                            return<MessageReceived props={message} key = {index}/>
                        }
                    })
                    }
                </div>


                <div className={"messageArea"+ (lightMode?"":" dark")}>
                    <input type="text" className={"chatInput"+ (lightMode?"":" dark")} placeholder='Type a Message here' 
                    value={messageContent} 
                    onChange={(e)=>{
                        setMessageContent(e.target.value)
                    }}
                    onKeyDown={(e)=>{
                        if(e.code ==='Enter'){
                            sendMessage()
                            setMessageContent("")
                            setRefresh(!refresh)

                        }
                    }}
                    />
                    <IconButton onClick={()=>{
                        sendMessage()
                        setMessageContent("")
                        setRefresh(!refresh)
                    }}>
                        <SendIcon className={'icon'+ (lightMode?"":" dark")}/>
                    </IconButton>
                </div>
            </div>
    )
    }
}
