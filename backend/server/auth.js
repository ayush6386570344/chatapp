let User=require('../model/userdataschema'); 
const jwt = require("jsonwebtoken");
const protectroute=async(req,res,next)=>{
    try{
        console.log("fewwekg");
        const token=req.headers.token;
        console.log(token);
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
console.log(decoded.userId);
        const user=await User.findById(decoded.userId).select("-password");
        console.log("i am in protecteoute,user",user);
        if (!user){
            return res.json({success:false});
        }
        req.user=user;
        next();
    }catch(error){
        return res.json({success:false});
    }
}
module.exports=protectroute;