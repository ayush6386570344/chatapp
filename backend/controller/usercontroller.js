const bcrypt = require('bcrypt');
const User = require('../model/userdataschema'); // adjust path
const generatetoken = require('../lib/util');
const cloudinary=require('../lib/cloudinary');
exports.signin = async (req, res) => {
  console.log("🔥 SIGNUP CONTROLLER HIT");
    try {
        const { username, email, password } = req.body;
      console.log(req.body);
        // 1. hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // 2. store hashed password
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        console.log(newUser);
try {
    await newUser.save();
    console.log("saved successfully");
} catch (err) {
    console.log("SAVE ERROR:", err.code, err.message);
}
        const token=generatetoken(newUser._id);
        console.log(token);
       res.json({
        success:true,userdata:newUser,token,msg:"Account created succesfully"
       })


    } catch (error) {
        res.status(500).json({
          success:false,
            message: "Error saving user",
            error
        });
    }
};
exports.verifylogin=async(req,res)=>{
   try{  
      const {email,password}=req.body;
      console.log(req.body);
      const user=await User.findOne({email});
      console.log("fewweg",user);
      if (!user){
        return res.status(404).json({
          check:false,
          message:"user not found"
        })
      }
      const isMatch=await bcrypt.compare(password,user.password);
      if (!isMatch){
        return res.status(404).json({
          check:false,
          message:"Invalid password"
        })
      }

      const token=generatetoken(user._id);
      console.log("ergew",token);
      return res.status(200).json({
      success:true,
      user:user,
      token
      })}catch(error){
        return res.json({
          success:false,message:"there is some error"
        })
      }
}

// controller to check is user is authenticated
exports.checkAuth=(req,res)=>{
  console.log("i am in backend");
  res.json({success:true,user:req.user});
}
exports.checkuser = async (req,res) => {
  try {
    console.log("mai backend me hu");
    console.log(req.body);
    const { sendername, receivername } = req.body;
    console.log(sendername,receivername);
    const user = await User.findOne({ username: receivername })
    console.log(user);
    if (!user) {
      console.log("isme ji")
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    // initialize array if not exists
    if (!user.friendRequests) {
      user.friendRequests = []
    }

    // avoid duplicates
    if (!user.friendRequests.includes(sendername)) {
      user.friendRequests.push(sendername)
    }
    
    await user.save()

    return res.status(200).json({
      success: true,
      message: "Friend request sent"
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Error sending friend request"
    })
  }
}
exports.friendrequestlist= async (req,res)=>{
  try{
  console.log("mai  backend mehu "
    );
    console.log(req.body);
  const {username}=req.body;
  const friendslist=await User.findOne({ username: username });
  if(!friendslist){
    console.log("error occurs");
    return {succes:false,message:"erorr in sending friendlist"};
  }
  console.log(friendslist)
  console.log(friendslist.friendRequests);
  return  res.status(200).json({
    friendslist:friendslist.friendRequests
  });
}
catch(error){
  console.log("database error",error);
  return res.status(500).json({success:false,message:"there is some error"});
}
}
exports.addinfriendlist=async (req,res)=>{
  const {persontobeadd,personwhoadd}=req.body;
  await User.updateOne(
    {username:personwhoadd},
    {
      $push:{
        friends:persontobeadd
      },
      $pull:{
        friendRequests:persontobeadd
      }
    },
  );
  return res.status(200).json({
    message:"data manipulated succesfully"
  });
}
exports.handleeditprofile = async (req, res) => {
  try {

    const { name, bio } = req.body;
    const userid = req.user._id;

    const updateuser = await User.findById(userid);

    updateuser.profile.name = name;
    updateuser.profile.bio = bio;

    // if image uploaded
    if (req.file) {

      const upload = await cloudinary.uploader.upload(req.file.path);

      updateuser.profile.img = upload.secure_url;
    }

    await updateuser.save();

    return res.status(200).json({
      success: true,
      user: updateuser,
      userdata: updateuser.profile
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Some error is there"
    });
  }
};
exports.provideuserprofile=async(req,res)=>{
  console.log(req.body);
  try{const {userid}=req.body;
  const user=await User.findOne({_id:userid});
  return res.status(200).json({
    profile:user.profile
  })}
  catch(err){
    return res.status(500).json({
      message:"eroor occured"
    })
  }
}
exports.getfrienddetails=async(req,res)=>{
  const {username}=req.body;
  const user=await User.findOne({username});
  const friendlist=user.friends;
  const data=await User.find({
    username:{$in:friendlist}
  })
  const profiledata=data.map((user)=>({
    username:user.username,
    name:user.profile.name,
    bio:user.profile.bio,
    image:user.profile.img
  }))
  console.log(profiledata);
  return res.status(200).json({
    profiledata:profiledata
  })
}

exports.providefriendlist=async(req,res)=>{
  const {username}=req.body;
  const user= await User.findOne({username});
  return res.status(200).json({
    friendlist:user.friends
  })
}