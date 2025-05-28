// User roles and types for LearningScience.ai
export enum UserRole {
  FREE = "FREE",
  INSTRUCTOR = "INSTRUCTOR", 
  DEPARTMENT = "DEPARTMENT",
  INSTITUTION = "INSTITUTION",
  ADMIN = "ADMIN"
}

// API Key Management Types
export interface APIKeyInfo {
  encryptedKey?: string; // AES-256 encrypted Gemini API key
  keyHash?: string; // Hash for validation without decryption
  salt?: string; // Individual salt for this key
  isValid: boolean;
  lastValidated?: Date;
  addedAt?: Date;
  expiresAt?: Date;
  keySource: 'user' | 'admin'; // Who provided the key
}

// Token Usage Tracking Types
export interface TokenUsage {
  model: string; // e.g., 'gemini-2.0-flash-exp', 'gemini-2.0-flash-thinking-exp' 
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  cost: number; // In USD
  timestamp: Date;
  sessionId?: string; // Optional session grouping
  requestId?: string; // Unique request identifier
}

export interface UsageMetrics {
  daily: {
    date: string; // YYYY-MM-DD
    totalTokens: number;
    totalCost: number;
    requestCount: number;
    modelBreakdown: Record<string, {
      tokens: number;
      cost: number;
      requests: number;
    }>;
  }[];
  monthly: {
    month: string; // YYYY-MM
    totalTokens: number;
    totalCost: number;
    requestCount: number;
  }[];
  totals: {
    allTimeTokens: number;
    allTimeCost: number;
    allTimeRequests: number;
    currentMonthTokens: number;
    currentMonthCost: number;
  };
}

// Admin Override Configuration
export interface APIKeyOverride {
  isActive: boolean;
  reason?: string;
  activatedBy?: string; // Admin user ID
  activatedAt?: Date;
  expiresAt?: Date; // For temporary overrides
  notifyUser: boolean;
  conditions?: {
    onMissingKey: boolean;
    onRateLimitExceeded: boolean;
    onKeyExpired: boolean;
  };
}

export interface UserProfile {
  _id?: string;
  userId: string; // NextAuth user id
  email: string;
  name: string;
  role: UserRole;
  
  // API Key Management
  apiKey?: APIKeyInfo;
  adminOverride?: APIKeyOverride;
  
  // Token Usage Tracking
  tokenUsage?: TokenUsage[]; // Individual usage records
  usageMetrics?: UsageMetrics; // Aggregated metrics
  usageLimits?: {
    dailyTokenLimit?: number;
    monthlyTokenLimit?: number;
    dailyCostLimit?: number; // In USD
    monthlyCostLimit?: number; // In USD
    alertThresholds?: {
      tokens: number; // Percentage (e.g., 80 for 80%)
      cost: number; // Percentage
    };
  };
  
  subscription?: {
    plan: UserRole;
    status: 'active' | 'inactive' | 'trial' | 'cancelled';
    startDate: Date;
    endDate?: Date;
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
  };
  features: {
    maxStudents: number;
    maxProfessors: number;
    maxCourses: number;
    hasAdvancedAnalytics: boolean;
    hasCustomBranding: boolean;
    hasLMSIntegration: boolean;
    hasPrioritySupport: boolean;
    hasAPIAccess: boolean;
  };
  usage: {
    studentsCount: number;
    professorsCount: number;
    coursesCount: number;
    lastActive: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

export const ROLE_FEATURES: Record<UserRole, UserProfile['features']> = {
  [UserRole.FREE]: {
    maxStudents: 25,
    maxProfessors: 1,
    maxCourses: 1,
    hasAdvancedAnalytics: false,
    hasCustomBranding: false,
    hasLMSIntegration: false,
    hasPrioritySupport: false,
    hasAPIAccess: false,
  },
  [UserRole.INSTRUCTOR]: {
    maxStudents: 25,
    maxProfessors: 1,
    maxCourses: 5,
    hasAdvancedAnalytics: true,
    hasCustomBranding: false,
    hasLMSIntegration: false,
    hasPrioritySupport: false,
    hasAPIAccess: true,
  },
  [UserRole.DEPARTMENT]: {
    maxStudents: 500,
    maxProfessors: 10,
    maxCourses: 50,
    hasAdvancedAnalytics: true,
    hasCustomBranding: true,
    hasPrioritySupport: true,
    hasLMSIntegration: false,
    hasAPIAccess: true,
  },
  [UserRole.INSTITUTION]: {
    maxStudents: 5000,
    maxProfessors: 100,
    maxCourses: 500,
    hasAdvancedAnalytics: true,
    hasCustomBranding: true,
    hasPrioritySupport: true,
    hasLMSIntegration: true,
    hasAPIAccess: true,
  },
  [UserRole.ADMIN]: {
    maxStudents: Infinity,
    maxProfessors: Infinity,
    maxCourses: Infinity,
    hasAdvancedAnalytics: true,
    hasCustomBranding: true,
    hasPrioritySupport: true,
    hasLMSIntegration: true,
    hasAPIAccess: true,
  },
};
