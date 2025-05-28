"use client";

import { useAuth } from "@/libs/hooks";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";

export default function DrLeeGPTLivePage() {
  const { session, userProfile, isLoading, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("live");
  const [isLive, setIsLive] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [sessionSettings, setSessionSettings] = useState({
    title: "",
    subject: "general",
    audience: "mixed",
    duration: "30",
    recording: true
  });

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div></div>;
  }

  if (!isAuthenticated || !session) {
    redirect('/signin');
  }

  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        setViewerCount(prev => Math.max(0, prev + Math.floor(Math.random() * 3) - 1));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isLive]);

  const upcomingSessions = [
    {
      id: 1,
      title: "Physics Q&A Session",
      date: "Today, 3:00 PM",
      subject: "Physics",
      attendees: 25,
      status: "scheduled"
    },
    {
      id: 2,
      title: "Math Tutoring Live",
      date: "Tomorrow, 10:00 AM",
      subject: "Mathematics",
      attendees: 18,
      status: "scheduled"
    }
  ];

  const recentSessions = [
    {
      id: 1,
      title: "Biology Exam Prep",
      date: "Yesterday",
      duration: "45 min",
      views: 127,
      recording: "https://example.com/recording1"
    },
    {
      id: 2,
      title: "Chemistry Lab Review",
      date: "2 days ago",
      duration: "32 min",
      views: 89,
      recording: "https://example.com/recording2"
    }
  ];

  const handleStartLive = () => {
    setIsLive(true);
    setViewerCount(Math.floor(Math.random() * 20) + 5);
    setMessages([
      { user: "System", text: "Live session started! Welcome everyone!", time: new Date().toLocaleTimeString() }
    ]);
  };

  const handleEndLive = () => {
    setIsLive(false);
    setViewerCount(0);
    setMessages([]);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages(prev => [...prev, {
        user: "Dr. Lee",
        text: message,
        time: new Date().toLocaleTimeString()
      }]);
      setMessage("");
    }
  };

  return (
    <DashboardLayout>
      <div className="h-full bg-gray-50">
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-3xl mr-3">📡</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">DrLeeGPT Live</h1>
                <p className="text-gray-600">Interactive live learning sessions</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {isLive ? (
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-600 font-medium">LIVE</span>
                  <span className="text-gray-600">{viewerCount} viewers</span>
                </div>
              ) : (
                <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">Offline</span>
              )}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("live")}
                className={`px-6 py-3 font-medium text-sm ${activeTab === "live" ? "border-b-2 border-green-500 text-green-600" : "text-gray-500"}`}
              >
                Live Session
              </button>
              <button
                onClick={() => setActiveTab("schedule")}
                className={`px-6 py-3 font-medium text-sm ${activeTab === "schedule" ? "border-b-2 border-green-500 text-green-600" : "text-gray-500"}`}
              >
                Schedule
              </button>
              <button
                onClick={() => setActiveTab("recordings")}
                className={`px-6 py-3 font-medium text-sm ${activeTab === "recordings" ? "border-b-2 border-green-500 text-green-600" : "text-gray-500"}`}
              >
                Recordings
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`px-6 py-3 font-medium text-sm ${activeTab === "analytics" ? "border-b-2 border-green-500 text-green-600" : "text-gray-500"}`}
              >
                Analytics
              </button>
            </div>
          </div>

          {activeTab === "live" && (
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white rounded-lg shadow-sm border">
                    <div className="p-6 border-b">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900">Live Stream</h2>
                        {isLive ? (
                          <button
                            onClick={handleEndLive}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                          >
                            End Session
                          </button>
                        ) : (
                          <button
                            onClick={handleStartLive}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                          >
                            Go Live
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="aspect-video bg-gray-900 flex items-center justify-center relative">
                      {isLive ? (
                        <div className="text-center text-white">
                          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                            <span className="text-3xl">🎥</span>
                          </div>
                          <h3 className="text-xl font-semibold mb-2">Live Session Active</h3>
                          <p className="text-green-400">Broadcasting to {viewerCount} viewers</p>
                        </div>
                      ) : (
                        <div className="text-center text-gray-400">
                          <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mb-4 mx-auto">
                            <span className="text-3xl">📺</span>
                          </div>
                          <h3 className="text-xl font-semibold mb-2">Stream Offline</h3>
                          <p>Click "Go Live" to start your session</p>
                        </div>
                      )}
                      
                      {isLive && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          LIVE
                        </div>
                      )}
                    </div>
                  </div>

                  {!isLive && (
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Settings</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Session Title</label>
                          <input
                            type="text"
                            value={sessionSettings.title}
                            onChange={(e) => setSessionSettings({...sessionSettings, title: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            placeholder="e.g., Physics Q&A Session"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                          <select
                            value={sessionSettings.subject}
                            onChange={(e) => setSessionSettings({...sessionSettings, subject: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          >
                            <option value="general">General</option>
                            <option value="math">Mathematics</option>
                            <option value="science">Science</option>
                            <option value="history">History</option>
                            <option value="language">Language Arts</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                          <select
                            value={sessionSettings.audience}
                            onChange={(e) => setSessionSettings({...sessionSettings, audience: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          >
                            <option value="mixed">Mixed Ages</option>
                            <option value="elementary">Elementary</option>
                            <option value="middle">Middle School</option>
                            <option value="high">High School</option>
                            <option value="college">College</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Duration (min)</label>
                          <select
                            value={sessionSettings.duration}
                            onChange={(e) => setSessionSettings({...sessionSettings, duration: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          >
                            <option value="15">15 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="45">45 minutes</option>
                            <option value="60">1 hour</option>
                          </select>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center">
                        <input
                          type="checkbox"
                          checked={sessionSettings.recording}
                          onChange={(e) => setSessionSettings({...sessionSettings, recording: e.target.checked})}
                          className="mr-2"
                        />
                        <label className="text-sm font-medium text-gray-700">Record this session</label>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-sm border">
                    <div className="p-4 border-b">
                      <h3 className="font-semibold text-gray-900">Live Chat</h3>
                    </div>
                    <div className="h-80 p-4 overflow-y-auto">
                      {messages.length === 0 ? (
                        <p className="text-gray-500 text-center">Chat will appear here during live session</p>
                      ) : (
                        <div className="space-y-3">
                          {messages.map((msg, index) => (
                            <div key={index} className="text-sm">
                              <div className="flex items-start space-x-2">
                                <span className="font-medium text-blue-600">{msg.user}:</span>
                                <span className="text-gray-700">{msg.text}</span>
                              </div>
                              <span className="text-xs text-gray-400">{msg.time}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {isLive && (
                      <div className="p-4 border-t">
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                            placeholder="Type a message..."
                          />
                          <button
                            onClick={handleSendMessage}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border p-4">
                    <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-2">
                      <button className="w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
                        📋 Share Screen
                      </button>
                      <button className="w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
                        📝 Open Whiteboard
                      </button>
                      <button className="w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
                        📊 Show Poll
                      </button>
                      <button className="w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
                        🎵 Play Audio
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "schedule" && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">Upcoming Sessions</h2>
                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                      Schedule New Session
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {upcomingSessions.map((session) => (
                      <div key={session.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{session.title}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                              <span>{session.date}</span>
                              <span>Subject: {session.subject}</span>
                              <span>{session.attendees} registered</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">Edit</button>
                            <button className="px-3 py-1 border border-gray-300 text-sm rounded hover:bg-gray-50">Cancel</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "recordings" && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-900">Session Recordings</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentSessions.map((session) => (
                      <div key={session.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{session.title}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                              <span>{session.date}</span>
                              <span>Duration: {session.duration}</span>
                              <span>{session.views} views</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">Watch</button>
                            <button className="px-3 py-1 border border-gray-300 text-sm rounded hover:bg-gray-50">Download</button>
                            <button className="px-3 py-1 border border-gray-300 text-sm rounded hover:bg-gray-50">Share</button>
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                      <p className="text-2xl font-bold text-gray-900">24</p>
                    </div>
                    <span className="text-2xl">📡</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Viewers</p>
                      <p className="text-2xl font-bold text-gray-900">1,847</p>
                    </div>
                    <span className="text-2xl">👥</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg Duration</p>
                      <p className="text-2xl font-bold text-gray-900">38 min</p>
                    </div>
                    <span className="text-2xl">⏱️</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Engagement</p>
                      <p className="text-2xl font-bold text-gray-900">92%</p>
                    </div>
                    <span className="text-2xl">📈</span>
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
