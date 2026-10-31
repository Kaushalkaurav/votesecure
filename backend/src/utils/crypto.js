import crypto from 'node:crypto';
const ballotKey=()=>{const s=process.env.BALLOT_KEY_HEX;if(!/^[a-f0-9]{64}$/i.test(s||''))throw Error('BALLOT_KEY_HEX must contain 64 hex chars');return Buffer.from(s,'hex');};
export const encryptChoice=(candidateId)=>{const iv=crypto.randomBytes(12);const cipher=crypto.createCipheriv('aes-256-gcm',ballotKey(),iv);const ciphertext=Buffer.concat([cipher.update(String(candidateId),'utf8'),cipher.final()]);return {iv:iv.toString('hex'),tag:cipher.getAuthTag().toString('hex'),ciphertext:ciphertext.toString('hex')};};
export const decryptChoice=(v)=>{const decipher=crypto.createDecipheriv('aes-256-gcm',ballotKey(),Buffer.from(v.iv,'hex'));decipher.setAuthTag(Buffer.from(v.tag,'hex'));return Buffer.concat([decipher.update(Buffer.from(v.ciphertext,'hex')),decipher.final()]).toString('utf8');};
export const receipt=()=>crypto.createHmac('sha256',process.env.RECEIPT_SECRET).update(crypto.randomBytes(32)).digest('hex');
export const randomOtp=()=>String(crypto.randomInt(100000,1000000));
export const hashOtp=(otp)=>crypto.createHmac('sha256',process.env.RECEIPT_SECRET).update(String(otp)).digest('hex');
