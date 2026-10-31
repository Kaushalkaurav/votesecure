import mongoose from 'mongoose';
// Intentionally contains no voter identity; separated from participation ledger.
const schema=new mongoose.Schema({election:{type:mongoose.Schema.Types.ObjectId,ref:'Election',required:true},iv:{type:String,required:true},tag:{type:String,required:true},ciphertext:{type:String,required:true},receipt:{type:String,required:true,unique:true}}, {versionKey:false});
schema.index({election:1});
export default mongoose.model('Vote',schema);
