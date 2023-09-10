import { useState } from 'react'
import Logo from './Images/Welcome.png'
import { Backdrop, Button, CircularProgress, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


export default function Login() {

  const [showLogin,setShowLogin] = useState(true)
  const [data,SetData] = useState({name:"",email:"",password:""})
  const [loading,setLoading] = useState(false)
  
  const Navigate = useNavigate()
  
  const changeHandeler = (e)=>{
    SetData({...data,[e.target.name]:e.target.value})
  }
  
  const loginHandeler = async ()=>{
    setLoading(true);
    try{
      const config = {
        headers:{
          "content-type" : "application/json",
        },
      }

      const response = await axios.post("https://weak-ruby-earthworm-tux.cyclic.cloud/user/login/",data,config)

      setLoading(false)
      localStorage.setItem("userData",JSON.stringify(response))
      Navigate("/app/welcome")
    }
    catch(err){
      window.alert("Incorrect username Or Password")
    }
    setLoading(false)
  }


  const signUpHandeler = async ()=>{
    setLoading(true);
    try{
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      }

      const response = await axios.post("https://weak-ruby-earthworm-tux.cyclic.cloud/user/register/",data,config)

      setLoading(false)
      localStorage.setItem("userData",JSON.stringify(response))
      Navigate("/app/welcome")
    }
    catch(err){
      window.alert("UserName or Email already taken")
      
    }
    setLoading(false)
  }


  const change = ()=>{
    // document.getElementById("standard-basic").value = ""
    document.getElementsByClassName("username").value =""
    SetData({name:"",email:"",password:""})
    setShowLogin((prev)=>prev = !prev)
  }
  return (
    <>
      <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="secondary" />
      </Backdrop>
      <div className='loginPage'>
          <div className="loginImg">
              <img src={Logo} alt="logo" className='loginLogo'/>
          </div>
          {showLogin?
          <div className='loginBox'>
            <p className='loginText'>Login to Your Account</p>
            <TextField id="standard-basic" label="UserName" variant="standard" className='username' onChange={changeHandeler} name='name' required/>
            <TextField id="standard-basic" label="Password" variant="standard" type='password' className='password' onChange={changeHandeler} name='password' autoComplete='current-password' required/>
            <Button variant="outlined" className='loginButton' onClick={loginHandeler}>Login</Button>
            <div className="loginBottom">
              <p className='loginBottomText'>Dont Have an acount?</p>
              <p className='loginBottomLink' onClick={change} >Sign Up</p> 
            </div>
          </div>
          :
          <div className='SignUpBox'>
            <p className='loginText'>Create your Account</p>
            <TextField id="standard-basic" label="UserName" variant="standard" className='username' onChange={changeHandeler} name='name'  required/>
            <TextField id="standard-basic" label="email" variant="standard" type='email' className='username' onChange={changeHandeler} name='email' required/>
            <TextField id="standard-basic" label="Password" variant="standard" type='password' className='password' onChange={changeHandeler} name='password' required/>
            <Button variant="outlined" className='loginButton' onClick={signUpHandeler}>Sign Up</Button>
            <div className="loginBottom">
              <p className='loginBottomText'>Already Have an acount?</p>
              <p className='loginBottomLink' onClick={change}>Login</p>
            </div>
          </div>
          }
      </div>
    </>
  )
}
