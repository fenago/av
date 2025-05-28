"use client";

import { useState, useEffect } from "react";

// Enhanced How It Works component with Magic UI and 21st.dev components
// Features animated timeline, step revelations, and specified content

interface HowItWorksStep {
  number: number;
  title: string;
  description: string;
  icon: string;
}

// 4 Steps from the new landing page specification
const steps: HowItWorksStep[] = [
  {
    number: 1,
    title: "Upload Your Materials",
    description: "Upload your syllabus, lecture notes, assignments, and other course materials. Our platform analyzes them to understand your teaching style and course content.",
    icon: "📚"
  },
  {
    number: 2,
    title: "Customize Your Experience",
    description: "Set your preferences for how the platform should interact with students, what level of guidance to provide, and how to handle different types of questions.",
    icon: "⚙️"
  },
  {
    number: 3,
    title: "Share with Students",
    description: "Invite students to join your course on the platform. They'll have 24/7 access to a learning assistant that understands your course materials and teaching approach.",
    icon: "👥"
  },
  {
    number: 4,
    title: "Monitor and Refine",
    description: "Track student engagement, identify common misconceptions, and refine your approach based on detailed analytics and insights.",
    icon: "📊"
  }
];

// Magic UI Number Ticker Component
const NumberTicker = ({ number, isVisible, index }: { number: number; isVisible: boolean; index: number }) => {
  return (
    <div 
      className={`relative flex items-center justify-center w-16 h-16 mx-auto mb-6 transform transition-all duration-700 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
      }`}
      style={{ transitionDelay: `${index * 300}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse"></div>
      <div className="relative bg-white rounded-full w-14 h-14 flex items-center justify-center border-2 border-blue-200">
        <span className="text-2xl font-bold text-blue-600">{number}</span>
      </div>
    </div>
  );
};

// Magic UI Animated Beam Component for timeline connections
const AnimatedBeam = ({ isVisible, index }: { isVisible: boolean; index: number }) => {
  return (
    <div className="hidden lg:flex items-center justify-center absolute top-8 left-full w-full -z-10">
      <div 
        className={`h-1 bg-gradient-to-r from-blue-600 to-purple-600 transform transition-all duration-1000 ${
          isVisible ? 'w-full opacity-100' : 'w-0 opacity-0'
        }`}
        style={{ transitionDelay: `${index * 300 + 200}ms` }}
      >
        <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse"></div>
      </div>
    </div>
  );
};

// Magic UI Magic Card for step display
const StepCard = ({ step, index, isVisible }: { step: HowItWorksStep; index: number; isVisible: boolean }) => {
  const [cardVisible, setCardVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setCardVisible(true);
      }, index * 300 + 400);
      return () => clearTimeout(timer);
    }
  }, [isVisible, index]);

  return (
    <div 
      className={`relative transform transition-all duration-700 ${
        cardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Magic UI Border Beam on hover */}
      <div 
        className={`relative bg-white/80 backdrop-blur-md rounded-lg border border-gray-200 
                   p-8 hover:bg-white/90 hover:shadow-xl hover:shadow-blue-500/10 
                   hover:border-blue-200 transition-all duration-300 hover:-translate-y-1 
                   group cursor-pointer mt-8`}
      >
        {/* Step illustration/image */}
        <div className="mb-6 flex justify-center">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center border border-gray-100">
            {step.number === 1 && (
              <svg width="80" height="80" viewBox="0 0 80 80" className="text-blue-600">
                <rect x="8" y="12" width="64" height="48" rx="4" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2"/>
                <rect x="12" y="16" width="56" height="8" rx="2" fill="currentColor" fillOpacity="0.3"/>
                <rect x="12" y="28" width="40" height="4" rx="2" fill="currentColor" fillOpacity="0.2"/>
                <rect x="12" y="36" width="48" height="4" rx="2" fill="currentColor" fillOpacity="0.2"/>
                <rect x="12" y="44" width="32" height="4" rx="2" fill="currentColor" fillOpacity="0.2"/>
                <path d="M20 68 L36 68 L32 60 L24 60 Z" fill="currentColor" fillOpacity="0.3"/>
                <circle cx="28" cy="65" r="2" fill="currentColor"/>
                <path d="M45 65 L55 55 L60 60 L50 70 Z" fill="currentColor" fillOpacity="0.2"/>
              </svg>
            )}
            {step.number === 2 && (
              <svg width="80" height="80" viewBox="0 0 80 80" className="text-purple-600">
                <rect x="10" y="8" width="60" height="64" rx="6" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2"/>
                <rect x="16" y="14" width="48" height="6" rx="3" fill="currentColor" fillOpacity="0.3"/>
                <circle cx="20" cy="28" r="3" fill="currentColor" fillOpacity="0.4"/>
                <rect x="28" y="26" width="24" height="4" rx="2" fill="currentColor" fillOpacity="0.2"/>
                <circle cx="20" cy="40" r="3" fill="currentColor" fillOpacity="0.4"/>
                <rect x="28" y="38" width="32" height="4" rx="2" fill="currentColor" fillOpacity="0.2"/>
                <circle cx="20" cy="52" r="3" fill="currentColor" fillOpacity="0.4"/>
                <rect x="28" y="50" width="20" height="4" rx="2" fill="currentColor" fillOpacity="0.2"/>
                <rect x="52" y="26" width="8" height="8" rx="1" fill="currentColor" fillOpacity="0.3"/>
                <rect x="52" y="38" width="8" height="8" rx="1" fill="currentColor" fillOpacity="0.3"/>
              </svg>
            )}
            {step.number === 3 && (
              <svg width="80" height="80" viewBox="0 0 80 80" className="text-green-600">
                <rect x="8" y="12" width="64" height="56" rx="4" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2"/>
                <rect x="12" y="16" width="56" height="8" rx="2" fill="currentColor" fillOpacity="0.3"/>
                <circle cx="20" cy="36" r="6" fill="currentColor" fillOpacity="0.2"/>
                <rect x="30" y="32" width="20" height="3" rx="1" fill="currentColor" fillOpacity="0.3"/>
                <rect x="30" y="38" width="16" height="3" rx="1" fill="currentColor" fillOpacity="0.2"/>
                <circle cx="20" cy="56" r="6" fill="currentColor" fillOpacity="0.2"/>
                <rect x="30" y="52" width="24" height="3" rx="1" fill="currentColor" fillOpacity="0.3"/>
                <rect x="30" y="58" width="18" height="3" rx="1" fill="currentColor" fillOpacity="0.2"/>
                <circle cx="60" cy="30" r="8" fill="currentColor" fillOpacity="0.15"/>
                <path d="M56 30 L58 32 L64 26" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            )}
            {step.number === 4 && (
              <svg width="80" height="80" viewBox="0 0 80 80" className="text-indigo-600">
                <rect x="8" y="12" width="64" height="56" rx="4" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2"/>
                <rect x="12" y="16" width="56" height="8" rx="2" fill="currentColor" fillOpacity="0.3"/>
                <rect x="16" y="32" width="12" height="20" rx="1" fill="currentColor" fillOpacity="0.3"/>
                <rect x="32" y="28" width="12" height="24" rx="1" fill="currentColor" fillOpacity="0.4"/>
                <rect x="48" y="24" width="12" height="28" rx="1" fill="currentColor" fillOpacity="0.2"/>
                <circle cx="22" cy="58" r="2" fill="currentColor" fillOpacity="0.5"/>
                <circle cx="38" cy="58" r="2" fill="currentColor" fillOpacity="0.5"/>
                <circle cx="54" cy="58" r="2" fill="currentColor" fillOpacity="0.5"/>
                <path d="M12 52 Q40 45 68 52" stroke="currentColor" strokeWidth="2" fill="none" fillOpacity="0.4"/>
              </svg>
            )}
          </div>
        </div>

        {/* Magic UI Text Reveal */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
            {step.title}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {step.description}
          </p>
        </div>

        {/* Magic UI Border Beam effect */}
        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-green-500/10"></div>
        </div>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedSteps, setExpandedSteps] = useState<{ [key: number]: boolean }>({});
  const [particleCount] = useState(15);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative bg-white py-24 lg:py-32 overflow-hidden">
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

      <div className="relative max-w-7xl mx-auto px-[10%]">
        {/* Magic UI Grid Pattern overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridPulse 4s ease-in-out infinite'
          }}
        ></div>

        <div className="relative container mx-auto px-4 max-w-7xl">
          {/* Magic UI Text Reveal for section headline */}
          <div className="text-center mb-16">
            <h2 
              className={`text-4xl lg:text-5xl font-bold text-gray-900 mb-6 transform transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'
              }`}
            >
              How LearningScience.ai Works
            </h2>
            <p 
              className={`text-xl text-gray-700 max-w-3xl mx-auto transform transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              Getting started is simple. Our platform integrates seamlessly with your existing teaching materials and workflows.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Number Ticker */}
                <NumberTicker 
                  number={step.number} 
                  isVisible={isVisible} 
                  index={index}
                />
                
                {/* Animated Beam Connection (desktop only) */}
                {index < steps.length - 1 && (
                  <AnimatedBeam isVisible={isVisible} index={index} />
                )}
                
                {/* Step Card */}
                <StepCard 
                  step={step} 
                  index={index} 
                  isVisible={isVisible}
                />
              </div>
            ))}
          </div>
        </div>

        {/* CSS animations */}
        <style jsx>{`
          @keyframes gridPulse {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.4; }
          }
          @keyframes slideIn {
            0%, 100% { 
              opacity: 0; 
              transform: translateX(100px);
            }
            50% { 
              opacity: 0.5; 
              transform: translateX(50px);
            }
            100% { 
              opacity: 1; 
              transform: translateX(0);
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default HowItWorks;
