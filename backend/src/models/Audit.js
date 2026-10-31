import mongoose from 'mongoose';
const schema=new mongoose.Schema({action:{type:String,required:true},actor:{type:mongoose.Schema.Types.ObjectId,ref:'User'},election:{type:mongoose.Schema.Types.ObjectId,ref:'Election'},detail:{type:String,maxlength:500}},{timestamps:true});
schema.index({election:1,createdAt:-1});
export default mongoose.model('Audit',schema);
