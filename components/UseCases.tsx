"use client";

import { useState, useEffect } from "react";

const UseCases = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [particleCount] = useState(15);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const useCases = [
    {
      id: 'test-prep',
      title: 'Test Prep',
      description: 'Generate unlimited practice questions with immediate, constructive feedback in your teaching style.',
      professorPerspective: 'My students get unlimited practice with immediate, constructive feedback in my teaching style.',
      studentPerspective: 'I can practice for hours without feeling judged, and the AI knows exactly what I\'m struggling with.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      id: 'teaching-concept',
      title: 'Teaching a Concept',
      description: 'Break concepts into building blocks with multiple explanation methods and check understanding before moving forward.',
      professorPerspective: 'The AI teaches using my methods and examples, extending my reach to every student 24/7.',
      studentPerspective: 'It\'s like having a patient tutor who explains things in different ways until I get it.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      id: 'releveling',
      title: 'Releveling',
      description: 'Adjust complexity, vocabulary, and examples to meet students at their academic and cultural level.',
      professorPerspective: 'I can reach students at every academic AND cultural level without extra prep time.',
      studentPerspective: 'The content makes sense because it\'s explained in my language and with examples I understand.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      )
    },
    {
      id: 'guide-activity',
      title: 'Guide Through Activity',
      description: 'Provide step-by-step guidance through complex assignments with personalized support.',
      professorPerspective: 'Students get step-by-step guidance through complex assignments with personalized support.',
      studentPerspective: 'I never feel stuck because there\'s always help available, but I still have to do the thinking.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      id: 'homework-help',
      title: 'Homework Help',
      description: 'Offer guidance, hints, and explanations rather than direct answers to teach problem-solving strategies.',
      professorPerspective: 'Students get immediate help that teaches rather than enables cheating.',
      studentPerspective: 'I can get unstuck at 2 AM and actually understand what I\'m doing.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % useCases.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + useCases.length) % useCases.length);
  };

  const goToSlide = (index: number) => {
    setActiveSlide(index);
  };

  return (
    <section id="use-cases" className="relative bg-white overflow-hidden">
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
              Five Core Use Cases for Every Educational Setting
            </h2>
          </div>
          
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 blur-none translate-y-0' : 'opacity-0 blur-sm translate-y-4'}`}>
            <p className="body-large text-gray-600 max-w-3xl mx-auto">
              From test preparation to homework help, our platform supports the full spectrum of teaching and learning activities.
            </p>
          </div>
        </div>

        {/* Magic UI Carousel */}
        <div className="relative">
          {/* Main Carousel Container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {useCases.map((useCase, index) => (
                <div key={useCase.id} className="w-full flex-shrink-0">
                  {/* 21st.dev Card Component with Magic UI Border Beam */}
                  <div className="relative group mx-4">
                    {/* Magic UI Border Beam Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green rounded-2xl opacity-0 group-hover:opacity-75 blur-sm transition duration-500"></div>
                    
                    {/* Main Card */}
                    <div className="relative bg-white border border-gray-200 rounded-2xl p-8 lg:p-12 shadow-lg hover:shadow-xl transition-all duration-300">
                      {/* Use Case Icon */}
                      <div className="flex justify-center mb-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-brand-blue to-brand-purple rounded-2xl flex items-center justify-center text-white">
                          {useCase.icon}
                        </div>
                      </div>

                      {/* Use Case Title */}
                      <h3 className="heading-tertiary text-gray-900 text-center mb-6">
                        {useCase.title}
                      </h3>

                      {/* Description */}
                      <p className="body-medium text-gray-600 text-center mb-8 leading-relaxed">
                        {useCase.description}
                      </p>

                      {/* Perspectives Grid */}
                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Professor Perspective */}
                        <div className="bg-blue-50 rounded-xl p-6">
                          <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center mr-3">
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253" />
                              </svg>
                            </div>
                            <h4 className="font-semibold text-gray-900">Professor View</h4>
                          </div>
                          <p className="body-small text-gray-700 leading-relaxed">
                            "{useCase.professorPerspective}"
                          </p>
                        </div>

                        {/* Student Perspective */}
                        <div className="bg-green-50 rounded-xl p-6">
                          <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-brand-green rounded-lg flex items-center justify-center mr-3">
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <h4 className="font-semibold text-gray-900">Student View</h4>
                          </div>
                          <p className="body-small text-gray-700 leading-relaxed">
                            "{useCase.studentPerspective}"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Navigation */}
          <div className="flex justify-center items-center mt-12 space-x-6">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="p-3 bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:border-brand-blue transition-all duration-300 group"
              aria-label="Previous use case"
            >
              <svg className="w-5 h-5 text-gray-600 group-hover:text-brand-blue transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Slide Indicators */}
            <div className="flex space-x-2">
              {useCases.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeSlide 
                      ? 'bg-brand-blue scale-110' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="p-3 bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:border-brand-blue transition-all duration-300 group"
              aria-label="Next use case"
            >
              <svg className="w-5 h-5 text-gray-600 group-hover:text-brand-blue transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;
