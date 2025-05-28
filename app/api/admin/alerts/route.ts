import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/next-auth';
import { connectToUserProfilesDB } from '@/libs/userProfile';

interface Alert {
  id: string;
  type: 'high-usage' | 'high-cost' | 'inactive-users' | 'no-api-key';
  severity: 'info' | 'warning' | 'critical';
  message: string;
  timestamp: Date;
  affectedUsers: string[];
  details: any[];
}

interface AlertThresholds {
  dailyTokenLimit: number;
  costLimit: number;
  inactiveDays: number;
  usageSpikeFactor: number;
}

const DEFAULT_THRESHOLDS: AlertThresholds = {
  dailyTokenLimit: 100000,
  costLimit: 50,
  inactiveDays: 30,
  usageSpikeFactor: 3
};

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Check if user is admin
    const isAdmin = session.user.email === process.env.ADMIN_EMAIL || 
                   (session.user as any).role === 'admin';
    
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    const collection = await connectToUserProfilesDB();
    
    // Get all users
    const users = await collection.find({}).toArray();

    // Check for various alert conditions
    const alerts: Alert[] = [];

    // 1. High usage alerts
    const highUsageUsers = users.filter(user => {
      const totalTokens = user.usageMetrics?.totals?.allTimeTokens || 0;
      return totalTokens > 100000; // 100k tokens threshold
    });

    if (highUsageUsers.length > 0) {
      alerts.push({
        id: `high-usage-${Date.now()}`,
        type: 'high-usage',
        severity: 'warning',
        message: `${highUsageUsers.length} users have exceeded 100k token usage`,
        timestamp: new Date(),
        affectedUsers: highUsageUsers.map(u => u.userId),
        details: highUsageUsers.map(u => ({
          userId: u.userId,
          tokens: u.usageMetrics?.totals?.allTimeTokens || 0
        }))
      });
    }

    // 2. Cost alerts
    const highCostUsers = users.filter(user => {
      const totalCost = user.usageMetrics?.totals?.allTimeCost || 0;
      return totalCost > 100; // $100 threshold
    });

    if (highCostUsers.length > 0) {
      alerts.push({
        id: `high-cost-${Date.now()}`,
        type: 'high-cost',
        severity: 'critical',
        message: `${highCostUsers.length} users have exceeded $100 in API costs`,
        timestamp: new Date(),
        affectedUsers: highCostUsers.map(u => u.userId),
        details: highCostUsers.map(u => ({
          userId: u.userId,
          cost: u.usageMetrics?.totals?.allTimeCost || 0
        }))
      });
    }

    // 3. Check for inactive users with API keys
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
    const inactiveUsers = users.filter(user => {
      const hasApiKey = user.apiKey?.encryptedKey;
      const lastUsage = user.tokenUsage?.length > 0 
        ? user.tokenUsage[user.tokenUsage.length - 1].timestamp 
        : null;
      return hasApiKey && (!lastUsage || lastUsage < threeDaysAgo);
    });

    if (inactiveUsers.length > 0) {
      alerts.push({
        id: `inactive-users-${Date.now()}`,
        type: 'inactive-users',
        severity: 'info',
        message: `${inactiveUsers.length} users with API keys haven't been active in the last 3 days`,
        timestamp: new Date(),
        affectedUsers: inactiveUsers.map(u => u.userId),
        details: inactiveUsers.map(u => ({
          userId: u.userId,
          lastActive: u.tokenUsage?.length > 0 
            ? u.tokenUsage[u.tokenUsage.length - 1].timestamp.toISOString()
            : 'Never'
        }))
      });
    }

    // 4. API key issues
    const usersWithoutKeys = users.filter(user => 
      !user.apiKey?.encryptedKey && !user.apiKey?.keyHash
    );

    if (usersWithoutKeys.length > 5) {
      alerts.push({
        id: `no-api-keys-${Date.now()}`,
        type: 'no-api-key',
        severity: 'warning',
        message: `${usersWithoutKeys.length} users don't have API keys configured`,
        timestamp: new Date(),
        affectedUsers: usersWithoutKeys.map(u => u.userId),
        details: usersWithoutKeys.map(u => ({
          userId: u.userId,
          hasKey: !!u.apiKey?.encryptedKey || !!u.apiKey?.keyHash
        }))
      });
    }

    // Calculate summary statistics
    const summary = {
      totalAlerts: alerts.length,
      critical: alerts.filter(a => a.severity === 'critical').length,
      warning: alerts.filter(a => a.severity === 'warning').length,
      info: alerts.filter(a => a.severity === 'info').length,
      byType: {
        'high-usage': alerts.filter(a => a.type === 'high-usage').length,
        'high-cost': alerts.filter(a => a.type === 'high-cost').length,
        'inactive-users': alerts.filter(a => a.type === 'inactive-users').length,
        'no-api-key': alerts.filter(a => a.type === 'no-api-key').length
      }
    };

    return NextResponse.json({
      alerts,
      summary,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Alerts API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch alerts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Check if user is admin
    const isAdmin = session.user.email === process.env.ADMIN_EMAIL || 
                   (session.user as any).role === 'admin';
    
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { action, alertId, thresholds } = body;

    if (action === 'resolve' && alertId) {
      // In a real implementation, you'd save resolved alerts to a database
      return NextResponse.json({
        success: true,
        message: `Alert ${alertId} resolved`,
        timestamp: new Date().toISOString()
      });
    }

    if (action === 'update_thresholds' && thresholds) {
      // In a real implementation, you'd save these thresholds to a database
      return NextResponse.json({
        success: true,
        message: 'Alert thresholds updated',
        thresholds,
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Alerts API error:', error);
    return NextResponse.json(
      { error: 'Failed to process alert action' },
      { status: 500 }
    );
  }
}
