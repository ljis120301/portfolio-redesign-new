"use client";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import Image from "next/image";
import { encode } from "qss";
import React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LinkPreviewProps = {
  children: React.ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  layout?: string;
} & (
  | { isStatic: true; imageSrc: string }
  | { isStatic?: false; imageSrc?: never }
);

export const LinkPreview = ({
  children,
  url,
  className,
  width = 200,
  height = 125,
  quality = 50,
  layout = "fixed",
  isStatic = false,
  imageSrc = "",
}: LinkPreviewProps) => {
  let src;
  if (!isStatic) {
    const params = encode({
      url,
      screenshot: true,
      meta: false,
      embed: "screenshot.url",
      colorScheme: "dark",
      "viewport.isMobile": true,
      "viewport.deviceScaleFactor": 1,
      "viewport.width": width * 3,
      "viewport.height": height * 3,
    });
    src = `https://api.microlink.io/?${params}`;
  } else {
    src = imageSrc;
  }

  const [isOpen, setOpen] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    
    // Preload image
    if (src) {
      const img = new window.Image();
      img.src = src;
      img.onload = () => setImageLoaded(true);
    }
  }, [src]);

  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const translateX = useSpring(x, springConfig);

  const handleMouseMove = (event: any) => {
    const targetRect = event.target.getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2;
    x.set(offsetFromCenter);
  };

  return (
    <>
      <HoverCardPrimitive.Root
        openDelay={50}
        closeDelay={100}
        onOpenChange={(open) => {
          setOpen(open);
        }}
      >
        <HoverCardPrimitive.Trigger
          onMouseMove={handleMouseMove}
          asChild
        >
          <Link 
            href={url}
            className={cn("text-black dark:text-white underline decoration-dotted relative", className)}
          >
            {children}
          </Link>
        </HoverCardPrimitive.Trigger>

        <HoverCardPrimitive.Portal>
          <HoverCardPrimitive.Content
            className="[transform-origin:var(--radix-hover-card-content-transform-origin)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 z-[9999]"
            side="top"
            align="center"
            sideOffset={10}
            forceMount
          >
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.6 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    },
                  }}
                  exit={{ opacity: 0, y: 20, scale: 0.6 }}
                  className="shadow-xl rounded-xl z-[9999] pointer-events-auto"
                  style={{
                    x: translateX,
                  }}
                >
                  <Link
                    href={url}
                    className="block p-1 bg-white border-2 border-transparent shadow rounded-xl hover:border-neutral-200 dark:hover:border-neutral-800 z-[9999]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div style={{ width, height, position: 'relative' }}>
                      {(imageLoaded || isStatic) && (
                        <Image
                          src={isStatic ? imageSrc : src}
                          fill
                          style={{ objectFit: 'cover' }}
                          quality={quality}
                          priority={true}
                          className="rounded-lg"
                          alt="Link preview"
                          onLoad={() => setImageLoaded(true)}
                        />
                      )}
                      {!imageLoaded && !isStatic && (
                        <div className="w-full h-full flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                          <div className="animate-pulse">Loading...</div>
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </HoverCardPrimitive.Content>
        </HoverCardPrimitive.Portal>
      </HoverCardPrimitive.Root>
    </>
  );
};
