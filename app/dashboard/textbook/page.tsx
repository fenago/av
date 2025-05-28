"use client";

import { useAuth } from "@/libs/hooks";
import { redirect } from "next/navigation";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

export default function TextbookPage() {
  const { session, userProfile, isLoading, isAuthenticated } = useAuth();
  const [currentProject, setCurrentProject] = useState(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [activeChapter, setActiveChapter] = useState(1);
  const [editorContent, setEditorContent] = useState("");

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!isAuthenticated || !session) {
    redirect('/signin');
  }

  // Check if user has premium access
  const hasPremiumAccess = userProfile?.role === 'INSTRUCTOR' || 
                          userProfile?.role === 'DEPARTMENT' || 
                          userProfile?.role === 'INSTITUTION' || 
                          userProfile?.role === 'ADMIN';

  if (!hasPremiumAccess) {
    return (
      <DashboardLayout>
        <div className="h-full flex items-center justify-center">
          <div className="text-center p-8">
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Premium Feature</h2>
            <p className="text-gray-600 mb-6">Upgrade to access the Write Your Own Textbook app</p>
            <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Upgrade Now
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const sampleProjects = [
    { id: 1, title: "Introduction to Psychology", chapters: 12, status: "In Progress", lastEdited: "2 hours ago" },
    { id: 2, title: "Advanced Mathematics", chapters: 8, status: "Draft", lastEdited: "1 day ago" },
    { id: 3, title: "Biology Fundamentals", chapters: 15, status: "Published", lastEdited: "3 days ago" }
  ];

  const chapterStructure = [
    { id: 1, title: "Introduction", pages: 12, status: "Complete" },
    { id: 2, title: "Foundations", pages: 8, status: "In Progress" },
    { id: 3, title: "Core Concepts", pages: 0, status: "Planned" },
    { id: 4, title: "Applications", pages: 0, status: "Planned" },
    { id: 5, title: "Advanced Topics", pages: 0, status: "Planned" }
  ];

  if (!currentProject) {
    return (
      <DashboardLayout>
        <div className="h-full flex flex-col">
          <div className="bg-white border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-3xl mr-3">📚</span>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Write Your Own Textbook</h1>
                  <p className="text-gray-600">AI-powered textbook creation tailored to your curriculum</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">Premium</span>
                <button
                  onClick={() => setIsCreatingNew(true)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  + New Textbook
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sampleProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => setCurrentProject(project)}
                    className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        project.status === 'Published' ? 'bg-green-100 text-green-800' :
                        project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Chapters:</span>
                        <span>{project.chapters}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last edited:</span>
                        <span>{project.lastEdited}</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t flex justify-between">
                      <button className="text-green-600 hover:text-green-700 text-sm">Edit</button>
                      <button className="text-blue-600 hover:text-blue-700 text-sm">Preview</button>
                      <button className="text-gray-600 hover:text-gray-700 text-sm">Export</button>
                    </div>
                  </div>
                ))}

                <div
                  onClick={() => setIsCreatingNew(true)}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border-2 border-dashed border-gray-300 flex flex-col items-center justify-center min-h-[200px]"
                >
                  <div className="text-4xl mb-4 text-gray-400">+</div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Create New Textbook</h3>
                  <p className="text-sm text-gray-500 text-center">Start with AI assistance to create your custom textbook</p>
                </div>
              </div>
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
                onClick={() => setCurrentProject(null)}
                className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
              >
                ←
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{currentProject.title}</h1>
                <p className="text-sm text-gray-600">Chapter {activeChapter}: {chapterStructure[activeChapter - 1]?.title}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-50">Preview</button>
              <button className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600">Save</button>
              <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600">Publish</button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex">
          {sidebarExpanded && (
            <div className="w-80 bg-gray-50 border-r border-gray-200 p-4">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Chapters</h3>
                <div className="space-y-2">
                  {chapterStructure.map((chapter) => (
                    <div
                      key={chapter.id}
                      onClick={() => setActiveChapter(chapter.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        activeChapter === chapter.id
                          ? 'bg-green-100 text-green-800 border border-green-200'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{chapter.title}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          chapter.status === 'Complete' ? 'bg-green-100 text-green-700' :
                          chapter.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {chapter.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">{chapter.pages} pages</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Assistant</h3>
                <div className="space-y-3">
                  <button className="w-full p-3 text-left bg-white rounded-lg hover:bg-gray-100 border">
                    <div className="font-medium text-sm">Generate Content</div>
                    <div className="text-xs text-gray-500">Create chapter content with AI</div>
                  </button>
                  <button className="w-full p-3 text-left bg-white rounded-lg hover:bg-gray-100 border">
                    <div className="font-medium text-sm">Add Examples</div>
                    <div className="text-xs text-gray-500">Include relevant examples</div>
                  </button>
                  <button className="w-full p-3 text-left bg-white rounded-lg hover:bg-gray-100 border">
                    <div className="font-medium text-sm">Insert Media</div>
                    <div className="text-xs text-gray-500">Add images and diagrams</div>
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex-1 flex flex-col">
            <div className="flex-1 p-6">
              <div className="bg-white border rounded-lg h-full">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">{chapterStructure[activeChapter - 1]?.title}</h2>
                    <button
                      onClick={() => setSidebarExpanded(!sidebarExpanded)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      {sidebarExpanded ? '←' : '→'}
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <textarea
                    value={editorContent}
                    onChange={(e) => setEditorContent(e.target.value)}
                    placeholder="Start writing your textbook content here... Use AI assistance to generate comprehensive educational material."
                    className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  />
                  <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                    <span>Characters: {editorContent.length}</span>
                    <span>Auto-saved 2 minutes ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
