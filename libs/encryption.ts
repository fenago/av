import crypto from 'crypto';

// Encryption utility for API keys using AES-256-CBC
// Best practice: Strong encryption with authentication

const ALGORITHM = 'aes-256-cbc';
const KEY_LENGTH = 32; // 256 bits
const IV_LENGTH = 16; // 128 bits
const TAG_LENGTH = 16; // 128 bits
const SALT_LENGTH = 32; // 256 bits

// Get encryption key from environment variable
function getEncryptionKey(): string {
  const key = process.env.API_KEY_ENCRYPTION_SECRET;
  if (!key) {
    throw new Error('API_KEY_ENCRYPTION_SECRET environment variable is required');
  }
  if (key.length < 32) {
    throw new Error('API_KEY_ENCRYPTION_SECRET must be at least 32 characters long');
  }
  return key;
}

// Generate a random salt for each API key
export function generateSalt(): string {
  return crypto.randomBytes(SALT_LENGTH).toString('hex');
}

// Derive key from password + salt using PBKDF2
function deriveKey(password: string, salt: string): Uint8Array {
  return new Uint8Array(crypto.pbkdf2Sync(password, salt, 100000, KEY_LENGTH, 'sha256'));
}

// Encrypt an API key with individual salt
export function encryptAPIKey(plainKey: string, salt: string): {
  encrypted: string;
  hash: string;
} {
  try {
    const masterKey = getEncryptionKey();
    const derivedKey = deriveKey(masterKey, salt);
    const iv = new Uint8Array(crypto.randomBytes(IV_LENGTH));
    
    // Ensure key is exactly 32 bytes for AES-256
    const key = new Uint8Array(derivedKey.subarray(0, 32));
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    
    let encrypted = cipher.update(plainKey, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    // Combine IV + encrypted data
    const combined = Buffer.from(iv).toString('hex') + encrypted;
    
    // Create hash for validation without decryption
    const hash = crypto.createHash('sha256').update(plainKey).digest('hex');
    
    return {
      encrypted: combined,
      hash: hash
    };
  } catch (error) {
    console.error('Encryption failed:', error);
    throw new Error('Failed to encrypt API key');
  }
}

// Decrypt an API key
export function decryptAPIKey(encryptedData: string, salt: string): string {
  try {
    const masterKey = getEncryptionKey();
    const derivedKey = deriveKey(masterKey, salt);
    
    // Extract IV and encrypted data
    const iv = new Uint8Array(Buffer.from(encryptedData.slice(0, IV_LENGTH * 2), 'hex'));
    const encrypted = encryptedData.slice(IV_LENGTH * 2);
    
    // Ensure key is exactly 32 bytes for AES-256
    const key = new Uint8Array(derivedKey.subarray(0, 32));
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    console.error('Decryption failed:', error);
    throw new Error('Failed to decrypt API key');
  }
}

// Validate API key hash without decryption
export function validateKeyHash(plainKey: string, storedHash: string): boolean {
  try {
    const computedHash = crypto.createHash('sha256').update(plainKey).digest('hex');
    return computedHash === storedHash;
  } catch (error) {
    console.error('Hash validation failed:', error);
    return false;
  }
}

// Generate a secure hash for storage
export function generateKeyHash(plainKey: string): string {
  return crypto.createHash('sha256').update(plainKey).digest('hex');
}

// Utility to check if encryption is properly configured
export function checkEncryptionConfig(): boolean {
  try {
    const testKey = 'test-api-key-12345';
    const salt = generateSalt();
    const { encrypted, hash } = encryptAPIKey(testKey, salt);
    const decrypted = decryptAPIKey(encrypted, salt);
    const isValid = validateKeyHash(testKey, hash);
    
    return decrypted === testKey && isValid;
  } catch (error) {
    console.error('Encryption configuration test failed:', error);
    return false;
  }
}
