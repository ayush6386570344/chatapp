import React, { useContext } from 'react'
import './menubar.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../usecontext/authcontext';
const Menubar = ({refreshprofile}) => {
  const navigate=useNavigate();
  let {logout}=useContext(AuthContext);
  return (
    <div>
        <div className="menu-dropdown">
          <p onClick={()=>{navigate('/profile')}}>Edit Profile</p>
          <p onClick={()=>logout()}>Logout</p>
      </div>
    </div>
  )
}

export default Menubar
