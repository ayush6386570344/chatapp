import { useContext } from "react";
import './chat.css'
import { ChatContext } from "../../../usecontext/chatcontext";
import Leftsidebar from '../../components/leftsidebar/leftsidebar'
import Chatbox from '../../components/chatbox/chatbox'
const Chat = () => {
  const { selecteduser } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chat-container">
        <div className={`left-panel ${selecteduser ? "hide-mobile" : ""}`}>
          <Leftsidebar />
        </div>

        <div className={`right-panel ${!selecteduser ? "hide-mobile" : ""}`}>
          <Chatbox />
        </div>
      </div>
    </div>
  );
};

export default Chat;