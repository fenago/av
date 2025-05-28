import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/next-auth';
import { setUserAPIKey, getUserAPIKey, removeUserAPIKey } from '@/libs/apiKeyManager';
import { GoogleGenerativeAI } from '@google/generative-ai';

// GET - Get user's API key status (not the actual key)
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const userId = session.user.id;
    
    // Get API key to check if it exists (but don't return the actual key)
    const hasAPIKey = await getUserAPIKey(userId) !== null;
    
    return NextResponse.json({
      hasAPIKey,
      keySource: hasAPIKey ? 'user' : 'none'
    });
  } catch (error) {
    console.error('Failed to get API key status:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Set or update user's API key
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { apiKey } = await req.json();
    
    if (!apiKey || typeof apiKey !== 'string') {
      return NextResponse.json({ error: 'API key is required' }, { status: 400 });
    }
    
    // Validate API key by testing it with Google's API
    const isValid = await validateGeminiAPIKey(apiKey);
    
    if (!isValid) {
      return NextResponse.json({ 
        error: 'Invalid API key. Please check your Gemini API key and try again.' 
      }, { status: 400 });
    }
    
    const userId = session.user.id;
    const result = await setUserAPIKey(userId, apiKey);
    
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
  } catch (error) {
    console.error('Failed to set API key:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Remove user's API key
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const userId = session.user.id;
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
  } catch (error) {
    console.error('Failed to remove API key:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Helper function to validate Gemini API key
async function validateGeminiAPIKey(apiKey: string): Promise<boolean> {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    // Make a simple test request
    const result = await model.generateContent('Test');
    const response = await result.response;
    
    // If we get here without throwing, the key is valid
    return response.text().length > 0;
  } catch (error) {
    console.error('API key validation failed:', error);
    return false;
  }
}
