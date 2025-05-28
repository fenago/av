"use client";

import { useAuth } from "@/libs/hooks";
import { redirect } from "next/navigation";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

interface Material {
  id: number;
  title: string;
  type: string;
  duration?: string;
  pages?: number;
  slides?: number;
  uploadDate: string;
  persona: string;
  description: string;
}

export default function TalkToMaterialsPage() {
  const { session, userProfile, isLoading, isAuthenticated } = useAuth();
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [materialPreviewOpen, setMaterialPreviewOpen] = useState(true);

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

  const materials: Material[] = [
    {
      id: 1,
      title: "Psychology 101 Lecture - Cognitive Biases",
      type: "Video Recording",
      duration: "45 min",
      uploadDate: "2 days ago",
      persona: "Dr. Sarah Chen",
      description: "Comprehensive overview of cognitive biases and their impact on decision-making"
    },
    {
      id: 2,
      title: "Biology Textbook Chapter 3",
      type: "PDF Document",
      pages: 24,
      uploadDate: "1 week ago",
      persona: "Professor Biology",
      description: "Cell structure and function, including organelles and cellular processes"
    },
    {
      id: 3,
      title: "History Presentation - World War II",
      type: "PowerPoint",
      slides: 42,
      uploadDate: "3 days ago",
      persona: "Historian Alex",
      description: "Timeline and key events of World War II from 1939-1945"
    },
    {
      id: 4,
      title: "Math Problem Set Solutions",
      type: "PDF Document",
      pages: 12,
      uploadDate: "Yesterday",
      persona: "Math Tutor Mike",
      description: "Step-by-step solutions for calculus differentiation problems"
    }
  ];

  const conversationHistory = [
    { material: "Psychology 101 Lecture", lastMessage: "Can you explain confirmation bias again?", time: "2 hours ago" },
    { material: "Biology Textbook", lastMessage: "What's the difference between mitosis and meiosis?", time: "1 day ago" },
    { material: "History Presentation", lastMessage: "Tell me about the Battle of Normandy", time: "2 days ago" }
  ];

  const handleSelectMaterial = (material: Material) => {
    setSelectedMaterial(material);
    setMessages([
      {
        id: 1,
        type: "assistant",
        content: `Hello! I'm ${material.persona}, your AI persona based on "${material.title}". I have all the knowledge from this material and I'm ready to answer your questions or discuss any topics covered. What would you like to explore?`,
        timestamp: new Date()
      }
    ]);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !selectedMaterial) return;

    const newMessage = {
      id: messages.length + 1,
      type: "user",
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");

    setTimeout(() => {
      const responses = [
        "That's a great question! Based on the material, I can explain that concept in detail...",
        "Let me reference the specific section that covers this topic...",
        "According to the content, here's what you need to know...",
        "I can see how that might be confusing. Let me break it down step by step...",
        "That's an excellent observation! The material discusses this in depth..."
      ];

      const aiResponse = {
        id: messages.length + 2,
        type: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  if (!selectedMaterial) {
    return (
      <DashboardLayout>
        <div className="h-full flex flex-col">
          <div className="bg-white border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-3xl mr-3">🗣️</span>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Talk to Your Materials</h1>
                  <p className="text-gray-600">Transform your content into conversational AI personas</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">Interactive</span>
                <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
                  + Upload Material
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Materials</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {materials.map((material) => (
                    <div
                      key={material.id}
                      onClick={() => handleSelectMaterial(material)}
                      className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                            {material.type === 'Video Recording' && <span className="text-xl">🎥</span>}
                            {material.type === 'PDF Document' && <span className="text-xl">📄</span>}
                            {material.type === 'PowerPoint' && <span className="text-xl">📊</span>}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{material.title}</h3>
                            <p className="text-sm text-gray-600">{material.type}</p>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-4">{material.description}</p>
                      
                      <div className="space-y-2 text-sm text-gray-500 mb-4">
                        {material.duration && (
                          <div className="flex justify-between">
                            <span>Duration:</span>
                            <span>{material.duration}</span>
                          </div>
                        )}
                        {material.pages && (
                          <div className="flex justify-between">
                            <span>Pages:</span>
                            <span>{material.pages}</span>
                          </div>
                        )}
                        {material.slides && (
                          <div className="flex justify-between">
                            <span>Slides:</span>
                            <span>{material.slides}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>Uploaded:</span>
                          <span>{material.uploadDate}</span>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-purple-700">Persona: {material.persona}</span>
                          <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                            Start Talking →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border-2 border-dashed border-gray-300 flex flex-col items-center justify-center min-h-[300px]">
                    <div className="text-4xl mb-4 text-gray-400">📁</div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Upload New Material</h3>
                    <p className="text-sm text-gray-500 text-center mb-4">
                      Add videos, PDFs, presentations, or documents to create conversational AI personas
                    </p>
                    <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
                      Choose Files
                    </button>
                  </div>
                </div>
              </div>

              {conversationHistory.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Conversations</h2>
                  <div className="space-y-3">
                    {conversationHistory.map((conv, index) => (
                      <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{conv.material}</p>
                          <p className="text-sm text-gray-600">"{conv.lastMessage}"</p>
                        </div>
                        <div className="text-sm text-gray-500">{conv.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="h-full flex flex-col">
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSelectedMaterial(null)}
                className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
              >
                ←
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Talking with {selectedMaterial.persona}</h1>
                <p className="text-sm text-gray-600">{selectedMaterial.title}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setMaterialPreviewOpen(!materialPreviewOpen)}
                className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-50"
              >
                {materialPreviewOpen ? 'Hide' : 'Show'} Material
              </button>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">Active</span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex">
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-3xl p-4 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div className={`text-xs mt-2 ${
                      message.type === 'user' ? 'text-purple-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={`Ask ${selectedMaterial.persona} anything about "${selectedMaterial.title}"...`}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows={3}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </div>

          {materialPreviewOpen && (
            <div className="w-80 bg-gray-50 border-l border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Material Info</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-medium text-gray-900 mb-2">{selectedMaterial.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{selectedMaterial.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Type:</span>
                      <span className="text-gray-900">{selectedMaterial.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Persona:</span>
                      <span className="text-gray-900">{selectedMaterial.persona}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Uploaded:</span>
                      <span className="text-gray-900">{selectedMaterial.uploadDate}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-medium text-gray-900 mb-3">Quick Questions</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => setInputMessage("Can you summarize the main points?")}
                      className="w-full text-left p-2 text-sm bg-gray-50 hover:bg-gray-100 rounded border"
                    >
                      Summarize main points
                    </button>
                    <button
                      onClick={() => setInputMessage("What are the key takeaways?")}
                      className="w-full text-left p-2 text-sm bg-gray-50 hover:bg-gray-100 rounded border"
                    >
                      Key takeaways
                    </button>
                    <button
                      onClick={() => setInputMessage("Can you quiz me on this material?")}
                      className="w-full text-left p-2 text-sm bg-gray-50 hover:bg-gray-100 rounded border"
                    >
                      Quiz me
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
