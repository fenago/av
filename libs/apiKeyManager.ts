import { Collection } from 'mongodb';
import { UserProfile, APIKeyInfo, APIKeyOverride, TokenUsage, UsageMetrics } from '@/types/user';
import { connectToUserProfilesDB } from './userProfile';
import { encryptAPIKey, decryptAPIKey, generateSalt, validateKeyHash, generateKeyHash } from './encryption';

// API Key Management Functions

export async function setUserAPIKey(
  userId: string, 
  plainAPIKey: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const collection = await connectToUserProfilesDB();
    const salt = generateSalt();
    const { encrypted, hash } = encryptAPIKey(plainAPIKey, salt);
    
    const apiKeyInfo: APIKeyInfo = {
      encryptedKey: encrypted,
      keyHash: hash,
      salt: salt,
      isValid: true,
      lastValidated: new Date(),
      addedAt: new Date(),
      keySource: 'user'
    };

    const result = await collection.updateOne(
      { userId },
      { 
        $set: { 
          apiKey: apiKeyInfo,
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );

    return { success: result.upsertedCount > 0 || result.modifiedCount > 0 };
  } catch (error) {
    console.error('Failed to set user API key:', error);
    return { success: false, error: 'Failed to save API key' };
  }
}

export async function getUserAPIKey(userId: string): Promise<string | null> {
  try {
    const collection = await connectToUserProfilesDB();
    const user = await collection.findOne({ userId });
    
    if (!user || !user.apiKey || !user.apiKey.encryptedKey || !user.apiKey.salt) {
      return null;
    }
    
    return decryptAPIKey(user.apiKey.encryptedKey, user.apiKey.salt);
  } catch (error) {
    console.error('Failed to get user API key:', error);
    return null;
  }
}

export async function validateUserAPIKey(
  userId: string, 
  plainAPIKey: string
): Promise<boolean> {
  try {
    const collection = await connectToUserProfilesDB();
    const user = await collection.findOne({ userId });
    
    if (!user?.apiKey?.keyHash) {
      return false;
    }
    
    return validateKeyHash(plainAPIKey, user.apiKey.keyHash);
  } catch (error) {
    console.error('Failed to validate user API key:', error);
    return false;
  }
}

export async function removeUserAPIKey(userId: string): Promise<boolean> {
  try {
    const collection = await connectToUserProfilesDB();
    const result = await collection.updateOne(
      { userId },
      { 
        $unset: { apiKey: 1 },
        $set: { updatedAt: new Date() }
      }
    );
    
    return result.modifiedCount > 0;
  } catch (error) {
    console.error('Failed to remove user API key:', error);
    return false;
  }
}

export async function getUserAPIKeyInfo(userId: string): Promise<APIKeyInfo | null> {
  try {
    const collection = await connectToUserProfilesDB();
    const user = await collection.findOne({ userId });
    
    if (!user || !user.apiKey) {
      return null;
    }

    // Return API key info without the encrypted key for security
    const { encryptedKey, ...safeInfo } = user.apiKey;
    return safeInfo as APIKeyInfo;
  } catch (error) {
    console.error('Failed to get user API key info:', error);
    return null;
  }
}

// Admin Override Functions

export async function setAdminOverride(
  userId: string,
  override: APIKeyOverride,
  adminUserId: string
): Promise<boolean> {
  try {
    const collection = await connectToUserProfilesDB();
    
    const overrideWithMetadata: APIKeyOverride = {
      ...override,
      activatedBy: adminUserId,
      activatedAt: new Date()
    };
    
    const result = await collection.updateOne(
      { userId },
      { 
        $set: { 
          adminOverride: overrideWithMetadata,
          updatedAt: new Date()
        }
      }
    );
    
    return result.modifiedCount > 0;
  } catch (error) {
    console.error('Failed to set admin override:', error);
    return false;
  }
}

export async function removeAdminOverride(userId: string): Promise<boolean> {
  try {
    const collection = await connectToUserProfilesDB();
    const result = await collection.updateOne(
      { userId },
      { 
        $unset: { adminOverride: 1 },
        $set: { updatedAt: new Date() }
      }
    );
    
    return result.modifiedCount > 0;
  } catch (error) {
    console.error('Failed to remove admin override:', error);
    return false;
  }
}

export async function getEffectiveAPIKey(userId: string): Promise<{
  key: string | null;
  source: 'user' | 'admin' | 'none';
  overrideActive: boolean;
}> {
  try {
    const collection = await connectToUserProfilesDB();
    const user = await collection.findOne({ userId });
    
    if (!user) {
      return { key: null, source: 'none', overrideActive: false };
    }
    
    // Check if admin override is active
    const hasActiveOverride = user.adminOverride?.isActive === true;
    const overrideNotExpired = !user.adminOverride?.expiresAt || 
                               user.adminOverride.expiresAt > new Date();
    
    if (hasActiveOverride && overrideNotExpired) {
      // Use admin key (would need admin key management)
      // For now, we'll implement admin key storage separately
      return { key: null, source: 'admin', overrideActive: true };
    }
    
    // Use user's own key
    if (user.apiKey?.encryptedKey && user.apiKey?.salt) {
      const userKey = decryptAPIKey(user.apiKey.encryptedKey, user.apiKey.salt);
      return { key: userKey, source: 'user', overrideActive: false };
    }
    
    return { key: null, source: 'none', overrideActive: false };
  } catch (error) {
    console.error('Failed to get effective API key:', error);
    return { key: null, source: 'none', overrideActive: false };
  }
}

// Token Usage Tracking Functions

export async function logTokenUsage(
  userId: string,
  usage: Omit<TokenUsage, 'timestamp'>
): Promise<boolean> {
  try {
    const collection = await connectToUserProfilesDB();
    
    const usageRecord: TokenUsage = {
      ...usage,
      timestamp: new Date()
    };
    
    const result = await collection.updateOne(
      { userId },
      { 
        $push: { tokenUsage: usageRecord },
        $set: { updatedAt: new Date() }
      }
    );
    
    // Also update aggregated metrics
    await updateUsageMetrics(userId);
    
    return result.modifiedCount > 0;
  } catch (error) {
    console.error('Failed to log token usage:', error);
    return false;
  }
}

export async function getUserTokenUsage(
  userId: string,
  startDate?: Date,
  endDate?: Date
): Promise<TokenUsage[]> {
  try {
    const collection = await connectToUserProfilesDB();
    const user = await collection.findOne({ userId });
    
    if (!user?.tokenUsage) {
      return [];
    }
    
    let usage = user.tokenUsage;
    
    // Filter by date range if provided
    if (startDate || endDate) {
      usage = usage.filter(record => {
        const recordDate = new Date(record.timestamp);
        if (startDate && recordDate < startDate) return false;
        if (endDate && recordDate > endDate) return false;
        return true;
      });
    }
    
    return usage.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  } catch (error) {
    console.error('Failed to get user token usage:', error);
    return [];
  }
}

export async function updateUsageMetrics(userId: string): Promise<boolean> {
  try {
    const collection = await connectToUserProfilesDB();
    const user = await collection.findOne({ userId });
    
    if (!user?.tokenUsage) {
      return true;
    }
    
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const currentDate = now.toISOString().split('T')[0];
    
    // Calculate daily metrics
    const dailyMetrics = new Map();
    const monthlyMetrics = new Map();
    let totalTokens = 0;
    let totalCost = 0;
    let totalRequests = 0;
    
    user.tokenUsage.forEach(record => {
      const recordDate = new Date(record.timestamp);
      const dateStr = recordDate.toISOString().split('T')[0];
      const monthStr = `${recordDate.getFullYear()}-${String(recordDate.getMonth() + 1).padStart(2, '0')}`;
      
      totalTokens += record.totalTokens;
      totalCost += record.cost;
      totalRequests += 1;
      
      // Daily aggregation
      if (!dailyMetrics.has(dateStr)) {
        dailyMetrics.set(dateStr, {
          date: dateStr,
          totalTokens: 0,
          totalCost: 0,
          requestCount: 0,
          modelBreakdown: {}
        });
      }
      
      const dailyData = dailyMetrics.get(dateStr);
      dailyData.totalTokens += record.totalTokens;
      dailyData.totalCost += record.cost;
      dailyData.requestCount += 1;
      
      if (!dailyData.modelBreakdown[record.model]) {
        dailyData.modelBreakdown[record.model] = { tokens: 0, cost: 0, requests: 0 };
      }
      dailyData.modelBreakdown[record.model].tokens += record.totalTokens;
      dailyData.modelBreakdown[record.model].cost += record.cost;
      dailyData.modelBreakdown[record.model].requests += 1;
      
      // Monthly aggregation
      if (!monthlyMetrics.has(monthStr)) {
        monthlyMetrics.set(monthStr, {
          month: monthStr,
          totalTokens: 0,
          totalCost: 0,
          requestCount: 0
        });
      }
      
      const monthlyData = monthlyMetrics.get(monthStr);
      monthlyData.totalTokens += record.totalTokens;
      monthlyData.totalCost += record.cost;
      monthlyData.requestCount += 1;
    });
    
    // Calculate current month totals
    const currentMonthData = monthlyMetrics.get(currentMonth) || {
      totalTokens: 0,
      totalCost: 0,
      requestCount: 0
    };
    
    const metrics: UsageMetrics = {
      daily: Array.from(dailyMetrics.values()).sort((a, b) => b.date.localeCompare(a.date)),
      monthly: Array.from(monthlyMetrics.values()).sort((a, b) => b.month.localeCompare(a.month)),
      totals: {
        allTimeTokens: totalTokens,
        allTimeCost: totalCost,
        allTimeRequests: totalRequests,
        currentMonthTokens: currentMonthData.totalTokens,
        currentMonthCost: currentMonthData.totalCost
      }
    };
    
    const result = await collection.updateOne(
      { userId },
      { 
        $set: { 
          usageMetrics: metrics,
          updatedAt: new Date()
        }
      }
    );
    
    return result.modifiedCount > 0;
  } catch (error) {
    console.error('Failed to update usage metrics:', error);
    return false;
  }
}

// Admin functions for viewing all users' usage
export async function getAllUsersUsage(): Promise<Array<{
  userId: string;
  email: string;
  name: string;
  role: string;
  metrics?: UsageMetrics;
  apiKeyStatus: 'user' | 'admin' | 'none';
  overrideActive: boolean;
}>> {
  try {
    const collection = await connectToUserProfilesDB();
    const users = await collection.find({}).toArray();
    
    return users.map(user => ({
      userId: user.userId,
      email: user.email,
      name: user.name,
      role: user.role,
      metrics: user.usageMetrics,
      apiKeyStatus: user.apiKey ? 'user' : 'none',
      overrideActive: user.adminOverride?.isActive === true
    }));
  } catch (error) {
    console.error('Failed to get all users usage:', error);
    return [];
  }
}
