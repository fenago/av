import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/next-auth';
import { getUserProfile } from '@/libs/userProfile';
import { UserRole } from '@/types/user';

// Role-based access control middleware
export async function withRoleAuth(
  req: NextRequest,
  requiredRoles: UserRole | UserRole[],
  handler: (req: NextRequest, userProfile: any) => Promise<NextResponse>
) {
  try {
    // Get the session
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get user profile with role information
    const userProfile = await getUserProfile(session.user.id);
    
    if (!userProfile) {
      return NextResponse.json(
        { error: 'User profile not found' },
        { status: 404 }
      );
    }

    // Check if user has required role
    const allowedRoles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
    
    if (!allowedRoles.includes(userProfile.role)) {
      return NextResponse.json(
        { 
          error: 'Insufficient permissions',
          required: allowedRoles,
          current: userProfile.role
        },
        { status: 403 }
      );
    }

    // User has required role, proceed with handler
    return await handler(req, userProfile);
    
  } catch (error) {
    console.error('Role middleware error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Higher-order function for route protection
export function requireRole(requiredRoles: UserRole | UserRole[]) {
  return function (handler: (req: NextRequest, userProfile: any) => Promise<NextResponse>) {
    return async function (req: NextRequest) {
      return withRoleAuth(req, requiredRoles, handler);
    };
  };
}

// Specific role checkers
export const requireAdmin = requireRole(UserRole.ADMIN);
export const requireInstructorOrAbove = requireRole([
  UserRole.INSTRUCTOR, 
  UserRole.DEPARTMENT, 
  UserRole.INSTITUTION, 
  UserRole.ADMIN
]);
export const requireDepartmentOrAbove = requireRole([
  UserRole.DEPARTMENT, 
  UserRole.INSTITUTION, 
  UserRole.ADMIN
]);
export const requireInstitutionOrAbove = requireRole([
  UserRole.INSTITUTION, 
  UserRole.ADMIN
]);

// Feature-based access control
export async function checkFeatureAccess(
  session: any,
  feature: string
): Promise<boolean> {
  if (!session?.user?.id) return false;
  
  try {
    const userProfile = await getUserProfile(session.user.id);
    if (!userProfile) return false;
    
    // Admin has access to everything
    if (userProfile.role === UserRole.ADMIN) return true;
    
    // Check if feature is enabled for user's role
    return userProfile.features[feature as keyof typeof userProfile.features] === true;
  } catch (error) {
    console.error('Feature access check error:', error);
    return false;
  }
}

// Usage limit checker
export async function checkUsageLimit(
  session: any,
  type: 'students' | 'professors' | 'courses'
): Promise<boolean> {
  if (!session?.user?.id) return false;
  
  try {
    const userProfile = await getUserProfile(session.user.id);
    if (!userProfile) return false;
    
    // Admin has unlimited access
    if (userProfile.role === UserRole.ADMIN) return true;
    
    const current = userProfile.usage[`${type}Count` as keyof typeof userProfile.usage] as number;
    const limit = userProfile.features[`max${type.charAt(0).toUpperCase() + type.slice(1)}` as keyof typeof userProfile.features] as number;
    
    return current < limit;
  } catch (error) {
    console.error('Usage limit check error:', error);
    return false;
  }
}
