'use client';

import { useState, useEffect } from 'react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Wait for client-side hydration to complete
    setMounted(true);
  }, []);

  // During SSR and initial client render, render a minimal div
  // After hydration completes, render the actual children
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}></div>;
  }

  return <>{children}</>;
} 