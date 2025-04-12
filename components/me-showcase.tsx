import React, { useMemo } from 'react';
import useScreenSize from '../hooks/use-screen-size';
import PixelTrail from '../fancy/components/background/pixel-trail';
import { useTheme } from '../components/theme-provider';
import ContactModal from './contact-modal';
import { LinkPreview } from './ui/link-preview';


interface MeShowcaseProps {
  text: string;
  isTyping: boolean;
  theme: string;
}

export default function MeShowcase({ text, isTyping, theme }: MeShowcaseProps) {
  const isDark = theme === 'dark';
  const screenSize = useScreenSize();
  const { theme: currentTheme } = useTheme();
  
  // URLS for LinkPreview
  const urls = useMemo(() => ({
    BeeBlog: "https://bee.whoisjason.me",
    Github: "https://github.com/ljis120301",
    Reddit: "https://reddit.com/user/ljis120301",
    Discord: "https://discord.com/users/238064010044506123",
    BGP: "https://bgp.whoisjason.me",
    Linux: "https://en.wikipedia.org/wiki/Linux",
    SVB: "https://sunvalleybroadband.com/",
    Python: "https://www.python.org/",
    NextJS: "https://nextjs.org/",
    Networking: "https://en.wikipedia.org/wiki/Computer_network",
    ServerAdmin: "https://en.wikipedia.org/wiki/System_administrator",
  }), []);
  
  return (
    <div className="relative z-0 flex flex-col items-center justify-start min-h-screen px-3 sm:px-6 py-12 sm:py-24 mx-auto bg-claude-beige-hovered dark:bg-[color:var(--color-claude-dark-background)] text-claude-text dark:text-claude-beige transition-colors duration-300">
      <div className="absolute inset-0 pointer-events-none will-change-transform">
        <PixelTrail
          pixelSize={screenSize.lessThan(`md`) ? 12 : screenSize.lessThan('lg') ? 16 : 24}
          fadeDuration={500}
          pixelClassName="bg-claude-dark-component dark:bg-white dark:shadow-md"
        />
      </div>
      
      <div className="container w-full max-w-4xl mb-24 sm:mb-48 lg:mb-72 scroll-mt-32" id="about">
        <div className="flex flex-col items-center space-y-4 sm:space-y-8 text-center">
          <div className={`inline-block p-1 sm:p-2 bg-[color:var(--color-claude-salmon)] bg-opacity-${isDark ? '50' : '70'} rounded-full mb-2 sm:mb-4 transition-colors duration-300`}>
            <div className={`w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] rounded-full border-2 sm:border-4 border-[color:var(--color-claude-salmon)] bg-[color:var(--color-claude-salmon)] bg-opacity-${isDark ? '20' : '30'} flex items-center justify-center text-foreground transition-colors duration-300`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          

          {/* About me section */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter">
            <span className="text-[color:var(--color-claude-salmon)] transition-colors duration-300">
              Jason
            </span>
          </h1>
          
          <h2 className="text-lg sm:text-xl md:text-2xl font-light text-foreground transition-colors duration-300">
            <LinkPreview url={urls.BeeBlog} className="font-medium">
              Blogger
            </LinkPreview> & <LinkPreview url={urls.BGP} className="font-medium">
              Computer Networking
            </LinkPreview> Enthusiast
          </h2>

          {/* About me description */}
          <p className="max-w-2xl text-foreground text-base sm:text-lg min-h-[56px] transition-colors duration-300">
            <span>
              Passionate <LinkPreview url={urls.NextJS} className="font-medium">Next.js developer</LinkPreview> and{" "}
              <LinkPreview url={urls.Networking} className="font-medium">networking specialist</LinkPreview> at{" "}
              <LinkPreview url={urls.SVB} className="font-medium">Sun Valley Broadband</LinkPreview>. 
              I manage custom <LinkPreview url={urls.Linux} className="font-medium">Linux</LinkPreview> servers 
              and develop <LinkPreview url={urls.Python} className="font-medium">Python</LinkPreview> solutions 
              for network automation. Creator of{" "}
              <LinkPreview url={urls.BeeBlog} className="font-medium">my personal blog</LinkPreview> and 
              developer of a <LinkPreview url={urls.BGP} className="font-medium">BGP lookup tool</LinkPreview> 
              used for network diagnostics.
            </span>

            <span className={`inline-block w-2 h-5 bg-[color:var(--color-claude-salmon)] ml-1 ${isTyping ? 'animate-pulse' : 'opacity-0'} transition-colors duration-300`}>
            </span>

            <br />

            Specialized in creating <LinkPreview url={urls.BeeBlog} className="font-medium">beautiful, functional</LinkPreview>, 
            and <LinkPreview url={urls.BGP} className="font-medium">responsive web applications</LinkPreview> 
            with a focus on <LinkPreview url={urls.ServerAdmin} className="font-medium">server administration</LinkPreview> 
            and network infrastructure.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-4 sm:mt-8">
            <a
              href="/Projects"
              className="px-4 sm:px-6 py-2 sm:py-3 hover:opacity-90 rounded-full z-10 font-medium text-white bg-[color:var(--color-claude-salmon)] transition-colors duration-300"
            >
              View My Work
            </a>
            <ContactModal />
          </div>
          
          {/* Social media links */}
          <div className="flex gap-4 sm:gap-6 mt-4 sm:mt-8 relative z-10">
            <LinkPreview url={urls.Github} className={`${isDark ? 'text-[color:var(--color-claude-beige)]' : 'text-[color:var(--color-claude-text)]'} hover:opacity-75 transition-colors duration-300`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </LinkPreview>
            <LinkPreview url={urls.Reddit} className={`${isDark ? 'text-[color:var(--color-claude-beige)]' : 'text-[color:var(--color-claude-text)]'} hover:opacity-75 transition-colors duration-300`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
                <path d="M24 11.779c0-1.459-1.192-2.645-2.657-2.645-.715 0-1.363.286-1.84.746-1.81-1.191-4.259-1.949-6.971-2.046l1.483-4.669 4.016.941-.006.058c0 1.193.975 2.163 2.174 2.163 1.198 0 2.172-.97 2.172-2.163s-.975-2.164-2.172-2.164c-.92 0-1.704.574-2.021 1.379l-4.329-1.015c-.189-.046-.381.063-.44.249l-1.654 5.207c-2.838.034-5.409.798-7.3 2.025-.474-.438-1.103-.712-1.799-.712-1.465 0-2.656 1.187-2.656 2.646 0 .97.533 1.811 1.317 2.271-.052.282-.086.567-.086.857 0 3.911 4.808 7.093 10.719 7.093s10.72-3.182 10.72-7.093c0-.274-.029-.544-.075-.81.832-.447 1.405-1.312 1.405-2.318zm-17.224 1.816c0-.868.71-1.575 1.582-1.575.872 0 1.581.707 1.581 1.575s-.709 1.574-1.581 1.574-1.582-.706-1.582-1.574zm9.061 4.669c-.797.793-2.048 1.179-3.824 1.179l-.013-.003-.013.003c-1.777 0-3.028-.386-3.824-1.179-.145-.144-.145-.379 0-.523.145-.145.381-.145.526 0 .65.647 1.729.961 3.298.961l.013.003.013-.003c1.569 0 2.648-.315 3.298-.962.145-.145.381-.144.526 0 .145.145.145.379 0 .524zm-.189-3.095c-.872 0-1.581-.706-1.581-1.574 0-.868.709-1.575 1.581-1.575s1.581.707 1.581 1.575-.709 1.574-1.581 1.574z"/>
              </svg>
            </LinkPreview>
            <LinkPreview url={urls.Discord} className={`${isDark ? 'text-[color:var(--color-claude-beige)]' : 'text-[color:var(--color-claude-text)]'} hover:opacity-75 transition-colors duration-300`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z"/>
              </svg>
            </LinkPreview>
          </div>
        </div>
      </div>
      
      <div className="py-16 sm:py-32 lg:py-48" id="Passions">
        <div className="w-full max-w-3xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 hover:underline text-[color:var(--color-claude-salmon)]">My Passions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <div className={`p-4 sm:p-6 ${isDark ? 'bg-[color:var(--color-claude-dark-component)]' : 'bg-background'} rounded-lg shadow-md transition-colors duration-300`}>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 hover:underline text-[color:var(--color-claude-salmon)]">Next js</h3>
              <p className="text-sm sm:text-base text-foreground transition-colors duration-300">Stunning UX/UI with Next js, empowering me to make beautiful and functional websites.</p>
            </div>
            <div className={`p-4 sm:p-6 ${isDark ? 'bg-[color:var(--color-claude-dark-component)]' : 'bg-background'} rounded-lg shadow-md transition-colors duration-300`}>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 hover:underline text-[color:var(--color-claude-salmon)]">Linux</h3>
              <p className="text-sm sm:text-base text-foreground transition-colors duration-300">Linux is the backbone of my development environment, providing a stable and secure platform for building and testing my projects.</p>
            </div>
            <div className={`p-4 sm:p-6 ${isDark ? 'bg-[color:var(--color-claude-dark-component)]' : 'bg-background'} rounded-lg shadow-md transition-colors duration-300`}>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 hover:underline text-[color:var(--color-claude-salmon)]">Networking</h3>
              <p className="text-sm sm:text-base text-foreground transition-colors duration-300">Networking is the fundamentals of what interconnects our world today.</p>
            </div>
            <div className={`p-4 sm:p-6 ${isDark ? 'bg-[color:var(--color-claude-dark-component)]' : 'bg-background'} rounded-lg shadow-md transition-colors duration-300`}>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 hover:underline text-[color:var(--color-claude-salmon)]">Cybersecurity</h3>
              <p className="text-sm sm:text-base text-foreground transition-colors duration-300">Security is the foundation of trust in our digital world.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
