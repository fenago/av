import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import { BorderBeam } from "@/components/ui/border-beam";
import BlurFade from "@/components/ui/blur-fade";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

// App categories configuration - restored from original dashboard
const categories = [
  {
    name: "CONTENT CREATION",
    icon: "🎨",
    apps: [
      {
        name: "Chat with DrLeeGPT",
        icon: "💬",
        href: "/dashboard/drleegpt",
        premium: true,
        featured: true,
        status: "active"
      },
      {
        name: "Write Your Own Textbook",
        icon: "📚",
        href: "/dashboard/textbook",
        premium: true,
        featured: true,
        status: "coming-soon"
      },
      {
        name: "Create Teaching Materials",
        icon: "📝",
        href: "/dashboard/materials",
        premium: true,
        featured: true,
        status: "coming-soon"
      },
      {
        name: "Native Image Generation",
        icon: "🖼️",
        href: "/dashboard/images",
        premium: false,
        status: "coming-soon"
      },
      {
        name: "Dictation/Notes",
        icon: "🎤",
        href: "/dashboard/dictation",
        premium: false,
        status: "coming-soon"
      },
      {
        name: "Flashcard Maker",
        icon: "🃏",
        href: "/dashboard/flashcards",
        premium: false,
        status: "coming-soon"
      }
    ]
  },
  {
    name: "COMMUNICATION & INTERACTION",
    icon: "💭",
    apps: [
      {
        name: "Talk to Your Materials",
        icon: "🗣️",
        href: "/dashboard/talk-materials",
        premium: false,
        status: "coming-soon"
      },
      {
        name: "DrLeeGPT Live",
        icon: "📡",
        href: "/dashboard/live",
        premium: false,
        status: "coming-soon"
      },
      {
        name: "Google Workspace Integration",
        icon: "🔗",
        href: "/dashboard/google-workspace",
        premium: false,
        status: "coming-soon"
      },
      {
        name: "ChatterBots",
        icon: "🤖",
        href: "/dashboard/chatterbots",
        premium: false,
        status: "coming-soon"
      },
      {
        name: "Tiny Cats Explain",
        icon: "🐱",
        href: "/dashboard/tiny-cats",
        premium: false,
        status: "coming-soon"
      }
    ]
  },
  {
    name: "MEDIA & VISUALIZATION",
    icon: "🎬",
    apps: [
      {
        name: "Live Audio + 3D Visuals",
        icon: "🎧",
        href: "/dashboard/live-audio",
        premium: false,
        status: "coming-soon"
      },
      {
        name: "Lesson to Podcast",
        icon: "🎙️",
        href: "/dashboard/podcast",
        premium: false,
        status: "coming-soon"
      },
      {
        name: "Video Generation",
        icon: "🎬",
        href: "/dashboard/videos",
        premium: false,
        status: "coming-soon"
      },
      {
        name: "Themed Avatars",
        icon: "👤",
        href: "/dashboard/avatars",
        premium: false,
        status: "coming-soon"
      }
    ]
  },
  {
    name: "ASSESSMENT & ANALYSIS",
    icon: "📊",
    apps: [
      {
        name: "Video to Learning",
        icon: "📹",
        href: "/dashboard/video-learning",
        premium: false,
        status: "coming-soon"
      },
      {
        name: "Video Analyzer",
        icon: "📊",
        href: "/dashboard/video-analyzer",
        premium: false,
        status: "coming-soon"
      },
      {
        name: "Rubrics and Grading",
        icon: "📋",
        href: "/dashboard/grading",
        premium: false,
        status: "coming-soon"
      }
    ]
  }
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>(['CONTENT CREATION', 'COMMUNICATION & INTERACTION']);

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionName) 
        ? prev.filter(name => name !== sectionName)
        : [...prev, sectionName]
    );
  };

  useEffect(() => {
    if (session?.user?.id) {
      // Fetch user profile
      fetch('/api/user/profile')
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setUserProfile(data.profile);
          }
        })
        .catch(err => console.error('Error fetching profile:', err));
    }
  }, [session]);

  // Filter categories based on user's access
  const filteredCategories = categories.map(category => ({
    ...category,
    apps: category.apps.filter(app => {
      // If app is premium, check if user has access
      if (app.premium) {
        return userProfile?.premiumAccess === true;
      }
      return true;
    })
  })).filter(category => category.apps.length > 0);

  return (
    <div className="min-h-screen bg-white">
      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-80' : 'w-16'} min-h-screen bg-white border-r border-gray-200 transition-all duration-300 flex-shrink-0 relative z-10`}>
          <div className="h-full flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                  LS
                </div>
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="ml-3"
                    >
                      <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        LearningScience.ai
                      </h1>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 overflow-y-auto">
              {filteredCategories.map((category, categoryIndex) => (
                <div key={category.name} className="mb-4">
                  <button
                    onClick={() => sidebarOpen && toggleSection(category.name)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group ${
                      expandedSections.includes(category.name) ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-lg">{category.icon}</span>
                      <AnimatePresence>
                        {sidebarOpen && (
                          <motion.h3
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="ml-3 text-sm font-semibold uppercase tracking-wider"
                          >
                            {category.name}
                          </motion.h3>
                        )}
                      </AnimatePresence>
                    </div>
                    {sidebarOpen && (
                      <svg 
                        className={`w-4 h-4 transition-transform ${
                          expandedSections.includes(category.name) ? 'rotate-180' : ''
                        }`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>
                  
                  {sidebarOpen && expandedSections.includes(category.name) && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="ml-6 mt-2 space-y-1"
                    >
                      {category.apps.map((app, appIndex) => (
                        <Link
                          key={app.name}
                          href={app.href}
                          className="flex items-start space-x-3 p-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-50 hover:text-gray-900 group"
                        >
                          <span className="text-sm mt-0.5">{app.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center">
                              <span className="text-sm font-medium">
                                {app.name}
                              </span>
                              {app.premium && (
                                <motion.span
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="ml-2 px-2 py-0.5 text-xs bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full font-medium"
                                >
                                  Premium
                                </motion.span>
                              )}
                              {app.featured && (
                                <motion.span
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="ml-2 text-yellow-500"
                                >
                                  ⭐
                                </motion.span>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-6 py-4 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <motion.button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </motion.button>
                
                <div className="ml-4">
                  <nav className="flex space-x-6">
                    <Link href="/dashboard" className="text-gray-700 hover:text-gray-900 font-medium">
                      Dashboard
                    </Link>
                    <Link href="/profile" className="text-gray-600 hover:text-gray-900">
                      Profile
                    </Link>
                  </nav>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* User Avatar */}
                {userProfile && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-3"
                  >
                    {/* Admin Link for Admin Users */}
                    {userProfile.role === 'ADMIN' && (
                      <Link
                        href="/admin"
                        className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="font-medium">Admin</span>
                      </Link>
                    )}
                    
                    <div className="bg-gray-100 rounded-xl p-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                        {userProfile.name?.charAt(0) || "U"}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto relative bg-gray-50">
            <div className="relative z-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
