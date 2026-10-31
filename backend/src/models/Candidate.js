import mongoose from 'mongoose';
const schema=new mongoose.Schema({election:{type:mongoose.Schema.Types.ObjectId,ref:'Election',required:true},user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},manifesto:{type:String,maxlength:3000,default:''},description:{type:String,maxlength:1000,default:''},symbol:{type:String,maxlength:100,default:''},photoUrl:{type:String,maxlength:1000,default:''},status:{type:String,enum:['pending','approved','rejected'],default:'pending'},reviewedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},reviewedAt:Date}, {timestamps:true});
schema.index({election:1,user:1},{unique:true});
export default mongoose.model('Candidate',schema);
