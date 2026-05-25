import React, { useState } from "react";
import "./friendrequest.css";
import { providefriendrequestlist } from "../../service/menuitem";
import { useEffect } from "react";
import { chatcontext } from "../../pages/chat/chatcontext";
import { includeinfriendlist } from "../../service/menuitem";
export default function FriendList() {
    const [list, setList] = useState([]);
        useEffect(()=>{
            const fetchfriends=async()=>{
                const friendlist=await providefriendrequestlist(localStorage.getItem('username'));
                setList(friendlist.friendslist);
            }
            fetchfriends();
        },[]);
      let handleonclick=async (persontobeadd)=>{
        let makechange= await includeinfriendlist(persontobeadd,localStorage.getItem('username'));
            const friendlist=await providefriendrequestlist(localStorage.getItem('username'));
                setList(friendlist.friendslist);
      }
    let friendlist=list;
  return (
    <div className="container">
      <div className="card">
        <div className="friend-list">
          {friendlist.map((friend) => (
            <div className="friend-item" name={friend} key={friend}>
              <span>{friend}</span>

              <button onClick={()=>handleonclick(friend)} className="friend-btn">
                Add Friend
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}