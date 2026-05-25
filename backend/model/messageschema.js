let mongoose=require('mongoose');
let messageschema=new mongoose.Schema({
    senderid:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    receiverid:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    text:{type:String},
    image:{type:String},
    seen:{type:Boolean,default:false}
},{timestamps:true});
module.exports=mongoose.model("Message",messageschema);