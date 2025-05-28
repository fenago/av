"use client";

import { useRef, useState, useEffect } from "react";
import type { JSX } from "react";

// Enhanced FAQ component with Magic UI and 21st.dev styled components
// Features modern animations, glassmorphism effects, and specified FAQ content

interface FAQItemProps {
  question: string;
  answer: JSX.Element;
  delay: number;
}

// FAQ content from the landing page specification
const faqList: FAQItemProps[] = [
  {
    question: "How is LearningScience.ai different from ChatGPT or other general AI tools?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        Unlike general AI tools, LearningScience.ai is specifically designed for education with learning science principles built in. 
        It understands pedagogical approaches, adapts to different learning styles, and maintains academic integrity. Our platform is 
        fine-tuned for educational contexts and integrates with your course materials.
      </div>
    ),
    delay: 0.1
  },
  {
    question: "Will this encourage cheating or replace critical thinking?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        No, quite the opposite. Our platform is designed to promote active learning and critical thinking. It provides guidance and 
        scaffolding rather than direct answers, helping students develop problem-solving skills. The platform can be configured to 
        align with your academic integrity policies.
      </div>
    ),
    delay: 0.2
  },
  {
    question: "How much time does it take to set up?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        Most professors can get started in under an hour. Simply upload your syllabus and course materials, customize your preferences, 
        and invite your students. Our onboarding team is available to help with more complex implementations.
      </div>
    ),
    delay: 0.3
  },
  {
    question: "Can I customize how the AI interacts with my students?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        Absolutely. You can set guidelines for how the platform responds to different types of questions, what level of help it provides, 
        and how it aligns with your teaching philosophy. You maintain full control over the learning experience.
      </div>
    ),
    delay: 0.4
  },
  {
    question: "Is my course content secure and private?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        Yes. We take data privacy and security seriously. Your course materials and student interactions are encrypted and never used 
        to train our models without explicit permission. We comply with FERPA and other educational privacy regulations.
      </div>
    ),
    delay: 0.5
  },
  {
    question: "How does pricing work for large institutions?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        Our Institution plan supports up to 100 professors and 5,000 students. For larger implementations, please contact our sales 
        team for custom enterprise pricing that scales with your needs.
      </div>
    ),
    delay: 0.6
  }
];

// Magic UI Animated Icon Component for FAQ expand/collapse
const AnimatedIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="flex-shrink-0 ml-auto">
      <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
        <svg
          className="w-6 h-6 text-brand-medium group-hover:text-brand-blue transition-colors duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </div>
    </div>
  );
};

// 21st.dev Modern Accordion Item Component with Magic UI Blur Fade
const FaqItem = ({ item, index }: { item: FAQItemProps; index: number }) => {
  const answerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [answerHeight, setAnswerHeight] = useState<string>("0px");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 150 * index);
    return () => clearTimeout(timer);
  }, [index]);

  useEffect(() => {
    if (answerRef.current) {
      setAnswerHeight(isOpen ? `${answerRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);

  const toggleFAQ = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div 
      className={`relative transform transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Magic UI Border Beam effect for active question */}
      {isOpen && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green opacity-20 p-[2px] animate-pulse">
          <div className="bg-white rounded-2xl h-full w-full"></div>
        </div>
      )}

      {/* 21st.dev Accordion Card */}
      <div 
        className={`relative bg-white/80 backdrop-blur-sm border rounded-2xl transition-all duration-300 hover:shadow-lg group ${
          isOpen 
            ? 'border-brand-blue/30 shadow-md' 
            : 'border-gray-200/50 hover:border-gray-300/70'
        }`}
      >
        <button
          className={`w-full px-8 py-6 text-left focus:outline-none focus:ring-2 focus:ring-brand-blue/20 rounded-2xl transition-all duration-300 ${
            isOpen ? 'text-brand-dark' : 'text-brand-dark hover:text-brand-blue'
          }`}
          onClick={toggleFAQ}
        >
          <div className="flex items-start justify-between gap-4">
            <span className="font-semibold text-lg leading-relaxed">
              {item.question}
            </span>
            <AnimatedIcon isOpen={isOpen} />
          </div>
        </button>

        {/* Animated Answer Container */}
        <div
          className="overflow-hidden transition-all duration-500 ease-in-out"
          style={{ height: answerHeight }}
        >
          <div ref={answerRef} className="px-8 pb-6">
            <div className="text-brand-medium text-base leading-relaxed">
              {item.answer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [particleCount] = useState(15);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative bg-white overflow-hidden py-24">
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

      <div className="relative max-w-4xl mx-auto px-[10%]">
        {/* Magic UI Blur Fade Text - Section Headline */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-sm translate-y-4'}`}>
          <h2 className="heading-secondary text-brand-dark mb-6">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-6">
          {faqList.map((item, index) => (
            <FaqItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
