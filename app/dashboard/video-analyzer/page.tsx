"use client";

import { useAuth } from "@/libs/hooks";
import { redirect } from "next/navigation";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

export default function VideoAnalyzerPage() {
  const { session, userProfile, isLoading, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("analyze");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [analysisType, setAnalysisType] = useState("comprehensive");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div></div>;
  }

  if (!isAuthenticated || !session) {
    redirect('/signin');
  }

  const analyzedVideos = [
    {
      id: 1,
      title: "Climate Change Documentary",
      duration: "45:30",
      uploadDate: "2 days ago",
      status: "analyzed",
      thumbnail: "🌍",
      analysis: {
        engagement: 87,
        clarity: 92,
        pacing: 78,
        educational_value: 95,
        accessibility: 81
      },
      insights: {
        key_concepts: 12,
        visual_aids: 34,
        speaking_pace: "Optimal",
        difficulty_level: "Intermediate",
        target_audience: "High School+"
      },
      recommendations: [
        "Add more visual transitions in sections 3-5",
        "Consider slowing down technical explanations",
        "Include more real-world examples",
        "Add captions for better accessibility"
      ],
      timestamps: [
        { time: "2:30", type: "attention_drop", note: "Complex terminology introduced" },
        { time: "8:45", type: "engagement_peak", note: "Strong visual demonstration" },
        { time: "15:20", type: "pacing_issue", note: "Information density too high" },
        { time: "22:10", type: "positive", note: "Excellent storytelling moment" }
      ]
    },
    {
      id: 2,
      title: "Algebra Basics Tutorial",
      duration: "28:15",
      uploadDate: "5 days ago",
      status: "analyzed",
      thumbnail: "📊",
      analysis: {
        engagement: 72,
        clarity: 88,
        pacing: 85,
        educational_value: 90,
        accessibility: 76
      },
      insights: {
        key_concepts: 8,
        visual_aids: 23,
        speaking_pace: "Good",
        difficulty_level: "Beginner",
        target_audience: "Middle School"
      },
      recommendations: [
        "Add more practice examples",
        "Use color-coding for different types of equations",
        "Include quiz moments for engagement",
        "Break down complex steps further"
      ],
      timestamps: [
        { time: "5:15", type: "confusion_risk", note: "Multiple concepts introduced simultaneously" },
        { time: "12:30", type: "engagement_peak", note: "Interactive problem solving" },
        { time: "20:45", type: "positive", note: "Clear step-by-step breakdown" }
      ]
    },
    {
      id: 3,
      title: "History of Ancient Rome",
      duration: "52:10",
      uploadDate: "1 week ago",
      status: "processing",
      thumbnail: "🏛️",
      analysis: null,
      insights: null,
      recommendations: [],
      timestamps: []
    }
  ];

  const analysisMetrics = [
    { name: "Engagement Score", description: "How well the video holds viewer attention", icon: "📈" },
    { name: "Clarity Rating", description: "How clear and understandable the content is", icon: "💡" },
    { name: "Pacing Analysis", description: "Whether the video moves at an appropriate speed", icon: "⏱️" },
    { name: "Educational Value", description: "How effectively learning objectives are met", icon: "🎓" },
    { name: "Accessibility", description: "How accessible the content is to diverse learners", icon: "♿" },
    { name: "Visual Effectiveness", description: "Quality and impact of visual elements", icon: "👁️" }
  ];

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false);
      setActiveTab("results");
    }, 4000);
  };

  return (
    <DashboardLayout>
      <div className="h-full bg-gray-50">
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-3xl mr-3">🔍</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Video Analyzer</h1>
                <p className="text-gray-600">AI-powered analysis of educational video content and delivery</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">{analyzedVideos.filter(v => v.status === 'analyzed').length} Videos Analyzed</span>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                📊 Quick Analyze
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("analyze")}
                className={`px-6 py-3 font-medium text-sm ${activeTab === "analyze" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
              >
                Analyze Video
              </button>
              <button
                onClick={() => setActiveTab("results")}
                className={`px-6 py-3 font-medium text-sm ${activeTab === "results" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
              >
                Analysis Results
              </button>
              <button
                onClick={() => setActiveTab("compare")}
                className={`px-6 py-3 font-medium text-sm ${activeTab === "compare" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
              >
                Compare Videos
              </button>
              <button
                onClick={() => setActiveTab("insights")}
                className={`px-6 py-3 font-medium text-sm ${activeTab === "insights" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
              >
                Advanced Insights
              </button>
            </div>
          </div>

          {activeTab === "analyze" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white rounded-lg shadow-sm border p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Upload Video for Analysis</h2>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center mb-6">
                  <div className="text-6xl mb-4">🎬</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Upload your educational video</h3>
                  <p className="text-gray-600 mb-4">
                    or <button className="text-blue-600 hover:text-blue-700 font-medium">browse to choose</button>
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports MP4, MOV, AVI, WMV (max 1GB)
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-md font-medium text-gray-900 mb-3">Or analyze a video URL</h3>
                  <div className="flex space-x-3">
                    <input
                      type="url"
                      placeholder="https://youtube.com/watch?v=... or direct video URL"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                      Import
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Configuration</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Analysis Type</h4>
                    <div className="space-y-2">
                      {[
                        { value: "quick", label: "Quick Analysis", desc: "Basic metrics and overview (2-3 min)" },
                        { value: "comprehensive", label: "Comprehensive Analysis", desc: "Detailed insights and recommendations (5-8 min)" },
                        { value: "deep", label: "Deep Learning Analysis", desc: "Advanced AI analysis with pedagogy insights (10-15 min)" }
                      ].map((type) => (
                        <label key={type.value} className="flex items-start cursor-pointer">
                          <input
                            type="radio"
                            name="analysisType"
                            value={type.value}
                            checked={analysisType === type.value}
                            onChange={(e) => setAnalysisType(e.target.value)}
                            className="mt-1 mr-3"
                          />
                          <div>
                            <p className="font-medium text-sm">{type.label}</p>
                            <p className="text-xs text-gray-600">{type.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Focus Areas</h4>
                    <div className="space-y-2">
                      {analysisMetrics.map((metric) => (
                        <label key={metric.name} className="flex items-center">
                          <input type="checkbox" className="mr-3" defaultChecked />
                          <span className="text-lg mr-2">{metric.icon}</span>
                          <div>
                            <p className="font-medium text-sm">{metric.name}</p>
                            <p className="text-xs text-gray-600">{metric.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-3">Additional Settings</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject Area</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                        <option>Auto-detect</option>
                        <option>STEM</option>
                        <option>Humanities</option>
                        <option>Languages</option>
                        <option>Arts</option>
                        <option>Business</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                        <option>Auto-detect</option>
                        <option>K-12</option>
                        <option>Higher Education</option>
                        <option>Professional Training</option>
                        <option>General Public</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                        <option>Auto-detect</option>
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 font-medium"
                  >
                    {isAnalyzing ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                        Analyzing Video...
                      </div>
                    ) : (
                      "🚀 Start Analysis"
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "results" && (
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">Analysis Results</h2>
                    <div className="flex items-center space-x-3">
                      <input
                        type="text"
                        placeholder="Search analyzed videos..."
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      <select className="px-3 py-2 border border-gray-300 rounded-lg">
                        <option>All Videos</option>
                        <option>High Engagement</option>
                        <option>Needs Improvement</option>
                        <option>Recent</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-6">
                    {analyzedVideos.filter(v => v.status === 'analyzed').map((video) => (
                      <div key={video.id} className="border rounded-lg p-6">
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-start space-x-4">
                            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-3xl">
                              {video.thumbnail}
                            </div>
                            
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">{video.title}</h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                                <span>⏱️ {video.duration}</span>
                                <span>📅 {video.uploadDate}</span>
                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                  Analyzed
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <button 
                              onClick={() => setSelectedVideo(video)}
                              className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                            >
                              View Details
                            </button>
                            <button className="px-4 py-2 border border-gray-300 text-sm rounded hover:bg-gray-50">
                              Export Report
                            </button>
                          </div>
                        </div>

                        {/* Analysis Scores */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                          {Object.entries(video.analysis).map(([key, value]) => (
                            <div key={key} className="text-center">
                              <div className="relative w-16 h-16 mx-auto mb-2">
                                <svg className="w-16 h-16 transform -rotate-90">
                                  <circle cx="32" cy="32" r="28" stroke="#e5e7eb" strokeWidth="4" fill="transparent" />
                                  <circle 
                                    cx="32" cy="32" r="28" 
                                    stroke={value >= 80 ? "#10b981" : value >= 60 ? "#f59e0b" : "#ef4444"}
                                    strokeWidth="4" 
                                    fill="transparent"
                                    strokeDasharray={`${(value / 100) * 175.9} 175.9`}
                                  />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-sm font-bold text-gray-900">{value}</span>
                                </div>
                              </div>
                              <p className="text-xs text-gray-600 capitalize">{key.replace('_', ' ')}</p>
                            </div>
                          ))}
                        </div>

                        {/* Key Insights */}
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                          <h4 className="font-medium text-gray-900 mb-3">Key Insights</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">Key Concepts</p>
                              <p className="font-semibold text-blue-600">{video.insights.key_concepts}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Visual Aids</p>
                              <p className="font-semibold text-green-600">{video.insights.visual_aids}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Speaking Pace</p>
                              <p className="font-semibold text-purple-600">{video.insights.speaking_pace}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Difficulty</p>
                              <p className="font-semibold text-orange-600">{video.insights.difficulty_level}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Target Audience</p>
                              <p className="font-semibold text-indigo-600">{video.insights.target_audience}</p>
                            </div>
                          </div>
                        </div>

                        {/* Recommendations */}
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-900 mb-3">AI Recommendations</h4>
                          <div className="space-y-2">
                            {video.recommendations.map((rec, index) => (
                              <div key={index} className="flex items-start">
                                <span className="text-blue-500 mr-2">💡</span>
                                <p className="text-sm text-gray-700">{rec}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Timeline Issues */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Timeline Analysis</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {video.timestamps.map((timestamp, index) => (
                              <div key={index} className={`flex items-center justify-between p-2 rounded ${
                                timestamp.type === 'positive' ? 'bg-green-50' :
                                timestamp.type === 'engagement_peak' ? 'bg-blue-50' :
                                timestamp.type === 'attention_drop' ? 'bg-red-50' : 'bg-yellow-50'
                              }`}>
                                <span className="text-sm font-medium text-blue-600">{timestamp.time}</span>
                                <span className="text-sm text-gray-900 flex-1 mx-3">{timestamp.note}</span>
                                <span className={`text-xs px-2 py-1 rounded ${
                                  timestamp.type === 'positive' ? 'bg-green-200 text-green-800' :
                                  timestamp.type === 'engagement_peak' ? 'bg-blue-200 text-blue-800' :
                                  timestamp.type === 'attention_drop' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'
                                }`}>
                                  {timestamp.type.replace('_', ' ')}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "compare" && (
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Video Comparison</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select First Video</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option>Choose a video...</option>
                      {analyzedVideos.filter(v => v.status === 'analyzed').map(video => (
                        <option key={video.id} value={video.id}>{video.title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Second Video</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option>Choose a video...</option>
                      {analyzedVideos.filter(v => v.status === 'analyzed').map(video => (
                        <option key={video.id} value={video.id}>{video.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="text-center py-12 text-gray-500">
                  <div className="text-6xl mb-4">📊</div>
                  <h3 className="text-lg font-medium mb-2">Select Two Videos to Compare</h3>
                  <p className="text-sm">Compare analysis results side-by-side to identify strengths and improvement areas</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "insights" && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Average Engagement</p>
                      <p className="text-2xl font-bold text-gray-900">82%</p>
                    </div>
                    <span className="text-2xl">📈</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Videos Analyzed</p>
                      <p className="text-2xl font-bold text-gray-900">23</p>
                    </div>
                    <span className="text-2xl">🎬</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Improvement Areas</p>
                      <p className="text-2xl font-bold text-gray-900">47</p>
                    </div>
                    <span className="text-2xl">💡</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Hours Optimized</p>
                      <p className="text-2xl font-bold text-gray-900">156</p>
                    </div>
                    <span className="text-2xl">⏰</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trends</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Overall Content Quality</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '86%' }}></div>
                      </div>
                      <span className="text-sm text-gray-900">86% ↗️</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Student Engagement</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                      <span className="text-sm text-gray-900">78% ↗️</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Accessibility Score</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '74%' }}></div>
                      </div>
                      <span className="text-sm text-gray-900">74% ↗️</span>
                    </div>
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
