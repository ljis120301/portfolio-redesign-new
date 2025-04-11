"use client";

import { useEffect, useState } from "react";

type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

interface ScreenSize {
  width: number;
  height: number;
  lessThan: (breakpoint: Breakpoint) => boolean;
  greaterThan: (breakpoint: Breakpoint) => boolean;
  equals: (breakpoint: Breakpoint) => boolean;
}

const breakpoints: Record<Breakpoint, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

const useScreenSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<Omit<ScreenSize, "lessThan" | "greaterThan" | "equals">>({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Initial call
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const lessThan = (breakpoint: Breakpoint): boolean => {
    return screenSize.width < breakpoints[breakpoint];
  };

  const greaterThan = (breakpoint: Breakpoint): boolean => {
    return screenSize.width > breakpoints[breakpoint];
  };

  const equals = (breakpoint: Breakpoint): boolean => {
    const nextBreakpoint = Object.keys(breakpoints).findIndex(
      (bp) => bp === breakpoint
    ) + 1;
    
    if (nextBreakpoint >= Object.keys(breakpoints).length) {
      return screenSize.width >= breakpoints[breakpoint];
    }
    
    const nextBreakpointValue = breakpoints[
      Object.keys(breakpoints)[nextBreakpoint] as Breakpoint
    ];
    
    return (
      screenSize.width >= breakpoints[breakpoint] && 
      screenSize.width < nextBreakpointValue
    );
  };

  return {
    ...screenSize,
    lessThan,
    greaterThan,
    equals,
  };
};

export default useScreenSize; 