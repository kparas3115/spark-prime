import { Password, SecurityMetrics, TOTPCode, Activity, Achievement, SecurityInsight, UserStats, BreachLocation } from '@/types';

export const mockPasswords: Password[] = [
  {
    id: '1',
    title: 'GitHub',
    username: 'student@university.edu',
    password: 'MySecureGitHub123!',
    website: 'github.com',
    category: 'work',
    strength: 85,
    lastUpdated: new Date('2024-01-15'),
    isFavorite: true,
    tags: ['coding', 'portfolio']
  },
  {
    id: '2',
    title: 'Netflix',
    username: 'student@gmail.com',
    password: 'WatchMovies456#',
    website: 'netflix.com',
    category: 'entertainment',
    strength: 78,
    lastUpdated: new Date('2024-01-10'),
    tags: ['streaming']
  },
  {
    id: '3',
    title: 'University Portal',
    username: 'john.doe',
    password: 'password123',
    website: 'portal.university.edu',
    category: 'education',
    strength: 25,
    lastUpdated: new Date('2024-01-01'),
    isCompromised: true,
    tags: ['school', 'grades']
  },
  {
    id: '4',
    title: 'Instagram',
    username: '@johndoe_student',
    password: 'InstaSecure789$',
    website: 'instagram.com',
    category: 'social',
    strength: 82,
    lastUpdated: new Date('2024-01-12'),
    isFavorite: true,
    tags: ['social-media']
  },
];

export const mockSecurityMetrics: SecurityMetrics = {
  totalPasswords: 4,
  strongPasswords: 2,
  weakPasswords: 2,
  compromisedPasswords: 1,
  reusedPasswords: 0,
  averageStrength: 67.5,
  securityScore: 68,
  lastBreachCheck: new Date('2024-01-21')
};

export const mockUserStats: UserStats = {
  securityPoints: 260,
  badgesEarned: 4,
  loginStreak: 7,
  totalLogins: 42,
  passwordsCreated: 12,
  breachesAvoided: 3
};

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'login',
    description: 'Login - Just now',
    timestamp: new Date(),
    icon: '🔐',
    severity: 'low'
  },
  {
    id: '2',
    type: 'login',
    description: 'Login - 3 days ago',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    icon: '🔐',
    severity: 'low'
  },
  {
    id: '3',
    type: 'login',
    description: 'Login - 3 days ago',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    icon: '🔐',
    severity: 'low'
  },
  {
    id: '4',
    type: 'breach_check',
    description: 'Breach scan completed',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    icon: '🛡️',
    severity: 'medium'
  },
  {
    id: '5',
    type: 'password_updated',
    description: 'Password updated for University Portal',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    icon: '🔄',
    severity: 'high'
  }
];

export const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Security Novice',
    description: 'Created your first strong password',
    icon: '🛡️',
    earned: true,
    earnedDate: new Date('2024-01-10'),
    category: 'security',
    points: 50
  },
  {
    id: '2',
    title: 'Breach Detector',
    description: 'Identified and fixed a compromised password',
    icon: '🔍',
    earned: true,
    earnedDate: new Date('2024-01-15'),
    category: 'security',
    points: 100
  },
  {
    id: '3',
    title: 'Daily User',
    description: 'Used FORTIPass for 7 consecutive days',
    icon: '📅',
    earned: true,
    earnedDate: new Date('2024-01-20'),
    category: 'activity',
    points: 75
  },
  {
    id: '4',
    title: 'Password Master',
    description: 'Maintained 90%+ security score for a week',
    icon: '👑',
    earned: true,
    earnedDate: new Date('2024-01-18'),
    category: 'security',
    points: 150
  },
  {
    id: '5',
    title: 'FOSS Advocate',
    description: 'Complete the security learning module',
    icon: '🎓',
    earned: false,
    category: 'learning',
    points: 200
  }
];

export const mockSecurityInsights: SecurityInsight[] = [
  {
    id: '1',
    type: 'warning',
    title: 'You have 1 weak password(s)',
    description: 'Consider strengthening them with more characters and complexity.',
    icon: 'AlertTriangle',
    priority: 'high',
    actionable: true
  },
  {
    id: '2',
    type: 'suggestion',
    title: '1 of your passwords are shorter than 12 characters',
    description: 'Longer passwords are significantly more secure.',
    icon: 'Key',
    priority: 'medium',
    actionable: true
  },
  {
    id: '3',
    type: 'suggestion',
    title: 'Consider adding more of your accounts',
    description: 'to ensure all your digital assets are properly secured.',
    icon: 'Plus',
    priority: 'low',
    actionable: false
  }
];

export const mockBreachLocations: BreachLocation[] = [
  {
    id: '1',
    passwordId: '3',
    breachName: 'DataBreach2023',
    location: {
      lat: 40.7128,
      lng: -74.0060,
      city: 'New York',
      country: 'United States'
    },
    date: new Date('2023-10-15'),
    severity: 'high'
  }
];

export const mockTOTPCodes: TOTPCode[] = [
  {
    id: '1',
    label: 'GitHub',
    secret: 'JBSWY3DPEHPK3PXP',
    code: '123456',
    timeRemaining: 25
  },
  {
    id: '2',
    label: 'Google Account',
    secret: 'HXDMVJECJJWSRB3HWIZR4IFUGFTMXBOZ',
    code: '789012',
    timeRemaining: 25
  },
  {
    id: '3',
    label: 'Discord',
    secret: 'JBSWY3DPEHPK3PXQ',
    code: '345678',
    timeRemaining: 25
  }
];