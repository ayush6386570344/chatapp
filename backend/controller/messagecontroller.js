//for getting all the user except login
let cloudinary=require('../lib/cloudinary');
let Message=require('../model/messageschema');
let User=require('../model/userdataschema');
let {io,usersocketmap}=require('../app');
exports.getuserforsidebar=async(req,res)=>{
    console.log("i am here in getuserforsidebar",req.body);
    try{
        const userid=req.user._id;
        const filteredusers=await User.find({_id:{$ne:userid} , "profile.name": {$ne: ""}}).select("-password");
        const unseenmessage={};
        const promises=filteredusers.map(async (user)=>{
            const messages=await Message.find({senderid:user._id,receiverid:userid,seen:false})
            if (messages.length>0){
                unseenmessage[user._id]=messages.length;
            }
        })
        await Promise.all(promises);
        res.json({success:true,users:filteredusers,unseenmessage});
    }catch(error){
        return res.json({
            success:false,message:"there is error"
        })
    }
}
exports.getmessage=async(req,res)=>{
    try{
        // the person whoes chataregoingtorevealthereidwillbeinapiparams;
        const {id:selecteduserid}=req.params;
        const myid=req.user._id;
        const messages=await Message.find({
            $or:[{senderid:myid,receiverid:selecteduserid},
                {senderid:selecteduserid,receiverid:myid}]
        })
        await Message.updateMany({senderid:selecteduserid,receiverid:myid},{seen:true});
        res.json({success:true,messages});
    }
    catch(error){
        return res.json({
            success:false,message:"there is error"
        })
    }
}
exports.markmessageasseen=async(req,res)=>{
    try{
        let {id}=req.params;
        await Message.findByIdAndUpdate(id,{seen:true});
        res.json({success:true});
    }catch(error){
        return res.json({
            success:false,message:"there is error"
        })
    }
}
exports.sendmessage=async(req,res)=>{
    try{
        const {text,image}=req.body;
        const receiverid=req.params.id;
        const senderid=req.user._id;
        let imageurl;
   
        if (image){
            console.log("IMAGE LENGTH:", image?.length);
console.log("IMAGE START:", image?.slice(0, 50));
            let upload=await cloudinary.uploader.upload(image,{
                resource_type:"image",
            });
            imageurl=upload.secure_url;
        }
        console.log("i am here in sendmessage",text,imageurl);
        const newmessage=await Message.create({
            senderid,
            receiverid,
            text,
            image:imageurl
        })
        const receiversocketid = usersocketmap.get(receiverid);
        io.to(receiversocketid).emit("newMessage", newmessage);
        res.json({
            success:true,
            newmessage
        })

    }catch(error){
    console.log("CLOUDINARY ERROR:", error);

    return res.json({
        success:false,
        message:error.message
    })
}
}
