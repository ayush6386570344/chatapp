import React, { createContext, useEffect, useState } from 'react'
import './chat.css'
import Leftsidebar from '../../components/leftsidebar/leftsidebar'
import Chatbox from '../../components/chatbox/chatbox'
import { providefriendlist } from '../../service/userdatabase'
// import { chatcontext } from './chatcontext'
import { friendsdata } from '../../service/userdatabase'
const Chat = () => {

  // let [friendprofile,setnewfriendprofile]=useState([]);
  //  let functionforfriendprofile=async()=>{
  //       let listedfriendprofile=await friendsdata(localStorage.getItem('username'));
  //       setnewfriendprofile(listedfriendprofile.profiledata);
  //   }
  // useEffect(()=>{
  // functionforfriendprofile()
  // },[]);
  return (
    // <chatcontext.Provider value={{friendprofile,functionforfriendprofile}} >
    <div className='chat'>
      <div className="chat-container">
      {/* <Leftsidebar friendprofiledata={friendprofile}
      refreshprofile={functionforfriendprofile} /> */}
      <Leftsidebar></Leftsidebar>
      <Chatbox  />
      </div>
    </div>
    // </chatcontext.Provider>
  )
}

export default Chat