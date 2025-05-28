import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/libs/roleMiddleware';
import { 
  getAllUserProfiles, 
  updateUserRole, 
  createUserProfile,
  deleteUserProfile 
} from '@/libs/userProfile';
import { UserRole } from '@/types/user';

// GET all users (Admin only)
export const GET = requireAdmin(async (req: NextRequest, userProfile: any) => {
  try {
    const users = await getAllUserProfiles();
    return NextResponse.json(users);
  } catch (error) {
    console.error('Failed to get users:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
});

// POST create user (Admin only)
export const POST = requireAdmin(async (req: NextRequest, userProfile: any) => {
  try {
    const userData = await req.json();
    
    const newUser = await createUserProfile({
      userId: userData.userId || `manual_${Date.now()}`,
      email: userData.email,
      name: userData.name,
      role: userData.role || UserRole.FREE,
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Failed to create user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
});

// PUT update user role (Admin only)
export const PUT = requireAdmin(async (req: NextRequest, userProfile: any) => {
  try {
    const { userId, role } = await req.json();
    
    if (!userId || !role || !Object.values(UserRole).includes(role)) {
      return NextResponse.json(
        { error: 'Invalid userId or role' },
        { status: 400 }
      );
    }

    const updatedUser = await updateUserRole(userId, role);
    
    if (!updatedUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Failed to update user role:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
});

// DELETE user (Admin only)
export const DELETE = requireAdmin(async (req: NextRequest, userProfile: any) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'userId parameter required' },
        { status: 400 }
      );
    }

    const deleted = await deleteUserProfile(userId);
    
    if (!deleted) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
});
