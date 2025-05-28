"use client";

import { useAuth } from "@/libs/hooks";
import { redirect } from "next/navigation";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

export default function TeachingMaterialsPage() {
  const { session, userProfile, isLoading, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!isAuthenticated || !session) {
    redirect('/signin');
  }

  const materialTemplates = [
    {
      id: 1,
      title: "Lesson Plan",
      icon: "📋",
      description: "Comprehensive lesson planning with objectives and activities",
      premium: true,
      timeEstimate: "10-15 min"
    },
    {
      id: 2,
      title: "Quiz Generator",
      icon: "❓",
      description: "Create quizzes and assessments from your content",
      premium: false,
      timeEstimate: "5-10 min"
    },
    {
      id: 3,
      title: "Worksheet Creator",
      icon: "📄",
      description: "Generate practice worksheets and homework assignments",
      premium: true,
      timeEstimate: "8-12 min"
    },
    {
      id: 4,
      title: "Presentation Slides",
      icon: "🎯",
      description: "Auto-generate presentation slides from your curriculum",
      premium: true,
      timeEstimate: "15-20 min"
    },
    {
      id: 5,
      title: "Study Guide",
      icon: "📚",
      description: "Create comprehensive study materials for students",
      premium: false,
      timeEstimate: "12-18 min"
    },
    {
      id: 6,
      title: "Activity Planner",
      icon: "🎨",
      description: "Design interactive classroom activities and exercises",
      premium: true,
      timeEstimate: "10-15 min"
    }
  ];

  const recentMaterials = [
    { id: 1, title: "Algebra Basics Quiz", type: "Quiz", created: "2 hours ago", status: "Published" },
    { id: 2, title: "History Timeline Activity", type: "Worksheet", created: "1 day ago", status: "Draft" },
    { id: 3, title: "Biology Cell Structure", type: "Presentation", created: "3 days ago", status: "Published" },
    { id: 4, title: "Literature Analysis Guide", type: "Study Guide", created: "1 week ago", status: "Published" }
  ];

  const hasPremiumAccess = userProfile?.role === 'INSTRUCTOR' || 
                          userProfile?.role === 'DEPARTMENT' || 
                          userProfile?.role === 'INSTITUTION' || 
                          userProfile?.role === 'ADMIN';

  return (
    <DashboardLayout>
      <div className="h-full flex flex-col">
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-3xl mr-3">🎓</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Create Teaching Materials</h1>
                <p className="text-gray-600">AI-powered tools for lesson plans, activities, and assessments</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Active</span>
            </div>
          </div>
        </div>

        <div className="bg-white border-b border-gray-200 px-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === "dashboard"
                  ? "border-purple-500 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("templates")}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === "templates"
                  ? "border-purple-500 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Templates
            </button>
            <button
              onClick={() => setActiveTab("my-materials")}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === "my-materials"
                  ? "border-purple-500 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              My Materials
            </button>
          </div>
        </div>

        <div className="flex-1 p-6 bg-gray-50">
          {activeTab === "dashboard" && (
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center">
                    <div className="p-3 bg-purple-100 rounded-lg mr-4">
                      <span className="text-2xl">📊</span>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">24</p>
                      <p className="text-sm text-gray-600">Materials Created</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center">
                    <div className="p-3 bg-green-100 rounded-lg mr-4">
                      <span className="text-2xl">⏱️</span>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">4.2h</p>
                      <p className="text-sm text-gray-600">Time Saved</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-100 rounded-lg mr-4">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">89%</p>
                      <p className="text-sm text-gray-600">Success Rate</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Create</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {materialTemplates.slice(0, 6).map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template)}
                      className={`p-4 border rounded-lg hover:shadow-md transition-shadow text-center ${
                        template.premium && !hasPremiumAccess ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      disabled={template.premium && !hasPremiumAccess}
                    >
                      <div className="text-2xl mb-2">{template.icon}</div>
                      <div className="text-sm font-medium text-gray-900">{template.title}</div>
                      {template.premium && (
                        <div className="text-xs text-yellow-600 mt-1">Premium</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Materials</h2>
                <div className="space-y-3">
                  {recentMaterials.map((material) => (
                    <div key={material.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-sm">📄</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{material.title}</p>
                          <p className="text-sm text-gray-600">{material.type} • {material.created}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          material.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {material.status}
                        </span>
                        <button className="text-purple-600 hover:text-purple-700 text-sm">Edit</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "templates" && (
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {materialTemplates.map((template) => (
                  <div
                    key={template.id}
                    className={`bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border ${
                      template.premium && !hasPremiumAccess ? 'opacity-50' : 'cursor-pointer'
                    }`}
                    onClick={() => {
                      if (!template.premium || hasPremiumAccess) {
                        setSelectedTemplate(template);
                      }
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <span className="text-3xl mr-3">{template.icon}</span>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{template.title}</h3>
                          <p className="text-sm text-gray-600">{template.timeEstimate}</p>
                        </div>
                      </div>
                      {template.premium && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Premium</span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                    <button
                      className={`w-full py-2 px-4 rounded-lg text-sm font-medium ${
                        template.premium && !hasPremiumAccess
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-purple-500 text-white hover:bg-purple-600'
                      }`}
                      disabled={template.premium && !hasPremiumAccess}
                    >
                      {template.premium && !hasPremiumAccess ? 'Upgrade Required' : 'Create Now'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "my-materials" && (
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">My Teaching Materials</h2>
                    <div className="flex items-center space-x-2">
                      <button className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-50">Filter</button>
                      <button className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-50">Sort</button>
                    </div>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {recentMaterials.map((material) => (
                    <div key={material.id} className="p-6 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                            <span className="text-lg">📄</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{material.title}</p>
                            <p className="text-sm text-gray-600">{material.type} • Created {material.created}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 text-sm rounded-full ${
                            material.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {material.status}
                          </span>
                          <button className="text-purple-600 hover:text-purple-700">Edit</button>
                          <button className="text-blue-600 hover:text-blue-700">Preview</button>
                          <button className="text-gray-600 hover:text-gray-700">Export</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
