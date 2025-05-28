"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/libs/hooks';
import { UserProfile, APIKeyInfo } from '@/types/user';
import toast from 'react-hot-toast';

const ProfileForm = () => {
  const { userProfile, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [saving, setSaving] = useState(false);
  const [apiKeyInfo, setApiKeyInfo] = useState<APIKeyInfo | null>(null);
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [newApiKey, setNewApiKey] = useState('');
  const [loadingApiKey, setLoadingApiKey] = useState(true);

  useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name || '',
        email: userProfile.email || '',
      });
    }
    fetchAPIKeyStatus();
  }, [userProfile]);

  const fetchAPIKeyStatus = async () => {
    try {
      const response = await fetch('/api/user/api-key');
      if (response.ok) {
        const data = await response.json();
        setApiKeyInfo(data.apiKeyInfo);
      }
    } catch (error) {
      console.error('Error fetching API key status:', error);
    } finally {
      setLoadingApiKey(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Profile updated successfully!');
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddApiKey = async () => {
    if (!newApiKey.trim()) {
      toast.error('Please enter a valid API key');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch('/api/user/api-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey: newApiKey.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('API key saved successfully!');
        setNewApiKey('');
        setShowKeyInput(false);
        fetchAPIKeyStatus();
      } else {
        toast.error(data.error || 'Failed to save API key');
      }
    } catch (error) {
      console.error('Error setting API key:', error);
      toast.error('Failed to save API key');
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveApiKey = async () => {
    if (!confirm('Are you sure you want to remove your API key? This will disable AI features.')) {
      return;
    }

    setSaving(true);
    try {
      const response = await fetch('/api/user/api-key', {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('API key removed successfully');
        setApiKeyInfo(null);
        fetchAPIKeyStatus();
      } else {
        toast.error('Failed to remove API key');
      }
    } catch (error) {
      console.error('Error removing API key:', error);
      toast.error('Failed to remove API key');
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
          <div className="h-10 bg-gray-300 rounded"></div>
        </div>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
          <div className="h-10 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Profile Information Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md 
                     hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                     disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>

      {/* Gemini API Key Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1721 9z" />
              </svg>
              Gemini API Key
            </h3>
            <p className="text-gray-600 text-sm">
              Connect your own Gemini API key to access all LearningScience.ai features
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            {loadingApiKey ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            ) : apiKeyInfo ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Connected
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                Not Connected
              </span>
            )}
          </div>
        </div>

        {/* API Key Status */}
        {apiKeyInfo ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">API Key Active</p>
                <p className="text-sm text-green-600 mt-1">
                  Added on {apiKeyInfo.addedAt ? new Date(apiKeyInfo.addedAt).toLocaleDateString() : 'Unknown date'}
                </p>
                <p className="text-xs text-green-500 mt-1 font-mono">
                  Key: ...{apiKeyInfo.keyHash ? apiKeyInfo.keyHash.slice(-8) : 'unknown'}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowKeyInput(true)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Change
                </button>
                <button
                  onClick={handleRemoveApiKey}
                  disabled={saving}
                  className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-sm font-medium text-blue-800">No API Key Connected</p>
                <p className="text-sm text-blue-600 mt-1">
                  Add your Gemini API key to unlock all features. Get your free API key from Google AI Studio.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Add/Change API Key Input */}
        {(showKeyInput || !apiKeyInfo) && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gemini API Key
              </label>
              <input
                type="password"
                value={newApiKey}
                onChange={(e) => setNewApiKey(e.target.value)}
                placeholder="Enter your Gemini API key..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleAddApiKey}
                disabled={saving || !newApiKey.trim()}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md 
                         hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                         disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {saving ? 'Saving...' : apiKeyInfo ? 'Update Key' : 'Add API Key'}
              </button>
              {showKeyInput && apiKeyInfo && (
                <button
                  onClick={() => {
                    setShowKeyInput(false);
                    setNewApiKey('');
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md 
                           hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                <strong>How to get your API key:</strong><br />
                1. Visit <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Google AI Studio</a><br />
                2. Sign in with your Google account<br />
                3. Click "Create API Key" and copy your key<br />
                4. Paste it above and start using LearningScience.ai!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Account Details */}
      {userProfile && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Account Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-600">User ID:</span>
              <p className="text-gray-900 font-mono">{userProfile.userId}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Member Since:</span>
              <p className="text-gray-900">
                {userProfile.createdAt ? new Date(userProfile.createdAt).toLocaleDateString() : 'Unknown'}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Last Active:</span>
              <p className="text-gray-900">
                {userProfile.tokenUsage?.length > 0 
                  ? new Date(userProfile.tokenUsage[userProfile.tokenUsage.length - 1].timestamp).toLocaleDateString()
                  : 'Never'}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Account Role:</span>
              <p className="text-gray-900 font-semibold">{userProfile.role}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileForm;
