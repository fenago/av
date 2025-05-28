"use client";
import { useState, useEffect } from 'react';
import { APIKeyInfo, TokenUsage, UsageMetrics } from '@/types/user';
import toast from 'react-hot-toast';
import { BorderBeam } from './ui/border-beam';
import NumberTicker from './ui/number-ticker';

interface APIKeySettingsProps {
  userId: string;
}

const APIKeySettings = ({ userId }: APIKeySettingsProps) => {
  const [apiKeyInfo, setApiKeyInfo] = useState<APIKeyInfo | null>(null);
  const [usageMetrics, setUsageMetrics] = useState<UsageMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [newApiKey, setNewApiKey] = useState('');
  const [validatingKey, setValidatingKey] = useState(false);

  useEffect(() => {
    fetchAPIKeyStatus();
    fetchUsageData();
  }, [userId]);

  const fetchAPIKeyStatus = async () => {
    try {
      const response = await fetch('/api/admin/token-management?action=api-key-status');
      if (response.ok) {
        const data = await response.json();
        setApiKeyInfo(data.apiKeyInfo);
      }
    } catch (error) {
      console.error('Error fetching API key status:', error);
    }
  };

  const fetchUsageData = async () => {
    try {
      const response = await fetch('/api/admin/token-management?action=token-usage');
      if (response.ok) {
        const data = await response.json();
        setUsageMetrics(data.metrics);
      }
    } catch (error) {
      console.error('Error fetching usage data:', error);
    } finally {
      setLoading(false);
    }
  };

  const setAPIKey = async () => {
    if (!newApiKey.trim()) {
      toast.error('Please enter a valid API key');
      return;
    }

    setSaving(true);
    setValidatingKey(true);

    try {
      const response = await fetch('/api/admin/token-management', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'set-api-key',
          apiKey: newApiKey.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
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
      setValidatingKey(false);
    }
  };

  const removeAPIKey = async () => {
    if (!confirm('Are you sure you want to remove your API key? This will prevent access to AI features.')) {
      return;
    }

    setSaving(true);

    try {
      const response = await fetch('/api/admin/token-management?action=remove-api-key', {
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

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* API Key Management Section */}
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
            {apiKeyInfo ? (
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
                <p className="text-xs text-green-500 mt-1">
                  Key hash: ...{apiKeyInfo.keyHash ? apiKeyInfo.keyHash.slice(-8) : 'unknown'}
                </p>
              </div>
              <button
                onClick={removeAPIKey}
                disabled={saving}
                className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
              >
                Remove
              </button>
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

        {/* Add/Update API Key */}
        {showKeyInput ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gemini API Key
              </label>
              <input
                type="password"
                value={newApiKey}
                onChange={(e) => setNewApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Your API key is encrypted and stored securely. We never store your key in plaintext.
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={setAPIKey}
                disabled={saving || !newApiKey.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {validatingKey && (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {validatingKey ? 'Validating...' : 'Save API Key'}
              </button>
              <button
                onClick={() => {
                  setShowKeyInput(false);
                  setNewApiKey('');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowKeyInput(true)}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
          >
            {apiKeyInfo ? 'Update API Key' : 'Add API Key'}
          </button>
        )}

        {/* Getting Started Guide */}
        {!apiKeyInfo && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-900 mb-3">How to get your Gemini API key:</h4>
            <ol className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-100 text-blue-600 rounded-full text-xs font-medium mr-2 mt-0.5">1</span>
                Visit <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Google AI Studio</a>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-100 text-blue-600 rounded-full text-xs font-medium mr-2 mt-0.5">2</span>
                Sign in with your Google account
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-100 text-blue-600 rounded-full text-xs font-medium mr-2 mt-0.5">3</span>
                Click "Create API Key" and copy your key
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-100 text-blue-600 rounded-full text-xs font-medium mr-2 mt-0.5">4</span>
                Paste it above and start using LearningScience.ai!
              </li>
            </ol>
          </div>
        )}
      </div>

      {/* Usage Analytics */}
      {usageMetrics && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Usage Analytics
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                <NumberTicker value={usageMetrics.totals.currentMonthTokens || 0} />
              </div>
              <div className="text-sm text-gray-600">Tokens This Month</div>
              <div className="text-xs text-green-600 mt-1">
                ${(usageMetrics.totals.currentMonthCost || 0).toFixed(2)} spent
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                <NumberTicker value={usageMetrics.totals.allTimeTokens || 0} />
              </div>
              <div className="text-sm text-gray-600">Total Tokens</div>
              <div className="text-xs text-green-600 mt-1">
                ${(usageMetrics.totals.allTimeCost || 0).toFixed(2)} total
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {usageMetrics.daily ? usageMetrics.daily.length : 0}
              </div>
              <div className="text-sm text-gray-600">Days Active</div>
              <div className="text-xs text-blue-600 mt-1">
                This month
              </div>
            </div>
          </div>

          {/* Daily Usage Breakdown */}
          {usageMetrics.daily && usageMetrics.daily.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-4">Recent Daily Usage</h4>
              <div className="space-y-3">
                {usageMetrics.daily
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .slice(0, 7)
                  .map((day) => (
                  <div key={day.date} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">
                          {new Date(day.date).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                        <span className="text-sm text-gray-600">
                          {day.totalTokens.toLocaleString()} tokens
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                          style={{ 
                            width: `${Math.min(100, (day.totalTokens / Math.max(...usageMetrics.daily.map(d => d.totalTokens))) * 100)}%` 
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>${day.totalCost.toFixed(4)}</span>
                        <span>{day.requestCount} requests</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default APIKeySettings;
