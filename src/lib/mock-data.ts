import { Password, SecurityMetrics, TOTPCode } from '@/types';

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
  {
    id: '5',
    title: 'Bank Account',
    username: 'john.doe@email.com',
    password: 'BankSafe2024!@#',
    website: 'mybank.com',
    category: 'banking',
    strength: 95,
    lastUpdated: new Date('2024-01-20'),
    isFavorite: true,
    tags: ['finance', 'important']
  },
  {
    id: '6',
    title: 'Spotify',
    username: 'musiclover123',
    password: 'MusicLife456',
    website: 'spotify.com',
    category: 'entertainment',
    strength: 65,
    lastUpdated: new Date('2024-01-08'),
    tags: ['music', 'streaming']
  }
];

export const mockSecurityMetrics: SecurityMetrics = {
  totalPasswords: 6,
  strongPasswords: 2,
  weakPasswords: 2,
  compromisedPasswords: 1,
  reusedPasswords: 0,
  averageStrength: 71.8,
  securityScore: 74,
  lastBreachCheck: new Date('2024-01-21')
};

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