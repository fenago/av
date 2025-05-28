"use client";

import { useAuth } from "@/libs/hooks";
import { redirect } from "next/navigation";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

export default function GoogleWorkspacePage() {
  const { session, userProfile, isLoading, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [isConnected, setIsConnected] = useState(false);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div></div>;
  }

  if (!isAuthenticated || !session) {
    redirect('/signin');
  }

  const connectedServices = [
    { name: "Google Classroom", status: "connected", lastSync: "2 hours ago", students: 125 },
    { name: "Google Drive", status: "connected", lastSync: "1 hour ago", files: 47 },
    { name: "Google Docs", status: "connected", lastSync: "30 minutes ago", documents: 23 },
    { name: "Google Sheets", status: "pending", lastSync: "Never", spreadsheets: 0 },
    { name: "Google Calendar", status: "disconnected", lastSync: "Never", events: 0 }
  ];

  const recentActivity = [
    { action: "Imported assignment", service: "Google Classroom", item: "Essay Assignment - Period 3", time: "2 hours ago" },
    { action: "Synced documents", service: "Google Drive", item: "Chapter 5 Materials", time: "3 hours ago" },
    { action: "Updated grades", service: "Google Classroom", item: "Math Quiz #4", time: "5 hours ago" },
    { action: "Created lesson plan", service: "Google Docs", item: "History Lesson - WWI", time: "1 day ago" }
  ];

  const classrooms = [
    { id: 1, name: "AP Biology - Period 1", students: 28, assignments: 12, lastActivity: "2 hours ago" },
    { id: 2, name: "Chemistry 101 - Period 3", students: 32, assignments: 8, lastActivity: "4 hours ago" },
    { id: 3, name: "Physics - Period 5", students: 25, assignments: 15, lastActivity: "1 day ago" }
  ];

  const materials = [
    { name: "Cell Division Presentation", type: "slides", size: "2.4 MB", modified: "Today", shared: true },
    { name: "Lab Safety Guidelines", type: "doc", size: "156 KB", modified: "Yesterday", shared: false },
    { name: "Student Grades Q2", type: "sheet", size: "89 KB", modified: "2 days ago", shared: false },
    { name: "Periodic Table Reference", type: "pdf", size: "1.2 MB", modified: "1 week ago", shared: true }
  ];

  return (
    <DashboardLayout>
      <div className="h-full bg-gray-50">
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-3xl mr-3">🔗</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Google Workspace Integration</h1>
                <p className="text-gray-600">Connect and sync your Google tools seamlessly</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-sm ${isConnected ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {isConnected ? 'Connected' : 'Partially Connected'}
              </span>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                🔄 Sync All
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-6 py-3 font-medium text-sm ${activeTab === "overview" ? "border-b-2 border-indigo-500 text-indigo-600" : "text-gray-500"}`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("classroom")}
                className={`px-6 py-3 font-medium text-sm ${activeTab === "classroom" ? "border-b-2 border-indigo-500 text-indigo-600" : "text-gray-500"}`}
              >
                Google Classroom
              </button>
              <button
                onClick={() => setActiveTab("drive")}
                className={`px-6 py-3 font-medium text-sm ${activeTab === "drive" ? "border-b-2 border-indigo-500 text-indigo-600" : "text-gray-500"}`}
              >
                Drive & Docs
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`px-6 py-3 font-medium text-sm ${activeTab === "settings" ? "border-b-2 border-indigo-500 text-indigo-600" : "text-gray-500"}`}
              >
                Integration Settings
              </button>
            </div>
          </div>

          {activeTab === "overview" && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Connected Services</h2>
                  <div className="space-y-3">
                    {connectedServices.map((service, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-3 ${
                            service.status === 'connected' ? 'bg-green-500' : 
                            service.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                          <div>
                            <p className="font-medium text-gray-900">{service.name}</p>
                            <p className="text-sm text-gray-500">Last sync: {service.lastSync}</p>
                          </div>
                        </div>
                        <button className={`px-3 py-1 text-xs rounded-full ${
                          service.status === 'connected' ? 'bg-green-100 text-green-800' :
                          service.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {service.status === 'connected' ? 'Active' : 
                           service.status === 'pending' ? 'Connect' : 'Reconnect'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">125</p>
                      <p className="text-sm text-gray-600">Total Students</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">47</p>
                      <p className="text-sm text-gray-600">Synced Files</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">3</p>
                      <p className="text-sm text-gray-600">Classrooms</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <p className="text-2xl font-bold text-orange-600">35</p>
                      <p className="text-sm text-gray-600">Assignments</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-indigo-600 text-sm">
                            {activity.service === 'Google Classroom' ? '🎓' :
                             activity.service === 'Google Drive' ? '📁' :
                             activity.service === 'Google Docs' ? '📝' : '📊'}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{activity.action}</p>
                          <p className="text-sm text-gray-500">{activity.service} • {activity.item}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "classroom" && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Your Google Classrooms</h2>
                  <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
                    Import New Classroom
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {classrooms.map((classroom) => (
                    <div key={classroom.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="font-semibold text-gray-900">{classroom.name}</h3>
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex justify-between">
                          <span>Students:</span>
                          <span>{classroom.students}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Assignments:</span>
                          <span>{classroom.assignments}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Last Activity:</span>
                          <span>{classroom.lastActivity}</span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button className="flex-1 px-3 py-2 bg-indigo-500 text-white text-sm rounded hover:bg-indigo-600">
                          Sync
                        </button>
                        <button className="flex-1 px-3 py-2 border border-gray-300 text-sm rounded hover:bg-gray-50">
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Assignment Management</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                    <span className="text-2xl">📥</span>
                    <p className="mt-2 font-medium">Import Assignments</p>
                    <p className="text-sm text-gray-600">Sync from Google Classroom</p>
                  </div>
                  <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                    <span className="text-2xl">📤</span>
                    <p className="mt-2 font-medium">Export Grades</p>
                    <p className="text-sm text-gray-600">Send back to Classroom</p>
                  </div>
                  <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                    <span className="text-2xl">🔄</span>
                    <p className="mt-2 font-medium">Auto Sync</p>
                    <p className="text-sm text-gray-600">Keep everything updated</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "drive" && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Google Drive Materials</h2>
                  <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
                    Import from Drive
                  </button>
                </div>
                
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search your Drive files..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-3">
                  {materials.map((material, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">
                          {material.type === 'slides' ? '📊' :
                           material.type === 'doc' ? '📝' :
                           material.type === 'sheet' ? '📋' : '📄'}
                        </span>
                        <div>
                          <p className="font-medium text-gray-900">{material.name}</p>
                          <p className="text-sm text-gray-500">{material.size} • Modified {material.modified}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        {material.shared && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Shared</span>
                        )}
                        <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                          Import
                        </button>
                        <button className="px-3 py-1 text-sm text-indigo-600 hover:bg-indigo-50 rounded">
                          Open
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button className="p-4 border-2 border-dashed border-blue-300 rounded-lg text-center hover:bg-blue-50">
                    <span className="text-2xl">📝</span>
                    <p className="mt-2 text-sm font-medium">Create Doc</p>
                  </button>
                  <button className="p-4 border-2 border-dashed border-green-300 rounded-lg text-center hover:bg-green-50">
                    <span className="text-2xl">📊</span>
                    <p className="mt-2 text-sm font-medium">Create Sheet</p>
                  </button>
                  <button className="p-4 border-2 border-dashed border-yellow-300 rounded-lg text-center hover:bg-yellow-50">
                    <span className="text-2xl">📈</span>
                    <p className="mt-2 text-sm font-medium">Create Slides</p>
                  </button>
                  <button className="p-4 border-2 border-dashed border-purple-300 rounded-lg text-center hover:bg-purple-50">
                    <span className="text-2xl">📁</span>
                    <p className="mt-2 text-sm font-medium">New Folder</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Connection Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Auto-sync assignments</p>
                      <p className="text-sm text-gray-600">Automatically import new assignments from Google Classroom</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Sync student submissions</p>
                      <p className="text-sm text-gray-600">Import student work automatically when submitted</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Export grades to Classroom</p>
                      <p className="text-sm text-gray-600">Automatically send graded assignments back to Google Classroom</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Management</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Connected Google Account</p>
                      <p className="text-sm text-gray-600">teacher@school.edu</p>
                    </div>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      Change Account
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Permissions</p>
                      <p className="text-sm text-gray-600">Manage access to your Google services</p>
                    </div>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      Review Permissions
                    </button>
                  </div>

                  <div className="pt-4 border-t">
                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                      Disconnect All Services
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
