"use client";

import { useAuth } from "@/libs/hooks";
import { redirect } from "next/navigation";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

export default function VideoGenerationPage() {
  const { session, userProfile, isLoading, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("create");
  const [script, setScript] = useState("");
  const [videoSettings, setVideoSettings] = useState({
    title: "",
    style: "educational",
    duration: "2-3",
    format: "16:9",
    voiceSpeed: "normal",
    bgMusic: false
  });
  const [isGenerating, setIsGenerating] = useState(false);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div></div>;
  }

  if (!isAuthenticated || !session) {
    redirect('/signin');
  }

  const videos = [
    {
      id: 1,
      title: "Cell Division Process",
      duration: "3:24",
      status: "completed",
      thumbnail: "https://via.placeholder.com/320x180/3B82F6/ffffff?text=Cell+Division",
      views: 89,
      createdAt: "2 hours ago"
    },
    {
      id: 2,
      title: "Photosynthesis Explained",
      duration: "4:12",
      status: "completed",
      thumbnail: "https://via.placeholder.com/320x180/10B981/ffffff?text=Photosynthesis",
      views: 156,
      createdAt: "Yesterday"
    },
    {
      id: 3,
      title: "Math Formulas Guide",
      duration: "0:00",
      status: "generating",
      thumbnail: "https://via.placeholder.com/320x180/8B5CF6/ffffff?text=Generating...",
      views: 0,
      createdAt: "5 minutes ago"
    }
  ];

  const scriptTemplates = [
    {
      title: "Science Concept",
      content: "Today we'll explore [CONCEPT]. First, let's understand what [CONCEPT] means. [CONCEPT] is... Now let's see how this works in practice..."
    },
    {
      title: "Step-by-Step Tutorial",
      content: "In this tutorial, we'll learn how to [TASK]. Step 1: [ACTION]. Step 2: [ACTION]. Step 3: [ACTION]. Let's review what we've learned..."
    },
    {
      title: "Historical Event",
      content: "Let's travel back to [TIME PERIOD] to explore [EVENT]. The background was... Key figures included... The impact was..."
    }
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setActiveTab("library");
    }, 8000);
  };

  return (
    <DashboardLayout>
      <div className="h-full bg-gray-50">
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-3xl mr-3">📽️</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Video Generation</h1>
                <p className="text-gray-600">Create engaging educational videos with AI</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Beta</span>
              <span className="text-sm text-gray-600">
                {userProfile?.role === 'FREE' ? '2/3 videos used' : 'Unlimited'}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("create")}
                className={`px-6 py-3 font-medium text-sm ${activeTab === "create" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
              >
                Create Video
              </button>
              <button
                onClick={() => setActiveTab("library")}
                className={`px-6 py-3 font-medium text-sm ${activeTab === "library" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
              >
                Video Library
              </button>
              <button
                onClick={() => setActiveTab("templates")}
                className={`px-6 py-3 font-medium text-sm ${activeTab === "templates" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
              >
                Script Templates
              </button>
            </div>
          </div>

          {activeTab === "create" && (
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Video Script</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Video Title</label>
                        <input
                          type="text"
                          value={videoSettings.title}
                          onChange={(e) => setVideoSettings({...videoSettings, title: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., Introduction to Cell Biology"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Script Content</label>
                        <textarea
                          value={script}
                          onChange={(e) => setScript(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                          rows={15}
                          placeholder="Write your video script here. Include stage directions, visual cues, and narration..."
                        />
                        <p className="text-sm text-gray-500 mt-2">
                          Estimated video length: {Math.ceil(script.length / 200)} minutes
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Video Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
                        <select
                          value={videoSettings.style}
                          onChange={(e) => setVideoSettings({...videoSettings, style: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          <option value="educational">Educational</option>
                          <option value="presentation">Presentation</option>
                          <option value="animated">Animated</option>
                          <option value="documentary">Documentary</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                        <select
                          value={videoSettings.format}
                          onChange={(e) => setVideoSettings({...videoSettings, format: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          <option value="16:9">Widescreen (16:9)</option>
                          <option value="4:3">Standard (4:3)</option>
                          <option value="9:16">Vertical (9:16)</option>
                          <option value="1:1">Square (1:1)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Voice Speed</label>
                        <select
                          value={videoSettings.voiceSpeed}
                          onChange={(e) => setVideoSettings({...videoSettings, voiceSpeed: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          <option value="slow">Slow</option>
                          <option value="normal">Normal</option>
                          <option value="fast">Fast</option>
                        </select>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={videoSettings.bgMusic}
                          onChange={(e) => setVideoSettings({...videoSettings, bgMusic: e.target.checked})}
                          className="mr-2"
                        />
                        <label className="text-sm font-medium text-gray-700">Background Music</label>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleGenerate}
                      disabled={!script.trim() || !videoSettings.title.trim() || isGenerating}
                      className="w-full mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 transition-colors"
                    >
                      {isGenerating ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Generating Video...
                        </div>
                      ) : (
                        "Generate Video"
                      )}
                    </button>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <button
                        onClick={() => setActiveTab("templates")}
                        className="w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-left"
                      >
                        📝 Use Script Template
                      </button>
                      <button className="w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
                        📎 Import Lesson Plan
                      </button>
                      <button className="w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
                        🎨 AI Script Generator
                      </button>
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
                    <h2 className="text-xl font-semibold text-gray-900">Your Videos</h2>
                    <button
                      onClick={() => setActiveTab("create")}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Create New Video
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((video) => (
                      <div key={video.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="aspect-video bg-gray-100 flex items-center justify-center">
                          {video.status === "generating" ? (
                            <div className="text-center">
                              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                              <p className="text-gray-600">Generating...</p>
                            </div>
                          ) : (
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-2">{video.title}</h3>
                          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                            <span>{video.duration}</span>
                            <span>{video.views} views</span>
                            <span>{video.createdAt}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              video.status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {video.status}
                            </span>
                            {video.status === "completed" && (
                              <div className="flex space-x-2">
                                <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">Play</button>
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

          {activeTab === "templates" && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Script Templates</h2>
                <div className="space-y-6">
                  {scriptTemplates.map((template, index) => (
                    <div key={index} className="border rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{template.title}</h3>
                        <button
                          onClick={() => {
                            setScript(template.content);
                            setActiveTab("create");
                          }}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                          Use Template
                        </button>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-700 whitespace-pre-line">{template.content}</p>
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
