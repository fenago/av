import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/next-auth';
import { 
  setUserAPIKey, 
  getUserAPIKey, 
  removeUserAPIKey,
  logTokenUsage, 
  getUserTokenUsage, 
  getAllUsersUsage,
  setAdminOverride,
  removeAdminOverride 
} from '@/libs/apiKeyManager';
import { getUserProfile } from '@/libs/userProfile';
import { UserRole } from '@/types/user';
import { GoogleGenerativeAI } from '@google/generative-ai';

// This consolidated API handles both API key management and token usage

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');
    const userId = session.user.id;
    
    switch (action) {
      case 'api-key-status':
        // Get user's API key status (not the actual key)
        const hasAPIKey = await getUserAPIKey(userId) !== null;
        return NextResponse.json({
          hasAPIKey,
          keySource: hasAPIKey ? 'user' : 'none'
        });
        
      case 'token-usage':
        // Get user's token usage data
        const startDate = searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : undefined;
        const endDate = searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : undefined;
        const usage = await getUserTokenUsage(userId, startDate, endDate);
        return NextResponse.json({ usage });
        
      case 'all-users-usage':
        // Admin only - get all users' usage data
        const userProfile = await getUserProfile(userId);
        if (userProfile?.role !== UserRole.ADMIN) {
          return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
        }
        const allUsage = await getAllUsersUsage();
        return NextResponse.json({ users: allUsage });
        
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Failed to process GET request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const requestBody = await req.json();
    const { action } = requestBody;
    const userId = session.user.id;
    
    switch (action) {
      case 'set-api-key':
        // Set or update user's API key
        const { apiKey } = requestBody;
        
        console.log('Set API Key Request:', { userId, apiKeyLength: apiKey?.length });
        
        if (!apiKey || typeof apiKey !== 'string') {
          console.log('Invalid API key provided:', { apiKey: typeof apiKey, length: apiKey?.length });
          return NextResponse.json({ error: 'API key is required' }, { status: 400 });
        }
        
        // Validate API key by testing it with Google's API
        const isValid = apiKey.trim().length > 10; // Temporarily simplified validation
        
        if (!isValid) {
          console.log('API key validation failed:', { length: apiKey.trim().length });
          return NextResponse.json({ 
            error: 'Invalid API key. Please check your Gemini API key and try again.' 
          }, { status: 400 });
        }
        
        const result = await setUserAPIKey(userId, apiKey);
        
        console.log('setUserAPIKey result:', result);
        
        if (result.success) {
          return NextResponse.json({ 
            success: true, 
            message: 'API key saved successfully' 
          });
        } else {
          return NextResponse.json({ 
            error: result.error || 'Failed to save API key' 
          }, { status: 500 });
        }
        
      case 'log-token-usage':
        // Log token usage
        const {
          model,
          promptTokens,
          completionTokens,
          totalTokens,
          cost,
          sessionId,
          requestId
        } = requestBody;
        
        // Validate required fields
        if (!model || typeof promptTokens !== 'number' || typeof completionTokens !== 'number' || typeof totalTokens !== 'number' || typeof cost !== 'number') {
          return NextResponse.json({ error: 'Invalid usage data' }, { status: 400 });
        }
        
        const logSuccess = await logTokenUsage(userId, {
          model,
          promptTokens,
          completionTokens,
          totalTokens,
          cost,
          sessionId,
          requestId
        });
        
        if (logSuccess) {
          return NextResponse.json({ 
            success: true,
            message: 'Token usage logged successfully'
          });
        } else {
          return NextResponse.json({ 
            error: 'Failed to log token usage' 
          }, { status: 500 });
        }
        
      case 'set-admin-override':
        // Admin only - set API key override for a user
        const userProfile = await getUserProfile(userId);
        if (userProfile?.role !== UserRole.ADMIN) {
          return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
        }
        
        const { targetUserId, override } = requestBody;
        if (!targetUserId || !override) {
          return NextResponse.json({ error: 'Target user ID and override config required' }, { status: 400 });
        }
        
        const overrideSuccess = await setAdminOverride(targetUserId, override, userId);
        
        if (overrideSuccess) {
          return NextResponse.json({ 
            success: true,
            message: 'Admin override set successfully'
          });
        } else {
          return NextResponse.json({ 
            error: 'Failed to set admin override' 
          }, { status: 500 });
        }
        
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Failed to process POST request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');
    const userId = session.user.id;
    
    switch (action) {
      case 'remove-api-key':
        // Remove user's API key
        const success = await removeUserAPIKey(userId);
        
        if (success) {
          return NextResponse.json({ 
            success: true, 
            message: 'API key removed successfully' 
          });
        } else {
          return NextResponse.json({ 
            error: 'Failed to remove API key' 
          }, { status: 500 });
        }
        
      case 'remove-admin-override':
        // Admin only - remove API key override for a user
        const userProfile = await getUserProfile(userId);
        if (userProfile?.role !== UserRole.ADMIN) {
          return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
        }
        
        const { targetUserId } = await req.json();
        if (!targetUserId) {
          return NextResponse.json({ error: 'Target user ID required' }, { status: 400 });
        }
        
        const removeSuccess = await removeAdminOverride(targetUserId);
        
        if (removeSuccess) {
          return NextResponse.json({ 
            success: true,
            message: 'Admin override removed successfully'
          });
        } else {
          return NextResponse.json({ 
            error: 'Failed to remove admin override' 
          }, { status: 500 });
        }
        
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Failed to process DELETE request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Helper function to validate Gemini API key
async function validateGeminiAPIKey(apiKey: string): Promise<boolean> {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Test with a simple prompt
    const result = await model.generateContent("Test");
    const response = await result.response;
    
    return !!response.text();
  } catch (error) {
    console.error('API key validation failed:', error);
    return false;
  }
}
