let express=require('express');
require("dotenv").config()
const http=require("http");
const {Server}=require("socket.io");
let app=express();
let server=http.createServer(app);
const io=new Server(server,{
    cors:{origin:"*"}
})

const usersocketmap = new Map();

//new 
io.on("connection", (socket) => {
    const userid = socket.handshake.query.userid;
    if (userid) {
        usersocketmap.set(userid, socket.id);
    }
    const emitOnlineUsers = () => {
        io.emit("getonlineuser", Array.from(usersocketmap.keys()));
    };
    emitOnlineUsers(); // global update
    socket.emit("getonlineuser", Array.from(usersocketmap.keys())); // immediate update

    socket.on("disconnect", () => {
        usersocketmap.delete(userid);
        emitOnlineUsers();
    });
});

module.exports={usersocketmap,io};
let messagerouter=require('./router/messagerouter');
let userdata=require('./router/userdatastorerouter');
let cors=require('cors');
let { body, validationResult } = require('express-validator');
const { default: mongoose } = require('mongoose');
const dbpath=process.env.MONGODB_URI;
let port=5000;
app.use(cors());
app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(userdata);
app.use(messagerouter);
mongoose.connect(dbpath).then(()=>{
    server.listen(port,()=>{
        console.log(`server is running on port http://localhost:${port}`);
    });
}).catch((err)=>{
    console.log("error in connecting to database",err);
});