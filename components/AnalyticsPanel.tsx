"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NumberTicker from "@/components/ui/number-ticker";
import { DotPattern } from "@/components/ui/dot-pattern";
import { BorderBeam } from "@/components/ui/border-beam";
import { cn } from "@/lib/utils";

interface AnalyticsPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function AnalyticsPanel({ isOpen, onToggle }: AnalyticsPanelProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const metrics = [
    {
      id: "engagement",
      name: "Student Engagement",
      value: 87,
      change: "+12%",
      trend: "up",
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Active participation across all apps"
    },
    {
      id: "comprehension", 
      name: "Comprehension",
      value: 94,
      change: "+8%",
      trend: "up",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Understanding levels in assessments"
    },
    {
      id: "feedback",
      name: "Feedback Score",
      value: 4.8,
      change: "+0.3",
      trend: "up",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Average student satisfaction rating"
    },
    {
      id: "retention",
      name: "Retention Rate",
      value: 92,
      change: "+5%",
      trend: "up",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "Knowledge retention over time"
    },
    {
      id: "personalization",
      name: "Personalization",
      value: 78,
      change: "+15%",
      trend: "up",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      description: "AI adaptation effectiveness"
    }
  ];

  const tabs = [
    { id: "overview", name: "Overview", icon: "📊" },
    { id: "engagement", name: "Engagement", icon: "📈" },
    { id: "learning", name: "Learning", icon: "🧠" },
    { id: "trends", name: "Trends", icon: "📉" }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="fixed right-0 top-0 h-full w-80 bg-white border-l border-gray-200 shadow-xl z-50 overflow-hidden"
        >
          {/* Dot Pattern Background */}
          <DotPattern
            width={20}
            height={20}
            cx={1}
            cy={1}
            cr={1}
            className="opacity-30"
          />
          
          {/* Header */}
          <div className="relative bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Analytics</h2>
              <button
                onClick={onToggle}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Tabs */}
            <div className="flex space-x-1 mt-4 bg-gray-100 rounded-lg p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex-1 px-3 py-2 text-xs font-medium rounded-md transition-all",
                    activeTab === tab.id
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  <span className="mr-1">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="relative h-full overflow-y-auto pb-20">
            {activeTab === "overview" && (
              <div className="p-4 space-y-4">
                <div className="text-sm text-gray-600 mb-4">
                  Real-time insights into your classroom performance
                </div>
                
                {/* Metric Cards */}
                {metrics.map((metric, index) => (
                  <motion.div
                    key={metric.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      "relative p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all",
                      metric.bgColor
                    )}
                  >
                    <BorderBeam 
                      size={100}
                      duration={12}
                      colorFrom="#3B82F6"
                      colorTo="#8B5CF6"
                      delay={index * 2}
                      className="opacity-50"
                    />
                    
                    <div className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-900">
                          {metric.name}
                        </h3>
                        <span className={cn("text-xs font-medium", metric.color)}>
                          {metric.change}
                        </span>
                      </div>
                      
                      <div className="flex items-end space-x-2">
                        <div className={cn("text-2xl font-bold", metric.color)}>
                          <NumberTicker
                            value={metric.value}
                            className={metric.color}
                            decimalPlaces={metric.id === "feedback" ? 1 : 0}
                          />
                          {metric.id === "feedback" ? "" : "%"}
                        </div>
                        <div className="text-xs text-gray-500 mb-1">
                          {metric.trend === "up" ? "↗️" : "↘️"}
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-600 mt-2">
                        {metric.description}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {/* Quick Actions */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                      📊 Generate Report
                    </button>
                    <button className="w-full px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      📧 Email Summary
                    </button>
                    <button className="w-full px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      ⚙️ Configure Alerts
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "engagement" && (
              <div className="p-4">
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">📈</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Engagement Details</h3>
                  <p className="text-sm text-gray-600">
                    Detailed engagement analytics coming soon
                  </p>
                </div>
              </div>
            )}

            {activeTab === "learning" && (
              <div className="p-4">
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">🧠</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Learning Analytics</h3>
                  <p className="text-sm text-gray-600">
                    Learning progress and comprehension metrics
                  </p>
                </div>
              </div>
            )}

            {activeTab === "trends" && (
              <div className="p-4">
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">📉</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Trend Analysis</h3>
                  <p className="text-sm text-gray-600">
                    Historical trends and forecasting
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
      
      {/* Toggle Button */}
      <motion.button
        onClick={onToggle}
        className={cn(
          "fixed right-4 top-20 z-40 p-3 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-all",
          isOpen && "right-84"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </motion.div>
      </motion.button>
    </AnimatePresence>
  );
}
