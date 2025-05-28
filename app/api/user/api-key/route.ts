import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { setUserAPIKey, getUserAPIKeyInfo, removeUserAPIKey } from '@/libs/apiKeyManager';

export async function GET() {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Use email as userId for consistency with user profile system
    const userId = session.user.email;
    const apiKeyInfo = await getUserAPIKeyInfo(userId);
    
    return NextResponse.json({
      success: true,
      apiKeyInfo
    });

  } catch (error) {
    console.error('Error getting API key info:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { apiKey } = await request.json();
    
    if (!apiKey || typeof apiKey !== 'string' || apiKey.trim().length === 0) {
      return NextResponse.json(
        { error: 'Valid API key is required' },
        { status: 400 }
      );
    }

    // Use email as userId for consistency with user profile system
    const userId = session.user.email;
    const result = await setUserAPIKey(userId, apiKey.trim());
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'API key saved successfully'
      });
    } else {
      return NextResponse.json(
        { error: result.error || 'Failed to save API key' },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Error setting API key:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Use email as userId for consistency with user profile system
    const userId = session.user.email;
    const result = await removeUserAPIKey(userId);
    
    if (result) {
      return NextResponse.json({
        success: true,
        message: 'API key removed successfully'
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to remove API key' },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Error removing API key:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
