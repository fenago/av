"use client";
import { useAuth } from '@/libs/hooks';
import { UserRole } from '@/types/user';

const UserRoleDisplay = () => {
  const { userProfile, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-300 rounded w-24"></div>
      </div>
    );
  }

  if (!isAuthenticated || !userProfile) {
    return (
      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
        Not signed in
      </span>
    );
  }

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return 'bg-red-100 text-red-800 border-red-200';
      case UserRole.INSTITUTION:
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case UserRole.DEPARTMENT:
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case UserRole.INSTRUCTOR:
        return 'bg-green-100 text-green-800 border-green-200';
      case UserRole.FREE:
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleDisplayName = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return 'Admin';
      case UserRole.INSTITUTION:
        return 'Institution';
      case UserRole.DEPARTMENT:
        return 'Department';
      case UserRole.INSTRUCTOR:
        return 'Instructor';
      case UserRole.FREE:
        return 'Free Trial';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span 
        className={`text-sm font-medium px-2 py-1 rounded border ${getRoleColor(userProfile.role)}`}
      >
        {getRoleDisplayName(userProfile.role)}
      </span>
      
      {userProfile.role === UserRole.ADMIN && (
        <span className="text-xs text-red-600 font-semibold">
          ADMIN PRIVILEGES
        </span>
      )}
      
      <div className="text-xs text-gray-500">
        <div>Students: {userProfile.usage.studentsCount}/{userProfile.features.maxStudents === Infinity ? '∞' : userProfile.features.maxStudents}</div>
        <div>Courses: {userProfile.usage.coursesCount}/{userProfile.features.maxCourses === Infinity ? '∞' : userProfile.features.maxCourses}</div>
      </div>
    </div>
  );
};

export default UserRoleDisplay;
