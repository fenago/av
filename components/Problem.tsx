'use client';

import { useState, useEffect } from 'react';

// Magic UI and 21st.dev inspired Problem Statement Section
const Problem = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [particleCount] = useState(15);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const problems = [
    {
      icon: (
        <svg className="w-8 h-8 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      headline: "Overwhelming Workload",
      description: (
        <>
          The average professor spends <span className="font-bold text-brand-blue">17+ hours per week</span> on 
          <span className="font-semibold text-brand-purple"> grading and answering repetitive questions</span>. 
          That's time that could be spent on <span className="font-semibold text-brand-green">research, meaningful teaching, or personal life</span>.
        </>
      ),
      color: "brand-blue"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      headline: "Scaling Quality Education",
      description: (
        <>
          Providing <span className="font-semibold text-brand-purple">personalized learning experiences</span> to 
          <span className="font-bold text-brand-blue"> hundreds of students</span> with 
          <span className="font-semibold text-brand-green">diverse backgrounds and needs</span> seems impossible with traditional methods.
        </>
      ),
      color: "brand-purple"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      headline: "Delayed Feedback Loops",
      description: (
        <>
          Students need <span className="font-bold text-brand-green">timely feedback</span> to 
          <span className="font-semibold text-brand-blue"> correct misconceptions</span>, but the 
          <span className="font-semibold text-brand-purple">sheer volume of assessments</span> means feedback often comes 
          <span className="font-bold text-brand-blue">too late to be effective</span>.
        </>
      ),
      color: "brand-green"
    }
  ];

  return (
    <section className="relative bg-gray-50 py-24 lg:py-32 overflow-hidden">
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

      {/* Magic UI and 21st.dev inspired Problem Statement Section */}
      <div className="relative max-w-7xl mx-auto px-[10%] py-20 lg:py-28">
        {/* Section headline with Magic UI Blur Fade Text animation */}
        <div className={`text-center mb-16 lg:mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
          <h2 className="heading-secondary text-text-primary mb-6 max-w-4xl mx-auto leading-tight">
            The Challenges Facing Today's <span className="font-bold text-brand-blue">Professors</span>
          </h2>
          
          {/* Subheadline highlighting education hasn't changed */}
          <p className={`body-large text-text-secondary max-w-3xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
            While <span className="font-semibold text-brand-purple">technology has transformed</span> nearly every industry, 
            <span className="font-bold text-brand-blue"> education has remained largely unchanged</span> for over 
            <span className="font-semibold text-brand-green">a century</span>. Today's educators face 
            <span className="font-bold text-brand-purple">unprecedented challenges</span>.
          </p>
        </div>

        {/* Three-column layout on desktop, single column on mobile - Magic UI Bento Grid asymmetric layout */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {problems.map((problem, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-1000 delay-${(index + 1) * 200} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            >
              {/* Magic UI Magic Card with glassmorphism and 21st.dev Card Components styling */}
              <div className="relative h-full backdrop-blur-sm bg-white/70 border border-gray-200/20 rounded-3xl p-8 
                            hover:bg-white/80 hover:border-gray-200/40 hover:shadow-2xl 
                            transform hover:scale-105 transition-all duration-700 overflow-hidden">
                
                {/* Magic UI Border Beam hover effects */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue/60 to-transparent animate-pulse"></div>
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-purple/60 to-transparent animate-pulse"></div>
                  <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-brand-green/60 to-transparent animate-pulse"></div>
                  <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-brand-blue/60 to-transparent animate-pulse"></div>
                </div>

                {/* Card content */}
                <div className="relative space-y-6">
                  {/* 21st.dev Icon component */}
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-white to-gray-50 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    {problem.icon}
                  </div>

                  {/* Problem headline with Magic UI Number Ticker for statistics */}
                  <h3 className="heading-quaternary text-text-primary group-hover:text-brand-blue transition-colors duration-300">
                    {problem.headline}
                  </h3>

                  {/* Problem description with Magic UI Text Reveal animation and colorful highlighting */}
                  <p className="body-medium text-text-secondary leading-relaxed group-hover:text-text-primary transition-colors duration-300">
                    {problem.description}
                  </p>

                  {/* Floating statistic indicator */}
                  {index === 0 && (
                    <div className="absolute -top-3 -right-3 bg-brand-blue text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg animate-bounce">
                      17+ hrs
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
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
      `}</style>
    </section>
  );
};

export default Problem;
