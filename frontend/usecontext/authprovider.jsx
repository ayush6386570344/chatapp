import { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "./authcontext";
const backendurl = import.meta.env.VITE_BACKEND_URL;

axios.defaults.baseURL = backendurl;

export const AuthProvider = ({ children }) => {
const [loading, setloading] = useState(true);
    const navigate = useNavigate();
    const [token, settoken] = useState(localStorage.getItem("token"));
    const [authuser, setauthuser] = useState(null);
    const [onlineusers, setonlineusers] = useState([]);
    const [socket, setsocket] = useState(null);
    const checkauth = async () => {
        if (!token){
            setloading(false);
        return;

        } 
        try {
            const { data } = await axios.get("/check");
                console.log(data); 
            if (data.success) {
                setauthuser(data.user);

                // connectsocket(data.user);
            }
        } catch (error) {
            toast.error(error.message);
            setauthuser(null);
             localStorage.removeItem("token");
        }
         setloading(false);
    };
 useEffect(() => {
    if (authuser) {
        connectsocket(authuser);
    }
}, [authuser]);
    const login = async (credentials) => {
        console.log("i am in login function",credentials.email);
        try {
            const {data} = await axios.post("/check-login", credentials);
            
        console.log(data);
            if (data.success) {
                setauthuser(data.user);
                axios.defaults.headers.common["token"] = data.token;
                localStorage.setItem("token", data.token);
                settoken(data.token);
                toast.success("Login successful");
                navigate('/chat');
            }
        } catch (error) {
           
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const signup = async (credentials) => {
        try {
            const { data } = await axios.post("/userdata", credentials);
console.log(data);
            if (data.success) {
                setauthuser(data.userdata);
                axios.defaults.headers.common["token"] = data.token;

                localStorage.setItem("token", data.token);
                settoken(data.token);

                // connectsocket(data.userdata);

                toast.success("Signup successful");
                navigate("/profile", {
                    state: {
                        editmode: true
                    }
                });
            }
        } catch (error) {
            console.log("kefjkewe");
            toast.error(error.message);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        settoken(null);
        setonlineusers([]);
        setauthuser(null);

        delete axios.defaults.headers.common["token"];

        socket?.disconnect();

        toast.success("Logged out");
        navigate("/");
    };

    const profileupdates = async (body) => {
        try {
            const { data } = await axios.post("/editprofile", body);

            if (data.success) {
                setauthuser(data.user);
                toast.success("Profile updated");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
    // new 
    const connectsocket = (userdata) => {
    if (!userdata) return;

    // 🔥 ALWAYS kill old socket first
    if (socket) {
        socket.disconnect();
        setsocket(null);
    }

    const newsocket = io(backendurl, {
        query: {
            userid: userdata._id,
        },
        transports: ["websocket"],
        forceNew: true
    });

    setsocket(newsocket);

    newsocket.on("connect", () => {
        console.log("socket connected:", newsocket.id);
    });

    newsocket.on("getonlineuser", (userids) => {
        setonlineusers(userids);
    });

    newsocket.on("newMessage", (msg) => {
        console.log("new message received", msg);
    });
};
useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
        settoken(savedToken);
        axios.defaults.headers.common["token"] = savedToken;
    }
}, []);
    useEffect(() => {
    checkauth();
}, []);
    return (
        <AuthContext.Provider value={{
            authuser,
            onlineusers,
            socket,
            axios,
            login,
            signup,
            logout,
            profileupdates
        }}>
            {children}
        </AuthContext.Provider>
    );
};