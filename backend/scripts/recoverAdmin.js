import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import User from '../src/models/User.js';
import { cleanEmail, isMitsEmail } from '../src/config/validation.js';

const email = cleanEmail(process.env.ADMIN_EMAIL);
if (!isMitsEmail(email)) throw Error('Configure a valid ADMIN_EMAIL in backend/.env');
if (!process.stdin.isTTY) throw Error('Run this recovery interactively from your own terminal');
const uri = new URL(process.env.MONGO_URI || '');
if (!['localhost','127.0.0.1','::1','[::1]'].includes(uri.hostname)) {
  throw Error('Recovery is restricted to a local MongoDB instance');
}
const rl = createInterface({input,output});
try {
  await mongoose.connect(process.env.MONGO_URI,{serverSelectionTimeoutMS:5000});
  const user = await User.findOne({email}).select('+passwordHash');
  if (!user) throw Error('No account with ADMIN_EMAIL. Use npm run seed:admin instead.');
  if (user.role !== 'admin') throw Error('Account is not an administrator. Use seed:admin with its existing password to promote it.');
  console.log('Admin account found. This command will reset its password without changing role or deleting data.');
  const confirmation = await rl.question('Type RESET ADMIN PASSWORD to continue: ');
  if (confirmation !== 'RESET ADMIN PASSWORD') throw Error('Cancelled');
  const password = await rl.question('Enter NEW password (input will be visible; use a private terminal): ');
  if (password.length < 16 || password.length > 128) throw Error('Password must contain 16-128 characters');
  const again = await rl.question('Repeat NEW password: ');
  if (password !== again) throw Error('Passwords do not match');
  await User.updateOne({_id:user._id,role:'admin'},{$set:{passwordHash:await bcrypt.hash(password,12)}});
  console.log('Administrator password reset successfully. Sign in with the new password.');
} finally {
  rl.close();
  await mongoose.disconnect();
}
