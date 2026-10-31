// Same authoritative pattern as backend environment default.
export const MITS_EMAIL=/^24mc10[a-zA-Z]{2}[0-9]{2}@mitsgwl\.ac\.in$/;
export const validEmail=email=>MITS_EMAIL.test(String(email||''));
