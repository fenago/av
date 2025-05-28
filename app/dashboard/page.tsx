"use client";

import { useAuth } from "@/libs/hooks";
import { redirect } from "next/navigation";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

export default function Dashboard() {
  const { session, userProfile, isLoading, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Authentication protection
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated || !session) {
    redirect('/signin');
  }

  const isAdmin = userProfile?.role === 'ADMIN';

  // Complete 18 Educational Apps
  const apps = [
    {
      name: "Chat with DrLeeGPT",
      description: "Direct access to all five educational superpowers through intelligent conversation",
      icon: "💬",
      category: "Communication & Interaction",
      premium: true,
      featured: true,
      href: "/dashboard/drleegpt",
      status: "active"
    },
    {
      name: "Live Audio + 3D Visuals",
      description: "Transform conversations into immersive visual experiences",
      icon: "🎧",
      category: "Media & Visualization",
      premium: false,
      href: "/dashboard/live-audio",
      status: "coming-soon"
    },
    {
      name: "Write Your Own Textbook",
      description: "AI-powered textbook creation tailored to your curriculum and teaching style",
      icon: "📚",
      category: "Content Creation",
      premium: true,
      featured: true,
      href: "/dashboard/textbook",
      status: "coming-soon"
    },
    {
      name: "Create Teaching Materials",
      description: "Generate comprehensive educational resources from syllabi to worksheets",
      icon: "📝",
      category: "Content Creation",
      premium: true,
      featured: true,
      href: "/dashboard/materials",
      status: "coming-soon"
    },
    {
      name: "Talk to Your Materials",
      description: "Interactive conversations with your educational content",
      icon: "🗣️",
      category: "Communication & Interaction",
      premium: false,
      href: "/dashboard/talk-materials",
      status: "coming-soon"
    },
    {
      name: "Lesson to Podcast",
      description: "Convert educational content into engaging audio format",
      icon: "🎙️",
      category: "Media & Visualization",
      premium: false,
      href: "/dashboard/podcast",
      status: "coming-soon"
    },
    {
      name: "Native Image Generation",
      description: "Create custom educational visuals and diagrams",
      icon: "🖼️",
      category: "Content Creation",
      premium: false,
      href: "/dashboard/images",
      status: "coming-soon"
    },
    {
      name: "Video Generation",
      description: "Produce educational videos with AI assistance",
      icon: "🎬",
      category: "Media & Visualization",
      premium: false,
      href: "/dashboard/videos",
      status: "coming-soon"
    },
    {
      name: "DrLeeGPT Live",
      description: "Real-time interactive educational sessions",
      icon: "📡",
      category: "Communication & Interaction",
      premium: false,
      href: "/dashboard/live",
      status: "coming-soon"
    },
    {
      name: "Google Workspace Integration",
      description: "Seamless integration with Google Classroom and Drive",
      icon: "🔗",
      category: "Communication & Interaction",
      premium: false,
      href: "/dashboard/google-workspace",
      status: "coming-soon"
    },
    {
      name: "ChatterBots",
      description: "Create custom educational chatbots for specific topics",
      icon: "🤖",
      category: "Communication & Interaction",
      premium: false,
      href: "/dashboard/chatterbots",
      status: "coming-soon"
    },
    {
      name: "Dictation/Notes",
      description: "Voice-to-text for educational content creation",
      icon: "🎤",
      category: "Content Creation",
      premium: false,
      href: "/dashboard/dictation",
      status: "coming-soon"
    },
    {
      name: "Video to Learning",
      description: "Extract educational content from video materials",
      icon: "📹",
      category: "Assessment & Analysis",
      premium: false,
      href: "/dashboard/video-learning",
      status: "coming-soon"
    },
    {
      name: "Tiny Cats Explain",
      description: "Cute AI cats explain complex topics in simple terms",
      icon: "🐱",
      category: "Communication & Interaction",
      premium: false,
      href: "/dashboard/tiny-cats",
      status: "coming-soon"
    },
    {
      name: "Flashcard Maker",
      description: "Generate interactive flashcards from any content",
      icon: "🃏",
      category: "Content Creation",
      premium: false,
      href: "/dashboard/flashcards",
      status: "coming-soon"
    },
    {
      name: "Video Analyzer",
      description: "Analyze educational videos for insights and summaries",
      icon: "📊",
      category: "Assessment & Analysis",
      premium: false,
      href: "/dashboard/video-analyzer",
      status: "coming-soon"
    },
    {
      name: "Themed Avatars",
      description: "Create custom educational avatars and characters",
      icon: "👤",
      category: "Media & Visualization",
      premium: false,
      href: "/dashboard/avatars",
      status: "coming-soon"
    },
    {
      name: "Rubrics and Grading",
      description: "AI-powered assessment tools and grading assistance",
      icon: "📋",
      category: "Assessment & Analysis",
      premium: false,
      href: "/dashboard/grading",
      status: "coming-soon"
    }
  ];

  // Filter apps based on selected category
  const filteredApps = selectedCategory === 'all' 
    ? apps 
    : apps.filter(app => app.category === selectedCategory);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {userProfile?.name?.split(' ')[0] || 'Educator'}! 👋
          </h1>
          <p className="text-blue-100 text-lg">
            Your educational AI platform is ready. Start creating and teaching with advanced AI tools.
          </p>
          <div className="mt-6 flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-sm">Role: {userProfile?.role}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span className="text-sm">
                Access: {userProfile?.features?.maxStudents || 0} Students
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('all-apps')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'all-apps'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              All Apps
            </button>
          </nav>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Featured Apps */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Apps</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredApps
                  .filter(app => app.featured)
                  .map((app) => (
                    <div
                      key={app.name}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer group"
                    >
                      <div className="flex items-center mb-4">
                        <span className="text-3xl mr-3">{app.icon}</span>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                            {app.name}
                          </h3>
                          <div className="flex items-center space-x-2">
                            {app.premium && (
                              <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                                Premium
                              </span>
                            )}
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              app.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {app.status === 'active' ? 'Active' : 'Coming Soon'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{app.description}</p>
                      <button 
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                        disabled={app.status !== 'active'}
                      >
                        {app.status === 'active' ? 'Launch App' : 'Coming Soon'}
                      </button>
                    </div>
                  ))}
              </div>
            </section>

            {/* Quick Stats */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Usage</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Students</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {userProfile?.usage?.studentsCount || 0}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Courses</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {userProfile?.usage?.coursesCount || 0}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Apps Used</p>
                      <p className="text-2xl font-bold text-gray-900">1</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Plan</p>
                      <p className="text-2xl font-bold text-gray-900">{userProfile?.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'all-apps' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">All Applications</h2>
              <div className="text-sm text-gray-500">
                {apps.length} total apps • {apps.filter(app => app.status === 'active').length} active
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                All Apps ({apps.length})
              </button>
              {Array.from(new Set(apps.map(app => app.category))).map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {category} ({apps.filter(app => app.category === category).length})
                </button>
              ))}
            </div>

            {/* Apps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredApps.map((app) => (
                <div key={app.name} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">{app.icon}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900">{app.name}</h3>
                          <p className="text-sm text-blue-600">{app.category}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        {app.premium && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Premium</span>
                        )}
                        {app.featured && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Featured</span>
                        )}
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          app.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {app.status === 'active' ? 'Active' : 'Coming Soon'}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-3">{app.description}</p>
                    <div className="mt-4">
                      {app.status === 'active' ? (
                        <a
                          href={app.href}
                          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center block"
                        >
                          Launch App
                        </a>
                      ) : (
                        <button
                          disabled
                          className="w-full bg-gray-200 text-gray-500 py-2 px-4 rounded-lg cursor-not-allowed text-center"
                        >
                          Coming Soon
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
