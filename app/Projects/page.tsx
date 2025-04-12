'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { pb } from '@/lib/pocketbase';
import { RecordModel } from 'pocketbase';
import { ErrorBoundary } from 'react-error-boundary';

// Override the console.error to filter out auto-cancellation errors
const originalConsoleError = console.error;
console.error = function(...args) {
  // Filter out the PocketBase auto-cancellation error
  if (
    args[0] && 
    typeof args[0] === 'object' && 
    args[0].message === 'The request was autocancelled.'
  ) {
    console.log('Suppressed auto-cancellation error:', args[0]);
    return;
  }
  
  // If the first argument is a string containing the auto-cancellation message
  if (
    args[0] && 
    typeof args[0] === 'string' && 
    args[0].includes('The request was autocancelled')
  ) {
    console.log('Suppressed auto-cancellation error string:', args[0]);
    return;
  }
  
  // Otherwise, pass to the original console.error
  originalConsoleError.apply(console, args);
};

interface Post extends RecordModel {
  title: string;
  description: string;
}

// Function to format date consistently between server and client
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// Error fallback component
function ErrorFallback() {
  return null; // Return null to suppress error UI
}

// The main component wrapped with error boundary
export default function Projects() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ProjectsContent />
    </ErrorBoundary>
  );
}

// The actual content component
function ProjectsContent() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Define fetchPosts as a useCallback to better control dependencies
  const fetchPosts = useCallback(async () => {
    try {
      console.log('Attempting to fetch posts from Pocketbase...');
      const records = await pb.collection('posts').getList(1, 4, {
        sort: '-created',
      });
      
      console.log('Received response:', records);
      setPosts(records.items as unknown as Post[]);
      console.log('Posts set successfully:', records.items.length);
    } catch (error: any) {
      // Completely suppress auto-cancellation errors
      if (error && error.message === "The request was autocancelled.") {
        console.log('Pocketbase request was auto-cancelled. This is normal behavior when navigating away from the page.');
        // Don't propagate the error - just handle it silently
      } else if (error) {
        // For other errors, log them but don't allow them to crash the component
        console.log('Non-critical error fetching blog posts:', error);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Create a flag to track component mount state
    let isMounted = true;
    
    // Wrap the fetch call in a try/catch to ensure errors don't propagate
    try {
      fetchPosts().catch((e) => {
        if (isMounted && e.message !== "The request was autocancelled.") {
          console.log('Caught fetch error:', e);
        }
      });
    } catch (e) {
      // This is a belt-and-suspenders approach to make absolutely sure
      // no errors escape to Next.js error handling
      console.log('Caught outer error:', e);
    }
    
    // Return cleanup function
    return () => {
      isMounted = false;
      // Cancel all pending requests when component unmounts
      try {
        pb.cancelAllRequests();
      } catch (e) {
        // Suppress any cancellation errors
        console.log('Error during cleanup:', e);
      }
    };
  }, [fetchPosts]);

  return (
    <div className="bg-[#F5F4ED] dark:bg-[#262624] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-[#3D3929] dark:text-[#F5F4ED] sm:text-5xl">Projects of mine</h2>
          <p className="mt-2 text-lg/8 text-[#3D3929]/80 dark:text-[#F5F4ED]/80">Here are some of my latest projects and updates.</p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center mt-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3D3929] dark:border-[#F5F4ED]"></div>
          </div>
        ) : (
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-[#3D3929]/20 dark:border-[#F5F4ED]/20 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.created} className="text-[#3D3929]/70 dark:text-[#F5F4ED]/70">
                    {formatDate(post.created)}
                  </time>
                  <span className="relative z-10 rounded-full bg-[#F5F4ED] dark:bg-[#30302E] px-3 py-1.5 font-medium text-[#3D3929] dark:text-[#D97656] hover:bg-[#EEECE2] dark:hover:bg-[#1F1E1D]">
                    Project
                  </span>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg/6 font-semibold text-[#3D3929] dark:text-[#F5F4ED] group-hover:text-[#D97656] dark:group-hover:text-[#D97656]">
                    <a href={`https://bee.whoisjason.me/blogposts/${post.id}`}>
                      <span className="absolute inset-0" />
                      {post.title || 'Untitled Post'}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm/6 text-[#3D3929]/80 dark:text-[#F5F4ED]/80">
                    {post.description || 'No description available'}
                  </p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <Image 
                    src="/me.png"
                    alt="Jason"
                    width={40}
                    height={40}
                    className="size-10 rounded-full object-cover"
                  />
                  <div className="text-sm/6">
                    <p className="font-semibold text-[#3D3929] dark:text-[#F5F4ED]">
                      Jason
                    </p>
                    <p className="text-[#3D3929]/80 dark:text-[#F5F4ED]/80">Developer</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {!isLoading && posts.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-16 text-center">
            <p className="text-xl text-[#3D3929] dark:text-[#F5F4ED]">No projects found</p>
            <p className="mt-2 text-md text-[#3D3929]/80 dark:text-[#F5F4ED]/80">
              There might be an issue connecting to the database or no projects are available.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}