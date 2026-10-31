import mongoose from 'mongoose';

export const connectDb = async()=>{
 await mongoose.connect(process.env.MONGO_URI,{serverSelectionTimeoutMS:10000});
 console.log('MongoDB connected');
 const hello=await mongoose.connection.db.admin().command({hello:1});
 if(!hello.setName){
   console.warn('VoteSecure: standalone MongoDB detected. Election scheduling, voting and result publication require a replica set for atomic transactions.');
   console.warn('Configure a local single-node replica set or use a hosted MongoDB replica set; do not bypass transactions.');
 }else{
   console.log('MongoDB replica set ready:',hello.setName);
 }
};
export const requireTransactionSupport=async()=>{
 const hello=await mongoose.connection.db.admin().command({hello:1});
 if(!hello.setName) {
   const error=new Error('MongoDB is running standalone. To schedule elections, enable a replica set (for local development: mongod --replSet rs0, then rs.initiate()) or use MongoDB Atlas.');
   error.status=503;
   throw error;
 }
};
