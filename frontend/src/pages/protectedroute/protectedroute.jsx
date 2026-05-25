import React, { Children } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
const Protectedroute = ({children}) => {
    
    const user=localStorage.getItem('username');
    if (!user){
       return <Navigate to="/" replace />
    }
  return children
}

export default Protectedroute
