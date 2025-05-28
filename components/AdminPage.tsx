"use client";
import { useAuth } from '@/libs/hooks';
import { UserRole } from '@/types/user';
import UserManagement from './UserManagement';
import AdvancedAnalytics from './admin/AdvancedAnalytics';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Users, BarChart3, Settings } from 'lucide-react';

const AdminPage = () => {
  const { userProfile, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('analytics');

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !userProfile || userProfile.role !== UserRole.ADMIN)) {
      router.push('/dashboard');
    }
  }, [isLoading, isAuthenticated, userProfile, router]);

  if (isLoading) {
    return (
      <main className="min-h-screen p-8 pb-24 pt-24">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </main>
    );
  }

  if (!isAuthenticated || !userProfile || userProfile.role !== UserRole.ADMIN) {
    return (
      <main className="min-h-screen p-8 pb-24 pt-24">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
          <p className="text-gray-600 mt-4">You need admin privileges to access this page.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8 pb-24 pt-24">
      <section className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage users and system settings
          </p>
        </div>
        
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 justify-center">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === 'analytics'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              Advanced Analytics
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === 'users'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Users className="h-4 w-4" />
              User Management
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'analytics' && <AdvancedAnalytics />}
        {activeTab === 'users' && <UserManagement />}
      </section>
    </main>
  );
};

export default AdminPage;
