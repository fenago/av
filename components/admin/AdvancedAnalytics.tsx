"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NumberTicker from "@/components/ui/number-ticker";
import { BorderBeam } from "@/components/ui/border-beam";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  AlertTriangle, 
  Users, 
  DollarSign,
  Activity,
  Calendar,
  Filter,
  RefreshCw,
  Bell,
  Eye,
  Settings
} from "lucide-react";

interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  totalTokens: number;
  totalCost: number;
  avgTokensPerUser: number;
  topModels: Array<{ name: string; usage: number; percentage: number }>;
  usageTrend: Array<{ date: string; tokens: number; cost: number }>;
  userBreakdown: Array<{ userId: string; tokens: number; cost: number; lastActive: string }>;
}

interface ForecastData {
  projectedUsage: number;
  projectedCost: number;
  confidenceLevel: number;
  trend: 'increasing' | 'decreasing' | 'stable';
}

interface Alert {
  id: string;
  type: 'usage_spike' | 'cost_threshold' | 'inactive_user' | 'api_key_issue';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  details: any;
  timestamp: string;
  resolved: boolean;
}

export default function AdvancedAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("7d");
  const [refreshing, setRefreshing] = useState(false);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`/api/admin/analytics?range=${timeRange}`);
      const data = await response.json();
      setAnalytics(data.analytics);
      setForecast(data.forecast);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    }
  };

  const fetchAlerts = async () => {
    try {
      const response = await fetch('/api/admin/alerts');
      const data = await response.json();
      setAlerts(data.alerts || []);
    } catch (error) {
      console.error('Failed to fetch alerts:', error);
    }
  };

  const handleExport = async (format: 'csv' | 'json') => {
    try {
      const response = await fetch(`/api/admin/export?format=${format}&range=${timeRange}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analytics-${timeRange}-${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchAnalytics(), fetchAlerts()]);
    setRefreshing(false);
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchAnalytics(), fetchAlerts()]);
      setLoading(false);
    };
    loadData();
  }, [timeRange]);

  const severityColors = {
    critical: "text-red-600 bg-red-50 border-red-200",
    high: "text-orange-600 bg-orange-50 border-orange-200",
    medium: "text-yellow-600 bg-yellow-50 border-yellow-200",
    low: "text-blue-600 bg-blue-50 border-blue-200"
  };

  const trendColors = {
    increasing: "text-green-600",
    decreasing: "text-red-600",
    stable: "text-gray-600"
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Advanced Analytics</h2>
          <p className="text-gray-600">Comprehensive usage analytics and forecasting</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          
          <button
            onClick={() => handleExport('csv')}
            className="px-3 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
          
          <button
            onClick={() => handleExport('json')}
            className="px-3 py-2 bg-secondary text-white rounded-md hover:bg-secondary/90 transition-colors flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export JSON
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', name: 'Overview', icon: BarChart3 },
            { id: 'forecast', name: 'Forecasting', icon: TrendingUp },
            { id: 'alerts', name: 'Alerts', icon: AlertTriangle },
            { id: 'users', name: 'User Breakdown', icon: Users }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2",
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.name}
              {tab.id === 'alerts' && alerts.length > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {alerts.length}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && analytics && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 text-sm font-medium">Total Users</p>
                    <NumberTicker
                      value={analytics.totalUsers}
                      className="text-2xl font-bold text-blue-900"
                    />
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-blue-700 text-sm mt-1">
                  {analytics.activeUsers} active users
                </p>
              </div>
              <DotPattern className="opacity-20" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 text-sm font-medium">Total Tokens</p>
                    <NumberTicker
                      value={analytics.totalTokens}
                      className="text-2xl font-bold text-green-900"
                    />
                  </div>
                  <Activity className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-green-700 text-sm mt-1">
                  Avg: {analytics.avgTokensPerUser} per user
                </p>
              </div>
              <BorderBeam size={250} duration={12} delay={9} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-600 text-sm font-medium">Total Cost</p>
                    <div className="text-2xl font-bold text-purple-900">
                      ${analytics.totalCost}
                    </div>
                  </div>
                  <DollarSign className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-purple-700 text-sm mt-1">
                  ${(analytics.totalCost / Math.max(analytics.activeUsers, 1)).toFixed(2)} per active user
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200 overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-600 text-sm font-medium">Active Alerts</p>
                    <NumberTicker
                      value={alerts.length}
                      className="text-2xl font-bold text-orange-900"
                    />
                  </div>
                  <Bell className="h-8 w-8 text-orange-600" />
                </div>
                <p className="text-orange-700 text-sm mt-1">
                  {alerts.filter(a => a.severity === 'critical' || a.severity === 'high').length} high priority
                </p>
              </div>
            </motion.div>
          </div>

          {/* Model Usage */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Model Usage Distribution</h3>
            <div className="space-y-3">
              {analytics.topModels.map((model, index) => (
                <div key={model.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${
                      index === 0 ? 'from-blue-500 to-blue-600' :
                      index === 1 ? 'from-green-500 to-green-600' :
                      index === 2 ? 'from-purple-500 to-purple-600' :
                      'from-gray-400 to-gray-500'
                    }`} />
                    <span className="font-medium">{model.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{model.usage.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">{model.percentage.toFixed(1)}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Forecast Tab */}
      {activeTab === 'forecast' && forecast && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">30-Day Projection</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Projected Usage:</span>
                  <span className="font-semibold text-lg">{forecast.projectedUsage.toLocaleString()} tokens</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Projected Cost:</span>
                  <span className="font-semibold text-lg">${forecast.projectedCost}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Confidence Level:</span>
                  <span className="font-semibold text-lg">{forecast.confidenceLevel}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Trend:</span>
                  <span className={`font-semibold text-lg capitalize ${trendColors[forecast.trend]}`}>
                    {forecast.trend}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Usage Trend</h3>
              <div className="h-40 flex items-end justify-between gap-2">
                {analytics?.usageTrend.slice(-7).map((data, index) => (
                  <div key={data.date} className="flex flex-col items-center flex-1">
                    <div 
                      className="bg-gradient-to-t from-primary to-primary/60 w-full rounded-t"
                      style={{ height: `${(data.tokens / Math.max(...analytics.usageTrend.map(d => d.tokens))) * 120}px` }}
                    />
                    <span className="text-xs mt-2 text-gray-500">
                      {new Date(data.date).toLocaleDateString('en-US', { weekday: 'short' })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alerts Tab */}
      {activeTab === 'alerts' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Active Alerts</h3>
            <div className="flex gap-2">
              {['critical', 'high', 'medium', 'low'].map(severity => (
                <span key={severity} className={`px-2 py-1 rounded text-xs font-medium ${severityColors[severity as keyof typeof severityColors]}`}>
                  {alerts.filter(a => a.severity === severity).length} {severity}
                </span>
              ))}
            </div>
          </div>
          
          {alerts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <AlertTriangle className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No active alerts</p>
            </div>
          ) : (
            <div className="space-y-3">
              {alerts.map((alert) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-4 rounded-lg border ${severityColors[alert.severity]}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-1 rounded text-xs font-medium uppercase ${severityColors[alert.severity]}`}>
                          {alert.severity}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(alert.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="font-medium">{alert.message}</p>
                      {alert.details && (
                        <p className="text-sm opacity-75 mt-1">
                          {JSON.stringify(alert.details, null, 2)}
                        </p>
                      )}
                    </div>
                    <button className="ml-4 px-3 py-1 bg-white/50 rounded text-sm hover:bg-white/75 transition-colors">
                      Resolve
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && analytics && (
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Top Users by Token Usage</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tokens</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {analytics.userBreakdown.map((user, index) => (
                  <tr key={user.userId} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.userId.substring(0, 8)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.tokens.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${user.cost.toFixed(4)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.lastActive}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
