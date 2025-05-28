"use client";

import { useState, useEffect } from "react";
import type { JSX } from "react";

interface Superpower {
  id: string;
  title: string;
  description: string;
  professorPerspective: string;
  studentExperience: string;
  icon: JSX.Element;
  color: string;
}

// Five Core Educational Superpowers
const superpowers: Superpower[] = [
  {
    id: "active-learning",
    title: "Inspiring Active Learning",
    description: "Creates productive struggle with scaffolded support that guides students to discover answers themselves rather than simply providing them.",
    professorPerspective: "Instead of students copying answers, they work through problems with guided discovery. DrLeeGPT won't give them the answer to 'What's the derivative of x²?' but asks 'If x² represents area of a square, what happens to that area when x changes slightly?'",
    studentExperience: "The AI won't give me the answer, but helps me figure it out myself - and I actually remember it because I discovered it.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: "primary-blue"
  },
  {
    id: "cognitive-load",
    title: "Managing Cognitive Load", 
    description: "Breaks complex information into digestible pieces across multiple formats, preventing overwhelm and enhancing comprehension.",
    professorPerspective: "My students aren't overwhelmed anymore. When teaching supply/demand, DrLeeGPT presents the concept verbally, draws simple graphs, shows real Miami housing examples, then synthesizes all three.",
    studentExperience: "Complex topics feel manageable because everything builds logically from what I already know.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: "primary-purple"
  },
  {
    id: "learner-adaptation",
    title: "Adapting to the Learner",
    description: "Dynamically adjusts to individual goals, prior knowledge, and cultural background for truly personalized learning.",
    professorPerspective: "Each student gets personalized instruction. For my Cuban student learning American history, DrLeeGPT connects to Cuban-American immigration patterns and familiar community leaders.",
    studentExperience: "The AI remembers I'm pre-med and struggling with math, so it connects biology concepts to medical examples I understand.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    color: "primary-green"
  },
  {
    id: "stimulating-curiosity",
    title: "Stimulating Curiosity",
    description: "Creates engaging questions and connections that motivate continued learning beyond the required material.",
    professorPerspective: "Students start asking 'what if' questions instead of just 'what's the answer.' After explaining photosynthesis, DrLeeGPT asks 'You know how Miami's air feels different near Bayfront Park? What do you think all those trees are doing to create that feeling?'",
    studentExperience: "I actually want to keep learning because each answer leads to something more interesting I never thought about.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "secondary-orange"
  },
  {
    id: "deepening-metacognition",
    title: "Deepening Metacognition",
    description: "Helps students understand their own learning process and progress, developing critical self-awareness.",
    professorPerspective: "Students become aware of their thinking patterns and can self-correct. DrLeeGPT tells them 'I notice you solved that faster when we used the visual method. What does that tell you about your learning style?'",
    studentExperience: "I understand not just what I'm learning, but how I learn best and can adapt my study strategies.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: "accent-teal"
  }
];

const FeaturesAccordion = () => {
  const [activeTab, setActiveTab] = useState(superpowers[0].id);
  const activeSuperpower = superpowers.find(s => s.id === activeTab) || superpowers[0];
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState(0);
  const [particleCount] = useState(15);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="features" className="relative bg-gray-50 py-24 lg:py-32 overflow-hidden">
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

      <div className="relative max-w-7xl mx-auto px-[10%]">
        {/* Section headline and introduction with Magic UI Blur Fade Text */}
        <div className="text-center mb-16 lg:mb-20 space-y-6 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <span className="text-blue-600 font-inter font-semibold text-sm uppercase tracking-wider">Educational Superpowers</span>
            <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-green-500 rounded-full"></div>
          </div>
          
          <h2 className="font-inter font-bold text-4xl lg:text-5xl text-gray-800 leading-tight max-w-4xl mx-auto">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
              Five Core Educational Superpowers
            </span> That Transform Teaching & Learning
          </h2>
          
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto animate-slide-in" style={{ animationDelay: '0.3s' }}>
            DrLeeGPT isn't built on generic AI. Each capability is designed specifically for education, 
            backed by learning science research, and fine-tuned for real classroom challenges.
          </p>
        </div>

        {/* Magic UI Tabs horizontal navigation */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-2 lg:gap-4 p-2 bg-white/50 backdrop-blur-sm border border-gray-200/20 rounded-2xl animate-slide-in" style={{ animationDelay: '0.6s' }}>
            {superpowers.map((superpower, index) => (
              <button
                key={superpower.id}
                onClick={() => setActiveTab(superpower.id)}
                className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl font-inter font-semibold text-sm transition-all duration-300 ${
                  activeTab === superpower.id
                    ? 'bg-gradient-to-r from-blue-500/10 to-blue-500/5 text-blue-600 shadow-lg'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                }`}
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              >
                {/* Magic UI Animated Beam active indicator */}
                {activeTab === superpower.id && (
                  <div className={`absolute inset-0 rounded-xl border-2 border-blue-500/30 animate-pulse`}></div>
                )}
                
                {/* 21st.dev Tab styling with glassmorphism effects */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                  activeTab === superpower.id 
                    ? 'bg-blue-500/20 text-blue-600' 
                    : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                }`}>
                  {superpower.icon}
                </div>
                
                <span className="hidden sm:block">{superpower.title}</span>
                
                {/* Magic UI Border Beam hover effects */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-300/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            ))}
          </div>
        </div>

        {/* Active tab content with Magic UI Bento Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center animate-fade-in" key={activeTab}>
          
          {/* Left: Detailed description with Magic UI Text Reveal */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-600 rounded-full font-inter font-semibold text-sm">
                {activeSuperpower.icon}
                <span>{activeSuperpower.title}</span>
              </div>
              
              <h3 className="font-inter font-bold text-3xl text-gray-800 leading-tight">
                {activeSuperpower.description}
              </h3>
            </div>

            {/* Magic UI Animated List for bullet points */}
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-100 rounded-2xl animate-slide-in" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-inter font-semibold text-lg text-blue-900 mb-2">Professor Perspective</h4>
                    <p className="text-blue-800 leading-relaxed">"{activeSuperpower.professorPerspective}"</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50/50 border border-purple-100 rounded-2xl animate-slide-in" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-inter font-semibold text-lg text-purple-900 mb-2">Student Experience</h4>
                    <p className="text-purple-800 leading-relaxed">"{activeSuperpower.studentExperience}"</p>
                  </div>
                </div>
              </div>
            </div>

            {/* "See in Action" link with Magic UI animated arrow */}
            <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <button className="group inline-flex items-center gap-2 text-blue-600 font-inter font-semibold hover:text-purple-600 transition-colors duration-300">
                <span>See in Action</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right: Illustration with Magic UI Blur Fade */}
          <div className="relative animate-slide-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative group">
              {/* Main visual container with Magic UI Border Beam */}
              <div className="relative bg-gradient-to-br from-white to-gray-50/50 border border-gray-200/50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500
                            before:absolute before:inset-0 before:rounded-3xl before:p-[2px] 
                            before:bg-gradient-to-br before:from-blue-500/20 before:via-blue-500/20 before:to-blue-500/20
                            before:-z-10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500">
                
                {/* Superpower visualization */}
                <div className="text-center space-y-6">
                  <div className={`w-20 h-20 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <div className={`w-10 h-10 text-blue-600`}>
                      {activeSuperpower.icon}
                    </div>
                  </div>
                  
                  <h4 className="font-inter font-bold text-2xl text-gray-800">
                    {activeSuperpower.title}
                  </h4>
                  
                  <div className="space-y-4">
                    <div className={`h-2 bg-gradient-to-r from-blue-500/30 to-blue-500/10 rounded-full overflow-hidden`}>
                      <div className={`h-full bg-gradient-to-r from-blue-500 to-blue-500/70 rounded-full animate-pulse`} style={{ width: '85%' }}></div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="text-center">
                        <div className="font-semibold text-gray-800">Learning</div>
                        <div>Enhanced</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-800">Engagement</div>
                        <div>Improved</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-800">Retention</div>
                        <div>Boosted</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideInFromLeft {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0);
          }
        }
        @keyframes slideInFromRight {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(0);
          }
        }
        @keyframes slideInFromTop {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(0);
          }
        }
        @keyframes slideInFromBottom {
          0% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(0);
          }
        }
        @keyframes fadeOut {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturesAccordion;
