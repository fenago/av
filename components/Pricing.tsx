"use client";

import { useState, useEffect } from "react";
import config from "@/config";

// Enhanced Pricing component with Magic UI and 21st.dev components
// Features modern animations, glassmorphism effects, and specified pricing content

interface PricingPlan {
  name: string;
  target: string;
  price: string;
  features: string[];
  ctaText: string;
  isRecommended?: boolean;
  isCustom?: boolean;
}

// Updated pricing plans from the new specification - 4 tiers
const pricingPlans: PricingPlan[] = [
  {
    name: "FREE",
    target: "Perfect for individual professors who want to test the platform.",
    price: "Bring Your Own Key",
    features: [
      "Basic platform features",
      "Limited to one course",
      "No technical support",
      "You provide your own Gemini API key"
    ],
    ctaText: "Get Started Free",
    isRecommended: false
  },
  {
    name: "Instructor",
    target: "Ideal for individual professors with small to medium classes.",
    price: "$19.99/month",
    features: [
      "All platform features",
      "Support for up to 25 students",
      "Basic email support",
      "API key included",
      "Analytics dashboard"
    ],
    ctaText: "Start Free Trial",
    isRecommended: true
  },
  {
    name: "Department",
    target: "Perfect for academic departments with multiple professors.",
    price: "$99.99/month",
    features: [
      "All platform features",
      "Support for up to 10 professors",
      "Up to 500 students total",
      "Priority support",
      "Advanced analytics",
      "Custom branding options"
    ],
    ctaText: "Contact Sales",
    isRecommended: false
  },
  {
    name: "Institution",
    target: "Comprehensive solution for colleges and universities.",
    price: "Custom Pricing",
    features: [
      "All platform features",
      "Support for up to 100 professors",
      "Up to 5,000 students total",
      "Premium support with dedicated account manager",
      "Enterprise-level analytics",
      "LMS integration",
      "White-labeling options"
    ],
    ctaText: "Contact Sales",
    isRecommended: false,
    isCustom: true
  }
];

// Magic UI Magic Card Component for pricing tiers
const PricingCard = ({ plan, index }: { plan: PricingPlan; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 150 * index);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-sm translate-y-8'}`}>
      <div className={`relative p-8 backdrop-blur-sm bg-white/70 border rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col group ${
        plan.isRecommended 
          ? 'border-brand-blue/50 transform scale-105' 
          : 'border-gray-200/20 hover:border-gray-300/40'
      }`}>
        
        {/* Magic UI Border Beam effect for recommended plan */}
        {plan.isRecommended && (
          <>
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green opacity-20 group-hover:opacity-30 transition-opacity duration-500 p-[2px]">
              <div className="bg-white rounded-3xl h-full w-full"></div>
            </div>
            
            {/* Most Popular Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-brand-blue to-brand-purple text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
              Most Popular
            </div>
          </>
        )}

        {/* Magic UI Shine Border on hover */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full"></div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Plan Header */}
          <div className="text-center mb-8">
            <h3 className="font-bold text-2xl text-brand-dark mb-2">
              {plan.name}
            </h3>
            <p className="text-brand-medium text-sm mb-4">
              {plan.target}
            </p>
            
            {/* Price Display */}
            <div className="mb-6">
              {plan.isCustom ? (
                <div className="text-3xl font-bold text-brand-dark">
                  {plan.price}
                </div>
              ) : plan.name === "FREE" ? (
                <div className="text-3xl font-bold text-brand-dark">
                  {plan.price}
                </div>
              ) : (
                <div className="text-3xl font-bold text-brand-dark">
                  {plan.price}
                </div>
              )}
            </div>
          </div>

          {/* Features List */}
          <div className="flex-1 mb-8">
            <ul className="space-y-4">
              {plan.features.map((feature, featureIndex) => (
                <li 
                  key={featureIndex}
                  className={`flex items-start gap-3 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                  style={{ transitionDelay: `${200 + featureIndex * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-green/20 flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-brand-green" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-brand-medium leading-relaxed">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Button */}
          <div className="mt-auto">
            {plan.ctaText === "Contact Sales" ? (
              <a
                href="mailto:sales@learningscience.ai"
                className={`w-full inline-flex items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  plan.isRecommended
                    ? 'bg-gradient-to-r from-brand-blue to-brand-purple text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {plan.ctaText}
              </a>
            ) : plan.name === "FREE" ? (
              <a
                href="/signup"
                className={`w-full inline-flex items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  plan.isRecommended
                    ? 'bg-gradient-to-r from-brand-blue to-brand-purple text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {plan.ctaText}
              </a>
            ) : (
              <a
                href="/signup"
                className={`w-full inline-flex items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  plan.isRecommended
                    ? 'bg-gradient-to-r from-brand-blue to-brand-purple text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {plan.ctaText}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Pricing = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [particleCount] = useState(15);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="pricing" className="relative bg-gradient-to-br from-gray-50 to-white overflow-hidden py-24">
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
            Simple, Transparent Pricing
          </h2>
          <p className="body-large text-brand-medium max-w-3xl mx-auto">
            Choose the plan that fits your needs. All plans include our core platform features.
          </p>
        </div>

        {/* Pricing Grid - 4 columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {pricingPlans.map((plan, index) => (
            <PricingCard 
              key={index}
              plan={plan} 
              index={index}
            />
          ))}
        </div>

        {/* Additional Note */}
        <div className={`text-center mt-12 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-sm translate-y-4'}`}>
          <p className="text-brand-medium">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes gridPulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
};

export default Pricing;
