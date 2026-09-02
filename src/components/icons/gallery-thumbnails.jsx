"use client";

// Official registry source: https://lucide-animated.com/r/gallery-thumbnails.json
// The animation import targets the existing Framer Motion package.
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import { cn } from 'lib/utils';

const PATH_VARIANTS = {
  normal: { opacity: 1 },
  animate: (index) => ({
    opacity: [0, 1],
    transition: { delay: index * 0.15, duration: 0.2 },
  }),
};

const GalleryThumbnailsIcon = forwardRef(({
  onMouseEnter,
  onMouseLeave,
  className,
  size = 28,
  ...props
}, ref) => {
  const controls = useAnimation();
  const isControlledRef = useRef(false);

  useImperativeHandle(ref, () => {
    isControlledRef.current = true;
    return {
      startAnimation: () => controls.start('animate'),
      stopAnimation: () => controls.start('normal'),
    };
  });

  const handleMouseEnter = useCallback((event) => {
    if (isControlledRef.current) onMouseEnter?.(event);
    else controls.start('animate');
  }, [controls, onMouseEnter]);

  const handleMouseLeave = useCallback((event) => {
    if (isControlledRef.current) onMouseLeave?.(event);
    else controls.start('normal');
  }, [controls, onMouseLeave]);

  return (
    <div
      className={cn(className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <svg
        fill="none"
        height={size}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect height="14" rx="2" width="18" x="3" y="3" />
        {['M4 21h1', 'M9 21h1', 'M14 21h1', 'M19 21h1'].map((path, index) => (
          <motion.path
            animate={controls}
            custom={index + 1}
            d={path}
            key={path}
            variants={PATH_VARIANTS}
          />
        ))}
      </svg>
    </div>
  );
});

GalleryThumbnailsIcon.displayName = 'GalleryThumbnailsIcon';

export { GalleryThumbnailsIcon };
