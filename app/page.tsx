"use client"

import Image from "next/image";
//import { PixelTrail } from "../fancy/components/background/pixel-trail";
import { useEffect, useState } from "react";
import PixelTrailDemo from "../fancy/components/pixel-trail-demo";
import MeShowcase from "../components/me-showcase";
import StickyFooter from "../components/sticky-footer";


export default function Home() {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [theme, setTheme] = useState("light");
  const fullText = "I build exceptional digital experiences with modern technologies.";

  useEffect(() => {
    // Check for system preference or saved theme
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      } else if (systemPrefersDark) {
        setTheme('dark');
        document.documentElement.classList.add('dark');
      }
    }
    
    console.log("Home component mounted");
    // Add console message to check if component is rendering
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', () => {
        console.log("Mouse moved in home component");
      });
    }
    
    if (isTyping) {
      if (text.length < fullText.length) {
        const timeout = setTimeout(() => {
          setText(fullText.slice(0, text.length + 1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setIsTyping(false);
        const timeout = setTimeout(() => {
          setIsTyping(true);
          setText("");
        }, 3000);
        return () => clearTimeout(timeout);
      }
    }
  }, [text, isTyping]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <div className={`w-full h-full overflow-auto ${theme === 'light' ? 'bg-[#eeece2] text-[#3d3929]' : 'dark bg-[#1f1e19] text-[#f5f2e8]'} transition-colors duration-300`}>
      {/* Theme Toggle Button */}
      <button 
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-claude-salmon/30 dark:bg-claude-salmon/50 text-[#3d3929] dark:text-[#f5f2e8] transition-colors duration-300"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
          </svg>
        )}
      </button>
      
      {/* Main content with higher z-index */}
      <div className="relative z-10 min-h-dvh overflow-hidden transition-colors duration-300">
        {/* Debug Border to see if PixelTrail renders */}
        <div className="absolute inset-0 z-0 pointer-events-none" />
        
        {/* Pixel Trail Background */}
        <PixelTrailDemo />
        
        {/* Portfolio showcase section */}
        <MeShowcase text={text} isTyping={isTyping} theme={theme} />
      </div>
      
      {/* Sticky Footer that stays at bottom with lower z-index */}
      <StickyFooter theme={theme} />
    </div>
  );
}
