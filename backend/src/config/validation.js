export const EMAIL_PATTERN = process.env.MITS_EMAIL_REGEX || '^[0-9]{2}[a-zA-Z]{2}[0-9]{1,2}[a-zA-Z]{2}[0-9]{2,3}@mitsgwl\\.ac\\.in$';
export const isMitsEmail = (email) => new RegExp(EMAIL_PATTERN,'i').test(String(email || '').trim());
export const cleanEmail = (s) => String(s||'').trim().toLowerCase();
export const fail = (message,status=400) => Object.assign(new Error(message),{status});
