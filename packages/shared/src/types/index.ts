// User and Authentication Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  OPERATOR = 'OPERATOR',
  VIEWER = 'VIEWER',
}

// Calendar and Event Types
export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  eventType: EventType;
  priority: Priority;
  assetId?: string;
  contractId?: string;
  lifecycleBucket: LifecycleBucket;
  createdAt: Date;
  updatedAt: Date;
}

export enum EventType {
  MAINTENANCE = 'MAINTENANCE',
  DEPLOYMENT = 'DEPLOYMENT',
  RETIREMENT = 'RETIREMENT',
  VULNERABILITY = 'VULNERABILITY',
  CONTRACT_RENEWAL = 'CONTRACT_RENEWAL',
  COMPLIANCE = 'COMPLIANCE',
  OTHER = 'OTHER',
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

// Asset and Contract Types
export interface Asset {
  id: string;
  name: string;
  type: string;
  model: string;
  serialNumber?: string;
  purchaseDate?: Date;
  warrantyExpiry?: Date;
  status: AssetStatus;
  contractId?: string;
  lifecycleBucket: LifecycleBucket;
  riskScore: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum AssetStatus {
  ACTIVE = 'ACTIVE',
  MAINTENANCE = 'MAINTENANCE',
  RETIRED = 'RETIRED',
  DISPOSED = 'DISPOSED',
}

export interface Contract {
  id: string;
  vendor: string;
  contractNumber: string;
  startDate: Date;
  endDate: Date;
  value: number;
  status: ContractStatus;
  renewalNoticeMonths: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum ContractStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  TERMINATED = 'TERMINATED',
  PENDING = 'PENDING',
}

// Lifecycle Types
export enum LifecycleBucket {
  NEW = 'NEW',
  ACTIVE = 'ACTIVE',
  MATURE = 'MATURE',
  LEGACY = 'LEGACY',
  EOL = 'EOL',
}

export interface LifecycleCatalogEntry {
  id: string;
  vendor: string;
  product: string;
  version: string;
  releaseDate?: Date;
  endOfSupport?: Date;
  endOfLife?: Date;
  bucket: LifecycleBucket;
  createdAt: Date;
  updatedAt: Date;
}

// Vulnerability Types
export interface Vulnerability {
  id: string;
  cveId: string;
  title: string;
  description: string;
  severity: VulnerabilitySeverity;
  cvssScore: number;
  publishedDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export enum VulnerabilitySeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export interface VulnerabilityFinding {
  id: string;
  vulnerabilityId: string;
  assetId: string;
  status: FindingStatus;
  discoveredAt: Date;
  resolvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export enum FindingStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  FALSE_POSITIVE = 'FALSE_POSITIVE',
}

// Alert and Notification Types
export interface Alert {
  id: string;
  title: string;
  message: string;
  type: AlertType;
  severity: AlertSeverity;
  targetRoles: UserRole[];
  scheduleType: ScheduleType;
  scheduleConfig: Record<string, any>;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum AlertType {
  CONTRACT_EXPIRY = 'CONTRACT_EXPIRY',
  VULNERABILITY = 'VULNERABILITY',
  LIFECYCLE = 'LIFECYCLE',
  MAINTENANCE = 'MAINTENANCE',
  COMPLIANCE = 'COMPLIANCE',
}

export enum AlertSeverity {
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
}

export enum ScheduleType {
  IMMEDIATE = 'IMMEDIATE',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
}

// Settings Types
export interface Setting {
  id: string;
  key: string;
  value: string;
  description?: string;
  category: SettingCategory;
  isSecret: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum SettingCategory {
  GENERAL = 'GENERAL',
  AUTH = 'AUTH',
  NOTIFICATIONS = 'NOTIFICATIONS',
  INTEGRATIONS = 'INTEGRATIONS',
  AI = 'AI',
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Job and Audit Types
export interface Job {
  id: string;
  name: string;
  status: JobStatus;
  startedAt?: Date;
  completedAt?: Date;
  error?: string;
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export enum JobStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId?: string;
  oldValues?: Record<string, any>;
  newValues?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}