"use client";

// Official registry source: https://lucide-animated.com/r/menu.json
// The animation import targets the existing Framer Motion package.
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import { cn } from 'lib/utils';

const LINE_VARIANTS = {
  normal: { rotate: 0, y: 0, opacity: 1 },
  animate: (custom) => ({
    rotate: custom === 1 ? 45 : custom === 3 ? -45 : 0,
    y: custom === 1 ? 6 : custom === 3 ? -6 : 0,
    opacity: custom === 2 ? 0 : 1,
    transition: { type: 'spring', stiffness: 260, damping: 20 },
  }),
};

const MenuIcon = forwardRef(({
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
        {[6, 12, 18].map((y, index) => (
          <motion.line
            key={y}
            animate={controls}
            custom={index + 1}
            initial="normal"
            variants={LINE_VARIANTS}
            x1="4"
            x2="20"
            y1={y}
            y2={y}
          />
        ))}
      </svg>
    </div>
  );
});

MenuIcon.displayName = 'MenuIcon';

export { MenuIcon };
