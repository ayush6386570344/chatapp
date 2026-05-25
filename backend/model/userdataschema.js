const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    // unique: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },
  friendRequests: [
    {
      type: String  
    }
  ],

  friends: [
    {
      type: String   
    }
  ],
  profile:{
    name:{
      type:String,
      default:""
    },
    bio:{
      type:String,
      default:""
    },
    img:{
      type:String,
      default:"profile_martin.png"
    }
  }

},{timestamps:true})
module.exports = mongoose.model("User", userSchema)