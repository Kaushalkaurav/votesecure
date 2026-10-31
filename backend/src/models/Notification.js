import mongoose from 'mongoose';
const schema=new mongoose.Schema({user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},election:{type:mongoose.Schema.Types.ObjectId,ref:'Election'},title:String,message:String,link:String,readAt:Date},{timestamps:true});
schema.index({user:1,createdAt:-1});
export default mongoose.model('Notification',schema);
