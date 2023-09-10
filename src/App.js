import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainContainer from './Component/MainContainer'
import Welcome from './Component/Welcome';
import ChatArea from './Component/ChatArea';
import UserList from './Component/UserList';
import GroupList from './Component/GroupList';
import CreateGroup from './Component/CreateGroup';
import LandingPage from './Component/LandingPage'
import { useSelector } from 'react-redux';
import { useState } from 'react';
function App() {
  const [refs,setRefs] = useState(false)


  const lightMode = useSelector((state)=>(state.themeKey))
  return (
    <div className={'App' + (lightMode?"":" appDark")}>
      <Routes>
        <Route path="/" element={<LandingPage />} >
        </Route>
        <Route path='app' element={<MainContainer refs={refs} setRefs={setRefs} />}>
          <Route path='welcome' element={<Welcome/>}/>
          <Route path='chat/:_id' element={<ChatArea refs={refs} setRefs={setRefs}/>}/>
          <Route path='users' element={<UserList/>}/>
          <Route path='groups' element={<GroupList/>} />
          <Route path='create-group' element={<CreateGroup />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
