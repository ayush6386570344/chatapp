const upload = require("../router/multer")
let express=require('express');
let protectRoute=require('../server/auth');
let userdata=express.Router();
let controller=require('../controller/usercontroller');
userdata.post('/userdata',controller.signin);   
userdata.post('/check-login',controller.verifylogin);
userdata.post('/friendrequestlist',controller.friendrequestlist);
userdata.post('/addinfriendlist',controller.addinfriendlist);
userdata.post(
  "/editprofile",
  upload.single("image"), 
  protectRoute,
  controller.handleeditprofile
)
userdata.get("/check",protectRoute,controller.checkAuth);
userdata.post('/getprofile',controller.provideuserprofile);
userdata.post('/getfrienddetails',controller.getfrienddetails)
userdata.post('/checklogin',controller.verifylogin)
userdata.post('/friendlist',controller.providefriendlist);
module.exports=userdata;