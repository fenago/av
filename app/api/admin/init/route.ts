import { NextRequest, NextResponse } from 'next/server';
import { createUserProfile, getUserProfileByEmail } from '@/libs/userProfile';
import { UserRole } from '@/types/user';

// Initialize admin profile for socrates73@gmail.com
export async function POST(req: NextRequest) {
  try {
    const { secret, forceUserId } = await req.json();
    
    // Simple security check
    if (secret !== 'init-admin-socrates73') {
      return NextResponse.json(
        { error: 'Invalid secret' },
        { status: 401 }
      );
    }

    // Use the provided user ID or default
    const userId = forceUserId || 'admin_socrates73';

    // Check if admin already exists
    const existingAdmin = await getUserProfileByEmail('socrates73@gmail.com');
    if (existingAdmin) {
      return NextResponse.json({
        message: 'Admin profile already exists',
        profile: {
          email: existingAdmin.email,
          name: existingAdmin.name,
          role: existingAdmin.role,
          userId: existingAdmin.userId,
        }
      });
    }

    // Create admin profile
    const adminProfile = await createUserProfile({
      userId: userId,
      email: 'socrates73@gmail.com',
      name: 'Immanual Kant',
      role: UserRole.ADMIN,
    });

    return NextResponse.json({
      message: '✅ Admin profile created successfully',
      profile: {
        email: adminProfile.email,
        name: adminProfile.name,
        role: adminProfile.role,
        features: adminProfile.features,
        userId: adminProfile.userId,
      }
    });

  } catch (error) {
    console.error('❌ Failed to create admin profile:', error);
    return NextResponse.json(
      { error: 'Failed to create admin profile', details: error },
      { status: 500 }
    );
  }
}
