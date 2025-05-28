'use client';

import { useState, useEffect } from 'react';

// Magic UI and 21st.dev inspired Solution Introduction Section
const Solution = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationVisible, setAnimationVisible] = useState(false);
  const [particleCount] = useState(15);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    const timer2 = setTimeout(() => setAnimationVisible(true), 500);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  const benefits = [
    {
      icon: "🤖",
      text: "24/7 Teaching Assistant - Give professors their time back"
    },
    {
      icon: "📚",
      text: "24/7 Learning Assistant - Give students personalized support"
    },
    {
      icon: "🧠",
      text: "Built on Learning Science - Every feature follows proven educational principles"
    },
    {
      icon: "🌍",
      text: "Culturally Aware - Fine-tuned for diverse student populations"
    },
    {
      icon: "💡",
      text: "Emotionally Intelligent - Recognizes frustration, confusion, and breakthrough moments"
    }
  ];

  return (
    <section id="platform" className="relative bg-white overflow-hidden">
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

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-[10%] py-20 lg:py-28">
        {/* Two-column layout on desktop (image left, text right), single column on mobile */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Interface with Magic UI Bento Grid */}
          <div className={`lg:order-1 order-2 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            {/* Magic UI Bento Grid layout for screenshot/illustration */}
            <div className="relative group">
              {/* Large screenshot with Magic UI Border Beam animated border */}
              <div className="relative backdrop-blur-sm bg-gradient-to-br from-gray-50 to-white border border-gray-200/50 rounded-3xl p-8 shadow-2xl
                            hover:shadow-3xl transform hover:scale-105 transition-all duration-700
                            before:absolute before:inset-0 before:rounded-3xl before:p-[2px] 
                            before:bg-gradient-to-br before:from-brand-blue/30 before:via-brand-purple/30 before:to-brand-green/30
                            before:-z-10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-700">
                
                {/* Magic UI Border Beam animated border */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue/60 to-transparent animate-pulse"></div>
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-purple/60 to-transparent animate-pulse"></div>
                  <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-brand-green/60 to-transparent animate-pulse"></div>
                  <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-brand-blue/60 to-transparent animate-pulse"></div>
                </div>

                {/* LearningScience.ai Interface Mockup */}
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-brand-blue to-brand-purple rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">LS</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-text-primary">LearningScience.ai</h4>
                        <p className="text-sm text-text-secondary">Educational Platform</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-brand-green rounded-full animate-pulse"></div>
                      <span className="text-xs text-brand-green font-medium">Active</span>
                    </div>
                  </div>

                  {/* Sample conversation showcasing DrLeeGPT */}
                  <div className="space-y-4">
                    {/* Student message */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium">S</span>
                      </div>
                      <div className="bg-gray-100 rounded-2xl p-3 max-w-xs">
                        <p className="text-sm text-text-primary">I'm struggling with this calculus problem. Can you just give me the answer?</p>
                      </div>
                    </div>

                    {/* DrLeeGPT response */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-brand-blue to-brand-purple rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">Dr</span>
                      </div>
                      <div className="bg-brand-blue/10 rounded-2xl p-3 max-w-xs">
                        <p className="text-sm text-text-primary">I understand you're feeling stuck! Instead of giving you the answer, let me guide you through the thinking process. What's the first step when approaching a derivative problem like this?</p>
                        <div className="mt-2 flex gap-2">
                          <span className="text-xs bg-brand-green/20 text-brand-green px-2 py-1 rounded">Socratic Method</span>
                          <span className="text-xs bg-brand-purple/20 text-brand-purple px-2 py-1 rounded">Learning Science</span>
                        </div>
                      </div>
                    </div>

                    {/* Feature indicators */}
                    <div className="grid grid-cols-2 gap-3 mt-6">
                      <div className="bg-brand-blue/5 p-3 rounded-xl">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 bg-brand-blue rounded-full animate-ping"></div>
                          <span className="text-xs font-medium text-brand-blue">Active Learning</span>
                        </div>
                        <p className="text-xs text-text-secondary">Guides discovery</p>
                      </div>
                      <div className="bg-brand-purple/5 p-3 rounded-xl">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 bg-brand-purple rounded-full animate-ping"></div>
                          <span className="text-xs font-medium text-brand-purple">Emotional Intelligence</span>
                        </div>
                        <p className="text-xs text-text-secondary">Recognizes frustration</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className={`lg:order-2 order-1 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            {/* Section headline with Magic UI Text Reveal */}
            <h2 className="heading-secondary text-text-primary mb-6 leading-tight">
              Introducing LearningScience.ai: Your Complete 
              <span className="bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green bg-clip-text text-transparent"> AI Employee that Actually Understands Education</span>
            </h2>

            {/* Solution description with Magic UI Blur Fade */}
            <div className={`mb-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
              <p className="body-large text-text-secondary leading-relaxed mb-4">
                LearningScience.ai is a comprehensive platform designed specifically for higher education, powered by 
                <span className="font-semibold text-brand-blue"> DrLeeGPT</span> - our specialized AI model built on 
                <span className="font-semibold text-brand-purple"> LearnLM</span> and fine-tuned for educational excellence. 
                Unlike generic AI tools, our platform understands 
                <span className="font-semibold text-brand-green"> learning science principles</span>, recognizes student emotions, and adapts to diverse cultural backgrounds.
              </p>
              <p className="body-large text-text-secondary leading-relaxed">
                It's a specialized educational AI built on <span className="font-semibold text-brand-purple">LearnLM</span> with 
                <span className="font-semibold text-brand-blue"> five core educational superpowers</span>. Unlike 
                <span className="font-semibold text-brand-green">ChatGPT</span>, every response is designed to 
                <span className="font-bold text-brand-blue">teach, not just answer</span>. It understands learning science principles, 
                recognizes student emotions, and adapts to 
                <span className="font-semibold text-brand-purple">South Florida's diverse cultural backgrounds</span>.
              </p>
            </div>

            {/* 5 key benefits with Magic UI Animated List progressive reveal */}
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-white to-gray-50 border border-gray-100 hover:border-brand-blue/20 hover:shadow-md transition-all duration-500 delay-${(index + 1) * 100} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                >
                  <span className="text-2xl flex-shrink-0">{benefit.icon}</span>
                  <p className="body-medium text-text-primary font-medium">{benefit.text}</p>
                </div>
              ))}
            </div>

            {/* CTA button with Magic UI Shine Border */}
            <div className={`transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <button className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold 
                               bg-brand-blue text-white rounded-xl shadow-lg hover:shadow-xl
                               transform hover:scale-105 transition-all duration-300 
                               border border-transparent hover:border-brand-blue/20
                               overflow-hidden group">
                <span className="relative z-10 flex items-center gap-2">
                  Explore Platform
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                {/* Magic UI Shine Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;
