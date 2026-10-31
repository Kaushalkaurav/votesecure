import mongoose from 'mongoose';

const uri = 'mongodb://127.0.0.1:27017/admin?directConnection=true';
const clientOptions = { serverSelectionTimeoutMS: 10000, directConnection: true };
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

try {
  await mongoose.connect(uri, clientOptions);
  const admin = mongoose.connection.db.admin();
  let hello = await admin.command({ hello: 1 });
  if (hello.setName && hello.setName !== 'rs0') {
    throw new Error('MongoDB already belongs to a different replica set: ' + hello.setName + '. No changes made.');
  }
  if (!hello.setName) {
    const config = { _id: 'rs0', members: [{ _id: 0, host: 'localhost:27017' }] };
    try {
      await admin.command({ replSetInitiate: config });
      console.log('Replica set initialization requested.');
    } catch (error) {
      if (!/already initialized/i.test(error.message)) throw error;
      console.log('Replica set was already initialized.');
    }
  }
  let ready = false;
  for (let i = 0; i < 30; i += 1) {
    await sleep(1000);
    try {
      hello = await admin.command({ hello: 1 });
      if (hello.setName === 'rs0' && hello.isWritablePrimary) {
        ready = true;
        break;
      }
    } catch { /* election happens asynchronously */ }
  }
  if (!ready) throw new Error('Replica set not PRIMARY yet. Check MongoDB logs and connection configuration.');
  console.log('SUCCESS: MongoDB replica set rs0 PRIMARY. VoteSecure transactions are supported.');
} catch (error) {
  console.error('Replica set setup failed:', error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
