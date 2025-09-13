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

export interface Activity {
  id: string;
  type: 'login' | 'password_updated' | 'breach_check' | 'generator_used' | 'vault_access';
  description: string;
  timestamp: Date;
  icon: string;
  severity?: 'low' | 'medium' | 'high';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: Date;
  category: 'security' | 'activity' | 'learning';
  points: number;
}

export interface SecurityInsight {
  id: string;
  type: 'warning' | 'suggestion' | 'achievement';
  title: string;
  description: string;
  icon: string;
  priority: 'high' | 'medium' | 'low';
  actionable: boolean;
}

export interface UserStats {
  securityPoints: number;
  badgesEarned: number;
  loginStreak: number;
  totalLogins: number;
  passwordsCreated: number;
  breachesAvoided: number;
}

export interface BreachLocation {
  id: string;
  passwordId: string;
  breachName: string;
  location: {
    lat: number;
    lng: number;
    city: string;
    country: string;
  };
  date: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
}