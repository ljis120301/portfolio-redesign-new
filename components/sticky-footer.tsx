import React from 'react';
import VariableFontHoverByLetter from "@/fancy/components/text/variable-font-hover-by-letter";
import { useRouter } from 'next/navigation';
import ContactModal from './contact-modal';

interface StickyFooterProps {
  theme: string;
}

export default function StickyFooter({ theme }: StickyFooterProps) {
  const isDark = theme === 'dark';
  const router = useRouter();
  
  return (
    <div className={`sticky z-0 bottom-0 left-0 w-full h-60 ${isDark ? 'bg-[color:var(--color-claude-dark-dark)]' : 'bg-[color:var(--color-claude-beige)]'} flex justify-center items-center transition-colors duration-300`}>
      <div className={`relative overflow-hidden w-full h-full flex justify-end px-12 text-right items-start py-12 ${isDark ? 'text-[color:var(--color-claude-salmon)]' : 'text-[color:var(--color-claude-text)]'}`}>
        <div className="flex flex-row space-x-12 sm:space-x-16 md:space-x-24 text-sm sm:text-lg md:text-xl">
          <ul className="flex flex-col space-y-1 cursor-pointer font-overused-grotesk">
            <VariableFontHoverByLetter
              label="Home"
              fromFontVariationSettings="'wght' 400, 'slnt' 0"
              toFontVariationSettings="'wght' 900, 'slnt' -10"
              staggerDuration={0.03}
              onClick={() => router.push('/')}
            />
            <VariableFontHoverByLetter
              label="Projects"
              fromFontVariationSettings="'wght' 400, 'slnt' 0"
              toFontVariationSettings="'wght' 900, 'slnt' -10"
              staggerDuration={0.03}
              onClick={() => router.push('/Projects')}
            />
            <li>
              <ContactModal triggerClassName="p-0 m-0 inline-block w-full text-left !important">
                <div className={`${isDark ? 'text-[color:var(--color-claude-salmon)]' : 'text-[color:var(--color-claude-text)]'}`}>
                  <VariableFontHoverByLetter
                    label="Contact"
                    fromFontVariationSettings="'wght' 400, 'slnt' 0"
                    toFontVariationSettings="'wght' 900, 'slnt' -10"
                    staggerDuration={0.03}
                    className={`${isDark ? 'text-[color:var(--color-claude-salmon)]' : 'text-[color:var(--color-claude-text)]'}`}
                  />
                </div>
              </ContactModal>
            </li>
          </ul>
          <ul className="flex flex-col space-y-1 cursor-pointer font-overused-grotesk">
            <VariableFontHoverByLetter
              label="Github"
              fromFontVariationSettings="'wght' 400, 'slnt' 0"
              toFontVariationSettings="'wght' 900, 'slnt' -10"
              staggerDuration={0.03}
              onClick={() => window.open('https://github.com/ljis120301', '_blank')}
            />
            <VariableFontHoverByLetter
              label="My Blog"
              fromFontVariationSettings="'wght' 400, 'slnt' 0"
              toFontVariationSettings="'wght' 900, 'slnt' -10"
              staggerDuration={0.03}
              onClick={() => window.open('https://bee.whoisjason.me', '_blank')}
            />
            <VariableFontHoverByLetter
              label="BGP Lookup Tool"
              fromFontVariationSettings="'wght' 400, 'slnt' 0"
              toFontVariationSettings="'wght' 900, 'slnt' -10"
              staggerDuration={0.03}
              onClick={() => window.open('https://bgp.whoisjason.me', '_blank')}
            />
          </ul>
        </div>
        <h2 className={`absolute bottom-0 left-0 translate-y-1/3 sm:text-[192px] text-[80px] font-bold ${isDark ? 'text-[color:var(--color-claude-salmon)]' : 'text-[color:var(--color-claude-salmon)]'}`}>
          whoisJason
        </h2>
      </div>
    </div>
  );
} 