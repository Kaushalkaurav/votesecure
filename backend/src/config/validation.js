export const EMAIL_PATTERN = process.env.MITS_EMAIL_REGEX || '^24mc10[a-zA-Z]{2}[0-9]{2}@mitsgwl\\.ac\\.in$';
// JS default literal needs escaped slash; explicit tested constant is authoritative.
export const isMitsEmail = (email) => new RegExp(process.env.MITS_EMAIL_REGEX || '^24mc10[a-zA-Z]{2}[0-9]{2}@mitsgwl\\.ac\\.in$').test(String(email || ''));
export const cleanEmail = (s) => String(s||'').trim().toLowerCase();
export const fail = (message,status=400) => Object.assign(new Error(message),{status});
