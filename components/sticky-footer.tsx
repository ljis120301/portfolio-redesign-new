import React from 'react';

interface StickyFooterProps {
  theme: string;
}

export default function StickyFooter({ theme }: StickyFooterProps) {
  const isDark = theme === 'dark';
  
  return (
    <div className={`sticky z-0 bottom-0 left-0 w-full h-60 ${isDark ? 'bg-[color:var(--color-claude-dark-dark)]' : 'bg-[color:var(--color-claude-beige)]'} flex justify-center items-center transition-colors duration-300`}>
      <div className={`relative overflow-hidden w-full h-full flex justify-end px-12 text-right items-start py-12 ${isDark ? 'text-[color:var(--color-claude-salmon)]' : 'text-[color:var(--color-claude-text)]'}`}>
        <div className="flex flex-row space-x-12 sm:space-x-16 md:space-x-24 text-sm sm:text-lg md:text-xl">
          <ul>
            <li className="hover:underline cursor-pointer">Home</li>
            <li className="hover:underline cursor-pointer">Projects</li>
            <li className="hover:underline cursor-pointer">Contact</li>
          </ul>
          <ul>
            <li className="hover:underline cursor-pointer">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">Github</a>
            </li>
            <li className="hover:underline cursor-pointer">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </li>
            <li className="hover:underline cursor-pointer">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">X (Twitter)</a>
            </li>
          </ul>
        </div>
        <h2 className={`absolute bottom-0 left-0 translate-y-1/3 sm:text-[192px] text-[80px] font-bold ${isDark ? 'text-[color:var(--color-claude-salmon)]' : 'text-[color:var(--color-claude-salmon)]'}`}>
          Jason
        </h2>
      </div>
    </div>
  );
} 