import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/next-auth';
import { connectToUserProfilesDB } from '@/libs/userProfile';

interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  totalTokens: number;
  totalCost: number;
  avgTokensPerUser: number;
  topModels: Array<{ name: string; usage: number; percentage: number }>;
  usageTrend: Array<{ date: string; tokens: number; cost: number }>;
  userBreakdown: Array<{ userId: string; tokens: number; cost: number; lastActive: string }>;
}

interface ForecastData {
  projectedUsage: number;
  projectedCost: number;
  confidenceLevel: number;
  trend: 'increasing' | 'decreasing' | 'stable';
}

// Helper function to calculate cost based on tokens and model
function calculateCost(inputTokens: number, outputTokens: number, model: string): number {
  // Gemini Pro pricing (as of 2024)
  const pricing = {
    'gemini-pro': { input: 0.0005, output: 0.0015 }, // per 1K tokens
    'gemini-pro-vision': { input: 0.0005, output: 0.0015 },
    'gemini-1.5-pro': { input: 0.00125, output: 0.00375 },
    'gemini-1.5-flash': { input: 0.000075, output: 0.0003 }
  };
  
  const modelPricing = pricing[model as keyof typeof pricing] || pricing['gemini-pro'];
  return ((inputTokens * modelPricing.input) + (outputTokens * modelPricing.output)) / 1000;
}

// Generate forecasting data using simple trend analysis
function generateForecast(usageTrend: Array<{ date: string; tokens: number; cost: number }>): ForecastData {
  if (usageTrend.length < 3) {
    return {
      projectedUsage: 0,
      projectedCost: 0,
      confidenceLevel: 0,
      trend: 'stable'
    };
  }

  // Calculate linear trend
  const recentData = usageTrend.slice(-7); // Last 7 days
  const avgGrowthRate = recentData.reduce((acc, data, index) => {
    if (index === 0) return acc;
    const prevData = recentData[index - 1];
    const growthRate = (data.tokens - prevData.tokens) / prevData.tokens;
    return acc + growthRate;
  }, 0) / (recentData.length - 1);

  const lastPeriodTokens = recentData[recentData.length - 1].tokens;
  const lastPeriodCost = recentData[recentData.length - 1].cost;
  
  // Project next 30 days
  const projectedUsage = Math.max(0, lastPeriodTokens * (1 + avgGrowthRate * 30));
  const projectedCost = Math.max(0, lastPeriodCost * (1 + avgGrowthRate * 30));
  
  const trend = avgGrowthRate > 0.05 ? 'increasing' : 
                avgGrowthRate < -0.05 ? 'decreasing' : 'stable';
  
  const confidenceLevel = Math.min(95, Math.max(50, 85 - Math.abs(avgGrowthRate) * 100));

  return {
    projectedUsage: Math.round(projectedUsage),
    projectedCost: Number(projectedCost.toFixed(2)),
    confidenceLevel: Math.round(confidenceLevel),
    trend
  };
}

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

    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || '7d';
    
    // Calculate date range
    const now = new Date();
    const daysBack = range === '24h' ? 1 : 
                    range === '7d' ? 7 :
                    range === '30d' ? 30 :
                    range === '90d' ? 90 : 7;
    
    const startDate = new Date(now.getTime() - (daysBack * 24 * 60 * 60 * 1000));

    const collection = await connectToUserProfilesDB();
    
    // Get all users with usage data
    const users = await collection.find({
      $or: [
        { 'usageMetrics.totals.allTimeTokens': { $gt: 0 } },
        { updatedAt: { $gte: startDate } }
      ]
    }).toArray();

    // Calculate analytics
    let totalTokens = 0;
    let totalCost = 0;
    let activeUsers = 0;
    const modelUsage: { [key: string]: number } = {};
    const userBreakdown: Array<{ userId: string; tokens: number; cost: number; lastActive: string }> = [];
    const dailyUsage: { [key: string]: { tokens: number; cost: number } } = {};

    users.forEach(user => {
      const hasUsage = user.usageMetrics?.totals?.allTimeTokens > 0;
      if (hasUsage) {
        activeUsers++;
        const userTotalTokens = user.usageMetrics.totals.allTimeTokens || 0;
        totalTokens += userTotalTokens;
        
        // Calculate cost
        const userCost = user.usageMetrics.totals.allTimeCost || 0;
        totalCost += userCost;

        // Track model usage from recent token usage records
        if (user.tokenUsage && user.tokenUsage.length > 0) {
          const recentUsage = user.tokenUsage.slice(-10); // Last 10 requests
          recentUsage.forEach(usage => {
            const model = usage.model || 'gemini-pro';
            modelUsage[model] = (modelUsage[model] || 0) + usage.totalTokens;
          });
        }

        // User breakdown
        userBreakdown.push({
          userId: user.userId || user._id.toString(),
          tokens: userTotalTokens,
          cost: userCost,
          lastActive: user.tokenUsage?.length > 0 
            ? user.tokenUsage[user.tokenUsage.length - 1].timestamp.toISOString().split('T')[0]
            : 'Unknown'
        });

        // Daily usage from usageMetrics
        if (user.usageMetrics?.daily) {
          user.usageMetrics.daily.forEach(dayData => {
            if (!dailyUsage[dayData.date]) {
              dailyUsage[dayData.date] = { tokens: 0, cost: 0 };
            }
            dailyUsage[dayData.date].tokens += dayData.totalTokens;
            dailyUsage[dayData.date].cost += dayData.totalCost;
          });
        }
      }
    });

    // Prepare model breakdown
    const totalModelTokens = Object.values(modelUsage).reduce((sum, tokens) => sum + tokens, 0);
    const topModels = Object.entries(modelUsage)
      .map(([name, usage]) => ({
        name,
        usage,
        percentage: totalModelTokens > 0 ? (usage / totalModelTokens) * 100 : 0
      }))
      .sort((a, b) => b.usage - a.usage)
      .slice(0, 5);

    // Prepare usage trend
    const usageTrend = Object.entries(dailyUsage)
      .map(([date, data]) => ({ date, ...data }))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-30); // Last 30 days

    // Sort user breakdown by tokens (descending)
    userBreakdown.sort((a, b) => b.tokens - a.tokens);

    const analyticsData: AnalyticsData = {
      totalUsers: users.length,
      activeUsers,
      totalTokens,
      totalCost: Number(totalCost.toFixed(2)),
      avgTokensPerUser: activeUsers > 0 ? Math.round(totalTokens / activeUsers) : 0,
      topModels,
      usageTrend,
      userBreakdown: userBreakdown.slice(0, 20) // Top 20 users
    };

    const forecastData = generateForecast(usageTrend);

    return NextResponse.json({
      analytics: analyticsData,
      forecast: forecastData,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}
