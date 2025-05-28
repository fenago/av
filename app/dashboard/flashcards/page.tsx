"use client";

import { useAuth } from "@/libs/hooks";
import { redirect } from "next/navigation";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

interface Flashcard {
  id: number;
  front: string;
  back: string;
  difficulty: 'easy' | 'medium' | 'hard';
  mastered: boolean;
}

interface FlashcardSet {
  id: number;
  title: string;
  description: string;
  category: string;
  totalCards: number;
  studiedCards: number;
  masteredCards: number;
  lastStudied: string;
  createdDate: string;
  cards: Flashcard[];
}

export default function FlashcardMakerPage() {
  const { session, userProfile, isLoading, isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState<'dashboard' | 'create' | 'study' | 'edit'>('dashboard');
  const [selectedSet, setSelectedSet] = useState<FlashcardSet | null>(null);
  const [studyMode, setStudyMode] = useState<'normal' | 'mastery' | 'random'>('normal');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [newCard, setNewCard] = useState({ front: '', back: '', difficulty: 'medium' as const });
  const [newSet, setNewSet] = useState({ title: '', description: '', category: 'General' });

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

  const flashcardSets: FlashcardSet[] = [
    {
      id: 1,
      title: "Spanish Vocabulary - Basic",
      description: "Essential Spanish words for beginners",
      category: "Language",
      totalCards: 50,
      studiedCards: 32,
      masteredCards: 18,
      lastStudied: "2 hours ago",
      createdDate: "1 week ago",
      cards: [
        { id: 1, front: "Hola", back: "Hello", difficulty: 'easy', mastered: true },
        { id: 2, front: "Gracias", back: "Thank you", difficulty: 'easy', mastered: true },
        { id: 3, front: "Por favor", back: "Please", difficulty: 'medium', mastered: false },
        { id: 4, front: "Disculpe", back: "Excuse me", difficulty: 'medium', mastered: false },
        { id: 5, front: "¿Dónde está...?", back: "Where is...?", difficulty: 'hard', mastered: false }
      ]
    },
    {
      id: 2,
      title: "Biology - Cell Structure",
      description: "Key components and functions of cells",
      category: "Science",
      totalCards: 35,
      studiedCards: 28,
      masteredCards: 22,
      lastStudied: "Yesterday",
      createdDate: "3 days ago",
      cards: [
        { id: 1, front: "What is the powerhouse of the cell?", back: "Mitochondria", difficulty: 'easy', mastered: true },
        { id: 2, front: "What controls what enters and exits the cell?", back: "Cell membrane", difficulty: 'medium', mastered: true },
        { id: 3, front: "Where is genetic material stored?", back: "Nucleus", difficulty: 'easy', mastered: true },
        { id: 4, front: "What synthesizes proteins?", back: "Ribosomes", difficulty: 'medium', mastered: false },
        { id: 5, front: "What is the function of the Golgi apparatus?", back: "Modifies and packages proteins", difficulty: 'hard', mastered: false }
      ]
    },
    {
      id: 3,
      title: "Math Formulas - Algebra",
      description: "Essential algebraic formulas and equations",
      category: "Mathematics",
      totalCards: 25,
      studiedCards: 15,
      masteredCards: 8,
      lastStudied: "3 days ago",
      createdDate: "1 week ago",
      cards: [
        { id: 1, front: "Quadratic Formula", back: "x = (-b ± √(b²-4ac)) / 2a", difficulty: 'hard', mastered: false },
        { id: 2, front: "Slope-intercept form", back: "y = mx + b", difficulty: 'medium', mastered: true },
        { id: 3, front: "Distance formula", back: "d = √[(x₂-x₁)² + (y₂-y₁)²]", difficulty: 'hard', mastered: false }
      ]
    }
  ];

  const handleStudyCard = (rating: 'again' | 'hard' | 'good' | 'easy') => {
    setShowAnswer(false);
    if (currentCardIndex < selectedSet!.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setCurrentView('dashboard');
      setSelectedSet(null);
    }
  };

  const handleCreateSet = () => {
    if (newSet.title.trim()) {
      // In a real app, this would save to the backend
      alert(`Created new flashcard set: ${newSet.title}`);
      setNewSet({ title: '', description: '', category: 'General' });
      setCurrentView('dashboard');
    }
  };

  const renderDashboard = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <span className="text-3xl mr-3">📇</span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Flashcard Maker</h1>
            <p className="text-gray-600">Create, study, and master your flashcard sets</p>
          </div>
        </div>
        <button
          onClick={() => setCurrentView('create')}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          + Create New Set
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sets</p>
              <p className="text-2xl font-bold text-gray-900">{flashcardSets.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📚</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Cards</p>
              <p className="text-2xl font-bold text-gray-900">
                {flashcardSets.reduce((sum, set) => sum + set.totalCards, 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📇</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Cards Studied</p>
              <p className="text-2xl font-bold text-gray-900">
                {flashcardSets.reduce((sum, set) => sum + set.studiedCards, 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📖</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Cards Mastered</p>
              <p className="text-2xl font-bold text-gray-900">
                {flashcardSets.reduce((sum, set) => sum + set.masteredCards, 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⭐</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Your Flashcard Sets</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flashcardSets.map((set) => (
              <div key={set.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{set.title}</h3>
                    <p className="text-sm text-gray-600">{set.description}</p>
                  </div>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {set.category}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="text-gray-900">
                      {set.studiedCards} / {set.totalCards} studied
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(set.studiedCards / set.totalCards) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Mastered</span>
                    <span className="text-green-600 font-medium">{set.masteredCards} cards</span>
                  </div>
                </div>

                <div className="text-sm text-gray-500 mb-4">
                  <div>Last studied: {set.lastStudied}</div>
                  <div>Created: {set.createdDate}</div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setSelectedSet(set);
                      setCurrentView('study');
                      setCurrentCardIndex(0);
                      setShowAnswer(false);
                    }}
                    className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm"
                  >
                    Study
                  </button>
                  <button
                    onClick={() => {
                      setSelectedSet(set);
                      setCurrentView('edit');
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:border-green-400 hover:bg-green-50 transition-colors cursor-pointer min-h-[300px]">
              <div className="text-4xl mb-4 text-gray-400">➕</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Create New Set</h3>
              <p className="text-sm text-gray-500 text-center mb-4">
                Start building your next flashcard collection
              </p>
              <button
                onClick={() => setCurrentView('create')}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStudyMode = () => {
    if (!selectedSet) return null;
    const currentCard = selectedSet.cards[currentCardIndex];

    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button
              onClick={() => {
                setCurrentView('dashboard');
                setSelectedSet(null);
              }}
              className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
            >
              ←
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Studying: {selectedSet.title}</h1>
              <p className="text-gray-600">
                Card {currentCardIndex + 1} of {selectedSet.cards.length}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Progress: {Math.round(((currentCardIndex + 1) / selectedSet.cards.length) * 100)}%
            </div>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{ width: `${((currentCardIndex + 1) / selectedSet.cards.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg border min-h-[400px] flex flex-col">
          <div className="flex-1 p-8 flex items-center justify-center">
            <div className="text-center max-w-2xl">
              {!showAnswer ? (
                <div>
                  <div className="text-sm text-gray-500 mb-4">FRONT</div>
                  <div className="text-2xl font-medium text-gray-900 mb-8">
                    {currentCard.front}
                  </div>
                  <button
                    onClick={() => setShowAnswer(true)}
                    className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-lg"
                  >
                    Show Answer
                  </button>
                </div>
              ) : (
                <div>
                  <div className="text-sm text-gray-500 mb-2">FRONT</div>
                  <div className="text-lg text-gray-700 mb-6">{currentCard.front}</div>
                  <div className="text-sm text-gray-500 mb-2">BACK</div>
                  <div className="text-2xl font-medium text-gray-900 mb-8">
                    {currentCard.back}
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-600 mb-4">How well did you know this?</p>
                    <div className="flex justify-center space-x-3">
                      <button
                        onClick={() => handleStudyCard('again')}
                        className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Again
                      </button>
                      <button
                        onClick={() => handleStudyCard('hard')}
                        className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                      >
                        Hard
                      </button>
                      <button
                        onClick={() => handleStudyCard('good')}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        Good
                      </button>
                      <button
                        onClick={() => handleStudyCard('easy')}
                        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                      >
                        Easy
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCreateMode = () => (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center mb-8">
        <button
          onClick={() => setCurrentView('dashboard')}
          className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
        >
          ←
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Flashcard Set</h1>
          <p className="text-gray-600">Build your custom study collection</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Set Title
            </label>
            <input
              type="text"
              value={newSet.title}
              onChange={(e) => setNewSet({ ...newSet, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="e.g., Spanish Vocabulary - Advanced"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={newSet.description}
              onChange={(e) => setNewSet({ ...newSet, description: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              rows={3}
              placeholder="Brief description of what this set covers..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={newSet.category}
              onChange={(e) => setNewSet({ ...newSet, category: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="General">General</option>
              <option value="Language">Language</option>
              <option value="Science">Science</option>
              <option value="Mathematics">Mathematics</option>
              <option value="History">History</option>
              <option value="Literature">Literature</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateSet}
              disabled={!newSet.title.trim()}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Create Set
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="h-full bg-gray-50">
        {currentView === 'dashboard' && renderDashboard()}
        {currentView === 'study' && renderStudyMode()}
        {currentView === 'create' && renderCreateMode()}
      </div>
    </DashboardLayout>
  );
}
