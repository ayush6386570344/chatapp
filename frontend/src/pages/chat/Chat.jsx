import React, { createContext, useEffect, useState } from 'react'
import './chat.css'
import Leftsidebar from '../../components/leftsidebar/leftsidebar'
import Chatbox from '../../components/chatbox/chatbox'
const Chat = () => {
  return (
    <div className='chat'>
      <div className="chat-container">
     
      <Leftsidebar></Leftsidebar>
      <Chatbox  />
      </div>
    </div>
  )
}

export default Chat