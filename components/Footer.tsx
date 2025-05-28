'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";

const Footer = () => {
  const [animationVisible, setAnimationVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimationVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const footerLinks = {
    platform: [
      { label: 'Features', href: '/features' },
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Integrations', href: '/integrations' },
    ],
    resources: [
      { label: 'Learning Science Guide', href: '/resources/learning-science' },
      { label: 'Quick Start Guide', href: '/resources/quick-start' },
      { label: 'API Documentation', href: '/docs' },
      { label: 'Help Center', href: '/help' },
      { label: 'Community Forum', href: '/community' },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Team', href: '/team' },
      { label: 'Careers', href: '/careers' },
      { label: 'Research', href: '/research' },
      { label: 'News', href: '/news' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Data Security', href: '/security' },
      { label: 'FERPA Compliance', href: '/ferpa' },
      { label: 'Contact', href: '/contact' },
    ]
  };

  const socialLinks = [
    { 
      label: 'Twitter', 
      href: 'https://twitter.com/learningscience', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      )
    },
    { 
      label: 'LinkedIn', 
      href: 'https://linkedin.com/company/learningscience', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    { 
      label: 'YouTube', 
      href: 'https://youtube.com/@learningscience', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    { 
      label: 'GitHub', 
      href: 'https://github.com/learningscience', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    }
  ]; 

  return (
    <footer className="bg-slate-900 relative overflow-hidden">
      {/* Magic UI Dot Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 animate-dot-pulse" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-[10%]">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-16">
          
          {/* Company Info */}
          <div className={`lg:col-span-1 transition-all duration-1000 ${animationVisible ? 'opacity-100 blur-none translate-y-0' : 'opacity-0 blur-sm translate-y-4'}`}>
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-blue to-brand-purple rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">LS</span>
              </div>
              <span className="text-white font-bold text-lg">LearningScience.ai</span>
            </Link>
            
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Transforming education with AI that understands learning science principles.
            </p>

            {/* Social Media Links with Magic UI Border Beam */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <div key={social.label} className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue to-brand-purple rounded-lg opacity-0 group-hover:opacity-75 blur-sm transition duration-300"></div>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative p-2 bg-gray-800 text-gray-400 hover:text-white rounded-lg transition-colors duration-300 block"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div className={`transition-all duration-1000 delay-150 ${animationVisible ? 'opacity-100 blur-none translate-y-0' : 'opacity-0 blur-sm translate-y-4'}`}>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className={`transition-all duration-1000 delay-300 ${animationVisible ? 'opacity-100 blur-none translate-y-0' : 'opacity-0 blur-sm translate-y-4'}`}>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className={`transition-all duration-1000 delay-450 ${animationVisible ? 'opacity-100 blur-none translate-y-0' : 'opacity-0 blur-sm translate-y-4'}`}>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className={`transition-all duration-1000 delay-600 ${animationVisible ? 'opacity-100 blur-none translate-y-0' : 'opacity-0 blur-sm translate-y-4'}`}>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={`border-t border-gray-800 py-8 transition-all duration-1000 delay-750 ${animationVisible ? 'opacity-100 blur-none translate-y-0' : 'opacity-0 blur-sm translate-y-4'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div className="mb-4 md:mb-0">
              <p>&copy; 2024 LearningScience.ai. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="hover:text-white transition-colors duration-300">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors duration-300">
                Terms
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors duration-300">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
