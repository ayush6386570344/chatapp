const upload = require("../router/multer")
let express=require('express');
let protectRoute=require('../server/auth');
let userdata=express.Router();
let controller=require('../controller/usercontroller');
userdata.post('/userdata',controller.signin);   
userdata.post('/check-login',controller.verifylogin);
userdata.post(
  "/editprofile",
  upload.single("image"), 
  protectRoute,
  controller.handleeditprofile
)
userdata.get("/check",protectRoute,controller.checkAuth);
userdata.get("/userprofile",protectRoute,controller.getuserprofile);
module.exports=userdata;