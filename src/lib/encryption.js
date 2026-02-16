import crypto from 'crypto';
import "server-only";

// Ensure key is exactly 32 bytes. If env var is set, use it (hashed to 32 bytes if needed or ensure it is).
// For simplicity in this dev environment, we'll use a fixed 32-char string if env is missing.
const RAW_KEY = process.env.ENCRYPTION_KEY || '12345678901234567890123456789012';

// Helper to ensure key is 32 bytes
function getKey() {
    return crypto.createHash('sha256').update(String(RAW_KEY)).digest();
}

const IV_LENGTH = 16; // For AES, this is always 16

export function encrypt(text) {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', getKey(), iv);
    let encrypted = cipher.update(text);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export function decrypt(text) {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', getKey(), iv);
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
}
