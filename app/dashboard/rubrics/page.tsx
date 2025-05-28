"use client";

import { useAuth } from "@/libs/hooks";
import { redirect } from "next/navigation";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

export default function RubricsGradingPage() {
  const { session, userProfile, isLoading, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("rubrics");
  const [newRubric, setNewRubric] = useState({
    title: "",
    description: "",
    subject: "general",
    gradeLevel: "middle",
    criteria: [
      { name: "Content Knowledge", weight: 25, levels: [
        { name: "Excellent", points: 4, description: "Demonstrates comprehensive understanding" },
        { name: "Good", points: 3, description: "Shows solid understanding" },
        { name: "Satisfactory", points: 2, description: "Basic understanding evident" },
        { name: "Needs Improvement", points: 1, description: "Limited understanding shown" }
      ]}
    ]
  });

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div></div>;
  }

  if (!isAuthenticated || !session) {
    redirect('/signin');
  }

  const rubrics = [
    {
      id: 1,
      title: "Essay Writing Rubric",
      subject: "English",
      gradeLevel: "High School",
      criteria: 4,
      assignments: 12,
      created: "2 days ago",
      type: "custom"
    },
    {
      id: 2,
      title: "Science Lab Report",
      subject: "Science",
      gradeLevel: "Middle School",
      criteria: 5,
      assignments: 8,
      created: "1 week ago",
      type: "template"
    },
    {
      id: 3,
      title: "Math Problem Solving",
      subject: "Mathematics",
      gradeLevel: "Elementary",
      criteria: 3,
      assignments: 15,
      created: "3 days ago",
      type: "custom"
    }
  ];

  const assignments = [
    {
      id: 1,
      title: "Persuasive Essay Assignment",
      students: 25,
      submitted: 22,
      graded: 18,
      avgScore: 3.2,
      rubric: "Essay Writing Rubric",
      dueDate: "Tomorrow",
      status: "active"
    },
    {
      id: 2,
      title: "Cell Structure Lab",
      students: 28,
      submitted: 28,
      graded: 28,
      avgScore: 3.7,
      rubric: "Science Lab Report",
      dueDate: "Completed",
      status: "completed"
    }
  ];

  const addCriterion = () => {
    setNewRubric({
      ...newRubric,
      criteria: [...newRubric.criteria, {
        name: "New Criterion",
        weight: 25,
        levels: [
          { name: "Excellent", points: 4, description: "" },
          { name: "Good", points: 3, description: "" },
          { name: "Satisfactory", points: 2, description: "" },
          { name: "Needs Improvement", points: 1, description: "" }
        ]
      }]
    });
  };

  const updateCriterion = (index, field, value) => {
    const updated = [...newRubric.criteria];
    updated[index] = { ...updated[index], [field]: value };
    setNewRubric({ ...newRubric, criteria: updated });
  };

  const updateLevel = (criterionIndex, levelIndex, field, value) => {
    const updated = [...newRubric.criteria];
    updated[criterionIndex].levels[levelIndex] = {
      ...updated[criterionIndex].levels[levelIndex],
      [field]: value
    };
    setNewRubric({ ...newRubric, criteria: updated });
  };

  return (
    <DashboardLayout>
      <div className="h-full bg-gray-50">
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-3xl mr-3">📋</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Rubrics & Grading</h1>
                <p className="text-gray-600">Create assessment rubrics and streamline grading</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">AI-Assisted</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("rubrics")}
                className={`px-6 py-3 font-medium text-sm ${activeTab === "rubrics" ? "border-b-2 border-indigo-500 text-indigo-600" : "text-gray-500"}`}
              >
                My Rubrics
              </button>
              <button
                onClick={() => setActiveTab("create")}
                className={`px-6 py-3 font-medium text-sm ${activeTab === "create" ? "border-b-2 border-indigo-500 text-indigo-600" : "text-gray-500"}`}
              >
                Create Rubric
              </button>
              <button
                onClick={() => setActiveTab("assignments")}
                className={`px-6 py-3 font-medium text-sm ${activeTab === "assignments" ? "border-b-2 border-indigo-500 text-indigo-600" : "text-gray-500"}`}
              >
                Assignments
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`px-6 py-3 font-medium text-sm ${activeTab === "analytics" ? "border-b-2 border-indigo-500 text-indigo-600" : "text-gray-500"}`}
              >
                Grading Analytics
              </button>
            </div>
          </div>

          {activeTab === "rubrics" && (
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">Your Rubrics</h2>
                    <button
                      onClick={() => setActiveTab("create")}
                      className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                    >
                      Create New Rubric
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rubrics.map((rubric) => (
                      <div key={rubric.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="font-semibold text-gray-900">{rubric.title}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            rubric.type === "custom" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                          }`}>
                            {rubric.type}
                          </span>
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                          <div className="flex justify-between">
                            <span>Subject:</span>
                            <span>{rubric.subject}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Grade Level:</span>
                            <span>{rubric.gradeLevel}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Criteria:</span>
                            <span>{rubric.criteria}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Used in:</span>
                            <span>{rubric.assignments} assignments</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Created:</span>
                            <span>{rubric.created}</span>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <button className="flex-1 px-3 py-2 bg-indigo-500 text-white text-sm rounded hover:bg-indigo-600">
                            Edit
                          </button>
                          <button className="flex-1 px-3 py-2 border border-gray-300 text-sm rounded hover:bg-gray-50">
                            Use
                          </button>
                          <button className="px-3 py-2 border border-gray-300 text-sm rounded hover:bg-gray-50">
                            📋
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "create" && (
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Rubric Details</h2>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Rubric Title</label>
                        <input
                          type="text"
                          value={newRubric.title}
                          onChange={(e) => setNewRubric({...newRubric, title: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                          placeholder="e.g., Essay Writing Assessment"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                        <select
                          value={newRubric.subject}
                          onChange={(e) => setNewRubric({...newRubric, subject: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          <option value="general">General</option>
                          <option value="english">English</option>
                          <option value="math">Mathematics</option>
                          <option value="science">Science</option>
                          <option value="history">History</option>
                          <option value="arts">Arts</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={newRubric.description}
                        onChange={(e) => setNewRubric({...newRubric, description: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none"
                        rows={3}
                        placeholder="Describe what this rubric assesses..."
                      />
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Assessment Criteria</h3>
                      <button
                        onClick={addCriterion}
                        className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 text-sm"
                      >
                        + Add Criterion
                      </button>
                    </div>

                    <div className="space-y-6">
                      {newRubric.criteria.map((criterion, criterionIndex) => (
                        <div key={criterionIndex} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <input
                              type="text"
                              value={criterion.name}
                              onChange={(e) => updateCriterion(criterionIndex, 'name', e.target.value)}
                              className="font-semibold text-lg border-none focus:ring-0 p-0"
                              placeholder="Criterion Name"
                            />
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-600">Weight:</span>
                              <input
                                type="number"
                                value={criterion.weight}
                                onChange={(e) => updateCriterion(criterionIndex, 'weight', parseInt(e.target.value))}
                                className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                                min="1"
                                max="100"
                              />
                              <span className="text-sm text-gray-600">%</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                            {criterion.levels.map((level, levelIndex) => (
                              <div key={levelIndex} className="border rounded p-3">
                                <div className="flex items-center justify-between mb-2">
                                  <input
                                    type="text"
                                    value={level.name}
                                    onChange={(e) => updateLevel(criterionIndex, levelIndex, 'name', e.target.value)}
                                    className="font-medium text-sm border-none focus:ring-0 p-0 w-full"
                                  />
                                  <input
                                    type="number"
                                    value={level.points}
                                    onChange={(e) => updateLevel(criterionIndex, levelIndex, 'points', parseInt(e.target.value))}
                                    className="w-10 px-1 py-0 border border-gray-300 rounded text-xs"
                                    min="0"
                                    max="10"
                                  />
                                </div>
                                <textarea
                                  value={level.description}
                                  onChange={(e) => updateLevel(criterionIndex, levelIndex, 'description', e.target.value)}
                                  className="w-full text-xs border border-gray-300 rounded p-2 resize-none"
                                  rows={3}
                                  placeholder="Description..."
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Rubric Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Grade Level</label>
                        <select
                          value={newRubric.gradeLevel}
                          onChange={(e) => setNewRubric({...newRubric, gradeLevel: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          <option value="elementary">Elementary</option>
                          <option value="middle">Middle School</option>
                          <option value="high">High School</option>
                          <option value="college">College</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <label className="text-sm text-gray-700">Allow partial points</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <label className="text-sm text-gray-700">Show points to students</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <label className="text-sm text-gray-700">Include comments section</label>
                        </div>
                      </div>
                    </div>

                    <button
                      className="w-full mt-6 px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                      onClick={() => {
                        console.log("Saving rubric:", newRubric);
                        setActiveTab("rubrics");
                      }}
                    >
                      Save Rubric
                    </button>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Assistance</h3>
                    <div className="space-y-3">
                      <button className="w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-left text-sm">
                        🤖 Generate criteria suggestions
                      </button>
                      <button className="w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-left text-sm">
                        📝 Auto-fill descriptions
                      </button>
                      <button className="w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-left text-sm">
                        ⚖️ Balance point weights
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Templates</h3>
                    <div className="space-y-2">
                      <button className="w-full p-2 bg-gray-100 rounded text-sm hover:bg-gray-200">
                        📝 Essay Writing
                      </button>
                      <button className="w-full p-2 bg-gray-100 rounded text-sm hover:bg-gray-200">
                        🧪 Lab Report
                      </button>
                      <button className="w-full p-2 bg-gray-100 rounded text-sm hover:bg-gray-200">
                        📊 Presentation
                      </button>
                      <button className="w-full p-2 bg-gray-100 rounded text-sm hover:bg-gray-200">
                        🎨 Creative Project
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "assignments" && (
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">Graded Assignments</h2>
                    <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
                      Create Assignment
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {assignments.map((assignment) => (
                      <div key={assignment.id} className="border rounded-lg p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                assignment.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                              }`}>
                                {assignment.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">Using rubric: {assignment.rubric}</p>
                            
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                              <div>
                                <span className="font-medium text-gray-700">Students:</span>
                                <div className="text-gray-900">{assignment.students}</div>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Submitted:</span>
                                <div className="text-gray-900">{assignment.submitted}/{assignment.students}</div>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Graded:</span>
                                <div className="text-gray-900">{assignment.graded}/{assignment.submitted}</div>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Avg Score:</span>
                                <div className="text-gray-900">{assignment.avgScore}/4.0</div>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Due:</span>
                                <div className="text-gray-900">{assignment.dueDate}</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2 ml-4">
                            <button className="px-3 py-2 bg-indigo-500 text-white text-sm rounded hover:bg-indigo-600">
                              Grade
                            </button>
                            <button className="px-3 py-2 border border-gray-300 text-sm rounded hover:bg-gray-50">
                              Export
                            </button>
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-indigo-500 h-2 rounded-full" 
                              style={{ width: `${(assignment.graded / assignment.submitted) * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Grading Progress</span>
                            <span>{Math.round((assignment.graded / assignment.submitted) * 100)}% complete</span>
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Rubrics</p>
                      <p className="text-2xl font-bold text-gray-900">15</p>
                    </div>
                    <span className="text-2xl">📋</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Assignments Graded</p>
                      <p className="text-2xl font-bold text-gray-900">127</p>
                    </div>
                    <span className="text-2xl">✅</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg Grade</p>
                      <p className="text-2xl font-bold text-gray-900">3.4/4.0</p>
                    </div>
                    <span className="text-2xl">📊</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Time Saved</p>
                      <p className="text-2xl font-bold text-gray-900">28 hrs</p>
                    </div>
                    <span className="text-2xl">⏰</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Grade Distribution</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="w-20 text-sm font-medium">Excellent (4)</span>
                    <div className="flex-1 mx-4 bg-gray-200 rounded-full h-3">
                      <div className="bg-green-500 h-3 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">35%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-20 text-sm font-medium">Good (3)</span>
                    <div className="flex-1 mx-4 bg-gray-200 rounded-full h-3">
                      <div className="bg-blue-500 h-3 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">40%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-20 text-sm font-medium">Satisfactory (2)</span>
                    <div className="flex-1 mx-4 bg-gray-200 rounded-full h-3">
                      <div className="bg-yellow-500 h-3 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">20%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-20 text-sm font-medium">Needs Work (1)</span>
                    <div className="flex-1 mx-4 bg-gray-200 rounded-full h-3">
                      <div className="bg-red-500 h-3 rounded-full" style={{ width: '5%' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">5%</span>
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
