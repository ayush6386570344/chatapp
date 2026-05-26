import React, { useContext } from 'react'
import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/login/login'
import Chat from './pages/chat/Chat'
import Profileupdates from './pages/profileupdates/profileupdates'
import { Toaster } from "react-hot-toast"
import { AuthContext } from '../usecontext/authcontext'

const App = () => {

  const { authuser } = useContext(AuthContext);
  console.log(authuser);
  return (
    <>
      <Toaster/>
<Routes>
  <Route path='/' element={<Login/>}/>
  <Route
    path='/chat'
    element={authuser? <Chat/> : <Navigate to="/"/>}
  />

  <Route
    path='/profile'
    element={authuser ? <Profileupdates/> : <Navigate to="/"/>}
  />

</Routes>
{/* only for track commit  */}
    </>
  )
}
export default App
