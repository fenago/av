import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/next-auth';
import { getUserProfile, createUserProfile, updateUserProfile } from '@/libs/userProfile';
import { UserRole } from '@/types/user';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    let userProfile = await getUserProfile(session.user.id);
    
    // Create profile if it doesn't exist (first time user)
    if (!userProfile) {
      try {
        userProfile = await createUserProfile({
          userId: session.user.id,
          email: session.user.email!,
          name: session.user.name || 'Unknown User',
          role: UserRole.FREE, // Default role for new users
        });
      } catch (error: any) {
        // If duplicate key error, try to get the existing profile
        if (error.code === 11000) {
          userProfile = await getUserProfile(session.user.id);
        } else {
          throw error;
        }
      }
    }

    return NextResponse.json(userProfile);
  } catch (error) {
    console.error('Failed to get user profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update user profile
export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { name, email } = await req.json();
    
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const updatedProfile = await updateUserProfile(session.user.id, {
      name,
      email,
    });

    if (!updatedProfile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error('Failed to update profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
