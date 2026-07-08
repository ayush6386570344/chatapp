import React, { useContext, useEffect, useState, useRef } from 'react';
import './chatbox.css';
import assets from '../../assets/assets';
import { ChatContext } from '../../../usecontext/chatcontext';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../usecontext/authcontext';
import { ArrowLeft } from "lucide-react";
const ChatBox = () => {
  const scrollEnd = useRef(null);
  const {
    message, 
    selecteduser,
    setselecteduser,
    functiontosendmessagetoselecteduser,
    getmessage
  } = useContext(ChatContext);

  const { authuser, onlineusers } = useContext(AuthContext);

  const [input, setinput] = useState('');

  const handlesendmessage = async (e) => {
    e?.preventDefault?.();

    if (input.trim() === '') return;

    await functiontosendmessagetoselecteduser({
      text: input.trim()
    });

    setinput('');
  };
  const handlesendimage = async (e) => {
    console.log("i am in handlesendimage");
    const file = e.target.files[0];

    if (!file || !file.type.startsWith('image/')) {
      toast.error('Select a valid image file');
      return;
    }

    const reader = new FileReader();

    reader.onloadend = async () => {
      await functiontosendmessagetoselecteduser({
        image: reader.result
      });

      e.target.value = '';
    };

    reader.readAsDataURL(file);
  };
  useEffect(() => {
    if (selecteduser) {
      getmessage(selecteduser._id);
    }
  }, [selecteduser]);
  useEffect(() => {
    scrollEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  if (!selecteduser) return null;

  return (
    <div className="chat-box">
      <div className="chat-user">
        <ArrowLeft
        className="back-btn"
        onClick={() => setselecteduser(null)}
    />
        <img
          src={selecteduser.profile.img || assets.avatar_icon}
          alt=""
        />

        <p>
          {selecteduser.profile.name}
          {onlineusers.includes(selecteduser._id) && (
            <img className="dot" src={assets.green_dot} alt="" />
          )}
        </p>

        <img src={assets.help_icon} alt="" />
      </div>
      <div className="chat-msg">
        {message.map((msg, index) => {

          const isSender = msg.senderid === authuser._id;

          return (
            <div key={index}>
              {isSender ? (
                <div className="s-msg">

                  {msg.text ? (
                    <p className="msg">{msg.text}</p>
                  ) : (
                    <img className="msg-img" src={msg.image} alt="" />
                  )}

                  <div>
                    <img
                      src={authuser.profile.img || assets.profile_img}
                      alt=""
                    />
                  </div>

                </div>
              ) : (
                <div className="r-msg">

                  {msg.text ? (
                    <p className="msg">{msg.text}</p>
                  ) : (
                    <img className="msg-img" src={msg.image} alt="" />
                  )}

                  <div>
                    <img
                      src={selecteduser.profile.img || assets.profile_img}
                      alt=""
                    />
                  </div>

                </div>
              )}
            </div>
          );
        })}
        <div ref={scrollEnd}></div>
      </div>
      <div className="chat-input">

        <input
          value={input}
          onChange={(e) => setinput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handlesendmessage(e);
          }}
          type="text"
          placeholder="Send a message"
        />

        <input
          type="file"
          id="image"
          accept="image/png,image/jpeg,image/jpg"
          hidden
          onChange={(e)=>{handlesendimage(e)}}
        />

        <label  htmlFor="image" >
          <img  src={assets.gallery_icon} alt="" />
        </label>

        <img
          onClick={handlesendmessage}
          src={assets.send_button}
          alt=""
        />

      </div>

    </div>
  );
};

export default ChatBox;