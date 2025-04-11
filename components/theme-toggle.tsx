"use client"

import { useTheme } from "./theme-provider"
import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light")
  }, [theme, setTheme])

  if (!mounted) return null

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-[9999] flex h-10 w-10 items-center justify-center rounded-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      aria-label="Toggle theme"
    >
      {/* Background layer */}
      <motion.div
        className={`
          absolute inset-0 rounded-full 
          ${theme === 'light' ? 'bg-[#F5F5F6]' : 'bg-[#2A2B32]'}
        `}
        animate={{
          scale: isHovered ? 1.1 : 1,
          opacity: isHovered ? 0.9 : 1
        }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Icon container */}
      <div className="relative h-6 w-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ rotate: -45, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 45, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {theme === 'light' ? (
              <SunIcon className="h-5 w-5 text-[#2A2B32]" />
            ) : (
              <MoonIcon className="h-5 w-5 text-[#F5F5F6]" />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Subtle border animation */}
      <motion.div
        className="absolute inset-0 rounded-full border"
        animate={{
          borderColor: theme === 'light' ? 'rgba(42,43,50,0.1)' : 'rgba(245,245,246,0.1)',
          scale: isHovered ? 1.15 : 1
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
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