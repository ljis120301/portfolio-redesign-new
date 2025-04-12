"use client"

import VariableFontHoverByLetter from "@/fancy/components/text/variable-font-hover-by-letter"

export default function HoverDemo() {
  return (
    <div className="w-full min-h-screen rounded-lg sm:text-xl xs:text-sm md:text-2xl xl:text-3xl flex flex-col items-center justify-center bg-white text-foreground dark:text-muted">
      <div className="w-full justify-start items-center p-6 sm:p-8 md:p-12 lg:p-16">
        <div className="w-3/4 mx-auto mb-24">
          <h2 className="text-2xl mb-4">SOCIAL LINKS ✽</h2>
          <ul className="flex flex-col space-y-1 mt-6 md:mt-12 h-full cursor-pointer">
            <VariableFontHoverByLetter
              label="GITHUB"
              staggerDuration={0.03}
              fromFontVariationSettings="'wght' 400, 'slnt' 0"
              toFontVariationSettings="'wght' 900, 'slnt' -10"
              onClick={() => window.open('https://github.com', '_blank')}
            />
            <VariableFontHoverByLetter
              label="LINKEDIN"
              staggerDuration={0.0}
              transition={{ duration: 1, type: "spring" }}
              fromFontVariationSettings="'wght' 400, 'slnt' -10"
              toFontVariationSettings="'wght' 900, 'slnt' -10"
              onClick={() => window.open('https://linkedin.com', '_blank')}
            />
            <VariableFontHoverByLetter
              label="TWITTER"
              fromFontVariationSettings="'wght' 400, 'slnt' 0"
              toFontVariationSettings="'wght' 900, 'slnt' -10"
              staggerFrom={"last"}
              onClick={() => window.open('https://twitter.com', '_blank')}
            />
          </ul>
        </div>
      </div>
    </div>
  )
} 