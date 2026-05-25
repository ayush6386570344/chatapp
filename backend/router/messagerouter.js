let express=require('express');
let messagerouter=express.Router();
let controller=require('../controller/messagecontroller');
let protectroute=require('../server/auth');
messagerouter.get("/users",protectroute,controller.getuserforsidebar);
messagerouter.get("/message/:id",protectroute,controller.getmessage);
messagerouter.put("/mark/:id", protectroute, controller.markmessageasseen);
messagerouter.post("/send/:id",protectroute,controller.sendmessage);
module.exports=messagerouter;