import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/next-auth';
import { connectToUserProfilesDB } from '@/libs/userProfile';

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
    const format = searchParams.get('format') || 'csv';
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

    // Prepare data for export
    const exportData = users.map(user => ({
      userId: user.userId || user._id.toString(),
      email: user.email || 'N/A',
      totalTokens: user.usageMetrics?.totals?.allTimeTokens || 0,
      inputTokens: user.tokenUsage?.reduce((sum, usage) => sum + usage.promptTokens, 0) || 0,
      outputTokens: user.tokenUsage?.reduce((sum, usage) => sum + usage.completionTokens, 0) || 0,
      lastModel: user.tokenUsage?.length > 0 ? user.tokenUsage[user.tokenUsage.length - 1].model : 'N/A',
      lastUpdated: user.tokenUsage?.length > 0 ? user.tokenUsage[user.tokenUsage.length - 1].timestamp.toISOString() : 'N/A',
      apiKeyStatus: user.apiKey ? 'Active' : 'None',
      joinDate: user.createdAt?.toISOString() || 'N/A',
      isActive: (user.usageMetrics?.totals?.allTimeTokens || 0) > 0,
      estimatedCost: user.usageMetrics?.totals?.allTimeCost || 0
    }));

    if (format === 'csv') {
      // Generate CSV
      const headers = [
        'User ID',
        'Email', 
        'Total Tokens',
        'Input Tokens',
        'Output Tokens',
        'Last Model',
        'Last Updated',
        'API Key Status',
        'Join Date',
        'Is Active',
        'Estimated Cost ($)'
      ];

      const csvContent = [
        headers.join(','),
        ...exportData.map(row => [
          row.userId,
          row.email,
          row.totalTokens,
          row.inputTokens,
          row.outputTokens,
          row.lastModel,
          row.lastUpdated,
          row.apiKeyStatus,
          row.joinDate,
          row.isActive,
          row.estimatedCost
        ].join(','))
      ].join('\n');

      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="analytics-${range}-${new Date().toISOString().split('T')[0]}.csv"`
        }
      });
    } else {
      // Generate JSON
      const jsonData = {
        exportDate: new Date().toISOString(),
        dateRange: range,
        totalRecords: exportData.length,
        summary: {
          totalUsers: exportData.length,
          activeUsers: exportData.filter(u => u.isActive).length,
          totalTokens: exportData.reduce((sum, u) => sum + u.totalTokens, 0),
          totalCost: exportData.reduce((sum, u) => sum + u.estimatedCost, 0)
        },
        users: exportData
      };

      return new NextResponse(JSON.stringify(jsonData, null, 2), {
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="analytics-${range}-${new Date().toISOString().split('T')[0]}.json"`
        }
      });
    }

  } catch (error) {
    console.error('Export API error:', error);
    return NextResponse.json(
      { error: 'Failed to export data' },
      { status: 500 }
    );
  }
}

function calculateUserCost(user: any): number {
  if (!user.usage?.totalTokens) return 0;
  
  // Gemini Pro pricing
  const pricing = {
    'gemini-pro': { input: 0.0005, output: 0.0015 },
    'gemini-pro-vision': { input: 0.0005, output: 0.0015 },
    'gemini-1.5-pro': { input: 0.00125, output: 0.00375 },
    'gemini-1.5-flash': { input: 0.000075, output: 0.0003 }
  };
  
  const model = user.usage.lastModel || 'gemini-pro';
  const modelPricing = pricing[model as keyof typeof pricing] || pricing['gemini-pro'];
  
  const inputTokens = user.usage.inputTokens || Math.floor((user.usage.totalTokens || 0) * 0.6);
  const outputTokens = user.usage.outputTokens || Math.floor((user.usage.totalTokens || 0) * 0.4);
  
  const cost = ((inputTokens * modelPricing.input) + (outputTokens * modelPricing.output)) / 1000;
  return Number(cost.toFixed(4));
}
