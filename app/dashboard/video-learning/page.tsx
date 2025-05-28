"use client";

import { useAuth } from "@/libs/hooks";
import { redirect } from "next/navigation";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

export default function VideoToLearningPage() {
  const { session, userProfile, isLoading, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("upload");
  const [dragActive, setDragActive] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div></div>;
  }

  if (!isAuthenticated || !session) {
    redirect('/signin');
  }

  const processedVideos = [
    {
      id: 1,
      title: "Introduction to Photosynthesis",
      duration: "12:34",
      uploadDate: "2 days ago",
      status: "processed",
      thumbnail: "🌱",
      materials: {
        notes: 5,
        quizzes: 2,
        flashcards: 18,
        summary: 1
      },
      keyTopics: ["Chlorophyll", "Light Reactions", "Calvin Cycle", "ATP Production"],
      timestamps: [
        { time: "0:30", topic: "What is Photosynthesis?", type: "concept" },
        { time: "3:45", topic: "Chloroplast Structure", type: "diagram" },
        { time: "7:20", topic: "Light vs Dark Reactions", type: "comparison" },
        { time: "10:15", topic: "Overall Equation", type: "formula" }
      ]
    },
    {
      id: 2,
      title: "World War I Timeline",
      duration: "18:42",
      uploadDate: "1 week ago",
      status: "processed",
      thumbnail: "⚔️",
      materials: {
        notes: 8,
        quizzes: 3,
        flashcards: 25,
        summary: 1
      },
      keyTopics: ["Archduke Franz Ferdinand", "Trench Warfare", "Treaty of Versailles"],
      timestamps: [
        { time: "1:20", topic: "Causes of WWI", type: "analysis" },
        { time: "6:30", topic: "Major Battles", type: "timeline" },
        { time: "12:10", topic: "US Entry into War", type: "event" },
        { time: "16:45", topic: "War's End", type: "conclusion" }
      ]
    },
    {
      id: 3,
      title: "Calculus: Derivatives Explained",
      duration: "15:28",
      uploadDate: "3 days ago",
      status: "processing",
      thumbnail: "📊",
      materials: {
        notes: 0,
        quizzes: 0,
        flashcards: 0,
        summary: 0
      },
      keyTopics: [],
      timestamps: []
    }
  ];

  const recentMaterials = [
    { name: "Photosynthesis Study Notes", type: "notes", video: "Introduction to Photosynthesis", created: "Today" },
    { name: "WWI Quick Quiz", type: "quiz", video: "World War I Timeline", created: "Yesterday" },
    { name: "Calvin Cycle Flashcards", type: "flashcards", video: "Introduction to Photosynthesis", created: "2 days ago" },
    { name: "Derivative Rules Summary", type: "summary", video: "Calculus: Derivatives Explained", created: "3 days ago" }
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      console.log("File dropped:", e.dataTransfer.files[0]);
    }
  };

  return (
    <DashboardLayout>
      <div className="h-full bg-gray-50">
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-3xl mr-3">📹</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Video to Learning</h1>
                <p className="text-gray-600">Extract educational materials from video content with AI</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">{processedVideos.filter(v => v.status === 'processed').length} Videos Processed</span>
              <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
                📁 Browse Files
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("upload")}
                className={`px-6 py-3 font-medium text-sm ${activeTab === "upload" ? "border-b-2 border-indigo-500 text-indigo-600" : "text-gray-500"}`}
              >
                Upload & Process
              </button>
              <button
                onClick={() => setActiveTab("library")}
                className={`px-6 py-3 font-medium text-sm ${activeTab === "library" ? "border-b-2 border-indigo-500 text-indigo-600" : "text-gray-500"}`}
              >
                Video Library
              </button>
              <button
                onClick={() => setActiveTab("materials")}
                className={`px-6 py-3 font-medium text-sm ${activeTab === "materials" ? "border-b-2 border-indigo-500 text-indigo-600" : "text-gray-500"}`}
              >
                Generated Materials
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`px-6 py-3 font-medium text-sm ${activeTab === "analytics" ? "border-b-2 border-indigo-500 text-indigo-600" : "text-gray-500"}`}
              >
                Processing Analytics
              </button>
            </div>
          </div>

          {activeTab === "upload" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white rounded-lg shadow-sm border p-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload Educational Video</h2>
                
                <div
                  className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                    dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="text-6xl mb-4">📹</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {dragActive ? 'Drop your video file here' : 'Drag & drop your video file'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    or <button className="text-indigo-600 hover:text-indigo-700 font-medium">browse to choose</button>
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports MP4, MOV, AVI, WMV (max 500MB)
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="text-md font-medium text-gray-900 mb-3">Or paste a video URL</h3>
                  <div className="flex space-x-3">
                    <input
                      type="url"
                      placeholder="https://youtube.com/watch?v=... or direct video URL"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <button className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
                      Import
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Processing Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Content to Extract</h4>
                    <div className="space-y-2">
                      {[
                        { label: "Detailed Notes", desc: "Comprehensive notes with key points" },
                        { label: "Quiz Questions", desc: "Auto-generated assessment questions" },
                        { label: "Flashcards", desc: "Study cards for key concepts" },
                        { label: "Summary", desc: "Concise overview of main topics" },
                        { label: "Timestamps", desc: "Important moments with navigation" },
                        { label: "Transcription", desc: "Full text transcript" }
                      ].map((item) => (
                        <label key={item.label} className="flex items-start">
                          <input type="checkbox" className="mt-1 mr-3" defaultChecked />
                          <div>
                            <p className="font-medium text-sm">{item.label}</p>
                            <p className="text-xs text-gray-600">{item.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Processing Settings</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Subject Area</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                          <option>Auto-detect</option>
                          <option>Science</option>
                          <option>Mathematics</option>
                          <option>History</option>
                          <option>Literature</option>
                          <option>Languages</option>
                          <option>Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Grade Level</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                          <option>Auto-detect</option>
                          <option>Elementary</option>
                          <option>Middle School</option>
                          <option>High School</option>
                          <option>College</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Processing Quality</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                          <option>Standard (Faster)</option>
                          <option>Enhanced (Recommended)</option>
                          <option>Premium (Most Detailed)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button className="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 font-medium">
                    🚀 Start Processing
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "library" && (
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">Your Video Library</h2>
                    <div className="flex items-center space-x-3">
                      <input
                        type="text"
                        placeholder="Search videos..."
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                      <select className="px-3 py-2 border border-gray-300 rounded-lg">
                        <option>All Videos</option>
                        <option>Processed</option>
                        <option>Processing</option>
                        <option>Failed</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {processedVideos.map((video) => (
                      <div key={video.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-3xl">
                              {video.thumbnail}
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-lg font-semibold text-gray-900">{video.title}</h3>
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  video.status === 'processed' ? 'bg-green-100 text-green-800' :
                                  video.status === 'processing' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                                }`}>
                                  {video.status}
                                </span>
                              </div>
                              
                              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                                <span>⏱️ {video.duration}</span>
                                <span>📅 {video.uploadDate}</span>
                              </div>

                              {video.status === 'processed' && (
                                <div className="space-y-2">
                                  <div className="flex items-center space-x-4 text-sm">
                                    <span className="text-gray-600">Materials:</span>
                                    <span className="text-indigo-600">📝 {video.materials.notes} Notes</span>
                                    <span className="text-green-600">❓ {video.materials.quizzes} Quizzes</span>
                                    <span className="text-purple-600">🎯 {video.materials.flashcards} Flashcards</span>
                                    <span className="text-orange-600">📋 {video.materials.summary} Summary</span>
                                  </div>
                                  
                                  <div className="flex flex-wrap gap-1">
                                    {video.keyTopics.map((topic, index) => (
                                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                        {topic}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col space-y-2">
                            <button 
                              onClick={() => setSelectedVideo(video)}
                              className="px-4 py-2 bg-indigo-500 text-white text-sm rounded hover:bg-indigo-600"
                            >
                              View Materials
                            </button>
                            <button className="px-4 py-2 border border-gray-300 text-sm rounded hover:bg-gray-50">
                              Download
                            </button>
                            <button className="px-4 py-2 border border-gray-300 text-sm rounded hover:bg-gray-50">
                              Share
                            </button>
                          </div>
                        </div>

                        {video.status === 'processed' && video.timestamps.length > 0 && (
                          <div className="mt-4 pt-4 border-t">
                            <h4 className="font-medium text-gray-900 mb-2">Key Timestamps</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {video.timestamps.map((timestamp, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                  <span className="text-sm font-medium text-indigo-600">{timestamp.time}</span>
                                  <span className="text-sm text-gray-900">{timestamp.topic}</span>
                                  <span className="text-xs px-2 py-1 bg-gray-200 rounded">{timestamp.type}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "materials" && (
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Generated Learning Materials</h2>
                  <div className="flex items-center space-x-3">
                    <select className="px-3 py-2 border border-gray-300 rounded-lg">
                      <option>All Materials</option>
                      <option>Notes</option>
                      <option>Quizzes</option>
                      <option>Flashcards</option>
                      <option>Summaries</option>
                    </select>
                    <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
                      Export All
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-blue-600">23</p>
                    <p className="text-sm text-gray-600">Notes Created</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-600">12</p>
                    <p className="text-sm text-gray-600">Quizzes Generated</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-purple-600">89</p>
                    <p className="text-sm text-gray-600">Flashcards Made</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-orange-600">7</p>
                    <p className="text-sm text-gray-600">Summaries Created</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {recentMaterials.map((material, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">
                          {material.type === 'notes' ? '📝' :
                           material.type === 'quiz' ? '❓' :
                           material.type === 'flashcards' ? '🎯' : '📋'}
                        </span>
                        <div>
                          <p className="font-medium text-gray-900">{material.name}</p>
                          <p className="text-sm text-gray-600">From: {material.video} • {material.created}</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-indigo-500 text-white text-sm rounded hover:bg-indigo-600">
                          Open
                        </button>
                        <button className="px-3 py-1 border border-gray-300 text-sm rounded hover:bg-gray-50">
                          Export
                        </button>
                        <button className="px-3 py-1 border border-gray-300 text-sm rounded hover:bg-gray-50">
                          Share
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Videos Processed</p>
                      <p className="text-2xl font-bold text-gray-900">47</p>
                    </div>
                    <span className="text-2xl">📹</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Duration</p>
                      <p className="text-2xl font-bold text-gray-900">12.5 hrs</p>
                    </div>
                    <span className="text-2xl">⏱️</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Materials Generated</p>
                      <p className="text-2xl font-bold text-gray-900">131</p>
                    </div>
                    <span className="text-2xl">📚</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Time Saved</p>
                      <p className="text-2xl font-bold text-gray-900">34 hrs</p>
                    </div>
                    <span className="text-2xl">⚡</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Processing Efficiency</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Average Processing Time</span>
                    <span className="text-sm text-gray-900">3.2 minutes per video hour</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Success Rate</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                      </div>
                      <span className="text-sm text-gray-900">94%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Most Common Subject</span>
                    <span className="text-sm text-gray-900">Science (34%)</span>
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
