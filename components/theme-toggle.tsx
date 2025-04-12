"use client"

import { useTheme } from "./theme-provider"
import { useEffect, useState, useCallback } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light")
  }, [theme, setTheme])

  if (!mounted) return null

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative h-full w-full flex items-center justify-center rounded-full overflow-hidden
        transition-transform duration-200 active:scale-95
        ${theme === 'light' ? 'bg-[#F5F5F6] hover:bg-[#ECECF1]' : 'bg-[#1F1E1D] hover:bg-[#40414F]'}
        border border-solid
        ${theme === 'light' ? 'border-[rgba(189,195,199,0.2)]' : 'border-[rgba(68,70,84,0.5)]'}
      `}
      aria-label="Toggle theme"
    >
      <div className="relative h-5 w-5 md:h-6 md:w-6 flex items-center justify-center">
        {theme === 'light' ? (
          <SunIcon className="h-4 w-4 md:h-5 md:w-5 text-claude-salmon transition-all duration-300" />
        ) : (
          <MoonIcon className="h-4 w-4 md:h-5 md:w-5 text-claude-salmon transition-all duration-300" />
        )}
      </div>
    </button>
  )
}

function SunIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
      <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
      <line x1="6.34" y1="17.66" x2="4.93" y2="19.07" />
      <line x1="19.07" y1="4.93" x2="17.66" y2="6.34" />
    </svg>
  )
}

function MoonIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
} 