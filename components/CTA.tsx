'use client';

import { useState, useEffect } from 'react';

const CTA = () => {
  const [animationVisible, setAnimationVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimationVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Background with Magic UI enhancements */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-brand-purple to-brand-green">
        {/* Magic UI Grid Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 animate-dot-pulse" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        {/* Magic UI Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 4}s`
              }}
            ></div>
          ))}
        </div>
        
        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-[10%] py-24 lg:py-32 text-center">
        {/* Magic UI Blur Fade - Section Headline */}
        <div className={`transition-all duration-1000 ${animationVisible ? 'opacity-100 blur-none translate-y-0' : 'opacity-0 blur-sm translate-y-4'}`}>
          <h2 className="heading-secondary text-white mb-6 tracking-tight">
            Transform Your Teaching Today
          </h2>
        </div>

        {/* Subheadline with delay */}
        <div className={`transition-all duration-1000 delay-300 ${animationVisible ? 'opacity-100 blur-none translate-y-0' : 'opacity-0 blur-sm translate-y-4'}`}>
          <p className="body-large text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of educators who are saving time, increasing student engagement, and improving learning outcomes with LearningScience.ai.
          </p>
        </div>

        {/* CTA Buttons with delay */}
        <div className={`transition-all duration-1000 delay-500 ${animationVisible ? 'opacity-100 blur-none translate-y-0' : 'opacity-0 blur-sm translate-y-4'}`}>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* Primary CTA with Magic UI Shine Border */}
            <div className="relative group">
              {/* Shine Border effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-white via-yellow-200 to-white rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              
              <a
                href="/signup"
                className="relative px-8 py-4 bg-white text-brand-blue font-semibold rounded-xl border border-transparent transition-all duration-300 hover:scale-105 hover:shadow-xl block"
              >
                Start Your Free Trial
              </a>
            </div>

            {/* Secondary Text Link */}
            <p className="text-white/80 text-sm">
              No credit card required. Get started in minutes.
            </p>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.4;
          }
          50% { 
            transform: translateY(-20px) rotate(180deg); 
            opacity: 0.8;
          }
        }
        
        @keyframes tilt {
          0%, 50%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(1deg);
          }
          75% {
            transform: rotate(-1deg);
          }
        }
        
        @keyframes gridPulse {
          0%, 100% { 
            opacity: 0.1; 
            transform: scale(1);
          }
          50% { 
            opacity: 0.3; 
            transform: scale(1.02);
          }
        }
      `}</style>
    </section>
  );
};

export default CTA;
