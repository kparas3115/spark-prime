export interface Password {
  id: string;
  title: string;
  username: string;
  password: string;
  website: string;
  category: 'social' | 'banking' | 'education' | 'entertainment' | 'work' | 'other';
  strength: number;
  lastUpdated: Date;
  notes?: string;
  isFavorite?: boolean;
  isCompromised?: boolean;
  tags?: string[];
}

export interface SecurityMetrics {
  totalPasswords: number;
  strongPasswords: number;
  weakPasswords: number;
  compromisedPasswords: number;
  reusedPasswords: number;
  averageStrength: number;
  securityScore: number;
  lastBreachCheck: Date;
}

export interface PasswordStrengthResult {
  score: number;
  strength: 'very-weak' | 'weak' | 'fair' | 'good' | 'strong';
  feedback: string[];
  timeToHack: string;
  entropy: number;
}

export interface BreachData {
  isBreached: boolean;
  breachCount: number;
  lastBreach?: string;
  breaches?: string[];
}

export interface TOTPCode {
  id: string;
  label: string;
  secret: string;
  code: string;
  timeRemaining: number;
}