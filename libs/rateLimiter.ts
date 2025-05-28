import { Collection, Db, MongoClient } from 'mongodb';

interface RateLimit {
  userId: string;
  endpoint: string;
  requests: number;
  tokens: number;
  resetTime: Date;
  windowStart: Date;
}

interface UserQuota {
  userId: string;
  role: string;
  dailyTokens: number;
  monthlyTokens: number;
  requestsThisMinute: number;
  lastReset: Date;
  quotaExceeded: boolean;
}

// Rate limits by user role
const RATE_LIMITS = {
  FREE: {
    requestsPerMinute: 10,
    tokensPerDay: 10000,
    tokensPerMonth: 100000,
    maxTokensPerRequest: 1024,
  },
  INSTRUCTOR: {
    requestsPerMinute: 30,
    tokensPerDay: 50000,
    tokensPerMonth: 500000,
    maxTokensPerRequest: 2048,
  },
  DEPARTMENT: {
    requestsPerMinute: 100,
    tokensPerDay: 500000,
    tokensPerMonth: 5000000,
    maxTokensPerRequest: 4096,
  },
  INSTITUTION: {
    requestsPerMinute: 500,
    tokensPerDay: 2000000,
    tokensPerMonth: 20000000,
    maxTokensPerRequest: 8192,
  },
  ADMIN: {
    requestsPerMinute: 1000,
    tokensPerDay: 10000000,
    tokensPerMonth: 100000000,
    maxTokensPerRequest: 16384,
  },
};

// MongoDB connection for rate limiting
let client: MongoClient;
let db: Db;
let initialized = false;

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'learningscience';

class RateLimiterService {
  private static instance: RateLimiterService;
  private db: Db | null = null;
  private rateLimitsCollection: Collection<RateLimit> | null = null;
  private quotasCollection: Collection<UserQuota> | null = null;

  private constructor() {}

  public static getInstance(): RateLimiterService {
    if (!RateLimiterService.instance) {
      RateLimiterService.instance = new RateLimiterService();
    }
    return RateLimiterService.instance;
  }

  private async initialize() {
    if (!initialized) {
      if (!MONGODB_URI) {
        throw new Error('MONGODB_URI environment variable is not set');
      }

      try {
        client = new MongoClient(MONGODB_URI);
        await client.connect();
        db = client.db(DB_NAME);
        this.db = db;
        this.rateLimitsCollection = this.db.collection<RateLimit>('rateLimits');
        this.quotasCollection = this.db.collection<UserQuota>('userQuotas');

        // Create indexes for better performance
        await this.rateLimitsCollection.createIndex(
          { userId: 1, endpoint: 1 }, 
          { unique: true }
        );
        await this.rateLimitsCollection.createIndex(
          { resetTime: 1 }, 
          { expireAfterSeconds: 0 }
        );
        await this.quotasCollection.createIndex({ userId: 1 }, { unique: true });
        
        initialized = true;
      } catch (error) {
        console.error('Failed to connect to MongoDB for rate limiting:', error);
        throw error;
      }
    }
  }

  public async checkRateLimit(
    userId: string, 
    userRole: string, 
    endpoint: string = 'general',
    estimatedTokens: number = 0
  ): Promise<{
    allowed: boolean;
    error?: string;
    retryAfter?: number;
    remaining?: {
      requests: number;
      tokens: number;
    };
  }> {
    await this.initialize();

    const limits = RATE_LIMITS[userRole as keyof typeof RATE_LIMITS] || RATE_LIMITS.FREE;
    const now = new Date();
    const windowStart = new Date(now.getTime() - 60000); // 1 minute window

    try {
      // Check request rate limit (per minute)
      const requestCheck = await this.checkRequestLimit(userId, endpoint, limits.requestsPerMinute, windowStart, now);
      if (!requestCheck.allowed) {
        return requestCheck;
      }

      // Check token limits (daily/monthly)
      const tokenCheck = await this.checkTokenLimits(userId, userRole, estimatedTokens, limits);
      if (!tokenCheck.allowed) {
        return tokenCheck;
      }

      // Update counters
      await this.updateCounters(userId, endpoint, estimatedTokens, now);

      return {
        allowed: true,
        remaining: {
          requests: limits.requestsPerMinute - (requestCheck.currentRequests || 0),
          tokens: limits.tokensPerDay - (tokenCheck.dailyTokens || 0),
        }
      };

    } catch (error) {
      console.error('Rate limit check error:', error);
      // In case of error, allow the request but log it
      return { allowed: true };
    }
  }

  private async checkRequestLimit(
    userId: string,
    endpoint: string,
    maxRequests: number,
    windowStart: Date,
    now: Date
  ) {
    const rateLimit = await this.rateLimitsCollection?.findOne({
      userId,
      endpoint,
      windowStart: { $gte: windowStart }
    });

    const currentRequests = rateLimit?.requests || 0;

    if (currentRequests >= maxRequests) {
      const retryAfter = Math.ceil((rateLimit!.resetTime.getTime() - now.getTime()) / 1000);
      return {
        allowed: false,
        error: `Rate limit exceeded. Too many requests. Try again in ${retryAfter} seconds.`,
        retryAfter,
        currentRequests,
      };
    }

    return { allowed: true, currentRequests };
  }

  private async checkTokenLimits(
    userId: string,
    userRole: string,
    estimatedTokens: number,
    limits: any
  ) {
    const quota = await this.quotasCollection?.findOne({ userId });
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    let dailyTokens = 0;
    let monthlyTokens = 0;

    if (quota) {
      // Reset daily counter if it's a new day
      if (quota.lastReset < todayStart) {
        dailyTokens = 0;
      } else {
        dailyTokens = quota.dailyTokens;
      }
      monthlyTokens = quota.monthlyTokens;
    }

    // Check if adding estimated tokens would exceed limits
    if (dailyTokens + estimatedTokens > limits.tokensPerDay) {
      return {
        allowed: false,
        error: `Daily token limit exceeded. Limit: ${limits.tokensPerDay.toLocaleString()}, Used: ${dailyTokens.toLocaleString()}`,
        dailyTokens,
      };
    }

    if (monthlyTokens + estimatedTokens > limits.tokensPerMonth) {
      return {
        allowed: false,
        error: `Monthly token limit exceeded. Limit: ${limits.tokensPerMonth.toLocaleString()}, Used: ${monthlyTokens.toLocaleString()}`,
        monthlyTokens,
      };
    }

    return { allowed: true, dailyTokens, monthlyTokens };
  }

  private async updateCounters(
    userId: string,
    endpoint: string,
    tokensUsed: number,
    now: Date
  ) {
    const windowStart = new Date(now.getTime() - 60000);
    const resetTime = new Date(now.getTime() + 60000);
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Update rate limit counter
    await this.rateLimitsCollection?.updateOne(
      { userId, endpoint },
      {
        $inc: { requests: 1 },
        $setOnInsert: { windowStart, resetTime },
        $set: { resetTime }
      },
      { upsert: true }
    );

    // Update token quota
    await this.quotasCollection?.updateOne(
      { userId },
      {
        $inc: { 
          dailyTokens: tokensUsed,
          monthlyTokens: tokensUsed 
        },
        $set: { lastReset: todayStart },
        $setOnInsert: { 
          role: 'FREE',
          requestsThisMinute: 0,
          quotaExceeded: false 
        }
      },
      { upsert: true }
    );
  }

  public async getUserQuota(userId: string): Promise<UserQuota | null> {
    await this.initialize();
    return await this.quotasCollection?.findOne({ userId }) || null;
  }

  public async resetUserQuota(userId: string, resetType: 'daily' | 'monthly' | 'all' = 'all') {
    await this.initialize();
    
    const updateFields: any = {};
    
    if (resetType === 'daily' || resetType === 'all') {
      updateFields.dailyTokens = 0;
    }
    
    if (resetType === 'monthly' || resetType === 'all') {
      updateFields.monthlyTokens = 0;
    }
    
    updateFields.quotaExceeded = false;
    updateFields.lastReset = new Date();

    await this.quotasCollection?.updateOne(
      { userId },
      { $set: updateFields }
    );
  }

  public async getTopUsers(limit: number = 10): Promise<UserQuota[]> {
    await this.initialize();
    return await this.quotasCollection
      ?.find({})
      .sort({ monthlyTokens: -1 })
      .limit(limit)
      .toArray() || [];
  }

  public async getUserStats(userId: string) {
    await this.initialize();
    
    const quota = await this.quotasCollection?.findOne({ userId });
    const rateLimits = await this.rateLimitsCollection?.find({ userId }).toArray();
    
    return {
      quota,
      rateLimits,
      timestamp: new Date(),
    };
  }

  // Clean up expired rate limit records
  public async cleanup() {
    await this.initialize();
    const now = new Date();
    
    await this.rateLimitsCollection?.deleteMany({
      resetTime: { $lt: now }
    });
  }

  // Admin function to set custom limits for a user
  public async setCustomLimit(
    userId: string, 
    customLimits: Partial<typeof RATE_LIMITS.FREE>
  ) {
    await this.initialize();
    // Implementation for custom user limits
    // This could be stored in a separate collection
  }
}

export default RateLimiterService.getInstance();
export { RATE_LIMITS };
