import { LifecycleBucket } from '../types';

/**
 * Calculates the lifecycle bucket for an asset based on its age and support dates
 */
export function calculateLifecycleBucket(
  releaseDate?: Date,
  endOfSupport?: Date,
  endOfLife?: Date
): LifecycleBucket {
  const now = new Date();
  
  // If no dates provided, default to ACTIVE
  if (!releaseDate) {
    return LifecycleBucket.ACTIVE;
  }
  
  const ageInYears = (now.getTime() - releaseDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
  
  // Check if already EOL
  if (endOfLife && now >= endOfLife) {
    return LifecycleBucket.EOL;
  }
  
  // Check if approaching EOL (within 6 months)
  if (endOfLife) {
    const monthsToEOL = (endOfLife.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30);
    if (monthsToEOL <= 6) {
      return LifecycleBucket.LEGACY;
    }
  }
  
  // Check if past end of support
  if (endOfSupport && now >= endOfSupport) {
    return LifecycleBucket.LEGACY;
  }
  
  // Check if approaching end of support (within 12 months)
  if (endOfSupport) {
    const monthsToEOS = (endOfSupport.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30);
    if (monthsToEOS <= 12) {
      return LifecycleBucket.MATURE;
    }
  }
  
  // Age-based buckets
  if (ageInYears < 1) {
    return LifecycleBucket.NEW;
  } else if (ageInYears < 3) {
    return LifecycleBucket.ACTIVE;
  } else {
    return LifecycleBucket.MATURE;
  }
}

/**
 * Formats a date to a readable string
 */
export function formatDate(date: Date | string, format = 'MMM dd, yyyy'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(d.getTime())) {
    return 'Invalid Date';
  }
  
  const options: Intl.DateTimeFormatOptions = {};
  
  switch (format) {
    case 'MMM dd, yyyy':
      options.year = 'numeric';
      options.month = 'short';
      options.day = '2-digit';
      break;
    case 'yyyy-MM-dd': {
      const isoString = d.toISOString();
      return isoString.split('T')[0] || '';
    }
    case 'MMM dd, yyyy HH:mm':
      options.year = 'numeric';
      options.month = 'short';
      options.day = '2-digit';
      options.hour = '2-digit';
      options.minute = '2-digit';
      break;
    default:
      return d.toLocaleDateString();
  }
  
  return d.toLocaleDateString('en-US', options);
}

/**
 * Calculates days until a date
 */
export function daysUntil(date: Date | string): number {
  const target = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffTime = target.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Checks if a date is within a specified number of days
 */
export function isWithinDays(date: Date | string, days: number): boolean {
  const daysUntilDate = daysUntil(date);
  return daysUntilDate >= 0 && daysUntilDate <= days;
}

/**
 * Validates an email address
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Generates a random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Capitalizes the first letter of a string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Converts enum value to display label
 */
export function enumToLabel(value: string): string {
  return value
    .split('_')
    .map(word => capitalize(word))
    .join(' ');
}

/**
 * Debounce function for API calls
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: any;
  
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Deep clones an object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T;
  }
  
  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as unknown as T;
  }
  
  if (typeof obj === 'object') {
    const cloned = {} as { [key: string]: any };
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        cloned[key] = deepClone(obj[key]);
      }
    }
    return cloned as T;
  }
  
  return obj;
}

/**
 * Safely parses JSON string
 */
export function safeJsonParse<T>(jsonString: string, defaultValue: T): T {
  try {
    return JSON.parse(jsonString);
  } catch {
    return defaultValue;
  }
}

/**
 * Calculates risk score based on multiple factors
 */
export function calculateRiskScore(factors: {
  vulnerabilityCount: number;
  criticalVulnCount: number;
  lifecycleBucket: LifecycleBucket;
  contractExpiresDays: number;
  maintenanceOverdue: boolean;
}): number {
  let score = 0;
  
  // Vulnerability scoring
  score += factors.vulnerabilityCount * 2;
  score += factors.criticalVulnCount * 10;
  
  // Lifecycle scoring
  switch (factors.lifecycleBucket) {
    case LifecycleBucket.EOL:
      score += 50;
      break;
    case LifecycleBucket.LEGACY:
      score += 30;
      break;
    case LifecycleBucket.MATURE:
      score += 10;
      break;
    case LifecycleBucket.ACTIVE:
      score += 5;
      break;
    case LifecycleBucket.NEW:
      score += 0;
      break;
  }
  
  // Contract expiry scoring
  if (factors.contractExpiresDays <= 30) {
    score += 25;
  } else if (factors.contractExpiresDays <= 90) {
    score += 15;
  } else if (factors.contractExpiresDays <= 180) {
    score += 5;
  }
  
  // Maintenance scoring
  if (factors.maintenanceOverdue) {
    score += 20;
  }
  
  // Cap at 100
  return Math.min(score, 100);
}