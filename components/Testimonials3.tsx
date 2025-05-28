'use client';

import { useState, useEffect } from 'react';

// Magic UI and 21st.dev inspired Testimonials Section
const Testimonials3 = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [particleCount] = useState(15);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const testimonials = [
    {
      quote: "LearningScience.ai has transformed how I teach. My students are more engaged, retain more information, and I've reclaimed hours of my week that used to be spent answering the same questions repeatedly.",
      name: "Professor S. Washington",
      title: "Professor of Computer Science",
      institution: "Anonymous College in Georgia",
      results: "37% increase in student engagement, 42% improvement in comprehension, 15 hours saved weekly",
      avatar: "SW"
    },
    {
      quote: "As a professor teaching diverse students, I've been amazed at how the platform adapts to different cultural backgrounds and learning styles. The personalization capabilities are unlike anything I've seen before.",
      name: "Professor Carlos Marquez",
      title: "Adjunct Professor of Artificial Intelligence",
      institution: "Miami Dade College",
      results: "87% of students report better understanding of complex concepts, 35% increase in assignment completion rates",
      avatar: "CM"
    },
    {
      quote: "The platform doesn't just answer questions—it teaches students how to think. I've seen a remarkable improvement in critical thinking skills and self-directed learning among my students.",
      name: "Professor Norge Pena-Perez",
      title: "Data Analytics Department",
      institution: "Miami Dade College",
      results: "17% increase in student-initiated questions, 8% improvement in test scores",
      avatar: "NP"
    }
  ];

  // Auto-cycle through testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="relative bg-white overflow-hidden py-24">
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

      <div className="relative max-w-7xl mx-auto px-[5%]">
        {/* Magic UI Blur Fade Text - Section Headline */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-sm translate-y-4'}`}>
          <h2 className="heading-secondary text-brand-dark mb-6">
            What Educators Are Saying
          </h2>
        </div>

        {/* Desktop: Carousel Layout */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Main Testimonial Card */}
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-sm translate-y-8'}`}>
              <div className="relative bg-white/70 backdrop-blur-sm border border-gray-200/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
                {/* Magic UI Border Beam effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px]">
                  <div className="bg-white rounded-2xl h-full w-full"></div>
                </div>
                
                <div className="relative z-10">
                  {/* Quote */}
                  <div className="mb-8">
                    <div className="text-6xl text-brand-blue/20 mb-4">"</div>
                    <p className="text-xl text-gray-700 leading-relaxed italic">
                      {testimonials[activeTestimonial].quote}
                    </p>
                  </div>

                  {/* Professor Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Magic UI Avatar Circle */}
                      <div className="w-16 h-16 bg-gradient-to-br from-brand-blue to-brand-purple rounded-full flex items-center justify-center text-white font-semibold text-lg">
                        {testimonials[activeTestimonial].avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold text-brand-dark">
                          {testimonials[activeTestimonial].name}
                        </h4>
                        <p className="text-brand-medium">
                          {testimonials[activeTestimonial].title}
                        </p>
                        <p className="text-sm text-brand-light">
                          {testimonials[activeTestimonial].institution}
                        </p>
                      </div>
                    </div>

                    {/* Results Metrics */}
                    <div className="text-right">
                      <div className="bg-brand-green/10 text-brand-green px-4 py-2 rounded-lg">
                        <p className="text-sm font-medium">
                          {testimonials[activeTestimonial].results}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel Navigation */}
            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial 
                      ? 'bg-brand-blue scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Single Column Layout */}
        <div className="md:hidden">
          <div className="space-y-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`transition-all duration-1000 ${isVisible ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-sm translate-y-8'}`}
                style={{ transitionDelay: `${300 + index * 200}ms` }}
              >
                <div className="relative bg-white/70 backdrop-blur-sm border border-gray-200/20 rounded-2xl p-6 shadow-lg">
                  {/* Quote */}
                  <div className="mb-6">
                    <div className="text-4xl text-brand-blue/20 mb-2">"</div>
                    <p className="text-lg text-gray-700 leading-relaxed italic">
                      {testimonial.quote}
                    </p>
                  </div>

                  {/* Professor Info */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-brand-blue to-brand-purple rounded-full flex items-center justify-center text-white font-semibold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold text-brand-dark">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-brand-medium">
                          {testimonial.title}
                        </p>
                        <p className="text-xs text-brand-light">
                          {testimonial.institution}
                        </p>
                      </div>
                    </div>

                    {/* Results */}
                    <div className="bg-brand-green/10 text-brand-green px-3 py-2 rounded-lg">
                      <p className="text-sm font-medium">
                        {testimonial.results}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        .animation-delay-300 { animation-delay: 300ms; }
        .animation-delay-500 { animation-delay: 500ms; }
        .animation-delay-900 { animation-delay: 900ms; }
        .animation-delay-1100 { animation-delay: 1100ms; }
      `}</style>
    </section>
  );
};

export default Testimonials3;
