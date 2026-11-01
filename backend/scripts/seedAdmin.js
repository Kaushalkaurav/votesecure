import 'dotenv/config';import mongoose from 'mongoose';import bcrypt from 'bcryptjs';import User from '../src/models/User.js';import {cleanEmail,isMitsEmail} from '../src/config/validation.js';
const email=cleanEmail(process.env.ADMIN_EMAIL),password=process.env.ADMIN_INITIAL_PASSWORD;
if(!isMitsEmail(email)||!password)throw Error('Set ADMIN_EMAIL and ADMIN_INITIAL_PASSWORD');
await mongoose.connect(process.env.MONGO_URI);
try{let user=await User.findOne({email}).select('+passwordHash');
if(user){if(user.role==='admin')throw Error('Admin already configured; no changes made');
if(!await bcrypt.compare(password,user.passwordHash))throw Error('Existing account password does not match ADMIN_INITIAL_PASSWORD. Admin was not promoted.');
user.role='admin';user.approved=true;user.emailVerified=true;user.profileComplete=true;user.name=user.name||'Election Administrator';user.branch=user.branch||'Administration';user.year=user.year||1;await user.save();console.log('Existing verified-by-password account promoted to admin');
}else{if(password.length<16)throw Error('New administrator password must be at least 16 characters');await User.create({email,passwordHash:await bcrypt.hash(password,12),name:'Election Administrator',role:'admin',approved:true,emailVerified:true,profileComplete:true,branch:'Administration',year:1});console.log('Admin account created');}
}finally{await mongoose.disconnect();}
