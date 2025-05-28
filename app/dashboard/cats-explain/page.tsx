"use client";

import { useAuth } from "@/libs/hooks";
import { redirect } from "next/navigation";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

export default function TinyCatsExplainPage() {
  const { session, userProfile, isLoading, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("create");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [complexity, setComplexity] = useState("elementary");
  const [catPersonality, setCatPersonality] = useState("curious");
  const [isGenerating, setIsGenerating] = useState(false);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div></div>;
  }

  if (!isAuthenticated || !session) {
    redirect('/signin');
  }

  const catPersonalities = [
    { id: "curious", name: "Curious Whiskers", emoji: "🕵️‍♀️", description: "Always asking 'Why?' and 'How?'" },
    { id: "smart", name: "Professor Mittens", emoji: "🤓", description: "Uses big words and loves facts" },
    { id: "silly", name: "Giggles McFluff", emoji: "😄", description: "Makes everything fun with jokes" },
    { id: "gentle", name: "Peaceful Paws", emoji: "😌", description: "Kind and patient explanations" },
    { id: "excited", name: "Bouncy Tail", emoji: "🤩", description: "Gets super excited about learning" },
    { id: "wise", name: "Ancient Whiskers", emoji: "🧙‍♀️", description: "Tells stories and shares wisdom" }
  ];

  const recentExplanations = [
    {
      id: 1,
      topic: "Why is the sky blue?",
      cat: "Curious Whiskers",
      age: "6-8 years",
      created: "2 hours ago",
      views: 24,
      likes: 18,
      preview: "Meow! You know how when you play with a prism, it makes rainbows? Well, the sky is like a giant invisible prism..."
    },
    {
      id: 2,
      topic: "How do plants make food?",
      cat: "Professor Mittens",
      age: "8-10 years",
      created: "1 day ago",
      views: 67,
      likes: 45,
      preview: "Greetings, young botanist! *adjusts tiny glasses* Plants are remarkable organisms that perform photosynthesis..."
    },
    {
      id: 3,
      topic: "What makes volcanoes erupt?",
      cat: "Bouncy Tail",
      age: "10-12 years",
      created: "2 days ago",
      views: 89,
      likes: 72,
      preview: "OH MY WHISKERS! Volcanoes are SO AMAZING! *bounces excitedly* Deep underground, there's melted rock called magma..."
    },
    {
      id: 4,
      topic: "Why do we have different seasons?",
      cat: "Ancient Whiskers",
      age: "5-7 years",
      created: "3 days ago",
      views: 156,
      likes: 134,
      preview: "Gather around, little ones, for I shall tell you the tale of Earth's grand dance around the Sun..."
    }
  ];

  const popularTopics = [
    "Why is water wet?",
    "How do airplanes fly?",
    "What are emotions?",
    "Why do we dream?",
    "How does the internet work?",
    "What makes rainbows?",
    "Why do leaves change color?",
    "How do our eyes see colors?",
    "What is gravity?",
    "Why do we need to sleep?"
  ];

  const handleGenerate = () => {
    if (!selectedTopic.trim()) return;
    setIsGenerating(true);
    
    // Simulate generation process
    setTimeout(() => {
      setIsGenerating(false);
      // Switch to library tab to show the "generated" explanation
      setActiveTab("library");
    }, 3000);
  };

  return (
    <DashboardLayout>
      <div className="h-full bg-gray-50">
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-3xl mr-3">🐱</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Tiny Cats Explain</h1>
                <p className="text-gray-600">Educational explanations from adorable AI cats for young learners</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">{recentExplanations.length} Explanations Created</span>
              <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
                🎯 Quick Generate
              </button>
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
                Create Explanation
              </button>
              <button
                onClick={() => setActiveTab("library")}
                className={`px-6 py-3 font-medium text-sm ${activeTab === "library" ? "border-b-2 border-purple-500 text-purple-600" : "text-gray-500"}`}
              >
                Explanation Library
              </button>
              <button
                onClick={() => setActiveTab("cats")}
                className={`px-6 py-3 font-medium text-sm ${activeTab === "cats" ? "border-b-2 border-purple-500 text-purple-600" : "text-gray-500"}`}
              >
                Meet the Cats
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`px-6 py-3 font-medium text-sm ${activeTab === "analytics" ? "border-b-2 border-purple-500 text-purple-600" : "text-gray-500"}`}
              >
                Usage Analytics
              </button>
            </div>
          </div>

          {activeTab === "create" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white rounded-lg shadow-sm border p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Explanation</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What topic would you like explained? 🤔
                    </label>
                    <input
                      type="text"
                      value={selectedTopic}
                      onChange={(e) => setSelectedTopic(e.target.value)}
                      placeholder="e.g., Why is the ocean salty? How do computers think? What makes thunder?"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-lg"
                    />
                    
                    <div className="mt-3">
                      <p className="text-sm text-gray-600 mb-2">Popular topics:</p>
                      <div className="flex flex-wrap gap-2">
                        {popularTopics.slice(0, 6).map((topic, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedTopic(topic)}
                            className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full hover:bg-purple-200 transition-colors"
                          >
                            {topic}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Age Group 👶</label>
                      <div className="space-y-2">
                        {[
                          { value: "preschool", label: "Preschool (3-5 years)", desc: "Simple words, lots of pictures" },
                          { value: "elementary", label: "Elementary (6-8 years)", desc: "Basic concepts, fun examples" },
                          { value: "middle", label: "Middle Elementary (8-10 years)", desc: "More details, some science terms" },
                          { value: "preteen", label: "Pre-teen (10-12 years)", desc: "Complex ideas made simple" }
                        ].map((age) => (
                          <label key={age.value} className="flex items-start cursor-pointer">
                            <input
                              type="radio"
                              name="complexity"
                              value={age.value}
                              checked={complexity === age.value}
                              onChange={(e) => setComplexity(e.target.value)}
                              className="mt-1 mr-3"
                            />
                            <div>
                              <p className="font-medium text-sm">{age.label}</p>
                              <p className="text-xs text-gray-600">{age.desc}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Choose Your Cat Teacher 🐱</label>
                      <div className="space-y-2">
                        {catPersonalities.map((cat) => (
                          <label key={cat.id} className="flex items-center cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
                            <input
                              type="radio"
                              name="catPersonality"
                              value={cat.id}
                              checked={catPersonality === cat.id}
                              onChange={(e) => setCatPersonality(e.target.value)}
                              className="mr-3"
                            />
                            <span className="text-2xl mr-3">{cat.emoji}</span>
                            <div>
                              <p className="font-medium text-sm">{cat.name}</p>
                              <p className="text-xs text-gray-600">{cat.description}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-purple-900 mb-3">Preview: Your Cat Teacher Will...</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center">
                        <span className="text-purple-600 mr-2">🎯</span>
                        <span>Explain at the perfect level for {complexity === 'preschool' ? '3-5' : complexity === 'elementary' ? '6-8' : complexity === 'middle' ? '8-10' : '10-12'} year olds</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-purple-600 mr-2">🎭</span>
                        <span>Use {catPersonalities.find(c => c.id === catPersonality)?.name}'s personality style</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-purple-600 mr-2">🖼️</span>
                        <span>Include visual examples and analogies</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-purple-600 mr-2">💭</span>
                        <span>Add follow-up questions to spark curiosity</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleGenerate}
                      disabled={!selectedTopic.trim() || isGenerating}
                      className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                      {isGenerating ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                          Creating Magic...
                        </div>
                      ) : (
                        "✨ Generate Explanation"
                      )}
                    </button>
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
                    <h2 className="text-xl font-semibold text-gray-900">Explanation Library</h2>
                    <div className="flex items-center space-x-3">
                      <input
                        type="text"
                        placeholder="Search explanations..."
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                      <select className="px-3 py-2 border border-gray-300 rounded-lg">
                        <option>All Ages</option>
                        <option>Preschool</option>
                        <option>Elementary</option>
                        <option>Middle Elementary</option>
                        <option>Pre-teen</option>
                      </select>
                      <select className="px-3 py-2 border border-gray-300 rounded-lg">
                        <option>All Cats</option>
                        {catPersonalities.map(cat => <option key={cat.id}>{cat.name}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {recentExplanations.map((explanation) => (
                      <div key={explanation.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-gray-900 mb-2">{explanation.topic}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                              <span>🐱 {explanation.cat}</span>
                              <span>👶 {explanation.age}</span>
                              <span>📅 {explanation.created}</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                          <p className="text-sm text-gray-700 italic">"{explanation.preview}"</p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>👀 {explanation.views} views</span>
                            <span>❤️ {explanation.likes} likes</span>
                          </div>
                          
                          <div className="flex space-x-2">
                            <button className="px-3 py-1 bg-purple-500 text-white text-sm rounded hover:bg-purple-600">
                              Read Full
                            </button>
                            <button className="px-3 py-1 border border-gray-300 text-sm rounded hover:bg-gray-50">
                              Share
                            </button>
                            <button className="px-3 py-1 border border-gray-300 text-sm rounded hover:bg-gray-50">
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "cats" && (
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Meet Your Cat Teachers! 🎓</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {catPersonalities.map((cat) => (
                    <div key={cat.id} className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200 hover:border-purple-400 transition-colors">
                      <div className="text-center mb-4">
                        <div className="text-6xl mb-3">{cat.emoji}</div>
                        <h3 className="text-xl font-bold text-gray-900">{cat.name}</h3>
                        <p className="text-sm text-gray-600 mt-2">{cat.description}</p>
                      </div>

                      <div className="space-y-3 text-sm">
                        <div className="bg-white p-3 rounded-lg">
                          <p className="font-medium text-purple-800 mb-1">Teaching Style:</p>
                          <p className="text-gray-700">
                            {cat.id === 'curious' && "Asks lots of questions to make you think and discover answers together"}
                            {cat.id === 'smart' && "Uses proper scientific terms but explains them in kid-friendly ways"}
                            {cat.id === 'silly' && "Makes learning fun with jokes, puns, and silly examples"}
                            {cat.id === 'gentle' && "Very patient and encouraging, perfect for sensitive learners"}
                            {cat.id === 'excited' && "High energy and enthusiasm that makes everything exciting"}
                            {cat.id === 'wise' && "Tells interesting stories and shares fascinating historical facts"}
                          </p>
                        </div>

                        <div className="bg-white p-3 rounded-lg">
                          <p className="font-medium text-purple-800 mb-1">Best For:</p>
                          <p className="text-gray-700">
                            {cat.id === 'curious' && "Kids who love asking 'why' and 'how'"}
                            {cat.id === 'smart' && "Advanced learners ready for bigger concepts"}
                            {cat.id === 'silly' && "Kids who learn best when they're laughing"}
                            {cat.id === 'gentle' && "Shy kids or those who need extra encouragement"}
                            {cat.id === 'excited' && "High-energy kids who love enthusiasm"}
                            {cat.id === 'wise' && "Kids who love stories and history"}
                          </p>
                        </div>

                        <div className="bg-white p-3 rounded-lg">
                          <p className="font-medium text-purple-800 mb-1">Sample Quote:</p>
                          <p className="text-gray-700 italic">
                            {cat.id === 'curious' && "\"But WHY does that happen? Let's investigate together!\""}
                            {cat.id === 'smart' && "\"The scientific term is 'precipitation,' which means...\""}
                            {cat.id === 'silly' && "\"Why did the atom go to therapy? It had too many electrons!\""}
                            {cat.id === 'gentle' && "\"It's okay if this seems hard - we'll take it step by step.\""}
                            {cat.id === 'excited' && "\"OH WOW! This is the COOLEST thing EVER! Let me tell you why!\""}
                            {cat.id === 'wise' && "\"Long ago, ancient scholars discovered something fascinating...\""}
                          </p>
                        </div>
                      </div>

                      <button className="w-full mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                        Create with {cat.name.split(' ')[0]}
                      </button>
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
                      <p className="text-sm font-medium text-gray-600">Total Explanations</p>
                      <p className="text-2xl font-bold text-gray-900">127</p>
                    </div>
                    <span className="text-2xl">📚</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Views</p>
                      <p className="text-2xl font-bold text-gray-900">2,847</p>
                    </div>
                    <span className="text-2xl">👀</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Average Rating</p>
                      <p className="text-2xl font-bold text-gray-900">4.8★</p>
                    </div>
                    <span className="text-2xl">⭐</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Kids Helped</p>
                      <p className="text-2xl font-bold text-gray-900">1,456</p>
                    </div>
                    <span className="text-2xl">👶</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Popular Cat Teachers</h3>
                  <div className="space-y-3">
                    {[
                      { cat: "Curious Whiskers", percentage: 28, emoji: "🕵️‍♀️" },
                      { cat: "Giggles McFluff", percentage: 24, emoji: "😄" },
                      { cat: "Professor Mittens", percentage: 18, emoji: "🤓" },
                      { cat: "Bouncy Tail", percentage: 15, emoji: "🤩" },
                      { cat: "Ancient Whiskers", percentage: 10, emoji: "🧙‍♀️" },
                      { cat: "Peaceful Paws", percentage: 5, emoji: "😌" }
                    ].map((cat, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-xl mr-3">{cat.emoji}</span>
                          <span className="text-sm font-medium text-gray-700">{cat.cat}</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                            <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${cat.percentage}%` }}></div>
                          </div>
                          <span className="text-sm text-gray-900">{cat.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Age Groups</h3>
                  <div className="space-y-3">
                    {[
                      { age: "Elementary (6-8 years)", percentage: 35, color: "bg-blue-500" },
                      { age: "Middle Elementary (8-10 years)", percentage: 30, color: "bg-green-500" },
                      { age: "Pre-teen (10-12 years)", percentage: 25, color: "bg-yellow-500" },
                      { age: "Preschool (3-5 years)", percentage: 10, color: "bg-red-500" }
                    ].map((age, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{age.age}</span>
                        <div className="flex items-center">
                          <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                            <div className={`${age.color} h-2 rounded-full`} style={{ width: `${age.percentage}%` }}></div>
                          </div>
                          <span className="text-sm text-gray-900">{age.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Requested Topics</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[
                    { topic: "Space & Planets", count: 89 },
                    { topic: "Animals", count: 76 },
                    { topic: "How Things Work", count: 67 },
                    { topic: "Nature & Weather", count: 54 },
                    { topic: "Human Body", count: 43 },
                    { topic: "Math Concepts", count: 38 },
                    { topic: "History", count: 32 },
                    { topic: "Science Experiments", count: 28 },
                    { topic: "Technology", count: 24 },
                    { topic: "Art & Music", count: 19 }
                  ].map((topic, index) => (
                    <div key={index} className="text-center p-3 bg-purple-50 rounded-lg">
                      <p className="text-lg font-bold text-purple-600">{topic.count}</p>
                      <p className="text-xs text-gray-700">{topic.topic}</p>
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
