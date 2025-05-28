import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { UserProfile, UserRole } from '@/types/user';

export function useAuth() {
  const { data: session, status } = useSession();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (status === 'authenticated' && session?.user?.id) {
        try {
          const response = await fetch('/api/user/profile');
          if (response.ok) {
            const profile = await response.json();
            setUserProfile(profile);
          }
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
        }
      }
      setIsLoading(status === 'loading');
    };

    fetchUserProfile();
  }, [session, status]);

  return {
    session,
    userProfile,
    isLoading,
    isAuthenticated: status === 'authenticated',
    user: session?.user,
    role: userProfile?.role || UserRole.FREE,
  };
}

export function useRoleCheck(requiredRoles: UserRole | UserRole[]) {
  const { userProfile, isLoading } = useAuth();
  
  const allowedRoles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
  const hasAccess = userProfile ? allowedRoles.includes(userProfile.role) : false;
  
  return { hasAccess, isLoading };
}

export function useFeatureAccess(feature: keyof UserProfile['features']) {
  const { userProfile, isLoading } = useAuth();
  
  const hasAccess = userProfile 
    ? userProfile.features[feature] === true || userProfile.role === UserRole.ADMIN
    : false;
  
  return { hasAccess, isLoading };
}
