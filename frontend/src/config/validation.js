// Match the backend default MITS institutional enrollment email format.
export const MITS_EMAIL = /^[0-9]{2}[a-zA-Z]{2}[0-9]{1,2}[a-zA-Z]{2}[0-9]{2,3}@mitsgwl\.ac\.in$/i;
export const validEmail = email => MITS_EMAIL.test(String(email || '').trim());
