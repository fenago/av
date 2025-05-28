'use client';

import { useState, useEffect } from 'react';

const Hero = () => {
  const [animationVisible, setAnimationVisible] = useState(false);
  const [particleCount] = useState(15);

  useEffect(() => {
    const timer = setTimeout(() => setAnimationVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center bg-hero-gradient overflow-hidden">
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

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-none mx-auto px-[10%] py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Content */}
          <div className="space-y-8">
            
            {/* H1 Headline with Magic UI Blur Fade Text animation */}
            <div className={`transition-all duration-1000 ${
              animationVisible ? 'opacity-100 blur-none translate-y-0' : 'opacity-0 blur-sm translate-y-8'
            }`}>
              <h1 className="heading-primary text-text-primary leading-tight mb-6">
                Your Complete Platform for{' '}
                <span className="bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green bg-clip-text text-transparent">
                  Higher Education
                </span>
              </h1>
            </div>

            {/* Subheadline paragraph with Magic UI Number Ticker for statistics */}
            <div className={`transition-all duration-1000 delay-300 ${
              animationVisible ? 'opacity-100 blur-none translate-y-0' : 'opacity-0 blur-sm translate-y-8'
            }`}>
              <p className="body-large text-text-secondary leading-relaxed max-w-2xl">
                LearningScience.ai gives educators their time back with a 24/7 teaching assistant that follows learning science principles. 
                Transform how you teach and how students learn with AI that actually understands education.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-600 ${
              animationVisible ? 'opacity-100 blur-none translate-y-0' : 'opacity-0 blur-sm translate-y-8'
            }`}>
              
              {/* Primary CTA button with Magic UI Shine Border */}
              <a
                href="#transform-teaching"
                className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold 
                         bg-brand-blue text-white rounded-lg shadow-lg hover:shadow-xl
                         transform hover:scale-105 transition-all duration-300 
                         border-2 border-transparent hover:border-brand-blue/20
                         overflow-hidden group"
              >
                <span className="relative z-10">Transform Your Teaching</span>
                {/* Magic UI Shine Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                              -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </a>
              
              {/* Secondary CTA link with Magic UI animated arrow */}
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold 
                         text-brand-blue border-2 border-brand-blue/20 hover:border-brand-blue/40 rounded-lg
                         hover:bg-brand-blue/5 transition-all duration-300 group"
              >
                <span>See How It Works</span>
                {/* Magic UI Animated Arrow */}
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Trust badges with Magic UI Marquee scrolling animation */}
            <div className={`transition-all duration-1000 delay-900 ${
              animationVisible ? 'opacity-100 blur-none translate-y-0' : 'opacity-0 blur-sm translate-y-8'
            }`}>
              <div className="flex flex-wrap items-center gap-6 pt-8">
                <div className="flex items-center gap-2 text-text-secondary">
                  <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse"></div>
                  <span className="body-small font-medium">Trusted by Leading Educators</span>
                </div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <div className="w-2 h-2 bg-brand-blue rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <span className="body-small font-medium">Built on Learning Science</span>
                </div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <div className="w-2 h-2 bg-brand-purple rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <span className="body-small font-medium">Fine-tuned for Diverse Students</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Magic UI Bento Grid Visual Elements */}
          <div className={`relative transition-all duration-1000 delay-1200 ${
            animationVisible ? 'opacity-100 blur-none translate-y-0' : 'opacity-0 blur-sm translate-y-8'
          }`}>
            
            {/* Magic UI Border Beam around main visual */}
            <div className="relative p-1 rounded-3xl bg-gradient-to-br from-brand-blue/20 via-brand-purple/20 to-brand-green/20 animate-pulse">
              
              {/* Magic UI Bento Grid layout for visual elements */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 space-y-6">
                
                {/* Top section - Platform preview */}
                <div className="relative h-40 bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 rounded-2xl 
                               flex items-center justify-center overflow-hidden group">
                  {/* Animated illustration placeholder */}
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 mx-auto bg-brand-blue/20 rounded-2xl flex items-center justify-center 
                                   group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <p className="body-small text-brand-blue font-medium">AI Teaching Assistant</p>
                  </div>
                  
                  {/* Magic UI particles in the visual */}
                  <div className="absolute inset-0">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-brand-blue/30 rounded-full animate-pulse"
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`,
                          animationDelay: `${Math.random() * 2}s`
                        }}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Bottom section - Two smaller cards */}
                <div className="grid grid-cols-2 gap-4">
                  
                  {/* Learning Science card */}
                  <div className="relative h-24 bg-gradient-to-br from-brand-purple/10 to-brand-green/10 rounded-xl 
                                 flex items-center justify-center group hover:scale-105 transition-transform duration-300">
                    <div className="text-center">
                      <div className="w-8 h-8 mx-auto bg-brand-purple/20 rounded-lg flex items-center justify-center mb-1">
                        <svg className="w-4 h-4 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <p className="body-micro text-brand-purple font-medium">Learning Science</p>
                    </div>
                  </div>
                  
                  {/* Cultural Intelligence card */}
                  <div className="relative h-24 bg-gradient-to-br from-brand-green/10 to-brand-blue/10 rounded-xl 
                                 flex items-center justify-center group hover:scale-105 transition-transform duration-300">
                    <div className="text-center">
                      <div className="w-8 h-8 mx-auto bg-brand-green/20 rounded-lg flex items-center justify-center mb-1">
                        <svg className="w-4 h-4 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="body-micro text-brand-green font-medium">Cultural Intelligence</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.4; }
          33% { transform: translateY(-10px) rotate(120deg); opacity: 0.6; }
          66% { transform: translateY(5px) rotate(240deg); opacity: 0.8; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
