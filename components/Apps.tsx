"use client";

import { useState, useEffect } from "react";

const Apps = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [particleCount] = useState(15);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const apps = [
    {
      name: "Live Audio + 3D Visuals",
      description: "Transform conversations into immersive visual experiences as students talk with AI",
      href: "/dashboard/live-audio-3d",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
      professorView: {
        title: "Dynamic Visual Teaching",
        features: [
          "3D molecules appear during chemistry discussions",
          "Art history artwork displays automatically",
          "Math equations draw themselves in real-time",
          "Visual responses enhance engagement"
        ]
      },
      studentView: {
        title: "Interactive Visual Learning",
        features: [
          "See concepts come alive as you speak",
          "Visual feedback reinforces understanding",
          "Multi-sensory learning experience",
          "Memorable visual associations"
        ]
      }
    },
    {
      name: "Write Your Own Textbook",
      description: "AI-powered textbook creation tailored to your curriculum, students, and teaching style",
      href: "/dashboard/textbook",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      professorView: {
        title: "Personalized Curriculum Creation",
        features: [
          "Generate chapters aligned to your syllabus",
          "Include South Florida cultural examples",
          "Adapt content for diverse learning styles",
          "Create interactive exercises and assessments"
        ]
      },
      studentView: {
        title: "Textbook That Speaks Your Language",
        features: [
          "Content matches your professor's teaching style",
          "Examples from your local community",
          "Difficulty level adapts to your progress",
          "Interactive elements keep you engaged"
        ]
      }
    },
    {
      name: "Create Teaching Materials",
      description: "Generate comprehensive educational resources from syllabi, lesson plans to interactive worksheets",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      professorView: {
        title: "Automated Resource Generation",
        features: [
          "Turn outlines into full lesson plans",
          "Generate worksheets and handouts",
          "Create rubrics and assessment tools",
          "Produce multimedia presentations"
        ]
      },
      studentView: {
        title: "Rich Learning Materials",
        features: [
          "Receive comprehensive study guides",
          "Access interactive worksheets",
          "Get visual aids and diagrams",
          "Use multimedia learning resources"
        ]
      }
    },
    {
      name: "Chat with DrLeeGPT",
      description: "Direct access to all five educational superpowers through intelligent conversation interface",
      href: "/dashboard/chat",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      professorView: {
        title: "All-in-One Teaching Assistant",
        features: [
          "Access all five superpowers in one chat",
          "Get instant teaching strategies",
          "Create adaptive content on demand",
          "Troubleshoot student challenges"
        ]
      },
      studentView: {
        title: "Personal Learning Companion",
        features: [
          "24/7 access to educational support",
          "Personalized learning conversations",
          "Adaptive explanations and examples",
          "Continuous learning guidance"
        ]
      }
    },
    {
      name: "Talk to Your Materials",
      description: "Transform lectures, documents, and resources into conversational AI personas for real-time interaction",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-9 0a2 2 0 00-2 2v14a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2m-5 3v2m0 4v2" />
        </svg>
      ),
      professorView: {
        title: "Interactive Content Delivery",
        features: [
          "Zoom recordings become conversational",
          "Lecture slides answer student questions",
          "Reading materials provide clarification",
          "Office hours extend through materials"
        ]
      },
      studentView: {
        title: "Living Study Materials",
        features: [
          "Ask questions to your lecture recordings",
          "Get clarification from reading materials",
          "Review sessions with your textbook",
          "Interactive study conversations"
        ]
      }
    },
    {
      name: "Lesson to Podcast",
      description: "Convert lectures, YouTube videos, and educational content into engaging podcast format",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
      professorView: {
        title: "Content Repurposing Made Easy",
        features: [
          "Transform lectures into podcast series",
          "Convert YouTube content to audio",
          "Create commuter-friendly learning",
          "Extend content reach and accessibility"
        ]
      },
      studentView: {
        title: "Learning on the Go",
        features: [
          "Listen to lectures during commute",
          "Review content while exercising",
          "Accessible learning for visual impairments",
          "Multi-tasking friendly study format"
        ]
      }
    },
    {
      name: "Native Image Generation",
      description: "Create custom educational visuals, diagrams, and illustrations tailored to your curriculum",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      professorView: {
        title: "Custom Visual Content Creation",
        features: [
          "Generate culturally relevant illustrations",
          "Create subject-specific diagrams",
          "Produce accessible visual aids",
          "Design engaging presentation graphics"
        ]
      },
      studentView: {
        title: "Visual Learning Enhancement",
        features: [
          "See concepts through custom visuals",
          "Access culturally familiar imagery",
          "Visual memory aids for complex topics",
          "Engaging graphic content"
        ]
      }
    },
    {
      name: "Video Generation",
      description: "Produce educational videos with AI avatars, animations, and South Florida cultural context",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      professorView: {
        title: "Professional Video Content",
        features: [
          "Create lecture videos with AI avatars",
          "Produce animated explanations",
          "Generate culturally relevant content",
          "Scale video production efficiently"
        ]
      },
      studentView: {
        title: "Engaging Video Learning",
        features: [
          "Watch AI-generated explanations",
          "See animated concept demonstrations",
          "Access culturally familiar examples",
          "Review with video study aids"
        ]
      }
    },
    {
      name: "DrLeeGPT Live",
      description: "Real-time audio and text conversations with adaptive AI teaching assistant for immediate support",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.334 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
        </svg>
      ),
      professorView: {
        title: "Real-Time Teaching Support",
        features: [
          "Live AI assistance during lectures",
          "Instant student question handling",
          "Real-time curriculum adaptation",
          "Voice or text interaction modes"
        ]
      },
      studentView: {
        title: "Immediate Learning Support",
        features: [
          "Ask questions during class",
          "Get instant clarification",
          "Voice or text communication",
          "Real-time learning assistance"
        ]
      }
    },
    {
      name: "Google Workspace Integration",
      description: "Seamlessly connect with Drive, Sheets, Docs, Meet, Teams for unified educational workflow",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
      professorView: {
        title: "Unified Teaching Workflow",
        features: [
          "AI analyzes Google Drive documents",
          "Auto-populate Sheets with student data",
          "Enhance Docs with AI suggestions",
          "Intelligent Meet/Teams integration"
        ]
      },
      studentView: {
        title: "Seamless Learning Integration",
        features: [
          "AI helps with Google Docs assignments",
          "Smart organization in Drive",
          "Enhanced collaboration tools",
          "Integrated study workflows"
        ]
      }
    },
    {
      name: "ChatterBots",
      description: "Design, test, and interact with custom AI characters for educational role-play and simulation",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
      professorView: {
        title: "Educational Character Creation",
        features: [
          "Create historical figure chatbots",
          "Design subject-specific personas",
          "Role-play scenarios for learning",
          "Interactive character simulations"
        ]
      },
      studentView: {
        title: "Interactive Character Learning",
        features: [
          "Chat with historical figures",
          "Practice conversations with experts",
          "Engaging role-play exercises",
          "Learn through character interaction"
        ]
      }
    },
    {
      name: "Dictation/Notes",
      description: "Convert speech to organized, searchable text with intelligent formatting and indexing",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      professorView: {
        title: "Effortless Lecture Capture",
        features: [
          "Automatic lecture formatting and indexing",
          "Interview transcription for research",
          "Organized content for easy review",
          "Searchable lecture archives"
        ]
      },
      studentView: {
        title: "Smart Note-Taking Assistant",
        features: [
          "Speak your notes, AI organizes them",
          "Record lectures with auto-formatting",
          "Voice journaling for reflection",
          "Searchable study materials"
        ]
      }
    },
    {
      name: "Video to Learning",
      description: "Transform any video into interactive learning applications with embedded quizzes and engagement",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      professorView: {
        title: "Interactive Lesson Creation",
        features: [
          "Old lectures become interactive apps",
          "YouTube content turns educational",
          "Lab demos become step-by-step guides",
          "Embedded quizzes and assessments"
        ]
      },
      studentView: {
        title: "Engaging Video Learning",
        features: [
          "Interactive lessons replace passive watching",
          "Gamified presentation experiences",
          "Step-by-step learning applications",
          "Quiz-embedded content for retention"
        ]
      }
    },
    {
      name: "Tiny Cats Explain",
      description: "Break down complex concepts using illustrated cat characters for memorable, approachable learning",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      professorView: {
        title: "Approachable Content Delivery",
        features: [
          "Dense material becomes digestible",
          "Visual metaphors enhance understanding",
          "Humor reduces learning anxiety",
          "Memorable character associations"
        ]
      },
      studentView: {
        title: "Fun, Visual Explanations",
        features: [
          "Complex topics made approachable",
          "Memorable mnemonics with cats",
          "Reduced stress around difficult topics",
          "Engaging visual learning style"
        ]
      }
    },
    {
      name: "Flashcard Maker",
      description: "Automatically generate comprehensive study cards from any content with adaptive focus areas",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      professorView: {
        title: "Automated Study Material Creation",
        features: [
          "Textbook chapters become flashcard decks",
          "Culturally relevant South Florida examples",
          "Quiz questions from lecture transcripts",
          "Adaptive focus on weak areas"
        ]
      },
      studentView: {
        title: "Personalized Study Cards",
        features: [
          "Upload content, get instant flashcards",
          "Vocabulary with cultural context",
          "Adaptive practice based on performance",
          "Comprehensive study deck generation"
        ]
      }
    },
    {
      name: "Video Analyzer",
      description: "Extract educational content from video materials with searchable transcripts and feedback",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      professorView: {
        title: "Video Content Analysis",
        features: [
          "Student presentation feedback analysis",
          "Documentary concept extraction",
          "Guest lecture searchable transcripts",
          "Zoom/Webex content study guides"
        ]
      },
      studentView: {
        title: "Enhanced Video Learning",
        features: [
          "Presentation improvement insights",
          "Key concepts from any video content",
          "Searchable lecture archives",
          "Study guides from recorded sessions"
        ]
      }
    },
    {
      name: "Themed Avatars",
      description: "Engage with historical figures and expert personas for immersive educational conversations",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      professorView: {
        title: "Historical Character Integration",
        features: [
          "Socrates guides philosophical discussions",
          "Shakespeare explains literary techniques",
          "Einstein teaches physics concepts",
          "Subject-specific expert personas"
        ]
      },
      studentView: {
        title: "Learn from the Masters",
        features: [
          "Converse with historical figures",
          "Authentic character interactions",
          "Immersive learning experiences",
          "Memorable educational conversations"
        ]
      }
    },
    {
      name: "Rubrics and Grading",
      description: "Streamlined assessment tools with intelligent grading assistance and detailed feedback systems",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      professorView: {
        title: "Intelligent Assessment Tools",
        features: [
          "Automated rubric generation",
          "Consistent grading assistance",
          "Detailed feedback suggestions",
          "Time-saving assessment workflows"
        ]
      },
      studentView: {
        title: "Clear Assessment Feedback",
        features: [
          "Detailed rubric explanations",
          "Specific improvement suggestions",
          "Consistent grading standards",
          "Transparent assessment criteria"
        ]
      }
    }
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % apps.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + apps.length) % apps.length);
  };

  const goToSlide = (index: number) => {
    setActiveSlide(index);
  };

  return (
    <section id="apps" className="relative bg-gray-50 overflow-hidden">
      {/* Magic UI Dot Pattern Background */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute inset-0 animate-dot-pulse" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59,130,246,0.6) 1px, transparent 0)`,
          backgroundSize: '25px 25px'
        }}></div>
      </div>

      {/* Magic UI Grid Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-repeat animate-pulse" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='0.1'%3E%3Cpath d='M30 30L0 0V60L30 30ZM60 60V0L30 30L60 60Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
             }}>
        </div>
      </div>

      {/* Magic UI Particles System */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(particleCount)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full opacity-40 animate-pulse ${
              i % 3 === 0 ? 'bg-brand-blue' : i % 3 === 1 ? 'bg-brand-purple' : 'bg-brand-green'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${4 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-[10%] py-24 lg:py-32">
        {/* Section Header with Magic UI Blur Fade */}
        <div className="text-center mb-16">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 blur-none translate-y-0' : 'opacity-0 blur-sm translate-y-4'}`}>
            <h2 className="heading-secondary text-gray-900 mb-6">
              Pre-Built Educational Apps <span className="text-brand-blue font-bold">(Ready to Use)</span>
            </h2>
          </div>
          
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 blur-none translate-y-0' : 'opacity-0 blur-sm translate-y-4'}`}>
            <p className="body-large text-gray-600 max-w-3xl mx-auto">
              Transform your teaching with our collection of specialized educational applications. From 3D visual interactions to AI-powered grading, these tools are ready to enhance your classroom experience.
            </p>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* App Showcase */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 group">
            <div className="p-8 lg:p-12">
              {/* App Header */}
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-blue to-brand-purple rounded-xl flex items-center justify-center text-white mr-6 group-hover:scale-110 transition-transform duration-300">
                  {apps[activeSlide].icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {apps[activeSlide].name}
                  </h3>
                  <p className="text-lg text-gray-600">
                    {apps[activeSlide].description}
                  </p>
                </div>
              </div>

              {/* Two-Column Layout: Professor View & Student View */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Professor View */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 hover:from-blue-100 hover:to-blue-200 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-brand-blue">
                      {apps[activeSlide].professorView.title}
                    </h4>
                  </div>
                  <ul className="space-y-3">
                    {apps[activeSlide].professorView.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-brand-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Student View */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200 hover:from-green-100 hover:to-green-200 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-brand-green rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-brand-green">
                      {apps[activeSlide].studentView.title}
                    </h4>
                  </div>
                  <ul className="space-y-3">
                    {apps[activeSlide].studentView.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-brand-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="flex items-center justify-center w-12 h-12 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg hover:border-brand-blue hover:text-brand-blue transition-all duration-300 group"
              aria-label="Previous app"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dot Indicators */}
            <div className="flex space-x-3">
              {apps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeSlide 
                      ? 'bg-brand-blue scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to app ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="flex items-center justify-center w-12 h-12 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg hover:border-brand-blue hover:text-brand-blue transition-all duration-300 group"
              aria-label="Next app"
            >
              <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* App Counter */}
          <div className="text-center mt-6">
            <span className="text-sm text-gray-500">
              App {activeSlide + 1} of {apps.length}
            </span>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 blur-none translate-y-0' : 'opacity-0 blur-sm translate-y-4'}`}>
            <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-brand-blue to-brand-purple text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group">
              Explore All Educational Apps
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Apps;
