import { createContext, useState } from 'react'
import './MyStyle.css'
import SideBar from './SideBar'
import { Outlet, useNavigate } from 'react-router-dom'


export const myContext = createContext()


export default function MainContainer({refs,setRefs}) {
  const [refresh, setRefresh] = useState(true);

  const Navigate = useNavigate()
  const userData = JSON.parse(localStorage.getItem("userData"));
  if(!userData){
    console.log("use not authanticated")
    Navigate("/")
  }
  return (
    <div className='mainContainer'>
      <myContext.Provider value={{refresh:refresh,setRefresh:setRefresh}}>
        <SideBar refs={refs} setRefs={setRefs}/>
        <Outlet refs={refs} setRefs={setRefs}/>
      </myContext.Provider>
    </div>
  )
}
