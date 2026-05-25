import { useState, createContext, useContext, useEffect } from "react";
import { AuthContext } from "./authcontext";
import toast from "react-hot-toast";
export const ChatContext = createContext();
export const ChatProvider = ({ children }) => {
    const {socket,axios}=useContext(AuthContext);
    const [message, setmessage] = useState([]);
    const [users, setusers] = useState([]);
    const [selecteduser, setselecteduser] = useState(null);
    const [unseenmessage, setunseenmessage] = useState([]);
    const getuser=async()=>{
        console.log("i am here in getuser");
        try{
        const {data}=await axios.get('/users');
        console.log("i am here in getuser",data);
        if (data.success){
            setusers(data.users);
            setunseenmessage(data.unseenmessage);
        }}catch(error){
            toast.error("getting error while getting users");
        }
    }
    const getmessage=async(userid)=>{
        try{
            const {data}=await axios.get(`/message/${userid}`);
            if (data.success){
                setmessage(data.messages);
            }
        }catch(error){
            toast.error(error.message);
        }
    }
    const functiontosendmessagetoselecteduser=async(messagedata)=>{
        try{
            const {data}=await axios.post(`/send/${selecteduser._id}`,messagedata);
            if (data.success){
                setmessage((prevmessage)=>[...prevmessage,data.newmessage]);
            }
        }catch(error){
            toast.error(error.message);
        }
    }

//new adding 
const handleMessage = (newMessage) => {
    if (selecteduser && newMessage.senderid === selecteduser._id) {

        setmessage(prev => [...prev, newMessage]);

    } else {

        setunseenmessage(prev => ({
            ...prev,
            [newMessage.senderid]: (prev[newMessage.senderid] || 0) + 1
        }));
    }
};

    // function to unscribe from messages
    const unsubcribefrommessage=()=>{
        if (socket) socket.off("newMessage");
    }
    useEffect(() => {
    if (!socket) return;

    socket.off("newMessage");
    socket.on("newMessage", handleMessage);

    return () => {
        socket.off("newMessage", handleMessage);
    };
}, [socket, selecteduser]);
    const value = {
        message,
        users,
        selecteduser,
        functiontosendmessagetoselecteduser,
        getmessage,
        getuser,setmessage,setselecteduser,
        unseenmessage,
        setunseenmessage
    };
    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
};