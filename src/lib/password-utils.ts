import CryptoJS from 'crypto-js';
import { PasswordStrengthResult, BreachData } from '@/types';

// Encryption key - in production, this would be user-derived
const ENCRYPTION_KEY = 'fortipass-demo-key';

export const encryptPassword = (password: string): string => {
  return CryptoJS.AES.encrypt(password, ENCRYPTION_KEY).toString();
};

export const decryptPassword = (encryptedPassword: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const analyzePasswordStrength = (password: string): PasswordStrengthResult => {
  let score = 0;
  const feedback: string[] = [];
  
  // Length analysis
  if (password.length >= 12) score += 25;
  else if (password.length >= 8) score += 15;
  else feedback.push('Use at least 8 characters');

  // Character variety
  if (/[a-z]/.test(password)) score += 15;
  else feedback.push('Add lowercase letters');
  
  if (/[A-Z]/.test(password)) score += 15;
  else feedback.push('Add uppercase letters');
  
  if (/\d/.test(password)) score += 15;
  else feedback.push('Add numbers');
  
  if (/[^a-zA-Z\d]/.test(password)) score += 20;
  else feedback.push('Add special characters');

  // Advanced patterns
  if (password.length >= 16) score += 10;
  if (!/(.)\1{2,}/.test(password)) score += 5; // No repeated chars
  else feedback.push('Avoid repeated characters');

  // Calculate entropy
  const entropy = Math.log2(Math.pow(getCharsetSize(password), password.length));
  
  // Time to hack estimation
  const timeToHack = calculateTimeToHack(entropy);

  let strength: PasswordStrengthResult['strength'];
  if (score >= 85) strength = 'strong';
  else if (score >= 70) strength = 'good';
  else if (score >= 50) strength = 'fair';
  else if (score >= 25) strength = 'weak';
  else strength = 'very-weak';

  return {
    score: Math.min(100, score),
    strength,
    feedback,
    timeToHack,
    entropy: Math.round(entropy)
  };
};

const getCharsetSize = (password: string): number => {
  let size = 0;
  if (/[a-z]/.test(password)) size += 26;
  if (/[A-Z]/.test(password)) size += 26;
  if (/\d/.test(password)) size += 10;
  if (/[^a-zA-Z\d]/.test(password)) size += 32;
  return size;
};

const calculateTimeToHack = (entropy: number): string => {
  const secondsToHack = Math.pow(2, entropy - 1) / 1000000000; // Assuming 1B guesses/sec
  
  if (secondsToHack < 60) return 'Instantly';
  if (secondsToHack < 3600) return `${Math.round(secondsToHack / 60)} minutes`;
  if (secondsToHack < 86400) return `${Math.round(secondsToHack / 3600)} hours`;
  if (secondsToHack < 31536000) return `${Math.round(secondsToHack / 86400)} days`;
  if (secondsToHack < 31536000000) return `${Math.round(secondsToHack / 31536000)} years`;
  return `${Math.round(secondsToHack / 31536000000)} centuries`;
};

export const generateSecurePassword = (
  length: number = 16,
  includeUppercase: boolean = true,
  includeLowercase: boolean = true,
  includeNumbers: boolean = true,
  includeSymbols: boolean = true
): string => {
  let charset = '';
  if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (includeNumbers) charset += '0123456789';
  if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

  let password = '';
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  
  for (let i = 0; i < length; i++) {
    password += charset.charAt(array[i] % charset.length);
  }
  
  return password;
};

// Mock breach check - in production would use HaveIBeenPwned API
export const checkPasswordBreach = async (password: string): Promise<BreachData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock common breached passwords for demo
  const commonBreachedPasswords = [
    'password', '123456', 'password123', 'admin', 'letmein', 
    'welcome', 'monkey', 'dragon', 'qwerty', '111111'
  ];
  
  const isBreached = commonBreachedPasswords.includes(password.toLowerCase());
  
  return {
    isBreached,
    breachCount: isBreached ? Math.floor(Math.random() * 100000) + 1000 : 0,
    lastBreach: isBreached ? '2023-10-15' : undefined,
    breaches: isBreached ? ['DataBreach2023', 'MegaCorp Leak'] : undefined
  };
};

export const generateTOTP = (secret: string): { code: string; timeRemaining: number } => {
  // Mock TOTP generation - in production would use proper TOTP library
  const now = Math.floor(Date.now() / 1000);
  const timeStep = 30;
  const currentStep = Math.floor(now / timeStep);
  
  // Generate 6-digit code based on current time step
  const code = ((currentStep * 123456) % 1000000).toString().padStart(6, '0');
  const timeRemaining = timeStep - (now % timeStep);
  
  return { code, timeRemaining };
};