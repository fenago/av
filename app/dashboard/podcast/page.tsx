"use client";

import { useAuth } from "@/libs/hooks";
import { redirect } from "next/navigation";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

export default function LessonToPodcastPage() {
  const { session, userProfile, isLoading, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("create");
  const [lessonContent, setLessonContent] = useState("");
  const [podcastSettings, setPodcastSettings] = useState({
    title: "",
    duration: "10-15",
    style: "conversational",
    voices: "2",
    background: "none"
  });
  const [isGenerating, setIsGenerating] = useState(false);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div></div>;
  }

  if (!isAuthenticated || !session) {
    redirect('/signin');
  }

  const podcasts = [
    {
      id: 1,
      title: "Introduction to Photosynthesis",
      duration: "12:34",
      status: "completed",
      createdAt: "2 hours ago",
      listens: 47,
      url: "#"
    },
    {
      id: 2,
      title: "World War II Timeline",
      duration: "18:22",
      status: "completed",
      createdAt: "Yesterday",
      listens: 156,
      url: "#"
    },
    {
      id: 3,
      title: "Algebra Basics",
      duration: "0:00",
      status: "generating",
      createdAt: "5 minutes ago",
      listens: 0,
      url: "#"
    }
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setActiveTab("library");
    }, 5000);
  };

  return (
    <DashboardLayout>
      <div className="h-full bg-gray-50">
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-3xl mr-3">🎧</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Lesson to Podcast</h1>
                <p className="text-gray-600">Transform your lessons into engaging audio content</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">AI-Powered</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("create")}
                className={`px-6 py-3 font-medium text-sm ${activeTab === "create" ? "border-b-2 border-purple-500 text-purple-600" : "text-gray-500"}`}
              >
                Create Podcast
              </button>
              <button
                onClick={() => setActiveTab("library")}
                className={`px-6 py-3 font-medium text-sm ${activeTab === "library" ? "border-b-2 border-purple-500 text-purple-600" : "text-gray-500"}`}
              >
                Podcast Library
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`px-6 py-3 font-medium text-sm ${activeTab === "analytics" ? "border-b-2 border-purple-500 text-purple-600" : "text-gray-500"}`}
              >
                Analytics
              </button>
            </div>
          </div>

          {activeTab === "create" && (
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Lesson Content</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Podcast Title</label>
                        <input
                          type="text"
                          value={podcastSettings.title}
                          onChange={(e) => setPodcastSettings({...podcastSettings, title: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                          placeholder="e.g., Introduction to Photosynthesis"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Lesson Content</label>
                        <textarea
                          value={lessonContent}
                          onChange={(e) => setLessonContent(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 resize-none"
                          rows={12}
                          placeholder="Paste your lesson content, notes, or upload a document..."
                        />
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">📎 Upload File</button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">🎥 Import Video</button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">📊 Import Slides</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Podcast Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                        <select
                          value={podcastSettings.duration}
                          onChange={(e) => setPodcastSettings({...podcastSettings, duration: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          <option value="5-10">5-10 minutes</option>
                          <option value="10-15">10-15 minutes</option>
                          <option value="15-20">15-20 minutes</option>
                          <option value="20-30">20-30 minutes</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
                        <select
                          value={podcastSettings.style}
                          onChange={(e) => setPodcastSettings({...podcastSettings, style: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          <option value="conversational">Conversational</option>
                          <option value="lecture">Lecture Style</option>
                          <option value="interview">Interview Format</option>
                          <option value="storytelling">Storytelling</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Voices</label>
                        <select
                          value={podcastSettings.voices}
                          onChange={(e) => setPodcastSettings({...podcastSettings, voices: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          <option value="1">Single Narrator</option>
                          <option value="2">Two Speakers</option>
                          <option value="3">Panel Discussion</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Background Music</label>
                        <select
                          value={podcastSettings.background}
                          onChange={(e) => setPodcastSettings({...podcastSettings, background: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          <option value="none">None</option>
                          <option value="ambient">Ambient</option>
                          <option value="educational">Educational</option>
                          <option value="upbeat">Upbeat</option>
                        </select>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleGenerate}
                      disabled={!lessonContent.trim() || !podcastSettings.title.trim() || isGenerating}
                      className="w-full mt-6 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-gray-300 transition-colors"
                    >
                      {isGenerating ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Generating...
                        </div>
                      ) : (
                        "Generate Podcast"
                      )}
                    </button>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview Features</h3>
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-start">
                        <span className="mr-2">🎯</span>
                        <span>AI-powered script generation</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2">🗣️</span>
                        <span>Natural voice synthesis</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2">🎵</span>
                        <span>Background music integration</span>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2">📱</span>
                        <span>Export to major platforms</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "library" && (
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">Your Podcasts</h2>
                    <button
                      onClick={() => setActiveTab("create")}
                      className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                    >
                      Create New
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {podcasts.map((podcast) => (
                      <div key={podcast.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                              {podcast.status === "generating" ? (
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
                              ) : (
                                <span className="text-xl">🎧</span>
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{podcast.title}</h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span>Duration: {podcast.duration}</span>
                                <span>Created: {podcast.createdAt}</span>
                                <span>Listens: {podcast.listens}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              podcast.status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {podcast.status}
                            </span>
                            {podcast.status === "completed" && (
                              <div className="flex space-x-2">
                                <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">Play</button>
                                <button className="px-3 py-1 border border-gray-300 text-sm rounded hover:bg-gray-50">Download</button>
                                <button className="px-3 py-1 border border-gray-300 text-sm rounded hover:bg-gray-50">Share</button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Podcasts</p>
                      <p className="text-2xl font-bold text-gray-900">12</p>
                    </div>
                    <span className="text-2xl">🎧</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Listens</p>
                      <p className="text-2xl font-bold text-gray-900">1,247</p>
                    </div>
                    <span className="text-2xl">📊</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg Duration</p>
                      <p className="text-2xl font-bold text-gray-900">14:32</p>
                    </div>
                    <span className="text-2xl">⏱️</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Most Popular</p>
                      <p className="text-lg font-bold text-gray-900">Biology 101</p>
                    </div>
                    <span className="text-2xl">🔥</span>
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
