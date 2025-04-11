import useScreenSize from "@/hooks/use-screen-size"
import PixelTrail from "@/fancy/components/background/pixel-trail"
import { useTheme } from "@/components/theme-provider"
import Link from "next/link"

const PixelTrailDemo: React.FC = () => {
  const screenSize = useScreenSize()
  const { theme } = useTheme()
  
  console.log("Current theme:", theme)

  return (
    <div className="w-dvw h-dvh bg-claude-beige dark:bg-[#2a2924] text-claude-text dark:text-white flex flex-col font-azeret-mono transition-colors duration-300">
      <div className="absolute inset-0 z-0">
        <PixelTrail
          pixelSize={screenSize.lessThan(`md`) ? 16 : 24}
          fadeDuration={500}
          pixelClassName="bg-black dark:bg-white dark:shadow-md"
        />
      </div>

      <div className="justify-center items-center flex flex-col w-full h-full">
        <h2 className="font-VT323 text-3xl sm:text-4xl md:text-6xl uppercase">
          whoisjason.me
        </h2>
        <p className="pt-0.5 sm:pt-2 text-xs sm:text-base md:text-xl pb-2">
          Jason's personal website 
        </p>
        
        <Link href="/Projects" style={{backgroundColor: '#bd5d3a'}} className="px-6 py-3 hover:opacity-90 rounded-full font-medium text-white transition-colors duration-300 z-10">
              View My Work
        </Link>

      </div>
    </div>
  )
}

export default PixelTrailDemo
