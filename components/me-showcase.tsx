import React from 'react';
import useScreenSize from '../hooks/use-screen-size';
import PixelTrail from '../fancy/components/background/pixel-trail';
import { useTheme } from '../components/theme-provider';
import ContactModal from './contact-modal';

interface MeShowcaseProps {
  text: string;
  isTyping: boolean;
  theme: string;
}

export default function MeShowcase({ text, isTyping, theme }: MeShowcaseProps) {
  const isDark = theme === 'dark';
  const screenSize = useScreenSize();
  const { theme: currentTheme } = useTheme();
  
  return (
    <div className="relative z-20 flex flex-col items-center justify-start min-h-screen px-6 py-24 mx-auto bg-claude-beige-hovered dark:bg-[color:var(--color-claude-dark-background)] text-claude-text dark:text-claude-beige transition-colors duration-300">
      <div className="absolute inset-0 z-0">
        <PixelTrail
          pixelSize={screenSize.lessThan(`md`) ? 16 : 24}
          fadeDuration={500}
          pixelClassName="bg-claude-dark-component dark:bg-white dark:shadow-md"
        />
      </div>
      
      <div className="container max-w-4xl mb-96 scroll-mt-32" id="about">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className={`inline-block p-2 bg-[color:var(--color-claude-salmon)] bg-opacity-${isDark ? '50' : '70'} rounded-full mb-4 transition-colors duration-300`}>
            <div className={`w-[120px] h-[120px] rounded-full border-4 border-[color:var(--color-claude-salmon)] bg-[color:var(--color-claude-salmon)] bg-opacity-${isDark ? '20' : '30'} flex items-center justify-center text-foreground transition-colors duration-300`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-20 h-20">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter">
            <span className="text-[color:var(--color-claude-salmon)] transition-colors duration-300">
              Jason
            </span>
          </h1>
          
          <h2 className="text-xl sm:text-2xl font-light text-foreground transition-colors duration-300 ">
            Full Stack Developer & UI/UX Enthusiast
          </h2>
          
          <p className="max-w-2xl text-foreground text-lg h-[56px] transition-colors duration-300">
            <span>{text}</span>
            <span className={`inline-block w-2 h-5 bg-[color:var(--color-claude-salmon)] ml-1 ${isTyping ? 'animate-pulse' : 'opacity-0'} transition-colors duration-300`}></span>
            <br />
            Specialized in creating beautiful, functional, and responsive web applications.
          </p>
          
          <div className="flex gap-4 mt-8">
            <a
              href="/Projects"
              className="px-6 py-3 hover:opacity-90 rounded-full font-medium text-white bg-[color:var(--color-claude-salmon)] transition-colors duration-300 z-10"
            >
              View My Work
            </a>
            <ContactModal />
          </div>
          
          <div className="flex gap-6 mt-8">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={`${isDark ? 'text-[color:var(--color-claude-beige)]' : 'text-[color:var(--color-claude-text)]'} hover:opacity-75 transition-colors duration-300`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={`${isDark ? 'text-[color:var(--color-claude-beige)]' : 'text-[color:var(--color-claude-text)]'} hover:opacity-75 transition-colors duration-300`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={`${isDark ? 'text-[color:var(--color-claude-beige)]' : 'text-[color:var(--color-claude-text)]'} hover:opacity-75 transition-colors duration-300`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <div className="py-64" id="Passions">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 hover:underline text-[color:var(--color-claude-salmon)]">My Passions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`p-6 ${isDark ? 'bg-[color:var(--color-claude-dark-component)]' : 'bg-background'} rounded-lg shadow-md transition-colors duration-300`}>
              <h3 className="text-xl font-semibold mb-2 hover:underline text-[color:var(--color-claude-salmon)]">Next js</h3>
              <p className="text-foreground transition-colors duration-300">Stunning UX/UI with Next js, empowering me to make beautiful and functional websites.</p>
            </div>
            <div className={`p-6 ${isDark ? 'bg-[color:var(--color-claude-dark-component)]' : 'bg-background'} rounded-lg shadow-md transition-colors duration-300`}>
              <h3 className="text-xl font-semibold mb-2 hover:underline text-[color:var(--color-claude-salmon)]">Linux</h3>
              <p className="text-foreground transition-colors duration-300">Linux is the backbone of my development environment, providing a stable and secure platform for building and testing my projects.</p>
            </div>
            <div className={`p-6 ${isDark ? 'bg-[color:var(--color-claude-dark-component)]' : 'bg-background'} rounded-lg shadow-md transition-colors duration-300`}>
              <h3 className="text-xl font-semibold mb-2 hover:underline text-[color:var(--color-claude-salmon)]">Networking</h3>
              <p className="text-foreground transition-colors duration-300">Networking is the fundamentals of what interconnects our world today.</p>
            </div>
            <div className={`p-6 ${isDark ? 'bg-[color:var(--color-claude-dark-component)]' : 'bg-background'} rounded-lg shadow-md transition-colors duration-300`}>
              <h3 className="text-xl font-semibold mb-2 hover:underline text-[color:var(--color-claude-salmon)]">Cybersecurity</h3>
              <p className="text-foreground transition-colors duration-300">Security is the foundation of trust in our digital world.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
