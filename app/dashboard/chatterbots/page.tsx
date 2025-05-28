"use client";

import { useAuth } from "@/libs/hooks";
import { redirect } from "next/navigation";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

export default function ChatterBotsPage() {
  const { session, userProfile, isLoading, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("bots");
  const [selectedBot, setSelectedBot] = useState(null);
  const [chatMessage, setChatMessage] = useState("");

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div></div>;
  }

  if (!isAuthenticated || !session) {
    redirect('/signin');
  }

  const chatterbots = [
    {
      id: 1,
      name: "MathBot Einstein",
      subject: "Mathematics",
      personality: "Brilliant & Patient",
      avatar: "🧮",
      description: "Helps students understand complex mathematical concepts with step-by-step explanations",
      interactions: 1247,
      rating: 4.8,
      active: true,
      specialties: ["Algebra", "Calculus", "Geometry", "Statistics"]
    },
    {
      id: 2,
      name: "ScienceBot Curie",
      subject: "Science",
      personality: "Curious & Encouraging",
      avatar: "🔬",
      description: "Explores scientific concepts through experiments and real-world applications",
      interactions: 892,
      rating: 4.9,
      active: true,
      specialties: ["Chemistry", "Physics", "Biology", "Lab Safety"]
    },
    {
      id: 3,
      name: "HistoryBot Churchill",
      subject: "History",
      personality: "Wise & Storyteller",
      avatar: "📜",
      description: "Brings historical events to life through engaging narratives and context",
      interactions: 634,
      rating: 4.7,
      active: false,
      specialties: ["World Wars", "Ancient History", "Government", "Geography"]
    },
    {
      id: 4,
      name: "LitBot Shakespeare",
      subject: "Literature",
      personality: "Creative & Analytical",
      avatar: "📚",
      description: "Analyzes literature and helps students develop writing and reading skills",
      interactions: 756,
      rating: 4.6,
      active: true,
      specialties: ["Poetry", "Essay Writing", "Book Analysis", "Grammar"]
    }
  ];

  const chatHistory = [
    { sender: "student", message: "Can you explain quadratic equations?", time: "2:30 PM" },
    { sender: "bot", message: "Of course! A quadratic equation is a polynomial equation of degree 2. It has the general form ax² + bx + c = 0, where a ≠ 0. Let me break this down for you...", time: "2:31 PM" },
    { sender: "student", message: "What does the discriminant tell us?", time: "2:33 PM" },
    { sender: "bot", message: "Great question! The discriminant (b² - 4ac) tells us about the nature of the roots. If it's positive, we have two real roots. If zero, one repeated root. If negative, two complex roots.", time: "2:34 PM" }
  ];

  const botTemplates = [
    { name: "Subject Expert", icon: "🎓", description: "Deep knowledge in specific academic subjects" },
    { name: "Study Buddy", icon: "👥", description: "Friendly companion for homework and review sessions" },
    { name: "Test Prep Coach", icon: "📝", description: "Focused on exam preparation and practice questions" },
    { name: "Creative Writing Assistant", icon: "✍️", description: "Helps with creative writing and storytelling" },
    { name: "Language Tutor", icon: "🌍", description: "Specialized in language learning and practice" },
    { name: "STEM Problem Solver", icon: "🧪", description: "Technical problem-solving for science and math" }
  ];

  const studentInteractions = [
    { student: "Emma S.", bot: "MathBot Einstein", messages: 45, lastActive: "5 minutes ago", progress: "Improved 23%" },
    { student: "Alex M.", bot: "ScienceBot Curie", messages: 32, lastActive: "15 minutes ago", progress: "Improved 18%" },
    { student: "Sarah L.", bot: "LitBot Shakespeare", messages: 28, lastActive: "1 hour ago", progress: "Improved 31%" },
    { student: "Marcus R.", bot: "MathBot Einstein", messages: 67, lastActive: "2 hours ago", progress: "Improved 27%" }
  ];

  return (
    <DashboardLayout>
      <div className="h-full bg-gray-50">
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-3xl mr-3">🤖</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ChatterBots</h1>
                <p className="text-gray-600">Create and manage AI tutoring assistants for your students</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">4 Active Bots</span>
              <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
                Create New Bot
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("bots")}
                className={`px-6 py-3 font-medium text-sm ${activeTab === "bots" ? "border-b-2 border-indigo-500 text-indigo-600" : "text-gray-500"}`}
              >
                My ChatterBots
              </button>
              <button
                onClick={() => setActiveTab("create")}
                className={`px-6 py-3 font-medium text-sm ${activeTab === "create" ? "border-b-2 border-indigo-500 text-indigo-600" : "text-gray-500"}`}
              >
                Create Bot
              </button>
              <button
                onClick={() => setActiveTab("interactions")}
                className={`px-6 py-3 font-medium text-sm ${activeTab === "interactions" ? "border-b-2 border-indigo-500 text-indigo-600" : "text-gray-500"}`}
              >
                Student Interactions
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`px-6 py-3 font-medium text-sm ${activeTab === "analytics" ? "border-b-2 border-indigo-500 text-indigo-600" : "text-gray-500"}`}
              >
                Bot Analytics
              </button>
            </div>
          </div>

          {activeTab === "bots" && (
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {chatterbots.map((bot) => (
                      <div key={bot.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <span className="text-3xl mr-3">{bot.avatar}</span>
                            <div>
                              <h3 className="font-semibold text-gray-900">{bot.name}</h3>
                              <p className="text-sm text-gray-600">{bot.subject} • {bot.personality}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`w-3 h-3 rounded-full ${bot.active ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                            <span className="text-xs text-gray-500">{bot.active ? 'Active' : 'Inactive'}</span>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-4">{bot.description}</p>

                        <div className="space-y-2 text-sm mb-4">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Interactions:</span>
                            <span className="font-medium">{bot.interactions.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Rating:</span>
                            <span className="font-medium">⭐ {bot.rating}/5.0</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-xs text-gray-500 mb-2">Specialties:</p>
                          <div className="flex flex-wrap gap-1">
                            {bot.specialties.map((specialty, index) => (
                              <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <button
                            onClick={() => setSelectedBot(bot)}
                            className="flex-1 px-3 py-2 bg-indigo-500 text-white text-sm rounded hover:bg-indigo-600"
                          >
                            Chat Test
                          </button>
                          <button className="flex-1 px-3 py-2 border border-gray-300 text-sm rounded hover:bg-gray-50">
                            Edit
                          </button>
                          <button className="px-3 py-2 border border-gray-300 text-sm rounded hover:bg-gray-50">
                            ⚙️
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedBot && (
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <span className="text-2xl mr-2">{selectedBot.avatar}</span>
                        <h3 className="font-semibold text-gray-900">{selectedBot.name}</h3>
                      </div>
                      <button
                        onClick={() => setSelectedBot(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                      {chatHistory.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                            msg.sender === 'student' 
                              ? 'bg-indigo-500 text-white' 
                              : 'bg-gray-100 text-gray-900'
                          }`}>
                            <p>{msg.message}</p>
                            <p className={`text-xs mt-1 ${msg.sender === 'student' ? 'text-indigo-200' : 'text-gray-500'}`}>
                              {msg.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        placeholder="Test message..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                      <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
                        Send
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "create" && (
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Bot Configuration</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bot Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        placeholder="e.g., MathBot Newton"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject Area</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                        <option>Mathematics</option>
                        <option>Science</option>
                        <option>History</option>
                        <option>Literature</option>
                        <option>Languages</option>
                        <option>Arts</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Personality Type</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                        <option>Patient & Encouraging</option>
                        <option>Energetic & Fun</option>
                        <option>Wise & Thoughtful</option>
                        <option>Creative & Imaginative</option>
                        <option>Analytical & Precise</option>
                        <option>Friendly & Casual</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Avatar Emoji</label>
                      <div className="grid grid-cols-6 gap-2">
                        {['🤖', '👨‍🏫', '👩‍🏫', '🧮', '🔬', '📚', '🎨', '🌟', '🎯', '💡', '🚀', '🌈'].map((emoji) => (
                          <button key={emoji} className="p-2 text-2xl border rounded hover:bg-gray-50">
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none"
                        rows={3}
                        placeholder="Describe what this bot specializes in and how it helps students..."
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Bot Templates</h3>
                  <div className="space-y-3">
                    {botTemplates.map((template, index) => (
                      <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{template.icon}</span>
                          <div>
                            <p className="font-medium text-gray-900">{template.name}</p>
                            <p className="text-sm text-gray-600">{template.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Grade Level Focus</label>
                    <div className="space-y-2">
                      {['Elementary (K-5)', 'Middle School (6-8)', 'High School (9-12)', 'College/Adult'].map((level) => (
                        <label key={level} className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-sm">{level}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Special Features</label>
                    <div className="space-y-2">
                      {['Visual Explanations', 'Step-by-Step Solutions', 'Practice Problems', 'Progress Tracking'].map((feature) => (
                        <label key={feature} className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-sm">{feature}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Save as Draft
                  </button>
                  <button className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
                    Create ChatterBot
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "interactions" && (
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Student Interactions</h2>
                <div className="space-y-4">
                  {studentInteractions.map((interaction, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                          <span className="text-indigo-600 font-medium text-sm">
                            {interaction.student.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{interaction.student}</p>
                          <p className="text-sm text-gray-600">Chatting with {interaction.bot}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6 text-sm">
                        <div className="text-center">
                          <p className="font-medium text-gray-900">{interaction.messages}</p>
                          <p className="text-gray-500">Messages</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-gray-900">{interaction.lastActive}</p>
                          <p className="text-gray-500">Last Active</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-green-600">{interaction.progress}</p>
                          <p className="text-gray-500">Progress</p>
                        </div>
                        <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                          View Chat
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
                      <p className="text-sm font-medium text-gray-600">Total Interactions</p>
                      <p className="text-2xl font-bold text-gray-900">3,529</p>
                    </div>
                    <span className="text-2xl">💬</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Students</p>
                      <p className="text-2xl font-bold text-gray-900">67</p>
                    </div>
                    <span className="text-2xl">👥</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                      <p className="text-2xl font-bold text-gray-900">4.7/5</p>
                    </div>
                    <span className="text-2xl">⭐</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Learning Improvement</p>
                      <p className="text-2xl font-bold text-gray-900">+24%</p>
                    </div>
                    <span className="text-2xl">📈</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Bot Performance</h3>
                <div className="space-y-4">
                  {chatterbots.map((bot) => (
                    <div key={bot.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{bot.avatar}</span>
                        <div>
                          <p className="font-medium text-gray-900">{bot.name}</p>
                          <p className="text-sm text-gray-600">{bot.subject}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="text-center">
                          <p className="font-medium text-gray-900">{bot.interactions}</p>
                          <p className="text-gray-500">Interactions</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-gray-900">⭐ {bot.rating}</p>
                          <p className="text-gray-500">Rating</p>
                        </div>
                        <div className="w-24">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-indigo-500 h-2 rounded-full" 
                              style={{ width: `${bot.rating * 20}%` }}
                            ></div>
                          </div>
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
