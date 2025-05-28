import React from 'react';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  className = "", 
  width = 40, 
  height = 40, 
  showText = true 
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Modern AI Education Logo Icon */}
      <div className="relative group">
        <svg
          width={width}
          height={height}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:scale-110"
        >
          {/* Background Circle with Gradient */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
            <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F3F4F6" />
            </linearGradient>
          </defs>
          
          {/* Main Circle Background */}
          <circle
            cx="20"
            cy="20"
            r="18"
            fill="url(#logoGradient)"
            className="drop-shadow-lg"
          />
          
          {/* Inner Brain/Learning Symbol */}
          <g transform="translate(8, 8)">
            {/* Brain outline */}
            <path
              d="M12 2C13.5 2 15 2.5 16 3.5C17.5 2.5 19.5 2.5 21 3.5C22.5 4.5 23 6 23 8C23 9 22.8 10 22.5 11C22.8 12 23 13 23 14C23 16 22.5 17.5 21 18.5C19.5 19.5 17.5 19.5 16 18.5C15 19.5 13.5 20 12 20C10.5 20 9 19.5 8 18.5C6.5 19.5 4.5 19.5 3 18.5C1.5 17.5 1 16 1 14C1 13 1.2 12 1.5 11C1.2 10 1 9 1 8C1 6 1.5 4.5 3 3.5C4.5 2.5 6.5 2.5 8 3.5C9 2.5 10.5 2 12 2Z"
              fill="url(#brainGradient)"
              stroke="#3B82F6"
              strokeWidth="0.5"
            />
            
            {/* Neural network connections */}
            <g stroke="#3B82F6" strokeWidth="1" fill="none" opacity="0.8">
              {/* Central nodes */}
              <circle cx="12" cy="8" r="1.5" fill="#3B82F6" />
              <circle cx="8" cy="12" r="1.5" fill="#8B5CF6" />
              <circle cx="16" cy="12" r="1.5" fill="#10B981" />
              <circle cx="12" cy="16" r="1.5" fill="#3B82F6" />
              
              {/* Connection lines */}
              <line x1="12" y1="8" x2="8" y2="12" />
              <line x1="12" y1="8" x2="16" y2="12" />
              <line x1="8" y1="12" x2="12" y2="16" />
              <line x1="16" y1="12" x2="12" y2="16" />
              
              {/* Additional smaller nodes */}
              <circle cx="6" cy="8" r="0.8" fill="#8B5CF6" />
              <circle cx="18" cy="8" r="0.8" fill="#10B981" />
              <circle cx="6" cy="16" r="0.8" fill="#10B981" />
              <circle cx="18" cy="16" r="0.8" fill="#8B5CF6" />
              
              {/* Connecting smaller nodes */}
              <line x1="6" y1="8" x2="8" y2="12" opacity="0.6" />
              <line x1="18" y1="8" x2="16" y2="12" opacity="0.6" />
              <line x1="6" y1="16" x2="8" y2="12" opacity="0.6" />
              <line x1="18" y1="16" x2="16" y2="12" opacity="0.6" />
            </g>
          </g>
          
          {/* Subtle glow effect */}
          <circle
            cx="20"
            cy="20"
            r="18"
            fill="none"
            stroke="url(#logoGradient)"
            strokeWidth="0.5"
            opacity="0.3"
            className="animate-pulse"
          />
        </svg>
        
        {/* Floating particles for magic effect */}
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-brand-green rounded-full animate-ping opacity-75"></div>
        <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-brand-purple rounded-full animate-pulse opacity-60"></div>
      </div>
      
      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-bold bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green bg-clip-text text-transparent leading-tight">
            LearningScience
          </span>
          <span className="text-sm font-semibold text-brand-blue/80 -mt-1 tracking-wide">
            .ai
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
