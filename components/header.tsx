'use client'
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { useState, useCallback } from "react";

// Header animations styles
const headerAnimations = `
  @keyframes ping-slow {
    0%, 100% {
      transform: translate(25%, -25%) scale(1);
      opacity: 0.8;
    }
    50% {
      transform: translate(25%, -25%) scale(1.5);
      opacity: 0.4;
    }
  }
  
  .animate-ping-slow {
    animation: ping-slow 3s ease-in-out infinite;
  }
  
  .animation-delay-500 {
    animation-delay: 1.5s;
  }
  
  .animation-delay-1000 {
    animation-delay: 1s;
  }
  
  .animation-delay-1500 {
    animation-delay: 2s;
  }
  
  @keyframes spin-slow {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  .animate-spin-slow {
    animation: spin-slow 12s linear infinite;
  }
  
  @keyframes pulse-subtle {
    0%, 100% {
      opacity: 0.6;
      transform: rotate(30deg) scale(1);
    }
    50% {
      opacity: 0.2;
      transform: rotate(30deg) scale(1.05);
    }
  }
  
  .animate-pulse-subtle {
    animation: pulse-subtle 4s ease-in-out infinite;
  }
  
  .sliding-text {
    position: relative;
    overflow: hidden;
  }
  
  .sliding-text::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(235, 123, 121, 0.1) 25%, 
      rgba(235, 123, 121, 0.2) 50%, 
      rgba(235, 123, 121, 0.1) 75%, 
      transparent 100%
    );
    transform: translateX(-100%);
    animation: sliding 5s ease-in-out infinite;
  }
  
  @keyframes sliding {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <header className="w-full py-3 md:py-4 border-b border-claude-text/20 dark:border-claude-dark-foreground bg-claude-beige dark:bg-claude-dark-dark transition-colors duration-300">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="group">
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="geometric-logo relative h-10 w-10 md:h-14 md:w-14 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
              {/* Simplified geometric shapes */}
              <div className="absolute h-8 w-8 md:h-10 md:w-10 rounded-md bg-transparent border-2 border-claude-salmon transform rotate-45 transition-all duration-300 group-hover:rotate-0"></div>
              <div className="absolute h-8 w-8 md:h-10 md:w-10 rounded-md bg-transparent border-2 border-claude-text/20 dark:border-claude-beige/20 transform -rotate-45 transition-all duration-300 group-hover:border-claude-salmon/40"></div>
              
              {/* Reduced decorative elements - only keep essential one */}
              <div className="absolute h-9 w-9 md:h-12 md:w-12 rounded-full border border-dashed border-claude-salmon/20 animate-spin-slow"></div>
              
              {/* Center letter */}
              <div className="relative z-10 h-7 w-7 md:h-9 md:w-9 rounded-md bg-claude-beige dark:bg-claude-dark-dark flex items-center justify-center transform transition-all duration-300 border border-claude-salmon/60 shadow-sm">
                <span className="text-base md:text-xl font-bold text-claude-salmon transition-all duration-300">J</span>
                
                {/* Keep just one accent dot with animation */}
                <div className="absolute h-1 w-1 md:h-1.5 md:w-1.5 bg-claude-salmon rounded-full top-0 right-0 transform translate-x-1 -translate-y-1 animate-ping-slow"></div>
              </div>
              
              {/* Essential line with animation */}
              <div className="absolute w-9 md:w-12 h-[1px] bg-gradient-to-r from-transparent via-claude-text/50 dark:via-claude-beige/50 to-transparent"></div>
            </div>
            
            <div className="flex flex-col">
              <div className="relative overflow-hidden">
                <span className="block text-xs md:text-sm font-light tracking-widest uppercase text-claude-text/80 dark:text-claude-beige/80 transition-colors duration-300">
                  WhoisJason<span className="text-claude-salmon">.me</span>
                </span>
              </div>
              <div className="flex items-baseline space-x-1.5">
                <span className="hidden xs:inline-block font-light text-[10px] md:text-xs tracking-wide text-claude-text/60 dark:text-claude-beige/60">creator</span>
                <span className="text-sm md:text-lg font-medium text-claude-text dark:text-claude-beige transition-colors duration-300">
                  Designer & <span className="text-claude-salmon">Developer</span>
                </span>
              </div>
            </div>
          </div>
        </Link>
        <div className="flex items-center space-x-4 md:space-x-6">
          <nav className="hidden md:flex space-x-5">
            {['Home', 'Projects', 'About', 'Passions', 'Contact'].map((item, index) => (
              <Link 
                key={index} 
                href={item === 'Home' ? '/' : 
                      item === 'Projects' ? '/Projects' :
                      item === 'About' || item === 'Passions' ? `/#${item.toLowerCase()}` : 
                      `/${item.toLowerCase()}`}
                className="relative px-2 py-1 text-claude-text dark:text-claude-beige hover:text-claude-salmon dark:hover:text-claude-salmon transition-colors group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-claude-salmon/70 group-hover:w-full transition-all duration-200"></span>
              </Link>
            ))}
          </nav>
          <div className="h-8 w-8 md:h-10 md:w-10 p-0.5 rounded-full bg-claude-beige dark:bg-claude-dark-component transition-colors duration-300">
            <ThemeToggle />
          </div>
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              aria-label="Menu" 
              aria-expanded={mobileMenuOpen}
              className="p-1.5 md:p-2 rounded-full bg-claude-beige dark:bg-claude-dark-component hover:bg-claude-beige/80 dark:hover:bg-claude-dark-foreground transition-colors duration-300"
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 text-claude-text dark:text-claude-beige">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 text-claude-text dark:text-claude-beige">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu - simplified transition */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-200 ease-in-out ${
          mobileMenuOpen ? 'max-h-60 opacity-100 py-4' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-3 border-t border-claude-text/10 dark:border-claude-beige/10 pt-4">
          {['Home', 'Projects', 'About', 'Passions', 'Contact'].map((item, index) => (
            <Link 
              key={index} 
              href={item === 'Home' ? '/' : 
                    item === 'Projects' ? '/projects' :
                    item === 'About' || item === 'Passions' ? `/#${item.toLowerCase()}` : 
                    `/${item.toLowerCase()}`}
              className="px-3 py-2 text-claude-text dark:text-claude-beige hover:text-claude-salmon dark:hover:text-claude-salmon transition-colors border-l-2 border-transparent hover:border-claude-salmon/70"
              onClick={closeMobileMenu}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
} 