import { UserRole } from '../types';

// RBAC Constants
export const RBAC = {
  ROLES: {
    ADMIN: 'ADMIN' as UserRole,
    OPERATOR: 'OPERATOR' as UserRole,
    VIEWER: 'VIEWER' as UserRole,
  },
  
  PERMISSIONS: {
    // Calendar permissions
    CALENDAR_READ: 'calendar:read',
    CALENDAR_WRITE: 'calendar:write',
    CALENDAR_DELETE: 'calendar:delete',
    
    // Contract permissions
    CONTRACT_READ: 'contract:read',
    CONTRACT_WRITE: 'contract:write',
    CONTRACT_DELETE: 'contract:delete',
    
    // Asset permissions
    ASSET_READ: 'asset:read',
    ASSET_WRITE: 'asset:write',
    ASSET_DELETE: 'asset:delete',
    
    // Vulnerability permissions
    VULN_READ: 'vuln:read',
    VULN_WRITE: 'vuln:write',
    
    // Settings permissions
    SETTINGS_READ: 'settings:read',
    SETTINGS_WRITE: 'settings:write',
    
    // User management
    USER_READ: 'user:read',
    USER_WRITE: 'user:write',
    USER_DELETE: 'user:delete',
    
    // Audit logs
    AUDIT_READ: 'audit:read',
  },
  
  ROLE_PERMISSIONS: {
    [UserRole.ADMIN]: [
      'calendar:read', 'calendar:write', 'calendar:delete',
      'contract:read', 'contract:write', 'contract:delete',
      'asset:read', 'asset:write', 'asset:delete',
      'vuln:read', 'vuln:write',
      'settings:read', 'settings:write',
      'user:read', 'user:write', 'user:delete',
      'audit:read',
    ],
    [UserRole.OPERATOR]: [
      'calendar:read', 'calendar:write',
      'contract:read', 'contract:write',
      'asset:read', 'asset:write',
      'vuln:read', 'vuln:write',
      'settings:read',
    ],
    [UserRole.VIEWER]: [
      'calendar:read',
      'contract:read',
      'asset:read',
      'vuln:read',
    ],
  },
} as const;

// Color mapping for different entities
export const COLORS = {
  // Event Type Colors
  EVENT_TYPES: {
    MAINTENANCE: '#FF6B35',
    DEPLOYMENT: '#4ECDC4',
    RETIREMENT: '#95E1D3',
    VULNERABILITY: '#FF5722',
    CONTRACT_RENEWAL: '#2196F3',
    COMPLIANCE: '#9C27B0',
    OTHER: '#607D8B',
  },
  
  // Priority Colors
  PRIORITIES: {
    LOW: '#4CAF50',
    MEDIUM: '#FF9800',
    HIGH: '#FF5722',
    CRITICAL: '#F44336',
  },
  
  // Lifecycle Bucket Colors
  LIFECYCLE_BUCKETS: {
    NEW: '#4CAF50',
    ACTIVE: '#2196F3',
    MATURE: '#FF9800',
    LEGACY: '#FF5722',
    EOL: '#9E9E9E',
  },
  
  // Asset Status Colors
  ASSET_STATUS: {
    ACTIVE: '#4CAF50',
    MAINTENANCE: '#FF9800',
    RETIRED: '#9E9E9E',
    DISPOSED: '#424242',
  },
  
  // Vulnerability Severity Colors
  VULN_SEVERITY: {
    LOW: '#4CAF50',
    MEDIUM: '#FF9800',
    HIGH: '#FF5722',
    CRITICAL: '#F44336',
  },
  
  // Alert Severity Colors
  ALERT_SEVERITY: {
    INFO: '#2196F3',
    WARNING: '#FF9800',
    ERROR: '#F44336',
  },
  
  // Job Status Colors
  JOB_STATUS: {
    PENDING: '#9E9E9E',
    RUNNING: '#2196F3',
    COMPLETED: '#4CAF50',
    FAILED: '#F44336',
  },
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
  },
  
  CALENDAR: {
    EVENTS: '/calendar/events',
    EXPORT: '/calendar/export',
  },
  
  CONTRACTS: {
    BASE: '/contracts',
    IMPORT: '/contracts/import',
    EXPORT: '/contracts/export',
  },
  
  ASSETS: {
    BASE: '/assets',
    IMPORT: '/assets/import',
    EXPORT: '/assets/export',
  },
  
  LIFECYCLE: {
    CATALOG: '/lifecycle/catalog',
    RECONCILE: '/lifecycle/reconcile',
  },
  
  VULNERABILITIES: {
    BASE: '/vulnerabilities',
    FINDINGS: '/vulnerabilities/findings',
    SCAN: '/vulnerabilities/scan',
  },
  
  ALERTS: {
    BASE: '/alerts',
    SCHEDULE: '/alerts/schedule',
  },
  
  SETTINGS: {
    BASE: '/settings',
  },
  
  AI: {
    NORMALIZE: '/ai/normalize',
    EOL_EXTRACT: '/ai/eol-extract',
  },
  
  AUDIT: {
    LOGS: '/audit/logs',
  },
  
  JOBS: {
    BASE: '/jobs',
    STATUS: '/jobs/status',
  },
} as const;

// Default pagination settings
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

// Date formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  INPUT: 'yyyy-MM-dd',
  DATETIME: 'MMM dd, yyyy HH:mm',
  ISO: 'yyyy-MM-dd\'T\'HH:mm:ss.SSSxxx',
} as const;