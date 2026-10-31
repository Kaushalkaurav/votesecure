import mongoose from 'mongoose';
const schema=new mongoose.Schema({title:{type:String,required:true,trim:true},position:{type:String,required:true,trim:true},type:{type:String,required:true,trim:true},scope:{type:String,enum:['class','department','college','university','institution'],default:'college'},branch:{type:String},institution:{type:String,default:'MITS Gwalior'},startAt:{type:Date,required:true},endAt:{type:Date,required:true},publishedAt:Date,allowSelfVote:{type:Boolean,default:true},status:{type:String,enum:['draft','scheduled','cancelled'],default:'draft'},createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}}, {timestamps:true});
schema.index({institution:1,startAt:1});
export default mongoose.model('Election',schema);
