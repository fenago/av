"use client";

import { useState, useEffect } from "react";
import type { JSX } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from '@/libs/hooks';
import { signOut } from 'next-auth/react';
import Link from "next/link";
import ButtonSignin from "./ButtonSignin";
import UserRoleDisplay from "./UserRoleDisplay";
import Logo from "./Logo";
import config from "@/config";

const links: {
  href: string;
  label: string;
}[] = [
  {
    href: "/#platform",
    label: "Platform",
  },
  {
    href: "/#features",
    label: "Features",
  },
  {
    href: "/#use-cases",
    label: "Use Cases",
  },
  {
    href: "/#apps",
    label: "Apps",
  },
  {
    href: "/#pricing",
    label: "Pricing",
  },
  {
    href: "/#testimonials",
    label: "Testimonials",
  },
];

// Modern Navigation Bar with Magic UI and 21st.dev components
const Header = () => {
  const searchParams = useSearchParams();
  const { session, userProfile, isLoading } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  // Handle scroll for glassmorphism effect and back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 10);
      setShowBackToTop(scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [searchParams]);

  // Smooth scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Smooth scroll to section function
  const scrollToSection = (href: string) => {
    const targetId = href.replace('/#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const headerOffset = 80; // Account for fixed header height
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false); // Close mobile menu if open
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'backdrop-blur-md bg-white/70 border-b border-white/20 shadow-lg' 
          : 'backdrop-blur-sm bg-white/50'
      }`}
    >
      <nav className="max-w-full mx-auto px-[5%] h-20 md:h-20 flex items-center justify-between">
        
        {/* Left: Logo with Magic UI Blur Fade entrance animation */}
        <div className="animate-fade-in">
          <Link
            className="flex items-center shrink-0 group transition-transform duration-300 hover:scale-105"
            href="/"
            title={`${config.appName} homepage`}
          >
            <Logo className="group-hover:scale-105 transition-transform duration-300" />
          </Link>
        </div>

        {/* Center: Navigation links with 21st.dev hover animations (Desktop) */}
        <ul className="hidden lg:flex items-center justify-center gap-8 absolute left-1/2 transform -translate-x-1/2">
          {links.map((link) => (
            <li key={link.href} className="group">
              <a
                href={link.href}
                className="relative body-medium text-text-secondary hover:text-brand-blue 
                         transition-colors duration-300 py-2 px-1 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
              >
                {link.label}
                {/* 21st.dev style hover underline animation */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue 
                               group-hover:w-full transition-all duration-300 ease-out"></span>
              </a>
            </li>
          ))}
        </ul>

        {/* Right: User section or Sign In button */}
        <div className="hidden lg:flex items-center gap-4">
          {session?.user ? (
            <div className="flex items-center gap-3">
              {/* User Role Display */}
              <UserRoleDisplay />
              
              {/* User Dropdown Menu */}
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-blue hover:bg-gray-50 rounded-lg transition-all duration-200">
                  <span>{session.user.name || 'User'}</span>
                  <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7M5 19l7-7 7 7" />
                  </svg>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <Link 
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-blue transition-colors"
                    >
                      Profile
                    </Link>
                    <Link 
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-blue transition-colors"
                    >
                      Dashboard
                    </Link>
                    {/* Show Admin link only for admin users */}
                    {userProfile?.role === 'ADMIN' && (
                      <Link 
                        href="/dashboard?tab=admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
                      >
                        Admin
                      </Link>
                    )}
                    <hr className="my-1 border-gray-200" />
                    <button
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-blue transition-colors"
                      onClick={() => {
                        // Handle billing logic here if needed
                        console.log('Billing clicked');
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.5 4A1.5 1.5 0 001 5.5V6h18v-.5A1.5 1.5 0 0017.5 4h-15zM19 8.5H1v6A1.5 1.5 0 002.5 16h15a1.5 1.5 0 001.5-1.5v-6zM3 13.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm4.75-.75a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Billing
                    </button>
                    <button
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                      onClick={() => signOut({ callbackUrl: "/" })}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
                          clipRule="evenodd"
                        />
                        <path
                          fillRule="evenodd"
                          d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-.943a.75.75 0 10-1.004-1.114l-2.5 2.25a.75.75 0 000 1.114l2.5 2.25a.75.75 0 101.004-1.114L8.704 10.75H18.25A.75.75 0 0019 10z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <ButtonSignin 
              text="Sign In" 
              extraStyle="relative inline-flex items-center justify-center px-6 py-3 text-sm font-semibold 
                       bg-brand-blue text-white rounded-lg shadow-md hover:shadow-lg
                       transform hover:scale-105 transition-all duration-300 
                       border border-transparent hover:border-brand-blue/20
                       overflow-hidden group"
            />
          )}
        </div>

        {/* Mobile menu button with Magic UI animations */}
        <div className="lg:hidden">
          <button
            type="button"
            className={`relative w-10 h-10 flex items-center justify-center rounded-lg 
                      transition-all duration-300 ${
                        isOpen 
                          ? 'bg-brand-blue/10 text-brand-blue' 
                          : 'hover:bg-gray-100 text-text-secondary'
                      }`}
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setIsOpen(!isOpen)}
          >
            {/* Animated hamburger to X */}
            <div className="relative w-5 h-5">
              <span className={`absolute block w-5 h-0.5 bg-current transform transition-all duration-300 ${
                isOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
              }`}></span>
              <span className={`absolute block w-5 h-0.5 bg-current transition-all duration-300 ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
              <span className={`absolute block w-5 h-0.5 bg-current transform transition-all duration-300 ${
                isOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'
              }`}></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu with Magic UI Dock style */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="backdrop-blur-md bg-white/90 border-t border-white/20 px-[5%] py-6">
          <ul className="space-y-4">
            {links.map((link, index) => (
              <li 
                key={link.href}
                className={`transform transition-all duration-300 delay-${index * 50} ${
                  isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                <a
                  href={link.href}
                  className="block body-large text-text-secondary hover:text-brand-blue 
                           transition-colors duration-300 py-2"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
            {/* Mobile CTA */}
            <li className={`pt-4 transform transition-all duration-300 delay-300 ${
              isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              {session?.user ? (
                <div className="space-y-3">
                  {/* User Role Display */}
                  <div className="text-center">
                    <UserRoleDisplay />
                  </div>
                  
                  {/* Mobile Navigation Links */}
                  <div className="flex flex-col space-y-2">
                    <Link 
                      href="/profile"
                      className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium 
                               text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200"
                    >
                      Profile
                    </Link>
                    <Link 
                      href="/dashboard"
                      className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium 
                               text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200"
                    >
                      Dashboard
                    </Link>
                  </div>
                </div>
              ) : (
                <ButtonSignin 
                  text="Sign In" 
                  extraStyle="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold 
                           bg-brand-blue text-white rounded-lg shadow-md hover:shadow-lg
                           transform hover:scale-105 transition-all duration-300"
                />
              )}
            </li>
          </ul>
        </div>
      </div>

      {/* Back to top button */}
      <button
        type="button"
        className={`fixed bottom-6 right-6 z-50 p-2 rounded-full bg-brand-blue/10 text-brand-blue 
                   transition-all duration-300 ${
                     showBackToTop ? 'opacity-100' : 'opacity-0'
                   }`}
        onClick={scrollToTop}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 11l7-7 7 7M5 19l7-7 7 7" />
        </svg>
      </button>
    </header>
  );
};

export default Header;
