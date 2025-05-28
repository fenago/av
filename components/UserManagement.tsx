"use client";
import { useState, useEffect } from 'react';
import { UserProfile, UserRole, APIKeyOverride } from '@/types/user';
import toast from 'react-hot-toast';
import { BorderBeam } from './ui/border-beam';
import NumberTicker from './ui/number-ticker';

interface UserWithUsage extends UserProfile {
  apiKeyStatus: 'user' | 'admin' | 'none';
  overrideActive: boolean;
  currentMonthTokens?: number;
  currentMonthCost?: number;
  allTimeTokens?: number;
  allTimeCost?: number;
}

const UserManagement = () => {
  const [users, setUsers] = useState<UserWithUsage[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'api-keys' | 'usage'>('overview');
  const [showOverrideModal, setShowOverrideModal] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
    fetchUsageData();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      if (response.ok) {
        const userData = await response.json();
        setUsers(userData);
      } else {
        toast.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsageData = async () => {
    try {
      const response = await fetch('/api/admin/token-management?action=all-users-usage');
      if (response.ok) {
        const { users: usageData } = await response.json();
        
        // Merge usage data with existing user data
        setUsers(prevUsers => 
          prevUsers.map(user => {
            const usage = usageData.find((u: any) => u.userId === user.userId);
            return {
              ...user,
              apiKeyStatus: usage?.apiKeyStatus || 'none',
              overrideActive: usage?.overrideActive || false,
              currentMonthTokens: usage?.metrics?.totals?.currentMonthTokens || 0,
              currentMonthCost: usage?.metrics?.totals?.currentMonthCost || 0,
              allTimeTokens: usage?.metrics?.totals?.allTimeTokens || 0,
              allTimeCost: usage?.metrics?.totals?.allTimeCost || 0,
            };
          })
        );
      }
    } catch (error) {
      console.error('Error fetching usage data:', error);
    }
  };

  const updateUserRole = async (userId: string, newRole: UserRole) => {
    setUpdating(userId);
    try {
      const response = await fetch(`/api/admin/users`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, role: newRole }),
      });

      if (response.ok) {
        toast.success(`User role updated to ${newRole}`);
        fetchUsers(); // Refresh the list
      } else {
        toast.error('Failed to update user role');
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('Failed to update user role');
    } finally {
      setUpdating(null);
    }
  };

  const setAdminOverride = async (userId: string, override: APIKeyOverride) => {
    try {
      const response = await fetch('/api/admin/token-management', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'set-admin-override',
          targetUserId: userId,
          override
        }),
      });

      if (response.ok) {
        toast.success('Admin override activated');
        fetchUsageData();
        setShowOverrideModal(null);
      } else {
        toast.error('Failed to set admin override');
      }
    } catch (error) {
      console.error('Error setting admin override:', error);
      toast.error('Failed to set admin override');
    }
  };

  const removeAdminOverride = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/token-management?action=remove-admin-override&targetUserId=${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Admin override removed');
        fetchUsageData();
      } else {
        toast.error('Failed to remove admin override');
      }
    } catch (error) {
      console.error('Error removing admin override:', error);
      toast.error('Failed to remove admin override');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const totalUsers = users.length;
  const usersWithKeys = users.filter(u => u.apiKeyStatus !== 'none').length;
  const totalTokensThisMonth = users.reduce((sum, u) => sum + (u.currentMonthTokens || 0), 0);
  const totalCostThisMonth = users.reduce((sum, u) => sum + (u.currentMonthCost || 0), 0);

  return (
    <div className="space-y-6">
      {/* Admin Dashboard Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-1">Manage users, API keys, and token usage</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">
                <NumberTicker value={totalUsers} />
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-50 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Users with API Keys</p>
              <p className="text-3xl font-bold text-gray-900">
                <NumberTicker value={usersWithKeys} />
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-purple-50 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Monthly Tokens</p>
              <p className="text-3xl font-bold text-gray-900">
                <NumberTicker value={totalTokensThisMonth} className="tabular-nums" />
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-orange-50 rounded-lg">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Monthly Cost</p>
              <p className="text-3xl font-bold text-gray-900">
                $<NumberTicker value={totalCostThisMonth} decimalPlaces={2} />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', name: 'User Overview', icon: '👥' },
            { id: 'api-keys', name: 'API Key Management', icon: '🔑' },
            { id: 'usage', name: 'Token Usage', icon: '📊' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                selectedTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {selectedTab === 'overview' && (
          <UserOverviewTab 
            users={users} 
            updating={updating} 
            updateUserRole={updateUserRole} 
          />
        )}
        {selectedTab === 'api-keys' && (
          <APIKeyManagementTab 
            users={users}
            setAdminOverride={setAdminOverride}
            removeAdminOverride={removeAdminOverride}
            showOverrideModal={showOverrideModal}
            setShowOverrideModal={setShowOverrideModal}
          />
        )}
        {selectedTab === 'usage' && (
          <TokenUsageTab users={users} />
        )}
      </div>
    </div>
  );
};

// User Overview Tab Component
const UserOverviewTab = ({ users, updating, updateUserRole }: {
  users: UserWithUsage[];
  updating: string | null;
  updateUserRole: (userId: string, role: UserRole) => void;
}) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50/80">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">API Key</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white/50 divide-y divide-gray-200">
        {users.map((user) => (
          <tr key={user.userId} className="hover:bg-gray-50/50 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap">
              <div>
                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <select
                value={user.role}
                onChange={(e) => updateUserRole(user.userId, e.target.value as UserRole)}
                disabled={updating === user.userId}
                className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
              >
                {Object.values(UserRole).map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                user.apiKeyStatus === 'user' 
                  ? 'bg-green-100 text-green-800' 
                  : user.apiKeyStatus === 'admin'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {user.apiKeyStatus === 'user' ? '🔑 User Key' : 
                 user.apiKeyStatus === 'admin' ? '🛡️ Admin Override' : 
                 '❌ No Key'}
              </span>
              {user.overrideActive && (
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Override Active
                </span>
              )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <div>
                <div>{(user.currentMonthTokens || 0).toLocaleString()} tokens</div>
                <div className="text-gray-500">${(user.currentMonthCost || 0).toFixed(2)}</div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button className="text-blue-600 hover:text-blue-900 mr-3">
                View Details
              </button>
              <button className="text-orange-600 hover:text-orange-900">
                Manage Keys
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// API Key Management Tab Component  
const APIKeyManagementTab = ({ users, setAdminOverride, removeAdminOverride, showOverrideModal, setShowOverrideModal }: {
  users: UserWithUsage[];
  setAdminOverride: (userId: string, override: APIKeyOverride) => void;
  removeAdminOverride: (userId: string) => void;
  showOverrideModal: string | null;
  setShowOverrideModal: (userId: string | null) => void;
}) => (
  <div className="p-6">
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-2">API Key Management</h3>
      <p className="text-gray-600">Manage user API keys and admin overrides</p>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {users.map((user) => (
        <div key={user.userId} className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-medium text-gray-900">{user.name}</h4>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              user.apiKeyStatus === 'user' 
                ? 'bg-green-100 text-green-800' 
                : user.apiKeyStatus === 'admin'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {user.apiKeyStatus === 'user' ? 'User Key' : 
               user.apiKeyStatus === 'admin' ? 'Admin Override' : 
               'No Key'}
            </span>
          </div>
          
          <div className="space-y-2">
            {user.overrideActive ? (
              <button
                onClick={() => removeAdminOverride(user.userId)}
                className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors text-sm"
              >
                Remove Admin Override
              </button>
            ) : (
              <button
                onClick={() => setShowOverrideModal(user.userId)}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm"
              >
                Set Admin Override
              </button>
            )}
          </div>
        </div>
      ))}
    </div>

    {/* Override Modal */}
    {showOverrideModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h3 className="text-lg font-medium mb-4">Set Admin Override</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Override
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                rows={3}
                placeholder="Enter reason for admin override..."
              />
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="notifyUser" className="mr-2" />
              <label htmlFor="notifyUser" className="text-sm text-gray-700">
                Notify user of override activation
              </label>
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => setShowOverrideModal(null)}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setAdminOverride(showOverrideModal, {
                  isActive: true,
                  reason: 'Admin override for missing key',
                  notifyUser: true,
                  conditions: {
                    onMissingKey: true,
                    onRateLimitExceeded: false,
                    onKeyExpired: false
                  }
                });
              }}
              className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
            >
              Activate Override
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);

// Token Usage Tab Component
const TokenUsageTab = ({ users }: { users: UserWithUsage[] }) => (
  <div className="p-6">
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-2">Token Usage Analytics</h3>
      <p className="text-gray-600">Monitor token consumption and costs across all users</p>
    </div>
    
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">This Month</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">All Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Cost/Token</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users
            .sort((a, b) => (b.currentMonthTokens || 0) - (a.currentMonthTokens || 0))
            .map((user) => {
              const avgCost = (user.allTimeTokens || 0) > 0 
                ? (user.allTimeCost || 0) / (user.allTimeTokens || 0) 
                : 0;
              
              return (
                <tr key={user.userId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.role}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="font-medium">{(user.currentMonthTokens || 0).toLocaleString()} tokens</div>
                      <div className="text-gray-500">${(user.currentMonthCost || 0).toFixed(2)}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="font-medium">{(user.allTimeTokens || 0).toLocaleString()} tokens</div>
                      <div className="text-gray-500">${(user.allTimeCost || 0).toFixed(2)}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${(avgCost * 1000).toFixed(4)}/1K
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.apiKeyStatus !== 'none' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.apiKeyStatus !== 'none' ? 'Active' : 'No API Key'}
                    </span>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  </div>
);

export default UserManagement;
