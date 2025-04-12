"use client"

import Image from "next/image";
//import { PixelTrail } from "../fancy/components/background/pixel-trail";
import { useEffect, useState } from "react";
import PixelTrailDemo from "../fancy/components/pixel-trail-demo";
import MeShowcase from "../components/me-showcase";
import StickyFooter from "../components/sticky-footer";
import { useTheme } from "../components/theme-provider";

export default function Home() {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const { theme } = useTheme();
  const fullText = "I build exceptional digital experiences with modern technologies.";

  useEffect(() => {
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

  return (
    <div className={`w-full h-full overflow-auto ${theme === 'light' ? 'bg-[#eeece2]' : 'dark bg-[#1f1e19]'} text-[#C2C0B6] transition-colors duration-300`}>
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
