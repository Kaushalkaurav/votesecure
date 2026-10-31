import mongoose from 'mongoose';
const schema=new mongoose.Schema({election:{type:mongoose.Schema.Types.ObjectId,ref:'Election',required:true},user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}}, {timestamps:true});
schema.index({election:1,user:1},{unique:true});
export default mongoose.model('Participation',schema);
