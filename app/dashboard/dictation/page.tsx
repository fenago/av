"use client";

import { useAuth } from "@/libs/hooks";
import { redirect } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";

export default function DictationNotesPage() {
  const { session, userProfile, isLoading, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("dictation");
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [currentNote, setCurrentNote] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [recordingTime, setRecordingTime] = useState(0);
  const intervalRef = useRef(null);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div></div>;
  }

  if (!isAuthenticated || !session) {
    redirect('/signin');
  }

  const notes = [
    {
      id: 1,
      title: "Biology Lecture Notes",
      content: "Today we discussed cellular respiration and the process of photosynthesis...",
      date: "2 hours ago",
      duration: "15:32",
      type: "dictation",
      tags: ["biology", "lecture"]
    },
    {
      id: 2,
      title: "Math Problem Solutions",
      content: "Solved quadratic equations using the quadratic formula. Key steps include...",
      date: "Yesterday",
      duration: "8:45",
      type: "typed",
      tags: ["math", "homework"]
    },
    {
      id: 3,
      title: "History Research Notes",
      content: "World War II timeline and key events. Major battles included...",
      date: "2 days ago",
      duration: "22:18",
      type: "dictation",
      tags: ["history", "research"]
    }
  ];

  useEffect(() => {
    if (isRecording && !isPaused) {
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRecording, isPaused]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setIsPaused(false);
    setRecordingTime(0);
    setTranscription("");
    
    // Simulate real-time transcription
    const simulateTranscription = () => {
      const sampleTexts = [
        "Today we're going to explore the fascinating world of quantum physics.",
        "The principles of quantum mechanics revolutionized our understanding of matter and energy.",
        "Key concepts include wave-particle duality, uncertainty principle, and quantum entanglement.",
        "These concepts have practical applications in modern technology like computers and lasers."
      ];
      
      let textIndex = 0;
      const transcriptionInterval = setInterval(() => {
        if (textIndex < sampleTexts.length && isRecording && !isPaused) {
          setTranscription(prev => prev + (prev ? " " : "") + sampleTexts[textIndex]);
          textIndex++;
        } else {
          clearInterval(transcriptionInterval);
        }
      }, 3000);
    };
    
    setTimeout(simulateTranscription, 1000);
  };

  const handlePauseRecording = () => {
    setIsPaused(!isPaused);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    setCurrentNote(transcription);
    clearInterval(intervalRef.current);
  };

  const handleSaveNote = () => {
    if (currentNote.trim() && noteTitle.trim()) {
      // Here you would save to database
      console.log("Saving note:", { title: noteTitle, content: currentNote });
      setCurrentNote("");
      setNoteTitle("");
      setTranscription("");
      setRecordingTime(0);
    }
  };

  return (
    <DashboardLayout>
      <div className="h-full bg-gray-50">
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-3xl mr-3">🎤</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dictation & Notes</h1>
                <p className="text-gray-600">Voice-to-text note taking with AI enhancement</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {isRecording && (
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-600 font-medium">REC {formatTime(recordingTime)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("dictation")}
                className={`px-6 py-3 font-medium text-sm ${activeTab === "dictation" ? "border-b-2 border-orange-500 text-orange-600" : "text-gray-500"}`}
              >
                Voice Dictation
              </button>
              <button
                onClick={() => setActiveTab("notes")}
                className={`px-6 py-3 font-medium text-sm ${activeTab === "notes" ? "border-b-2 border-orange-500 text-orange-600" : "text-gray-500"}`}
              >
                My Notes
              </button>
              <button
                onClick={() => setActiveTab("templates")}
                className={`px-6 py-3 font-medium text-sm ${activeTab === "templates" ? "border-b-2 border-orange-500 text-orange-600" : "text-gray-500"}`}
              >
                Note Templates
              </button>
            </div>
          </div>

          {activeTab === "dictation" && (
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-gray-900">Voice Recording</h2>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Language: English</span>
                        <button className="text-sm text-blue-600 hover:text-blue-800">Change</button>
                      </div>
                    </div>

                    <div className="text-center py-8">
                      <div className="w-32 h-32 mx-auto mb-6 relative">
                        <div className={`w-full h-full rounded-full border-4 flex items-center justify-center ${
                          isRecording 
                            ? isPaused 
                              ? "border-yellow-500 bg-yellow-50" 
                              : "border-red-500 bg-red-50"
                            : "border-gray-300 bg-gray-50"
                        }`}>
                          <span className="text-4xl">
                            {isRecording ? (isPaused ? "⏸️" : "🎤") : "🎙️"}
                          </span>
                        </div>
                        {isRecording && !isPaused && (
                          <div className="absolute inset-0 rounded-full border-4 border-red-500 animate-ping"></div>
                        )}
                      </div>

                      <div className="space-y-4">
                        {!isRecording ? (
                          <button
                            onClick={handleStartRecording}
                            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium"
                          >
                            Start Recording
                          </button>
                        ) : (
                          <div className="flex justify-center space-x-3">
                            <button
                              onClick={handlePauseRecording}
                              className={`px-4 py-2 ${isPaused ? "bg-green-500 hover:bg-green-600" : "bg-yellow-500 hover:bg-yellow-600"} text-white rounded-lg`}
                            >
                              {isPaused ? "Resume" : "Pause"}
                            </button>
                            <button
                              onClick={handleStopRecording}
                              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                              Stop
                            </button>
                          </div>
                        )}
                        
                        {isRecording && (
                          <p className="text-sm text-gray-600">
                            Recording: {formatTime(recordingTime)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Transcription</h3>
                    <div className="min-h-48 p-4 border border-gray-200 rounded-lg bg-gray-50">
                      {transcription ? (
                        <p className="text-gray-800 leading-relaxed">{transcription}</p>
                      ) : (
                        <p className="text-gray-500 italic">Transcription will appear here as you speak...</p>
                      )}
                    </div>
                  </div>

                  {(currentNote || transcription) && (
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit & Save Note</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Note Title</label>
                          <input
                            type="text"
                            value={noteTitle}
                            onChange={(e) => setNoteTitle(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                            placeholder="Enter a title for your note..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Note Content</label>
                          <textarea
                            value={currentNote || transcription}
                            onChange={(e) => setCurrentNote(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 resize-none"
                            rows={8}
                            placeholder="Edit your transcribed text here..."
                          />
                        </div>
                        <div className="flex justify-between">
                          <div className="flex space-x-2">
                            <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
                              🔍 AI Enhance
                            </button>
                            <button className="px-3 py-1 bg-purple-500 text-white text-sm rounded hover:bg-purple-600">
                              📝 Summarize
                            </button>
                            <button className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600">
                              🏷️ Add Tags
                            </button>
                          </div>
                          <button
                            onClick={handleSaveNote}
                            disabled={!noteTitle.trim() || !currentNote.trim()}
                            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-300"
                          >
                            Save Note
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recording Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Audio Quality</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                          <option value="high">High Quality</option>
                          <option value="medium">Medium Quality</option>
                          <option value="low">Low Quality</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                          <option value="en-US">English (US)</option>
                          <option value="en-GB">English (UK)</option>
                          <option value="es-ES">Spanish</option>
                          <option value="fr-FR">French</option>
                        </select>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <label className="text-sm text-gray-700">Auto-punctuation</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <label className="text-sm text-gray-700">Speaker detection</label>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
                        📂 Import Audio File
                      </button>
                      <button className="w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
                        🎯 Voice Commands
                      </button>
                      <button className="w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
                        ⚙️ Calibrate Microphone
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notes" && (
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">My Notes</h2>
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        🔍 Search
                      </button>
                      <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                        + New Note
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {notes.map((note) => (
                      <div key={note.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold text-gray-900 line-clamp-2">{note.title}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            note.type === "dictation" ? "bg-orange-100 text-orange-800" : "bg-blue-100 text-blue-800"
                          }`}>
                            {note.type}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-3 mb-3">{note.content}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{note.date}</span>
                          <span>{note.duration}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {note.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex justify-end space-x-2 mt-3">
                          <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                            Edit
                          </button>
                          <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                            Share
                          </button>
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
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Note Templates</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">📚 Lecture Notes</h3>
                    <p className="text-gray-600 text-sm mb-3">Structured template for academic lectures</p>
                    <div className="bg-gray-50 p-3 rounded text-sm text-gray-700 mb-3">
                      Course: [Subject]<br/>
                      Date: [Date]<br/>
                      Topic: [Main Topic]<br/><br/>
                      Key Points:<br/>
                      - Point 1<br/>
                      - Point 2<br/><br/>
                      Summary: [Summary]
                    </div>
                    <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                      Use Template
                    </button>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">💡 Meeting Notes</h3>
                    <p className="text-gray-600 text-sm mb-3">Template for meeting documentation</p>
                    <div className="bg-gray-50 p-3 rounded text-sm text-gray-700 mb-3">
                      Meeting: [Title]<br/>
                      Date: [Date]<br/>
                      Attendees: [Names]<br/><br/>
                      Agenda:<br/>
                      - Item 1<br/>
                      - Item 2<br/><br/>
                      Action Items: [Tasks]
                    </div>
                    <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                      Use Template
                    </button>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">🔬 Research Notes</h3>
                    <p className="text-gray-600 text-sm mb-3">Template for research documentation</p>
                    <div className="bg-gray-50 p-3 rounded text-sm text-gray-700 mb-3">
                      Research Topic: [Topic]<br/>
                      Source: [Source]<br/>
                      Date: [Date]<br/><br/>
                      Key Findings:<br/>
                      - Finding 1<br/>
                      - Finding 2<br/><br/>
                      Questions: [Questions]
                    </div>
                    <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                      Use Template
                    </button>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">📝 Daily Journal</h3>
                    <p className="text-gray-600 text-sm mb-3">Template for daily reflections</p>
                    <div className="bg-gray-50 p-3 rounded text-sm text-gray-700 mb-3">
                      Date: [Date]<br/>
                      Mood: [Feeling]<br/><br/>
                      Today's Goals:<br/>
                      - Goal 1<br/>
                      - Goal 2<br/><br/>
                      Reflection: [Thoughts]<br/>
                      Tomorrow's Plan: [Plan]
                    </div>
                    <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                      Use Template
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
