import nodemailer from 'nodemailer';
export async function sendOtp(to,code){
 const subject='VoteSecure verification code';
 const text='Your VoteSecure verification code is '+code+'. It expires in 10 minutes. Never share this code.';
 if(process.env.RESEND_API_KEY){
  if(!process.env.RESEND_FROM)throw Error('RESEND_FROM must be configured');
  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),10000);
  try{
   const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+process.env.RESEND_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({from:process.env.RESEND_FROM,to:[to],subject,text}),signal:controller.signal});
   if(!response.ok){console.error('Email provider rejected OTP request',response.status);throw Error('OTP email delivery failed');}
  }finally{clearTimeout(timeout);}
  return;
 }
 if(!process.env.SMTP_HOST||!process.env.SMTP_USER||!process.env.SMTP_PASS||!process.env.SMTP_FROM)throw Error('Email delivery is not configured');
 const transport=nodemailer.createTransport({host:process.env.SMTP_HOST,port:Number(process.env.SMTP_PORT||587),secure:Number(process.env.SMTP_PORT)===465,auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}});
 await transport.sendMail({from:process.env.SMTP_FROM,to,subject,text});
}
