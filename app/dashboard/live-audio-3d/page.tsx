"use client";

import { useAuth } from "@/libs/hooks";
import { redirect } from "next/navigation";
import { useState, useRef } from "react";
import DashboardLayout from "@/components/DashboardLayout";

export default function LiveAudio3DPage() {
  const { session, userProfile, isLoading, isAuthenticated } = useAuth();
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visualMode, setVisualMode] = useState("wave");
  const [activePreset, setActivePreset] = useState("education");
  const canvasRef = useRef(null);

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

  const visualModes = [
    { id: "wave", name: "Waveform", icon: "〰️" },
    { id: "spectrum", name: "Spectrum", icon: "📊" },
    { id: "3d-sphere", name: "3D Sphere", icon: "🌍" },
    { id: "neural", name: "Neural Network", icon: "🧠" },
    { id: "molecular", name: "Molecular", icon: "⚛️" }
  ];

  const presets = [
    { id: "education", name: "Education Mode", color: "#3B82F6", description: "Optimized for teaching" },
    { id: "presentation", name: "Presentation", color: "#8B5CF6", description: "Professional presentations" },
    { id: "meditation", name: "Meditation", color: "#10B981", description: "Calming visuals" },
    { id: "science", name: "Science Demo", color: "#F59E0B", description: "Scientific visualization" },
    { id: "creative", name: "Creative Mode", color: "#EF4444", description: "Artistic expression" }
  ];

  const recentSessions = [
    { id: 1, title: "Biology Lecture - Cell Division", duration: "45:23", date: "Today", visual: "3d-sphere" },
    { id: 2, title: "Math Tutorial - Algebra", duration: "28:17", date: "Yesterday", visual: "neural" },
    { id: 3, title: "Physics Demo - Wave Motion", duration: "33:45", date: "2 days ago", visual: "wave" },
    { id: 4, title: "Chemistry - Molecular Structure", duration: "52:12", date: "1 week ago", visual: "molecular" }
  ];

  const startRecording = () => {
    setIsRecording(true);
    // Start recording logic here
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Stop recording logic here
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    // Toggle playback logic here
  };

  return (
    <DashboardLayout>
      <div className="h-full flex flex-col">
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-3xl mr-3">🎵</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Live Audio + 3D Visuals</h1>
                <p className="text-gray-600">Real-time audio visualization for immersive learning experiences</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Live</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Active</span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex">
          <div className="w-80 bg-gray-50 border-r border-gray-200 p-6">
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Visual Modes</h3>
              <div className="space-y-2">
                {visualModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setVisualMode(mode.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      visualMode === mode.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-xl mr-3">{mode.icon}</span>
                      <span className="font-medium">{mode.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Presets</h3>
              <div className="space-y-2">
                {presets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setActivePreset(preset.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors border ${
                      activePreset === preset.id
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-3"
                        style={{ backgroundColor: preset.color }}
                      ></div>
                      <div>
                        <div className="font-medium">{preset.name}</div>
                        <div className="text-xs text-gray-500">{preset.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Audio Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sensitivity</label>
                  <input type="range" className="w-full" min="0" max="100" defaultValue="50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Response Speed</label>
                  <input type="range" className="w-full" min="0" max="100" defaultValue="75" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color Intensity</label>
                  <input type="range" className="w-full" min="0" max="100" defaultValue="60" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <div className="flex-1 p-6">
              <div className="bg-black rounded-lg h-full relative overflow-hidden">
                <canvas
                  ref={canvasRef}
                  className="w-full h-full"
                  style={{ background: 'linear-gradient(45deg, #000428, #004e92)' }}
                />
                
                {/* Demo visualization overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {visualMode === "wave" && (
                    <div className="flex items-center space-x-1">
                      {[...Array(20)].map((_, i) => (
                        <div
                          key={i}
                          className="bg-blue-400 w-1 animate-pulse"
                          style={{
                            height: `${Math.random() * 100 + 20}px`,
                            animationDelay: `${i * 0.1}s`
                          }}
                        />
                      ))}
                    </div>
                  )}
                  
                  {visualMode === "3d-sphere" && (
                    <div className="relative">
                      <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse opacity-75"></div>
                      <div className="absolute inset-0 w-32 h-32 bg-gradient-to-l from-green-500 to-blue-500 rounded-full animate-ping opacity-50"></div>
                    </div>
                  )}
                  
                  {visualMode === "neural" && (
                    <div className="grid grid-cols-4 gap-4">
                      {[...Array(16)].map((_, i) => (
                        <div
                          key={i}
                          className="w-3 h-3 bg-green-400 rounded-full animate-pulse"
                          style={{ animationDelay: `${i * 0.2}s` }}
                        />
                      ))}
                    </div>
                  )}
                  
                  {visualMode === "spectrum" && (
                    <div className="flex items-end space-x-1">
                      {[...Array(50)].map((_, i) => (
                        <div
                          key={i}
                          className="bg-gradient-to-t from-red-500 to-yellow-400 w-1 animate-bounce"
                          style={{
                            height: `${Math.random() * 150 + 30}px`,
                            animationDelay: `${i * 0.05}s`
                          }}
                        />
                      ))}
                    </div>
                  )}
                  
                  {visualMode === "molecular" && (
                    <div className="relative">
                      <div className="w-4 h-4 bg-red-500 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2 animate-bounce"></div>
                      <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                      <div className="w-4 h-4 bg-green-500 rounded-full absolute bottom-0 right-0 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full absolute top-1/2 right-0 transform translate-x-full animate-bounce" style={{ animationDelay: '1s' }}></div>
                    </div>
                  )}
                </div>

                {/* Status overlay */}
                <div className="absolute top-4 left-4 text-white">
                  <div className="bg-black bg-opacity-50 rounded-lg p-3">
                    <div className="text-sm opacity-75">Mode: {visualModes.find(m => m.id === visualMode)?.name}</div>
                    <div className="text-sm opacity-75">Preset: {presets.find(p => p.id === activePreset)?.name}</div>
                    <div className="text-sm opacity-75">Status: {isRecording ? 'Recording' : isPlaying ? 'Playing' : 'Ready'}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 p-6">
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={startRecording}
                  disabled={isRecording}
                  className={`px-6 py-3 rounded-lg font-medium ${
                    isRecording
                      ? 'bg-red-500 text-white'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {isRecording ? 'Recording...' : 'Start Recording'}
                </button>
                
                {isRecording && (
                  <button
                    onClick={stopRecording}
                    className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  >
                    Stop
                  </button>
                )}
                
                <button
                  onClick={togglePlayback}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  {isPlaying ? 'Pause' : 'Play Demo'}
                </button>
                
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  Export
                </button>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Click "Start Recording" to begin capturing audio with real-time 3D visualization
                </p>
              </div>
            </div>
          </div>

          <div className="w-80 bg-gray-50 border-l border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Sessions</h3>
            <div className="space-y-3">
              {recentSessions.map((session) => (
                <div key={session.id} className="bg-white p-4 rounded-lg border">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-sm">{session.title}</h4>
                    <span className="text-xs text-gray-500">{session.date}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{session.duration}</span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">{session.visual}</span>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <button className="text-xs text-blue-600 hover:text-blue-700">Play</button>
                    <button className="text-xs text-gray-600 hover:text-gray-700">Export</button>
                    <button className="text-xs text-red-600 hover:text-red-700">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
